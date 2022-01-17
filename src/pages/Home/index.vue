<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor
      v-for="floorItem in floorList"
      :key="floorItem.id"
      :floor="floorItem"
    />
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex"
import ListContainer from "./ListContainer"
import TodayRecommend from "./TodayRecommend"
import Rank from "./Rank"
import Like from "./Like"
import Floor from "./Floor"
import Brand from "./Brand"

export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
  mounted() {
    // 派发action，获取floor组件用的数据
    this.$store.dispatch("home/getFloorList")
  },
}
</script>

<style lang="less" scoped></style>
