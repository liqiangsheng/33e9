<template>
  <div class="equipment_price">
    <div>
      <C_header left_show="true" center_text="配件价格表"></C_header>
    </div>
    <div class="equipment_price_list">
        <div v-for="(item,index) in equipmentList" class="lis" :class="{'active':activeNum==index}" @click="equipmentListClick(index)">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default{
    data(){
        return{
          equipmentList:['家电清洗','家电维修','手机维修','家居维修','开锁维修','管道维修','电脑维修','卫浴洁具','智能设备'], //
          activeNum:-1, //让active做class
        }
    },
    components:{

    },
    methods:{
      equipmentListClick(index){
          let _this=this;
          this.activeNum=index;
          console.log("点谁跳转谁",index);
          let ids='00'+(index+1);
          let serveCityIds=this.$store.getters.login.cityId;
        console.log(serveCityIds);
//          let equipmentPriceIframeSrc_data=`http://wechat.test.dingdingkuaixiu.com/#/wash1?id=${ids}&serveCityId=${serveCityIds}`;
          let equipmentPriceIframeSrc_data=`${this.$ALL.equipmentPrice_iframe}/#/wash1?id=${ids}&serveCityId=${serveCityIds}`;

        this.$store.dispatch('equipmentPriceIframeSrc',equipmentPriceIframeSrc_data);

//        alert('此需求有待商议，因为是单页面，这样跳转。。。');
//        return false
//        window.location.href=equipmentPriceIframeSrc_data;

//        window.location.href='http://wechat.test.dingdingkuaixiu.com/#/wash1?id=002&serveCityId=0101'

        setTimeout(function () {
          _this.$router.push({name:'equipmentPriceIframe'});
        },800);
      }
    }
}
</script>
<style scoped>
.equipment_price{
  background-color:#ECECEC;
}
.equipment_price_list{
  background-color: #fff;
}
.equipment_price_list .lis{
  padding-left: .2rem;
  height: .9rem;
  line-height: .9rem;
}

.active{
  background-color:#2F80ED;
  color: #fff;
}
</style>
