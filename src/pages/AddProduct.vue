<template>
  <div id="mobile-container" v-if="screenWidth < 700">
    <uploader></uploader>
    <div class="wrapper">
      <div>
        <label for="title-input">title:</label>
        <input id="title-input" class="title-input" type="text">
      </div>
      <div>
        <label for="description-input">description:</label>
        <textarea id="description-input" class="description-input"></textarea>
      </div>
      <div>
        <label for="price-input">price:</label>
        <input type="text" id="price-input" class="price-input">
      </div>
      <div>
        <label for="districts-selection">districts:</label>
        <select id="districts-selection" name="districts" class="districts-selection">
          <option v-for="district in districtsList" :key="district">{{ district }}</option>
        </select>
      </div>
      <div>
        <label for="categories">categories:</label>
        <select id="categories" name="categories" @change="categoryChanged" class="categories">
          <option v-for="category in categoriesList" :key="category" :value="toKey(category)">{{ category}}</option>
        </select>
      </div>
      <div>
        <label for="subcategories">sub-categories:</label>
        <select id="subcategories" class="subcategories" name="subcategories">
          <option v-for="scategory in currentSubCategories" :key="scategory" :value="toKey(scategory)">{{ scategory}}</option>
        </select>
      </div>
      <keyword-input></keyword-input>
      <div id="buttons" class="buttons">
        <base-button id="first-button" class="first-button">add product</base-button>
        <base-button less>discard</base-button>
      </div>
    </div>
  </div>
  <div v-else id="desktop-holder">
    <div id="desktop-left-column">
      <uploader></uploader>
      <div class="wrapper">
        <div>
          <label>title:</label>
          <input class="title-input" type="text">
        </div>
        <div>
          <label>description:</label>
          <textarea class="description-input"></textarea>
        </div>
        <div>
          <label>price:</label>
          <input type="text" class="price-input">
        </div>
      </div>
    </div>
    <div id="desktop-right-column">
      <div id="right-column-top">
        <div>
          <label>districts:</label>
          <select name="districts" class="districts-selection">
            <option v-for="district in districtsList" :key="district">{{ district }}</option>
          </select>
        </div>
        <div>
          <label>categories:</label>
          <select name="categories" @change="categoryChanged" class="categories">
            <option v-for="category in categoriesList" :key="category" :value="toKey(category)">{{ category}}</option>
          </select>
        </div>
        <div>
          <label>sub-categories:</label>
          <select class="subcategories" name="subcategories">
            <option v-for="scategory in currentSubCategories" :key="scategory" :value="toKey(scategory)">{{ scategory}}</option>
          </select>
        </div>
        <keyword-input></keyword-input>
      </div>
      <div class="buttons">
        <base-button id="first-button" class="first-button">add product</base-button>
        <base-button less>discard</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import Uploader from "../components/shop-management/Uploader";
import KeywordInput from "../components/shop-management/KeywordInput";
export default {
  name: "AddProduct",
  components: { KeywordInput, Uploader },
  data() {
    return {
      screenWidth: null,
      currentCategory: null,
      currentSubCategories: null
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
    resizeListener() {
      this.screenWidth = window.innerWidth;
    },
    categoryChanged(event) {
      this.currentSubCategories = this.subCategoriesList[event.target.value];
    }
  },
  created() {
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.resizeListener);

    this.currentCategory = this.defaultCategory;
    this.currentSubCategories = this.defaultSubCategories;
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeListener);
  }
};
</script>

<style scoped>
#desktop-holder {
  display: flex;
}
#desktop-left-column {
  width: 55%;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid #E3E0E0;
  padding: 10px;
}
#desktop-right-column {
  display: inline-flex;
  width: 45%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

label {
  display: block;
}
#mobile-container {
  padding: 20px;
}
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 10px 0 0 0;
}
.title-input,
.price-input,
.description-input,
.districts-selection,
.categories,
.subcategories {
  box-sizing: border-box;
  width: 100%;
  margin: 3px 0 15px 0;
  padding: 0;
  height: 25px;
  font-size: 1em;
  font-family: inherit;
}
.description-input {
  resize: none;
  height: 120px;
}
.districts-selection,
.categories,
.subcategories {
  background: none;
  box-shadow: none;
  border: 1px solid gray;
}
.price-input {
  width: 30%;
}
.buttons {
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  margin-top: 15px;
}
.first-button {
  margin-right: 20px;
}

#right-column-top {
  margin-top: 15px;
}


@media screen and (min-width: 390px) {
  .title-input,
  .price-input,
  .districts-selection,
  .categories,
  .subcategories {
    height: 30px;
  }
}
@media screen and (min-width: 520px){
  .description-input {
    height: 150px;
  }
}
@media screen and (min-width: 1024px){
  #desktop-left-column {
    width: 50%;
  }
  #desktop-right-column {
    width: 50%;
  }
  .wrapper {
    width: 530px;
  }

}
@media screen and (min-width: 1100px){
  #right-column-top {
    width: 530px;
  }
}
</style>