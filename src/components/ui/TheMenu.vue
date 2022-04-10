<template>
  <ul>
    <li @click="$emit('option1-clicked')"><img src="../../assets/shop-management.png" height="35"><span>shop management</span></li>
    <li @click="$emit('option2-clicked')"><img src="../../assets/settings-menu.png" height="35"><span>profile settings</span></li>
    <li @click="$emit('option3-clicked')"><img src="../../assets/customer-requests.png" height="35"><span>customer requests</span></li>
    <li @click="$emit('option4-clicked')"><img src="../../assets/trade-activities.png" height="35"><span>trade activities</span></li>
    <li @click="$emit('option5-clicked')"><img src="../../assets/logou-menu.png" height="35"><span>logout</span></li>
  </ul>
</template>

<script>
export default {
  name: "TheMenu",
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn'];
    }
  },
};
</script>

<style scoped>

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #8E7CFF;
  position: absolute;
  margin: 0;
  padding: 10px;
  right: 0;
  height: 250px;
}

li {
  padding: 3px;
  margin: 0;
  font-size: 1.3em;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 2px solid gray;
}
li:hover {
  background-color: white;
}
span {
  margin-left: 5px;
}



</style>