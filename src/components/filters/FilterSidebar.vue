<template>
  <div id="filter-sidebar">
    <tool-bar id="toolbar" v-if="managing" :is-active="isToolbarActive"></tool-bar>
    <form>
      <input type="text" placeholder="search a keyword">
      <base-button>search</base-button>
    </form>
    <div id="selectors">
      <div>
        <label for="districts-selection">districts:</label>
        <select id="districts-selection" name="districts">
          <option v-for="district in districtsList" :key="district">{{ district }}</option>
        </select>
      </div>
      <div id="categories-parent">
        <label for="categories">categories:</label>
        <select id="categories" name="categories" @change="categoryChanged($event)">
          <option v-for="category in categoriesList" :key="category" :value="toKey(category)">{{ category}}</option>
        </select>
      </div>
    </div>
    <div id="sub-categories">
      <span v-for="subCategory in currentSubCategories" :key="toKey(subCategory)">{{ subCategory }}</span>
    </div>
  </div>
</template>

<script>
import ToolBar from "../shop-management/ToolBar";
export default {
  name: "FilterSidebar",
  components: { ToolBar },
  props: {
    managing: {
      type: Boolean,
      required: false,
      default: false
    },
    isToolbarActive: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      currentCategory: null,
      currentSubCategories: null,
    }
  },
  computed: {
    defaultCategory() {
      return this.$store.getters['filter/getDefaultCategory'];
    },
    defaultSubCategories() {
      return this.$store.getters['filter/getDefaultSubCategories'];
    },
    districtsList() {
      return this.$store.getters["filter/getDistricts"];
    },
    categoriesList() {
      return this.$store.getters['filter/getCategories'];
    },
    subCategoriesList() {
      return this.$store.getters['filter/getSubCategories'];
    }
  },
  methods: {
    toKey(string) {
      const punctuationRemoved = string.replace("'", "").replace('&', '').replace(/\s/g, '');
      const firstChar = punctuationRemoved.charAt(0).toLowerCase();
      const endingSlice = punctuationRemoved.slice(1);
      return firstChar + endingSlice;
    },
    categoryChanged(event) {
      this.currentSubCategories = this.subCategoriesList[event.target.value];
    }
  },
  created() {
    this.currentCategory = this.defaultCategory;
    this.currentSubCategories = this.defaultSubCategories;
  }
};
</script>

<style scoped>
#filter-sidebar {
  display: inline-flex;
  flex-direction: column;
  min-width: 350px;
  align-items: center;
  background-color: #F2F2F2;
  min-height: 800px;
}
#toolbar {
  align-self: start;
  border-bottom: 2px solid #E3E0E0;
}
select {
  display: block;
  padding: 5px;
  margin: 3px 0 0 0;
  border: none;
  font: inherit;
  font-size: 1em;
  background-color: white;
}
#selectors {
  margin-bottom: 50px;
}
label {
  font: inherit;
  font-size: 1em;
}
#categories-parent {
  margin-top: 5px;
}
#filter-sidebar > form {
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 0;
  display: flex;
  width: 90%;
}

#filter-sidebar > form > input {
  width: 100%;
  font-size: 1em;
  padding: 3px 7px;
}

#sub-categories {
  align-self: normal;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 5px 0;
  margin-bottom: 5px;
  border-top: 1px solid #E3E0E0;
}

#sub-categories > span {
  font-size: 1em;
  padding: 2px 8px;
  border: 1px solid #797979;
  border-radius: 10px;
  margin: 2px 2px;
  background-color: white;
  cursor: pointer;
  white-space: nowrap;
}
</style>