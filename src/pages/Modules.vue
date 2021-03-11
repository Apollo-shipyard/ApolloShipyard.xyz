<template>
  <div>
    <!--    <h1 id="title">{{ title }}</h1>-->
    <!--    <img-->
    <!--        class="portrait"-->
    <!--        src="../img/portraits/mining.png"-->
    <!--        alt="mining modules"-->
    <!--    />-->

    <v-content
      :args="{data}"
    />
  </div>
</template>

<script>
import VContent from '../components/Content.vue';
import data from '@Data/modules';

export default {
    components: { VContent },
    data() {
        return { data };
    },
    // metaInfo() {
    //   return {
    //     title: this.title,
    //   };
    // },
};
</script>
