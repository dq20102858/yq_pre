<template>
  <div class="dashboard-container">
    
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
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {

  },
  
  methods:{
    
  }
}
</script>
<style>
  .date{
    text-align: center;
    /* line-height: 80px; */
    font-size: 30px;
    color: #72acce;
  }
  .calendar-wapper{
    position: relative;
  }
  .calendar-operate{
    position: absolute;
    top: -40px;
    font-size: 10px;
    cursor: pointer;
  }
  .add{
    right: 34px;
    color: red;
  }
  .detail{
    right: 0px;
    color: #72acce;
  }
  .calendar-show{
    position: absolute;
    font-size: 10px;
    left: -5px;
  }
  .plan-finished{
    top: -30px;
  }
  .act-finished{
    top: 0px;
  }
  .remark{
    top: 30px;
  }
  .el-calendar-table td{
    height: 100px !important;
  }
</style>
