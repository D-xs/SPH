<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="sendPageNo(pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startNumAndEndNum[0] > 1"
      @click="sendPageNo(1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-show="startNumAndEndNum[0] > 2">···</button>

    <!-- 动态遍历连续页码 -->
    <button
      v-for="(pageNoItem, index) in startNumAndEndNum"
      :key="index"
      @click="sendPageNo(pageNoItem)"
      :class="{ active: pageNo === pageNoItem }"
    >
      {{ pageNoItem }}
    </button>

    <button
      v-show="startNumAndEndNum[startNumAndEndNum.length - 1] < totalPage - 1"
    >
      ···
    </button>
    <button
      v-show="startNumAndEndNum[startNumAndEndNum.length - 1] < totalPage"
      @click="sendPageNo(totalPage)"
      :class="{ active: pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo === totalPage" @click="sendPageNo(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算出总共多少页
    totalPage() {
      // 细节向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出连续页码数的起始和结束页码
    startNumAndEndNum() {
      // 创建一个连续页码数字数组
      const pageNoArr = []
      // 定义两个变量存储起始与结束数字
      let start = 1,
        end = 0
      // 如果总页数少于连续的页码数，则把连续的页码数重置为总页码数
      if (this.totalPage < this.continues) {
        start = 1
        end = this.totalPage
      } else {
        // 正常现象
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        // 如果start出现负数或0，将其置为1
        if (start < 1) {
          start = 1
          end = this.continues
        }
        // 如果end大于总页码数
        if (end > this.totalPage) {
          end = this.totalPage
          start = this.totalPage - this.continues + 1
        }
      }
      while (start <= end) {
        pageNoArr.push(start)
        start++
      }
      return pageNoArr
    },
  },
  methods: {
    // 给父组件发送页码，通知发送请求
    sendPageNo(pageNo) {
      this.$emit("getPageNo", pageNo)
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
