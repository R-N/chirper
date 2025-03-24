<script lang="ts">
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';

import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    ActionMessage,
    FormSection,
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
    // let target = route('password.update');
    // let target = '/user/password';
    let target = route('user-password.update');
    // form.put(target, {
    //     errorBag: 'updatePassword',
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
      let res = await axios.put(target, this.form);
      this.form.reset();
      router.visit(res.data.redirect || "/login");
    }catch(error){
      if (error.response?.status === 422) {
        this.form.errors = error.response.data.errors;
      } else {
        console.error("Unexpected error:", error);
      }
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
    <FormSection @submitted="updatePassword">
        <template #title>
            Update Password
        </template>

        <template #description>
            Ensure your account is using a long, random password to stay secure.
        </template>

        <template #form>
            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="current_password" value="Current Password" />
                <TextInput
                    id="current_password"
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="current-password"
                />
                <InputError :message="form.errors.current_password" class="mt-2" />
            </div>

            <div class="col-span-6 sm:col-span-4">
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

            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="password_confirmation" value="Confirm Password" />
                <TextInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />
                <InputError :message="form.errors.password_confirmation" class="mt-2" />
            </div>
        </template>

        <template #actions>
            <ActionMessage :on="form.recentlySuccessful" class="me-3">
                Saved.
            </ActionMessage>

            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Save
            </PrimaryButton>
        </template>
    </FormSection>
</template>
