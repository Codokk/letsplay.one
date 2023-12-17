<template>
  <v-container class="fill-height fill-width flex justify-center align-center" style="">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/Logo2.png" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">LetsPlay.One</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="https://vuetifyjs.com/components/all/"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon
              icon="mdi-view-dashboard"
              size="large"
              start
            />

            View Popular
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
            @click="LogIn"
          >
            <v-icon
              icon="mdi-login"
              size="large"
              start
            />

            Login
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="https://community.vuetifyjs.com/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-account-group"
              size="large"
              start
            />

            About Us
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { appStore } from '@/store/app';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = appStore();

const LogIn = () => {
  store.login()
    .then(() => {
      router.push({ name: 'Me' });
    }).catch((err) => {
      console.log(err);
    });
};
</script>