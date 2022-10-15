<!--Get Greetings from Api Platform-->
<template>
    <main>
        <template v-if="greetings">
            <ul>
                <li v-for="greeting in greetings" :key="greeting.id">
                    {{ greeting.name }}
                </li>
            </ul>
        </template>
        <template v-else>
            <p>Loading...</p>
        </template>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import {ENTRYPOINT} from "../../config/entrypoint";

const greetings = ref([]);

const getGreetings = async () => {
    const response = await fetch(
        ENTRYPOINT + "/greetings"
    );
    const data = await response.json();
    greetings.value = data["hydra:member"];
};

onBeforeMount(getGreetings);
</script>
