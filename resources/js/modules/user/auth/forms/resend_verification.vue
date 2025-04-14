
<script lang="ts">

import { Component, Prop, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';

import CardTitle from '@/components/card/CardTitle.vue';

@Component({
  name: "ResendVerificationForm",
  components: {
    CardTitle
  }
})
class ResendVerificationForm extends WorkingComponent {
  valid = true;
  username = ''

  async send(){
    // this.$refs.myForm.validate();
    // if(!this.valid) return;
    // const view = this;
    // view.globalBusy = true;
    // try{
    //   await stores.client.user.recovery.resend_verification(this.username);
    //   stores.app.pushTabDialog({
    //     title: "Periksa Email Anda",
    //     text: "Link verifikasi email telah dikirimkan ke email akun Anda, jika username/email yang Anda masukkan benar."
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
export { ResendVerificationForm };
export default toNative(ResendVerificationForm);
</script>
<template>
  <VForm ref="myForm" v-model="valid" @submit.prevent="send" class="p-2" :disabled="busy">
  <CardTitle>
        <h2 class="text-center">Verifikasi Email</h2>
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
      <VBtn raised color="primary" type="submit" class="text-center w-100 mx-0" :disabled="busy" :loading="busy">Kirim</VBtn>
  </VCardText>
  </VForm>
</template>

<style scoped>
</style>
