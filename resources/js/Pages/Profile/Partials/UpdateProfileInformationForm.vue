<script lang="ts">
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { Link, router, useForm, usePage } from '@inertiajs/vue3';
import { VTextField, VFileInput, VBtn, VCard, VImg } from 'vuetify/components';

import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 


@Component({
  components: {
    ActionMessage,
    FormSection,
    InputError,
    PrimaryButton,
    SecondaryButton,
    VTextField,
    VFileInput,
    VBtn,
    VCard,
    VImg,
  }
})
class UpdateProfileInformationForm extends Vue {
//   @Prop(Boolean) mustVerifyEmail;
//   @Prop(String) status;
  @Prop(Object) user = null;

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

  async submit() {
    //await this.form.patch(route('profile.update'));
    let res = await axios.patch(route('profile.update'), this.form);
  }

  async updateProfileInformation(){
    if (this.photoInput) {
      this.form.photo = this.photoInput.files[0];
    }

    // this.form.post(route('user-profile-information.update'), {
    //     errorBag: 'updateProfileInformation',
    //     preserveScroll: true,
    //     onSuccess: () => this.clearPhotoFileInput(),
    // });

    const formData = new FormData();
    
    formData.append("name", this.form.name);
    formData.append("email", this.form.email);
    //formData.append('_method', 'PUT');
    if (this.photoInput && this.photoInput.files[0]) {
      formData.append("photo", this.photoInput.files[0]);
    }
    
    try{
      let res = await axios.post(route('user-profile-information.update'), formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: {
          // Laravel won't process multipart/form-data in a PUT request
          // So we send a POST request but spoof it as PUT
          _method: "PUT", 
        },
      });
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
    // router.delete(route('current-user-photo.destroy'), {
    //     preserveScroll: true,
    //     onSuccess: () => {
    //         this.photoPreview = null;
    //         this.clearPhotoFileInput();
    //     },
    // });
    let res = await axios.delete(route('current-user-photo.destroy'));
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
  <FormSection @submitted="updateProfileInformation" enctype="multipart/form-data">
    <template #title>
      Profile Information
    </template>

    <template #description>
      Update your account's profile information and email address.
    </template>

    <template #form>
      <!-- Profile Photo -->
      <VRow>
        <VCol v-if="$page.props.jetstream.managesProfilePhotos" cols="12"  class="d-flex flex-column">
          <VFileInput
            id="photo"
            class="d-none"
            ref="photoInput"
            label="Photo"
            accept="image/png, image/jpeg"
            @change="updatePhotoPreview"
          />

          <VAvatar v-if="!photoPreview" :image="user.profile_photo_url" :alt="user.name" size="80" cover />
          <VAvatar v-if="photoPreview" :image="photoPreview" size="80" />

          <div class="mt-2">
            <VBtn color="secondary" class="me-2" @click.prevent="photoInput?.click()">
              Select A New Photo
            </VBtn>
            <VBtn color="secondary" v-if="user.profile_photo_path" @click.prevent="deletePhoto">
              Remove Photo
            </VBtn>
          </div>

          <InputError :message="form.errors.photo" class="mt-2" />
        </VCol>
      </VRow>

      <!-- Name -->
      <VRow>
        <VCol cols="12">
          <VTextField v-model="form.name" label="Name" required autocomplete="name" />
          <InputError :message="form.errors.name" class="mt-2" />
        </VCol>
      </VRow>

      <!-- Email -->
      <VRow>
        <VCol cols="12">
          <VTextField v-model="form.email" label="Email" required autocomplete="username" type="email" />
          <InputError :message="form.errors.email" class="mt-2" />

          <div v-if="$page.props.jetstream.hasEmailVerification && user.email_verified_at === null">
            <p class="text-sm mt-2">
              Your email address is unverified.
              <VBtn variant="text" @click.prevent="sendEmailVerification">Click here to re-send the verification email.</VBtn>
            </p>

            <div v-show="verificationLinkSent" class="mt-2 font-medium text-sm text-green-600">
              A new verification link has been sent to your email address.
            </div>
          </div>
        </VCol>
      </VRow>
    </template>

    <template #actions>
      <ActionMessage :on="form.recentlySuccessful" class="me-3">
        Saved.
      </ActionMessage>

      <VBtn color="primary" variant="elevated" type="submit" :disabled="form.processing">
        Save
      </VBtn>
    </template>
  </FormSection>
</template>
