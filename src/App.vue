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
  }
}
</script>

<style>

</style>
