<script setup>
defineProps({
    msg: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="text-center space-y-3">
        <h1 class="text-green-400 text-3xl font-bold">{{ msg }}</h1>
        <h3>
            <a href="https://vitejs.dev/" target="_blank" rel="noopener" class="hover:underline text-purple-400"
                >Vite</a
            >
            +
            <a href="https://vuejs.org/" target="_blank" rel="noopener" class="hover:underline text-green-400">Vue 3</a
            > +
            <a href="https://api-platform.com/" target="_blank" rel="noopener" class="hover:underline text-cyan-300"
            >API Platform</a
            >
        </h3>
    </div>
</template>

