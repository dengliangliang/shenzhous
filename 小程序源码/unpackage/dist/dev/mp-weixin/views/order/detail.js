(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["views/order/detail"],{

/***/ 256:
/*!*********************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/main.js?{"page":"views%2Forder%2Fdetail"} ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./views/order/detail.vue */ 257));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 257:
/*!**************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/order/detail.vue ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_06b728c1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=06b728c1& */ 258);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 260);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&lang=scss& */ 262);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_06b728c1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_06b728c1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _detail_vue_vue_type_template_id_06b728c1___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "views/order/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 258:
/*!*********************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/order/detail.vue?vue&type=template&id=06b728c1& ***!
  \*********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_06b728c1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=06b728c1& */ 259);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_06b728c1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_06b728c1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_06b728c1___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_06b728c1___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 259:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/order/detail.vue?vue&type=template&id=06b728c1& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var m0 = _vm.getShippingStatusText(_vm.orderDetail.shippingStatus)
  var g0 = _vm.orderDetail.length
  var g1 = g0 ? _vm.orderDetail.length : null
  var m1 = _vm.showWeightDifference
    ? _vm.formatWeightForFee(_vm.orderDetail.estimatedItemWeight)
    : null
  var m2 = _vm.showWeightDifference
    ? _vm.formatWeightForFee(_vm.orderDetail.actualWeight)
    : null
  var g2 = [11, 2, 3].includes(_vm.orderDetail.orderStatus)
  var g3 = [3, 6, 10].includes(_vm.orderDetail.orderStatus)
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        g0: g0,
        g1: g1,
        m1: m1,
        m2: m2,
        g2: g2,
        g3: g3,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 260:
/*!***************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/order/detail.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 261);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 261:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/order/detail.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 38));
var _order = _interopRequireDefault(__webpack_require__(/*! @/api/order */ 75));
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      loading: true,
      orderId: '',
      orderDetail: {},
      expressCompanies: [{
        name: '顺丰速运',
        code: 'SF',
        logo: '/static/icon/顺丰.png'
      }, {
        name: '中通快递',
        code: 'ZTO',
        logo: '/static/icon/中通.png'
      }, {
        name: '圆通速递',
        code: 'YTO',
        logo: '/static/icon/圆通.png'
      }, {
        name: '韵达快递',
        code: 'YUND',
        logo: '/static/icon/韵达.png'
      }, {
        name: '百世快递',
        code: 'BEST',
        logo: '/static/icon/百世.png'
      }, {
        name: '申通快递',
        code: 'STO-INT',
        logo: '/static/icon/申通.png'
      }, {
        name: '京东快递',
        code: 'JD',
        logo: '/static/icon/京东.png'
      }, {
        name: '德邦快递',
        code: 'DBL',
        logo: '/static/icon/德邦.png'
      }, {
        name: '极兔速递',
        code: 'JT',
        logo: '/static/icon/极兔.png'
      }, {
        name: '跨越速运',
        code: 'KY',
        logo: '/static/icon/跨越.png'
      }, {
        name: '菜鸟裹裹',
        code: 'CAINIAO',
        logo: '/static/icon/菜鸟裹裹.png'
      }, {
        name: '菜鸟速递',
        code: 'CNSD',
        logo: '/static/icon/菜鸟速递.png'
      }, {
        name: '顺心捷达',
        code: 'SXJD',
        logo: '/static/icon/顺心捷达.png'
      }, {
        name: '壹米滴答',
        code: 'YMDD',
        logo: '/static/icon/壹米滴答.png'
      }],
      countdownTimer: null,
      countdownDisplay: ''
    };
  },
  computed: {
    statusIcon: function statusIcon() {
      var icons = {
        0: 'calendar',
        // 待取件
        1: 'paperplane',
        // 已取件
        2: 'car',
        // 运输中
        3: 'checkmarkempty',
        // 已签收
        6: 'info',
        // 异常
        10: 'closeempty' // 已取消
      };

      return icons[this.orderDetail.shippingStatus] || 'help';
    },
    statusText: function statusText() {
      var statusTexts = {
        0: '待取件',
        1: '已取件',
        2: '运输中',
        3: '已签收',
        6: '异常',
        10: '已取消'
      };
      return statusTexts[this.orderDetail.shippingStatus] || '未知状态';
    },
    statusDesc: function statusDesc() {
      var statusDescs = {
        0: '快递员即将上门取件，请保持电话畅通',
        1: '快递员已上门取件',
        2: '包裹正在运输中，请耐心等待',
        3: '包裹已签收，感谢您的使用',
        6: '包裹出现异常，请联系快递员',
        10: '订单已取消'
      };
      return statusDescs[this.orderDetail.shippingStatus] || '状态信息暂无';
    },
    payMethodText: function payMethodText() {
      var methods = {
        0: '线下寄付',
        1: '线下到付',
        2: '线上支付'
      };
      if (this.orderDetail.paymentMethod == 2) {
        if (this.orderDetail.orderStatus === 1) {
          return '微信支付';
        } else if (this.orderDetail.orderStatus === 4) {
          return '月结支付';
        } else if (this.orderDetail.orderStatus === 7) {
          return '线上到付未支付';
        } else if (this.orderDetail.orderStatus === 8) {
          return '线上到付已支付';
        }
      } else {
        return methods[this.orderDetail.paymentMethod] || '未知支付方式';
      }
    },
    expressLogo: function expressLogo() {
      var _this = this;
      var company = this.expressCompanies.find(function (c) {
        return c.code === _this.orderDetail.expressCode;
      });
      // 返回找到的公司图标，如果找不到则使用中通图标作为默认图标
      return company ? company.logo : '/static/icon/中通.png';
    },
    expressName: function expressName() {
      var _this2 = this;
      var company = this.expressCompanies.find(function (c) {
        return c.code === _this2.orderDetail.expressCode;
      });
      return company ? company.name : this.orderDetail.expressCode || '未知快递';
    },
    senderPhoneFormatted: function senderPhoneFormatted() {
      return this.formatPhone(this.orderDetail.senderPhone);
    },
    receiverPhoneFormatted: function receiverPhoneFormatted() {
      return this.formatPhone(this.orderDetail.receiverPhone);
    },
    // 是否显示重量差价区域
    showWeightDifference: function showWeightDifference() {
      return this.orderDetail.actualWeight > 0 && this.orderDetail.estimatedItemWeight > 0;
    },
    // 重量差额
    weightDifference: function weightDifference() {
      if (!this.orderDetail.actualWeight || !this.orderDetail.estimatedItemWeight) return 0;
      var diff = parseFloat(this.orderDetail.actualWeight) - parseFloat(this.orderDetail.estimatedItemWeight);
      return diff > 0 ? diff.toFixed(2) : 0;
    },
    // 计算差价金额
    priceDifference: function priceDifference() {
      // 优先使用服务器返回的差价金额
      if (this.orderDetail.orderPriceDifference) {
        return parseFloat(this.orderDetail.orderPriceDifference).toFixed(2);
      } else {
        return 0;
      }

      // // 如果没有服务器返回的差价，则进行本地计算
      // if (this.weightDifference <= 0) return 0

      // // 将差价计算逻辑提取到计算属性中
      // const estimatedWeightCalculated = this.formatWeightForFee(this.orderDetail.estimatedItemWeight)
      // const actualWeightCalculated = this.formatWeightForFee(this.orderDetail.actualWeight)

      // // 如果计算后的重量没有变化，则不产生差价
      // if (estimatedWeightCalculated >= actualWeightCalculated) return 0

      // // 计算每公斤的价格
      // const pricePerKg = this.orderDetail.orderTotalPrice / estimatedWeightCalculated

      // // 计算差价 = 单价 * (实际计费重量 - 预估计费重量)
      // const difference = pricePerKg * (actualWeightCalculated - estimatedWeightCalculated)

      // return difference.toFixed(2)
    },
    // 是否已补差价
    isPriceDifferencePaid: function isPriceDifferencePaid() {
      return this.orderDetail.isPriceDifferencePaid === 1;
    },
    // 是否需要支付差价
    needToPay: function needToPay() {
      if (!this.orderDetail.orderPriceDifference) return false;
      var diff = parseFloat(this.orderDetail.orderPriceDifference);
      return diff > 0 && this.orderDetail.isPriceDifferencePaid !== 1;
    },
    // 计算实付金额 = 订单总价 - 差价金额
    actualPayAmount: function actualPayAmount() {
      var totalPrice = parseFloat(this.orderDetail.orderTotalPrice || 0);
      if (this.orderDetail.orderStatus === 7) {
        return 0;
      }

      // 如果差价已支付，不需要从总价中减去差价
      if (this.orderDetail.isPriceDifferencePaid === 1) {
        return totalPrice.toFixed(2);
      }
      // 如果有差价且未支付，从总价中减去差价
      var priceDifference = parseFloat(this.orderDetail.orderPriceDifference || 0);
      return (totalPrice - priceDifference).toFixed(2);
    },
    // 是否显示倒计时
    showCountdown: function showCountdown() {
      return this.orderDetail.orderStatus === 7 && this.orderDetail.remainderTime && this.orderDetail.remainderTime > 0;
    }
  },
  onLoad: function onLoad(options) {
    this.orderId = options.orderId;
    this.loadOrderDetail();
  },
  methods: {
    loadOrderDetail: function loadOrderDetail() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this3.loading = true;
                _context.prev = 1;
                _context.next = 4;
                return _order.default.getOrderById(_this3.orderId);
              case 4:
                res = _context.sent;
                console.log(res);
                if (res) {
                  _this3.orderDetail = res || {};

                  // 初始化倒计时
                  if (_this3.showCountdown) {
                    _this3.initializeCountdown();
                  }

                  // 如果服务器返回的差价为0，但有实际重量差异，则计算并更新差价
                  if (_this3.orderDetail.actualWeight > 0 && (!_this3.orderDetail.orderPriceDifference || parseFloat(_this3.orderDetail.orderPriceDifference) === 0)) {
                    _this3.updatePriceDifference();
                  }
                } else {
                  uni.showToast({
                    title: '获取订单详情失败',
                    icon: 'none'
                  });
                }
                _context.next = 13;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                console.error('获取订单详情错误', _context.t0);
                uni.showToast({
                  title: '获取订单详情失败',
                  icon: 'none'
                });
              case 13:
                _context.prev = 13;
                _this3.loading = false;
                return _context.finish(13);
              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9, 13, 16]]);
      }))();
    },
    copyOrderNo: function copyOrderNo() {
      if (!this.orderDetail.orderNo) return;
      uni.setClipboardData({
        data: this.orderDetail.orderNo,
        success: function success() {
          uni.showToast({
            title: '复制成功',
            icon: 'success'
          });
        }
      });
    },
    formatPhone: function formatPhone(phone) {
      if (!phone) return '';
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    getShippingStatusText: function getShippingStatusText(status) {
      var texts = {
        0: '待取件',
        1: '已取件',
        2: '运输中',
        3: '已签收',
        10: '已取消',
        6: '异常'
      };
      return texts[status] || '未知状态';
    },
    goLogistics: function goLogistics() {
      if (!this.orderDetail.orderNo && !this.orderDetail.deliveryId) {
        uni.showToast({
          title: '暂无运单号',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url: "/views/logistics/logistics?orderNo=".concat(this.orderDetail.orderNo, "&trackingNumber=").concat(this.orderDetail.deliveryId || '', "&expressCode=").concat(this.orderDetail.expressCode)
      });
    },
    showCancelConfirm: function showCancelConfirm() {
      var _this4 = this;
      uni.showModal({
        title: '取消订单',
        content: '确定要取消该订单吗？',
        confirmColor: '#FF6B01',
        success: function success(res) {
          if (res.confirm) {
            _this4.cancelOrder();
          }
        }
      });
    },
    cancelOrder: function cancelOrder() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _order.default.cancelOrder(_this5.orderId);
              case 3:
                res = _context2.sent;
                if (res) {
                  uni.showToast({
                    title: '订单已取消',
                    icon: 'success'
                  });
                  // 重新加载订单详情
                  setTimeout(function () {
                    _this5.loadOrderDetail();
                  }, 1500);
                }
                _context2.next = 10;
                break;
              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                uni.showToast({
                  title: '取消订单失败',
                  icon: 'none'
                });
              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }))();
    },
    showDeleteConfirm: function showDeleteConfirm() {
      var _this6 = this;
      uni.showModal({
        title: '删除订单',
        content: '删除后订单将无法恢复，确定要删除吗？',
        confirmColor: '#FF4D4F',
        success: function success(res) {
          if (res.confirm) {
            _this6.deleteOrder();
          }
        }
      });
    },
    deleteOrder: function deleteOrder() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var res;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _order.default.deleteOrder(_this7.orderId);
              case 3:
                res = _context3.sent;
                if (res) {
                  uni.showToast({
                    title: '订单已删除',
                    icon: 'success'
                  });
                  setTimeout(function () {
                    uni.navigateBack();
                  }, 1500);
                }
                _context3.next = 10;
                break;
              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                uni.showToast({
                  title: '删除订单失败',
                  icon: 'none'
                });
              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }))();
    },
    // 重量计费格式化（向上取整）
    formatWeightForFee: function formatWeightForFee(weight) {
      if (!weight) return 0;
      var numWeight = parseFloat(weight);
      // 不足1kg按1kg计算
      if (numWeight <= 0) return 0;
      if (numWeight <= 1) return 1;
      // 超过1kg部分向上取整
      return Math.ceil(numWeight);
    },
    // 更新差价
    updatePriceDifference: function updatePriceDifference() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var priceDiff;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(_this8.orderDetail.orderPriceDifference && parseFloat(_this8.orderDetail.orderPriceDifference) > 0)) {
                  _context4.next = 3;
                  break;
                }
                console.log('使用服务器返回的差价:', _this8.orderDetail.orderPriceDifference);
                return _context4.abrupt("return");
              case 3:
                // 计算差价
                priceDiff = _this8.priceDifference;
                if (priceDiff > 0) {
                  // 只在界面上更新差价，不调用后端API
                  _this8.orderDetail.orderPriceDifference = priceDiff;
                  console.log('差价计算完成:', priceDiff);

                  // 服务器端暂未实现updateDifference接口，暂时只在前端显示
                  // 后续后端实现接口后可以取消下面注释的代码
                  /*
                  try {
                    // 调用API更新差价
                    const result = await orderApi.updatePriceDifference(this.orderId, priceDiff)
                    console.log('差价更新结果:', result)
                  } catch (error) {
                    console.error('更新差价失败:', error)
                    // 即使API失败，我们仍在UI上显示计算的差价
                  }
                  */
                }
              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 公共方法 - 创建基础请求数据
    createBaseRequestData: function createBaseRequestData(express) {
      var baseData = {
        deliveryBusiness: express.deliveryBusiness,
        channelId: express.typeId,
        pickUpStartTime: express.pickUpStartTime,
        pickUpEndTime: express.pickUpEndTime,
        deliveryType: express.expressCode,
        // 收件人信息
        receiveAddress: express.receiverDetailAddress || '',
        receiveMobile: express.receiverPhone,
        receiveTel: express.receiverTel || "",
        receiveName: express.receiverName,
        receiveProvince: express.receiverProvince,
        receiveCity: express.receiverCity,
        receiveDistrict: express.receiverDistrict,
        // 发件人信息
        senderAddress: express.senderDetailAddress || '',
        senderMobile: express.senderPhone,
        senderTel: express.senderTel || "",
        senderName: express.senderName,
        senderProvince: express.senderProvince,
        senderCity: express.senderCity,
        senderDistrict: express.senderDistrict,
        // 物品信息
        goods: express.goods || '',
        packageCount: 1,
        weight: express.estimatedItemWeight,
        // 其他公共参数
        customerType: "kd",
        guaranteeValueAmount: express.guaranteeValueAmount || 0,
        thirdNo: "TD" + Date.now(),
        remark: express.remark
      };

      // 体积参数处理
      if (this.hasVolumeDimensions(express)) {
        baseData.vloumLong = express.length;
        baseData.vloumWidth = express.width;
        baseData.vloumHeight = express.height;
      }
      return {
        businessParams: baseData
      };
    },
    // 辅助方法 - 判断是否有体积信息
    hasVolumeDimensions: function hasVolumeDimensions(express) {
      return express.length && express.width && express.height;
    },
    payAll: function payAll() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // 确认支付
                uni.showModal({
                  title: '支付全价',
                  content: "\u60A8\u9700\u652F\u4ED8\u5168\u4EF7 \xA5".concat(_this9.orderDetail.orderTotalPrice, "\uFF0C\u786E\u8BA4\u652F\u4ED8\uFF1F"),
                  confirmColor: '#FF6B01',
                  success: function () {
                    var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(res) {
                      var orderId, openId, description, payResult, requestData, expressRes;
                      return _regenerator.default.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!res.confirm) {
                                _context5.next = 32;
                                break;
                              }
                              _context5.prev = 1;
                              orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                              openId = uni.getStorageSync('openId');
                              description = "\u795E\u5DDE\u90AE-\u7EBF\u4E0A\u5230\u4ED8\u5FEB\u9012\u8D39\u652F\u4ED8";
                              _context5.next = 7;
                              return _wechat.default.processPayment(openId, orderId, _this9.orderDetail.orderTotalPrice, description);
                            case 7:
                              payResult = _context5.sent;
                              if (!payResult.success) {
                                _context5.next = 25;
                                break;
                              }
                              // 更新订单状态为已支付
                              requestData = _this9.createBaseRequestData(order);
                              requestData.businessParams.onlinePay = "N";
                              requestData.businessParams.payMethod = express.payMethod;
                              _context5.next = 14;
                              return expressApi.createExpress(requestData);
                            case 14:
                              expressRes = _context5.sent;
                              if (expressRes) {
                                _context5.next = 19;
                                break;
                              }
                              throw new Error('快递下单失败');
                            case 19:
                              _context5.next = 21;
                              return _order.default.updateOrderStatus(_this9.orderDetail.orderId, 8, '', orderId, expressRes.orderNo, expressRes.deliveryId);
                            case 21:
                              uni.showToast({
                                title: '支付成功',
                                icon: 'success'
                              });

                              // 更新订单状态为已支付

                              // 刷新订单列表
                              _this9.loadOrderDetail();
                              _context5.next = 26;
                              break;
                            case 25:
                              uni.showToast({
                                title: payResult.message || '支付失败',
                                icon: 'none'
                              });
                            case 26:
                              _context5.next = 32;
                              break;
                            case 28:
                              _context5.prev = 28;
                              _context5.t0 = _context5["catch"](1);
                              console.error('支付过程错误:', _context5.t0);
                              uni.showToast({
                                title: _context5.t0.message || '支付失败',
                                icon: 'none'
                              });
                            case 32:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5, null, [[1, 28]]);
                    }));
                    function success(_x) {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    // 支付差价
    payDifference: function payDifference() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var orderPriceDifference;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(!_this10.orderDetail.orderPriceDifference || parseFloat(_this10.orderDetail.orderPriceDifference) <= 0)) {
                  _context9.next = 3;
                  break;
                }
                uni.showToast({
                  title: '无需支付差价',
                  icon: 'none'
                });
                return _context9.abrupt("return");
              case 3:
                orderPriceDifference = 0;
                if (_this10.orderDetail.orderStatus === 7) {
                  orderPriceDifference = _this10.orderDetail.orderTotalPrice;
                  // 确认支付
                  uni.showModal({
                    title: '支付全价',
                    content: "\u8BA2\u5355\u5B9E\u9645\u91CD\u91CF\u8D85\u51FA\u9884\u4F30\uFF0C\u9700\u5168\u4EF7 \xA5".concat(orderPriceDifference, "\uFF0C\u786E\u8BA4\u652F\u4ED8\uFF1F"),
                    confirmColor: '#FF6B01',
                    success: function () {
                      var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(res) {
                        var orderId, openId, description, payResult, requestData, expressRes;
                        return _regenerator.default.wrap(function _callee7$(_context7) {
                          while (1) {
                            switch (_context7.prev = _context7.next) {
                              case 0:
                                if (!res.confirm) {
                                  _context7.next = 38;
                                  break;
                                }
                                _context7.prev = 1;
                                orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                                openId = uni.getStorageSync('openId');
                                description = "\u795E\u5DDE\u90AE-\u7EBF\u4E0A\u5230\u4ED8\u5FEB\u9012\u8D39\u652F\u4ED8";
                                _context7.next = 7;
                                return _wechat.default.processPayment(openId, _this10.orderDetail.wechatId, orderPriceDifference, description);
                              case 7:
                                payResult = _context7.sent;
                                if (!payResult.success) {
                                  _context7.next = 30;
                                  break;
                                }
                                requestData = _this10.createBaseRequestData(order);
                                requestData.businessParams.onlinePay = "N";
                                requestData.businessParams.payMethod = express.payMethod;
                                _context7.next = 14;
                                return expressApi.createExpress(requestData);
                              case 14:
                                expressRes = _context7.sent;
                                if (expressRes) {
                                  _context7.next = 19;
                                  break;
                                }
                                throw new Error('快递下单失败');
                              case 19:
                                if (!(order.orderPriceDifference && order.orderPriceDifference !== 0.00 && order.isPriceDifferencePaid == 0)) {
                                  _context7.next = 24;
                                  break;
                                }
                                _context7.next = 22;
                                return _order.default.updateOrderStatus(order.orderId, 8, 1, orderId, expressRes.orderNo, expressRes.deliveryId);
                              case 22:
                                _context7.next = 26;
                                break;
                              case 24:
                                _context7.next = 26;
                                return _order.default.updateOrderStatus(order.orderId, 8, '', orderId, expressRes.orderNo, expressRes.deliveryId);
                              case 26:
                                uni.showToast({
                                  title: '支付成功',
                                  icon: 'success'
                                });

                                // 更新订单状态为已支付

                                // 刷新订单列表
                                _this10.loadOrderDetail();
                                _context7.next = 31;
                                break;
                              case 30:
                                uni.showToast({
                                  title: payResult.message || '支付失败',
                                  icon: 'none'
                                });
                              case 31:
                                _context7.next = 37;
                                break;
                              case 33:
                                _context7.prev = 33;
                                _context7.t0 = _context7["catch"](1);
                                console.error('支付过程错误:', _context7.t0);
                                uni.showToast({
                                  title: _context7.t0.message || '支付失败',
                                  icon: 'none'
                                });
                              case 37:
                                // 更新订单状态为已支付

                                // 刷新订单列表
                                _this10.loadOrderDetail();
                              case 38:
                              case "end":
                                return _context7.stop();
                            }
                          }
                        }, _callee7, null, [[1, 33]]);
                      }));
                      function success(_x2) {
                        return _success2.apply(this, arguments);
                      }
                      return success;
                    }()
                  });
                } else {
                  orderPriceDifference = _this10.orderDetail.orderPriceDifference;
                  // 确认支付
                  uni.showModal({
                    title: '支付差价',
                    content: "\u8BA2\u5355\u5B9E\u9645\u91CD\u91CF\u8D85\u51FA\u9884\u4F30\uFF0C\u9700\u8865\u5DEE\u4EF7 \xA5".concat(orderPriceDifference, "\uFF0C\u786E\u8BA4\u652F\u4ED8\uFF1F"),
                    confirmColor: '#FF6B01',
                    success: function () {
                      var _success3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(res) {
                        var orderId, openId, description, payResult;
                        return _regenerator.default.wrap(function _callee8$(_context8) {
                          while (1) {
                            switch (_context8.prev = _context8.next) {
                              case 0:
                                if (!res.confirm) {
                                  _context8.next = 27;
                                  break;
                                }
                                _context8.prev = 1;
                                orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                                openId = uni.getStorageSync('openId');
                                description = "\u795E\u5DDE\u90AE-\u7EBF\u4E0A\u5230\u4ED8\u5FEB\u9012\u8D39\u652F\u4ED8";
                                _context8.next = 7;
                                return _wechat.default.processPayment(openId, _this10.orderDetail.wechatId, orderPriceDifference, description);
                              case 7:
                                payResult = _context8.sent;
                                if (!payResult.success) {
                                  _context8.next = 20;
                                  break;
                                }
                                uni.showToast({
                                  title: '支付成功',
                                  icon: 'success'
                                });
                                if (!(_this10.orderDetail.orderPriceDifference && _this10.orderDetail.orderPriceDifference !== 0.00 && _this10.orderDetail.isPriceDifferencePaid == 0)) {
                                  _context8.next = 15;
                                  break;
                                }
                                _context8.next = 13;
                                return _order.default.updateOrderStatus(_this10.orderDetail.orderId, 8, 1, _this10.orderDetail.wechatId, _this10.orderDetail.orderNo, _this10.this.orderDetail.deliveryId);
                              case 13:
                                _context8.next = 17;
                                break;
                              case 15:
                                _context8.next = 17;
                                return _order.default.updateOrderStatus(_this10.orderDetail.orderId, 8, '', _this10.orderDetail.wechatId, _this10.orderDetail.orderNo, _this10.this.orderDetail.deliveryId);
                              case 17:
                                // 更新订单状态为已支付

                                // 刷新订单列表
                                _this10.loadOrderDetail();
                                _context8.next = 21;
                                break;
                              case 20:
                                uni.showToast({
                                  title: payResult.message || '支付失败',
                                  icon: 'none'
                                });
                              case 21:
                                _context8.next = 27;
                                break;
                              case 23:
                                _context8.prev = 23;
                                _context8.t0 = _context8["catch"](1);
                                console.error('支付过程错误:', _context8.t0);
                                uni.showToast({
                                  title: _context8.t0.message || '支付失败',
                                  icon: 'none'
                                });
                              case 27:
                              case "end":
                                return _context8.stop();
                            }
                          }
                        }, _callee8, null, [[1, 23]]);
                      }));
                      function success(_x3) {
                        return _success3.apply(this, arguments);
                      }
                      return success;
                    }()
                  });
                }
              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    // 初始化倒计时
    initializeCountdown: function initializeCountdown() {
      var _this11 = this;
      // 清除之前可能存在的定时器
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
      }

      // 设置初始显示
      this.countdownDisplay = this.formatTime(this.orderDetail.remainderTime);

      // 创建新的定时器，每秒更新一次
      this.countdownTimer = setInterval(function () {
        // 每秒减少1000毫秒
        _this11.orderDetail.remainderTime -= 1000;
        if (_this11.orderDetail.remainderTime <= 0) {
          // 倒计时结束
          clearInterval(_this11.countdownTimer);
          _this11.orderDetail.remainderTime = 0;
          _this11.countdownDisplay = '00:00:00';

          // 当倒计时结束时刷新订单详情
          setTimeout(function () {
            _this11.loadOrderDetail();
          }, 1000);
        } else {
          // 更新显示
          _this11.countdownDisplay = _this11.formatTime(_this11.orderDetail.remainderTime);
        }
      }, 1000);
    },
    // 格式化时间为 HH:MM:SS
    formatTime: function formatTime(milliseconds) {
      if (!milliseconds || milliseconds <= 0) return '00:00:00';
      var totalSeconds = Math.floor(milliseconds / 1000);
      var hours = Math.floor(totalSeconds / 3600);
      var minutes = Math.floor(totalSeconds % 3600 / 60);
      var seconds = totalSeconds % 60;
      return "".concat(hours.toString().padStart(2, '0'), ":").concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
    }
  },
  onUnload: function onUnload() {
    // 清除倒计时定时器
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  },
  onHide: function onHide() {
    // 当页面隐藏时也清除定时器，避免在后台持续运行
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 262:
/*!************************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/order/detail.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&lang=scss& */ 263);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 263:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/order/detail.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[256,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/views/order/detail.js.map