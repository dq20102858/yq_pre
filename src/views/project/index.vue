<template>
  <div id="project">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">添加作业</el-menu-item>
      <el-menu-item index="2">计划日程</el-menu-item >
      <el-menu-item index="3">详情列表</el-menu-item>
      <el-menu-item index="4">图表数据</el-menu-item>
    </el-menu>
    <div id="company" v-show="workShow">
      <el-button type="primary" @click="openAddWork">添加作业</el-button>
      <el-table :data="workLists"  ref="multipleTable" >
          <el-table-column  prop="sort" label="作业顺序" align="center" ></el-table-column>
          <el-table-column prop="name" label="作业名称" align="center" ></el-table-column>
          <el-table-column prop="start_time" label="计划开始时间" align="center" ></el-table-column>
          <el-table-column prop="end_time" label="计划结束时间" align="center" ></el-table-column>
          <el-table-column prop="total" label="设计总量" align="center" ></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button size="mini" @click="getLine(scope.row.id)">查看线别</el-button>
                  <el-button size="mini" @click="goDetail(scope.row.id)">修改</el-button>
                  <el-button size="mini" type="danger" @click="deleteWork(scope.row.id)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
      <div class="pagination">
          <el-pagination v-if="workLists.length !== 0" background layout="prev, pager, next" :current-page="this.workPage" :total="this.workTotal"  @current-change="workPageChange"></el-pagination>
      </div>
      <el-dialog :title=this.title :visible.sync="workVisible">
        <el-form :model="workData" :rules="wokRules"  ref="workForm">
            <el-form-item label="名称" label-width="80px" prop="name">
              <el-input v-model="workData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别" label-width="80px" prop="type">
                <el-radio v-model="workData.type" :label="1">里程</el-radio>
                <el-radio v-model="workData.type" :label="2">计数（个，股，孔）</el-radio>
            </el-form-item>
            <el-form-item label="顺序" label-width="80px">
              <el-input v-model="workData.sort" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="线别" label-width="80px" prop="line_type">
              <el-checkbox-group v-model="workData.line_type">
                <el-checkbox label="1">左线</el-checkbox>
                <el-checkbox label="2">右线</el-checkbox>
                <el-checkbox label="3">入场线</el-checkbox>
                <el-checkbox label="4">出场线</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
            <el-form-item label="计划开始时间" label-width="80px" prop="start_time">
                 <el-date-picker  v-model="workData.start_time" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="计划结束时间" label-width="80px" prop="end_time">
                <el-date-picker  v-model="workData.end_time" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrEditDo()">确 定</el-button>
          </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                workShow:true,
                workLists:[],
                workPage:1,
                workTotal:0,
                workVisible:false,
                workData:{
                    line_type:[]
                },
                title :"添加作业信息",
                wokRules:{
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择类别', trigger: 'change' },
                    ],
                    line_type: [
                        { required: true, message: '请选择线别', trigger: 'change' },
                    ],
                    start_time: [
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    end_time: [
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                },

            }
        },
        created() {
            this.getWorkLists();
        },
        methods: {
            handleSelect(key, keyPath) {
         
                if(key==1){
                    
                }else if(key==2){
                    
                }else if(key==3){
                    
                }else{
                    
                }
            },
            initWorkData(){
                this.workData= {
                    line_type:[]
                }
            },
            workPageChange(value){
                this.workPage = value;
            },
            openAddWork(){
                this.title="添加作业信息";
                this.workVisible = true;
                this.initWorkData();
            },
            getWorkLists(){
                let page = this.workPage;
                this.request({
                    url: '/project/getWorkLists',
                    method: 'get',
                    params:{page}
                }).then(response => {
                    let data = response.data;
                    if(data.status == 1){
                        this.workLists = data.data.data;
                        this.workPage = parseInt(data.data.current_page);
                        this.workTotal = parseInt(data.data.total);
                    }
                })
            },
            addOrEditDo(){
                this.$refs["workForm"].validate((valid) => {
                    if (valid) {
                        let data = this.workData;
                        this.request({
                            url: '/project/addOrEditWork',
                            method: 'post',
                            data
                        }).then(response => {
                            var data = response.data;
                            if(data.status == 1){
                                this.workVisible = false;
                                this.getWorkLists();
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            goDetail(id){
                this.title="修改作业信息";
                this.workVisible = true;
                this.request({
                    url: '/project/getWorkDetail',
                    method: 'get',
                    params:{ id }
                }).then(response => {
                    let data = response.data;
                    if(data.status == 1){
                        this.workData = data.data
                    }
                })

            },
            deleteWork(id){
                let data = {
                    id : id
                };
                this.request({
                    url: '/project/deleteWork',
                    method: 'post',
                    data
                }).then(response => {
                    let data = response.data;
                    if(data.status == 1){
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getWorkLists();
                    }else{
                        this.$message({
                            showClose: true,
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                })
            }

        }
    }
</script>
<style>

</style>