<template>
  <div>
    <span id="previous">previous</span>
    <span style="background-color: #169BD5; color: white">1</span>
    <span>2</span>
    <span>3</span>
    <span id="next">next</span>
  </div>
</template>

<script>
export default {
  name: "Paginator"
};
</script>

<style scoped>
div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

span {
  border-top: 1px solid #D7D7D7;
  border-right: 1px solid #D7D7D7;
  border-bottom: 1px solid #D7D7D7;
  padding: 8px 15px;
  color: #169BD5;
  font-size: 1em;
  cursor: pointer;
}
#next {
  width: 90px;
  padding: 8px 0;
  text-align: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
#previous {
  border-left: 1px solid #D7D7D7;
  width: 90px;
  padding: 8px 0;
  text-align: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
</style>