(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["views/monthly/statement"],{

/***/ 207:
/*!**************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/main.js?{"page":"views%2Fmonthly%2Fstatement"} ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _statement = _interopRequireDefault(__webpack_require__(/*! ./views/monthly/statement.vue */ 208));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_statement.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 208:
/*!*******************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/monthly/statement.vue ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _statement_vue_vue_type_template_id_6d4e3124___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statement.vue?vue&type=template&id=6d4e3124& */ 209);
/* harmony import */ var _statement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statement.vue?vue&type=script&lang=js& */ 211);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _statement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _statement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _statement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statement.vue?vue&type=style&index=0&lang=scss& */ 213);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _statement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _statement_vue_vue_type_template_id_6d4e3124___WEBPACK_IMPORTED_MODULE_0__["render"],
  _statement_vue_vue_type_template_id_6d4e3124___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _statement_vue_vue_type_template_id_6d4e3124___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "views/monthly/statement.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 209:
/*!**************************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/monthly/statement.vue?vue&type=template&id=6d4e3124& ***!
  \**************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_template_id_6d4e3124___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./statement.vue?vue&type=template&id=6d4e3124& */ 210);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_template_id_6d4e3124___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_template_id_6d4e3124___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_template_id_6d4e3124___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_template_id_6d4e3124___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 210:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/monthly/statement.vue?vue&type=template&id=6d4e3124& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniIcons: function () {
      return Promise.all(/*! import() | node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons")]).then(__webpack_require__.bind(null, /*! @dcloudio/uni-ui/lib/uni-icons/uni-icons.vue */ 422))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = !_vm.hasMoreData && _vm.statementList.length > 0
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 211:
/*!********************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/monthly/statement.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./statement.vue?vue&type=script&lang=js& */ 212);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 212:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/monthly/statement.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 36));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 38));
var _monthly = _interopRequireDefault(__webpack_require__(/*! @/api/monthly */ 171));
var _statement = _interopRequireDefault(__webpack_require__(/*! @/api/statement */ 78));
var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request */ 40));
var _payment = _interopRequireDefault(__webpack_require__(/*! @/api/payment */ 79));
var _wechat = _interopRequireDefault(__webpack_require__(/*! @/api/wechat.js */ 80));
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
var _default = {
  data: function data() {
    return {
      eligibilityId: '',
      // 月结资格ID
      eligibilityInfo: null,
      // 月结资格信息

      userInfo: uni.getStorageSync('userInfo') || {},
      // 当前用户信息

      showTotalBillTab: false,
      // 是否显示总账单选项卡

      // 标签切换
      currentTab: 0,
      // 当前选中的标签 0-总账单 1-我的账单

      // 筛选条件
      showFilterPanel: false,
      startDate: '',
      endDate: '',
      displayStartDate: '',
      displayEndDate: '',
      selectedType: null,
      // 0-支付 1-退款 null-全部

      // 分页加载
      currentPage: 1,
      pageSize: 5,
      hasMoreData: true,
      loading: false,
      monthlyBill: {},
      // 数据
      statementList: [],
      totalAmount: 0,
      // 总交易金额

      // 添加周期相关数据的初始值
      settlementCycles: [],
      // 所有结算周期
      currentCycleIndex: 0,
      // 当前选中的周期索引
      hasAllPeriodsOption: false,
      // 是否已添加"全部"选项
      showCyclePanel: false,
      // 控制周期选择面板显示

      // 添加支付相关状态
      paymentLoading: false
    };
  },
  computed: {
    // 判断是否为资格拥有者
    isOwner: function isOwner() {
      var isOwner = this.eligibilityInfo && this.userInfo && this.eligibilityInfo.userId === this.userInfo.userId;
      console.log('isOwner计算:', {
        eligibilityInfo: this.eligibilityInfo,
        userInfo: this.userInfo,
        isOwner: isOwner
      });
      return isOwner;
    },
    // 加载更多状态
    loadMoreStatus: function loadMoreStatus() {
      if (this.loading) return 'loading';
      if (this.hasMoreData) return 'more';
      return 'noMore';
    },
    // 当前选中周期的名称 - 修改处理无周期情况
    selectedCycleName: function selectedCycleName() {
      if (this.settlementCycles.length === 0) return '暂无周期';
      var cycle = this.settlementCycles[this.currentCycleIndex];
      if (cycle.isAll) return '全部';
      return "\u7B2C".concat(cycle.number, "\u671F (").concat(cycle.startDate, " \u81F3 ").concat(cycle.endDate, ")");
    },
    // 是否有可用的周期
    hasValidCycles: function hasValidCycles() {
      // 排除只有"全部"选项的情况
      if (this.settlementCycles.length === 1 && this.settlementCycles[0].isAll) {
        return false;
      }
      return this.settlementCycles.length > 0;
    },
    // 当前期数信息
    currentPeriodInfo: function currentPeriodInfo() {
      if (this.settlementCycles.length === 0) return null;
      return this.settlementCycles[this.currentCycleIndex];
    },
    // 是否有未结算的账单
    hasUnpaidStatements: function hasUnpaidStatements() {
      // 如果没有账单或者所有账单都已结算，也允许点击结算按钮
      return true;
    },
    // 计算未结算金额
    unpaidAmount: function unpaidAmount() {
      var unpaidAmount = this.statementList.filter(function (item) {
        return item.isUserPays === 0;
      }).reduce(function (total, item) {
        var amount = item.type === 1 ? -item.amount : item.amount;
        return total + amount;
      }, 0);

      // 如果没有未结算账单，返回总金额
      return unpaidAmount > 0 ? unpaidAmount : this.totalAmount;
    }
  },
  // 修改生命周期方法
  onLoad: function onLoad(options) {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('onLoad options:', options);
              if (!options.id) {
                _context.next = 18;
                break;
              }
              _this.eligibilityId = options.id;
              _context.prev = 3;
              console.log('开始获取月结资格信息');
              // 获取月结资格信息
              _context.next = 7;
              return _this.getEligibilityInfo();
            case 7:
              console.log('开始计算结算周期');
              // 计算所有结算周期
              _this.calculateAllSettlementCycles();
              console.log('开始选择当前周期');
              // 选择当前周期
              _this.selectCurrentCycle();

              // 加载账单数据
              _this.loadStatements(true);
              _this.getAllPrice();
              _context.next = 18;
              break;
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](3);
              console.error('初始化失败:', _context.t0);
            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 15]]);
    }))();
  },
  methods: {
    getAllPrice: function getAllPrice() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var userId, startTime, endTime, res, _res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = _this2.currentTab === 1 || !_this2.isOwner ? _this2.userInfo.userId : '';
                startTime = _this2.startDate || '';
                endTime = _this2.endDate || '';
                if (!(_this2.currentTab === 0)) {
                  _context2.next = 10;
                  break;
                }
                _context2.next = 6;
                return _statement.default.getAllPrice(_this2.eligibilityId, startTime, endTime);
              case 6:
                res = _context2.sent;
                if (res) {
                  _this2.monthlyBill = res;
                }
                _context2.next = 14;
                break;
              case 10:
                _context2.next = 12;
                return _statement.default.getAllPrice(_this2.eligibilityId, startTime, endTime, userId);
              case 12:
                _res = _context2.sent;
                if (_res) {
                  _this2.monthlyBill = _res;
                }
              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 获取月结资格信息
    getEligibilityInfo: function getEligibilityInfo() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var res;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                uni.showLoading({
                  title: '加载中...'
                });
                _context3.next = 4;
                return _monthly.default.getEligibilityById(_this3.eligibilityId);
              case 4:
                res = _context3.sent;
                if (res) {
                  _this3.eligibilityInfo = res;
                  console.log('获取到的月结资格信息:', {
                    eligibilityInfo: _this3.eligibilityInfo,
                    userInfo: _this3.userInfo,
                    isOwner: _this3.isOwner
                  });

                  // 如果当前用户不是月结资格拥有者，直接显示"我的账单"页签
                  if (!_this3.isOwner) {
                    _this3.currentTab = 0;
                  } else {
                    _this3.currentTab = 0;
                    _this3.showTotalBillTab = true;
                  }
                }
                _context3.next = 11;
                break;
              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                console.error('获取月结资格信息失败:', _context3.t0);
              case 11:
                _context3.prev = 11;
                uni.hideLoading();
                return _context3.finish(11);
              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8, 11, 14]]);
      }))();
    },
    // 修改标签切换方法
    switchTab: function switchTab(tab) {
      if (this.currentTab === tab) return;
      this.currentTab = tab;
      this.currentPage = 1;
      this.statementList = [];
      this.hasMoreData = true;

      // 重新加载账单数据，保留当前选中的周期和筛选条件
      this.loadStatements(true);
      this.getAllPrice();
    },
    // 切换筛选面板
    toggleFilterPanel: function toggleFilterPanel() {
      this.showFilterPanel = !this.showFilterPanel;
    },
    // 修改开始日期选择处理函数
    onStartDateChange: function onStartDateChange(e) {
      this.startDate = e.detail.value;
      this.displayStartDate = e.detail.value;

      // 如果已选择了结束日期，并且开始日期晚于结束日期，调整结束日期
      if (this.endDate && this.startDate > this.endDate) {
        this.endDate = this.startDate;
        this.displayEndDate = this.startDate;
        uni.showToast({
          title: '已自动调整结束日期',
          icon: 'none'
        });
      }
    },
    // 修改结束日期选择处理函数
    onEndDateChange: function onEndDateChange(e) {
      var selectedEndDate = e.detail.value;

      // 检查结束日期是否早于开始日期
      if (this.startDate && selectedEndDate < this.startDate) {
        uni.showToast({
          title: '结束日期不能早于开始日期',
          icon: 'none'
        });
        return;
      }
      this.endDate = selectedEndDate;
      this.displayEndDate = selectedEndDate;
    },
    // 选择交易类型
    selectType: function selectType(type) {
      this.selectedType = type;
    },
    // 修改应用筛选方法，确保日期有效
    applyFilters: function applyFilters() {
      // 验证日期
      if (this.startDate && this.endDate && this.startDate > this.endDate) {
        uni.showToast({
          title: '结束日期不能早于开始日期',
          icon: 'none'
        });
        return;
      }

      // 关闭筛选面板
      this.showFilterPanel = false;

      // 重置分页
      this.currentPage = 1;
      this.hasMoreData = true;

      // 重新加载数据
      this.loadStatements(true);
    },
    // 重置筛选条件时也处理日期关系
    resetFilters: function resetFilters() {
      this.startDate = '';
      this.endDate = '';
      this.displayStartDate = '';
      this.displayEndDate = '';
      this.selectedType = null;
    },
    // 修改加载账单数据方法
    loadStatements: function loadStatements() {
      var _arguments = arguments,
        _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var refresh, pageNum, pageSize, monthlySettlementEligibilityId, userId, startTime, endTime, type, res;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                refresh = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                if (refresh) {
                  _this4.currentPage = 1;
                  _this4.hasMoreData = true;
                }
                if (!(!_this4.hasMoreData && !refresh)) {
                  _context4.next = 4;
                  break;
                }
                return _context4.abrupt("return");
              case 4:
                _context4.prev = 4;
                _this4.loading = true;

                // 获取API所需的所有参数，注意使用正确的变量名
                pageNum = _this4.currentPage;
                pageSize = _this4.pageSize;
                monthlySettlementEligibilityId = _this4.eligibilityId;
                userId = _this4.currentTab === 1 || !_this4.isOwner ? _this4.userInfo.userId : '';
                startTime = _this4.startDate || '';
                endTime = _this4.endDate || '';
                type = _this4.selectedType !== null ? _this4.selectedType : null; // 输出日志，帮助调试
                console.log('加载账单参数:', {
                  pageNum: pageNum,
                  pageSize: pageSize,
                  monthlySettlementEligibilityId: monthlySettlementEligibilityId,
                  userId: userId,
                  startTime: startTime,
                  endTime: endTime,
                  type: type
                });

                // 使用原有API调用方式，传入单独的参数
                _context4.next = 16;
                return _statement.default.pageStatement(pageNum, pageSize, monthlySettlementEligibilityId, userId, startTime, endTime, type);
              case 16:
                res = _context4.sent;
                // 处理响应数据
                if (res && res.dataList && Array.isArray(res.dataList)) {
                  // 更新列表数据
                  if (refresh) {
                    _this4.statementList = (0, _toConsumableArray2.default)(res.dataList);
                  } else {
                    _this4.statementList = [].concat((0, _toConsumableArray2.default)(_this4.statementList), (0, _toConsumableArray2.default)(res.dataList));
                  }

                  // 更新分页状态
                  _this4.hasMoreData = res.dataList.length >= _this4.pageSize;
                  console.log("\u5DF2\u52A0\u8F7D\u8D26\u5355\u6570\u636E\uFF0C\u5F53\u524D\u9875: ".concat(pageNum, ", \u6570\u636E\u6761\u6570: ").concat(res.dataList.length, ", \u662F\u5426\u6709\u66F4\u591A: ").concat(_this4.hasMoreData));
                } else {
                  if (refresh) {
                    _this4.statementList = [];
                  }
                  _this4.hasMoreData = false;
                }
                _context4.next = 25;
                break;
              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4["catch"](4);
                console.error('加载账单数据异常:', _context4.t0);
                uni.showToast({
                  title: '加载账单数据失败',
                  icon: 'none'
                });
                _this4.hasMoreData = false;
              case 25:
                _context4.prev = 25;
                _this4.loading = false;
                return _context4.finish(25);
              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 20, 25, 28]]);
      }))();
    },
    // 查看账单详情
    viewStatementDetail: function viewStatementDetail(item) {
      uni.navigateTo({
        url: "/views/monthly/statement-detail?id=".concat(item.monthlyStatementId)
      });
    },
    // 选择当前周期
    selectCurrentCycle: function selectCurrentCycle() {
      console.log('开始选择当前周期');
      if (this.settlementCycles.length === 0) {
        console.warn('没有可选择的周期');
        return;
      }

      // 找到当前周期的索引
      var currentIndex = this.settlementCycles.findIndex(function (cycle) {
        return cycle.isCurrent;
      });
      console.log('当前周期索引:', currentIndex);
      if (currentIndex !== -1) {
        this.currentCycleIndex = currentIndex;
        var cycle = this.settlementCycles[this.currentCycleIndex];
        this.startDate = cycle.startDate;
        this.endDate = cycle.endDate;
        this.displayStartDate = cycle.startDate;
        this.displayEndDate = cycle.endDate;
        console.log('已选择当前周期:', this.settlementCycles[currentIndex]);
      }
    },
    // 添加日期格式化方法
    // formatDate(date) {
    // 	if (!date) return ''
    // 	const d = new Date(date)
    // 	const year = d.getFullYear()
    // 	const month = String(d.getMonth() + 1).padStart(2, '0')
    // 	const day = String(d.getDate()).padStart(2, '0')
    // 	return `${year}-${month}-${day}`
    // },
    // calculateAllSettlementCycles() {
    //   console.log('开始计算历史周期，当前资格信息:', this.eligibilityInfo);
    //   if (!this.eligibilityInfo || !this.eligibilityInfo.createTime) {
    //     console.warn('月结资格信息不完整，无法计算周期');
    //     this.settlementCycles = [];
    //     return;
    //   }
    //   const { settlementCycle, createTime } = this.eligibilityInfo;
    //   const settlementDate = 15; // 固定结算日
    //   const cycleNumberMap = { 0: 1, 1: 3, 2: 6 };
    //   const cycleNumber = cycleNumberMap[settlementCycle] || 1;
    //   const createdAt = new Date(createTime.replace(/-/g, '/'));
    //   const today = new Date();
    //   today.setHours(0, 0, 0, 0);
    //   let cycles = [];
    //   let currentStart = new Date(createdAt);
    //   currentStart.setHours(0, 0, 0, 0);
    //   // 生成周期核心逻辑
    //   // 新增配置参数
    //   const EXTRA_CYCLES = 2; // 遇到当前周期后额外生成的周期数
    //   while (currentStart <= today || extraCount > 0) {
    //     const cycleEnd = this.calculateCycleEnd(currentStart, cycleNumber);
    //     cycleEnd.setHours(23, 59, 59, 999);
    //     // 判断当前周期
    //     const isCurrent = today <= cycleEnd;
    //     cycles.push({
    //       startDate: this.formatDate(currentStart),
    //       endDate: this.formatDate(cycleEnd),
    //       isCurrent
    //     });
    //     // 遇到当前周期开始计数
    //     if (isCurrent && extraCount === null) {
    //       extraCount = EXTRA_CYCLES;
    //     }
    //     // 在遇到当前周期后继续生成指定数量的周期
    //     if (extraCount !== null) {
    //       if (extraCount <= 0) break;
    //       extraCount--;
    //     }
    //     // 准备下一周期
    //     currentStart = new Date(cycleEnd);
    //     currentStart.setDate(currentStart.getDate() + 1);
    //     currentStart.setHours(0, 0, 0, 0);
    //   }
    // //   while (currentStart <= today) {
    // //     const cycleEnd = this.calculateCycleEnd(currentStart, cycleNumber);
    // //     cycleEnd.setHours(23, 59, 59, 999); // 包含当天
    // //     // 判断当前周期
    // //     const isCurrent = today <= cycleEnd;
    // //     cycles.push({
    // //       startDate: this.formatDate(currentStart),
    // //       endDate: this.formatDate(cycleEnd),
    // //       isCurrent
    // //     });
    // //     // 遇到当前周期停止生成
    // //     if (isCurrent) break;
    // //     // 准备下一个周期（结束日期次日）
    // //     currentStart = new Date(cycleEnd);
    // //     currentStart.setDate(currentStart.getDate() + 1);
    // //     currentStart.setHours(0, 0, 0, 0);
    // //   }
    //   // 按时间倒序排列并添加序号
    //   this.settlementCycles = cycles.reverse().map((item, index) => ({
    //     number: index + 1,
    //     ...item
    //   }));
    //   console.log('最终生成的结算周期:', this.settlementCycles);
    // },
    // // 计算周期结束日期（强制设置为15号）
    // calculateCycleEnd(startDate, cycleNumber) {
    //   const end = new Date(startDate);
    //   end.setMonth(end.getMonth() + cycleNumber);
    //   end.setDate(15); // 强制设置为当月15号
    //   // 处理跨年情况（12月+cycleNumber可能会超出）
    //   if (end.getMonth() !== (startDate.getMonth() + cycleNumber) % 12) {
    //     end.setFullYear(startDate.getFullYear() + Math.floor((startDate.getMonth() + cycleNumber) / 12));
    //   }
    //   return end;
    // },
    // // 保持原有格式方法
    // formatDate(date) {
    //   return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
    // },
    calculateAllSettlementCycles: function calculateAllSettlementCycles() {
      var _this$eligibilityInfo,
        _this5 = this;
      console.log('开始计算结算周期（最终排序修正版）');

      // 配置参数
      var SETTLEMENT_DAY = 15; // 固定结算日
      var FUTURE_CYCLES = 0; // 展示的未来周期数
      var MAX_LOOP = 100; // 安全计数器

      // 初始化数据
      this.settlementCycles = [];
      if (!((_this$eligibilityInfo = this.eligibilityInfo) !== null && _this$eligibilityInfo !== void 0 && _this$eligibilityInfo.createTime)) {
        console.warn('月结资格信息不完整');
        return;
      }

      // 解析输入参数
      var _this$eligibilityInfo2 = this.eligibilityInfo,
        createTime = _this$eligibilityInfo2.createTime,
        settlementCycle = _this$eligibilityInfo2.settlementCycle;
      var cycleMonths = {
        0: 1,
        1: 3,
        2: 6
      }[settlementCycle] || 1;
      var startDate = new Date(createTime.replace(/-/g, '/'));
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      // 准备数据结构
      var history = []; // 历史周期（正序存储）
      var current = null; // 当前周期
      var future = []; // 未来周期（正序存储）

      // 核心算法
      var cursor = new Date(startDate);
      var loopCount = 0;
      while (loopCount++ < MAX_LOOP) {
        // 计算周期结束日（强制15号）
        var cycleEnd = new Date(cursor);
        cycleEnd.setMonth(cycleEnd.getMonth() + cycleMonths);
        cycleEnd.setDate(SETTLEMENT_DAY);
        cycleEnd.setHours(23, 59, 59, 999);

        // 创建周期对象
        var cycle = {
          start: new Date(cursor),
          end: new Date(cycleEnd),
          isCurrent: cursor <= today && today <= cycleEnd,
          isFuture: cursor > today
        };

        // 分类存储
        if (cycle.end < today) {
          history.push(cycle); // 历史周期按生成顺序正序存储
        } else if (cycle.isCurrent) {
          current = cycle;
        } else {
          future.push(cycle);
        }

        // 移动游标到下一周期开始
        cursor = new Date(cycleEnd);
        cursor.setDate(cursor.getDate() + 1);
        cursor.setHours(0, 0, 0, 0);

        // 终止条件：生成足够未来周期且游标超过今天
        if (future.length >= FUTURE_CYCLES && cursor > today) break;
      }

      // 合并结果（历史正序 → 当前 → 未来正序）
      var final = [].concat(history); // 历史按时间正序
      if (current) final.push(current);
      final.push.apply(final, (0, _toConsumableArray2.default)(future.slice(0, FUTURE_CYCLES)));
      this.startDate = current.startDate;
      this.endDate = current.endDate;
      this.displayStartDate = current.startDate;
      this.displayEndDate = current.endDate;
      // 添加序号
      this.settlementCycles = final.map(function (c, i) {
        return {
          number: i + 1,
          startDate: _this5.formatDate(c.start),
          endDate: _this5.formatDate(c.end),
          isCurrent: c.isCurrent,
          isFuture: c.isFuture
        };
      });
      console.log('修正排序后的周期数据:', this.settlementCycles);
    },
    // 日期格式化保持原样
    formatDate: function formatDate(date) {
      var pad = function pad(n) {
        return n.toString().padStart(2, '0');
      };
      return "".concat(date.getFullYear(), "-").concat(pad(date.getMonth() + 1), "-").concat(pad(date.getDate()));
    },
    // // 计算所有历史结算周期 - 添加更多日志
    // calculateAllSettlementCycles() {
    // 	console.log('开始计算历史周期，当前资格信息:', this.eligibilityInfo)
    // 	if (!this.eligibilityInfo || !this.eligibilityInfo.createTime) {
    // 		console.warn('月结资格信息不完整，无法计算周期')
    // 		this.settlementCycles = []
    // 		return
    // 	}
    // 	const {
    // 		settlementCycle,
    // 		createTime,
    // 		tradeNumber
    // 	} = this.eligibilityInfo
    // 	console.log('周期计算参数:', {
    // 		settlementCycle,
    // 		createTime,
    // 		tradeNumber
    // 	})
    // 	// 解析创建时间
    // 	const createdAt = new Date(createTime.replace(/-/g, '/'))
    // 	const today = new Date()
    // 	// 如果资格已失效，则不计算
    // 	if (this.eligibilityInfo.status === 1) {
    // 		console.log('月结资格已失效')
    // 		this.settlementCycles = []
    // 		return
    // 	}
    // 	let cycles = []
    // 	let cyclesCount = 0
    // 	// 根据不同的结算周期计算
    // 	switch (settlementCycle) {
    // 		case 0: // 月结
    // 			cyclesCount = this.calculateMonthlyCycles(createdAt, today)
    // 			break
    // 		case 1: // 季结
    // 			cyclesCount = this.calculateQuarterlyCycles(createdAt, today)
    // 			break
    // 		case 2: // 半年结
    // 			cyclesCount = this.calculateHalfYearlyCycles(createdAt, today)
    // 			break
    // 		default:
    // 			cyclesCount = this.calculateMonthlyCycles(createdAt, today)
    // 	}
    // 	console.log('计算得到的周期数:', cyclesCount)
    // 	// 生成所有历史周期
    // 	for (let i = 0; i < cyclesCount; i++) {
    // 		const cyclePeriod = this.calculateCyclePeriod(createdAt, i, settlementCycle)
    // 		cycles.push({
    // 			number: cyclesCount - i,
    // 			startDate: this.formatDate(cyclePeriod.start),
    // 			endDate: this.formatDate(cyclePeriod.end),
    // 			isCurrent: cyclePeriod.isCurrent
    // 		})
    // 	}
    // 	this.settlementCycles = cycles
    // 	console.log('生成的周期列表长度:', this.settlementCycles.length)
    // 	// 如果没有生成任何周期，添加提示
    // 	if (this.settlementCycles.length === 0) {
    // 		console.warn('未计算出任何周期，可能是新创建的月结资格')
    // 	}
    // },
    // 计算周期的起止时间
    // calculateCyclePeriod(startDate, cycleIndex, settlementCycle) {
    // 	// 克隆日期，避免修改原始日期
    // 	const start = new Date(startDate.getTime())
    // 	const end = new Date(startDate.getTime())
    // 	const today = new Date()
    // 	// 月结的月份数
    // 	let monthsPerCycle = 1; // 默认月结
    // 	if (settlementCycle === 1) monthsPerCycle = 3; // 季结
    // 	if (settlementCycle === 2) monthsPerCycle = 6; // 半年结
    // 	// 设置开始日期 - 向后推指定月数
    // 	start.setMonth(start.getMonth() + cycleIndex * monthsPerCycle)
    // 	// 设置结束日期 - 开始日期后推指定月数，再减一天
    // 	end.setMonth(start.getMonth() + monthsPerCycle)
    // 	end.setDate(end.getDate() - 1)
    // 	// 判断是否为当前周期
    // 	const isCurrent = today >= start && today <= end
    // 	return {
    // 		start,
    // 		end,
    // 		isCurrent
    // 	}
    // },
    // 计算月结周期数
    // calculateMonthlyCycles(startDate, today) {
    // 	const months = (today.getFullYear() - startDate.getFullYear()) * 12 +
    // 		today.getMonth() - startDate.getMonth()
    // 	return months + 1 // 包含当前月
    // },
    // // 计算季结周期数
    // calculateQuarterlyCycles(startDate, today) {
    // 	const months = (today.getFullYear() - startDate.getFullYear()) * 12 +
    // 		today.getMonth() - startDate.getMonth()
    // 	return Math.floor(months / 3) + 1 // 每3个月一个周期
    // },
    // // 计算半年结周期数
    // calculateHalfYearlyCycles(startDate, today) {
    // 	const months = (today.getFullYear() - startDate.getFullYear()) * 12 +
    // 		today.getMonth() - startDate.getMonth()
    // 	return Math.floor(months / 6) + 1 // 每6个月一个周期
    // },
    // 修改周期选择方法，确保在不同标签下正确工作
    selectCycle: function selectCycle(index) {
      this.currentCycleIndex = index;
      this.showCyclePanel = false;
      var cycle = this.settlementCycles[index];

      // 如果选择"全部"选项
      if (cycle.isAll) {
        this.startDate = '';
        this.endDate = '';
        this.displayStartDate = '';
        this.displayEndDate = '';
      } else {
        // 设置日期范围为选中周期的范围，确保起止日期正确
        this.startDate = cycle.startDate;
        this.endDate = cycle.endDate;
        this.displayStartDate = cycle.startDate;
        this.displayEndDate = cycle.endDate;

        // 验证日期有效性（虽然从周期生成的日期应该总是有效的）
        if (this.startDate > this.endDate) {
          console.error('周期日期错误:', {
            startDate: this.startDate,
            endDate: this.endDate
          });
          uni.showToast({
            title: '周期日期错误，请手动选择日期',
            icon: 'none'
          });
          return;
        }
      }

      // 重新加载数据
      this.currentPage = 1;
      this.hasMoreData = true;
      this.loadStatements(true);
      this.getAllPrice();
    },
    // 添加全部周期选项 - 修改判断逻辑
    toggleCyclePanel: function toggleCyclePanel() {
      // 如果没有有效周期，不需要切换面板
      if (this.settlementCycles.length === 0) {
        uni.showToast({
          title: '暂无历史周期',
          icon: 'none'
        });
        return;
      }
      this.showCyclePanel = !this.showCyclePanel;

      // 只有当有多个周期时才添加"全部"选项
      if (this.showCyclePanel && this.settlementCycles.length > 1 && !this.hasAllPeriodsOption) {
        this.settlementCycles.unshift({
          number: '全部',
          startDate: '',
          endDate: '',
          isAll: true
        });
        this.hasAllPeriodsOption = true;
      }
    },
    // 修改结算账单方法
    settleStatements: function settleStatements() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var res, orderId, openId, payResult, startTime, endTime, _payResult;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!_this6.paymentLoading) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                _context5.prev = 2;
                _this6.paymentLoading = true;

                // 1. 修复这里 - uni.showModal 不能使用解构赋值
                _context5.next = 6;
                return uni.showModal({
                  title: '结算确认',
                  content: "\u786E\u8BA4\u652F\u4ED8 \xA5".concat(_this6.monthlyBill.treatSettlementAmount, " \u7684\u8D26\u5355\uFF1F"),
                  confirmText: '确认支付',
                  confirmColor: '#07C160'
                });
              case 6:
                res = _context5.sent;
                console.log('确认框结果:', res);

                // 如果用户取消，结束流程
                if (res.confirm) {
                  _context5.next = 11;
                  break;
                }
                _this6.paymentLoading = false;
                return _context5.abrupt("return");
              case 11:
                // 显示加载提示
                uni.showLoading({
                  title: '支付处理中',
                  mask: true
                });

                // 处理支付逻辑（保留您现有的代码）
                orderId = 'TEST' + new Date().getTime() + Math.floor(Math.random() * 1000);
                openId = uni.getStorageSync('openId');
                _context5.next = 16;
                return _wechat.default.processPayment(openId, orderId, _this6.monthlyBill.treatSettlementAmount, "用户" + _this6.userInfo.userName + "支付" + _this6.startDate + '至' + _this6.endDate + '月结账单，共:' + _this6.monthlyBill.treatSettlementAmount);
              case 16:
                payResult = _context5.sent;
                if (!payResult.success) {
                  _context5.next = 30;
                  break;
                }
                startTime = _this6.startDate || '';
                endTime = _this6.endDate || '';
                _context5.next = 22;
                return _statement.default.payBills(_this6.eligibilityId, startTime, endTime);
              case 22:
                _payResult = _context5.sent;
                if (!_payResult) {
                  _context5.next = 27;
                  break;
                }
                // 延迟2秒模拟支付过程
                setTimeout(function () {
                  uni.hideLoading();
                  uni.showToast({
                    title: '结算成功',
                    icon: 'success'
                  });

                  // 刷新数据
                  setTimeout(function () {
                    _this6.refreshData();
                    _this6.paymentLoading = false;
                  }, 1500);
                }, 2000);
                _context5.next = 28;
                break;
              case 27:
                throw new Error('支付账单失败');
              case 28:
                _context5.next = 33;
                break;
              case 30:
                // 支付失败
                console.log("支付结果:", payResult.message);
                if (!payResult.canceled) {
                  uni.showToast({
                    title: payResult.message,
                    icon: 'none'
                  });
                }
                return _context5.abrupt("return");
              case 33:
                _context5.next = 41;
                break;
              case 35:
                _context5.prev = 35;
                _context5.t0 = _context5["catch"](2);
                console.error('支付失败:', _context5.t0);
                uni.hideLoading();
                uni.showToast({
                  title: '支付失败: ' + (_context5.t0.message || '未知错误'),
                  icon: 'none'
                });
                _this6.paymentLoading = false;
              case 41:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 35]]);
      }))();
    },
    // 添加loadMoreData方法（负责触发加载更多）
    loadMoreData: function loadMoreData() {
      // 如果正在加载或没有更多数据，则不处理
      if (this.loading || !this.hasMoreData) {
        return;
      }
      console.log('触发加载更多数据...');
      // 页码加1
      this.currentPage++;
      // 调用加载方法，传入false表示追加模式
      this.loadStatements(false);
    },
    // 刷新数据时重置分页状态
    refreshData: function refreshData() {
      this.loadStatements(true);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 213:
/*!*****************************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/monthly/statement.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./statement.vue?vue&type=style&index=0&lang=scss& */ 214);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_statement_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 214:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/monthly/statement.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[207,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/views/monthly/statement.js.map