<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { VDialog, VCard, VCardText, VBtn, VIcon, VTooltip, VSlider } from "vuetify/components";
import { useDisplay } from "vuetify";

const props = defineProps<{
  modelValue: boolean;
  src: string | null;
  caption?: string | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const { mobile } = useDisplay();

const open = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// Zoom & pan state
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const containerRef = ref<HTMLElement | null>(null);
const imgRef = ref<HTMLImageElement | null>(null);

// Mouse drag state
const panning = ref(false);
const panButton = ref<number | null>(null);
const panStartX = ref(0);
const panStartY = ref(0);
const panStartTX = ref(0);
const panStartTY = ref(0);

// Touch state
const touches = ref(0);
const touchStartDist = ref(0);
const touchStartScale = ref(1);
const touchMidX = ref(0);
const touchMidY = ref(0);
const touchPanStartX = ref(0);
const touchPanStartY = ref(0);
const touchStartTX_s = ref(0);
const touchStartTY_s = ref(0);

const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const ZOOM_STEP = 0.25;

function clampScale(s: number): number {
  return Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));
}

function getImageBaseSize(): [number, number] {
  const img = imgRef.value;
  const el = containerRef.value;
  if (!el) return [0, 0];
  const cw = el.clientWidth;
  const ch = el.clientHeight;
  if (!img) return [cw, ch];
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  if (!nw || !nh) return [cw, ch];
  const cr = cw / ch;
  const ir = nw / nh;
  if (ir > cr) {
    return [cw, cw / ir];
  } else {
    return [ch * ir, ch];
  }
}

function clampTranslate(tx: number, ty: number): [number, number] {
  const el = containerRef.value;
  if (!el) return [tx, ty];
  const cw = el.clientWidth;
  const ch = el.clientHeight;
  const [baseW, baseH] = getImageBaseSize();
  const iw = baseW * scale.value;
  const ih = baseH * scale.value;
  const overflowX = Math.max(0, (iw - cw) / 2);
  const overflowY = Math.max(0, (ih - ch) / 2);
  return [
    Math.max(-overflowX, Math.min(overflowX, tx)),
    Math.max(-overflowY, Math.min(overflowY, ty)),
  ];
}

function containerCenter(): [number, number] {
  const el = containerRef.value;
  if (!el) return [0, 0];
  return [el.clientWidth / 2, el.clientHeight / 2];
}

function resetZoom() {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
}

function zoomIn() {
  const old = scale.value;
  scale.value = clampScale(old + ZOOM_STEP);
  const ratio = scale.value / old;
  translateX.value *= ratio;
  translateY.value *= ratio;
  [translateX.value, translateY.value] = clampTranslate(translateX.value, translateY.value);
}

function zoomOut() {
  const old = scale.value;
  scale.value = clampScale(old - ZOOM_STEP);
  const ratio = scale.value / old;
  translateX.value *= ratio;
  translateY.value *= ratio;
  [translateX.value, translateY.value] = clampTranslate(translateX.value, translateY.value);
}

// Zoom toward a point in client coordinates
function zoomAt(cx: number, cy: number, delta: number) {
  const el = containerRef.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const px = cx - rect.left;
  const py = cy - rect.top;
  const [ccx, ccy] = containerCenter();
  const oldScale = scale.value;
  const newScale = clampScale(oldScale + delta);
  const ratio = newScale / oldScale;
  // px,py is cursor position relative to container.
  // Image center is at (ccx + tx, ccy + ty). Zoom keeps cursor-point fixed.
  translateX.value = (px - ccx) * (1 - ratio) + translateX.value * ratio;
  translateY.value = (py - ccy) * (1 - ratio) + translateY.value * ratio;
  scale.value = newScale;
  [translateX.value, translateY.value] = clampTranslate(translateX.value, translateY.value);
}

// Mouse pan
function onMouseDown(e: MouseEvent) {
  if (touches.value > 0) return;
  const isMiddle = e.button === 1;
  const isLeft = e.button === 0;
  if (!isMiddle && !isLeft) return;
  if (isLeft && scale.value <= 1) return;
  e.preventDefault();
  panning.value = true;
  panButton.value = e.button;
  panStartX.value = e.clientX;
  panStartY.value = e.clientY;
  panStartTX.value = translateX.value;
  panStartTY.value = translateY.value;
}

function onMouseMove(e: MouseEvent) {
  if (!panning.value) return;
  const dx = e.clientX - panStartX.value;
  const dy = e.clientY - panStartY.value;
  const sign = panButton.value === 1 ? -1 : 1;
  translateX.value = panStartTX.value + dx * sign;
  translateY.value = panStartTY.value + dy * sign;
  [translateX.value, translateY.value] = clampTranslate(translateX.value, translateY.value);
}

function onMouseUp() {
  panning.value = false;
  panButton.value = null;
}

// Wheel zoom
function onWheel(e: WheelEvent) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
  zoomAt(e.clientX, e.clientY, delta);
}

// Touch handlers
function getTouchDist(t1: Touch, t2: Touch): number {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function getTouchMid(t1: Touch, t2: Touch): [number, number] {
  return [(t1.clientX + t2.clientX) / 2, (t1.clientY + t2.clientY) / 2];
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length === 2) {
    panning.value = false;
    touches.value = 2;
    touchStartDist.value = getTouchDist(e.touches[0], e.touches[1]);
    touchStartScale.value = scale.value;
    const [mx, my] = getTouchMid(e.touches[0], e.touches[1]);
    touchMidX.value = mx;
    touchMidY.value = my;
  } else if (e.touches.length === 1 && scale.value > 1) {
    touches.value = 1;
    touchPanStartX.value = e.touches[0].clientX;
    touchPanStartY.value = e.touches[0].clientY;
    touchStartTX_s.value = translateX.value;
    touchStartTY_s.value = translateY.value;
  }
}

function onTouchMove(e: TouchEvent) {
  if (e.touches.length === 2 && touches.value === 2) {
    e.preventDefault();
    const dist = getTouchDist(e.touches[0], e.touches[1]);
    const ratio = dist / touchStartDist.value;
    const newScale = clampScale(touchStartScale.value * ratio);
    const [mx, my] = getTouchMid(e.touches[0], e.touches[1]);
    const el = containerRef.value;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const [ccx, ccy] = containerCenter();
    const px = mx - rect.left;
    const py = my - rect.top;
    const scaleRatio = newScale / scale.value;
    translateX.value = (px - ccx) * (1 - scaleRatio) + translateX.value * scaleRatio;
    translateY.value = (py - ccy) * (1 - scaleRatio) + translateY.value * scaleRatio;
    scale.value = newScale;
    [translateX.value, translateY.value] = clampTranslate(translateX.value, translateY.value);
    touchMidX.value = mx;
    touchMidY.value = my;
    touchStartDist.value = dist;
    touchStartScale.value = newScale;
  } else if (e.touches.length === 1 && touches.value === 1 && scale.value > 1) {
    e.preventDefault();
    const dx = e.touches[0].clientX - touchPanStartX.value;
    const dy = e.touches[0].clientY - touchPanStartY.value;
    translateX.value = touchStartTX_s.value + dx;
    translateY.value = touchStartTY_s.value + dy;
    [translateX.value, translateY.value] = clampTranslate(translateX.value, translateY.value);
  }
}

function onTouchEnd() {
  touches.value = 0;
}

// Keyboard shortcuts
function onKeydown(e: KeyboardEvent) {
  if (!open.value) return;
  if (e.ctrlKey || e.metaKey) {
    if (e.key === "=" || e.key === "+") {
      e.preventDefault();
      zoomIn();
    } else if (e.key === "-") {
      e.preventDefault();
      zoomOut();
    } else if (e.key === "0") {
      e.preventDefault();
      resetZoom();
    }
  }
}

function onAuxClick(e: MouseEvent) {
  if (e.button === 1) e.preventDefault();
}

// Reset on close
watch(open, (val) => {
  if (!val) resetZoom();
});

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("mouseup", onMouseUp);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("mouseup", onMouseUp);
});

const transformStyle = computed(() => {
  return `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`;
});

const zoomPercent = computed(() => Math.round(scale.value * 100));
</script>

<template>
  <VDialog
    v-model="open"
    :fullscreen="mobile"
    :max-width="mobile ? undefined : '95vw'"
    content-class="media-viewer-dialog"
  >
    <VCard
      color="grey-darken-4"
      :class="{ 'media-viewer-card--mobile': mobile }"
      style="position: relative; overflow: hidden;"
    >
      <!-- Close button -->
      <VBtn
        icon="mdi-close"
        variant="text"
        color="white"
        class="media-viewer-close"
        style="position: absolute; top: 8px; right: 8px; z-index: 10;"
        @click="open = false"
      />

      <!-- Image area -->
      <div
        ref="containerRef"
        class="media-viewer-container"
        :class="{ 'media-viewer-container--mobile': mobile }"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @auxclick="onAuxClick"
        @wheel.prevent="onWheel"
        @contextmenu.prevent
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <img
          v-if="src"
          ref="imgRef"
          :src="src"
          :style="{ transform: transformStyle }"
          class="media-viewer-img"
          :class="{ 'is-panning': panning }"
          draggable="false"
          alt=""
        />
        <div v-else class="d-flex align-center justify-center text-white text-body-1" style="height: 50vh;">
          No image
        </div>
      </div>

      <!-- Caption -->
      <VCardText v-if="caption" class="text-white text-center pa-4 caption-text" :class="{ 'caption-text--mobile': mobile }">
        {{ caption }}
      </VCardText>

      <!-- Zoom controls toolbar -->
      <div class="zoom-toolbar" :class="{ 'zoom-toolbar--mobile': mobile }">
        <VTooltip text="Zoom out">
          <template #activator="{ props: tp }">
            <VBtn
              v-bind="tp"
              icon="mdi-magnify-minus"
              variant="text"
              color="white"
              :size="mobile ? 'default' : 'small'"
              :disabled="scale <= MIN_SCALE"
              @click="zoomOut"
            />
          </template>
        </VTooltip>
        <VSlider
          :model-value="scale"
          @update:model-value="(v: number) => { scale = clampScale(v); [translateX, translateY] = clampTranslate(translateX, translateY); }"
          :min="0.1"
          :max="10"
          :step="0.05"
          density="compact"
          hide-details
          color="white"
          track-color="white"
          :style="{ width: mobile ? '100px' : '120px' }"
          class="mx-2"
        />
        <VTooltip text="Reset zoom">
          <template #activator="{ props: tp }">
            <VBtn
              v-bind="tp"
              variant="text"
              color="white"
              :size="mobile ? 'default' : 'small'"
              class="text-caption font-weight-medium px-1"
              style="min-width: 52px;"
              @click="resetZoom"
            >
              {{ zoomPercent }}%
            </VBtn>
          </template>
        </VTooltip>
        <VTooltip text="Zoom in">
          <template #activator="{ props: tp }">
            <VBtn
              v-bind="tp"
              icon="mdi-magnify-plus"
              variant="text"
              color="white"
              :size="mobile ? 'default' : 'small'"
              :disabled="scale >= MAX_SCALE"
              @click="zoomIn"
            />
          </template>
        </VTooltip>
      </div>
    </VCard>
  </VDialog>
</template>

<style scoped>
.media-viewer-container {
  height: 85vh;
  overflow: hidden;
  position: relative;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  touch-action: none;
}

.media-viewer-container--mobile {
  height: calc(100vh - 120px);
}

.media-viewer-container:active {
  cursor: grabbing;
}

.media-viewer-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform-origin: center center;
  transition: none;
  pointer-events: none;
}

.media-viewer-img.is-panning {
  transition: none;
}

.caption-text {
  font-size: 1rem;
  line-height: 1.6;
}

.caption-text--mobile {
  font-size: 0.875rem;
  padding: 8px 12px !important;
}

.zoom-toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 10;
}

.zoom-toolbar--mobile {
  bottom: 8px;
  right: 8px;
  gap: 2px;
  padding: 6px 10px;
}

.media-viewer-dialog :deep(.v-overlay__content) {
  max-width: 95vw;
}

.media-viewer-card--mobile {
  border-radius: 0;
}
</style>
