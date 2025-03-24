<script lang="ts">
import ActionSection from '@/Components/ActionSection.vue';
import DangerButton from '@/Components/DangerButton.vue';
import DialogModal from '@/Components/DialogModal.vue';
import InputError from '@/Components/InputError.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from '@inertiajs/vue3';
import { nextTick, ref } from 'vue';

import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';
import axios from '@/boot/axios'; 
import { router } from '@inertiajs/vue3';

@Component({
  components: {
    ActionSection,
    DialogModal,
    DangerButton,
    InputError,
    // InputLabel,
    // Modal,
    SecondaryButton,
    TextInput
  }
})
class DeleteUserForm extends Vue {
  confirmingUserDeletion = false;
  @Ref('passwordInput') passwordInput;

  form = useForm({
    password: '',
  });

  confirmUserDeletion(){
      this.confirmingUserDeletion = true;
      nextTick(() => this.passwordInput.focus());
  };

  closeModal(){
    this.confirmingUserDeletion = false;

    this.form.clearErrors();
    this.form.reset();
  };

  async deleteUser() {
    //let target = route('profile.destroy');
    let target = route('current-user.destroy');
    // form.delete(target, {
    //     preserveScroll: true,
    //     onSuccess: () => closeModal(),
    //     onError: () => passwordInput.value.focus(),
    //     onFinish: () => form.reset(),
    // });
    try{
        let res = await axios.delete(target, { data: this.form });
        this.closeModal();
        router.visit(res.data.redirect || "/");
    } catch (error) {
        this.passwordInput.focus();
    } finally {
        this.form.reset();
    }
  }
}
export default toNative(DeleteUserForm);
</script>

<template>
    <ActionSection>
        <template #title>
            Delete Account
        </template>

        <template #description>
            Permanently delete your account.
        </template>

        <template #content>
            <div class="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
            </div>

            <div class="mt-5">
                <DangerButton @click="confirmUserDeletion">
                    Delete Account
                </DangerButton>
            </div>

            <!-- Delete Account Confirmation Modal -->
            <DialogModal :show="confirmingUserDeletion" @close="closeModal">
                <template #title>
                    Delete Account
                </template>

                <template #content>
                    Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.

                    <div class="mt-4">
                        <TextInput
                            ref="passwordInput"
                            v-model="form.password"
                            type="password"
                            class="mt-1 block w-3/4"
                            placeholder="Password"
                            autocomplete="current-password"
                            @keyup.enter="deleteUser"
                        />

                        <InputError :message="form.errors.password" class="mt-2" />
                    </div>
                </template>


                <template #footer>
                    <SecondaryButton @click="closeModal">
                        Cancel
                    </SecondaryButton>

                    <DangerButton
                        class="ms-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        Delete Account
                    </DangerButton>
                </template>
            </DialogModal>
        </template>
    </ActionSection>
</template>
