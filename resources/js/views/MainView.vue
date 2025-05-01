<script lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Component, toNative } from 'vue-facing-decorator'
import { ViewBase } from '@/views/ViewBase.vue';

import { VFadeTransition, VSlideYTransition, VSlideXTransition, VExpandTransition } from 'vuetify/components';
import LoginView from '@/modules/user/auth/views/Login.vue';

@Component({
    name: "MainView",
    components: {
        LoginView,
        VSlideYTransition,
        VSlideXTransition,
        VExpandTransition,
    }
})
class MainView extends ViewBase{
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
        return this.tabStore.breadcrumbs;
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
            class="d-flex flex-column" 
            align="start"
            justify="start"
            key="main"
            v-else
        >
            <VSlideYTransition 
                appear
                :duration="transitionDuration"
            >
                <VContainer v-if="serverReachable && breadcrumbs && breadcrumbs.length">
                    <VAlert
                        color="bg-secondary"
                        text
                    >
                        <VBreadcrumbs class="py-0" :items="breadcrumbs" large>
                            <template v-slot:divider>
                                <VIcon>mdi-chevron-right</VIcon>
                            </template>
                        </VBreadcrumbs>
                    </VAlert>
                </VContainer>
            </VSlideYTransition>
            <VSlideYTransition 
                group
                appear
                :duration="transitionDuration"
            >
                <slot appear key="main"/>
            </VSlideYTransition>
            <VSpacer></VSpacer>
        </VContainer>
    </VExpandTransition>
</template>