<template>
  <canvas ref="fixedImage"></canvas>
  <div id="first-div">
    <input type="file" @change="inputOnChange($event)">
    <div id="container">
      <canvas ref="canvas">your browser does not support canvas</canvas>
      <img :src="croppedImage" ref="imageHolder">
    </div>
    <button @click="clip">Clip</button>
    <a :href="testData" download="anImage.png">download file</a>
  </div>
</template>

<script>
import Cropper from "cropperjs";

export default {
  name: "ClipperTest",
  data() {
    return {
      cropper: null,
      croppedImage: null,
      canvasContext: null,
      testData: null,
      imageWidth: null,
      imageHeight: null,
      // croppedImageWidth: null,
      // croppedImageHeight: null
    };
  },
  methods: {
    inputOnChange(event) {
      const reader = new FileReader();
      const thisNow = this;
      reader.onload = function(evt) {
        const thisLater = thisNow;
        let image = new Image();
        image.onload = function() {
          thisLater.canvasContext.canvas.width = image.width;
          thisLater.imageWidth = image.width;
          thisLater.canvasContext.canvas.height = image.height;
          thisLater.imageHeight = image.height;
          thisLater.canvasContext.drawImage(image, 0, 0);
          thisLater.cropper = new Cropper(thisLater.$refs.canvas, {
            aspectRatio: 3/2,
            viewMode: 3,
            dragMode: 'move',
            background: false,
            modal: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false,
            minCropBoxHeight: 600,
            minCropBoxWidth: 900,
          });
        }
        image.src = evt.target.result;

        console.log('reading completed');
      }
      reader.readAsDataURL(event.target.files[0]);
    },
    clip() {
      console.log(this.imageWidth, this.imageHeight);
      if (this.imageWidth <= 600 || this.imageHeight <= 900) {
        this.testData = this.cropper.getCroppedCanvas().toDataURL('image/png').replace('image/png', 'image/octet-stream');
      } else {
        this.$refs.fixedImage.width = 900;
        this.$refs.fixedImage.height = 600;
        const croppedImage = this.cropper.getCroppedCanvas();
        const cImageHeight = croppedImage.height;
        const cIamgeWidth = croppedImage.width;
        const ctx = this.$refs.fixedImage.getContext('2d');
        ctx.drawImage(this.cropper.getCroppedCanvas(), 0, 0, cIamgeWidth, cImageHeight, 0, 0, 900, 600);
        console.log(this.cropper.getCroppedCanvas());
        console.log(cIamgeWidth, cImageHeight);
        this.testData = this.$refs.fixedImage.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      }
      this.cropper.destroy();

    }
  },
  mounted() {
    this.canvasContext = this.$refs.canvas.getContext('2d')
  }
};
</script>


<style scoped>
@import "~cropperjs/dist/cropper.min.css";
#first-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 15px;
}
canvas {
  display: none;
}
#container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 900px;
  height: 600px;
}
button {
  border: none;
  font-size: 2em;
  padding: 3px 8px;
}
img {
  display: block;
}

</style>