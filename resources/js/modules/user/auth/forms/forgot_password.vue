<script lang="ts">

import { Component, Prop, Ref, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

import CardTitle from '@/components/card/CardTitle.vue';

@Component({
  name: "ForgotPasswordForm",
  components: {
    CardTitle
  }
})
class ForgotPasswordForm extends WorkingComponent {
  valid = true;
  username = ''
  @Ref('myForm') myForm;

  async reset(){
    // this.myForm.validate();
    // if(!this.valid) return;
    // const view = this;
    // view.globalBusy = true;
    // try{
    //   await stores.client.user.recovery.reset_password(this.username);
    //   stores.app.pushTabDialog({
    //     title: "Periksa Email Anda",
    //     text: "Link reset password telah dikirimkan ke alamat email akun Anda, jika username/email yang Anda masukkan benar."
    //   });
    // } catch (error) {
    //   if (stores.helper.error.showFilteredError(error, 
    //     [TUserError, TEmailError, TUserEmailError]
    //   )) return;
    //   throw error;
    // } finally {
    //   view.globalBusy = false;
    // }
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
      <VTextField
        class="bigger-input" 
        label="Username/Email" 
        v-model="username" 
        :disabled="busy" 
        required
        :rules="[ v => !!v || 'Username/email harus diisi']"
      />
      <VBtn raised color="primary" type="submit" class="text-center w-100 mx-0" :disabled="busy" :loading="busy">Reset</VBtn>
  </VCardText>
  </VForm>
</template>
<style scoped>
</style>
