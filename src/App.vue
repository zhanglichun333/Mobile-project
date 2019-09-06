<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive>
      <router-view :seller="seller" @getGoods="getGoods"></router-view>
    </keep-alive>
    <shopcar :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectedFoods="selectedFoods" ref="shopcar"></shopcar>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import shopcar from './components/shopcar/shopcar.vue'
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      seller: {},
      goods: []
    }
  },
  computed: {
    selectedFoods () {
      let selectedFoods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            selectedFoods.push(food)
          }
        })
      })
      return selectedFoods
    }
  },
  methods: {
    // 获取商家信息seller
    get_seller () {
      let _this = this
      axios.get('/seller')
        .then(function (res) {
          let { status, data: { errno, data: data1 } } = res
          if (status === 200) {
            if (errno === 0) {
              _this.seller = data1
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 子组件向父组件传值 carcontraol=>goods.vue=>App.vue(event.target)，再触发shopcar.vue内部函数   goods.vue=>App.vue(goods)  
    getGoods (goods, target) {
      this.goods = goods
      this.$refs.shopcar.drop(target)
    }
  },
  created () {
    this.get_seller()
  },
  components: {
    'v-header': header,
    shopcar
  }
}
</script>

<style lang="stylus">
  @import './assets/stylus/index.styl';

 .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border: 0.5px solid rgba(7, 17, 27, 0.1)
    .tab-item
      flex: 1
      text-align: center
      a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20) 
</style>
