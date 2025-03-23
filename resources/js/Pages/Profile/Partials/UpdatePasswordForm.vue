<script lang="ts">
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    InputError,
    InputLabel,
    PrimaryButton,
    TextInput
  }
})
class UpdatePasswordForm extends Vue {
  @Ref('passwordInput') passwordInput;
  @Ref('currentPasswordInput') currentPasswordInput;

  form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  async updatePassword() {
    // form.put(route('password.update'), {
    //     preserveScroll: true,
    //     onSuccess: () => form.reset(),
    //     onError: () => {
    //         if (form.errors.password) {
    //             form.reset('password', 'password_confirmation');
    //             passwordInput.value.focus();
    //         }
    //         if (form.errors.current_password) {
    //             form.reset('current_password');
    //             currentPasswordInput.value.focus();
    //         }
    //     },
    // });
    try{
        let res = await axios.put('/user/password', this.form);
        this.form.reset();
        router.visit(res.data.redirect || "/login");
    }catch{
        if (this.form.errors.password) {
            this.form.reset('password', 'password_confirmation');
            this.passwordInput.focus();
        }
        if (this.form.errors.current_password) {
            this.form.reset('current_password');
            this.currentPasswordInput.focus();
        }
    }
  }
}
export default toNative(UpdatePasswordForm);
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Update Password
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Ensure your account is using a long, random password to stay
                secure.
            </p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <div>
                <InputLabel for="current_password" value="Current Password" />

                <TextInput
                    id="current_password"
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="current-password"
                />

                <InputError
                    :message="form.errors.current_password"
                    class="mt-2"
                />
            </div>

            <div>
                <InputLabel for="password" value="New Password" />

                <TextInput
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />

                <InputError :message="form.errors.password" class="mt-2" />
            </div>

            <div>
                <InputLabel
                    for="password_confirmation"
                    value="Confirm Password"
                />

                <TextInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />

                <InputError
                    :message="form.errors.password_confirmation"
                    class="mt-2"
                />
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="form.processing">Save</PrimaryButton>

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="form.recentlySuccessful"
                        class="text-sm text-gray-600"
                    >
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>
