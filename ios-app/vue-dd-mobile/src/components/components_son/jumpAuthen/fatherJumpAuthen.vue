<template>
  <div class="jumpauthen">
    <C_header   right_show="true" center_text="叮板"></C_header>
    <div class="main">
      <JumpAuthen></JumpAuthen>
    </div>
  </div>
</template>
<script>
import JumpAuthen from './jumpauthen.vue'
export default {
  data () {
    return {

    }
  },
  components:{
    JumpAuthen,
  },
  methods:{

  }
}
</script>
<style scoped lang="scss">
  .jumpauthen{

    .main{
      margin-top: 2rem;
    }

  }

</style>
