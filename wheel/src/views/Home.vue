<template>
  <div>
    <a href="javascript:void(0)" @click="test()">{{value}}</a>
  </div>
</template>

<script>


export default {
  data() {
    return {
      value: '测试'
    }
  },
  methods: {
    test() {
      this.$api.test.testGet()
      // console.log('测试')
    }
  }
}
</script>
