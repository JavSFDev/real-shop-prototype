<template>
  <input name="file-input" type="file" />
</template>

<script>
export default {
  name: "FileUploadTest",
  data() {
    return {
      file: null,
      testText: "",
    };
  },
  methods: {
    // async uploadImage(event) {
    //   const storage = getStorage(app);
    //   const cRef = ref(storage, 'a-file');
    //   await uploadBytes(cRef, event.target.files[0]);
    //   // const formData = new FormData();
    //   // const file = event.target.files[0];
    //   // formData.append('myImage', file, file.name);
    //   // axios.post('http://localhost:5001/cloud-function-demo-brimmann/us-central1/uploadFile', formData);
    // }
  },
};
</script>

<style scoped></style>
