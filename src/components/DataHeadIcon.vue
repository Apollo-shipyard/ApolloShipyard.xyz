<template>
  <div class="container">
    <div
      class="shadow"
      :style="{'--url': `url(${mask})`, '--color': color}"
    >
      <img
        draggable="false"
        class="mask"
        :src="src"
        :alt="icon"
        :style="{'--url': `url(${mask})`}"
      >
    </div>
  </div>
</template>

<script>
import { default as colors } from '@Regulation/rarityColors.js';

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
                mask: require(`@Img/modules/rarityMask${this.rarity}.svg`),
                color: colors[this.rarity],
            };
        } catch (e) {
            return {
                src: '',
                mask: '',
                color: '',
            };
        }
    },
    // created() {},
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-content: center;
  justify-content: center;

  .mask {
    mask-image: var(--url);
    mask-repeat: no-repeat;
    max-width: 100%;
  }
  .shadow {
    filter:
        drop-shadow(0 0 2px var(--color)) // усилить эффект, типа рамка
        drop-shadow(0 0 2px var(--color))
        drop-shadow(0 0 2px var(--color))
        drop-shadow(0 0 10px var(--color));
    background-image: var(--url) 100% no-repeat;
  }
}
</style>
