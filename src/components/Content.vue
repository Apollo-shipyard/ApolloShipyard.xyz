<template>
  <div class="cont">

    <template v-if="items.length > 1">
      <!--      <h2>{{ $t("content") }}</h2>-->
      <div class="list">
        <ol>
          <li
            v-for="item in items"
            :key="item"
          >
            <a :href="'#' + item">
              {{ $t(args.data[item].TID) }}
            </a>
          </li>
        </ol>
      </div>
    </template>

    <displayObject
      v-for="item in items"
      :key="item"
      :data="args.data[item]"
    />

  </div>
</template>

<script>
import DisplayObject from './Data.vue';

export default {
    name: 'Content',
    components: { DisplayObject },
    props: {
        args: {
            type: Object,
            default: () => {},
            required: true,
        },
    },
    data() {
        return {
            items: Object.keys(this.args.data),
        };
    },
    created() {
        this.$Progress.set(50);
    },
    methods: {
        mergeCellsItems(key) {
            if (this.args.dontFixTables) {
                if (Array.isArray(this.args.dontFixTables)) {
                    return !this.args.dontFixTables.includes(key);
                } else {
                    return !this.args.dontFixTables;
                }
            }
            return true;
        },
    },
};
</script>

<style scoped>
.cont {
  padding-top: 5%;
}
.list {
  padding: 0 5% 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 7%;
}
.list ol {
  border: 5px dotted #586066;
  list-style-type: none;
  columns: 200px auto;
  font-size: 125%;
}
.list li {
  text-align: center;
}
</style>
