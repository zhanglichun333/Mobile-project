<template>
  <div class="goods" ref="goods">
    <!-- 左侧菜单栏 -->
    <div class="menu">
      <div class="menuList" v-for="(item, index) in goods" :key="index" :class="currentIndex===index?'active':''" @click="selectmenu(index, $event)" ref="menuList">
        <span class="text">
          <span class="icon" v-if="item.type!==-1" :class="classMap[item.type]"></span>
          {{item.name}}
        </span>
      </div>
    </div>
    <!-- 右侧食物列表 -->
    <div class="goodList" ref="goodList">
      <dl  class="foodList" v-for="(item, index) in goods" :key="index" ref="foodList">
        <dt class="name">{{item.name}}</dt>
        <dd class="food" v-for="(food, i) in item.foods" :key="i" @click="selectedFood(food)">
          <img :src="food.image" :alt="food.name" width="57" height="57">
          <div class="content">
            <h2>{{food.name}}</h2>
            <p :class="desFlag==true?'des':'desMore'" v-show="food.description" @click="changeDes">{{food.description}}</p>
            <div class="extra">
              <span class="sellCount">月售{{food.sellCount}}份</span>
              <span>好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="newPrice">￥{{food.price}}</span>
              <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="control">
              <carcontrol :food="food" @add="add"></carcontrol>
            </div>
          </div>
        </dd>
      </dl>
    </div>
    <!-- 食物详情页 -->
    <food :food="food" ref="food"  @add="add"></food>
    <!-- 底部购物栏 -->
  </div>
</template>

<script>
import axios from 'axios'
import carcontrol from '../carcontrol.vue'
import food from '../food.vue'

export default {
  props: ['deliveryPrice', 'minPrice'], 
  data () {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      desFlag: true,
      heightList: [],
      scrollTop: 0,
      food: {}
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.heightList.length; i++) {
        let height1 = this.heightList[i]
        let height2 = this.heightList[i + 1]
        if (!height2 || (this.scrollTop >= height1 && this.scrollTop < height2)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    // 后台数据获取goods
    get_goods () {
      axios.get('/api/goods')
        .then(res => {
          let { status, data: { errno, data: data2 } } = res
          if (status === 200) {
            if (errno === 0) {
              this.goods = data2
              this.$nextTick(() => {
                this.get_heightList()
                this.$refs.goodList.addEventListener('scroll', this.handleScroll)
              })
            }
          }
        })
        .catch(res => {
          console.log(res)
        })
    },
    // goods=>good=>desription 外卖文字描述的展开和收起
    changeDes () {
      this.desFlag = !this.desFlag
    },
    // 获取每个foodList的高度，放进数组里
    get_heightList () {
      let foodList = this.$refs.foodList
      let height = 0
      this.heightList.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.offsetHeight
        this.heightList.push(height)
      }
    },
    // 获取goodList滚动时的高度
    handleScroll () {
      this.scrollTop = this.$refs.goodList.scrollTop 
    },
    // 点击menuList菜单栏
    selectmenu (index, event) {
      let menuList = this.$refs.menuList
      let goodList = this.$refs.goodList
      let scrollY = this.heightList[index]
      menuList.forEach(item => {
        item.className = 'menuList'
      })
      event.currentTarget.className = 'active menuList'
      goodList.scrollTop = scrollY
    },
    // 子组件向父组件传值 carcontraol=>goods.vue=>App.vue(event.target)   goods.vue=>App.vue(goods)
    add (target) {
      this.$nextTick(() => {
        this.$emit('getGoods', this.goods, target)
      })
    },
    // 点击食物，进入食物详情页，把food和foodShow传入food.vue组件
    selectedFood (food) {
      this.food = food
      this.$refs.food.show()
    }
  },
  created () {
    this.get_goods()
  },
  components: {
    carcontrol,
    food
  }
}
</script>

<style lang="stylus">
  @import "../../assets/stylus/mimin.styl";

  .goods
    width: 100%
    position: absolute
    top: 174px
    bottom: 64px
    overflow: hidden
    display: flex
    .menu
      overflow-y: auto
      box-sizing: border-box
      width: 80px
      background-color: #f3f5f7
      &::-webkit-scrollbar
        display: none
      .menuList 
        box-sizing: border-box         
        display: table
        width: 100%
        height: 54px
        padding: 0 12px
        .icon
          display: inline-block
          width: 12px
          height: 12px
          background-size: 12px 12px
          background-repeat: no-repeat
          /* margin-right: 2px */
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
        .text
          display: table-cell
          vertical-align: middle
          font-size: 12px
          line-height: 14px
          border-bottom: 1px solid rgba(7, 17, 27, .1)
        &.active
          background: rgb(255, 255, 255)
          margin-top: -1px
          .text
            border:none
            font-weight: 700
    .goodList
      overflow-y: auto
      flex: 1
      &::-webkit-scrollbar
        display: none
      .foodList
        .name
          height: 26px
          font-size: 12px
          line-height: 26px
          color: rgb(147, 153, 159)
          background-color: #f3f5f7
          padding-left: 14px
          border-left: 1px solid #d9d9dd
        .food
          position: relative
          padding: 18px
          display: flex
          border-bottom: 1px solid rgba(7, 17, 27, .1)
          &:last-child
            border: none
          img
            width: 57px
            margin-right: 10px
            vertical-align: top
          .content
            flex: 1
            h2
              font-size: 14px
              line-height: 14px
              color: rgb(7, 17, 27)
              padding: 2px 0 8px 0
            .des
              font-size: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
              padding-bottom: 8px
              width: 190px
              height: 12px
              white-space:nowrap
              overflow:hidden
              text-overflow:ellipsis
            .desMore
              font-size: 10px
              line-height: 14px
              color: rgb(147, 153, 159)
              padding-bottom: 8px
            .extra
              font-size: 10px
              line-height:  10px
              color: rgb(147, 153, 159)
              padding-bottom: 8px
              .sellCount
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .newPrice
                font-size: 14px
                color: rgb(240, 20, 20)
                margin-right: 8px
              .oldPrice
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
            .control
              position: absolute
              right: 50px
              bottom: 12px
</style>