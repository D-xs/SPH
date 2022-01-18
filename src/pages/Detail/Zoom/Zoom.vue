<template>
  <div class="spec-preview">
    <!-- 左侧背景图 -->
    <img :src="skuImageList[imageIndex].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <!-- 右侧大图 -->
      <img :src="skuImageList[imageIndex].imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      imageIndex: 0,
    }
  },
  props: {
    skuImageList: {
      type: Array,
      default() {
        return [{}]
      },
    },
  },
  methods: {
    changeImageIndex(imageIndex) {
      this.imageIndex = imageIndex
    },
    // 放大镜回调
    handler(e) {
      // 获取鼠标离左边框和上边框的距离
      let x = e.offsetX
      let y = e.offsetY
      // 获取遮罩层元素
      const maskEle = this.$refs.mask
      // 获取大图元素
      const bigEle = this.$refs.big
      // 获取遮罩层的宽度和高度
      let maskWidht = maskEle.offsetWidth
      let maskHeight = maskEle.offsetHeight
      // 计算遮罩层应该偏移的距离
      let top = y - maskHeight / 2
      let left = x - maskWidht / 2
      // 约束遮罩层的边界位置
      if (top < 0) {
        top = 0
      }
      if (top > maskHeight) {
        top = 200
      }
      if (left < 0) {
        left = 0
      }
      if (left > maskWidht) {
        left = 200
      }
      // 修改遮罩层的定位
      maskEle.style.left = left + "px"
      maskEle.style.top = top + "px"
      // 修改大图定位
      bigEle.style.left = -left * 2 + "px"
      bigEle.style.top = -top * 2 + "px"
    },
  },
  mounted() {
    // 全局事件总线，用来获取兄弟组件传过来的索引值
    this.$bus.$on("changeImageIndex", this.changeImageIndex)
  },
  beforeDestroy() {
    this.$bus.$off("changeImageIndex")
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
