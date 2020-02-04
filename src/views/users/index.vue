<template>
  <div id="users">
    <el-form :model="searchForm" :inline="true" class="demo-form-inline" size="small" style="padding:10px;float:left">      
        <el-form-item>
            <el-date-picker v-model="searchForm.time_range" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" class="" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-button size="small" icon="el-icon-search" type="primary" @click="getUsersLists">检索</el-button>
    </el-form>
    <el-table :data="usersLists" style="width: 100%">
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="phone" label="联系方式" "></el-table-column> 
      <el-table-column prop="company" label="公司" ></el-table-column>   
      <el-table-column prop="street" label="街道" ></el-table-column>   
      <el-table-column prop="back_time" label="返回时间" ></el-table-column> 
      <el-table-column prop="cancel_time" label="取消时间" ></el-table-column> 
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button size="mini" @click="openDialog(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>        
    </el-table>
    <div class="pagination">
        <el-pagination v-if="usersLists.length !== 0" background layout="prev, pager, next" :current-page="this.usersPage" :total="this.usersTotal"  @current-change="usersPageChange"></el-pagination>
    </div>
    <el-dialog title="用户详情" :visible.sync="isVisible">
        <ul id="dialog-ul"> 
            <li>
                <div class="dialog-line">
                    <span>姓名：</span>
                    <span>{{detail.name}}</span>
                </div>
                <div class="dialog-line">
                    <span>联系电话：</span>
                    <span>{{detail.phone}}</span>
                </div>
            </li>
            <li>
                <div class="dialog-line">
                    <span>公司：</span>
                    <span>{{detail.company}}</span>
                </div>
                <div class="dialog-line">
                    <span>街道：</span>
                    <span>{{detail.street}}</span>
                </div>
            </li>
            <li>
                <div class="dialog-line"> 
                    <span>隔离地址：</span>
                    <span>{{detail.address}}</span>
                </div>
                <div class="dialog-line"> 
                    <span>隔离理由：</span>
                    <span>{{detail.reason}}</span>
                </div>
            </li>
            <li>
                <div class="dialog-line">
                    <span>返锡时间：</span>
                    <span>{{detail.back_time}}</span>
                </div>
                <div class="dialog-line">
                    <span>取消隔离时间：</span>
                    <span>{{detail.cancel_time}}</span>
                </div>
            </li>
            <li>
                <div class="dialog-line">
                    <span>春节活动：</span>
                    <span>{{detail.activity}}</span>
                </div>
                <div class="dialog-line">
                    <span>隔离级别</span>
                    <span>{{detail.level}}</span>
                </div>
            </li>
            <p class="clear"></p>
        </ul>
        <el-divider></el-divider>
        <el-table :data="logLists" style="width: 100%">
            <el-table-column prop="create_time" label="打卡时间" ></el-table-column>
            <el-table-column prop="address" label="打卡地点"></el-table-column> 
            <el-table-column label="证明图片" >
                <template slot-scope="scope">
                    <div v-for="(item,key) in scope.row.file"><img v-bind:src="item"/></div>
                </template>
            </el-table-column>   
        </el-table>
        <div class="pagination">
        <el-pagination v-if="logLists.length !== 0" background layout="prev, pager, next" :current-page="this.logPage" :total="this.logTotal"  @current-change="logPageChange"></el-pagination>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import { publicData } from "@/utils/common";
export default {
    data() {
        return {
            usersPage:1,
            usersLists:[],
            usersTotal:0,
            detail:{},
            isVisible:false,
            logLists:[],
            logPage:1,
            logTotal:0,
            user_id:0,
            searchForm:{},
            pickerOptions2: publicData.pickerOptions2,


        }
    },
    created() {
        this.getUsersLists()
    },
    methods: {
        getUsersLists(){
            let page = this.usersPage;
            let time_range = this.searchForm.time_range;
            this.request({
                url: '/users/getUserPages',
                method: 'get',
                params:{page,time_range}
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    this.usersLists = data.data.data;
                    this.usersPage = parseInt(data.data.current_page);
                    this.usersTotal = parseInt(data.data.total);
                }
            })
        },
        openDialog(id){
            this.isVisible = true;
            this.getDetail(id);
            this.user_id = id;
            this.getLogLists();
        },
        getDetail(id){
            this.request({
                url: '/users/getDetail',
                method: 'get',
                params:{id}
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    this.detail = data.data;
                }
            })

        },
        usersPageChange(value){
            this.usersPage = value;
            this.getUsersLists();

        },
        logPageChange(value){
            this.usersPage = value;
            this.getLogLists();
        },
        getLogLists(){
            let page = this.logPage;
            let user_id = this.user_id;
            this.request({
                url: '/users/getLogLists',
                method: 'get',
                params:{page,user_id}
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    this.logLists = data.data.data;
                    this.logPage = parseInt(data.data.current_page);
                    this.logTotal = parseInt(data.data.total);
                }
            })

        },
        

    }
}
</script>
<style>
*{
    margin: 0;
    padding: 0
}
.dialog-line{
    padding:5px 10px;

}
#dialog-ul{
    list-style:none;
}
#dialog-ul li .dialog-line{
    float:left;
    width:50%;
}
.dialog-line span{
    display:inline-block;
}
.clear{
    clear:both;
}
</style>