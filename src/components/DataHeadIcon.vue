<template>
  <div class="container">
    <img
      draggable="false"
      class="icon"
      :src="src"
      :alt="icon"
    >
  </div>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        icon: {
            type: String,
            request: true,
            default: null,
        },
        rarity: {
            type: Number,
            request: false,
            default: 0,
        },
    },
    data() {
        try {
            return {
                src: require(`@Img/modules/icons/${this.icon}.png`),
            };
        } catch (e) {
            return {
                src: '',
                mask: '',
                color: '',
            };
        }
    },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-content: center;
  justify-content: center;

  .icon {
    max-width: 100%;
  }
}
</style>
