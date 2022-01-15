<template>
  <div class="type-nav">
    <div class="container">
      <!-- 包一个div 利用事件委托，使鼠标移入二三级菜单栏的时候，不重置currentIndex -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 通过编程式路由导航 + 事件委派 来实现路由的跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: index === currentIndex }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="c1.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c1.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 引入throttle函数，实现节流
import throttle from "lodash/throttle"
import { mapState } from "vuex"
export default {
  name: "TypeNav",
  data() {
    return {
      // 用来存储当前鼠标移入的一级标题索引，动态添加类名
      currentIndex: -1,
      // 用来动态控制三级联动菜单栏的显示与隐藏, 默认为显示
      show: true,
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    // 鼠标移入一级标题事件处理器
    // changeIndex(index) {
    //   // 更新响应式数据
    //   // 正常情况下（用户慢慢的操作）：鼠标进入、每一个一级分类的h3，都会触发鼠标进入事件
    //   // 非正常情况下（用户操作速度非常快）：应该全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
    //   // 由于用户操作过快，浏览器反应不过来。如果当前回调函数中有大量的业务逻辑，可能会出现卡顿现象
    //   this.currentIndex = index
    // },
    // 通过节流实现changeIndex，节流时间为50ms
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    // 鼠标移出一级标题事件处理器
    leaveIndex() {
      this.currentIndex = -1
      if (this.$route.path != "/home") {
        this.show = false
      }
    },
    // 鼠标移入标题时，动态显示三级联动菜单栏
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true
      }
    },
    // 通过编程式路由导航 + 事件委派 用来跳转路由
    goSearch(e) {
      // 1. 通过给a标签添加自定义属性 data-categoryName 用来区别点击的是否为a标签
      // 获取目标元素
      let element = e.target
      // 节点身上有一个dataset属性（对象类型）用来存放自定义属性，属性名全是小写
      let { categoryname, category1id, category2id, category3id } =
        element.dataset
      // 如果有categoryname,说明为a元素
      if (categoryname) {
        let location = null
        //整理路由跳转的参数
        const name = "search"
        const query = {
          categoryName: categoryname,
        }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        location = {name, query}
        // 判断当前路由对象有没有params参数。如果有, 则携带
        if(this.$route.params) {
          location.params = this.$route.params
        }
        this.$router.push(location)
      }
    },
  },
  mounted() {
    // 调用leaveIndex用来控制三级联动是否显示
    this.leaveIndex()
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    // 过渡动画的样式
    // 过渡动画开始状态
    .sort-enter {
      height: 0;
    }
    // 过渡动画结束的状态
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all .5s linear;
      overflow: hidden;
    }
  }
}
</style>
