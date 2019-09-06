<template>
  <div class="carcontrol"> 
    <transition name="move">
      <div class="decrease" v-show="food.count>0" @click.stop="reduce">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="foodcount" v-show="food.count>0">{{food.count}}</div>
    <div class="increase icon-add_circle" @click.stop="add"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: ['food'],
  data () {
    return {
    }
  },
  methods: {
    add () {
      if (!this.food.count) {
          Vue.set(this.food, 'count', 0)
      }
      this.food.count ++
      this.$emit('add', event.target)
    },
    reduce () {
      this.food.count --
    }
  }
}
</script>

<style lang="stylus">
  .carcontrol
    display: flex
    .decrease
      flex: 1
      .inner
        display: block
        font-size: 24px
        line-height: 24px
        color: rgb(0, 160, 220)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
        .inner
          transition: all 0.4s linear
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .foodcount
      flex: 1
      width: 24px
      text-align: center
      font-size: 10px 
      line-height: 24px
      color: rgb(147, 153, 159)
    .increase
      flex: 1
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
</style>