<template>
  <div v-if="screenWidth < 700">
    <pictures-viewer></pictures-viewer>
    <div class="name-price-div">
      <h3>SunDisk 3GB USB Powerd by USB3</h3>
      <div class="price">₤33</div>
    </div>
    <div class="cart-button-div">
      <base-button text-black>add to cart</base-button>
    </div>
    <div class="contact-div">
      <div class="dilivary-address">
        <img src="../assets/dilivaryaddress.png">
        <p>istanbul, adalar, azlan market</p>
      </div>
      <div class="dilivary-address">
        <img src="../assets/dilivaryaddress.png">
        <p>Şair Ziya Paşa Cad. Akgün iş han, istanbul</p>
      </div>
      <div class="seller-info">
        <span class="name-pro-span">
          <span class="profile"><img src="../assets/profile.png"></span>
          <h3>Mustafa Gorkan</h3>
        </span>
        <span class="reputation-span">
          <label>reputation:</label>
          <span class="reputation">125</span>
        </span>
        <span class="contact-button">contact</span>
      </div>
    </div>
    <div class="description-div">
      <label>product description:</label>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
        sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis
        tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
    </div>
  </div>
  <div v-else id="desktop-holder">
    <div id="desktop-left-column">
      <div id="picture-part">
        <pictures-viewer></pictures-viewer>
      </div>
      <div class="name-price-div">
        <h3>SunDisk 3GB USB Powerd by USB3</h3>
        <div class="price">₤33</div>
      </div>
    </div>
    <div id="desktop-right-column">
      <div id="right-column-top">
        <div class="contact-div">
          <div class="dilivary-address">
            <img src="../assets/dilivaryaddress.png">
            <p>istanbul, adalar, azlan market</p>
          </div>
          <div class="dilivary-address">
            <img src="../assets/dilivaryaddress.png">
            <p>Şair Ziya Paşa Cad. Akgün iş han, istanbul</p>
          </div>
          <div class="seller-info">
        <span class="name-pro-span">
          <span class="profile"><img src="../assets/profile.png"></span>
          <h3>Mustafa Gorkan</h3>
        </span>
            <span class="reputation-span">
          <label>reputation:</label>
          <span class="reputation">125</span>
        </span>
            <span class="contact-button">contact</span>
          </div>
        </div>
        <div class="description-div">
          <label>product description:</label>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
            sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus.</p>
        </div>
      </div>
      <div class="cart-button-div">
        <base-button text-black>add to cart</base-button>
      </div>
    </div>
  </div>
  <div id="related-products">
    <label>consider the following related products</label>
    <div class="products-container">
      <product-item v-for="i in 3*columns" :key="i" related></product-item>
    </div>
    <router-link to="/">or return to homepage</router-link>
  </div>
</template>

<script>
import BaseButton from "../components/ui/BaseButton";
import ProductItem from "../components/products/ProductItem";

export default {
  name: "ProductDetails",
  components: { BaseButton, ProductItem },
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
      }
      else {
        this.columns = Math.trunc((window.innerWidth - 10) / 310);
      }
    }
  },
  created() {
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.resizeListener);
    if (window.innerWidth < 370) {
      this.columns = Math.trunc((window.innerWidth - 10) / 140);
    }
    else if (window.innerWidth < 700) {
      this.columns = Math.trunc((window.innerWidth - 10) / 180);
    }
    else {
      this.columns = Math.trunc((window.innerWidth - 10) / 310);
    }
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeListener);
  }
};
</script>

<style scoped>
#desktop-left-column {
  width: 50%;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
}
#desktop-right-column {
  display: inline-flex;
  width: 45%;
  flex-direction: column;
  justify-content: space-between;
}
#related-products {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #E3E0E0;
}
#related-products > label {
  margin-top: 10px;
  font-weight: bold;
  color: #A29B9B;
  white-space: nowrap;
  font-size: 0.7em;
}

.products-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /*align-items: center;*/
  justify-content: center;
  align-items: center;
  padding: 0 0 0 10px;
}

a {
  text-decoration: none;
  margin-bottom: 10px;
}
#desktop-holder {
  display: flex;
}

#picture-part {
  width: 80%;
  padding: 15px;
}

.name-price-div {
  text-align: center;
  border-bottom: 1px solid #E3E0E0;
  padding: 5px 0;
  width: 100%;
}

.name-price-div > h3 {
  font-size: 1em;
  margin: 0 0 10px;
}

.price {
  display: inline-block;
  background-color: #F55252;
  color: white;
  font-weight: bold;
  padding: 3px 5px;
  font-size: 1.3em;
  margin: 0 auto;
}

.profile {
  display: inline-block;
  width: 25px;
}

.contact-div {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #E3E0E0;
}

.contact-div > div > p {
  margin: 0;
  padding: 3px;
  font-size: 0.7em;
  color: #898282;
}

.seller-info {
  display: flex;
  justify-content: space-between;
  width: 270px;
  align-items: center;
  margin-top: 5px;
}

.name-pro-span {
  display: inline-flex;
  align-items: center;
}

.reputation-span > label {
  color: #A29B9B;
  font-size: 0.7em;
}

.reputation {
  font-size: 0.7em;
  color: #6B6767;
}

.dilivary-address {
  display: flex;
  flex-direction: row;
  align-items: center;
}


span > h3 {
  margin: 0 0 0 5px;
  font-size: 0.7em;
  color: blue;
  cursor: pointer;
}

.contact-button {
  background-color: #169BD5;
  font-size: 0.7em;
  padding: 5px 10px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}

.contact-button:active {
  outline: 1px solid gray;
}

.cart-button-div {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #E3E0E0;
  padding: 10px;
}

.description-div {
  margin: 0;
  padding: 10px;
}

.description-div > label {
  color: #A29B9B;
}

.description-div > p {
  margin: 0;
  color: #333333;
}

@media screen and (min-width: 330px) {
  .profile {
    width: 30px;
  }

  span > h3 {
    font-size: 0.9em;
  }

  .contact-button {
    font-size: 1em;
  }

  .contact-div > div > p {
    font-size: 0.8em;
  }

  .seller-info {
    width: 310px;
  }

  #related-products > label {
    font-size: 1em;
  }
}

#desktop-left-column {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #E3E0E0;
}
@media screen and (min-width: 700px) {
  .name-price-div {
    border: none;
  }
  .name-price-div > h3 {
    font-size: 1.8vw;
    border-top: 1px solid #E3E0E0;
    padding: 15px;
  }
  .price {
    font-size: 2.5vw;
  }
  .contact-div {
    border: none;
  }

  .description-div > p {
    padding: 0;
    font-size: 1em;
  }
  .description-div > label {
    font-size: 1em;
  }
  .cart-button-div {
    border: none;
  }
}
@media screen and (min-width: 1024px){
  .contact-div > div > p {
    font-size: 1.4em;
  }
  .seller-info {
    width: 480px;
  }
  span > h3 {
    font-size: 1.2em;
  }
  .reputation-span > label,
  .reputation,
  .contact-button{
    font-size: 1em;
  }
  .description-div {
    margin-top: 30px;
  }
  .description-div > p {
    padding: 0;
    font-size: 1.3em;
    max-width: 800px;
  }
  .description-div > label {
    font-size: 1em;
  }
}
</style>

