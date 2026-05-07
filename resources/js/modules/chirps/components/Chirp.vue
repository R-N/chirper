<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useForm } from "@inertiajs/vue3";
import InputError from "@/components/form/InputError.vue";
import dayjs from "dayjs";
import {
  VMenu,
  VTextarea,
  VBtn,
  VIcon,
  VList,
  VListItem
} from "vuetify/components";
import chirpService from "../services/chirp";

const props = defineProps<{
  chirp: any;
}>();

const emit = defineEmits<{
  update: [chirp: any];
  destroy: [id: any];
}>();

const editing = ref(false);

const formData = useForm({
  message: ""
});

onMounted(() => {
  resetForm();
});

const createdAt = computed(() => {
  return dayjs(props.chirp.created_at).fromNow();
});

function resetForm(isEditing = false) {
  editing.value = isEditing;
  formData.reset();
  formData.message = props.chirp.message;
}

async function updateChirp() {
  let res = await chirpService.update(props.chirp, formData);
  Object.assign(props.chirp, res.chirp);
  emit("update", res.chirp);
  resetForm();
  editing.value = false;
}

async function destroyChirp() {
  let res = await chirpService.destroy(props.chirp);
  emit("destroy", props.chirp?.id ?? props.chirp);
}
</script>

<template>
  <div class="p-6 flex space-x-2">
    <VIcon size="32" class="text-gray-600">mdi-message</VIcon>

    <div class="flex-1">
      <div class="flex justify-between items-center">
        <div>
          <span class="text-gray-800">{{ chirp.user?.name }}</span>
          <small class="ml-2 text-sm text-gray-600">{{ createdAt }}</small>
          <small
            v-if="chirp.created_at !== chirp.updated_at"
            class="text-sm text-gray-600"
          >
            &middot; {{ $t("crud.edited") }}</small
          >
        </div>

        <VMenu v-if="chirp.user?.id === $page.props.auth.user.id">
          <template #activator="{ props }">
            <VBtn icon v-bind="props" variant="plain">
              <VIcon>mdi-dots-vertical</VIcon>
            </VBtn>
          </template>
          <VList>
            <VListItem @click="resetForm(true)">{{
              $t("form.edit")
            }}</VListItem>
            <VListItem @click.prevent="destroyChirp">{{
              $t("form.delete")
            }}</VListItem>
          </VList>
        </VMenu>
      </div>

      <form v-if="editing" @submit.prevent.stop="updateChirp">
        <VTextarea
          v-model="formData.message"
          class="mt-4"
          :label="$t('chirp.edit')"
          auto-grow
        />
        <InputError :message="formData.errors.message" class="mt-2" />

        <div class="mt-4 d-flex gap-2">
          <VBtn color="primary" variant="elevated" type="submit">{{
            $t("form.save")
          }}</VBtn>
          <VBtn color="secondary" variant="text" @click="resetForm(false)">{{
            $t("form.cancel")
          }}</VBtn>
        </div>
      </form>

      <p v-else class="mt-4 text-lg text-gray-900">{{ chirp.message }}</p>
    </div>
  </div>
</template>
