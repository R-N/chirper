<script lang="ts">
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, useForm } from '@inertiajs/vue3';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    AuthenticationCard,
    AuthenticationCardLogo,
    InputError,
    InputLabel,
    PrimaryButton,
    TextInput,
    Head
  }
})
class ForgotPasswordPage extends Vue {
  @Prop(String) status;
  form = useForm({
    email: '',
  });

  async submit() {
    //await this.form.post(route('password.email'));
    let res = await axios.post(route('password.email'), this.form);
    this.form.reset();
    router.visit(res.data.redirect || "/login");
  }
}
export default toNative(ForgotPasswordPage);
</script>

<template>
    <Head title="Forgot Password" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
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

            <div class="flex items-center justify-end mt-4">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Email Password Reset Link
                </PrimaryButton>
            </div>
        </form>
    </AuthenticationCard>
</template>
