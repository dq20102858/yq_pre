<template>
<div class="home-pages">
  <div class="welcome">
  <img src="/static/welcome.png" />
  </div>
  <div class="dashboard-container">
    <div class="box-logo"><img src="/static/logo.png" /></div>
    <div class="box-list">
      <div class="list">
      <div class="titles">
        <span>今日数据统计</span>
      </div>
      <div class="item">在家隔离：<span>{{data.jia_num}}</span>人</div>
      <div class="item">重点监督：<span>{{data.supervise_num}}</span>人</div>
      <div class="item">外出：<span>{{data.out_num}}</span>人</div>
      <div class="item">发烧：<span>{{data.fs_num}}</span>人</div>
    </div>
    </div>
      <div class="box-desc">
      <div class="item">抗击疫病</div>
      <div class="item">人人有责</div>
      <div class="item">主动隔离</div>
      <div class="item">从我做起</div>
    </div>
    <div class="box-copy">技术支持:无锡电信</div>
  </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
      data:{
        jia_num:0,
        supervise_num:0,
        fs_num:0,
        out_num:0
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.countNums();
  },
  methods:{
    countNums(){
            this.request({
                url: '/users/countNums',
                method: 'get',
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    this.data = data.data;
                }
            })

        },
  }
}
</script>

<style>
.home-pages{position:relative;background:#eef7fd url('/static/bg-line.png') repeat-y ;height: 100vh;}
.welcome{position: absolute;right: 200px;top:60px;}

.box-logo{padding-top: 30px;}
.box-logo img{float: right;height: 24px; margin-right:40px;}
.box-list{  padding:20px 60px 60px 80px;}
.box-list .list{margin-top: 30px;background: #eff7fd;border: 1px #8fc1df solid;width:320px;border-radius: 3px;padding: 30px 30px 20px 30px;}
.box-list .titles{font-size: 24px;color:#157bb7;font-weight: 700;margin-bottom: 15px;}
.box-list .item{line-height: 31px}
.box-list .item span{color:#157bb7;font-weight: 700}
.box-desc{margin: 60px 60px 0 80px;width: 320px; display: flex;justify-content: space-between;flex-flow: wrap-reverse}
.box-desc .item {background: #157bb7;color: #fff;border-radius: 3px;padding: 10px 42px; margin-bottom:20px}
.box-copy{text-align: right;color: #383737;font-size: 12px;margin-right: 40px;}
</style>