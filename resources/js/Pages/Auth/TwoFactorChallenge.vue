<script lang="ts">
import { nextTick } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import { VCard, VCardText, VCardTitle, VCardActions, VTextField, VLabel, VBtn, VSpacer } from 'vuetify/components';
import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    AuthenticationCardLogo,
    InputError,
    VCard,
    VCardText,
    VCardTitle,
    VCardActions,
    VTextField,
    VLabel,
    VBtn,
    VSpacer,
    Head,
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
  
  <VCard class="mx-auto" max-width="400" variant="elevated" elevation="6">
    <VCardTitle class="text-center">
      <AuthenticationCardLogo />
    </VCardTitle>
    <VCardText class="text-gray-600 dark:text-gray-400">
      <template v-if="!recovery">
        Please confirm access to your account by entering the authentication code provided by your authenticator application.
      </template>
      <template v-else>
        Please confirm access to your account by entering one of your emergency recovery codes.
      </template>
    </VCardText>
    
    <VCardText>
      <form @submit.prevent="submit">
        <div v-if="!recovery">
          <VLabel for="code">Code</VLabel>
          <VTextField
            id="code"
            ref="codeInput"
            v-model="form.code"
            type="text"
            inputmode="numeric"
            variant="outlined"
            autocomplete="one-time-code"
            autofocus
          />
          <InputError class="mt-2" :message="form.errors.code" />
        </div>
        
        <div v-else>
          <VLabel for="recovery_code">Recovery Code</VLabel>
          <VTextField
            id="recovery_code"
            ref="recoveryCodeInput"
            v-model="form.recovery_code"
            type="text"
            variant="outlined"
            autocomplete="one-time-code"
          />
          <InputError class="mt-2" :message="form.errors.recovery_code" />
        </div>
      </form>
    </VCardText>
    
    <VCardActions class="d-flex justify-end">
      <VBtn variant="text" @click.prevent="toggleRecovery">
        <template v-if="!recovery">Use a recovery code</template>
        <template v-else>Use an authentication code</template>
      </VBtn>
      <VSpacer />
      <VBtn color="primary" variant="elevated" :loading="form.processing" @click="submit">
        Log in
      </VBtn>
    </VCardActions>
  </VCard>
</template>
