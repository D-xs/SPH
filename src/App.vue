<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 通过路由元信息控制footer组件显示与隐藏 -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 当挂载完毕，派发action，获取三级联动数据（在这里发请求，优化：使请求只发一次）
    this.$store.dispatch("home/getCategoryList")
  }
}
</script>

<style>

</style>
