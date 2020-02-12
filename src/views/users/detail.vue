<template>
  <div id="detail">
<el-row  :gutter="30">
  <el-col :xs="24" :sm="8" :md="8" :lg="8">
        <el-card class="user-info">
            <div slot="header" class="titles">
                <span>个人基本信息</span>
            </div>
            <div class="item">姓名：<span>{{detail.name}}</span></div>
            <div class="item">电话：<span>{{detail.phone}}</span></div>
            <div class="item">住址：<span>{{detail.address}}</span></div>
            <div class="item">出行日期：<span>{{detail.travel_time}}</span></div>
            <div class="item">出行车次/航班：<span>{{detail.travel_no}}</span></div>
            <div class="item">返回日期：<span>{{detail.back_time}}</span></div>
            <div class="item">返回车次/航班：<span>{{detail.back_no}}</span></div>
            <div class="item">出行地区：<span>{{detail.travel_area}}{{detail.travel_address}}</span></div>
            <div class="item">措施：<span>{{detail.measure}}</span></div>
            <div class="item">体征：<span>{{detail.symptom}}</span></div>
        </el-card>
       <el-card class="calendar">
         <div slot="header" class="titles">
                <span>点击日期查询</span>
            </div>
        <el-calendar class="user-calendar">
            <template
                slot="dateCell"
                slot-scope="{date, data}">
                <p :class="data.isSelected ? 'is-selected' : ''"  @click="getNewLogs(data.day)">
                    {{ data.day.split('-').slice(2).join('-') }}
                </p>
            </template>
        </el-calendar>
         </el-card>
   </el-col>
  <el-col :xs="24" :sm="8" :md="8" :lg="8">
         <el-card class="record-card">
             <div slot="header" class="titled">
                <span>打卡记录</span>
            </div>
            <el-timeline class="log-timeline">
                <el-timeline-item
                v-for="(log, index) in logLists"
                :key="index"
                :timestamp="log.create_time">
                <img :src="log.file" class="log-image" />
                {{log.address}}
                </el-timeline-item>
            </el-timeline>
            <div class="pagination">
                <el-pagination v-if="logLists.length !== 0" background layout="prev, pager, next" :page-size="this.per_page" :current-page="this.logPage" :total="this.logTotal"  @current-change="logPageChange"></el-pagination>
            </div>
            <div class="nodata" v-if="logLists.length== 0">
                <p>暂无打卡记录</p>
            </div>
        </el-card>
     </el-col>
  <el-col :xs="24" :sm="8" :md="8" :lg="8">
        <el-card class="record-card">
            <div slot="header" class="titled">
                <span class="tit" style="color:#E34F10">异常打卡记录</span>
            </div>
            <el-timeline class="log-timeline">
                <el-timeline-item
                v-for="(log, index) in errorLogLists"
                :key="index"
                :timestamp="log.create_time">
                <img :src="log.file" class="log-image" />
                {{log.address}}
                </el-timeline-item>
            </el-timeline>
            <div class="pagination">
                <el-pagination v-if="errorLogLists.length !== 0" background layout="prev, pager, next" :page-size="this.per_page" :current-page="this.errorLogPage" :total="this.errorLogTotal"  @current-change="errorLogPageChange"></el-pagination>
            </div>
            <div class="nodata" v-if="errorLogLists.length== 0">
                <p>暂无打卡记录</p>
            </div>
        </el-card></el-col>
</el-row>
 <div class="log-btn">
            <el-button type="primary" @click="goBack">返回</el-button> 
            <el-button type="primary" @click="exportExcel">导出</el-button> 
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
            date:new Date().toLocaleDateString().replace(/\//g,'-'),
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
            this.logPage = value;
            this.getLogLists(0);
        },
        errorLogPageChange(value){
            this.errorLogPage = value;
            this.getLogLists(1);
        },
        getLogLists(is_error){
            let page = this.logPage;
            if(is_error==1){
                page = this.errorLogPage;
            }           
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
        },
        goBack(){
            this.$router.push({path:"/users"});
        },
        exportExcel(){
            let url = "/users/exportLogs?user_id="+this.user_id;
            window.location.href = url;
        },
    }
}
</script>
<style scope>
#detail{background: #e7eeff;height: 100%;padding: 30px;}
.titles{text-align: center;font-size: 15px;color: #fff;padding: 15px 0;font-weight: 700}
.titled{ font-size: 15px;color: #fff;padding: 15px 0 15px 25px;font-weight: 700}
.el-card{margin-bottom: 30px;}
.el-card__header{padding:0;background: #157bb7;}
.user-info{min-height: 490px;}
.record-card{min-height: 490px;}
.user-info .item{line-height: 33px;}
.user-info .item span{color:#1D397A}

.calendar .el-card__body{padding: 0;}
.el-calendar-table .el-calendar-day{height: auto;padding:0;}
.el-calendar-table .el-calendar-day p{padding: 8px; -webkit-box-sizing: border-box;box-sizing: border-box;  text-align: center;}
.is-selected {color: #1989FA;}
.log-timeline{position:relative;}
.log-image{position:absolute;width: 55px; height: 45px; left: 0; border-radius: 3px;top:3px}
.el-timeline-item__node--normal{left: 65px;}
.el-timeline-item__tail { left: 70px;}
.el-timeline-item__wrapper {padding-left: 85px;}
.log-btn{position: relative;text-align:right; margin:30px;}
.pagination{margin: 0 auto;text-align: center}
.nodata{text-align: center;color: #999;font-size: 16px;line-height: 360px;}
</style>