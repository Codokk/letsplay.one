<template>
    <div>
        <v-card v-if="modpack">
            <v-card-title>{{ modpack.name || "Anonymous Modpack" }}</v-card-title>
            <v-card-text>
                <p>Description: {{ modpack.description }}</p>
                <p>Version: {{ modpack.version }}</p>
                <p>Author: {{ modpack.author }}</p>
                <p>File: {{ modpack.file }}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="downloadModpack">Download</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { appStore } from '@/store/app';
import { onMounted, ref } from 'vue';
const store = appStore();
const router = useRouter();
const id = router.currentRoute.value.params.id;
const modpack = ref(null);

onMounted(() => {
    store.pb.collection("modpacks").getOne(id).then((modpackData) => {
        modpack.value = modpackData;
        console.log(modpackData)
    });
});

const downloadModpack = () => {
    // Open a new tab with the download link
    const link = `${store.assetUrl}${modpack.value.collectionId}/${modpack.value.id}/${modpack.value.file}?token=`
    window.open(link, '_blank');
    // Add your download logic here
    // https://pocketbase.letsplay.one/api/files/dmboskv3b5tnzfm/${id}/default_1702778919657_HdKzmJqNvD.r2z?token=
};
</script>