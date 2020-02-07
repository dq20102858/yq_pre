<template>
  <div class="dashboard-container">
    <el-card class="box-card" style="width:285pt;">
      <div slot="header" class="clearfix">
        <span>今日数据统计</span>
      </div>
      <div>在家隔离：{{data.jia_num}}人</div>
      <div>重点监督：{{data.supervise_num}}人</div>
      <div>外出：{{data.out_num}}人</div>
      <div>发烧：{{data.fs_num}}人</div>
    </el-card>
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

</style>
