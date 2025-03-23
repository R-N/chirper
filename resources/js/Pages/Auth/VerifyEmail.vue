<script lang="ts">
import { computed } from 'vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    GuestLayout,
    InputError,
    InputLabel,
    PrimaryButton,
    TextInput
  }
})
class VerifyEmailPage extends Vue {
  @Prop(String) status;
  form = useForm({
    email: '',
  });

  get verificationLinkSent(){
    return this.status === 'verification-link-sent';
  }

  async submit() {
    //await this.form.post(route('verification.send'));
    let res = await axios.post(route('verification.send'), this.form);
    router.visit(res.data.redirect || "/login");
  }
}
export default toNative(VerifyEmailPage);
</script>

<template>
    <GuestLayout>
        <Head title="Email Verification" />

        <div class="mb-4 text-sm text-gray-600">
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you? If you
            didn't receive the email, we will gladly send you another.
        </div>

        <div
            class="mb-4 text-sm font-medium text-green-600"
            v-if="verificationLinkSent"
        >
            A new verification link has been sent to the email address you
            provided during registration.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <PrimaryButton
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Resend Verification Email
                </PrimaryButton>

                <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >Log Out</Link
                >
            </div>
        </form>
    </GuestLayout>
</template>
