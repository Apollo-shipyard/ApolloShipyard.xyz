<template>
  <div class="container">

    <div>Work in Progress!</div>
    <div class="tag">&lt;/&gt;</div>

    <ul class="pages">
      <li><h2>Pages</h2></li>
      <li>
        <router-link to="modules">Modules</router-link>
      </li>
    </ul>


    <a
      href="https://discord.gg/xxzAJjWjs8"
      target="_blank"
    >
      <img
        class="discord"
        :src="require('../img/icons/JoinDiscord.png')"
        alt="discord-button"
      >
    </a>

  </div>
</template>

<script>
// import {pages} from '../js/pages';
// import Catalog from '../components/Catalog';

export default {
    metaInfo() {
        return {
            title: 'Hades\' Star Data',
        };
    },
};
</script>
<style scoped lang="scss">
.container {
  margin: 3%;
  text-align: center;
  font-size: 140%;
}
.tag {
  font-size: 600%;
  padding: 3%;
}
.pages {
  list-style-type: none;
  padding: 5%;
}
.discord {
  width: 20%;
}
</style>
