<script lang="ts">
import { nextTick } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import { VTextField, VBtn, VCard, VCardTitle, VCardText, VCardActions } from 'vuetify/components';
import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    AuthenticationCardLogo,
    VTextField,
    VBtn,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    Head
  }
})
class TwoFactorChallengePage extends Vue {
  recovery = false;

  form = useForm({
    code: '',
    recovery_code: '',
  });

  @Ref('recoveryCodeInput') recoveryCodeInput;
  @Ref('codeInput') codeInput;

  async toggleRecovery(){
    this.recovery = !this.recovery;

    await nextTick();

    if (this.recovery) {
      this.recoveryCodeInput.value.focus();
      this.form.code = '';
    } else {
      this.codeInput.value.focus();
      this.form.recovery_code = '';
    }
  };

  async submit() {
    // await this.form.post(route('two-factor.login'));
    let res = await axios.post(route('two-factor.login'), this.form);
    router.visit(res.data.redirect || "/dashboard");
  }
}
export default toNative(TwoFactorChallengePage);


</script>

<template>
  <Head title="Two-factor Confirmation" />
  <div class="d-flex justify-center mt-10">
    <VCard class="pa-6" width="400">
      <VCardTitle class="text-center">
        <AuthenticationCardLogo />
      </VCardTitle>
      <VCardText>
        <p class="text-gray-600 text-sm">
          <template v-if="!recovery">
            Please confirm access to your account by entering the authentication code provided by your authenticator application.
          </template>
          <template v-else>
            Please confirm access to your account by entering one of your emergency recovery codes.
          </template>
        </p>
        
        <VTextField
          v-if="!recovery"
          id="code"
          ref="codeInput"
          v-model="form.code"
          label="Authentication Code"
          type="text"
          inputmode="numeric"
          autofocus
          autocomplete="one-time-code"
          :error-messages="form.errors.code"
        />
        
        <VTextField
          v-else
          id="recovery_code"
          ref="recoveryCodeInput"
          v-model="form.recovery_code"
          label="Recovery Code"
          type="text"
          autocomplete="one-time-code"
          :error-messages="form.errors.recovery_code"
        />
      </VCardText>
      
      <VCardActions class="d-flex justify-space-between">
        <VBtn variant="text" @click="toggleRecovery">
          <template v-if="!recovery">Use a recovery code</template>
          <template v-else>Use an authentication code</template>
        </VBtn>
        <VBtn color="primary" variant="elevated" :loading="form.processing" @click="submit">
          Log in
        </VBtn>
      </VCardActions>
    </VCard>
  </div>
</template>
