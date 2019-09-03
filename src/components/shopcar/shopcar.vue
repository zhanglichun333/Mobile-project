<template>
  <div class="shopcar" @click="toggleList">
    <div class="left">
      <div class="logo">
        <div class="inner" :class="{heightLight:totalCount>0}">
          <span class="icon-shopping_cart" :class="{heightLight:totalCount>0}"></span>
        </div>
        <div class="count" v-if="totalCount>0">{{totalCount}}</div>
      </div>
      <div class="price" :class="{heightLight:totalPrice>0}">￥{{totalPrice}}</div>
      <div class="delivery">另需配送费￥{{deliveryPrice}}</div>
    </div>
    <div class="right" :class="{heightLight:minPrice<=totalPrice}" @click="pay" ref="right">{{price}}</div>
    <!-- <div class="ball-wrapper">
      <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
        <div class="ball" v-show="ball.show">
          <div class="inner" ref="inner"></div>
        </div>
      </transition>
    </div> -->
    <div class="ball-wrapper">
      <div v-for="(ball, index) in balls" :key="index">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show" :id="index" :key="index">
            <div class="inner" ref="inner"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="flod">
      <div class="shopcar-list" v-show="listShow">
        <div class="header">
          <h1 class="title">购物车</h1>
          <span class="clean" @click.stop="clean">清空</span>
        </div>
        <ul class="container">
          <li class="food" v-for="(food, index) in selectedFoods" :key="index">
            <span class="name">{{food.name}}</span>
            <span class="price">￥{{food.price * food.count}}</span>
            <carcontrol :food="food"></carcontrol>
          </li>
        </ul>
      </div>
    </transition>
    <transition name='fade'>
      <div class="list-mask" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
import carcontrol from '../carcontrol.vue'
export default {
  props: ['deliveryPrice', 'minPrice', 'selectedFoods'],
  data () {
    return {
      // ball: {
      //   show: false
      // },
      balls: [
        {
          show: false,
          id: 1
        }, {
          show: false,
          id: 2
        }, {
          show: false,
          id: 3
        }, {
          show: false,
          id: 4
        }, {
          show: false,
          id: 5
        }
      ],
      fold: false,
      dropBalls: []
    }
  },
  computed: {
    totalPrice () {
      let totalPrice = 0
      this.selectedFoods.forEach(item => {
        totalPrice += item.price * item.count
      })
      return totalPrice
    },
    totalCount () {
      let totalCount = 0
      this.selectedFoods.forEach(item => {
        totalCount += item.count
      })
      return totalCount
    },
    // 结算
    price () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.minPrice > this.totalPrice) {
        return `还差￥${this.minPrice - this.totalPrice}起送`
      } else {
        return `去结算`
      }
    },
    listShow () {
      if (!this.totalCount || this.totalCount === 0) {
        return false
      }
      return this.fold
    }
  },
  methods: {
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          return
        }
      }
    },
    beforeDrop (el) {
      let i = el.getAttribute('id')
      let ball = this.balls[i]
      let rect = ball.el.getBoundingClientRect()
      let x = rect.left - 32
      let y = -(window.innerHeight - rect.top - 22)
      let inner = el.getElementsByClassName('inner')[0]
      el.style.transform = `translate3d(0, ${y}px, 0)`
      inner.style.transform = `translate3d(${x}px, 0, 0)`
    },
    dropping (el, done) {
      /* eslint-disable no-unused-vars */
      let i = el.getAttribute('id')
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0,0,0)'
        el.style.transition = 'all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41)'
        let inner = el.getElementsByClassName('inner')[0]
        inner.style.transform = 'translate3d(0,0,0)'
        inner.style.transition = 'all 0.5s linear'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop (el) {
      let i = el.getAttribute('id')
      let ball = this.balls[i]
      ball.show = false
      el.style.display = 'none'
    },
    // // 点击carcontrol组件，向购物车添加，通过组件传值获取event.target
    // drop (el) {
    //   this.ball.show = true
    //   this.ball.el = el
    // },
    // // 向购物车添加的动画
    // beforeDrop (el) {
    //   let rect = this.ball.el.getBoundingClientRect()
    //   let x = rect.left - 32
    //   let y = -(window.innerHeight - rect.top - 22)
    //   let inner = this.$refs.inner
    //   el.style.transform = `translate3d(0, ${y}px, 0)`
    //   inner.style.transform = `translate3d(${x}px, 0, 0)`
    // },
    // dropping (el, done) {
    //   let inner = this.$refs.inner
    //   el.offsetWidth
    //   el.style.transform = 'translate3d(0, 0, 0)'
    //   inner.style.transform = 'translate3d(0, 0, 0)'
    //   el.style.transition = 'all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41)'
    //   inner.style.transition = 'all 0.6s linear'
    //   done()
    // },
    // afterDrop (el) {
    //   this.ball.show = false
    // },
    // 购物车列表的展开和收起
    toggleList () {
      if (!this.totalCount) {
        return
      } 
      this.fold = !this.fold
    },
    // 清空购物车列表
    clean () {
      this.selectedFoods.forEach(food => {
        food.count = 0
      })
    },
    // 结算
    pay () {
      if (this.minPrice > this.totalPrice) {
        return 
      }
      alert(`支付${this.totalPrice}元`)
    }
  },
  components: {
    carcontrol
  }
}
</script>

<style lang="stylus">
  .shopcar
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    display: flex
    background: #141d27
    color: rgba(255, 255, 255, .4)
    .left 
      flex: 1
      font-size: 0
      .logo
        display: inline-block
        box-sizing: border-box
        width: 56px
        height: 56px
        border-radius: 50%
        position: relative
        top: -10px
        background: #141d17
        margin: 0 12px
        padding: 6px
        .inner
          text-align: center
          width: 44px
          height: 44px
          background: #2b343c
          border-radius: 50%
          &.heightLight
            background: rgb(0, 160, 220)
          .icon-shopping_cart
            font-size: 24px
            line-height: 44px
            color: #80858a
            &.heightLight
              color: #fff
        .count
          width: 24px
          border-radius: 6px
          position: absolute
          top: 0
          right: 0
          text-align: center
          font-size: 9px
          line-height: 16px
          font-weight: 700
          color: rgb(255, 255, 255)
          background: rgb(240, 20, 20)
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .4)
      .price
        display: inline-block
        position: relative
        top: -8px
        font-size: 16px
        font-weight: 700
        padding-right: 12px
        border-right: 1px solid rgba(255, 255, 255, .1)
        &.heightLight
          color: #fff
      .delivery
        display: inline-block
        position: relative
        bottom: 8px
        font-size: 16px 
        padding-left: 12px
    .right
      width: 105px
      font-size: 16px
      line-height: 48px
      font-weight: 700
      padding: 0 8px
      text-align: center
      background: #2b333b
      &.heightLight
        background: #00b43c
        color: #fff
    .ball-wrapper
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
    .shopcar-list
      position: absolute
      top: 0
      left: 0
      width: 100%
      z-index: -1
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .header
        box-sizing: border-box
        width: 100%
        height: 40px
        line-height: 40px
        padding: 0 18px
        background-color: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        h1
          float: left
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .clean
          float: right
          font-size: 14px
          color: rgb(0, 160, 220)
      .container
        box-sizing: border-box
        background-color: #fff
        padding: 0 18px
        max-height: 200px
        overflow: auto
        &::-webkit-scrollbar
          display: none
        .food
          position: relative
          width: 100%
          height: 48px
          border-bottom: 1px solid rgba(7, 17, 27, .1)
          .name
            font-size: 14px
            line-height: 48px
            color: rgb(7, 17, 27)
          .price
            font-size: 14px
            color: rgb(240, 0, 0)
            position: absolute
            line-height: 24px
            right: 84px
            top: 12px
          .carcontrol
            line-height: 24px
            position: absolute
            right: 0
            top: 12px
    .list-mask
      position: fixed
      left: 0
      top: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, .6)
      backDrop-filter: blur(10px)
      opacity: 1
      z-index: -2
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-to
        opacity: 0
</style>