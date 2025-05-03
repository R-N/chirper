<script lang="ts">
import { Constructor } from "./Constructor.vue";
export const ModelMixin = ({
  name = null,
  type = null,
  default: defaultValue = null
}) => {
  const hiddenName = name ? `_${name}` : "value";
  const modelName = name ? `${name}Model` : "model";
  name = name ?? "modelValue";
  return {
    props: {
      [name]: {
        type: type,
        required: false
      }
    },
    data() {
      return {
        [hiddenName]: defaultValue
      };
    },
    computed: {
      [modelName]: {
        get() {
          if (this[name] !== undefined) {
            return this[name];
          }
          return this[hiddenName];
        },
        set(value) {
          this[hiddenName] = value;
          if (this[name] !== undefined) {
            this.$emit(`update:${name}`, value);
          }
        }
      }
    }
  };
};
</script>
