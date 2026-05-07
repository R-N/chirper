<script setup lang="ts">
import { ref, onMounted } from "vue";
import { router, useForm } from "@inertiajs/vue3";
import ActionMessage from "@/components/auth/ActionMessage.vue";
import FormSection from "@/components/auth/FormSection.vue";
import InputError from "@/components/form/InputError.vue";
import {
  VTextField,
  VFileInput,
  VBtn,
  VCard,
  VImg,
  VAvatar,
  VRow,
  VCol
} from "vuetify/components";
import profileService from "@/modules/user/profile/services/profile.js";

const props = defineProps<{
  user: any;
}>();

const photoInput = ref<any>(null);
const verificationLinkSent = ref<boolean | null>(null);
const photoPreview = ref<string | null>(null);

const formData = useForm({
  _method: "PUT",
  name: "",
  email: "",
  photo: null as File | null
});

onMounted(() => {
  formData.name = props.user.name;
  formData.email = props.user.email;
});

async function updateProfileInformation() {
  if (photoInput.value) {
    formData.photo = photoInput.value.files[0];
  }

  try {
    let res = await profileService.updateProfileInformation(
      formData,
      photoInput.value.files[0]
    );
    clearPhotoFileInput();
    router.reload({ preserveScroll: true });
  } catch (error) {
    if (error.response?.status === 422) {
      formData.errors = error.response.data.errors;
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

function sendEmailVerification() {
  verificationLinkSent.value = true;
}

function selectNewPhoto() {
  photoInput.value.click();
}

async function updatePhotoPreview() {
  const photo = photoInput.value.files[0];

  if (!photo) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    photoPreview.value = e.target.result;
  };

  return await reader.readAsDataURL(photo);
}

async function deletePhoto() {
  let res = await profileService.deletePhoto();
  photoPreview.value = null;
  clearPhotoFileInput();
  router.reload({ preserveScroll: true });
}

function clearPhotoFileInput() {
  if (photoInput.value?.value) {
    photoInput.value.value = null;
  }
}
</script>

<template>
  <FormSection @submitted="updateProfileInformation">
    <template #title>
      {{ $t("profile.info_title") }}
    </template>

    <template #description>
      {{ $t("profile.info_desc") }}
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
            :error-messages="formData.errors.photo"
          />

          <VAvatar
            v-if="!photoPreview"
            :image="user.profile_photo_url"
            :alt="user.name"
            size="80"
            cover
          />
          <VAvatar v-if="photoPreview" :image="photoPreview" size="80" />

          <div class="mt-2">
            <VBtn
              color="secondary"
              class="me-2"
              @click.prevent="photoInput?.click()"
            >
              {{ $t("profile.select_photo") }}
            </VBtn>
            <VBtn
              color="error"
              v-if="user.profile_photo_path"
              @click.prevent="deletePhoto"
            >
              {{ $t("profile.remove_photo") }}
            </VBtn>
          </div>

          <InputError :message="formData.errors.photo" class="mt-2" />
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="formData.name"
            :label="$t('user.name')"
            required
            autocomplete="name"
            :error-messages="formData.errors.name"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="formData.email"
            :label="$t('user.email')"
            required
            autocomplete="username"
            type="email"
            :error-messages="formData.errors.email"
          />

          <div
            v-if="
              $page.props.jetstream.hasEmailVerification &&
              user.email_verified_at === null
            "
          >
            <p class="text-body-2 mt-2">
              {{ $t("profile.email_unverified") }}
              <VBtn
                variant="text"
                @click.prevent="verificationLinkSent = true"
                >{{ $t("verify_email.submit") }}</VBtn
              >
            </p>

            <div
              v-show="verificationLinkSent"
              class="mt-2 font-weight-bold text-green"
            >
              {{ $t("verify_email.sent") }}
            </div>
          </div>
        </VCol>
      </VRow>
    </template>

    <template #actions>
      <ActionMessage :on="formData.recentlySuccessful" class="me-3">
        {{ $t("form.saved") }}
      </ActionMessage>
      <VBtn
        color="primary"
        variant="elevated"
        type="submit"
        :loading="formData.processing"
        @click="updateProfileInformation"
      >
        {{ $t("form.save") }}
      </VBtn>
    </template>
  </FormSection>
</template>
