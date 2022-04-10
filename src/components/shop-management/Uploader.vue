<template>
  <div class="container" :class="containerClass" ref="container">
    <canvas ref="fixedCanvas"></canvas>
    <input type="file" ref="fileInput" @change="loadFile" v-show="false">
    <div id="no-picture" v-if="!(loadedFile !== null && measured) && !measuring" :class="{profile: profile}">
      <h2>no picture uploaded</h2>
      <div id="no-picture-upload-icon" @click="firstUploadClick" ref="uploadIcon">
        <img src="../../assets/no-picture-upload-icon.png">
        <h3 v-if="!profile">add pictures</h3>
        <h3 v-else>add profile picture</h3>
      </div>
      <p v-if="measuringFailed">ops something went wrong, try again</p>
      <label v-if="!profile">maximum files: 5</label>
      <img :src="image">
    </div>
    <div v-else>
      <img v-if="isCropped" :src="previewPicture" id="full-picture">
      <img v-else-if="!measured" src="../../assets/container-template.jpg" id="container-template"
           ref="containerTemplate">
      <div v-else id="cropping-container" ref="croppingContainer">
        <canvas ref="croppingCanvas"></canvas>
      </div>
      <div id="thumbnails" v-show="!measuring">
        <span>
          <img class="pic-thumb" @click="toOtherPicture($event)" :src="firstPicture" ref="firstItem">
          <img v-if="isCropped" class="remove-button" @click="removeFirstPic()" src="../../assets/remove-image.png"
               :some-data="firstPicture">
        </span>
        <span v-for="(picture, index) in pictures" :key="index">
          <img class="pic-thumb" @click="toOtherPicture($event)" :src="picture" :ref="`thumb${index}`">
          <img v-if="isCropped" class="remove-button" @click="removePicture($event)" src="../../assets/remove-image.png"
               :some-data="picture">
        </span>
        <span v-if="!(pictures.length === 4) && isCropped && !profile">
          <img class="pic-thumb" src="../../assets/picture-upload-icon.png" @click="uploadClick" ref="uploadIcon">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";

export default {
  name: "Uploader",
  props: {
    profile: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      measuring: false,
      loadedFile: null,
      firstPicture: null,
      pictures: [],
      previousItem: null,
      currentItem: null,
      previewPicture: null,
      isCropped: false,
      measured: false,
      ccWidth: null,
      ccHeight: null,
      measuringFailed: false,
      croppingCanvasCtx: null,
      cropper: null,
      firstCropCompleted: false,
      croppedImage: null,
      currentIndex: -1
    };
  },
  computed: {
    containerClass() {
      if (this.profile) {
        return 's-container';
      } else {
        return 'r-container';
      }
    }
  },
  methods: {
    firstUploadClick() {
      this.$refs.uploadIcon.style.border = "1px solid blue";
      this.$refs.uploadIcon.style.border = "1px solid #E3E0E0";
      const thisNow = this;
      setTimeout(function() {
        thisNow.$refs.uploadIcon.style.border = "none";
        if (!thisNow.measured) {
          thisNow.renderTemplate();
        }
      }, 100);

      this.$refs.fileInput.click();
    },
    renderTemplate() {
      this.measuring = true;
      this.measure();
    },
    loadFile() {
      this.loadedFile = this.$refs.fileInput.files[0];
      if (!this.$refs.fileInput.files[0]) {
        return;
      }
      this.initializeContainer();
      if (!this.firstCropCompleted) {
        this.setupFirstCropButton();
      } else {
        this.isCropped = false;
        this.setupCropButton();
      }
      this.setupCropper();

    },
    measure() {
      const that = this;
      setTimeout(function() {
        that.measuring = false;
        const ccWidth = that.$refs.containerTemplate.offsetWidth;
        if (ccWidth < 15) {
          that.measuringFailed = true;
          setTimeout(function() {
            that.measuringFailed = false;
          }, 5000);
        } else {
          that.ccWidth = ccWidth;
          that.ccHeight = that.ccWidth / 3 * 2;
          that.measured = true;
        }
      }, 700);
    },
    initializeContainer() {
      this.$nextTick(function() {
        this.$refs.croppingContainer.style.width = `${this.ccWidth}px`;
        this.$refs.croppingContainer.style.height = `${this.ccHeight}px`;
      });
    },
    setupCropper() {
      const that = this;
      const reader = new FileReader();
      reader.onload = function(event) {
        const image = new Image();
        image.onload = function() {
          that.croppingCanvasCtx = that.$refs.croppingCanvas.getContext("2d");
          that.croppingCanvasCtx.canvas.width = image.width;
          that.croppingCanvasCtx.canvas.height = image.height;
          that.croppingCanvasCtx.drawImage(image, 0, 0);
          that.cropper = new Cropper(that.$refs.croppingCanvas, {
            aspectRatio: 3 / 2,
            viewMode: 3,
            dragMode: "move",
            background: false,
            modal: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false,
            minCropBoxHeight: that.ccHeight,
            minCropBoxWidth: that.ccWidth
          });

        };
        image.src = event.target.result;
      };
      reader.readAsDataURL(that.loadedFile);
    },
    setupFirstCropButton() {
      this.firstPicture = require("../../assets/crop-icon-colored.png");
      this.$nextTick(function() {
        this.currentItem = this.$refs.firstItem;
        this.drawOutline(this.currentItem);
      });
    },
    firstCropButtonClicked() {
      this.crop();
      this.isCropped = true;
      this.firstPreview();

    },
    crop() {
      const croppedImage = this.cropper.getCroppedCanvas();
      const cImageHeight = croppedImage.height;
      const cImageWidth = croppedImage.width;
      if (cImageWidth <= 600 && cImageHeight <= 900) {
        this.croppedImage = this.cropper.getCroppedCanvas().toDataURL("image/jpeg", 0.5);
      } else {
        this.$refs.fixedCanvas.width = 900;
        this.$refs.fixedCanvas.height = 600;
        const ctx = this.$refs.fixedCanvas.getContext("2d");
        ctx.drawImage(croppedImage, 0, 0, cImageWidth, cImageHeight, 0, 0, 900, 600);
        this.croppedImage = this.$refs.fixedCanvas.toDataURL("image/jpeg", 0.5);
      }
      this.cropper.destroy();
    },
    firstPreview() {
      this.firstPicture = this.croppedImage;
      this.previewPicture = this.croppedImage;
    },

    uploadClick() {
      this.$refs.fileInput.click();
    },
    setupCropButton() {
      this.pictures.push(require("../../assets/crop-icon-colored.png"));
      this.currentIndex++;
      this.previousItem = this.currentItem;
      const temp = `thumb${this.currentIndex}`;
      this.$nextTick(function() {
        this.currentItem = this.$refs[temp];
        this.drawOutline(this.currentItem);
      });
      this.removeOutline(this.previousItem);
    },
    cropButtonClicked() {
      this.crop();
      this.isCropped = true;
      this.preview();
    },
    preview() {
      this.pictures.pop();
      this.pictures.push(this.croppedImage);
      this.previewPicture = this.croppedImage;
    },

    removeFirstPic() {
      if (this.pictures.length === 0) {
        this.firstPicture = null;
        this.previewPicture = null;
        this.isCropped = false;
        this.loadedFile = null;
        this.firstCropCompleted = false;
        return;
      }
      this.firstPicture = this.pictures.shift();
    },
    removePicture(event) {
      this.currentIndex--;
      const removingElementIndex = this.pictures.indexOf(event.currentTarget.getAttribute("some-data"));
      this.pictures.splice(removingElementIndex, 1);
    },
    toOtherPicture(event) {
      if (!this.isCropped) {
        if (!this.firstCropCompleted) {
          this.firstCropButtonClicked();
          this.firstCropCompleted = true;
          return;
        }
        this.cropButtonClicked();
        return;
      }
      this.previousItem = this.currentItem;
      this.currentItem = event.currentTarget;

      this.previewPicture = this.currentItem.src;

      this.drawOutline(this.currentItem);
      this.removeOutline(this.previousItem);
    },
    drawOutline(element) {
      element.style.outline = "2px solid #5350CF";
      element.style.outlineOffset = "5px";
    },
    removeOutline(element) {
      element.style.outline = "none";
      element.style.outlineOffset = "0";
    }

  },



};
</script>

<style scoped>
@import "~cropperjs/dist/cropper.min.css";

img {
  width: 100%;
}
.container {
  margin: 0;
}
.r-container {
  width: 100%;
}
.s-container {
  width: 100%;
}
.profile {
  background-color: white;
}
#no-picture {
  display: flex;
  flex-direction: column;
  border: 2px solid #E3E0E0;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  box-sizing: border-box;
}


#no-picture > h2 {
  font-size: 1.2em;
}



#no-picture > label {
  margin-top: 5px;
  font-size: 0.7em;
  color: #E3E0E0;
}

#no-picture > p {
  font-size: 0.7em;
  color: red;
}

#no-picture-upload-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px;
  padding: 3px;
}

#no-picture-upload-icon > h3 {
  margin: 0;
  font-size: 1em;
}

#no-picture-upload-icon > img {
  margin-bottom: 5px;
  width: 38px;
}

#no-picture-upload-icon:hover {
  background-color: aliceblue;
}

#thumbnails {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 10px auto 4px;
}


#full-picture,
#container-template {
  box-sizing: border-box;
  border: 2px solid #E3E0E0;
  padding: 5px;
}

#thumbnails > span {
  display: flex;
  margin: 0 7px;
  padding: 0;
  width: 20%;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.pic-thumb {
  border: 1px solid #E3E0E0;
  cursor: pointer;
  margin-bottom: 0;

}

.remove-button {
  position: absolute;
  font-weight: normal;
  right: 0%;
  bottom: 0px;
  width: 16%;
  margin: 0;
  font-size: 0.6em;
  user-select: none;
  padding: 0px 0px;
  align-self: end;
  cursor: pointer;
}

.remove-button:hover {
  outline: 1px solid gray;
}

canvas {
  display: none;
}

@media screen and (min-width: 520px){
  #no-picture {
    height: 250px;
  }
}

@media screen and (min-width: 700px) {
  .container {
    border-bottom: none;
  }
}

@media screen and (min-width: 1024px){
  .r-container {
    width: 530px;
  }
  .s-container {
    width: 350px
  }
}
</style>