<script lang="ts">
import { useForm, router } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import ActionSection from '@/Components/ActionSection.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import { VCard, VCardTitle, VCardText, VCardActions, VTextField, VCheckbox, VBtn, VDialog, VRow, VCol, VSnackbar } from 'vuetify/components';
import axios from '@/plugins/axios'; 
import { Component, Prop, Vue, toNative, Ref } from 'vue-facing-decorator';

@Component({
  components: {
    ActionMessage,
    ActionSection, 
    FormSection,
    InputError, 
    VCard, 
    VCardTitle, 
    VCardText, 
    VCardActions, 
    VDialog, 
    VCheckbox, 
    VBtn, 
    VTextField, 
    VRow, 
    VCol,
    VSnackbar
  }
})
class ApiTokenManagerPage extends Vue {
    @Prop(Array) tokens;
    @Prop(Array) availablePermissions;
    @Prop(Array) defaultPermissions;

    createApiTokenForm = useForm({
        name: '',
        permissions: [],
    });

    updateApiTokenForm = useForm({
        permissions: [],
    });

    deleteApiTokenForm = useForm({});

    displayingToken = false;
    managingPermissionsFor = null;
    apiTokenBeingDeleted = null;

    mounted(){
        this.createApiTokenForm.permissions = this.defaultPermissions;
    }

    async createApiToken(){
        this.createApiTokenForm.post(route('api-tokens.store'), {
            preserveScroll: true,
            onSuccess: () => {
                this.displayingToken = true;
                this.createApiTokenForm.reset();
            },
        });
        // let res = await axios.post(route('api-tokens.store'), this.createApiTokenForm);
        // console.log(res);
        // this.displayingToken = true;
        // this.createApiTokenForm.reset();
    };

    manageApiTokenPermissions(token){
        this.updateApiTokenForm.permissions = token.abilities;
        this.managingPermissionsFor = token;
    };

    async updateApiToken(){
        this.updateApiTokenForm.put(route('api-tokens.update', this.managingPermissionsFor), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => (this.managingPermissionsFor = null),
        });
        // let res = await axios.put(route('api-tokens.update'), this.updateApiTokenForm);
        // this.managingPermissionsFor = null;
    };

    confirmApiTokenDeletion(token){
        this.apiTokenBeingDeleted = token;
    };

    async deleteApiToken(){
        // deleteApiTokenForm.delete(route('api-tokens.destroy', apiTokenBeingDeleted.value), {
        //     preserveScroll: true,
        //     preserveState: true,
        //     onSuccess: () => (apiTokenBeingDeleted.value = null),
        // });
        let res = await axios.delete(route('api-tokens.destroy', this.apiTokenBeingDeleted.id), { 
            data: this.deleteApiTokenForm,
        });
        this.apiTokenBeingDeleted = null;
        router.reload({ preserveScroll: true, preserveState: true });
    };
    get isManagingPermissions() {
      return this.managingPermissionsFor != null;
    }
}
export default toNative(ApiTokenManagerPage);
</script>

<template>
    <div>
        <!-- Generate API Token -->
        <FormSection @submitted="createApiToken">
            <template #title>
                Create API Token
            </template>

            <template #description>
                API tokens allow third-party services to authenticate with our application on your behalf.
            </template>

            <template #form>
                <!-- Token Name -->
                <VRow>
                    <VCol cols="12" md="6">
                    <VTextField
                        id="name"
                        v-model="createApiTokenForm.name"
                        label="Name"
                        autofocus
                        outlined
                        dense
                    />
                    <InputError :message="createApiTokenForm.errors.name" class="mt-2" />
                    </VCol>
                </VRow>

                <!-- Token Permissions -->
                <VRow v-if="availablePermissions.length > 0">
                    <VCol cols="12">
                        <InputLabel for="permissions" value="Permissions" />
                        <VRow class="mt-2">
                            <VCol
                            v-for="permission in availablePermissions"
                            :key="permission"
                            cols="12"
                            md="6"
                            >
                            <VCheckbox
                                v-model="createApiTokenForm.permissions"
                                :value="permission"
                                :label="permission"
                            />
                            </VCol>
                        </VRow>
                    </VCol>
                </VRow>
            </template>


            <template #actions>
                <ActionMessage :on="createApiTokenForm.recentlySuccessful" class="me-3">
                    Created.
                </ActionMessage>

                <VBtn 
                    color="primary" 
                    :loading="createApiTokenForm.processing"
                    elevation="2"
                    type="submit"
                >
                    Create
                </VBtn>
            </template>
        </FormSection>
        <!-- Manage API Tokens -->
        <div v-if="tokens.length > 0">
            <ActionSection>
                <template #title>
                Manage API Tokens
                </template>

                <template #description>
                You may delete any of your existing tokens if they are no longer needed.
                </template>

                <template #content>
                <VList>
                    <VListItem v-for="token in tokens" :key="token.id">
                    <VListItemTitle>{{ token.name }}</VListItemTitle>
                    <template v-slot:append>
                        <div class="d-flex align-center">
                        <span v-if="token.last_used_ago" class="text-grey-darken-1 text-caption">
                            Last used {{ token.last_used_ago }}
                        </span>
                        <VBtn v-if="availablePermissions.length > 0" text class="ms-4" @click="manageApiTokenPermissions(token)">
                            Permissions
                        </VBtn>
                        <VBtn text color="red" class="ms-4" @click="confirmApiTokenDeletion(token)">
                            Delete
                        </VBtn>
                        </div>
                    </template>
                    </VListItem>
                </VList>
                </template>
            </ActionSection>
        </div>
        <!-- Token Value Modal -->
        <VDialog v-model="displayingToken" max-width="500">
            <VCard>
            <VCardTitle>API Token</VCardTitle>

            <VCardText>
                <p>Please copy your new API token. For your security, it won't be shown again.</p>

                <VAlert
                v-if="$page.props.jetstream.flash.token"
                class="mt-4"
                density="compact"
                variant="tonal"
                type="info"
                >
                <span class="font-mono text-sm break-all">
                    {{ $page.props.jetstream.flash.token }}
                </span>
                </VAlert>
            </VCardText>

            <VCardActions>
                <VSpacer />
                <VBtn variant="outlined" @click="displayingToken = false">Close</VBtn>
            </VCardActions>
            </VCard>
        </VDialog>

        <!-- API Token Permissions Modal -->
        <VDialog v-model="isManagingPermissions" persistent max-width="500px">
            <VCard>
                <VCardTitle>
                    API Token Permissions
                </VCardTitle>

                <VCardText>
                    <VContainer>
                        <VRow>
                            <VCol v-for="permission in availablePermissions" :key="permission" cols="12" md="6">
                            <VCheckbox v-model="updateApiTokenForm.permissions" :label="permission" :value="permission" />
                            </VCol>
                        </VRow>
                    </VContainer>
                </VCardText>

                <VCardActions>
                    <VSpacer />
                    <VBtn variant="outlined" @click="managingPermissionsFor=null">
                        Cancel
                    </VBtn>
                    <VBtn color="primary" :loading="updateApiTokenForm.processing" @click="updateApiToken">
                        Save
                    </VBtn>
                </VCardActions>
            </VCard>
        </VDialog>

        <VDialog v-model="apiTokenBeingDeleted" max-width="500">
            <VCard>
                <VCardTitle>Delete API Token</VCardTitle>
                <VCardText>Are you sure you would like to delete this API token?</VCardText>
                <VCardActions class="justify-end">
                <VBtn variant="outlined" @click="apiTokenBeingDeleted = null">
                    Cancel
                </VBtn>
                <VBtn
                    color="error"
                    class="ms-3"
                    :loading="deleteApiTokenForm.processing"
                    @click="deleteApiToken"
                >
                    Delete
                </VBtn>
                </VCardActions>
            </VCard>
        </VDialog>
    </div>
</template>
