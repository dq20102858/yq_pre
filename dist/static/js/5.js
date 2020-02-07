webpackJsonp([5],{

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

/***/ "YJNj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/utils/common.js
var common = __webpack_require__("X2Oc");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/users/index.vue
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


/* harmony default export */ var users = ({
    data: function data() {
        return {
            usersPage: 1,
            usersLists: [],
            usersTotal: 0,
            per_page: 20,
            detail: {},
            isVisible: false,
            searchForm: {
                time_range: [],
                area: "",
                street: "",
                keyword: ""
            },
            pickerOptions2: common["a" /* publicData */].pickerOptions2,
            areaLists: [],
            streetLists: [],
            mearsureLists: [],
            symptomLists: [],
            multipleSelection: []
        };
    },
    created: function created() {
        this.getUsersLists();
        this.getAreaLists();
        this.getMearsureLists();
        this.getSymptomLists();
    },

    methods: {
        getUsersLists: function getUsersLists() {
            var _this = this;

            var page = this.usersPage;
            var time_range = this.searchForm.time_range;
            var area = this.searchForm.area;
            var street = this.searchForm.street;
            var keyword = this.searchForm.keyword;
            this.request({
                url: '/users/getUserPages',
                method: 'get',
                params: { page: page, time_range: time_range, area: area, street: street, keyword: keyword }
            }).then(function (response) {
                var data = response.data;
                if (data.status == 1) {
                    _this.usersLists = data.data.data;
                    _this.usersPage = parseInt(data.data.current_page);
                    _this.usersTotal = data.data.total;
                    _this.per_page = data.data.per_page;
                }
            });
        },
        usersPageChange: function usersPageChange(value) {
            this.usersPage = value;
            this.getUsersLists();
        },
        getAreaLists: function getAreaLists() {
            var _this2 = this;

            var pid = 0;
            if (typeof this.searchForm.area !== "undefined") {
                pid = this.searchForm.area;
            }
            this.request({
                url: '/users/getAreaLists',
                method: 'get',
                params: { pid: pid }
            }).then(function (response) {
                var data = response.data;
                if (data.status == 1) {
                    if (pid == 0) {
                        _this2.areaLists = data.data;
                        _this2.streetLists = [];
                    } else {
                        _this2.streetLists = data.data;
                    }
                }
            });
        },
        getMearsureLists: function getMearsureLists() {
            var _this3 = this;

            this.request({
                url: '/users/getMearsureLists',
                method: 'get'
            }).then(function (response) {
                var data = response.data;
                if (data.status == 1) {
                    _this3.mearsureLists = data.data;
                }
            });
        },
        getSymptomLists: function getSymptomLists() {
            var _this4 = this;

            this.request({
                url: '/users/getSymptomLists',
                method: 'get'
            }).then(function (response) {
                var data = response.data;
                if (data.status == 1) {
                    _this4.symptomLists = data.data;
                }
            });
        },
        updateData: function updateData(id, value, field) {
            var _this5 = this;

            var data = {
                id: id,
                field: field,
                value: value
            };
            this.request({
                url: '/users/updateData',
                method: 'post',
                data: data
            }).then(function (response) {
                var data = response.data;
                if (data.status == 1) {
                    _this5.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                } else {
                    _this5.$message({
                        message: '修改失败',
                        type: 'warning'
                    });
                }
            });
        },
        goDetail: function goDetail(id) {
            this.$router.push({ path: "/detail", query: { id: id } });
        },
        handleSelectionChange: function handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        exportSelected: function exportSelected() {
            var selected = [];
            this.multipleSelection.forEach(function (item) {
                selected.push(item.id);
            });
            var ids = "";
            if (selected.length > 0) {
                ids = selected.join();
            } else {
                return false;
            }
            var url = "/users/exportExcel?ids=" + ids + "&flag=2";
            window.location.href = url;
        },
        exportAll: function exportAll() {
            var time_range = this.searchForm.time_range;
            var area = this.searchForm.area;
            var street = this.searchForm.street;
            var keyword = this.searchForm.keyword;
            if (this.usersLists.length > 0) {
                var url = "/users/exportExcel?area=" + this.searchForm["area"] + "&street=" + this.searchForm['street'] + "&keyword=" + this.searchForm['keyword'];
                if (this.searchForm.time_range.length > 0) {
                    url = url + "&create_time[]=" + this.searchForm['time_range'][0] + "&create_time[]=" + this.searchForm['time_range'][1];
                }
                url = url + "&flag=1";
                window.location.href = url;
            }
        }
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-36908100","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/users/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"users"}},[_c('el-form',{staticClass:"demo-form-inline",staticStyle:{"padding":"10px","float":"left"},attrs:{"model":_vm.searchForm,"inline":true,"size":"small"}},[_c('el-form-item',[_c('el-input',{attrs:{"placeholder":"请输入想要搜索的内容"},model:{value:(_vm.searchForm.keyword),callback:function ($$v) {_vm.$set(_vm.searchForm, "keyword", $$v)},expression:"searchForm.keyword"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择区","clearable":""},on:{"change":_vm.getAreaLists},model:{value:(_vm.searchForm.area),callback:function ($$v) {_vm.$set(_vm.searchForm, "area", $$v)},expression:"searchForm.area"}},_vm._l((_vm.areaLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择街道","clearable":""},model:{value:(_vm.searchForm.street),callback:function ($$v) {_vm.$set(_vm.searchForm, "street", $$v)},expression:"searchForm.street"}},_vm._l((_vm.streetLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',[_c('el-date-picker',{attrs:{"type":"daterange","align":"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":_vm.pickerOptions2,"value-format":"yyyy-MM-dd"},model:{value:(_vm.searchForm.time_range),callback:function ($$v) {_vm.$set(_vm.searchForm, "time_range", $$v)},expression:"searchForm.time_range"}})],1),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.getUsersLists}},[_vm._v("检索")])],1),_vm._v(" "),_c('el-table',{staticStyle:{"width":"100%"},attrs:{"data":_vm.usersLists},on:{"selection-change":_vm.handleSelectionChange}},[_c('el-table-column',{attrs:{"type":"selection"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"id","label":"ID"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"姓名"}}),_vm._v(" "),_vm._v(" \">"),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"address","label":"地址"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"travel_time","label":"出行日期"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"traffic_no","label":"出行车次/航班"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"back_time","label":"返回日期"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"back_no","label":"返回车次/航班"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"travel_address","label":"出行地区"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"措施"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-select',{on:{"change":function($event){_vm.updateData(scope.row.id,scope.row.measure,'measure')}},model:{value:(scope.row.measure),callback:function ($$v) {_vm.$set(scope.row, "measure", $$v)},expression:"scope.row.measure"}},_vm._l((_vm.mearsureLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"体征"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-select',{on:{"change":function($event){_vm.updateData(scope.row.id,scope.row.symptom,'symptom')}},model:{value:(scope.row.symptom),callback:function ($$v) {_vm.$set(scope.row, "symptom", $$v)},expression:"scope.row.symptom"}},_vm._l((_vm.symptomLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"supervise","label":"监督"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-select',{on:{"change":function($event){_vm.updateData(scope.row.id,scope.row.supervise,'supervise')}},model:{value:(scope.row.supervise),callback:function ($$v) {_vm.$set(scope.row, "supervise", $$v)},expression:"scope.row.supervise"}},[_c('el-option',{key:"1",attrs:{"label":"是","value":"1"}}),_vm._v(" "),_c('el-option',{key:"0",attrs:{"label":"否","value":"0"}})],1)]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row.id)}}},[_vm._v("更多")])]}}])})],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"button-line",attrs:{"type":"primary"},on:{"click":_vm.exportSelected}},[_vm._v("选中导出")]),_vm._v(" "),_c('el-button',{staticClass:"button-line",attrs:{"type":"primary"},on:{"click":_vm.exportAll}},[_vm._v("全部导出")]),_vm._v(" "),_c('div',{staticClass:"pagination button-line"},[(_vm.usersLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","page-size":this.per_page,"current-page":this.usersPage,"total":this.usersTotal},on:{"current-change":_vm.usersPageChange}}):_vm._e()],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_users = (esExports);
// CONCATENATED MODULE: ./src/views/users/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("irp0")
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
  users,
  views_users,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_users = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "irp0":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("nGmn");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("6f6686da", content, true);

/***/ }),

/***/ "nGmn":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n*{\n    margin: 0;\n    padding: 0\n}\n.dialog-line{\n    padding:5px 10px;\n}\n#dialog-ul{\n    list-style:none;\n}\n#dialog-ul li .dialog-line{\n    float:left;\n    width:50%;\n}\n.dialog-line span{\n    display:inline-block;\n}\n.clear{\n    clear:both;\n}\n.button-line{\n    float:left;\n    margin-top:20px;\n    margin-left:5px;\n}\n.pagination{\n    float:right;\n}\n", ""]);

// exports


/***/ })

});