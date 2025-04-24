<script lang="ts">
import ActionMessage from '@/components/auth/ActionMessage.vue';
import FormSection from '@/components/auth/FormSection.vue';
import InputError from '@/components/auth/InputError.vue';
import { Link, router, useForm, usePage } from '@inertiajs/vue3';
import { VTextField, VFileInput, VBtn, VCard, VImg, VAvatar, VRow, VCol } from 'vuetify/components';

import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import profileService from '@/modules/user/profile/services/profile.js';

@Component({
  components: {
    InputError,
    ActionMessage,
    FormSection,
    VTextField,
    VFileInput,
    VBtn,
    VCard,
    VImg,
    VAvatar,
    VRow,
    VCol,
  }
})
class UpdateProfileInformationForm extends Vue {
//   @Prop({ type: Boolean }) mustVerifyEmail;
//   @Prop({ type: String }) status;
  @Prop({ type: Object }) user = null;

  form = useForm({
    _method: 'PUT',
    name: '',
    email: '',
    photo: null,
  });

  verificationLinkSent = null;
  photoPreview = null;
  @Ref('photoInput') photoInput;

  mounted(){
    // this.user = usePage().props.auth.user;
    this.form.name = this.user.name;
    this.form.email = this.user.email;
  }

  async updateProfileInformation(){
    if (this.photoInput) {
      this.form.photo = this.photoInput.files[0];
    }
    
    try{
      let res = await profileService.updateProfileInformation(this.form, this.photoInput.files[0]);
      this.clearPhotoFileInput();
      router.reload({ preserveScroll: true });
    } catch (error) {
      if (error.response?.status === 422) {
        this.form.errors = error.response.data.errors;
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  sendEmailVerification(){
    this.verificationLinkSent = true;
  };

  selectNewPhoto(){
    this.photoInput.click();
  };

  async updatePhotoPreview(){
    const photo = this.photoInput.files[0];

    if (! photo) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        this.photoPreview = e.target.result;
    };

    return await reader.readAsDataURL(photo);
  };

  async deletePhoto(){
    let res = await profileService.deletePhoto();
    this.photoPreview = null;
    this.clearPhotoFileInput();
    router.reload({ preserveScroll: true });
  };

  clearPhotoFileInput(){
    if (this.photoInput?.value) {
      this.photoInput.value = null;
    }
  };
}
export default toNative(UpdateProfileInformationForm);
</script>

<template>
  <FormSection @submitted="updateProfileInformation">
    <template #title>
      {{ $t('profile.info_title') }}
    </template>

    <template #description>
      {{ $t('profile.info_desc') }}
    </template>

    <template #form>    
      <VRow>
        <VCol cols="12" class="d-flex flex-column">
          <VFileInput
            id="photo"
            class="d-none"
            ref="photoInput"
            :label="$t('profile.photo')"
            accept="image/png, image/jpeg"
            @change="updatePhotoPreview"
          />

          <VAvatar v-if="!photoPreview" :image="user.profile_photo_url" :alt="user.name" size="80" cover />
          <VAvatar v-if="photoPreview" :image="photoPreview" size="80" />

          <div class="mt-2">
            <VBtn color="secondary" class="me-2" @click.prevent="photoInput?.click()">
              {{ $t('profile.select_photo') }}
            </VBtn>
            <VBtn color="error" v-if="user.profile_photo_path" @click.prevent="deletePhoto">
              {{ $t('profile.remove_photo') }}
            </VBtn>
          </div>

          <InputError :message="form.errors.photo" class="mt-2" />
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12">
          <VTextField v-model="form.name" :label="$t('user.name')" required autocomplete="name" />
          <InputError :message="form.errors.name" class="mt-2" />
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12">
          <VTextField v-model="form.email" :label="$t('user.email')" required autocomplete="username" type="email" />
          <InputError :message="form.errors.email" class="mt-2" />

          <div v-if="$page.props.jetstream.hasEmailVerification && user.email_verified_at === null">
            <p class="text-body-2 mt-2">
              {{ $t('profile.email_unverified') }}
              <VBtn variant="text" @click.prevent="verificationLinkSent = true">{{ $t('verify_email.submit') }}</VBtn>
            </p>

            <div v-show="verificationLinkSent" class="mt-2 font-weight-bold text-green">
              {{ $t('verify_email.sent') }}
            </div>
          </div>
        </VCol>
      </VRow>
    </template>

    <template #actions>
      <ActionMessage :on="form.recentlySuccessful" class="me-3">
        {{ $t('form.saved') }}
      </ActionMessage>
      <VBtn color="primary" variant="elevated" type="submit" :loading="form.processing" @click="updateProfileInformation">
        {{ $t('form.save') }}
      </VBtn>
    </template>
  </FormSection>
</template>
