<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfoItem in cartInfoList"
          :key="cartInfoItem.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfoItem.isChecked"
              @change="updateChecked(cartInfoItem.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfoItem.imgUrl" />
            <div class="item-msg">{{ cartInfoItem.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfoItem.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', 1, cartInfoItem)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfoItem.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cartInfoItem)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cartInfoItem)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{
              cartInfoItem.skuNum * cartInfoItem.skuPrice
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="deleteCartBySkuId(cartInfoItem.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="checkAllGoods && cartInfoList.length > 0"
          @click="checkAllCart"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllCheckCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ total }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入节流函数，控制用户修改数量的间隔时间
import throttle from "lodash/throttle"
import { mapGetters } from "vuex"
export default {
  name: "ShopCart",
  computed: {
    ...mapGetters("shopcart", ["cartList"]),
    // 进一步计算要获取的商品列表数组
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 所有商品的总价
    total() {
      return this.cartInfoList.reduce((total, item) => {
        if (item.isChecked) {
          return total + item.skuNum * item.skuPrice
        } else {
          return total
        }
      }, 0)
    },
    // 动态显示全选按钮
    checkAllGoods() {
      return this.cartInfoList.every((item) => {
        return item.isChecked === 1
      })
    },
  },
  methods: {
    // (通过节流)修改商品数量
    handler: throttle(async function (type, num, cartInfoItem) {
      // type: 用来区分是商品加减多少
      // num: 表示在原数量的差值
      // cartInfoItem: 被操作的商品对象
      // addOrUpdateShopCart
      const params = { skuId: cartInfoItem.skuId }
      let skuNum = 0
      switch (type) {
        case "add":
          skuNum = 1
          break
        case "minus":
          // 判断商品原本的数量，如果大于1，则传-1
          // 如果小于等于1，则传0，表示当前产品个数不变
          skuNum = cartInfoItem.skuNum > 1 ? -1 : 0
          break
        case "change":
          // 判断用户输入的是否合法，非数字或者小于1视为不合法，将给服务器带0
          if (isNaN(num) || num < 1) {
            skuNum = 0
          } else {
            // 如果为小数，则转换为整数，再取变化量
            skuNum = parseInt(num) - cartInfoItem.skuNum
          }
          break
      }

      params.skuNum = skuNum
      // 派发action，通知服务器修改商品数量
      const result = await this.$store.dispatch(
        "detail/addOrUpdateShopCart",
        params
      )
      // 如果成功, 重新渲染页面
      if (result) {
        // 派发action，获取购物车当中的商品列表
        this.$store.dispatch("shopcart/getShopCartList")
      } else {
        alert("修改商品失败")
      }
    }, 1000),
    // 根据商品Id删除指定的Id
    async deleteCartBySkuId(skuId) {
      const result = await this.$store.dispatch(
        "shopcart/deleteCartBySkuId",
        skuId
      )
      // 如果删除成功，则重新发请求，获取购物车列表数据
      if (result) {
        this.$store.dispatch("shopcart/getShopCartList")
      } else {
        alert("删除商品失败")
      }
    },
    // 更改商品的选中状态
    async updateChecked(skuId, event) {
      // 派发action，发请求，通知服务器修改指定商品的isChecked属性值,isChecked: 数字 1（选中） ： 0 （取消选中）
      const result = await this.$store.dispatch(
        "shopcart/updateCartCheckState",
        { skuId, isChecked: Number(event.target.checked) }
      )
      // 如果修改成功，则重新获取购物车数据
      if (result) {
        this.$store.dispatch("shopcart/getShopCartList")
      } else {
        alert("修改商品状态失败")
      }
    },
    // 删除全部选中的商品
    deleteAllCheckCart() {
      // 首先过滤出来一个所有选中状态的商品数组
      const checkedCartInfoList = this.cartInfoList.filter((item) => {
        return item.isChecked === 1
      })
      // 派发actions，用于删除所有选中的商品
      this.$store.dispatch("shopcart/deleteAllCheckedCart", checkedCartInfoList)
    },
    // 选中或者不选择所有商品
    checkAllCart(event) {
      const isChecked = event.target.checked ? "1" : "0"
      // 派发action，修改购物车列表商品的选中状态
      this.$store.dispatch("shopcart/updateAllCartChecked", isChecked)
    },
  },
  mounted() {
    // 派发action，获取购物车当中的商品列表
    this.$store.dispatch("shopcart/getShopCartList")
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
