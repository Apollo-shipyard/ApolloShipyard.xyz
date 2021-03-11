<template>
  <div class="table-bg">
    <div class="wrapper">
      <table class="table">

        <thead>
          <tr
            v-for="(array, index1) in tableMask.head"
            :key="index1"
          >
            <th
              v-if="index1 === 0"
              :rowspan="tableMask.head.length"
              class="lvl-col"
            >{{ $t(lvlColKey) }}</th>
            <th
              v-for="({value, rowspan, colspan}, index2) in array"
              :key="index2"
              :rowspan="rowspan"
              :colspan="colspan"
            >{{ formatKey(value) }}</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index1) in tableMask.body"
            :key="index1"
          >
            <th class="lvl-col">{{ index1 + colLvlStartAt }}</th>
            <td
              v-for="({key, value}, index2) in row"
              :key="key + index2"
            >{{ formatValue(key, value) }}</td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
import tableMask from '@Utils/tableMask.js';
import value from '@Handlers/value.js';
import key from '@Handlers/key.js';

export default {
    name: 'Table',
    props: {
        mergeCells: {
            type: Boolean,
            default: true,
        },
        lvlColKey: {
            type: String,
            default: 'lvl',
        },
        colLvlStartAt: {
            type: Number,
            default: 1,
        },
        data: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            headStatsInfoData: {},
            statsInfo: {
                header: '',
                description: '',
                show: false,
            },
            tableMask: {},
        };
    },
    computed: {},
    created() {
        this.tableMask = tableMask({ ...this.data });
        this.formatterOpts = {
            $t: this.$t.bind(this),
            $te: this.$te.bind(this),
        };
    },
    methods: {
        formatKey(...args) {
            return key(...args, this.formatterOpts);
        },
        formatValue(...args) {
            return value(...args, this.formatterOpts);
        },
    },
};
</script>

<style scoped lang="scss">
.table-bg {
  background-color: var(--table-bg);

  .wrapper {
    position: relative;
    overflow: auto;
  }
}
.table {
  width: 100%;
  border-bottom: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);

  .lvl-col {
    position: sticky;
    left: 0;
    //z-index: 2;
  }
  tr:hover {
    background-color: var(--table-hover);
  }
  th, td {
    padding: 8px 10px 8px;
    line-height: 16px;
    text-align: center;
    font-size: 90%;
    user-select: none;

    border-top: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  }
  th {
    background-color: var(--table-bg2);
    font-weight: bold;
  }
}
</style>
