<template>
  <button v-if="!link" :class="{less: less, textBlack: textBlack}" :disabled="isDisabled">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    textBlack: {
      type: Boolean,
      required: false,
      default: null
    },
    less: {
      type: Boolean,
      required: false,
      default: false
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>


<style scoped>
button,
a {
  border-color: #E3E0E0;
  font: inherit;
  font-size: 0.8em;
  text-decoration: none;
  background-color: #5350CF;
  color: white;
  cursor: pointer;
  padding: 5px 9px;
  margin: 0;
  display: inline-block;
  text-align: center;
}


.less {
  background-color: #AEAEAE;
}

.textBlack {
  background-color: #169BD5;
  color: #333333;
}


@media screen and (min-width: 370px) {
  button {
    font-size: 1em;
  }
}
@media screen and (min-width: 700px) {
  button,
  a {
    font-size: 1.2em;
  }
}

</style>