<template>
    <div class="login-container">

  <div class="login-logo">
        <img src="/static/logo.png" />
      </div>
      <div class="login-box">
  <el-col :xs="24" :sm="12" :md="12" :lg="12">
<div class="login-wel">
        <img src="/static/login-img.png" />
      </div>
  </el-col>
   <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <el-form class="login-form" autoComplete="off" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <div class="title-container">
                <img src="/static/aut.png" />
                <h3 class="title">Keep apart</h3>
            </div>
            <el-form-item prop="username">
                <i class="iconame"></i>
                <el-input class="inputtxt" name="username" type="text" v-model="loginForm.username" autoComplete="off" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item prop="password">
               <i class="icopwd"></i>
                <el-input  class="inputtxt" name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" />
            </el-form-item>
            <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
          </el-col>
</el-row>
    </div></div>
</template>
<script>
    // import { isvalidUsername } from '@/utils/validate'
    import { loginByUsername } from "@/api/login/login";
    export default {
      name: "Login",
      data() {
        const validatePassword = (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error("密码长度大于6个字符"));
          } else {
            callback();
          }
        };
        return {
          loginForm: {
            username: "",
            password: ""
          },
          loginRules: {
            //username: [{ required: true, trigger: 'blur', validator: validateUsername }],
            password: [
              { required: true, trigger: "blur", validator: validatePassword }
            ]
          },
          passwordType: "password",
          loading: false,
          showDialog: false
        };
      },
      methods: {
        showPwd() {
          if (this.passwordType === "password") {
            this.passwordType = "";
          } else {
            this.passwordType = "password";
          }
        },
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.loading = true;
              this.$store
                .dispatch("LoginByUsername", this.loginForm)
                .then(() => {
                  this.loading = false;
                  this.$router.push({ path: "/" });
                })
                .catch(() => {
                  this.loading = false;
                  return false;
                });
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        }
      },
      created() {
        // window.addEventListener('hashchange', this.afterQRScan)
      },
      destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
      }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
.login-container { background:#edf7fd url('/static/login-bg.png') no-repeat;background-size: cover; height: 100vh; position: fixed; height: 100%; width: 100%; }
.login-logo{float: right}
.login-logo img{height: 28px;margin-right:60px;margin-top: 30px;display: block}
.login-box{margin: 0 auto; width: 980px} 
.login-wel img{margin-top: 120px;display: block}
.login-form {width: 350px; padding:25px 45px 45px 45px; margin:160px 0 0 120px ; background: #fff; border-radius: 12px;}
.title-container {  text-align: center; }
.title-container .title { font-size:14px; font-weight: 400; color:#157BB7;margin-bottom: 30px;}
.title-container img{width: 38px;}
.el-form-item .el-form-item__content{position: relative;width: 100%;border-bottom: 1px #ededed solid;}
.el-form-item .inputtxt input{display: inline-block; height: 41px;line-height: 41px;width: 100%;padding-left: 25px; border: 0; }
.el-form-item .iconame {z-index: 999; position: absolute;top: 11px;left:0;background: url('/static/login-icon1.png') no-repeat;background-size: 21px 22px; height: 18px;width: 18px;}
.el-form-item .icopwd {z-index: 999; position: absolute;top: 11px;left:0;background: url('/static/login-icon2.png') no-repeat;background-size: 21px 22px; height: 18px;width: 18px;}
.el-form-item__error{padding-top: 10px;padding-bottom: 10px;}
.el-button{border-radius: 30px;display: block;margin-top: 30px; width: 100%;background: #157bb7 }
input:-webkit-autofill {
 box-shadow: 0 0 0px 1000px white inset !important;
}  

input:-webkit-autofill:focus {
 box-shadow: 0 0 0px 1000px white inset !important;
}  
</style>
