<template>
  <div id="container">
    <img :src="previewPicture" id="full-picture" ref="picture">
    <div id="thumbnails">
      <img @click="toOtherPicture($event)" src="../../assets/product-fullsize.jpg" ref="firstItem">
      <img @click="toOtherPicture($event)" src="../../assets/pro1.jpg">
      <img @click="toOtherPicture($event)" src="../../assets/pro2.jpg">
      <img @click="toOtherPicture($event)" src="../../assets/pro3.jpg">
      <img @click="toOtherPicture($event)" src="../../assets/pro4.jpg">
    </div>
  </div>
</template>

<script>
export default {
  name: "PicturesViewer",
  data() {
    return {
      previousItem: null,
      currentItem: null,
      previewPicture: require("../../assets/product-fullsize.jpg")
    };
  },
  methods: {
    toOtherPicture(event) {
      this.previousItem = this.currentItem;
      this.currentItem = event.target;

      if (this.previousItem !== this.currentItem) {
        this.previewPicture = this.currentItem.src;

        this.currentItem.style.outline = "2px solid #5350CF";
        this.currentItem.style.outlineOffset = "5px";
        this.previousItem.style.outline = "none";
        this.previousItem.style.outlineOffset = "0";
      }

    }
  },
  mounted() {
    const firstItem = this.$refs.firstItem;
    this.currentItem = firstItem;
    firstItem.style.outline = "2px solid #5350CF";
    firstItem.style.outlineOffset = "5px";
  }
};
</script>

<style scoped>
#container {
  margin: 0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #E3E0E0;
}

#thumbnails {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 10px auto 4px;

}
#full-picture {
  box-sizing: border-box;
  border: 2px solid #E3E0E0;
  padding: 5px;
}
#thumbnails > img {
  margin: 0 5px;
  padding: 0;
  width: 20%;
  border: 1px solid #E3E0E0;
  cursor: pointer;
}

@media screen and (min-width: 700px){
  #container {
    border-bottom: none;
  }
}
</style>