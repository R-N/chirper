<script lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Component, toNative } from 'vue-facing-decorator'
import { BaseView } from '@/views/BaseView.vue';

import { VFadeTransition, VSlideYTransition, VSlideXTransition, VExpandTransition } from 'vuetify/components';
import LoginView from '@/modules/user/auth/views/login.vue';

@Component({
    name: "MainView",
    components: {
        LoginView,
        VSlideYTransition,
        VSlideXTransition,
        VExpandTransition,
    }
})
class MainView extends BaseView{
    transitionDuration = {
        enter: 300,
        leave: 300
    }
    transitionDelay = {
        enter: 300,
        leave: 0
    }

    mounted(){
    }
    get breadcrumbs(){
        return this.appStore.breadcrumbs;
    }

}
export { MainView }
export default toNative(MainView);
</script>
<template>
    <VExpandTransition appear class="fill-height" >
        <LoginView appear v-if="!isLoggedIn" key="login"/>
        <VContainer 
            appear
            class="" 
            align="start"
            justify="start"
            key="main"
            v-else
        >
            <transition appear name="fade" mode="out-in">
                <VRow appear class="" align="start" justify="start"  v-if="serverReachable && isLoggedIn && breadcrumbs && breadcrumbs.length">
                    <VCol align="start" justify="start">
                        <VAlert
                            color="grey"
                            text
                        >
                            <VBreadcrumbs class="py-0" :items="breadcrumbs" large>
                                <template v-slot:divider>
                                    <VIcon>mdi-chevron-right</VIcon>
                                </template>
                            </VBreadcrumbs>
                        </VAlert>
                    </VCol>
                </VRow>
            </transition>
            <VSlideYTransition 
                group
                appear
                :duration="transitionDuration"
            >
                <slot appear key="main" />
            </VSlideYTransition>
            <VSpacer></VSpacer>
        </VContainer>
    </VExpandTransition>
</template>