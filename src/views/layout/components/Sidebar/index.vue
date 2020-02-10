<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
     
        <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#157BB7" text-color="#bfcbd9" active-text-color="#409EFF">
          <div class="nx-logo">
        <img src="/static/aut.png"/>
        <p>Keep apart</p>
      </div>
            <sidebar-item :routes="permission_routers"></sidebar-item>
        </el-menu>
    </el-scrollbar>
</template>
<script>
    import { mapGetters } from "vuex";
    import SidebarItem from "./SidebarItem";
    export default {
      components: { SidebarItem },
      computed: {
        ...mapGetters(["permission_routers", "sidebar"]),
        isCollapse() {
          return !this.sidebar.opened;
        }
      }
    };
</script>
<style>
.nx-logo{text-align: center;margin-top: 40px; margin-bottom: 40px;}
.nx-logo img{width: 48px;height: 48px;border-radius: 100%;margin-bottom: 10px;}
.nx-logo p{font-size: 14px;color: #FAF5F5}
.el-menu--collapse .nx-logo{margin-top: 10px;}
.el-menu--collapse .nx-logo img{width: 28px;height: 28px;}
</style>