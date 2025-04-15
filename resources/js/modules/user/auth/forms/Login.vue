
<script lang="ts">

import { Component, Prop, toNative, Ref } from 'vue-facing-decorator';
import { WorkingComponent } from '@/components/WorkingComponent.vue';
import CardTitle from '@/components/card/CardTitle.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import InputError from '@/components/auth/InputError.vue';
import { VTextField, VCheckbox, VBtn, VCardText, VCardActions, } from 'vuetify/components';
import authService from '@/modules/user/auth/services/auth.js';
import { router } from '@inertiajs/vue3';

@Component({
  name: "LoginForm",
  components: {
    CardTitle,
    Link,
    InputError,
    VTextField, VCheckbox, VBtn, VCardText, VCardActions,
  }
})
class LoginForm extends WorkingComponent {
  valid = true;
  passwordVisible = false;
  @Prop({ type: Boolean }) canResetPassword;
  @Prop({ type: String }) status;
  @Ref('myForm') myForm;

  form = useForm({
      email: '',
      password: '',
      remember: false,
  });

  async login() {
    this.myForm.validate();
    if(!this.valid) return;
    const view = this;
    view.globalBusy = true;
    try{
      let res = await authService.login(this.form);
      router.visit(res.redirect || "/dashboard");
      this.form.reset('password');
    } finally {
      view.globalBusy = false;
    }
  }
}
export { LoginForm }
export default toNative(LoginForm);
</script>
<template>
  <VForm v-model="valid" ref="myForm" @submit.prevent="login" class="p-2" :disabled="busy">
    <CardTitle>
          <h2 class="text-center">Login</h2>
    </CardTitle>
    <VCardText>
      <div v-if="status" class="mb-4 text-green-600">{{ status }}</div>
      <VTextField 
        v-model="form.email" 
        class="bigger-input" 
        label="Email" 
        type="email" 
        name="email" 
        autocomplete="email" 
        required 
        autofocus 
        :disabled="busy" 
        :rules="[ v => !!v || 'Email harus diisi']"
      />
      <InputError 
        class="mt-2" 
        :message="form.errors.email" 
      />
      <VTextField 
        v-model="form.password" 
        class="bigger-input" 
        label="Password" 
        name="password" 
        autocomplete="current-password" 
        required 
        :disabled="busy" 
        :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="() => { passwordVisible = !passwordVisible }"
        :type="passwordVisible ? 'text' : 'password'"
        :rules="[ v => !!v || 'Password harus diisi']"
      />
      <InputError 
        class="mt-2" 
        :message="form.errors.password" 
      />
      <VCheckbox 
        v-model="form.remember" 
        label="Remember me" 
        density="compact"
      />
    </VCardText>
    <VCardActions class="d-flex justify-space-between">
      <Link 
        v-if="canResetPassword" 
        :href="route('password.request')" 
        class="text-sm"
      >
        Forgot password?
      </Link>
      <VBtn 
        @click="login" 
        color="primary" 
        variant="elevated"
        raised
        type="submit"
        class="text-center w-100 mx-0"
        :disabled="busy"
        :loading="busy || form.isSubmitting" 
      >
        Log in
      </VBtn>
    </VCardActions>
  </VForm>
</template>

<style scoped>
</style>
