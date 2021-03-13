<template>
  <a
    href="#"
    :class="{'show': show}"
    class="btn"
  />
</template>

<script>
export default {
    data() {
        return {
            show: false,
        };
    },
    created() {
        document.addEventListener('scroll', this.scroll);
    },
    destroyed() {
        document.removeEventListener('scroll', this.scroll);
    },
    methods: {
        scroll() {
            this.show = (window.pageYOffset > 300);
        },
    },
};
</script>
<style scoped lang="scss">
.btn {
  position: fixed;
  right: 20px;
  bottom: -100px;
  width: 70px;
  height: 70px;

  background:
      #313033
      url(../img/icons/arrow.svg)
      no-repeat
      center/50px;

  border-radius: 100%;
  opacity: 0.8;
  transform: rotate(270deg);
  cursor: pointer;
  transition: bottom 0.5s ease-in-out;

  &:hover {
    background-color: #454347;
    opacity: 1;
  }
}
.show {
  bottom: 50px;
}
</style>


