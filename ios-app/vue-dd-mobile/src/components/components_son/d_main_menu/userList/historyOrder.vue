<template>
  <div>
    <div class="header_fixed">
      <C_header left_show="true" center_text="历史订单"></C_header>
    </div>
    <div>
      <C_all_order :order_data="item" v-for="(item,index) in order_type5.orders" v-if="order_type5.orders.length"></C_all_order>
      <div v-if="order_type5.orders.length==0">
        <c_no_order></c_no_order>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  export default{
      data(){
          return{

          }
      },
      computed:{
        ...mapGetters([
            'order_type5',
        ])
      },
      methods:{

      }
  }
</script>
<style scoped lang="scss">
.header_fixed{
  width: 100%;
}
</style>
