<template>
  <router-link to="/">
    <img
      class="logo-img"
      :src="require('@/assets/logo_text.png')"
      alt="斯民图标"
    >
  </router-link>
</template>

<script>
export default {
  name: "Logo"
};
</script>

<style scoped>
.logo-img {
  padding-top: 20px;
}
</style>
