<script lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import DeleteUserForm from '../views/DeleteUserForm.vue';
import UpdatePasswordForm from '../views/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from '../views/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';

import { VContainer, VRow, VCol, VCard, VCardTitle, VCardText } from 'vuetify/components';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import profileService from '@/modules/user/profile/services/profile.js';
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    AppLayout,
    DeleteUserForm,
    UpdatePasswordForm,
    UpdateProfileInformationForm,
    Head,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardTitle,
    VCardText,
  }
})
class ProfileEditPage extends Vue {
  @Prop({ type: Boolean }) mustVerifyEmail;
  @Prop({ type: String }) status;
}
export default toNative(ProfileEditPage);
</script>

<template>
    <AppLayout>
        <Head title="Profile" />
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Profile
            </h2>
        </template>

        <VContainer class="d-flex flex-column ga-5" justify="center">
            <VCard title="Update Profile Information">
                <VCardText>
                    <UpdateProfileInformationForm
                        :must-verify-email="mustVerifyEmail"
                        :status="status"
                        :user="$page.props.auth.user"
                    />
                </VCardText>
            </VCard>
            <VCard title="Update Password">
                <VCardText>
                    <UpdatePasswordForm />
                </VCardText>
            </VCard>
            <VCard title="Delete Account">
                <VCardText>
                    <DeleteUserForm />
                </VCardText>
            </VCard>
        </VContainer>
    </AppLayout>
</template>