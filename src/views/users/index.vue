<template>
  <div id="users">
    <el-form :model="searchForm" :inline="true" class="demo-form-inline" size="small" style="padding:10px;float:left">      
        <el-form-item>
            <el-input v-model="searchForm.keyword" placeholder="请输入想要搜索的内容"></el-input>
        </el-form-item>
        <el-form-item>  
            <el-select v-model="searchForm.area" placeholder="请选择区" @change="getAreaLists" clearable>
                <el-option
                v-for="item in areaLists"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>  
            <el-select v-model="searchForm.street" placeholder="请选择街道" clearable>
                <el-option
                v-for="item in streetLists"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-date-picker v-model="searchForm.time_range" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" class="" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-button size="small" icon="el-icon-search" type="primary" @click="getUsersLists">检索</el-button>
    </el-form>
    <el-table :data="usersLists" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="ID" ></el-table-column>
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="phone" label="电话" "></el-table-column> 
      <el-table-column prop="address" label="地址" ></el-table-column>  
      <el-table-column prop="travel_time" label="出行日期" ></el-table-column>
      <el-table-column prop="traffic_no" label="出行车次/航班" ></el-table-column>
      <el-table-column prop="back_time" label="返回日期" ></el-table-column> 
      <el-table-column prop="back_no" label="返回车次/航班" ></el-table-column>   
      <el-table-column prop="travel_address" label="出行地区" ></el-table-column> 
      <el-table-column label="措施" >
        <template slot-scope="scope">
            <el-select v-model="scope.row.measure" @change="updateData(scope.row.id,scope.row.measure,'measure')">
                <el-option
                v-for="item in mearsureLists"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </template>
      </el-table-column>  
      <el-table-column label="体征" >
        <template slot-scope="scope">
            <el-select v-model="scope.row.symptom" @change="updateData(scope.row.id,scope.row.symptom,'symptom')">
                <el-option
                v-for="item in symptomLists"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </template>    
      </el-table-column>  
      <el-table-column prop="supervise" label="监督" >
        <template slot-scope="scope">
            <el-select v-model="scope.row.supervise" @change="updateData(scope.row.id,scope.row.supervise,'supervise')">
                <el-option key="1" label="是" value="1"></el-option>
                <el-option key="0" label="否" value="0"></el-option>
            </el-select>
        </template>  
      </el-table-column> 
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button size="mini" @click="goDetail(scope.row.id)">更多</el-button>
        </template>
      </el-table-column>        
    </el-table>
    <div>
        <el-button type="primary" class="button-line" @click="exportSelected">选中导出</el-button>
        <el-button type="primary" class="button-line" @click="exportAll">全部导出</el-button>
        <div class="pagination button-line">
          <el-pagination v-if="usersLists.length !== 0" background layout="prev, pager, next" :page-size="this.per_page" :current-page="this.usersPage"  :total="this.usersTotal"  @current-change="usersPageChange"></el-pagination>
        </div>
    </div>
    
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
            per_page:20,
            detail:{},
            isVisible:false,          
            searchForm:{
                time_range:[],
                area:"",
                street:"",
                keyword:""
            },
            pickerOptions2: publicData.pickerOptions2,
            areaLists:[],
            streetLists:[],
            mearsureLists:[],
            symptomLists:[],
            multipleSelection:[],
        }
    },
    created() {
        this.getUsersLists();
        this.getAreaLists();
        this.getMearsureLists();
        this.getSymptomLists();
    },
    methods: {
        getUsersLists(){
            let page = this.usersPage;
            let time_range = this.searchForm.time_range;
            let area = this.searchForm.area;
            let street = this.searchForm.street;
            let keyword  = this.searchForm.keyword;
            this.request({
                url: '/users/getUserPages',
                method: 'get',
                params:{page,time_range,area,street,keyword}
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    this.usersLists = data.data.data;
                    this.usersPage = parseInt(data.data.current_page);
                    this.usersTotal = data.data.total;
                    this.per_page = data.data.per_page;
                }
            })
        },
        
        usersPageChange(value){
            this.usersPage = value;
            this.getUsersLists();

        },
        
        getAreaLists(){
            let  pid = 0;
            if(typeof(this.searchForm.area) !== "undefined"){
                pid = this.searchForm.area;
            }           
            this.request({
                url: '/users/getAreaLists',
                method: 'get',
                params:{pid}
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    if(pid == 0){
                        this.areaLists = data.data;
                        this.streetLists = [];
                    }else{
                        this.streetLists = data.data;
                    }
                }
            })

        },
        getMearsureLists(){
            this.request({
                url: '/users/getMearsureLists',
                method: 'get',
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    this.mearsureLists = data.data;
                }
            })

        },
        getSymptomLists(){
            this.request({
                url: '/users/getSymptomLists',
                method: 'get',
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    this.symptomLists = data.data;
                }
            })

        },
        updateData(id,value,field){
            let data = {
                id:id,
                field:field,
                value:value
            };
            this.request({
                url: '/users/updateData',
                method: 'post',
                data
            }).then(response => {
                let data = response.data;
                if(data.status == 1){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: '修改失败',
                        type: 'warning'
                    });
                }
                
            })

        },
        goDetail(id){
            this.$router.push({path:"/detail",query:{id:id}});
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        exportSelected(){
            let selected = [];
            this.multipleSelection.forEach(function(item){
                selected.push(item.id);
            })
            let ids = "";
            if(selected.length>0){
                ids = selected.join();
            }else{
                return false;
            }
            let url = "/users/exportExcel?ids="+ids+"&flag=2";
            window.location.href = url;
        },
        exportAll(){
            let time_range = this.searchForm.time_range;
            let area = this.searchForm.area;
            let street = this.searchForm.street;
            let keyword  = this.searchForm.keyword;
            if(this.usersLists.length>0){
                let url = "/users/exportExcel?area="+this.searchForm["area"]+"&street="+this.searchForm['street']+"&keyword="+this.searchForm['keyword'];
                if(this.searchForm.time_range.length>0){
                    url = url + "&create_time[]=" +this.searchForm['time_range'][0]+"&create_time[]="+this.searchForm['time_range'][1];
                }
                url = url+"&flag=1"   
                window.location.href = url;          
            }
        }

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
.button-line{
    float:left;
    margin-top:20px;
    margin-left:5px;
}
.pagination{
    float:right;
}
</style>