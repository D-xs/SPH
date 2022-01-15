<template>
  <div>
    <!-- Search路由组件 -->
    <typeNav/>
  </div>
</template>

<script>
  export default {
    name: "Search",
    created() {
      console.log(this.$route);
    }
  }
</script>

<style lang="less" scoped>

</style>