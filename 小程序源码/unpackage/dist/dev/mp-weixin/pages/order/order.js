(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/order"],{

/***/ 69:
/*!********************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/main.js?{"page":"pages%2Forder%2Forder"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _order = _interopRequireDefault(__webpack_require__(/*! ./pages/order/order.vue */ 70));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_order.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 70:
/*!*************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/pages/order/order.vue ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _order_vue_vue_type_template_id_127632e4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order.vue?vue&type=template&id=127632e4& */ 71);
/* harmony import */ var _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order.vue?vue&type=script&lang=js& */ 73);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./order.vue?vue&type=style&index=0&lang=scss& */ 81);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _order_vue_vue_type_template_id_127632e4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _order_vue_vue_type_template_id_127632e4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _order_vue_vue_type_template_id_127632e4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/order/order.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 71:
/*!********************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/pages/order/order.vue?vue&type=template&id=127632e4& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_127632e4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=template&id=127632e4& */ 72);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_127632e4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_127632e4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_127632e4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_127632e4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 72:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/pages/order/order.vue?vue&type=template&id=127632e4& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = !!_vm.isLogin ? _vm.orderList.length === 0 && !_vm.loading : null
  var l0 =
    !!_vm.isLogin && !g0
      ? _vm.__map(_vm.orderList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m0 = _vm.getPaymentMethodText(item)
          var m1 = m0 ? _vm.getPaymentMethodText(item) : null
          var m2 = _vm.getStatusClass(item.shippingStatus)
          var m3 = _vm.getStatusText(item.shippingStatus)
          var m4 =
            item.remainderTime && item.remainderTime > 0
              ? _vm.formatCountdown(item.remainderTime, item.orderId)
              : null
          var m5 = _vm.getExpressLogo(item.expressCode)
          var m6 = _vm.getExpressName(item.expressCode)
          var m7 = item.insuranceFee && Number(item.insuranceFee) > 0
          var g1 = m7
            ? Number(item.orderTotalPrice - item.insuranceFee || 0).toFixed(2)
            : null
          var m8 = item.insuranceFee && Number(item.insuranceFee) > 0
          var g2 = m8 ? Number(item.insuranceFee || 0).toFixed(2) : null
          var m9 = _vm.getTotalPrice(item)
          var g3 = [1, 2, 3].includes(item.shippingStatus)
          var g4 =
            [3, 6, 10].includes(item.shippingStatus) && _vm.currentStatus !== 9
          return {
            $orig: $orig,
            m0: m0,
            m1: m1,
            m2: m2,
            m3: m3,
            m4: m4,
            m5: m5,
            m6: m6,
            m7: m7,
            g1: g1,
            m8: m8,
            g2: g2,
            m9: m9,
            g3: g3,
            g4: g4,
          }
        })
      : null
  var g5 = !!_vm.isLogin && !g0 ? _vm.orderList.length : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.searchFocused = true
    }
    _vm.e1 = function ($event) {
      _vm.searchFocused = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        l0: l0,
        g5: g5,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 73:
/*!**************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/pages/order/order.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=script&lang=js& */ 74);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 74:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/pages/order/order.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vuex = __webpack_require__(/*! vuex */ 34);
var _order = _interopRequireDefault(__webpack_require__(/*! @/api/order */ 75));
var _express = _interopRequireDefault(__webpack_require__(/*! @/api/express */ 76));
var _commissionFlow = _interopRequireDefault(__webpack_require__(/*! @/api/commissionFlow */ 77));
var _statement2 = _interopRequireDefault(__webpack_require__(/*! @/api/statement */ 78));
var _payment = _interopRequireDefault(__webpack_require__(/*! @/api/payment */ 79));
var _user = _interopRequireDefault(__webpack_require__(/*! @/api/user */ 39));
var _wechat = _interopRequireDefault(__webpack_require__(/*! @/api/wechat.js */ 80));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      loading: false,
      refreshing: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      orderList: [],
      isLogin: false,
      searchValue: '',
      // 搜索值
      searchFocused: false,
      // 搜索框焦点状态
      countdownTimers: {},
      // 存储倒计时定时器
      countdownValues: {},
      // 存储倒计时当前值
      expressMap: {
        'SF': {
          name: '顺丰速运',
          icon: '顺丰'
        },
        'ZTO': {
          name: '中通快递',
          icon: '中通'
        },
        'YTO': {
          name: '圆通速递',
          icon: '圆通'
        },
        'YUND': {
          name: '韵达快递',
          icon: '韵达'
        },
        'BEST': {
          name: '百世快递',
          icon: '百世'
        },
        'STO-INT': {
          name: '申通快递',
          icon: '申通'
        },
        'JD': {
          name: '京东快递',
          icon: '京东'
        },
        'DOP': {
          name: '德邦快递',
          icon: '德邦'
        },
        'JT': {
          name: '极兔速递',
          icon: '极兔'
        },
        'KY': {
          name: '跨越速运',
          icon: '跨越'
        },
        'CAINIAO': {
          name: '菜鸟裹裹',
          icon: '菜鸟裹裹'
        },
        'CNSD': {
          name: '菜鸟速递',
          icon: '菜鸟速递'
        },
        'SXJD': {
          name: '顺心捷达',
          icon: '顺心捷达'
        },
        'YMDD': {
          name: '壹米滴答',
          icon: '壹米滴答'
        }
      },
      currentStatus: -1,
      // 默认显示全部订单
      statusList: [{
        label: '全部',
        value: -1
      },
      // { label: '待付款', value: 0 },、
      {
        label: '到付单',
        value: 9
      }, {
        label: '待取件',
        value: 0
      }, {
        label: '运输中',
        value: 2
      }, {
        label: '已送达',
        value: 3
      }, {
        label: '已取消',
        value: 10
      }]
    };
  },
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)('user', ['userInfo'])), {}, {
    hasMore: function hasMore() {
      return this.orderList.length < this.total;
    }
  }),
  onLoad: function onLoad(options) {
    // 接收并处理路由参数中的状态值
    if (options.status !== undefined) {
      this.currentStatus = Number(options.status);
    }
  },
  onShow: function onShow() {
    // 从全局变量获取
    var status = getApp().globalData.orderStatus;

    // 从vuex获取
    // const status = this.$store.state.orderStatus

    // 从缓存获取
    // const status = uni.getStorageSync('orderStatus')

    if (status) {
      // 使用status处理你的逻辑
      console.log('订单状态:', status);
      if (status == 1) {
        this.currentStatus = 0;
      } else if (status == 2) {
        this.currentStatus = 1;
      } else if (status == 3) {
        this.currentStatus = 3;
      }
      // 使用后清除（避免下次进入仍保留）
      getApp().globalData.orderStatus = null;
    }
    this.checkLogin();

    // 检查是否有来自首页的搜索参数
    var searchValue = uni.getStorageSync('orderSearchValue');
    if (searchValue) {
      this.searchValue = searchValue;
      // 使用完成后清除本地存储的搜索值，避免影响下次进入
      uni.removeStorageSync('orderSearchValue');
    }
    if (this.isLogin) {
      this.refreshList();
    }
  },
  methods: {
    // 检查登录状态
    checkLogin: function checkLogin() {
      this.isLogin = !!this.userInfo && !!this.userInfo.userId;
    },
    // 去登录
    goLogin: function goLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    },
    // 检查登录并提示
    checkLoginWithTip: function checkLoginWithTip() {
      var userInfo = this.$store.getters['user/getUserInfo'];
      if (!userInfo || !userInfo.userId) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return false;
      } else {
        if (userInfo.isReal !== 2) {
          uni.showToast({
            title: '请先实名',
            icon: 'none'
          });
          return false;
        }
      }
      return true;
    },
    // 去寄快递
    goSend: function goSend() {
      if (!this.checkLoginWithTip()) return;
      uni.navigateTo({
        url: '/views/express/send'
      });
    },
    // 搜索订单
    onSearch: function onSearch() {
      this.refreshList();
    },
    // 清除搜索
    clearSearch: function clearSearch() {
      this.searchValue = '';
      this.refreshList();
    },
    // 刷新列表
    refreshList: function refreshList() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.pageNum = 1;
                _this.orderList = [];
                _context.next = 4;
                return _this.getOrderList();
              case 4:
                if (_this.refreshing) {
                  _this.refreshing = false;
                  uni.stopPullDownRefresh();
                }
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    // 加载更多
    loadMore: function loadMore() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this2.loading || !_this2.hasMore)) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _this2.pageNum++;
                _context2.next = 5;
                return _this2.getOrderList();
              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 下拉刷新
    onRefresh: function onRefresh() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.refreshing = true;
                _context3.next = 3;
                return _this3.refreshList();
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 获取订单列表
    getOrderList: function getOrderList() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var parms, res;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _this4.loading = true;
                parms = {};
                if (_this4.currentStatus === 9) {
                  parms = {
                    pageNum: _this4.pageNum,
                    pageSize: _this4.pageSize,
                    userId: '',
                    orderStatus: '',
                    paymentMethod: '',
                    shippingStatus: '',
                    isPriceDifferencePaid: '',
                    searchValue: _this4.searchValue,
                    // 添加搜索参数
                    phone: _this4.currentStatus === 9 ? _this4.userInfo.phone : ''
                  };
                } else {
                  parms = {
                    pageNum: _this4.pageNum,
                    pageSize: _this4.pageSize,
                    userId: _this4.userInfo.userId,
                    orderStatus: '',
                    paymentMethod: '',
                    shippingStatus: _this4.currentStatus === -1 ? '' : _this4.currentStatus,
                    isPriceDifferencePaid: '',
                    searchValue: _this4.searchValue,
                    // 添加搜索参数
                    phone: ''
                  };
                }
                _context4.next = 6;
                return _order.default.getOrderPage(parms);
              case 6:
                res = _context4.sent;
                console.log(res);
                if (res) {
                  if (_this4.pageNum === 1) {
                    _this4.orderList = res.dataList || [];
                  } else {
                    _this4.orderList = [].concat((0, _toConsumableArray2.default)(_this4.orderList), (0, _toConsumableArray2.default)(res.dataList || []));
                  }
                  _this4.total = res.totalPages || 0;
                } else {
                  _this4.orderList = [];
                  _this4.total = 0;
                  uni.showToast({
                    title: res.msg || '获取订单列表失败',
                    icon: 'none'
                  });
                }
                _context4.next = 15;
                break;
              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                console.error(_context4.t0);
                uni.showToast({
                  title: '获取订单列表失败',
                  icon: 'none'
                });
              case 15:
                _context4.prev = 15;
                _this4.loading = false;
                return _context4.finish(15);
              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11, 15, 18]]);
      }))();
    },
    // 获取状态文本
    getStatusText: function getStatusText(status) {
      switch (Number(status)) {
        case 0:
          return '待取件';
        case 1:
          return '已取件';
        case 2:
          return '运输中';
        case 3:
          return '已签收';
        case 6:
          return '异常';
        case 10:
          return '已取消';
        default:
          return '未知状态';
      }
    },
    // 获取状态样式类
    getStatusClass: function getStatusClass(status) {
      switch (Number(status)) {
        case 0:
          return 'status-wait-pay';
        case 1:
          return 'status-wait-pick';
        case 11:
          return 'status-picked';
        case 2:
          return 'status-shipping';
        case 3:
          return 'status-delivered';
        case 6:
          return 'status-exception';
        case 10:
          return 'status-canceled';
        default:
          return '';
      }
    },
    // 获取支付方式文本
    getPaymentMethodText: function getPaymentMethodText(item) {
      var paymentMethod = Number(item.paymentMethod);
      var orderStatus = Number(item.orderStatus);
      if (paymentMethod === 0) {
        return "线下寄付";
      } else if (paymentMethod === 1) {
        return "线下到付";
      } else if (paymentMethod === 2) {
        if (orderStatus === 1) {
          return "微信支付";
        } else if (orderStatus === 4) {
          return "月结支付";
        } else if (orderStatus === 7) {
          return "待支付";
        } else if (orderStatus === 8) {
          return "已支付";
        } else {
          return "在线支付";
        }
      } else {
        return "";
      }
    },
    // 计算总价（订单价格+保险费）
    getTotalPrice: function getTotalPrice(item) {
      var orderPrice = Number(item.orderTotalPrice || 0);
      // const insuranceFee = Number(item.insuranceFee || 0);
      return orderPrice.toFixed(2);
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
    // 处理支付
    handlePay: function handlePay(order) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var orderId, openId, amount, description, payResult, requestData, expressRes;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                uni.showLoading({
                  title: '准备支付...',
                  mask: true
                });
                // 	let orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                // const requestData = this.createBaseRequestData(order);
                // requestData.businessParams.onlinePay = "N";
                // requestData.businessParams.payMethod = "30";
                // let expressRes = {
                // 	orderNo:'测试',
                // 	deliveryId:'测试'
                // }
                // console.log(order)
                // if (order.orderPriceDifference && order.orderPriceDifference !== 0.00 && order
                // 	.isPriceDifferencePaid == 0) {
                // 	await orderApi.updateOrderStatus(order.orderId, 8, 1, orderId,expressRes.orderNo,expressRes.deliveryId);
                // } else {
                // 	await orderApi.updateOrderStatus(order.orderId, 8, '', orderId,expressRes.orderNo,expressRes.deliveryId);
                // }
                _context5.prev = 2;
                orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000); // 使用processPayment方法处理完整支付流程
                openId = uni.getStorageSync('openId'); // 发起支付流程
                amount = 0;
                if (order.orderPriceDifference && order.orderPriceDifference !== 0.00 && order.isPriceDifferencePaid == 0) {
                  amount = order.amountAfterCommissionDeduction + order.orderPriceDifference;
                } else {
                  amount = order.amountAfterCommissionDeduction;
                }
                description = "\u795E\u5DDE\u90AE-\u7EBF\u4E0A\u5230\u4ED8\u5FEB\u9012\u8D39\u652F\u4ED8";
                _context5.next = 10;
                return _wechat.default.processPayment(openId, orderId, amount, description);
              case 10:
                payResult = _context5.sent;
                if (!payResult.success) {
                  _context5.next = 33;
                  break;
                }
                // 更新订单状态为已支付
                requestData = _this5.createBaseRequestData(order);
                requestData.businessParams.onlinePay = "N";
                requestData.businessParams.payMethod = express.payMethod;
                _context5.next = 17;
                return _express.default.createExpress(requestData);
              case 17:
                expressRes = _context5.sent;
                if (expressRes) {
                  _context5.next = 22;
                  break;
                }
                throw new Error('快递下单失败');
              case 22:
                if (!(order.orderPriceDifference && order.orderPriceDifference !== 0.00 && order.isPriceDifferencePaid == 0)) {
                  _context5.next = 27;
                  break;
                }
                _context5.next = 25;
                return _order.default.updateOrderStatus(order.orderId, 8, 1, orderId, expressRes.orderNo, expressRes.deliveryId);
              case 25:
                _context5.next = 29;
                break;
              case 27:
                _context5.next = 29;
                return _order.default.updateOrderStatus(order.orderId, 8, '', orderId, expressRes.orderNo, expressRes.deliveryId);
              case 29:
                uni.showToast({
                  title: '支付成功',
                  icon: 'success'
                });
                // 刷新订单列表
                _this5.refreshList();
                _context5.next = 34;
                break;
              case 33:
                uni.showToast({
                  title: payResult.message || '支付失败',
                  icon: 'none'
                });
              case 34:
                _context5.next = 40;
                break;
              case 36:
                _context5.prev = 36;
                _context5.t0 = _context5["catch"](2);
                console.error('支付过程错误:', _context5.t0);
                uni.showToast({
                  title: _context5.t0.message || '支付失败',
                  icon: 'none'
                });
              case 40:
                _context5.next = 46;
                break;
              case 42:
                _context5.prev = 42;
                _context5.t1 = _context5["catch"](0);
                console.error('处理支付错误:', _context5.t1);
                uni.showToast({
                  title: '支付操作失败',
                  icon: 'none'
                });
              case 46:
                _context5.prev = 46;
                uni.hideLoading();
                return _context5.finish(46);
              case 49:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 42, 46, 49], [2, 36]]);
      }))();
    },
    // 获取快递公司名称
    getExpressName: function getExpressName(code) {
      var _this$expressMap$code;
      return code ? ((_this$expressMap$code = this.expressMap[code]) === null || _this$expressMap$code === void 0 ? void 0 : _this$expressMap$code.name) || '未知快递' : '未知快递';
    },
    // 获取快递公司Logo
    getExpressLogo: function getExpressLogo(code) {
      var _this$expressMap$code2;
      var defaultIcon = '/static/icon/default.png'; // 添加一个默认图标
      return code ? "/static/icon/".concat(((_this$expressMap$code2 = this.expressMap[code]) === null || _this$expressMap$code2 === void 0 ? void 0 : _this$expressMap$code2.icon) || 'default', ".png") : defaultIcon;
    },
    // 跳转订单详情
    goDetail: function goDetail(orderId) {
      uni.navigateTo({
        url: "/views/order/detail?orderId=".concat(orderId)
      });
    },
    // 查看物流
    goLogistics: function goLogistics(orderId, orderNo) {
      uni.navigateTo({
        url: "/views/order/logistics?orderId=".concat(orderId, "&orderNo=").concat(orderNo)
      });
    },
    // 显示取消确认
    showCancelConfirm: function showCancelConfirm(order) {
      var _this6 = this;
      uni.showModal({
        title: '取消订单',
        content: '确定要取消该订单吗？',
        confirmColor: '#FF6B01',
        success: function () {
          var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(res) {
            return _regenerator.default.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!res.confirm) {
                      _context6.next = 3;
                      break;
                    }
                    _context6.next = 3;
                    return _this6.cancelOrder(order);
                  case 3:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));
          function success(_x) {
            return _success.apply(this, arguments);
          }
          return success;
        }()
      });
    },
    // 取消订单
    cancelOrder: function cancelOrder(order) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                try {
                  uni.showLoading({
                    title: '取消中...',
                    mask: true
                  });
                  _order.default.cancelOrder(order.orderId).then( /*#__PURE__*/function () {
                    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(r1) {
                      var params;
                      return _regenerator.default.wrap(function _callee8$(_context8) {
                        while (1) {
                          switch (_context8.prev = _context8.next) {
                            case 0:
                              params = {
                                businessParams: {
                                  deliveryId: order.deliveryId,
                                  deliveryType: order.deliveryType
                                }
                              };
                              _express.default.cancelExpress(params).then( /*#__PURE__*/function () {
                                var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(r2) {
                                  var statement, refundAmount, commissionRefund, commissionResult, userResult, _refundAmount, _statement, _refundAmount2;
                                  return _regenerator.default.wrap(function _callee7$(_context7) {
                                    while (1) {
                                      switch (_context7.prev = _context7.next) {
                                        case 0:
                                          if (!r2) {
                                            _context7.next = 77;
                                            break;
                                          }
                                          if (!(order.paymentMethod === 2)) {
                                            _context7.next = 72;
                                            break;
                                          }
                                          if (!(order.commissionDeductionAmount === 0)) {
                                            _context7.next = 21;
                                            break;
                                          }
                                          if (!(order.orderStatus === 4)) {
                                            _context7.next = 18;
                                            break;
                                          }
                                          statement = {
                                            userId: _this7.userInfo.userId,
                                            monthlySettlementEligibilityId: _this7.userInfo.monthlySettlementEligibilityId,
                                            orderId: order.orderId,
                                            type: 1,
                                            // 1表示退款
                                            isUserPays: 0,
                                            amount: order.orderTotalPrice
                                          };
                                          _context7.prev = 5;
                                          _context7.next = 8;
                                          return _statement2.default.createStatement(statement);
                                        case 8:
                                          console.log('月结退款记录创建成功');
                                          _context7.next = 16;
                                          break;
                                        case 11:
                                          _context7.prev = 11;
                                          _context7.t0 = _context7["catch"](5);
                                          console.error('月结退款记录创建失败', _context7.t0);
                                          uni.showToast({
                                            title: '订单已取消，但退款记录创建失败',
                                            icon: 'none',
                                            duration: 2000
                                          });
                                          return _context7.abrupt("return");
                                        case 16:
                                          _context7.next = 19;
                                          break;
                                        case 18:
                                          if (order.orderStatus === 1 || order.orderStatus === 8) {
                                            // 计算总退款金额（订单总价 + 保险费）
                                            refundAmount = order.orderTotalPrice + (order.insuranceFee || 0);
                                            _wechat.default.applyRefund(order.wechatId, refundAmount, '快递取消退款').then(function (result) {
                                              if (result.success) {
                                                // 退款申请成功，可以提示用户
                                                console.log('退款申请已提交，退款单号:', order.wechatId);
                                              } else {
                                                // 退款申请失败
                                                console.error('退款申请失败:', result.message);
                                              }
                                            }).catch(function (error) {
                                              console.error('退款申请异常:', error);
                                            });
                                          }
                                        case 19:
                                          _context7.next = 70;
                                          break;
                                        case 21:
                                          if (!(order.commissionDeductionAmount !== 0)) {
                                            _context7.next = 70;
                                            break;
                                          }
                                          // 佣金抵扣不为0的情况，首先创建佣金支付退款记录
                                          commissionRefund = {
                                            userId: _this7.userInfo.userId,
                                            orderId: order.orderId,
                                            amount: order.commissionDeductionAmount,
                                            // 佣金抵扣金额
                                            balance: (_this7.userInfo.money || 0) + Number(order.commissionDeductionAmount),
                                            // 退款后用户佣金余额
                                            flowType: 2 // 2表示快递取消返现
                                          };
                                          _context7.prev = 23;
                                          _context7.next = 26;
                                          return _commissionFlow.default.addCommissionFlow(commissionRefund);
                                        case 26:
                                          commissionResult = _context7.sent;
                                          if (commissionResult) {
                                            _context7.next = 32;
                                            break;
                                          }
                                          console.error('佣金退款记录创建失败');
                                          uni.showToast({
                                            title: '订单已取消，但佣金退款记录创建失败',
                                            icon: 'none',
                                            duration: 2000
                                          });
                                          _context7.next = 42;
                                          break;
                                        case 32:
                                          _context7.prev = 32;
                                          _context7.next = 35;
                                          return _user.default.getUserById(_this7.userInfo.userId);
                                        case 35:
                                          userResult = _context7.sent;
                                          if (userResult) {
                                            _this7.$store.commit('user/setUserInfo', userResult);
                                            console.log('用户信息已更新，最新佣金余额:', userResult.money);
                                          }
                                          _context7.next = 42;
                                          break;
                                        case 39:
                                          _context7.prev = 39;
                                          _context7.t1 = _context7["catch"](32);
                                          console.error('更新用户信息失败:', _context7.t1);
                                        case 42:
                                          _context7.next = 48;
                                          break;
                                        case 44:
                                          _context7.prev = 44;
                                          _context7.t2 = _context7["catch"](23);
                                          console.error('佣金退款记录创建失败', _context7.t2);
                                          uni.showToast({
                                            title: '订单已取消，但佣金退款记录创建失败',
                                            icon: 'none',
                                            duration: 2000
                                          });
                                        case 48:
                                          if (!(order.amountAfterCommissionDeduction === 0)) {
                                            _context7.next = 52;
                                            break;
                                          }
                                          // 如果佣金抵扣后金额为0，只需创建佣金退款记录，无需其他操作
                                          console.log('佣金完全抵扣订单金额，无需其他退款处理');
                                          _context7.next = 70;
                                          break;
                                        case 52:
                                          if (!(order.orderStatus === 1)) {
                                            _context7.next = 58;
                                            break;
                                          }
                                          console.log(order);
                                          // 计算总退款金额（订单总价 + 保险费）
                                          _refundAmount = order.amountAfterCommissionDeduction;
                                          _wechat.default.applyRefund(order.wechatId, _refundAmount, '快递取消退款').then(function (result) {
                                            if (result.success) {
                                              // 退款申请成功，可以提示用户
                                              console.log('退款申请已提交，退款单号:', order.wechatId);
                                            } else {
                                              // 退款申请失败
                                              console.error('退款申请失败:', result.message);
                                            }
                                          }).catch(function (error) {
                                            console.error('退款申请异常:', error);
                                          });
                                          _context7.next = 70;
                                          break;
                                        case 58:
                                          if (!(order.orderStatus === 4)) {
                                            _context7.next = 70;
                                            break;
                                          }
                                          // 订单状态为已完成，创建月付退款记录
                                          _statement = {
                                            userId: _this7.userInfo.userId,
                                            monthlySettlementEligibilityId: _this7.userInfo.monthlySettlementEligibilityId,
                                            orderId: order.orderId,
                                            type: 1,
                                            // 1表示退款
                                            isUserPays: 0,
                                            amount: order.amountAfterCommissionDeduction // 佣金抵扣后金额
                                          };
                                          _context7.prev = 60;
                                          _context7.next = 63;
                                          return _statement2.default.createStatement(_statement);
                                        case 63:
                                          console.log('部分佣金抵扣月结退款记录创建成功');
                                          _context7.next = 70;
                                          break;
                                        case 66:
                                          _context7.prev = 66;
                                          _context7.t3 = _context7["catch"](60);
                                          console.error('部分佣金抵扣月结退款记录创建失败', _context7.t3);
                                          uni.showToast({
                                            title: '订单已取消，但部分退款记录创建失败',
                                            icon: 'none',
                                            duration: 2000
                                          });
                                        case 70:
                                          _context7.next = 73;
                                          break;
                                        case 72:
                                          if (order.paymentMethod === 0 || order.paymentMethod === 1) {
                                            console.log(order);
                                            // 计算总退款金额（订单总价 + 保险费）
                                            _refundAmount2 = order.orderTotalPrice + (order.insuranceFee || 0);
                                            _wechat.default.applyRefund(order.wechatId, _refundAmount2, '快递取消退款').then(function (result) {
                                              if (result.success) {
                                                // 退款申请成功，可以提示用户
                                                console.log('退款申请已提交，退款单号:', order.wechatId);
                                              } else {
                                                // 退款申请失败
                                                console.error('退款申请失败:', result.message);
                                              }
                                            }).catch(function (error) {
                                              console.error('退款申请异常:', error);
                                            });
                                          }
                                        case 73:
                                          // 显示成功提示
                                          uni.showToast({
                                            title: '订单已取消',
                                            icon: 'success'
                                          });

                                          // 刷新订单列表
                                          _this7.refreshList();
                                          _context7.next = 78;
                                          break;
                                        case 77:
                                          uni.showToast({
                                            title: '取消失败',
                                            icon: 'none'
                                          });
                                        case 78:
                                        case "end":
                                          return _context7.stop();
                                      }
                                    }
                                  }, _callee7, null, [[5, 11], [23, 44], [32, 39], [60, 66]]);
                                }));
                                return function (_x3) {
                                  return _ref2.apply(this, arguments);
                                };
                              }());
                            case 2:
                            case "end":
                              return _context8.stop();
                          }
                        }
                      }, _callee8);
                    }));
                    return function (_x2) {
                      return _ref.apply(this, arguments);
                    };
                  }()).catch(function (error) {
                    console.error('取消订单API错误:', error);
                    uni.showToast({
                      title: '取消失败，请重试',
                      icon: 'none'
                    });
                  });
                } catch (e) {
                  console.error('取消订单失败:', e);
                  uni.showToast({
                    title: '操作失败，请重试',
                    icon: 'none'
                  });
                } finally {
                  uni.hideLoading();
                }
              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    // 显示删除确认
    showDeleteConfirm: function showDeleteConfirm(orderId) {
      var _this8 = this;
      uni.showModal({
        title: '删除订单',
        content: '删除后订单数据将无法恢复，确定要删除吗？',
        confirmColor: '#FF6B01',
        success: function () {
          var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(res) {
            return _regenerator.default.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    if (!res.confirm) {
                      _context10.next = 3;
                      break;
                    }
                    _context10.next = 3;
                    return _this8.deleteOrder(orderId);
                  case 3:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10);
          }));
          function success(_x4) {
            return _success2.apply(this, arguments);
          }
          return success;
        }()
      });
    },
    // 删除订单
    deleteOrder: function deleteOrder(orderId) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var res;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                uni.showLoading({
                  title: '删除中...',
                  mask: true
                });
                _context11.next = 4;
                return _order.default.deleteOrder(orderId);
              case 4:
                res = _context11.sent;
                if (res) {
                  uni.showToast({
                    title: '订单已删除',
                    icon: 'success'
                  });
                  // 刷新订单列表
                  _this9.refreshList();
                } else {
                  uni.showToast({
                    title: (res === null || res === void 0 ? void 0 : res.message) || '删除失败',
                    icon: 'none'
                  });
                }
                _context11.next = 12;
                break;
              case 8:
                _context11.prev = 8;
                _context11.t0 = _context11["catch"](0);
                console.error('删除订单失败:', _context11.t0);
                uni.showToast({
                  title: '操作失败，请重试',
                  icon: 'none'
                });
              case 12:
                _context11.prev = 12;
                uni.hideLoading();
                return _context11.finish(12);
              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 8, 12, 15]]);
      }))();
    },
    switchStatus: function switchStatus(status) {
      if (this.currentStatus === status) return;
      this.currentStatus = status;
      this.refreshList();
    },
    // 格式化倒计时
    formatCountdown: function formatCountdown(milliseconds, orderId) {
      if (!milliseconds) return '00:00:00';

      // 初始化倒计时数据
      if (!this.countdownValues[orderId]) {
        // 使用Vue.set确保响应式
        this.$set(this.countdownValues, orderId, milliseconds);
        this.startCountdown(orderId);
      }

      // 使用存储的当前值
      var totalSeconds = Math.floor(this.countdownValues[orderId] / 1000);
      if (totalSeconds <= 0) return '00:00:00';
      var hours = Math.floor(totalSeconds / 3600);
      var minutes = Math.floor(totalSeconds % 3600 / 60);
      var seconds = totalSeconds % 60;

      // 格式化为 HH:MM:SS
      var formattedHours = hours.toString().padStart(2, '0');
      var formattedMinutes = minutes.toString().padStart(2, '0');
      var formattedSeconds = seconds.toString().padStart(2, '0');
      return "".concat(formattedHours, ":").concat(formattedMinutes, ":").concat(formattedSeconds);
    },
    // 开始倒计时
    startCountdown: function startCountdown(orderId) {
      var _this10 = this;
      // 清除可能存在的旧定时器
      if (this.countdownTimers[orderId]) {
        clearInterval(this.countdownTimers[orderId]);
      }

      // 创建新的定时器，每秒更新一次
      this.countdownTimers[orderId] = setInterval(function () {
        // 减少1000毫秒（1秒）
        var newValue = _this10.countdownValues[orderId] - 1000;

        // 使用Vue.set确保响应式更新
        _this10.$set(_this10.countdownValues, orderId, newValue);

        // 如果倒计时结束，清除定时器
        if (newValue <= 0) {
          clearInterval(_this10.countdownTimers[orderId]);
          _this10.$set(_this10.countdownValues, orderId, 0);
          // 可以在这里添加倒计时结束后的逻辑，比如刷新订单
          _this10.refreshList();
        }

        // 强制更新视图
        _this10.$forceUpdate();
      }, 1000);
    },
    onUnload: function onUnload() {
      var _this11 = this;
      // 清除所有倒计时定时器
      Object.keys(this.countdownTimers).forEach(function (orderId) {
        clearInterval(_this11.countdownTimers[orderId]);
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 81:
/*!***********************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/pages/order/order.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=style&index=0&lang=scss& */ 82);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 82:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/pages/order/order.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[69,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/order.js.map