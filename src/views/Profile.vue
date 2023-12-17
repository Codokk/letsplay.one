




<template>
    <!-- <v-app-bar color="surface-variant" title="ModGame"></v-app-bar> -->

    <v-form v-model="valid">
        <v-container>
            <v-row>
                

                <v-col cols="4" md="4">
                    <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name" required
                        hide-details></v-text-field>
                </v-col>

                <v-col cols="4" md="4">
                    <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name" hide-details
                        required></v-text-field>
                </v-col>

                <v-col cols="4" md="4">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" hide-details required></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        <v-file-input label="Upload mods configuration"></v-file-input>

        

        <v-textarea label="Custom Css"></v-textarea>
        <v-card class="preview-box"> 
              </v-card>



        <v-btn color="primary">Preview</v-btn>
        

    <!-- Your content goes here -->
    </v-form>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        firstname: '',
        lastname: '',
        nameRules: [
            value => {
                if (value) return true

                return 'Name is required.'
            },
            value => {
                if (value?.length <= 10) return true

                return 'Name must be less than 10 characters.'
            },
        ],
        
        email: '',
        emailRules: [
            value => {
                if (value) return true

                return 'E-mail is requred.'
            },
            value => {
                if (/.+@.+\..+/.test(value)) return true

                return 'E-mail must be valid.'
            },
        ],
    }),
}
</script>



<!-- ADD Functionality for preview -->

<style scoped>
.v-application {
    background-color: #f5f5f5;
}
.preview-box {
  width: 300px;
  height: 300px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  /* Add any other styles you want */
}
</style>





# add a function to preview the custom css
function preview() {
    // get the custom css
    // apply the custom css to the preview box
}


# add a function to upload the mods configuration
# add a function to save the profile
# add a function to load the profile
# add a function to delete the profile
# add a function to reset the profile