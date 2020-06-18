<template>
  <router-link to="/">
    <img class="logo-img" v-lazy="logo_source" alt="斯民图标" />
  </router-link>
</template>

<script>
export default {
  name: "Logo",
  data() {
    return {
      logo_source:
        "https://cm-1301052396.cos.ap-shanghai.myqcloud.com/logo_text.png"
    };
  }
};
</script>

<style scoped>
.logo-img {
  padding-top: 20px;
}
</style>
