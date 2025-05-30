<script lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import DeleteUserForm from "../views/DeleteUserForm.vue";
import LogoutOtherBrowserSessionsForm from "../views/LogoutOtherBrowserSessionsForm.vue";
import SectionBorder from "@/components/auth/SectionBorder.vue";
import TwoFactorAuthenticationForm from "../views/TwoFactorAuthenticationForm.vue";
import UpdatePasswordForm from "../views/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "../views/UpdateProfileInformationForm.vue";

import { Component, Prop, Vue, toNative } from "vue-facing-decorator";

@Component({
  components: {
    AppLayout,
    DeleteUserForm,
    LogoutOtherBrowserSessionsForm,
    SectionBorder,
    TwoFactorAuthenticationForm,
    UpdatePasswordForm,
    UpdateProfileInformationForm
  }
})
class ProfileShowPage extends Vue {
  @Prop({ type: Boolean }) confirmsTwoFactorAuthentication;
  @Prop({ type: Array }) sessions;
}
export default toNative(ProfileShowPage);
</script>

<template>
  <AppLayout :title="$t('profile.title')">
    <template #header>
      <h2
        class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
      >
        {{ $t("profile.title") }}
      </h2>
    </template>

    <div>
      <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <div v-if="$page.props.jetstream.canUpdateProfileInformation">
          <UpdateProfileInformationForm :user="$page.props.auth.user" />

          <SectionBorder />
        </div>

        <div v-if="$page.props.jetstream.canUpdatePassword">
          <UpdatePasswordForm class="mt-10 sm:mt-0" />

          <SectionBorder />
        </div>

        <div v-if="$page.props.jetstream.canManageTwoFactorAuthentication">
          <TwoFactorAuthenticationForm
            :requires-confirmation="confirmsTwoFactorAuthentication"
            class="mt-10 sm:mt-0"
          />

          <SectionBorder />
        </div>

        <LogoutOtherBrowserSessionsForm
          :sessions="sessions"
          class="mt-10 sm:mt-0"
        />

        <template v-if="$page.props.jetstream.hasAccountDeletionFeatures">
          <SectionBorder />

          <DeleteUserForm class="mt-10 sm:mt-0" />
        </template>
      </div>
    </div>
  </AppLayout>
</template>
