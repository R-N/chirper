<script lang="ts">
import ApplicationLogo from '@/components/general/ApplicationLogo.vue';
import { VContainer, VRow, VCol, VCard, VCardText, VCardTitle, VBtn, VIcon, VCardActions } from 'vuetify/components';
import { Component, toNative } from 'vue-facing-decorator';
import {BaseView} from '@/views/BaseView.vue';

@Component({
  components: {
    ApplicationLogo
  }
})
class WelcomeView extends BaseView {
  tryError(){
    let err = new Error('Unknown error!!!');
    err.show = true;
    throw err;
  }
}
export { WelcomeView };
export default toNative(WelcomeView);
</script>

<template>
  <VContainer>
    <VCard class="pa-6 lg:pa-8">
      <VCardText>
        <ApplicationLogo class="d-block" height="48" contain />
        <h1 class="mt-8 text-h5 font-weight-medium">
          Welcome to your Jetstream application!
        </h1>
        <p class="mt-6 text-body-2">
          Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application...
        </p>
      </VCardText>
      <VCardActions>
        <VBtn color="danger" @click.stop.prevent="tryError">Try Error!</VBtn>
      </VCardActions>
    </VCard>

    <VRow class="mt-6">
      <VCol cols="12" md="6">
        <VCard>
          <VCardText class="d-flex align-center">
            <VIcon class="me-3">mdi-book-open</VIcon>
            <VCardTitle>
              <a href="https://laravel.com/docs" class="text-decoration-none">Documentation</a>
            </VCardTitle>
          </VCardText>
          <VCardText>
            Laravel has wonderful documentation covering every aspect of the framework...
          </VCardText>
          <VCardText>
            <VBtn variant="text" color="indigo" href="https://laravel.com/docs">
              Explore the documentation
              <VIcon end>mdi-arrow-right</VIcon>
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
      
      <VCol cols="12" md="6">
        <VCard>
          <VCardText class="d-flex align-center">
            <VIcon class="me-3">mdi-play-circle-outline</VIcon>
            <VCardTitle>
              <a href="https://laracasts.com" class="text-decoration-none">Laracasts</a>
            </VCardTitle>
          </VCardText>
          <VCardText>
            Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development...
          </VCardText>
          <VCardText>
            <VBtn variant="text" color="indigo" href="https://laracasts.com">
              Start watching Laracasts
              <VIcon end>mdi-arrow-right</VIcon>
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>