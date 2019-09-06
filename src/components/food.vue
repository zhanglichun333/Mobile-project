<template>
  <transition name="move">
    <div class="food" v-show="foodShow">
      <div class="back" @click="hide">
        <i class="icon-arrow_lift"></i>
      </div>
      <div class="wrapper">
        <div class="header">
          <img :src="food.image" :alt="food.name">
        </div>
        <div class="content">
          <h1>{{food.name}}</h1>
          <div class="sell">
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="new">￥{{food.price}}</span>
            <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="add" v-if="!food.count || food.count ===0" @click="addFirst">加入购物车</div>
          <div class="control" v-if="food.count>0">
            <carcontrol :food="food" @add="add"></carcontrol>
          </div>
        </div>
        <split v-if="food.info"></split>
        <div class="info" v-if="food.info">
          <h1>商品介绍</h1>
          <p>{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1>商品评价</h1>
          <ratingSelect @select="select" @toggle="toggle" :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></ratingSelect>
          <ul class="wrapper" v-show="food.ratings.length">
            <li class="rating" v-for="(rating, i) in food.ratings" :key="i" v-show="needShow(rating.rateType, rating.text)">
              <div class="user">
                <img :src="rating.avatar" :alt="rating.username" width="12" height="12" class="avatar">
                <div class="username">{{rating.username}}</div>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <div class="comment">
                <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
                {{rating.text}}
              </div>
            </li>
          </ul>
          <div class="nowrapper" v-if="!food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import carcontrol from './carcontrol.vue'
import split from './split.vue'
import {formatDate} from '../assets/js/date.js'
import Vue from 'vue'
import ratingSelect from './ratingSelect'
export default {
  props: ['food'],
  data () {
    return {
      foodShow: false,
      selectType: 2,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '好评',
        negative: '差评'
      }
    }
  },
  methods: {
    // 组件的显示与隐藏
    show () {
      this.foodShow = true
    },
    hide () {
      this.foodShow = false
    },
    // 1、首次点击加入购物车，this.totalCount = 1，2、实现小球动画：food.vue=>good.vue=>App.vue=>shopcar.vue event.target
    addFirst () {
      Vue.set(this.food, 'count', 1)
      this.$emit('add', event.target)
    },
    //实现小球动画：carcontrol.vue => food.vue=> good.vue=> App.vue=> shopcar.vue event.target
    add () {
      this.$emit('add', event.target)
    },
    // ratingSelect组件向父组件传值
    select(type) {
      this.selectType = type
    },
    toggle() {
      this.onlyContent = !this.onlyContent
    },
    // 每一条评论是否展开， 根据rateType text
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === 2) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  components: {
    carcontrol,
    split,
    ratingSelect
  }
}
</script>

<style lang="stylus">
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    background-color: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position: fixed
      top: 10px
      left: 10px
      z-index: 1
      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: 14px
        color: #fff
        background-color: rgba(0, 0, 0, .3)
        border-radius: 50%
    .wrapper
      width: 100%
      height: 100%
      overflow-y: auto
      &::-webkit-scrollbar
        display: none
      .header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .content
        position: relative
        padding: 18px
        h1
          font-size: 14px
          line-height: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .sell
          font-size: 10px
          line-height: 10px
          color: rgb(147, 153, 159)
          margin: 8px 0 18px 0
          .sellCount
            margin-right: 12px
        .price
          .new
            font-size: 14px
            line-height: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
            margin-right: 12px
          .old
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
            text-decoration: line-through
        .add
          width: 74px
          height: 24px
          border-radius: 12px
          position: absolute
          bottom: 18px
          right: 18px
          font-size: 10px
          line-height: 24px
          color: #fff
          background: rgb(0, 160, 200)
          text-align: center
        .control
          position: absolute
          bottom: 18px
          right: 18px
      .info
        padding: 18px
        h1
          font-size: 14px
          line-height: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
          margin-bottom: 6px
        p
          font-size: 12px
          line-height: 24px
          font-weight: normal
          color: rgb(77, 85, 93)
      .rating
        h1
          font-size: 14px
          line-height: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
          margin: 18px 0 0 18px
        .wrapper
          .rating
            margin: 0 18px
            padding: 18px 0
            position: relative
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            .user
              .avatar
                float: right
                margin-left: 6px
              .username
                float: right
                font-size: 10px
                line-height: 12px
                color: rgb(147, 153, 159)
            .time
              font-size: 10px
              line-height: 12px
              color: rgb(147, 153, 159)
              margin-bottom: 6px
            .comment
              font-size: 12px
              line-height: 16px
              color: rgb(7, 17, 27)
              .icon-thumb_up, .icon-thumb_down
                color: rgb(147, 153, 159)
                line-height: 24px
              .icon-thumb_up
                color: rgb(0, 160, 220)
        .nowrapper
          padding: 18px
          font-size: 12px
          color: rgb(147, 153, 159)
</style>