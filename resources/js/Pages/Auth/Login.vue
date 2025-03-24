<script lang="ts">
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from '@/Components/Checkbox.vue';
// import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 
import { router } from '@inertiajs/vue3';
import { useAuthStore } from '@/Stores/auth';

@Component({
  components: {
    AuthenticationCard,
    AuthenticationCardLogo,
    Checkbox,
    //GuestLayout,
    InputError,
    InputLabel,
    PrimaryButton,
    TextInput,
    Head,
    Link
  }
})
class LoginPage extends Vue {
  @Prop(Boolean) canResetPassword;
  @Prop(String) status;

  form = useForm({
      email: '',
      password: '',
      remember: false,
  });

  async login() {
    const authStore = useAuthStore();

    let form = this.form.transform(data => ({
        ...data,
        remember: this.form.remember ? 'on' : '',
    }));

    //await form.post(route('login'));
    let res = await axios.post("/login", form);
    this.form.reset('password');
    authStore.updateUser(res.data.user);
    authStore.setAuthToken(res.data.auth_token);
    router.visit(res.data.redirect || "/dashboard");
  }
}
export default toNative(LoginPage);
</script>

<template>
    <Head title="Log in" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
            {{ status }}
        </div>

        <form @submit.prevent="login">
            <div>
                <InputLabel for="email" value="Email" />
                <TextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    autocomplete="username"
                />
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="current-password"
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <Checkbox v-model:checked="form.remember" name="remember" />
                    <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                <Link v-if="canResetPassword" :href="route('password.request')" class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                    Forgot your password?
                </Link>

                <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Log in
                </PrimaryButton>
            </div>
        </form>
    </AuthenticationCard>
</template>
