<template>
  <div>
    <span id="other">
      <img v-if="!isActive" src="../../assets/manage-menu-edit.png">
      <img v-else src="../../assets/manage-menu-edit-active.png">
      <img v-if="!isActive" src="../../assets/manage-menu-delete.png">
      <img v-else src="../../assets/manage-menu-delete.active.png">
    </span>
    <span id="add" @click="$router.push({name: 'add'})">
      <img src="../../assets/manage-menu-add-active.png">
    </span>
  </div>
</template>

<script>
export default {
  name: "ToolBar",
  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: space-between;
  background-color: #F2F2F2;
  border-top: 1px solid #E3E0E0;
  padding: 0;
  width: 100%;
}

#add {
  padding: 5px 10px;
  border-left: 1px solid #E3E0E0;
  margin-right: 5px;
}

#other {
  display: flex;
  padding: 5px 10px;
  align-items: center;
  border-right: 1px solid #E3E0E0;
  justify-content: space-evenly;
  width: 80px;
}

img {
  cursor: pointer;
}


</style>