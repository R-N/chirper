<script lang="ts">
import { Component } from "vue-facing-decorator";
import { Constructor } from "@/mixins/Constructor.vue";
import settingService from "../services/setting";
import rules from "@/validations-gen/settings.json";
import { parseLaravelRules } from "@/libs/validation";
import { Prop } from "vue-facing-decorator";
import { formatDate } from "@/libs/util.js";

export const SettingFormMixin = <TBase extends Constructor>(Base: TBase) => {
  @Component({
    name: "SettingFormMixin"
  })
  class SettingFormMixin extends Base {
    nameField = "key";
    @Prop({ default: [] }) settingTypes;

    formatDate(date) {
      return formatDate(date);
    }
  }
  return SettingFormMixin;
};
</script>
