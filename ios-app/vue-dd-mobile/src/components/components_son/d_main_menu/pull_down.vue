<template>
  <div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li v-for="item in 10">{{ item }}</li>
      </ul>
    </mt-loadmore>
  </div>
</template>
<script>
  export default{
      data(){
          return{
            allLoaded:false,
          }
      },
      methods:{
        loadTop(){
          // 加载更多数据
          this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() {
          // 加载更多数据
          this.allLoaded = true;// 若数据已全部获取完毕
          this.$refs.loadmore.onBottomLoaded();
        }
      }
  }
</script>
<style>

</style>
