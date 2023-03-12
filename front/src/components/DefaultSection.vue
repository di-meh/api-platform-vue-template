<template>
    <header class="flex flex-col my-10 p-5">
        <div class="flex flex-row items-center justify-evenly w-full">
            <img
                alt="Vue logo"
                class="logo"
                src="@/assets/logo.svg"
                width="125"
                height="125"
            />
            <img
                alt="API Platform logo"
                class="logo"
                src="@/assets/api-platform-logo-round.svg"
                width="125"
                height="125"
            />
        </div>
        <div class="space-y-5">
            <HelloWorld msg="Et voilà !" />

            <nav class="flex justify-center divide-x divide-gray-600">
                <RouterLink to="/"
                    ><button
                        class="mr-5 py-2 px-3 bg-cyan-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-cyan-600/50 focus:outline-none transition-all hover:bg-cyan-500"
                    >
                        Home
                    </button></RouterLink
                >
                <RouterLink to="/about"
                    ><button
                        class="mx-5 py-2 px-3 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-600/50 focus:outline-none transition-all hover:bg-blue-500"
                    >
                        About
                    </button></RouterLink
                >
                <RouterLink to="/greetings"
                    ><button
                        class="mx-5 py-2 px-3 bg-green-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-green-600/50 focus:outline-none transition-all hover:bg-green-500"
                    >
                        Greetings
                    </button></RouterLink
                >
                <a href="/api/docs"
                    ><button
                        class="ml-5 py-2 px-3 bg-purple-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-purple-600/50 focus:outline-none transition-all hover:bg-purple-500"
                    >
                        Docs
                    </button></a
                >
            </nav>
        </div>
    </header>

    <hr class="my-10 border-gray-500" />
</template>
<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
import { RouterLink } from "vue-router";
</script>
