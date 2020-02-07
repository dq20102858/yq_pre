<template>
  <div id="detail">
    <div class="user-card left">
        <el-card>
            <div slot="header" class="clearfix">
                <span>个人基本信息</span>
            </div>
            <div>姓名：{{detail.name}}</div>
            <div>电话：{{detail.phone}}</div>
            <div>住址：{{detail.address}}</div>
            <div>出行日期：{{detail.travel_time}}</div>
            <div>出行车次/航班：{{detail.travel_no}}</div>
            <div>返回日期：{{detail.back_time}}</div>
            <div>返回车次/航班：{{detail.back_no}}</div>
            <div>出行地区：{{detail.travel_area}}{{detail.travel_address}}</div>
            <div>措施：{{detail.measure}}</div>
            <div>体征：{{detail.symptom}}</div>
        </el-card>
        <el-calendar class="user-calendar">
            <template
                slot="dateCell"
                slot-scope="{date, data}">
                <p :class="data.isSelected ? 'is-selected' : ''"  @click="getNewLogs(data.day)">
                    {{ data.day.split('-').slice(2).join('-') }}
                </p>
            </template>
        </el-calendar>
    </div>
    <div class="right">
        <el-card class="record-card">
            <div slot="header" class="clearfix">
                <span>打卡记录</span>
            </div>
            <el-timeline>
                <el-timeline-item
                v-for="(log, index) in logLists"
                :key="index"
                :timestamp="log.create_time">
                {{log.address}}
                </el-timeline-item>
            </el-timeline>
            <div class="pagination">
                <el-pagination v-if="logLists.length !== 0" background layout="prev, pager, next" :page-size="this.per_page" :current-page="this.logPage" :total="this.logTotal"  @current-change="logPageChange"></el-pagination>
            </div>
        </el-card>
        <el-card class="record-card">
            <div slot="header" class="clearfix">
                <span>异常打卡记录</span>
            </div>
            <el-timeline>
                <el-timeline-item
                v-for="(log, index) in errorLogLists"
                :key="index"
                :timestamp="log.create_time">
                {{log.address}}
                </el-timeline-item>
            </el-timeline>
            <div class="pagination">
                <el-pagination v-if="errorLogLists.length !== 0" background layout="prev, pager, next" :page-size="this.per_page" :current-page="this.errorLogPage" :total="this.errorLogTotal"  @current-change="logPageChange"></el-pagination>
            </div>
        </el-card> 
    </div>  
  </div>
</template>
<script>
export default {
    data() {
        return { 
            logLists:[],
            logPage:1,
            logTotal:0,
            errorLogLists:[],
            errorLogPage:1,
            errorLogTotal:0,
            user_id:this.$route.query.id,
            detail:{},
            date:new Date().toString(),
            per_page:20,
        }

    },
    created() {
        this.getDetail();
        this.getLogLists(1);
        this.getLogLists(0);
    },
    methods:{
        getDetail(){
            let id = this.user_id
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
        logPageChange(value){
            this.usersPage = value;
            this.getLogLists();
        },
        getLogLists(is_error){
            let page = this.logPage;
            let user_id = this.user_id;
            let date = this.date;
            this.request({
                url: '/users/getLogLists',
                method: 'get',
                params:{page,user_id,date,is_error}
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    if(is_error == 1){
                        this.errorLogLists = data.data.data;
                        this.errorLogPage = parseInt(data.data.current_page);
                        this.errorLogTotal = parseInt(data.data.total);
                        this.per_page = parseInt(data.data.per_page);
                    }else{
                        this.logLists = data.data.data;
                        this.logPage = parseInt(data.data.current_page);
                        this.logTotal = parseInt(data.data.total);
                        this.per_page = parseInt(data.data.per_page);
                    }                   
                }
            })

        },
        getNewLogs(date){
            this.date = date;
            this.getLogLists(1);
            this.getLogLists(0);
        }
    }
}
</script>
<style>
*{
    margin: 0;
    padding: 0
}
.left , .right{
    float:left
}
.user-calendar{
    height:140px;
}
.user-card{
    width:186pt;
    float:left;
}
.record-card{
    width:279.5pt;
    float:left;
}
#detail .el-calendar-table .el-calendar-day {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px;
    height: 0 !important; 
    padding-bottom: 100% !important;
}
.is-selected {
    color: #1989FA;
  }
</style>