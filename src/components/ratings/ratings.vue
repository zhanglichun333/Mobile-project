<template>
  <div class="ratings">
    <div class="overview">
      <div class="left">
        <div class="score">{{seller.score}}</div>
        <div class="name">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="right">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <star :score="seller.serviceScore" :size="36"></star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">商品评分</span>
          <star :score="seller.foodScore" :size="36"></star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <ratingSelect @select="select" @toggle="toggle" :ratings="ratings" :selectType="selectType"
      :onlyContent="onlyContent" :desc="desc"></ratingSelect>
    <ul class="wrapper">
      <li class="rating" v-for="(rating, i) in ratings" :key="i" v-show="needShow(rating.rateType, rating.text)">
        <div class="avatar">
          <img :src="rating.avatar" :alt="rating.username" width="28" height="28">
        </div>
        <div class="content">
          <div class="time">{{rating.rateTime | formatDate}}</div>
          <h1 class="username">{{rating.username}}</h1>
          <div class="star-wrapper">
            <star :size="24" :score="rating.score"></star>
            <div class="delivery" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
          </div>
          <div class="comment" v-if="rating.text">{{rating.text}}</div>
          <div class="recommend" v-if="rating.recommend">
            <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
            <span class="item" v-for="(item, i) in rating.recommend" :key="i">{{item}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import star from '../star/star.vue'
import split from '../split.vue'
import ratingSelect from '../ratingSelect.vue'
import { formatDate } from '../../assets/js/date.js'
export default {
  props: ['seller'],
  data () {
    return {
      ratings: [],
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
    get_ratings () {
      axios.get('/ratings')
        .then((res) => {
          let { status, data: { errno, data: data1 } } = res
          if (status === 200) {
            if (errno === 0) {
              this.ratings = data1
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 将ratingselect子组件向父组件传值
    select (type) {
      this.selectType = type
    },
    toggle () {
      this.onlyContent = !this.onlyContent
    },
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
  created () {
    this.get_ratings()
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    star,
    split,
    ratingSelect
  }
}
</script>

<style lang="stylus">
  .ratings
    width: 100%
    position: absolute
    top: 174px
    left: 0
    bottom: 64px
    overflow-y: auto
    &::-webkit-scrollbar
      display: none
    .overview
      display: flex
      margin: 18px 0
      .left
        width: 137px
        padding: 6px 0
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, .1)
        @media only screen and (max-width: 320px)
          width: 118px
        .score
          font-size: 24px
          line-height: 28px
          color: rgb(255, 153, 0)
        .name
          font-size: 12px
          line-height: 18px
          color: rgb(7, 17, 27)
          margin: 6px 0 8px 0
        .rank
          font-size: 10px
          line-height: 18px
          color: rgb(147, 153, 159)
      .right
        flex: 1
        padding: 6px 24px
        font-size: 12px
        line-height: 18px
        @media only screen and (max-width: 320px)
          padding: 6px 0px 6px 6px
        .score-wrapper
          margin-bottom: 8px
          .title
            vertical-align: top
            display: inline-block
            color: rgb(7, 17, 27)
          .star
            vertical-align: top
            display: inline-block
            margin: 0 12px
          .score
            vertical-align: top
            display: inline-block
            color: rgb(255, 153, 0)
        .delivery-wrapper
          .title
            display: inline-block
            color: rgb(7, 17, 27)
            margin-right: 12px
          .delivery
            display: inline-blick
            color: rgb(147, 153, 159)
    .wrapper
      .rating
        margin: 0 18px
        padding: 12px 0
        display: flex
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        .avatar
          width: 28px
          height: 28px
          border-radius: 50%
          margin-right: 12px
        .content
          flex: 1
          .time
            float: right
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
          h1
            font-size: 10px
            line-height: 12px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin: 4px 0 6px 0
            .star
              display: inline-block
              margin-right: 6px
            .delivery
              display: inline-block
              font-size: 10px
              line-height: 12px
              color: rgb(147, 153, 159)
          .comment
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
            margin-bottom: 8px
          .recommend
            .icon-thumb_up, .icon-thumb_down
              display: inline-block
              font-size: 12px
              margin: 0 8px 4px 0
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
            .item 
              display: inline-block
              font-size: 9px
              color: rgb(147, 153, 159)
              border: 1px solid rgba(7, 17, 27, .1)
              border-radius: 1px
              margin: 0 8px 4px 0
              padding: 0 6px
</style>