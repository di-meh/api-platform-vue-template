<template>
    <Disclosure
        as="nav"
        class="bg-gray-800 w-full fixed border-b-gray-600 border-b"
        v-slot="{ open }"
    >
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div
                    class="absolute inset-y-0 left-0 flex items-center sm:hidden"
                >
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon
                            v-if="!open"
                            class="block h-6 w-6"
                            aria-hidden="true"
                        />
                        <XMarkIcon
                            v-else
                            class="block h-6 w-6"
                            aria-hidden="true"
                        />
                    </DisclosureButton>
                </div>
                <div
                    class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
                >
                    <div class="hidden sm:block">
                        <div class="flex space-x-4">
                            <RouterLink
                                v-for="item in navigation"
                                :key="item.name"
                                :to="item.href"
                                :class="[
                                    routeName === item.routeName
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium',
                                ]"
                                :aria-current="
                                    routeName === item.routeName
                                        ? 'page'
                                        : undefined
                                "
                                >{{ item.name }}</RouterLink
                            >
                        </div>
                    </div>
                </div>
                <div
                    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                >
                    <!-- Profile dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <div>
                            <MenuButton
                                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span class="sr-only">Open user menu</span>
                                <UserIcon class="h-6 w-6 text-gray-400" />
                            </MenuButton>
                        </div>
                        <transition
                            enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95"
                        >
                            <MenuItems
                                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <MenuItem v-slot="{ active }">
                                    <RouterLink
                                        to="#"
                                        :class="[
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700',
                                        ]"
                                        >Your Profile</RouterLink
                                    >
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <button
                                        @click="refreshToken"
                                        :class="[
                                            active ? 'bg-gray-100' : '',
                                            'block w-full text-left px-4 py-2 text-sm text-gray-700',
                                        ]"
                                    >
                                        Refresh JWT Token
                                    </button>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <button
                                        @click="logout"
                                        :class="[
                                            active ? 'bg-gray-100' : '',
                                            'block w-full text-left px-4 py-2 text-sm text-gray-700',
                                        ]"
                                    >
                                        Sign out
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pt-2 pb-3">
                <DisclosureButton
                    v-for="item in navigation"
                    :key="item.name"
                    :class="[
                        routeName === item.routeName
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                    ]"
                    :aria-current="
                        routeName.value === item.routeName ? 'page' : undefined
                    "
                    ><RouterLink :to="item.href">{{
                        item.name
                    }}</RouterLink></DisclosureButton
                >
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/vue/24/outline";
import { useUserStore } from "@/store/user";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const userStore = useUserStore();
const toast = useToast();
const route = useRoute();

const routeName = ref(route.name);

const refreshToken = async () => {
    const response = await userStore.refreshToken().catch((err) => {
        toast.error(err.toString);
    });
    if (response.ok) {
        toast.success("Token refreshed");
    }
};

const logout = async () => {
    await userStore
        .logout()
        .then(() => toast.success("Logged out"))
        .catch((err) => toast.error(err.message));
};

const navigation = [
    { name: "Home", routeName: "home", href: "/" },
    { name: "Register", routeName: "register", href: "/register" },
    { name: "Login", routeName: "login", href: "/login" },
];

watch(
    () => route.name,
    (newRouteName) => {
        routeName.value = newRouteName;
        console.log(routeName.value);
    }
);
</script>
