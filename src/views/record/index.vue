<template>
  <div id="users">
    <el-form :model="searchForm" :inline="true" class="demo-form-inline" size="small" style="padding:10px;float:left">      
        <el-form-item>
            <el-date-picker v-model="searchForm.time_range" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" class="" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-button size="small" icon="el-icon-search" type="primary" @click="getLogLists">检索</el-button>
    </el-form>
    <el-button type="warning" style="margin:7px;" @click="exportExcel">导出</el-button>
    <el-table :data="logLists" style="width: 100%">
      <el-table-column prop="user_name" label="姓名" ></el-table-column>
      <el-table-column prop="create_time" label="打卡时间" "></el-table-column> 
      <el-table-column prop="company" label="公司" ></el-table-column>   
      <el-table-column prop="street" label="街道" ></el-table-column>   
      <el-table-column prop="address" label="打卡地点" ></el-table-column> 
      </el-table-column>        
    </el-table>
    <div class="pagination">
        <el-pagination v-if="logLists.length !== 0" background layout="prev, pager, next" :current-page="this.logPage" :total="this.logTotal"  @current-change="logPageChange"></el-pagination>
    </div>
  </div>
</template>
<script>
import { publicData } from "@/utils/common";
export default {
    data() {
        return {       
            logLists:[],
            logPage:1,
            logTotal:0,
            searchForm:{
                time_range:[]
            },
            pickerOptions2: publicData.pickerOptions2,
        }
    },
    created() {
        this.getLogLists()
    },
    methods: {

        logPageChange(value){
            this.usersPage = value;
            this.getLogLists();
        },
        getLogLists(){
            let page = this.logPage;
            let time_range = this.searchForm.time_range;
            this.request({
                url: '/users/getLogLists',
                method: 'get',
                params:{page,time_range}
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    this.logLists = data.data.data;
                    this.logPage = parseInt(data.data.current_page);
                    this.logTotal = parseInt(data.data.total);
                }
            })

        },
        exportExcel(){
            let url = "http://yq.nething.com/user/exportExcel";
            if(this.searchForm.time_range.length>1){
                url = url+"?time_range[]="+this.searchForm["time_range"][0]+"&time_range[]="+this.searchForm["time_range"][1];   
            }
            window.location.href = url;
        }

    }
}
</script>
<style>
*{
    margin: 0;
    padding: 0
}

</style>