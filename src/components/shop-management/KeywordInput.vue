<template>
  <div id="container">
    <div id="keywords-control">
      <input type="text" v-model.trim="keywordValue" maxlength="25" placeholder="add a keyword">
      <base-button id="base-button" @click="addKeyword">add keyword</base-button>
    </div>
    <div id="keywords-holder">
      <span v-for="keyword in keywords" :key="keyword">#{{keyword}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeywordInput",
  data() {
    return {
      keywordValue: '',
      keywords: []
    }
  },
  methods: {
    addKeyword() {
      if (!this.keywordValue) {
        return;
      }
      this.keywords.push(this.keywordValue.replace(/\s/g, '_').toLowerCase());
      this.keywordValue = '';
    }
  }
};
</script>

<style scoped>
#container {
  background-color: #F2F2F2;
  min-height: 120px;
}
#keywords-control {
  display: flex;
  justify-content: center;
  align-content: center;
  border-bottom: 1px solid #E3E0E0;
  padding: 10px;
}
#keywords-control > input {
  margin-right: 5px;
  font-size: 0.8em;
  height: 20px;
  width: 50%;
}
#keywords-holder {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}

#keywords-holder > span {
  margin-right: 5px;
}

@media screen and (min-width: 340px){
  #keywords-control > input {
    margin-right: 10px;
    font-size: 1em;
    width: unset;
    height: 25px;
  }
}

@media screen and (min-width: 700px){
  #keywords-control > input {
    width: 50%;
  }
  #base-button {
    font-size: 1em;
  }
}
@media screen and (min-width: 790px){

}
</style>