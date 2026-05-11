<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useForm, router } from "@/plugins/inertia";
import ActionMessage from "@/components/auth/ActionMessage.vue";
import ActionSection from "@/components/auth/ActionSection.vue";
import FormSection from "@/components/auth/FormSection.vue";
import InputLabel from "@/components/auth/InputLabel.vue";
import {
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VTextField,
  VCheckbox,
  VBtn,
  VDialog,
  VRow,
  VCol,
  VSnackbar
} from "vuetify/components";
import axios from "@/plugins/axios";

const props = defineProps<{
  tokens: any[];
  availablePermissions: string[];
  defaultPermissions: string[];
}>();

const createApiTokenForm = useForm({
  name: "",
  permissions: [] as string[]
});

const updateApiTokenForm = useForm({
  permissions: [] as string[]
});

const deleteApiTokenForm = useForm({});

const displayingToken = ref(false);
const managingPermissionsFor = ref<any>(null);
const apiTokenBeingDeleted = ref<any>(null);

onMounted(() => {
  createApiTokenForm.permissions = [...props.defaultPermissions];
});

async function createApiToken() {
  createApiTokenForm.post(route("api-tokens.store"), {
    preserveScroll: true,
    onSuccess: () => {
      displayingToken.value = true;
      createApiTokenForm.reset();
    }
  });
}

function manageApiTokenPermissions(token: any) {
  updateApiTokenForm.permissions = [...token.abilities];
  managingPermissionsFor.value = token;
}

async function updateApiToken() {
  updateApiTokenForm.put(
    route("api-tokens.update", managingPermissionsFor.value),
    {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => (managingPermissionsFor.value = null)
    }
  );
}

function confirmApiTokenDeletion(token: any) {
  apiTokenBeingDeleted.value = token;
}

async function deleteApiToken() {
  let res = await axios.delete(
    route("api-tokens.destroy", apiTokenBeingDeleted.value.id),
    {
      data: deleteApiTokenForm
    }
  );
  apiTokenBeingDeleted.value = null;
  router.reload({ preserveScroll: true, preserveState: true });
}

const isManagingPermissions = computed(() => {
  return managingPermissionsFor.value != null;
});
</script>

<template>
  <div>
    <!-- Generate API Token -->
    <FormSection @submitted="createApiToken">
      <template #title>
        {{ $t("api_token.create_title") }}
      </template>

      <template #description>
        {{ $t("api_token.create_desc") }}
      </template>

      <template #form>
        <!-- Token Name -->
        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              id="name"
              v-model="createApiTokenForm.name"
              :label="$t('api_token.name')"
              autofocus
              outlined
              dense
              :error-messages="createApiTokenForm.errors.name"
            />
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
          {{ $t("crud.created") }}
        </ActionMessage>

        <VBtn
          color="primary"
          :loading="createApiTokenForm.processing"
          elevation="2"
          type="submit"
        >
          {{ $t("crud.create") }}
        </VBtn>
      </template>
    </FormSection>
    <!-- Manage API Tokens -->
    <div v-if="tokens.length > 0">
      <ActionSection>
        <template #title>
          {{ $t("api_token.manage_title") }}
        </template>

        <template #description>
          {{ $t("api_token.manage_desc") }}
        </template>

        <template #content>
          <VList>
            <VListItem v-for="token in tokens" :key="token.id">
              <VListItemTitle>{{ token.name }}</VListItemTitle>
              <template v-slot:append>
                <div class="d-flex align-center">
                  <span
                    v-if="token.last_used_ago"
                    class="text-grey-darken-1 text-caption"
                  >
                    {{ $t("api_token.last_used") }} {{ token.last_used_ago }}
                  </span>
                  <VBtn
                    v-if="availablePermissions.length > 0"
                    text
                    class="ms-4"
                    @click="manageApiTokenPermissions(token)"
                  >
                    {{ $t("api_token.permissions") }}
                  </VBtn>
                  <VBtn
                    text
                    color="red"
                    class="ms-4"
                    @click="confirmApiTokenDeletion(token)"
                  >
                    {{ $t("form.delete") }}
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
        <VCardTitle>{{ $t("api_token.display_title") }}</VCardTitle>

        <VCardText>
          <p>{{ $t("api_token.display_desc") }}</p>

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
          <VBtn variant="outlined" @click="displayingToken = false">{{
            $t("form.close")
          }}</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- API Token Permissions Modal -->
    <VDialog v-model="isManagingPermissions" persistent max-width="500px">
      <VCard>
        <VCardTitle>
          {{ $t("api_token.permissions_title") }}
        </VCardTitle>

        <VCardText>
          <VContainer>
            <VRow>
              <VCol
                v-for="permission in availablePermissions"
                :key="permission"
                cols="12"
                md="6"
              >
                <VCheckbox
                  v-model="updateApiTokenForm.permissions"
                  :label="permission"
                  :value="permission"
                />
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn variant="outlined" @click="managingPermissionsFor = null">
            {{ $t("form.cancel") }}
          </VBtn>
          <VBtn
            color="primary"
            :loading="updateApiTokenForm.processing"
            @click="updateApiToken"
          >
            {{ $t("form.save") }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="apiTokenBeingDeleted" max-width="500">
      <VCard>
        <VCardTitle>{{ $t("api_token.delete_title") }}</VCardTitle>
        <VCardText>{{ $t("api_token.delete_confirm_text") }}</VCardText>
        <VCardActions class="justify-end">
          <VBtn variant="outlined" @click="apiTokenBeingDeleted = null">
            {{ $t("form.cancel") }}
          </VBtn>
          <VBtn
            color="error"
            class="ms-3"
            :loading="deleteApiTokenForm.processing"
            @click="deleteApiToken"
          >
            {{ $t("form.delete") }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
