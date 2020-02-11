webpackJsonp([6],{

/***/ "GMI9":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("SbkH");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("4e1b4937", content, true);

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
            date: new Date().toLocaleDateString().replace(/\//g, '-'),
            per_page: 20
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
                        _this2.per_page = parseInt(data.data.per_page);
                    } else {
                        _this2.logLists = data.data.data;
                        _this2.logPage = parseInt(data.data.current_page);
                        _this2.logTotal = parseInt(data.data.total);
                        _this2.per_page = parseInt(data.data.per_page);
                    }
                }
            });
        },
        getNewLogs: function getNewLogs(date) {
            this.date = date;
            this.getLogLists(1);
            this.getLogLists(0);
        },
        goBack: function goBack() {
            this.$router.push({ path: "/users" });
        },
        exportExcel: function exportExcel() {
            var url = "/users/exportLogs?user_id=" + this.user_id;
            window.location.href = url;
        }
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-ab24e258","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/users/detail.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"detail"}},[_c('el-row',{attrs:{"gutter":30}},[_c('el-col',{attrs:{"xs":24,"sm":8,"md":8,"lg":8}},[_c('div',{staticClass:"user-card"},[_c('el-card',{staticClass:"user-info"},[_c('div',{staticClass:"titles",attrs:{"slot":"header"},slot:"header"},[_c('span',[_vm._v("个人基本信息")])]),_vm._v(" "),_c('div',{staticClass:"item"},[_vm._v("姓名："),_c('span',[_vm._v(_vm._s(_vm.detail.name))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_vm._v("电话："),_c('span',[_vm._v(_vm._s(_vm.detail.phone))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_vm._v("住址："),_c('span',[_vm._v(_vm._s(_vm.detail.address))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_vm._v("出行日期："),_c('span',[_vm._v(_vm._s(_vm.detail.travel_time))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_vm._v("出行车次/航班："),_c('span',[_vm._v(_vm._s(_vm.detail.travel_no))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_vm._v("返回日期："),_c('span',[_vm._v(_vm._s(_vm.detail.back_time))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_vm._v("返回车次/航班："),_c('span',[_vm._v(_vm._s(_vm.detail.back_no))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_vm._v("出行地区："),_c('span',[_vm._v(_vm._s(_vm.detail.travel_area)+_vm._s(_vm.detail.travel_address))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_vm._v("措施："),_c('span',[_vm._v(_vm._s(_vm.detail.measure))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_vm._v("体征："),_c('span',[_vm._v(_vm._s(_vm.detail.symptom))])])]),_vm._v(" "),_c('el-card',{staticClass:"calendar"},[_c('div',{staticClass:"titles",attrs:{"slot":"header"},slot:"header"},[_c('span',[_vm._v("日历")])]),_vm._v(" "),_c('el-calendar',{staticClass:"user-calendar",scopedSlots:_vm._u([{key:"dateCell",fn:function(ref){
var date = ref.date;
var data = ref.data;
return [_c('p',{class:data.isSelected ? 'is-selected' : '',on:{"click":function($event){_vm.getNewLogs(data.day)}}},[_vm._v("\n                    "+_vm._s(data.day.split('-').slice(2).join('-'))+"\n                ")])]}}])})],1)],1)]),_vm._v(" "),_c('el-col',{attrs:{"xs":24,"sm":8,"md":8,"lg":8}},[_c('el-card',{staticClass:"record-card"},[_c('div',{staticClass:"titled",attrs:{"slot":"header"},slot:"header"},[_c('span',[_vm._v("打卡记录")])]),_vm._v(" "),_c('el-timeline',{staticClass:"log-timeline"},_vm._l((_vm.logLists),function(log,index){return _c('el-timeline-item',{key:index,attrs:{"timestamp":log.create_time}},[_c('el-image',{staticClass:"log-image",attrs:{"src":log.file}}),_vm._v("\n                "+_vm._s(log.address)+"\n                ")],1)})),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.logLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","page-size":this.per_page,"current-page":this.logPage,"total":this.logTotal},on:{"current-change":_vm.logPageChange}}):_vm._e()],1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"xs":24,"sm":8,"md":8,"lg":8}},[_c('el-card',{staticClass:"record-card"},[_c('div',{staticClass:"titled",attrs:{"slot":"header"},slot:"header"},[_c('span',{staticClass:"tit",staticStyle:{"color":"#E34F10"}},[_vm._v("异常打卡记录")])]),_vm._v(" "),_c('el-timeline',{staticClass:"log-timeline"},_vm._l((_vm.errorLogLists),function(log,index){return _c('el-timeline-item',{key:index,attrs:{"timestamp":log.create_time}},[_c('el-image',{staticClass:"log-image",attrs:{"src":log.file}}),_vm._v("\n                "+_vm._s(log.address)+"\n                ")],1)})),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.errorLogLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","page-size":this.per_page,"current-page":this.errorLogPage,"total":this.errorLogTotal},on:{"current-change":_vm.logPageChange}}):_vm._e()],1)],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"log-btn"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.goBack}},[_vm._v("返回")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.exportExcel}},[_vm._v("导出")])],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var users_detail = (esExports);
// CONCATENATED MODULE: ./src/views/users/detail.vue
function injectStyle (ssrContext) {
  __webpack_require__("GMI9")
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


/***/ }),

/***/ "SbkH":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n#detail{background: #e7eeff;height: 100%;padding: 30px;\n}\n.titles{text-align: center;font-size: 15px;color: #fff;padding: 15px 0;font-weight: 700\n}\n.titled{ font-size: 15px;color: #fff;padding: 15px 0 15px 25px;font-weight: 700\n}\n.el-card{margin-bottom: 30px;\n}\n.el-card__header{padding:0;background: #157bb7;\n}\n.user-info .item{line-height: 31px;\n}\n.user-info .item span{color:#1D397A\n}\n.calendar .el-card__body{padding: 0;\n}\n.el-calendar-table .el-calendar-day {-webkit-box-sizing: border-box;box-sizing: border-box; padding: 8px;  height: 0 !important; padding-bottom: 100% !important;\n}\n.is-selected {color: #1989FA;\n}\n.log-timeline{position:relative;\n}\n.log-image{position:absolute;width: 55px; height: 45px; left: 0; border-radius: 3px;\n}\n.el-timeline-item__node--normal{left: 65px;\n}\n.el-timeline-item__tail { left: 70px;\n}\n.el-timeline-item__wrapper {padding-left: 85px;\n}\n.log-btn{position: relative;text-align:right; margin:30px;\n}\n.pagination{margin: 0 auto;text-align: center\n}\n", ""]);

// exports


/***/ })

});