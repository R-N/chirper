<script lang="ts">
export type Constructor<T = {}> = new (...args: any[]) => T;
export default Constructor;
</script>