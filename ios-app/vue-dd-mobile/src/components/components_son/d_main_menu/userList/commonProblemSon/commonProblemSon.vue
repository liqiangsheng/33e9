<template>
  <div>
      <div>
        <C_header left_show="true" center_text="常见问题"></C_header>
      </div>
      <div class="main" v-if="ranking_show == '1'">
          <div class="main_title">
            <h3>一、收费标准</h3>
          </div>
          <div class="main_one">
            <h4>一、维修服务费是否叠加收费？</h4>
            <p>
              ①对于不同家电的维修，服务费进行叠加收取（例如：用户下单-空调不制冷和电视无图像，则分别收取修理空调的服务费+配件费和修理电视的服务费+配件费)。
            </p>
            <p>
              ②对于同一个家电出现不同故障，则服务费不需叠加收取。（例如：洗衣机需更换进水管＋电机，则只收取一个服务费，以最高的大修为准，并收取相对应的进水管和电机配件费）
            </p>
          </div>
          <div class="main_one">
            <h4>二、师傅正常上门服务了，客户违约说不需要服务了怎么办？</h4>
            <p>
              ①因客户已提前支付30元上门费，客户违约则不退回已支付的上门费金额，公司正常以上门费的结算标准跟师傅结算。
            </p>
          </div>
      </div>
      <div class="main" v-if="ranking_show == '2'">
          <div class="main_title">
            <h3>二、高空问题</h3>
          </div>
          <div class="main_one">
            <h4>一、高空问题？</h4>
            <p>
              ①同台机器多次高空的，如遗留单的情况，需要重复收费吗？如不重复，那几次高空不同的支援师傅要怎麽算钱？例：一个维修单第一次上门检查（出高空）发现其中问题，但是需要更换配件，现配件不足需要等待采购配件后再上门（成为遗留单），第二次配件到后，上门更换配件（出高空）。
            </p>
            <p>
              ②高空费只允许收一次，如遇检查及二次上门维修，费用应当平均分配，总高空费/人数。
            </p>
          </div>
          <div class="main_one">
            <h4>二、经常有出现3楼高空，仍然需要师傅支援的，这种情况收不收取高空费？</h4>
            <p>
              ①本身高空作业费是没有统一标准的，具有争议性，地区不同，（例如上海是没有这项收费的）参照京东，海尔和格力同等行业，低于并包含3楼是没有收取高空费这一项，如果有遇此问题，应该是同事之间相互协助完成。
            </p>
          </div>
          <div class="main_one">
            <h4>三、检测需要出高空，但是检测完了，客户不修了，是否需要收取高空费和检测费？</h4>
            <p>
              ①上门后，检测为外机问题，涉及要出外墙高空检测的，应当提前告知客户，（外机有很多不确定因素，比如外机压缩机等故障，维修成本比较高，如果检测完您考虑不修的，由于我们付出的劳动成本和外出风险是存在的，所以高空费还是需要您支付的，等待客户考虑好，在出去检查。）
            </p>
            <p>
              ②检测需要出高空，但是检测完了，客户不修了。出高空检测的需要收高空作业费100，未出高空的需要收取30元上门费，此费用不叠加。
            </p>
          </div>
      </div>
      <div class="main"  v-if="ranking_show == '3'">
          <div class="main_title">
            <h3>三、配件问题</h3>
          </div>
          <div class="main_one">
            <h4>一、维修过程中缺少配件怎么办？</h4>
            <p>
              ①若是常用配件，跟客户说明后可到公司签约配件网点拿取配件后二次上门，工单状态异常报备给客服知晓。若是罕见配件，同样异常报备给客服知晓，公司负责统一采购，到货后来公司领取配件二次上门服务。
            </p>
          </div>
          <div class="main_one">
            <h4>二、罕见稀有非常用配件如何报价？</h4>
            <p>
              ①需用配件公司配件库里无记录，可结合市场常规价跟用户报价，若用户同意可在APP里添加该配件名称和价格，并异常报备告知客服。
            </p>
          </div>
      </div>
      <div class="main"  v-if="ranking_show == '4'">
          <div class="main_title">
            <h3>四、质保期</h3>
          </div>
          <div class="main_one">
            <h4>一、公司维修的质保期是多久？</h4>
            <p>
              ①维修质保期3个月，从订单结束客户完成付款后开始算起。
            </p>
            <p>
              ②对于同一个家电出现不同故障，则服务费不需叠加收取。（例如：洗衣机需更换进水管＋电机，则只收取一个服务费，以最高的大修为准，并收取相对应的进水管和电机配件费）
            </p>
          </div>
          <div class="main_one">
            <h4>二、师傅正常上门服务了，客户违约说不需要服务了怎么办？</h4>
            <p>
              ①因客户已提前支付30元上门费，客户违约则不退回已支付的上门费金额，公司正常以上门费的结算标准跟师傅结算。
            </p>
          </div>
      </div>
  </div>
</template>
<script>
  export default{
      data(){
          return{
            ranking_show:'',
          }
      },
      created(){
          let _this=this;
          if(_this.$route.params.ranking){ //1.收费标准 2.高空费 3.配件问题 4.质保期
            _this.ranking_show=_this.$route.params.ranking;
          }
      },
      methods:{

      }
  }
</script>
<style lang="scss" scoped>
  .main{
    padding: 0 .2rem;

    .main_title{
      height: .7rem;
      line-height: .7rem;
      margin-top: .2rem;
    }
    .main_one{
      margin-top: .3rem;

      h3{
        /*height:.8rem;*/
        line-height: .8rem;
      }
      p{
        text-indent:.2rem;
        line-height: .5rem;
        font-size:.3rem;
      }
      p:nth-of-type(1){
        padding-top: .12rem;
      }
    }
  }
</style>
