<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import Welcome from '@/modules/general/views/Welcome.vue';
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Dashboard
            </h2>
        </template>

        <Welcome />
    </AppLayout>
</template>
