<script lang="ts">
import { Component, Prop, toNative } from 'vue-facing-decorator';
import { ViewBase } from '@/views/ViewBase.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import Welcome from '@/modules/general/views/Welcome.vue';

@Component({
    name: "DashboardPage",
    components:{
      AppLayout,
      Welcome,
    },
})
class DashboardPage extends ViewBase {
    mounted(){
    }
}
export { DashboardPage } ;
export default toNative(DashboardPage);
</script>
<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ $t('navigation.dashboard') }}
            </h2>
        </template>

        <Welcome />
    </AppLayout>
</template>
