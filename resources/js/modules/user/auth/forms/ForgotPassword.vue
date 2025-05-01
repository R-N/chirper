<script lang="ts">
import { Component, Prop, Ref, toNative } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';
import { useForm, router } from '@inertiajs/vue3';
import { VTextField, VBtn, VCardText, VCardActions } from 'vuetify/components';
import authService from '@/modules/user/auth/services/auth.js';

import CardTitle from '@/components/card/CardTitle.vue';

@Component({
  name: "ForgotPasswordForm",
  components: {
    CardTitle,
  }
})
class ForgotPasswordForm extends WorkingComponent {
  valid = true;
  @Prop({ type: String }) status;
  @Ref('form') formRef;

  formData = useForm({
      email: '',
  });

  async reset(){
    this.formData?.clearErrors?.();
    this.formRef.validate();
    if(!this.valid) return;
    
    await this.waitBusy(
      async () => {
        let res = await authService.forgotPassword(this.formData);
        this.tabStore.tabDialogs.push({
          title: this.$t('auth.check_email'),
          text: this.$t('password_reset.sent')
        });
      }, "globalBusy"
    );
  }
}
export { ForgotPasswordForm };
export default toNative(ForgotPasswordForm);
</script>
<template>
  <VForm ref="form" v-model="valid" @submit.prevent.stop="reset" class="p-2" :disabled="busy">
    <CardTitle>
      <h2 class="text-center">{{ $t('password_reset.title') }}</h2>
    </CardTitle>
    <VCardText>
      <VAlert v-if="status" type="success" dense class="mb-4">
        {{ status }}
      </VAlert>
      <p class="text-body-2 mb-4">
        {{ $t('password_reset.intro') }}
      </p>
      <VTextField
        v-model="formData.email" 
        class="bigger-input" 
        :label="$t('user.email')" 
        type="email" 
        name="email" 
        autocomplete="email" 
        :disabled="busy" 
        required
        :rules="[ v => !!v || $t('auth.email_required')]"
        :error-messages="formData.errors.email" 
      />
      <VBtn 
        raised 
        @click="reset" 
        color="primary" 
        variant="elevated"
        type="submit" 
        class="text-center w-100 mx-0" 
        :disabled="busy" 
        :loading="busy || formData.isSubmitting" 
      >
        {{ $t('form.reset') }}
      </VBtn>
    </VCardText>
  </VForm>
</template>
<style scoped>
</style>
