<template>
  <div id="holder">
    <select id="districts-selection" name="districts">
      <option v-for="district in districtsList" :key="district">{{ district }}</option>
    </select>
    <p>|</p>
    <select id="categories" name="categories" @change="categoryChanged($event)">
      <option v-for="category in categoriesList" :key="category" :value="toKey(category)">{{ category}}</option>
    </select>
  </div>
  <div id="expandable-holder" :class="managing ? 'no-radius' : 'radius'">
    <div v-show="isVisible">
      <span v-for="subCategory in currentSubCategories" :key="toKey(subCategory)">{{ subCategory }}</span>
    </div>
    <form v-show="isVisible">
      <input type="text" placeholder="search a keyword">
      <base-button>search</base-button>
    </form>
    <button class="expansion" @click="setVisibility">{{ isVisible ? 'hide' : 'show'}}</button>
  </div>

</template>

<script>
export default {
  name: "FilterPad",
  props: {
    managing: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      currentCategory: null,
      currentSubCategories: null,
      isVisible: true
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
    setVisibility() {
      this.isVisible = !this.isVisible;
    },
    categoryChanged(event) {
      this.currentSubCategories = this.subCategoriesList[event.target.value];
    },
    toKey(string) {
      const punctuationRemoved = string.replace("'", "").replace('&', '').replace(/\s/g, '');
      const firstChar = punctuationRemoved.charAt(0).toLowerCase();
      const endingSlice = punctuationRemoved.slice(1);
      return firstChar + endingSlice;
    }
  },
  created() {
    this.currentCategory = this.defaultCategory;
    this.currentSubCategories = this.defaultSubCategories;
  }
};
</script>

<style scoped>
#holder {
  display: flex;
  flex-direction: row;
  align-items: center;

}
select,
p{
  padding: 5px;
  margin: 0;
  border: none;
  font: inherit;
  font-size: 0.8em;
  background-color: white;
}
#categories {
  width: 60%;
}

#districts-selection {
  width: 40%
}

#expandable-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F2F2F2;
  padding-bottom: 3px;
  /*transition: height 1s linear;*/
}

#expandable-holder > div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px 5px;
  border-bottom: 1px solid #E3E0E0;
  margin-bottom: 5px;
}

#expandable-holder > div > span {
  font-size: 0.9em;
  padding: 2px 8px;
  border: 1px solid #797979;
  border-radius: 10px;
  margin: 2px 2px;
  background-color: white;
  cursor: pointer;
  white-space: nowrap;
}

button.expansion {
  border: 0;
  font-size: 0.8em;
  color: blue;
  padding: 0;
  margin-top: 5px;
  cursor: pointer;
}

#expandable-holder > form {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 90%;
}

#expandable-holder > form > input {
  width: 80%;
  font-size: 1em;
  padding: 3px 7px;
}
.radius {
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}
.no-radius {
  border-radius: unset;
}

@media screen and (min-width: 390px){
  select,
  p {
    font-size: 1em;
  }
}


</style>