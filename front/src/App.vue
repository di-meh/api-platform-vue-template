<script setup>
import NavBar from "@/components/NavBar.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
    <NavBar />
    <main class="min-h-screen pt-16">
        <RouterView />
    </main>
    <FooterComponent />
</template>

<style scoped></style>
