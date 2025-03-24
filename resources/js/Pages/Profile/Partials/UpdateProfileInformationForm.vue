<script lang="ts">
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Link, router, useForm, usePage } from '@inertiajs/vue3';

import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 


@Component({
  components: {
    ActionMessage,
    FormSection,
    InputError,
    InputLabel,
    PrimaryButton,
    SecondaryButton,
    TextInput,
    Link
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
    if (this.photoInput) {
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
            <div v-if="$page.props.jetstream.managesProfilePhotos" class="col-span-6 sm:col-span-4">
                <!-- Profile Photo File Input -->
                <input
                    id="photo"
                    ref="photoInput"
                    type="file"
                    class="hidden"
                    @change="updatePhotoPreview"
                    accept=".jpg,.jpeg,.png"
                >

                <InputLabel for="photo" value="Photo" />

                <!-- Current Profile Photo -->
                <div v-show="! photoPreview" class="mt-2">
                    <img :src="user.profile_photo_url" :alt="user.name" class="rounded-full size-20 object-cover">
                </div>

                <!-- New Profile Photo Preview -->
                <div v-show="photoPreview" class="mt-2">
                    <span
                        class="block rounded-full size-20 bg-cover bg-no-repeat bg-center"
                        :style="'background-image: url(\'' + photoPreview + '\');'"
                    />
                </div>

                <SecondaryButton class="mt-2 me-2" type="button" @click.prevent="selectNewPhoto">
                    Select A New Photo
                </SecondaryButton>

                <SecondaryButton
                    v-if="user.profile_photo_path"
                    type="button"
                    class="mt-2"
                    @click.prevent="deletePhoto"
                >
                    Remove Photo
                </SecondaryButton>

                <InputError :message="form.errors.photo" class="mt-2" />
            </div>

            <!-- Name -->
            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="name" value="Name" />
                <TextInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full"
                    required
                    autocomplete="name"
                />
                <InputError :message="form.errors.name" class="mt-2" />
            </div>

            <!-- Email -->
            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="email" value="Email" />
                <TextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autocomplete="username"
                />
                <InputError :message="form.errors.email" class="mt-2" />

                <div v-if="$page.props.jetstream.hasEmailVerification && user.email_verified_at === null">
                    <p class="text-sm mt-2 dark:text-white">
                        Your email address is unverified.

                        <Link
                            :href="route('verification.send')"
                            method="post"
                            as="button"
                            class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            @click.prevent="sendEmailVerification"
                        >
                            Click here to re-send the verification email.
                        </Link>
                    </p>

                    <div v-show="verificationLinkSent" class="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                        A new verification link has been sent to your email address.
                    </div>
                </div>
            </div>
        </template>

        <template #actions>
            <ActionMessage :on="form.recentlySuccessful" class="me-3">
                Saved.
            </ActionMessage>

            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Save
            </PrimaryButton>
        </template>
    </FormSection>
</template>
