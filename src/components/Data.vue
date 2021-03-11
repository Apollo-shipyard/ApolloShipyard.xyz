<template>
  <div class="container">
    <v-title :args="title" />
    <v-table :data="table" />
  </div>
</template>

<script>
import VTable from './DataTable.vue';
import VTitle from './DataHead.vue';

export default {
    name: 'DisplayObject',
    components: { VTable, VTitle },
    props: {
        data: {
            type: Object,
            default: () => {},
            request: true,
        },
    },
    data() {
        return {
            table: {
                head: {},
                body: {},
            },
            title: {},
        };
    },
    computed: {
    },
    created() {
        this.generateTable(this.data);
    },
    methods: {
        generateTable(obj, category = 'default') {
            const { table: { head, body }, title } = this;

            Object.entries(obj).forEach(([key, value]) => {
                if (value.constructor === Object) {
                    this.generateTable(value, key);
                } else if (Array.isArray(value)) {
                    if (Array.isArray(head[category])) {
                        head[category].push(key);
                        body[category].push(value);
                    } else {
                        head[category] = [key];
                        body[category] = [value];
                    }
                } else {
                    if (!title[category]) {
                        title[category] = {};
                    }
                    title[category][key] = value;
                }
            });
        },
    },
};
</script>
<style scoped lang="scss">
.container {
  margin: 0 3% 5% 3%;
}
@media screen and (max-width: 900px) {
  .container {
    margin: 0 3% 5% 3%;
  }
}
</style>
