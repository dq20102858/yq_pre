webpackJsonp([6],{

/***/ "17Ui":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n*{\n    margin: 0;\n    padding: 0\n}\n.left , .right{\n    float:left\n}\n.user-calendar{\n    height:140px;\n}\n.user-card{\n    width:186pt;\n    float:left;\n}\n.record-card{\n    width:279.5pt;\n    float:left;\n}\n#detail .el-calendar-table .el-calendar-day {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    padding: 8px;\n    height: 0 !important; \n    padding-bottom: 100% !important;\n}\n.is-selected {\n    color: #1989FA;\n}\n", ""]);

// exports


/***/ }),

/***/ "Emd4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("17Ui");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("18a25094", content, true);

/***/ }),

/***/ "R8VY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/users/detail.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var detail = ({
    data: function data() {
        return {
            logLists: [],
            logPage: 1,
            logTotal: 0,
            errorLogLists: [],
            errorLogPage: 1,
            errorLogTotal: 0,
            user_id: this.$route.query.id,
            detail: {},
            date: new Date().toString()
        };
    },
    created: function created() {
        this.getDetail();
        this.getLogLists(1);
        this.getLogLists(0);
    },

    methods: {
        getDetail: function getDetail() {
            var _this = this;

            var id = this.user_id;
            this.request({
                url: '/users/getDetail',
                method: 'get',
                params: { id: id }
            }).then(function (response) {
                var data = response.data;
                if (data.status == 1) {
                    _this.detail = data.data;
                }
            });
        },
        logPageChange: function logPageChange(value) {
            this.usersPage = value;
            this.getLogLists();
        },
        getLogLists: function getLogLists(is_error) {
            var _this2 = this;

            var page = this.logPage;
            var user_id = this.user_id;
            var date = this.date;
            this.request({
                url: '/users/getLogLists',
                method: 'get',
                params: { page: page, user_id: user_id, date: date, is_error: is_error }
            }).then(function (response) {
                var data = response.data;
                if (data.status == 1) {
                    if (is_error == 1) {
                        _this2.errorLogLists = data.data.data;
                        _this2.errorLogPage = parseInt(data.data.current_page);
                        _this2.errorLogTotal = parseInt(data.data.total);
                    } else {
                        _this2.logLists = data.data.data;
                        _this2.logPage = parseInt(data.data.current_page);
                        _this2.logTotal = parseInt(data.data.total);
                    }
                }
            });
        },
        getNewLogs: function getNewLogs(date) {
            this.date = date;
            this.getLogLists(1);
            this.getLogLists(0);
        }
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-c9a8dcf0","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/users/detail.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"detail"}},[_c('div',{staticClass:"user-card left"},[_c('el-card',[_c('div',{staticClass:"clearfix",attrs:{"slot":"header"},slot:"header"},[_c('span',[_vm._v("个人基本信息")])]),_vm._v(" "),_c('div',[_vm._v("姓名："+_vm._s(_vm.detail.name))]),_vm._v(" "),_c('div',[_vm._v("电话："+_vm._s(_vm.detail.phone))]),_vm._v(" "),_c('div',[_vm._v("住址："+_vm._s(_vm.detail.address))]),_vm._v(" "),_c('div',[_vm._v("出行日期："+_vm._s(_vm.detail.travel_time))]),_vm._v(" "),_c('div',[_vm._v("出行车次/航班："+_vm._s(_vm.detail.travel_no))]),_vm._v(" "),_c('div',[_vm._v("返回日期："+_vm._s(_vm.detail.back_time))]),_vm._v(" "),_c('div',[_vm._v("返回车次/航班："+_vm._s(_vm.detail.back_no))]),_vm._v(" "),_c('div',[_vm._v("出行地区："+_vm._s(_vm.detail.travel_area)+_vm._s(_vm.detail.travel_address))]),_vm._v(" "),_c('div',[_vm._v("措施："+_vm._s(_vm.detail.measure))]),_vm._v(" "),_c('div',[_vm._v("体征："+_vm._s(_vm.detail.symptom))])]),_vm._v(" "),_c('el-calendar',{staticClass:"user-calendar",scopedSlots:_vm._u([{key:"dateCell",fn:function(ref){
var date = ref.date;
var data = ref.data;
return [_c('p',{class:data.isSelected ? 'is-selected' : '',on:{"click":function($event){_vm.getNewLogs(data.day)}}},[_vm._v("\n                  "+_vm._s(data.day.split('-').slice(2).join('-'))+"\n              ")])]}}])})],1),_vm._v(" "),_c('div',{staticClass:"right"},[_c('el-card',{staticClass:"record-card"},[_c('div',{staticClass:"clearfix",attrs:{"slot":"header"},slot:"header"},[_c('span',[_vm._v("打卡记录")])]),_vm._v(" "),_c('el-timeline',_vm._l((_vm.logLists),function(log,index){return _c('el-timeline-item',{key:index,attrs:{"timestamp":log.create_time}},[_vm._v("\n              "+_vm._s(log.address)+"\n              ")])})),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.logLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","current-page":this.logPage,"total":this.logTotal},on:{"current-change":_vm.logPageChange}}):_vm._e()],1)],1),_vm._v(" "),_c('el-card',{staticClass:"record-card"},[_c('div',{staticClass:"clearfix",attrs:{"slot":"header"},slot:"header"},[_c('span',[_vm._v("异常打卡记录")])]),_vm._v(" "),_c('el-timeline',_vm._l((_vm.errorLogLists),function(log,index){return _c('el-timeline-item',{key:index,attrs:{"timestamp":log.create_time}},[_vm._v("\n              "+_vm._s(log.address)+"\n              ")])})),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.errorLogLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","current-page":this.errorLogPage,"total":this.errorLogTotal},on:{"current-change":_vm.logPageChange}}):_vm._e()],1)],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var users_detail = (esExports);
// CONCATENATED MODULE: ./src/views/users/detail.vue
function injectStyle (ssrContext) {
  __webpack_require__("Emd4")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  detail,
  users_detail,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_users_detail = __webpack_exports__["default"] = (Component.exports);


/***/ })

});