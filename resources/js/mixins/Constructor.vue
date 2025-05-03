<script lang="ts">
import { Vue } from "vue-facing-decorator";
export type ConstructorVue<T extends typeof Vue = typeof Vue> = new (
  ...args: any[]
) => T;
export type Constructor<T = {}> = new (...args: any[]) => T;
export default Constructor;
</script>
