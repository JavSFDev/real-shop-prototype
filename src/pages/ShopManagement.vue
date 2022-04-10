<template>
  <div id="mobile-container" v-if="screenWidth < 700">
    <filter-pad managing></filter-pad>
    <tool-bar :is-active="isToolbarActive"></tool-bar>
    <div class="products-container">
      <product-item v-for="i in columns*3" :key="i" managing :id="i.toString()" @selected="itemSelected"></product-item>
    </div>
    <paginator></paginator>

  </div>
  <div id="desktop-products" v-else>
    <filter-sidebar managing :is-toolbar-active="isToolbarActive"></filter-sidebar>
    <div>
      <div class="products-container">
        <product-item v-for="i in columns*2" :key="i" managing :id="i.toString()" @selected="itemSelected"></product-item>
      </div>
      <paginator></paginator>
    </div>
  </div>
</template>

<script>
import ToolBar from "../components/shop-management/ToolBar";
import ProductItem from "../components/products/ProductItem";
import FilterSidebar from "../components/filters/FilterSidebar";
import FilterPad from "../components/filters/FilterPad";
export default {
  name: "ShopManagement",
  // eslint-disable-next-line vue/no-unused-components
  components: { ToolBar, ProductItem, FilterSidebar, FilterPad },
  data() {
    return {
      screenWidth: null,
      columns: null,
      currentSelectedItem: null,
      previousSelectedItem: null,
      isToolbarActive: false
    };
  },
  methods: {
    itemSelected(id, container) {
      this.isToolbarActive = true;
      this.previousSelectedItem = this.currentSelectedItem;
      this.currentSelectedItem = container;

      if(this.previousSelectedItem) {
        this.previousSelectedItem.style.border = "2px solid #E3E0E0";
      }
      this.currentSelectedItem.style.border = "2px solid #5350CF";

      console.log(this.previousSelectedItem);
      console.log(this.currentSelectedItem);
    },
    resizeListener() {
      // this.isToolbarActive = false;
      // this.previousSelectedItem = null;
      // this.currentSelectedItem = null;
      this.screenWidth = window.innerWidth;
      if (window.innerWidth < 370) {
        this.columns = Math.trunc((window.innerWidth - 10) / 140);
      }
      else if (window.innerWidth < 700) {
        this.columns = Math.trunc((window.innerWidth - 10) / 180);
      } else {
        this.columns = Math.trunc((window.innerWidth - 10 - 350) / 310);
      }
      console.log(this.columns);
    }
  },
  created() {
    this.screenWidth = window.innerWidth;
    if (window.innerWidth < 370) {
      this.columns = Math.trunc((window.innerWidth - 10) / 140);
    }
    else if (window.innerWidth < 700) {
      this.columns = Math.trunc((window.innerWidth - 10) / 180);
    }
    else {
      this.columns = Math.trunc((window.innerWidth - 10 - 350) / 300);
    }

    window.addEventListener("resize", this.resizeListener);
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeListener);
  }

};
</script>

<style scoped>
.products-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /*align-items: center;*/
  justify-content: center;
  align-items: center;
  padding: 0 0 0 10px;
}

#desktop-products {
  display: flex;
  flex-direction: row;
}


</style>