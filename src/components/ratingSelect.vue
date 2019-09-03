<template>
  <div class="ratingSelect">
    <div class="desc">
      <span class="positive block" :class="selectType===2?'active':''" @click="select(2)">   
        {{desc.all}}
        <i>{{ratings.length}}</i>
      </span>
      <span class="positive block" :class="{'active':selectType===0}" @click="select(0)">
        {{desc.positive}}
        <i>{{positives.length}}</i>
      </span>
      <span class="negative block" :class="{'active':selectType===1}" @click="select(1)">
        {{desc.negative}}
        <i>{{negatives.length}}</i>
      </span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
      <i class="icon-check_circle"></i>
      <span>只看有内容的评论</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ratings', 'selectType', 'onlyContent', 'desc'],
  data () {
    return {
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === 0
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === 1
      })
    }
  },
  methods: {
    select(type) {
      this.$emit('select', type)
    },
    toggleContent() {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="stylus">
  .ratingSelect
    .desc
      margin: 0 18px
      padding: 18px 0
      border-bottom: 1px solid rgba(7, 17, 27, .1)
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        font-size: 12px
        line-height: 16px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        i
          font-size: 8px
          margin-left: 2px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      font-size: 12px
      line-height: 24px
      color: rgb(147, 153, 159)
      border-bottom: 1px solid rgba(7, 17, 27, .1)
      .icon-check_circle
        font-size: 24px
        margin-right: 4px
        vertical-align: middle
      &.on
        .icon-check_circle
          color: #00c850
</style>