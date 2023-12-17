<template>
    <div id="PrimaryContainer">
        <v-card>
            <v-card-title>
                Create Anonymous Modpack Profile
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field disabled label="https://letsplay.one/####" required hide-details></v-text-field>
                            </v-col>
                            <v-select
                                v-model="Game"
                                :items="Games"
                                label="Game"
                                required>
                            </v-select>
                        </v-row>
                    </v-container>
                    <v-file-input :label="GameUploadDescription[Game]" @change="handleZipFile"></v-file-input>
                </v-form>
                <v-data-table max-height="400" v-if="Mods.length > 0" :items="Mods"></v-data-table>
            </v-card-text>
            <v-card-actions class="float-right">
                <v-btn color="success" @click="save" >Save</v-btn>
                <v-btn color="red" @click="delete">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </div>

</template>

<script setup>
import JSZip from 'jszip';
import { ref } from 'vue';
import { appStore } from '@/store/app';
const ModFile = ref();
const Game = ref("");
const Games = [
    "Lethal Company",
    "Rimworld"
]
const GameUploadDescription = {
    "": "Upload a zip file containing a mods.yml",
    "Lethal Company": "Upload a r2z file",
    "Rimworld": "Upload a zip file containing a About.xml and manifest.json file"
}
const store = appStore();
if (store.pb.authStore.isValid) {
    store.currentUser = store.pb.authStore.model;
}
const Mods = ref([]);

function handleZipFile(event) {
    const file = event.target.files[0];
    ModFile.value = file;
    // Verify file extension
    if (!file.name.endsWith('.r2z')) {
        console.error('Invalid file type. Please upload a zip file.');
        return;
    }
    JSZip.loadAsync(file).then((zip) => {
        // Iterate through each file in the zip
        Object.keys(zip.files).forEach((filename) => {
            zip.files[filename].async('string').then((fileContent) => {
                // Only Process the mods.yml and manifest.json files
                if (filename === 'mods.yml') {
                    // Process the mods.yml file
                    Mods.value = (yamlToJson(fileContent));
                }
            });
        });
    }).catch((err) => {
        console.error('Error reading zip file:', err);
    });
}

function yamlToJson(yaml) {
    const result = [];
    let index = -1; // Fixes issue with manifestVersion not being in the first index
    const lines = yaml.split('\n');
    for(var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if(line && line.charAt(0) !== '#') { // skip empty lines and comments
            // If it is a manifestVersion line, increment the index and set the value of result[index] to an empty object
            if(line.indexOf('- manifestVersion') > -1) {
                index++;
                result[index] = {};
                continue;
            }
            var colonIndex = line.indexOf(':');
            if(colonIndex > -1) {
                var key = line.substr(0, colonIndex).trim();
                var value = line.substr(colonIndex + 1).trim();
                // Basic attempt to interpret arrays (very simplistic)
                if (value.charAt(0) === '[' && value.charAt(value.length - 1) === ']') {
                    value = value.substring(1, value.length - 1).split(',').map(item => item.trim());
                }
                result[index][key] = value;
            }
        }
    }
    return result;
}

function save() {
    const modpack = {
        name: "Anonymous Modpack",
        game: Game.value,
        version: "1.0.0",
        description: "This is a custom anonymous modpack for Lethal Company",
        mods: Mods.value,
        file: ModFile.value
        }
    console.log(modpack);
    // Upload to pocketbase, get the url, and save it to the user's profile
    store.pb.collection("modpacks").create(modpack).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    });
}
</script>



<!-- ADD Functionality for preview -->

<style scoped>
#PrimaryContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: fixed;
    top:0;
    left:0;
}
.v-table {
    max-height: 25rem;
}
</style>