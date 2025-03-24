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
class ResetPasswordPage extends Vue {
  @Prop(String) email;
  @Prop(String) token;

  form = useForm({
    token: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  mounted(){
    this.form.token = this.token;
    this.form.email = this.email;
  }

  async submit() {
    //let target = route('password.store');
    let target = route('password.update');
    //await this.form.post(target);
    let res = await axios.post(target, this.form);
    this.form.reset('password', 'password_confirmation');
    router.visit(res.data.redirect || "/login");
  }
}
export default toNative(ResetPasswordPage);
</script>

<template>
    <Head title="Reset Password" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

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

            <div class="mt-4">
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="mt-4">
                <InputLabel for="password_confirmation" value="Confirm Password" />
                <TextInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Reset Password
                </PrimaryButton>
            </div>
        </form>
    </AuthenticationCard>
</template>
