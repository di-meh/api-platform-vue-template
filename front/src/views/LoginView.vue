<template>
    <div
        class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
        <div class="w-full max-w-md space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
                    Sign in to your account
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="login" method="POST">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only"
                            >Email address</label
                        >
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required=""
                            class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required=""
                            class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Password"
                        />
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <a
                            href="#"
                            class="font-medium text-indigo-600 hover:text-indigo-500"
                            >Forgot your password?</a
                        >
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span
                            class="absolute inset-y-0 left-0 flex items-center pl-3"
                        >
                            <LockClosedIcon
                                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                aria-hidden="true"
                            />
                        </span>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/20/solid";
import { useUserStore } from "@/store/user";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const toast = useToast();

const login = async (event) => {
    const values = Object.fromEntries(new FormData(event.target));
    const response = await userStore.login(values);
    if (response.ok) {
        console.log(response);
    } else {
        if (response.status === 401) {
            toast.error("Invalid credentials");
        } else {
            toast.error("Something went wrong. Please try again later.");
        }
    }
};
</script>
