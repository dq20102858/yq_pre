<template>
  <div class="dashboard-container">
    <video id="myVideo" class="video-js" ref="myVideo">
      <!-- <source src="../../../static/7efaf904a76f6050251da6d38980600c.mp4" type="video/mp4" > -->
      <source src="rtmp://10.100.100.11:1935/live/" type="rtmp/flv" />
    </video>

    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <div class="calendar-wapper">
          <p class="date">{{ data.day.split('-').slice(2).join('-') }}</p>
          <p class="calendar-operate add">添加</p>
          <p class="calendar-operate detail">详情</p>
          <p class="calendar-show plan-finished">计划完成：</p>
          <p class="calendar-show act-finished">实际完成：</p>
          <p class="calendar-show remark">备注：</p>
        </div>

      </template>
    </el-calendar>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import "videojs-flash";
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
  beforeDestroy:function(){
    const videoDom = this.$refs.myVideo;  //不能用document 获取节点
    this.$video(videoDom).dispose() //销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
    this.myPlayer.dispose() //销毁video实例
   },
  mounted() {
        this.initVideo();
    },
  methods:{
    initVideo() {
            //初始化视频方法
                this.myPlayer = this.$video(myVideo, {
                //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                //自动播放属性,muted:静音播放
                autoplay: true,
                //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: "metadata",
                //设置视频播放器的显示宽度（以像素为单位）
                width: "800px",
                //设置视频播放器的显示高度（以像素为单位）
                height: "400px"
            });
      }
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
