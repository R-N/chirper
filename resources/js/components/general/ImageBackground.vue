<script lang="ts">
import { Vue, Component, Prop, toNative } from 'vue-facing-decorator';

@Component({
  name: "ImageBackground"
})
class ImageBackground extends Vue {
  @Prop(String) src;
}
export { ImageBackground };
export default toNative(ImageBackground);
</script>
<template>
  <img class="bg" :src="src"/>
</template>
<style scoped>
.bg {
  background-size: cover;
  opacity: 0.5;
  position: fixed;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
</style>