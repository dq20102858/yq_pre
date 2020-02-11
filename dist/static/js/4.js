webpackJsonp([4],{

/***/ "9Jvk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/utils/common.js
var common = __webpack_require__("X2Oc");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/record/index.vue
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


/* harmony default export */ var record = ({
    data: function data() {
        return {
            logLists: [],
            logPage: 1,
            logTotal: 0,
            searchForm: {
                time_range: []
            },
            pickerOptions2: common["a" /* publicData */].pickerOptions2
        };
    },
    created: function created() {
        this.getLogLists();
    },

    methods: {
        logPageChange: function logPageChange(value) {
            this.usersPage = value;
            this.getLogLists();
        },
        getLogLists: function getLogLists() {
            var _this = this;

            var page = this.logPage;
            var time_range = this.searchForm.time_range;
            this.request({
                url: '/users/getLogLists',
                method: 'get',
                params: { page: page, time_range: time_range }
            }).then(function (response) {
                var data = response.data;
                if (data.status == 1) {
                    _this.logLists = data.data.data;
                    _this.logPage = parseInt(data.data.current_page);
                    _this.logTotal = parseInt(data.data.total);
                }
            });
        },
        exportExcel: function exportExcel() {
            var url = "http://yq.nething.com/user/exportExcel";
            if (this.searchForm.time_range.length > 1) {
                url = url + "?time_range[]=" + this.searchForm["time_range"][0] + "&time_range[]=" + this.searchForm["time_range"][1];
            }
            window.location.href = url;
        }
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d5bcd4ce","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/record/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"users"}},[_c('el-form',{staticClass:"demo-form-inline",staticStyle:{"padding":"10px","float":"left"},attrs:{"model":_vm.searchForm,"inline":true,"size":"small"}},[_c('el-form-item',[_c('el-date-picker',{attrs:{"type":"daterange","align":"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":_vm.pickerOptions2,"value-format":"yyyy-MM-dd"},model:{value:(_vm.searchForm.time_range),callback:function ($$v) {_vm.$set(_vm.searchForm, "time_range", $$v)},expression:"searchForm.time_range"}})],1),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.getLogLists}},[_vm._v("检索")])],1),_vm._v(" "),_c('el-button',{staticStyle:{"margin":"7px"},attrs:{"type":"warning"},on:{"click":_vm.exportExcel}},[_vm._v("导出")]),_vm._v(" "),_c('el-table',{staticStyle:{"width":"100%"},attrs:{"data":_vm.logLists}},[_c('el-table-column',{attrs:{"prop":"user_name","label":"姓名"}}),_vm._v(" "),_vm._v(" \">"),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"street","label":"街道"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"address","label":"打卡地点"}})],1),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.logLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","current-page":this.logPage,"total":this.logTotal},on:{"current-change":_vm.logPageChange}}):_vm._e()],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_record = (esExports);
// CONCATENATED MODULE: ./src/views/record/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("Xh66")
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
  record,
  views_record,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_record = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "X2Oc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return publicData; });

var publicData = {

  pickerOptions2: {
    shortcuts: [{
      text: '今天',
      onClick: function onClick(picker) {
        var end = new Date();
        var start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三天',
      onClick: function onClick(picker) {
        var end = new Date();
        var start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一周',
      onClick: function onClick(picker) {
        var end = new Date();
        var start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一个月',
      onClick: function onClick(picker) {
        var end = new Date();
        var start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三个月',
      onClick: function onClick(picker) {
        var end = new Date();
        var start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 89);
        picker.$emit('pick', [start, end]);
      }
    }]
  },
  pickerOptions3: {
    shortcuts: [{
      text: '本月',
      onClick: function onClick(picker) {
        picker.$emit('pick', [new Date(), new Date()]);
      }
    }, {
      text: '今年至今',
      onClick: function onClick(picker) {
        var end = new Date();
        var start = new Date(new Date().getFullYear(), 0);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近六个月',
      onClick: function onClick(picker) {
        var end = new Date();
        var start = new Date();
        start.setMonth(start.getMonth() - 6);
        picker.$emit('pick', [start, end]);
      }
    }]
  }
};

/***/ }),

/***/ "Xh66":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("zuzx");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("ea6d772a", content, true);

/***/ }),

/***/ "zuzx":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n*{\n    margin: 0;\n    padding: 0\n}\n\n", ""]);

// exports


/***/ })

});