<template>
  <div class="seller">
    <div class="overview">
      <div class="up">
        <h1>{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="36" :score="seller.score"></star>
          <div class="sellCount">月售{{seller.sellCount}}单</div>
        </div>
        <div class="favorite">
          <i class="icon-favorite" :class="{'active':collectFlag===true}" @click="toggleCellect"></i>
          <div class="text">{{collectFlag===true?'已收藏':'收藏'}}</div>
        </div>
      </div>
      <ul class="down">
        <li class="block">
          <h1>起步价</h1>
          <div class="content">
            <span class="detail">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h1>商家配送</h1>
          <div class="content">
            <span class="detail">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h1>平均配送时间</h1>
          <div class="content">
            <span class="detail">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="bulletin">
      <h1>公告与活动</h1>
      <div class="text">{{seller.bulletin}}</div>
      <ul class="supports">
        <li class="support" v-for="(item, i) in seller.supports" :key="i">
          <span class="icon" :class="classMap[item.type]"></span>
          <span class="desc">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="pics-wrapper">
      <h1>商家实景</h1>
      <div class="pics">
        <img :src="item" width="120" height="90" v-for="(item, i) in seller.pics" :key="i">
      </div>
    </div>
    <split></split>
    <div class="info-wrapper">
      <h1>商家信息</h1>
      <ul>
        <li class="info" v-for="(item, i) in seller.infos" :key="i">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import split from '../split.vue'
import star from '../star/star.vue'
export default {
  props: ['seller'],
  data () {
    return {
      collectFlag: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  methods: {
    toggleCellect () {
      this.collectFlag = !this.collectFlag
    }
  },
  components: {
    split,
    star
  }
}
</script>

<style lang="stylus">
  @import "../../assets/stylus/mimin.styl";
  .seller
    position: absolute
    left: 0
    top: 174px
    bottom: 64px
    width: 100%
    overflow-y: auto
    &::-webkit-scrollbar
      display: none
    .overview
      margin: 0 18px
      .up
        padding: 18px 0
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        position: relative
        h1
          font-size: 24px
          line-height: 24px
          color: rgb(7, 17, 27)
          margin-bottom: 8px
        .star-wrapper
          .star
            display: inline-block
            vertical-align: top
          .sellCount
            display: inline-block
            margin-left: 16px
            font-size: 10px
            line-height: 18px
            color: rgb(77, 85, 93)
        .favorite
          position: absolute
          right: 18px
          top: 18px
          text-align: center
          i
            display:block
            font-size: 24px
            line-height: 24px
            color: #d4d6d9
            margin-bottom: 4px
            &.active
              color: rgb(240, 20, 20)
          .text
            font-size: 10px
            line-height: 10px
            color: rgb(77, 85, 93)
      .down
        margin: 18px 0
        display: flex
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, .1)
          &:last-child
            border: none
          h1
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
            margin-bottom: 4px
          .content
            font-size: 10px
            line-height: 24px
            color: rgb(7, 17, 27)
            .detail
              font-size: 24px
              line-height: 24px
    .bulletin
      margin: 0 18px
      padding: 18px 0
      h1
        font-size: 24px
        line-height: 24px
        color: rgb(7, 17, 27)
        margin-bottom: 8px
      .text
        font-size: 12px
        line-height: 24px
        color: rgb(240, 20, 20)
        padding: 0 12px
        margin-bottom: 16px
      .supports
        .support
          padding: 16px 12px
          border-top: 1px solid rgba(7, 17, 27, .1)
          .icon
            display: inline-block
            width: 16px 
            height: 16px
            border-radius: 1px
            margin-right: 6px
            background-size: 16px 16px
            background-repeat: no-repeat
            vertical-align: top
            &.decrease
              bg-img('decrease_4')
            &.discount
              bg-img('discount_4')
            &.special
              bg-img('special_4')
            &.invoice
              bg-img('invoice_4')
            &.guarantee
              bg-img('guarantee_4')
          .desc
            font-size: 12px
            line-height: 16px
            color: rgb(7, 17, 27)
    .pics-wrapper
      padding: 18px
      h1
        font-size: 24px
        line-height: 24px
        color: rgb(7, 17, 27)
        margin-bottom: 12px
      .pics
        overflow-x: auto
        white-space: nowrap
        &::-webkit-scrollbar
          display: none
        img
          margin-right: 6px
    .info-wrapper
      padding: 18px
      h1
        font-size: 24px
        line-height: 24px
        color: rgb(7, 17, 27)
        margin-bottom: 12px
      .info
        padding: 16px 12px
        border-top: 1px solid rgba(7, 17, 27, .1)
        font-size: 12px
        line-height: 16px
        color: rgb(7, 17, 27)
</style>