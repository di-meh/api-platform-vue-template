<template>
    <div class="flex w-full justify-center items-center h-full">
        <div class="flex flex-col py-10 px-16 w-[500px]">
            <h2 class="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <FormKit
                type="form"
                submit-label="S'inscrire"
                :classes="{
                    form: 'space-y-6',
                }"
                :submit-attrs="{
                    outerClass: 'pt-4',
                    inputClass:
                        'w-full rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                }"
                @submit="submit"
            >
                <FormKit
                    type="text"
                    name="email"
                    validation="required"
                    label="E-mail"
                    :classes="{
                        input: 'mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                    }"
                />
                <FormKit
                    type="text"
                    name="username"
                    validation="required"
                    label="Username"
                    :classes="{
                        input: 'mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                    }"
                />
                <FormKit
                    type="password"
                    name="password"
                    validation="required"
                    label="Password"
                    :classes="{
                        input: 'mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                    }"
                />
                <FormKit
                    type="password"
                    name="password_confirm"
                    validation="required|confirm"
                    label="Confirm Password"
                    :classes="{
                        input: 'mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                    }"
                />
            </FormKit>
            <span class="mt-3">
                Already have an account?
                <router-link to="/login" class="underline">Login</router-link>
            </span>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { FormKit } from "@formkit/vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const userStore = useUserStore();

const submit = async (values) => {
    console.log(values);
    const toast = useToast();
    const response = await userStore.signUp(values);

    if (response.ok) {
        await router.push("/login");
    } else {
        toast.error(response.data.message);
    }
};
</script>
