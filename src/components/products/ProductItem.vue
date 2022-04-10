<template>
  <div id="container" @click="itemSelected" ref="container">
    <div id="preview-picture">
      <img src="../../assets/place-holder-product-pic.jpg">
    </div>
    <h3>SunDisk 3GB USB Powerd by USB3</h3>
    <div id="price">₤33</div>
    <p v-if="!related">Şair Ziya Paşa Cad. Akgün iş han, istanbul</p>
    <base-button text-black v-if="!related && !managing">add to cart</base-button>
    <router-link to="/products/3" class="text-button" v-if="!managing">see details</router-link>
    <div id="management" v-else>
      <router-link to="/edit_product/3" class="text-button">edit</router-link>
      <span class="text-button">delete</span>
    </div>
  </div>
</template>

<script>
import BaseButton from "../ui/BaseButton";

export default {
  name: "ProductItem",
  components: { BaseButton },
  emits: ['selected'],
  props: {
    id: {
      type: String,
      required: true,
      default: null
    },
    related: {
      type: Boolean,
      required: false,
      default: false
    },
    managing: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    itemSelected() {
      this.$emit('selected', this.id, this.$refs.container);
    },

  }
};
</script>

<style scoped>
#container {
  display: inline-flex;
  flex-direction: column;
  width: 140px;
  align-items: center;
  background-color: #F2F2F2;
  margin: 10px 10px 10px 0px;
  box-sizing: border-box;
  padding: 0;
  border: 2px solid #E3E0E0;
}

#preview-picture {
  width: 140px;
  padding: 3px;
  box-sizing: border-box;
}

p {
  font-size: 0.6em;
  color: #898282;
  margin-left: 3px;
}

h3 {
  margin: 0;
  font-size: 0.6em;
  padding: 4px;
  height: 27px;
}

.text-button {
  font-size: 0.7em;
  margin-top: 7px;
  margin-bottom: 2px;
  text-decoration: none;
  color: blue;
}

#price {
  background-color: #F55252;
  color: white;
  font-weight: bold;
  padding: 3px 5px;
  font-size: 0.7em;
}

#management {
  display: flex;
  width: 95%;
  justify-content: space-between;
  padding: 5px 10px;
}
#management > span {
  color: darkred;
  cursor: pointer;
  user-select: none;
}

@media screen and (min-width: 370px) {
  h3 {
    font-size: 0.7em;
  }

  #price {
    font-size: 0.8em;
  }

  #container,
  #preview-picture {
    width: 170px;
  }
}

@media screen and (min-width: 700px) {
  #preview-picture {
    width: 300px;
  }

  #container {
    width: 300px;
    height: fit-content;
  }

  h3 {
    font-size: 0.9em;
    height: 37px;
    align-self: start;
  }

  #price {
    font-size: 1.2em;
  }

  p {
    font-size: 0.8em;
  }

  .text-button {
    font-size: 1em;
    margin-top: 10px;
  }

}
</style>