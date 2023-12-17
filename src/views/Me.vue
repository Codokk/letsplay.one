<template>
    <v-container class="text-center">
        <v-sheet class="pa-4">
            <h1>{{ store.currentUser?.username }}</h1>
            <v-avatar size="256">
                <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
            </v-avatar>
            <div>
                <v-row>
                    <v-col>
                        <v-btn color="primary" class="mx-2 mt-4">
                            <v-icon>mdi-folder</v-icon>
                            <span>Add Mod Profile</span>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-expansion-panels class="mb-6">
                    <v-expansion-panel v-for="Modpack in Modpacks" :key="i">
                        <v-expansion-panel-title expand-icon="mdi-menu-down">
                            <v-btn class="mr-2">
                                Lethal Company
                            </v-btn>
                            <span> Modpack Name</span>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-data-table :items="Modpack.mods"></v-data-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>

                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                            Item
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            Item
                            <template v-slot:actions="{ expanded }">
                                <v-icon :color="!expanded ? 'teal' : ''"
                                    :icon="expanded ? 'mdi-pencil' : 'mdi-check'"></v-icon>
                            </template>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title disable-icon-rotate>
                            Item
                            <template v-slot:actions>
                                <v-icon color="error" icon="mdi-alert-circle">
                                </v-icon>
                            </template>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </v-sheet>
    </v-container>
</template>

<script setup>
import { appStore } from '@/store/app';

const store = appStore();
if (store.pb.authStore.isValid) {
    store.currentUser = store.pb.authStore.model;
}

const Modpacks = [
    {
        name: "Custom Modpack 1",
        game: "Lethal Company",
        version: "1.0.0",
        description: "This is a custom modpack for Lethal Company",
        url: "https://letsplay.one/bubblyspore",
        mods: [
            {
                name: "Mod 1",
                version: "1.0.0",
                description: "This is a mod for Lethal Company",
                url: "https://letsplay.one/bubblyspore",
            }
        ]
    }
]
console.log(store.currentUser);
</script>