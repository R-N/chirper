<script lang="ts">
import { Component, Prop, Ref, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';
import { useForm, router } from '@inertiajs/vue3';
import InputError from '@/components/auth/InputError.vue';
import { VTextField, VBtn, VCardText, VCardActions } from 'vuetify/components';
import authService from '@/modules/user/auth/services/auth.js';

import CardTitle from '@/components/card/CardTitle.vue';

@Component({
  name: "ForgotPasswordForm",
  components: {
    CardTitle,
    InputError
  }
})
class ForgotPasswordForm extends WorkingComponent {
  valid = true;
  @Prop({ type: String }) status;
  @Ref('myForm') myForm;

  form = useForm({
      email: '',
  });

  async reset(){
    this.myForm.validate();
    if(!this.valid) return;
    const view = this;
    view.globalBusy = true;
    try{
      let res = await authService.forgotPassword(this.form);
      this.tabStore.tabDialogs.push({
        title: "Periksa Email Anda",
        text: "Link reset password telah dikirimkan ke alamat email akun Anda, jika username/email yang Anda masukkan benar."
      });
    } finally {
      view.globalBusy = false;
    }
  }
}
export { ForgotPasswordForm };
export default toNative(ForgotPasswordForm);
</script>
<template>
  <VForm ref="myForm" v-model="valid" @submit.prevent="reset" class="p-2" :disabled="busy">
    <CardTitle>
      <h2 class="text-center">Reset Password</h2>
    </CardTitle>
    <VCardText>
      <VAlert v-if="status" type="success" dense class="mb-4">
        {{ status }}
      </VAlert>
      <p class="text-body-2 mb-4">
        Forgot your password? No problem. Enter your email address and we will send you a password reset link.
      </p>
      <VTextField
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
        @click="reset" 
        color="primary" 
        variant="elevated"
        type="submit" 
        class="text-center w-100 mx-0" 
        :disabled="busy" 
        :loading="busy || form.isSubmitting" 
      >
        Reset
      </VBtn>
    </VCardText>
  </VForm>
</template>
<style scoped>
</style>
