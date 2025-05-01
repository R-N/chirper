<script lang="ts">
import InputError from '@/components/form/InputError.vue';
import dayjs from 'dayjs';
import { useForm } from '@inertiajs/vue3';

import { VMenu, VTextarea, VBtn, VIcon, VList, VListItem } from 'vuetify/components';
import { Component, Prop, Vue, toNative, Emit } from 'vue-facing-decorator';
import chirpService from '../services/chirp';

@Component({
  components: {
    VMenu,
    VTextarea,
    VBtn,
    VIcon,
    VList,
    VListItem,
    InputError,
  },
  emits: ['update', 'destroy']
})
class Chirp extends Vue {
  @Prop({ type: Object }) chirp;
  editing = false;
  formData = useForm({
    message: '',
  });

  mounted(){
    this.resetForm();
  }

  get createdAt(){
    return dayjs(this.chirp.created_at).fromNow();
  }

  resetForm(editing=false){
    this.editing = editing;
    this.formData.reset();
    this.formData.message = this.chirp.message;
  }

  async updateChirp(){
    let res = await chirpService.update(this.chirp, this.formData);
    Object.assign(this.chirp, res.chirp); 
    this.emitUpdate(res.chirp);
    this.resetForm();
    this.editing = false;
  }

  @Emit('update')
  emitUpdate(chirp){
    return chirp;
  }

  async destroyChirp(){
    // route('chirps.destroy', chirp.id);
    let res = await chirpService.destroy(this.chirp);
    this.emitDestroy(this.chirp);
  }

  @Emit('destroy')
  emitDestroy(chirp){
    return chirp?.id ?? chirp;
  }
}
export default toNative(Chirp);
</script>
 
<template>
  <div class="p-6 flex space-x-2">
    <VIcon size="32" class="text-gray-600">mdi-message</VIcon>

    <div class="flex-1">
      <div class="flex justify-between items-center">
        <div>
          <span class="text-gray-800">{{ chirp.user.name }}</span>
          <small class="ml-2 text-sm text-gray-600">{{ createdAt }}</small>
          <small v-if="chirp.created_at !== chirp.updated_at" class="text-sm text-gray-600"> &middot; {{ $t('crud.edited') }}</small>
        </div>

        <VMenu v-if="chirp.user.id === $page.props.auth.user.id">
          <template #activator="{ props }">
            <VBtn icon v-bind="props" variant="plain">
              <VIcon>mdi-dots-vertical</VIcon>
            </VBtn>
          </template>
          <VList>
            <VListItem @click="resetForm(true)">{{ $t('form.edit') }}</VListItem>
            <VListItem @click.prevent="destroyChirp">{{ $t('form.delete') }}</VListItem>
          </VList>
        </VMenu>
      </div>

      <form v-if="editing" @submit.prevent.stop="updateChirp">
        <VTextarea v-model="formData.message" class="mt-4" :label="$t('chirp.edit')" auto-grow />
        <InputError :message="formData.errors.message" class="mt-2" />

        <div class="mt-4 d-flex gap-2">
          <VBtn color="primary" variant="elevated" type="submit">{{ $t('form.save') }}</VBtn>
          <VBtn color="secondary" variant="text" @click="resetForm(false)">{{ $t('form.cancel') }}</VBtn>
        </div>
      </form>

      <p v-else class="mt-4 text-lg text-gray-900">{{ chirp.message }}</p>
    </div>
  </div>
</template>
