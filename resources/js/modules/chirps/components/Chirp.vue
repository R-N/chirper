<script lang="ts">
import InputError from '@/components/auth/InputError.vue';
import dayjs from 'dayjs';
import { useForm } from '@inertiajs/vue3';

import { VMenu, VTextarea, VBtn, VIcon, VList, VListItem } from 'vuetify/components';
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator';
import axios from '@/plugins/axios'; 

@Component({
  components: {
    VMenu,
    VTextarea,
    VBtn,
    VIcon,
    VList,
    VListItem,
    InputError,
  }
})
class Chirp extends Vue {
  @Prop(Object) chirp;
  editing = false;
  form = useForm({
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
    this.form.reset();
    this.form.message = this.chirp.message;
  }

  async update(){
    // await this.form.put(route('chirps.update', chirp.id));
    let res = await axios.put(route('chirps.update', this.chirp.id), {
        message: this.form.message,
    });

    this.$emit('update', res.data.chirp);
    this.resetForm();
    this.editing = false;
  }

  async remove(){
    // route('chirps.destroy', chirp.id);
    let res = await axios.delete(route('chirps.destroy', this.chirp.id));
    console.log(res);
    this.$emit('remove', this.chirp.id);
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
          <small v-if="chirp.created_at !== chirp.updated_at" class="text-sm text-gray-600"> &middot; edited</small>
        </div>

        <VMenu v-if="chirp.user.id === $page.props.auth.user.id">
          <template #activator="{ props }">
            <VBtn icon v-bind="props" variant="plain">
              <VIcon>mdi-dots-vertical</VIcon>
            </VBtn>
          </template>
          <VList>
            <VListItem @click="resetForm(true)">Edit</VListItem>
            <VListItem @click.prevent="remove">Delete</VListItem>
          </VList>
        </VMenu>
      </div>

      <form v-if="editing" @submit.prevent="update">
        <VTextarea v-model="form.message" class="mt-4" label="Edit message" auto-grow />
        <InputError :message="form.errors.message" class="mt-2" />

        <div class="mt-4 d-flex gap-2">
          <VBtn color="primary" variant="elevated" type="submit">Save</VBtn>
          <VBtn color="secondary" variant="text" @click="resetForm(false)">Cancel</VBtn>
        </div>
      </form>

      <p v-else class="mt-4 text-lg text-gray-900">{{ chirp.message }}</p>
    </div>
  </div>
</template>
