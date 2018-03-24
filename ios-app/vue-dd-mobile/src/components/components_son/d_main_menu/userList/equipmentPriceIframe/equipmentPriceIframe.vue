<template>
  <div class="equipment_box">
    <iframe :src="equipmentPriceIframeSrc" frameborder="0"  style="min-width:100%;max-width:100%;width:100%;height:100%;"></iframe>
  </div>
</template>
<script>
  import common from '../../../../../assets/js/common'
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  export default{
      data(){
          return{

          }
      },
      computed:{
        ...mapGetters([  //首页订单的数据
          "equipmentPriceIframeSrc"
        ])
      },
      methods:{

      }
  }
</script>
<style scoped >
  .equipment_box{
    width: 100%;
    height: 100%;
  }
</style>
