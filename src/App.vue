<template>
  <v-app>
    <v-main>
      <Volumes />
    </v-main>
  </v-app>
</template>

<script>
import Volumes from "@/components/Volumes";

export default {
  name: 'App',

  components: {
    Volumes
  },

  data: () => ({
    //
  }),
};
</script>
