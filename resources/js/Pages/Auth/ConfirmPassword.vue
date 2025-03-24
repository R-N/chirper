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
class ConfirmPasswordPage extends Vue {
  form = useForm({
    password: '',
  });

  @Ref('passwordInput') passwordInput;

  async submit() {
    //await this.form.post(route('password.confirm'));
    let res = await axios.post(route('password.confirm'), this.form);
    this.form.reset();
    this.passwordInput.value.focus();
    router.visit(res.data.redirect || "/login");
  }
}
export default toNative(ConfirmPasswordPage);
</script>

<template>
    <Head title="Secure Area" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            This is a secure area of the application. Please confirm your password before continuing.
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="current-password"
                    autofocus
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="flex justify-end mt-4">
                <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Confirm
                </PrimaryButton>
            </div>
        </form>
    </AuthenticationCard>
</template>
