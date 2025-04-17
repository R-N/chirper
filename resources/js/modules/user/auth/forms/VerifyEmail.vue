
<script lang="ts">

import { Component, Prop, Ref, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

import { useForm, router } from '@inertiajs/vue3';
import InputError from '@/components/auth/InputError.vue';
import { VTextField, VBtn, VCardText, VCardActions } from 'vuetify/components';
import authService from '@/modules/user/auth/services/auth.js';
import CardTitle from '@/components/card/CardTitle.vue';

@Component({
  name: "VerifyEmailForm",
  components: {
    CardTitle,
    InputError
  }
})
class VerifyEmailForm extends WorkingComponent {
  valid = true;
  @Prop({ type: String }) status;
  @Ref('myForm') myForm;

  form = useForm({
      email: '',
  });


  get verificationLinkSent(){
    return this.status === 'verification-link-sent';
  }

  async submit() {
    let res = await authService.verifyEmail(this.form);
    router.visit(res.redirect || "/login");
  }
  async send(){
    this.myForm.validate();
    if(!this.valid) return;
    const view = this;
    view.globalBusy = true;
    try{
      let res = await authService.verifyEmail(this.form);
      this.appStore.tabDialogs.push({
        title: "Periksa Email Anda",
        text: "Link verifikasi email telah dikirimkan ke email akun Anda, jika username/email yang Anda masukkan benar."
      });
    } finally {
      view.globalBusy = false;
    }
  }
}
export { VerifyEmailForm };
export default toNative(VerifyEmailForm);
</script>
<template>
  <VForm ref="myForm" v-model="valid" @submit.prevent="send" class="p-2" :disabled="busy">
    <CardTitle>
      <h2 class="text-center">Verify Email</h2>
    </CardTitle>
    <VCardText>
      <VAlert v-if="status" type="success" dense class="mb-4">
        {{ status }}
      </VAlert>
      <p class="text-body-2 mb-4">
          Before continuing, could you verify your email address by clicking on the link we just emailed to you? 
          If you didn't receive the email, we will gladly send you another.
      </p>
      <VTextField
        v-if="!isLoggedIn"
        v-model="form.email" 
        class="bigger-input" 
        label="Email" 
        type="email" 
        name="email" 
        autocomplete="email" 
        :disabled="busy" 
        required
        :rules="[ v => !!v || 'Email harus diisi']"
      />
      <InputError 
        class="mt-2" 
        :message="form.errors.email" 
      />
      <VBtn 
        raised 
        @click="send" 
        color="primary" 
        variant="elevated"
        type="submit" 
        class="text-center w-100 mx-0" 
        :disabled="busy" 
        :loading="busy || form.isSubmitting" 
      >
        Send
      </VBtn>
    </VCardText>
  </VForm>
</template>

<style scoped>
</style>
