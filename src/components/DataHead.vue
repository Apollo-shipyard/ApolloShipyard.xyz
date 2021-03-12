<template>
  <div class="head">

    <div class="general">
      <div class="body">
        <div
          v-if="reserve.TID"
          :id="reserve.Name"
          class="title"
        >
          <a :href="'#' + reserve.Name">{{ $t(reserve.TID) }}</a>
        </div>
        <p
          v-if="reserve.TID_DESCR"
          class="descr"
        >{{ $t(reserve.TID_DESCR) }}</p>
        <ul class="characteristics">
          <li
            v-for="(value, key) in reserve.other"
            :key="key"
            class="line"
          >
            <b>{{ formatKey(key) }}</b>: {{ formatValue(key, value) }}
          </li>
        </ul>
      </div>
      <div class="icon">
        <icon
          :icon="reserve.Icon"
          :rarity="reserve.Rarity"
        />
      </div>
    </div>

    <div class="other">
      <ul
        v-for="(item, categoryName) in args"
        :key="categoryName"
        class="characteristics"
      >

        <li class="header">
          <a :href="'#' + reserve.Name + categoryName">{{ $t(categoryName) }}</a>
        </li>
        <li
          v-for="(value, key) in item"
          :key="key"
          class="line"
        >
          <b>{{ formatKey(key) }}</b>: {{ formatValue(key, value) }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import Icon from './DataHeadIcon.vue';

import value from '@Handlers/value.js';
import key from '@Handlers/key.js';
import ignoringKeys from '@Regulation/ignoringKeys.js';

export default {
    name: 'Head',
    components: { Icon },
    props: {
        args: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            reserve: {},
        };
    },
    created() {
        const { TID, TID_DESCR, Rarity, Icon, Name } = this.args.default;

        this.reserve = {
            Name, Icon,
            Rarity: Rarity || 0,
            TID: (Array.isArray(TID)) ? null : TID,
            TID_DESCR: (Array.isArray(TID_DESCR)) ? null : TID_DESCR,
            other: { ...this.args.default },
        };
        this.formatterOpts = {
            $t: this.$t.bind(this),
            $te: this.$te.bind(this),
        };
        this._deleteKeys(ignoringKeys.global, this.args);
        this._deleteKeys([...ignoringKeys.inDefault, ...ignoringKeys.global], this.reserve.other);
    },
    methods: {
        formatKey(...args) {
            return key(...args, this.formatterOpts);
        },
        formatValue(...args) {
            return value(...args, this.formatterOpts);
        },
        _deleteKeys(keys, obj) {
            keys.forEach((key) => deleteKey(key, obj));

            function deleteKey(searchKey, obj) {
                if (searchKey in obj) {
                    delete obj[searchKey];
                    return;
                }
                Object.values(obj)
                    .filter((value) => value.constructor === Object)
                    .forEach((value) => deleteKey(searchKey, value));
            }
        },
    },
};
</script>

<style scoped lang="scss">
$mw: 900px;

.head {
  padding-bottom: 25px;
}

.general {
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 2%;

  .body {
    flex-basis: 90%;

    @media screen and (max-width: $mw) {
      flex-basis: 80%;
    }

    .title {
      font-size: 200%;

      @media screen and (max-width: $mw) {
        font-size: 180%;
      }
      a {
        color: #EB422C;
      }
    }
    .descr {
      font-size: 160%;
      margin: 2% 0 1% 0;
      padding-bottom: 10px;

      @media screen and (max-width: $mw) {
        font-size: 100%;
      }
    }
    .characteristics .line {
      padding: 0.5% 0;
    }
  }
  .icon {
    flex-basis: 10%;

    @media screen and (max-width: $mw) {
      flex-basis: 20%;
    }
  }
}

.other {
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: $mw) {
    flex-direction: column;
  }

  .characteristics {
    background-color: #2b2b2b;
    margin: 0 10px;
    width: 100%;
    padding: 15px;

    @media screen and (max-width: $mw) {
      width: auto;
      margin: 0 0 10px;

      &:last-child {
        margin: 0;
      }
    }
    .line {
      padding: 1.5% 0;
    }
  }
}
.characteristics {
  font-size: 80%;
  list-style-type: none;

  li.header {
    font-size: 180%;
    padding-bottom: 8px;

    @media screen and (max-width: $mw) {
      font-size: 120%;
    }
  }
  li.line {
    font-size: 130%;
    white-space: nowrap;

    @media screen and (max-width: $mw) {
      font-size: 90%;
    }
  }
  &:last-child {
    margin-right: 0;
  }
  &:first-child {
    margin-left: 0;
  }
}
</style>
