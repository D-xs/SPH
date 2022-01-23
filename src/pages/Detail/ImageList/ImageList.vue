<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"
        @click="changeImageIndex(index)"
      >
        <img
          :class="{ active: index === currentIndex }"
          :src="skuImage.imgUrl"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper"
export default {
  name: "ImageList",
  data() {
    return {
      // 存储当前点击图片的索引，动态绑定active类
      currentIndex: 0,
    }
  },
  props: {
    skuImageList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    changeImageIndex(index) {
      // 触发自定义事件，通知zoom组件，修改图片的Index
      this.$bus.$emit("changeImageIndex", index)
      // 修改当前的索引值
      this.currentIndex = index
    },
  },
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },

          slidesPerView: 3,
          grid: {
            fill: "column",
            rows: 1,
          },
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
