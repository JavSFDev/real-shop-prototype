<template>
  <div v-if="screenWidth < 700">
    <filter-pad></filter-pad>
    <div class="products-container">
      <product-item v-for="i in columns*3" :key="i" :id="i.toString()"></product-item>
    </div>
    <paginator></paginator>
  </div>
  <div id="desktop-products" v-else>
    <filter-sidebar></filter-sidebar>
    <div>
      <div class="products-container">
        <product-item v-for="i in columns*2" :key="i" :id="i.toString()"></product-item>
      </div>
      <paginator></paginator>
    </div>
  </div>
</template>

<script>

import FilterPad from "../components/filters/FilterPad";
import FilterSidebar from "../components/filters/FilterSidebar";
import ProductItem from "../components/products/ProductItem";

export default {
  name: "Products",
  components: { ProductItem, FilterSidebar, FilterPad },
  data() {
    return {
      screenWidth: null,
      columns: null
    };
  },
  methods: {
    resizeListener() {
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