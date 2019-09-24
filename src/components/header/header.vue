<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" :alt="seller.name">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports"  v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span>{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletion">
      <span class="bulletion-icon"></span>
      <span class="bulletion-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div class="detail" v-if="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <star :size="48" :score="seller.score" class="star"></star>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="discounts">
              <div class="discount-item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </div>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="notice">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star.vue'
export default {
  props: ['seller'],
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      detailShow: false
    }
  },
  methods: {
    // 优惠信息的展开和收起
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    }
  },
  components: {
    star
  }
}
</script>

<style lang="stylus">
  @import "../../assets/stylus/mimin.styl";
  
  .header
    background-color: rgba(7, 17, 27, 0.5)
    color: rgb(255, 255, 255)
    position: relative
    overflow: hidden
    .content-wrapper
      position: relative
      padding: 24px 0px 18px 24px
      font-size: 0
      .avatar
        width: 64px
        height: 64px
        display: inline-block
        img
          border-radius: 4px
      .content
        display: inline-block
        margin-left: 18px
        padding: 2px 0
        .title
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-img('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            vertical-align: top
          .name
            margin-left: 6px
            font-size: 16px
            font-weight: 700
            line-height: 16px
        .description
          margin: 8px 0 10px 0
          font-size: 12px
          line-height: 12px
        .supports
          font-size: 10px
          line-height: 10px
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            vertical-align: top
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
      .support-count
        position: absolute
        right: 12px
        bottom: 16px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        font-size: 10px
        .icon-keyboard_arrow_right::before
          margin-left: 2px
    .bulletion
      height: 28px
      padding: 0 16px 0 12px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, .2)
      position: relative
      .bulletion-icon
        width: 22px
        height: 12px
        display: inline-block
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
        vertical-align: top
        margin-top: 8px
      .bulletion-text
        line-height: 28px
        margin-left: 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        bottom: 7px
    .background
      width: 100%
      height: 100%
      position: absolute
      top: 0
      left: 0
      z-index: -1
      img
        filter: blur(10px)
        width: 100%
        height: 100%
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s
    .fade-enter, .fade-leave-to 
      opacity: 0
    .detail
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background-color: rgba(7, 17, 27, 0.8)
      backdrop: blur(10px)
      z-index: 1
      .detail-wrapper
        min-height: 100%
        .detail-main
          padding: 64px 36px
          color: rgb(255, 255, 255)
          .name
            font-size: 16px
            line-height: 16px
            font-weight: 700
            text-align: center
          .star
            margin: 18px 0 28px 0
            text-align: center
          .title
            display: flex
            .line
              flex: 1
              border-bottom: 1px solid rgba(225, 225, 255, .2)
              position: relative
              top: -6px
            .text
              font-size: 14px
              font-weight: 700
              padding: 0 12px
          .discounts
            margin: 24px 12px 28px 12px
            .discount-item
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0 
              .icon
                display: inline-block
                width: 16px
                height: 16px
                background-repeat: no-repeat
                background-size: 16px 16px
                margin-right: 6px
                &.decrease
                  bg-img('decrease_1')
                &.discount
                  bg-img('discount_1')
                &.guarantee
                  bg-img('guarantee_1')
                &.invoice
                  bg-img('invoice_1')
                &.special
                  bg-img('special_1')
              .text
                vertical-align: top
                font-size: 12px
                line-height: 12px
          p
            margin: 24px 12px 0 12px
            font-size: 12px
            line-height: 24px      
      .detail-close
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        font-size: 32px
</style>