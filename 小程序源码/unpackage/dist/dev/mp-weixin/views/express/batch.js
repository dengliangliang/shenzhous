(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["views/express/batch"],{

/***/ 264:
/*!**********************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/main.js?{"page":"views%2Fexpress%2Fbatch"} ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _batch = _interopRequireDefault(__webpack_require__(/*! ./views/express/batch.vue */ 265));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_batch.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 265:
/*!***************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch.vue ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _batch_vue_vue_type_template_id_e284ba48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./batch.vue?vue&type=template&id=e284ba48& */ 266);
/* harmony import */ var _batch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./batch.vue?vue&type=script&lang=js& */ 268);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _batch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _batch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _batch_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./batch.vue?vue&type=style&index=0&lang=scss& */ 272);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _batch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _batch_vue_vue_type_template_id_e284ba48___WEBPACK_IMPORTED_MODULE_0__["render"],
  _batch_vue_vue_type_template_id_e284ba48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _batch_vue_vue_type_template_id_e284ba48___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "views/express/batch.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 266:
/*!**********************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch.vue?vue&type=template&id=e284ba48& ***!
  \**********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_template_id_e284ba48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./batch.vue?vue&type=template&id=e284ba48& */ 267);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_template_id_e284ba48___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_template_id_e284ba48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_template_id_e284ba48___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_template_id_e284ba48___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 267:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch.vue?vue&type=template&id=e284ba48& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.batchOrders.length
  var l0 = !(g0 === 0)
    ? _vm.__map(_vm.batchOrders, function (order, index) {
        var $orig = _vm.__get_orig(order)
        var m0 = _vm.formatPhone(order.senderMobile)
        var m1 = _vm.formatPhone(order.receiverMobile)
        var g1 = order.price.toFixed(2) || 0
        var m2 = _vm.isExpressOrderSupported(index)
        var m3 = _vm.isExpressOrderSupported(index) && order.insured
        var m4 =
          _vm.isExpressOrderSupported(index) &&
          order.insured &&
          _vm.calculateInsuranceFee(order)
        var m5 = m4 ? _vm.formatPrice(_vm.calculateInsuranceFee(order)) : null
        var m6 = _vm.isExpressOrderSupported(index) && order.insured
        var m7 = m6 ? _vm.getExpressBjRuleStr(index) : null
        return {
          $orig: $orig,
          m0: m0,
          m1: m1,
          g1: g1,
          m2: m2,
          m3: m3,
          m4: m4,
          m5: m5,
          m6: m6,
          m7: m7,
        }
      })
    : null
  var g2 = _vm.batchOrders.length
  var g3 = g2 !== 0 && !_vm.expressLoading ? _vm.expressCompanies.length : null
  var l1 =
    g2 !== 0 && !_vm.expressLoading && !(g3 === 0)
      ? _vm.__map(_vm.expressCompanies, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m8 = _vm.getExpressLogo(item.companyCode)
          var g4 = item.fee.toFixed(2)
          return {
            $orig: $orig,
            m8: m8,
            g4: g4,
          }
        })
      : null
  var l2 = _vm.hasExpressOptions ? _vm.updateAvailableTimeOptions() : null
  var m9 = _vm.hasExpressOptions ? _vm.isPaymentMethodSupported("online") : null
  var m10 = _vm.hasExpressOptions
    ? _vm.isPaymentMethodSupported("online")
    : null
  var m11 =
    _vm.hasExpressOptions && _vm.hasMonthlyAccount
      ? _vm.isPaymentMethodSupported("monthly")
      : null
  var m12 =
    _vm.hasExpressOptions && _vm.hasMonthlyAccount
      ? _vm.isPaymentMethodSupported("monthly")
      : null
  var m13 = _vm.hasExpressOptions
    ? _vm.isPaymentMethodSupported("onlineCollect")
    : null
  var m14 = _vm.hasExpressOptions
    ? _vm.isPaymentMethodSupported("onlineCollect")
    : null
  var g5 =
    _vm.hasExpressOptions && _vm.availableBalance > 0
      ? _vm.availableBalance.toFixed(2)
      : null
  var m15 =
    _vm.hasExpressOptions &&
    _vm.availableBalance > 0 &&
    _vm.formData.useCommission
      ? parseFloat((_vm.totalFee || 0).toFixed(2))
      : null
  var m16 =
    _vm.hasExpressOptions &&
    _vm.availableBalance > 0 &&
    _vm.formData.useCommission
      ? parseFloat((_vm.formData.commissionAmount || 0).toFixed(2))
      : null
  var g6 =
    _vm.hasExpressOptions &&
    _vm.availableBalance > 0 &&
    _vm.formData.useCommission &&
    m15 - m16 > 0
      ? (
          parseFloat((_vm.totalFee || 0).toFixed(2)) -
          parseFloat((_vm.formData.commissionAmount || 0).toFixed(2))
        ).toFixed(2)
      : null
  var g7 = _vm.batchOrders.length
  var g8 = g7 > 0 ? _vm.totalBaseFee.toFixed(2) : null
  var g9 =
    g7 > 0 && _vm.totalInsuranceFee > 0
      ? _vm.totalInsuranceFee.toFixed(2)
      : null
  var g10 = g7 > 0 ? _vm.getTotalFee().toFixed(2) : null
  var g11 = _vm.batchOrders.length
  var g12 = _vm.batchOrders.length
  var g13 = g12 > 0 ? _vm.batchOrders.length : null
  var m17 = g12 > 0 ? parseFloat((_vm.totalFee || 0).toFixed(2)) : null
  var m18 =
    g12 > 0 ? parseFloat((_vm.formData.commissionAmount || 0).toFixed(2)) : null
  var g14 =
    g12 > 0 && m17 - m18 > 0
      ? (
          parseFloat((_vm.totalFee || 0).toFixed(2)) -
          parseFloat((_vm.formData.commissionAmount || 0).toFixed(2))
        ).toFixed(2)
      : null
  var g15 = g12 > 0 ? _vm.batchOrders.length : null
  if (!_vm._isMounted) {
    _vm.e0 = function (e, index) {
      var args = [],
        len = arguments.length - 2
      while (len-- > 0) args[len] = arguments[len + 2]

      var _temp = args[args.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        index = _temp2.index
      var _temp, _temp2
      return _vm.updateInsuranceValue(index, e)
    }
    _vm.e1 = function ($event, time) {
      var _temp3 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        time = _temp4.time
      var _temp3, _temp4
      return _vm.selectPickupTime(time.value)
    }
    _vm.e2 = function ($event) {
      _vm.isPaymentMethodSupported("online") &&
        _vm.selectPaymentMethod("online", $event)
    }
    _vm.e3 = function ($event) {
      _vm.isPaymentMethodSupported("monthly") &&
        _vm.selectPaymentMethod("monthly")
    }
    _vm.e4 = function ($event) {
      _vm.isPaymentMethodSupported("onlineCollect") &&
        _vm.selectPaymentMethod("onlineCollect")
    }
    _vm.e5 = function ($event) {
      _vm.submitBtnActive = true
    }
    _vm.e6 = function ($event) {
      _vm.submitBtnActive = false
    }
    _vm.e7 = function ($event) {
      _vm.submitBtnActive = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        l0: l0,
        g2: g2,
        g3: g3,
        l1: l1,
        l2: l2,
        m9: m9,
        m10: m10,
        m11: m11,
        m12: m12,
        m13: m13,
        m14: m14,
        g5: g5,
        m15: m15,
        m16: m16,
        g6: g6,
        g7: g7,
        g8: g8,
        g9: g9,
        g10: g10,
        g11: g11,
        g12: g12,
        g13: g13,
        m17: m17,
        m18: m18,
        g14: g14,
        g15: g15,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 268:
/*!****************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./batch.vue?vue&type=script&lang=js& */ 269);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 269:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _readOnlyError2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ 270));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 38));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _address = _interopRequireDefault(__webpack_require__(/*! @/api/address */ 121));
var _express = _interopRequireDefault(__webpack_require__(/*! @/api/express */ 76));
var _expressType = _interopRequireDefault(__webpack_require__(/*! @/api/expressType */ 271));
var _user3 = _interopRequireDefault(__webpack_require__(/*! @/api/user */ 39));
var _monthly = _interopRequireDefault(__webpack_require__(/*! @/api/monthly */ 171));
var _order = _interopRequireDefault(__webpack_require__(/*! @/api/order */ 75));
var _payment = _interopRequireDefault(__webpack_require__(/*! @/api/payment */ 79));
var _wechat = _interopRequireDefault(__webpack_require__(/*! @/api/wechat.js */ 80));
var _vuex = __webpack_require__(/*! vuex */ 34);
var _commissionFlow3 = _interopRequireDefault(__webpack_require__(/*! @/api/commissionFlow */ 77));
var _statement = _interopRequireDefault(__webpack_require__(/*! @/api/statement */ 78));
var _wechat2 = _interopRequireDefault(__webpack_require__(/*! ../../api/wechat */ 80));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    var _ref;
    return _ref = {
      // 保留选项卡数据
      currentTab: 1,
      tabs: [{
        name: '寄快递',
        icon: '/static/icon/cargo.png',
        url: '/views/express/send'
      }, {
        name: '批量寄件',
        icon: '/static/icon/batch.png',
        url: '/views/express/batch'
      }, {
        name: '快运寄件',
        icon: '/static/icon/express.png',
        url: '/views/express/cargo'
      }],
      paymentFlows: [],
      statements: [],
      orders: [],
      orderIds: [],
      expressOrders: [],
      // 其他必要数据...
      monthlyCheckLoading: false,
      hasMonthlyEligibility: false,
      // 恢复必要的数据属性
      expressLoading: false,
      // 是否正在加载快递选项
      expressCompanies: [],
      // 快递公司列表
      baseFee: 0,
      // 基本运费
      totalFee: 0,
      // 总费用
      scrollTop: 0,
      // 滚动位置

      // 其他必要数据...
      isIPhoneX: false,
      // 是否为iPhone X系列
      submitting: false,
      // 提交状态
      submitBtnActive: false,
      // 按钮活动状态

      // 用户佣金数据
      userInfo: {},
      userCommission: 0,
      // 其他必要属性
      expressTypeSearchLoading: false,
      expressTypeSearchTimer: null,
      // 添加一个计时器变量

      // 添加控制变量
      hasExpressOptions: false,
      // 确保初始值为false

      // 取件时间选项
      pickupDateOptions: [],
      // 可选取件日期
      pickupTimeOptions: [
      // 可选时间段
      {
        value: '8:00-10:00',
        label: '上午 8:00-10:00'
      }, {
        value: '10:00-12:00',
        label: '上午 10:00-12:00'
      }, {
        value: '12:00-14:00',
        label: '中午 12:00-14:00'
      }, {
        value: '14:00-16:00',
        label: '下午 14:00-16:00'
      }, {
        value: '16:00-18:00',
        label: '下午 16:00-18:00'
      }, {
        value: '18:00-20:00',
        label: '晚上 18:00-20:00'
      }],
      // 增加保价相关数据
      insuranceUnavailableReason: '',
      // 不可保价原因
      insuranceRule: '',
      // 保价规则描述

      // 保价金额范围
      minInsuranceAmount: 1000,
      maxInsuranceAmount: 10000,
      // 支付相关
      supportedPayMethods: [],
      // 支持的支付方式
      hasMonthlyAccount: false,
      // 是否有月结账户

      // 账户余额相关
      availableBalance: 0,
      canUseCommission: false,
      forceUpdate: false,
      insuranceSupported: false,
      // 确保这个属性存在于 data 中

      // 协议相关
      formData: {
        // ... 现有属性 ...
        agreedToTerms: false,
        // 是否同意协议
        expressIndex: 0,
        insured: false,
        // 是否保价
        insuranceValue: '' // 保价金额
      },

      showAgreementError: false,
      // 是否显示协议错误提示

      batchOrders: [],
      // 批量寄件订单列表

      isAllSelected: true,
      // 保留但始终为true
      isUseCommission: false,
      isUseMonthly: false
    }, (0, _defineProperty2.default)(_ref, "batchOrders", []), (0, _defineProperty2.default)(_ref, "expressOptions", []), (0, _defineProperty2.default)(_ref, "insuranceSupported", false), (0, _defineProperty2.default)(_ref, "insuranceNotSupportedTip", "该渠道暂时不支持保价"), (0, _defineProperty2.default)(_ref, "commissionFlows", []), (0, _defineProperty2.default)(_ref, "showShareGuide", false), _ref;
  },
  onShareTimeline: function onShareTimeline() {
    return {
      title: "".concat(this.userInfo.userName || '好友', "\u9080\u8BF7\u60A8\u52A0\u5165\u795E\u5DDE\u90AE"),
      query: "inviteCode=".concat(this.userInfo.myCode, "&register=true"),
      // 参数统一放在 query
      imageUrl: '/static/img/0483799a1db4ad80395d2c20fdd6454.png',
      path: '/pages/login/login' // 路径保持干净，微信会自动拼接 query
    };
  },
  // 保留原有好友分享功能
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: "".concat(this.userInfo.userName || '好友', "\u9080\u8BF7\u60A8\u52A0\u5165\u795E\u5DDE\u90AE"),
      path: "/pages/login/login?inviteCode=".concat(this.userInfo.myCode, "&register=true"),
      imageUrl: '/static/img/0483799a1db4ad80395d2c20fdd6454.png',
      success: function success() {
        uni.showToast({
          title: '分享成功',
          icon: 'success'
        });
      }
    };
  },
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapState)({
    storeUserInfo: function storeUserInfo(state) {
      return state.user.userInfo;
    }
  })), {}, {
    // 最终支付金额
    finalPayAmount: function finalPayAmount() {
      // 确保数值类型运算，使用Number强制转换
      var afterTotalFee = Number(parseFloat(this.totalFee || 0).toFixed(2));
      var commissionAmount = Number(parseFloat(this.formData.commissionAmount || 0).toFixed(2));

      // 计算最终金额
      var finalAmount = Math.max(0, afterTotalFee - commissionAmount);

      // 处理非常小的值
      if (finalAmount < 0.01) finalAmount = 0;
      console.log('最终金额详细计算:', {
        总费用原始: this.totalFee,
        总费用转换后: afterTotalFee,
        抵扣金额原始: this.formData.commissionAmount,
        抵扣金额转换后: commissionAmount,
        计算结果: finalAmount,
        格式化结果: finalAmount.toFixed(2)
      });
      return finalAmount.toFixed(2);
    },
    // 保价费
    insuranceFee: function insuranceFee() {
      if (!this.formData.insured || !this.formData.insuranceValue) {
        return 0;
      }
      // 保价费率为1%
      return parseFloat(this.formData.insuranceValue) * 0.01;
    },
    // 总费用 - 确保这里有逗号
    // totalFee() {
    // 	return this.totalBaseFee + this.totalInsuranceFee;
    // },
    // 计算选中订单的总保价费
    totalInsuranceFee: function totalInsuranceFee() {
      var _this = this;
      // 检查batchOrders是否存在
      if (!this.batchOrders || this.batchOrders.length === 0) {
        return 0;
      }
      return this.batchOrders.filter(function (order) {
        return order && order.selected !== false;
      }).reduce(function (sum, order) {
        // 只计算开启了保价且支持保价的订单的保价费
        if (order && order.insured && _this.isExpressOrderSupported(order)) {
          return sum + _this.calculateInsuranceFee(order);
        }
        return sum;
      }, 0);
    },
    // 总费用（基础运费 + 保价费）
    totalBaseFee: function totalBaseFee() {
      return this.batchOrders.filter(function (order) {
        return order.selected;
      }).reduce(function (sum, order) {
        return sum + parseFloat(order.price || 0);
      }, 0);
    },
    // 针对不同支付方式的计算属性
    isOnlinePaymentActive: function isOnlinePaymentActive() {
      return this.formData.paymentMethod === 'online';
    },
    isMonthlyPaymentActive: function isMonthlyPaymentActive() {
      return this.formData.paymentMethod === 'monthly';
    },
    isCodPaymentActive: function isCodPaymentActive() {
      return this.formData.paymentMethod === 'cod';
    }
  }),
  created: function created() {
    this.formData.commissionAmount = 0;

    // 隐藏需要获取快递价格后才显示的内容
    this.hasExpressOptions = false;

    // 立即检查月结账户资格
    this.checkMonthlyAccount();

    // 初始化用户余额
    this.initUserBalance();
  },
  mounted: function mounted() {
    // 检测是否为iPhone X系列
    this.checkIphoneX();
  },
  methods: {
    showShareGuideLayer: function showShareGuideLayer() {
      this.showShareGuide = true;
    },
    // 隐藏分享引导层
    hideShareGuide: function hideShareGuide() {
      this.showShareGuide = false;
    },
    handleExpress: function handleExpress() {
      uni.navigateTo({
        url: '/views/express/express'
      });
    },
    canQueryExpress: function canQueryExpress() {
      if (this.batchOrders.length === 0) {
        return false;
      }
      return true;
    },
    // 检测是否为iPhone X系列
    checkIphoneX: function checkIphoneX() {
      var systemInfo = uni.getSystemInfoSync();
      this.isIPhoneX = !!(systemInfo.model && (systemInfo.model.indexOf('iPhone X') > -1 || systemInfo.model.indexOf('iPhone 11') > -1 || systemInfo.model.indexOf('iPhone 12') > -1 || systemInfo.model.indexOf('iPhone 13') > -1 || systemInfo.model.indexOf('iPhone 14') > -1 || systemInfo.model.indexOf('iPhone 15') > -1));
    },
    // 修改为导航到不同页面
    navToTab: function navToTab(index) {
      if (index === 1) {
        // 当前页面，不需要跳转
        return;
      }
      // 导航到对应页面
      var url = this.tabs[index].url;
      uni.navigateTo({
        url: url
      });
    },
    // 格式化手机号
    formatPhone: function formatPhone(phone) {
      if (!phone) return '';
      if (phone.length !== 11) return phone;
      return "".concat(phone.substring(0, 3), "****").concat(phone.substring(7));
    },
    // 查询快递选项
    queryExpressOptions: function queryExpressOptions(order) {
      var _this2 = this;
      var updateUI = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // if (this.expressLoading) return;
      this.expressLoading = true;
      this.expressCompanies = [];
      // 构建查询参数
      var params = {
        businessParams: {
          // 收件人信息
          receiveAddress: order.receiverDetailAddress || '',
          receiveMobile: order.receiverMobile,
          receiveTel: order.receiverTel || "",
          receiveName: order.receiverName,
          receiveProvince: order.receiverProvince,
          receiveCity: order.receiverCity,
          receiveDistrict: order.receiverDistrict,
          // 发件人信息
          senderAddress: order.senderDetailAddress || '',
          senderMobile: order.senderMobile,
          senderTel: order.senderTel || "",
          senderName: order.senderName,
          senderProvince: order.senderProvince,
          senderCity: order.senderCity,
          senderDistrict: order.senderDistrict,
          // 物品信息
          goods: order.itemTypeName,
          packageCount: order.packageCount || 1,
          // 默认为1
          weight: order.estimatedItemWeight,
          // 其他参数
          customerType: "kd",
          onlinePay: "ALL",
          payMethod: 10,
          guaranteeValueAmount: order.guaranteeValueAmount || 0,
          thirdNo: "TD" + Date.now() // 生成一个随机的第三方单号
        }
      };

      // console.log('查询快递选项参数:', params);

      // API调用
      _express.default.queryExpressOptions(params).then(function (result) {
        // console.log('查询快递选项结果:', result);
        // 处理嵌套结构的返回数据
        if (result) {
          _express.default.getExpressList().then(function (res) {
            if (res) {
              // console.log(res)
              var allOptions = [];
              var expressList = res;
              // 遍历所有快递公司
              Object.keys(result).forEach(function (companyCode) {
                var companyOptions = result[companyCode];
                if (Array.isArray(companyOptions) && companyOptions.length > 0) {
                  // 将每个公司的选项添加到总选项列表
                  companyOptions.forEach(function (option) {
                    // 确保提取保价相关字段
                    if (option.channelName !== '德邦【寄付】9折' && option.channelName !== '德邦【到付】9折') {
                      var bjRule = option.bjRule || "";
                      var bjRuleStr = option.bjRuleStr || "".concat(option.channelName || companyCode, "\u6682\u4E0D\u652F\u6301\u4FDD\u4EF7\uFF0C\u53EF\u7EBF\u4E0B\u4E0E\u5FEB\u9012\u5458\u534F\u5546");
                      allOptions.push({
                        id: option.channelId || Date.now() + Math.random().toString(36).substr(2, 5),
                        name: option.channelName || "".concat(companyCode, "\u5FEB\u9012"),
                        companyCode: option.deliveryType || companyCode,
                        fee: parseFloat(option.preOrderFee) || 0,
                        originalData: option,
                        // 保存原始数据，可能在下单时需要

                        // 确保保存保价相关字段
                        bjRule: bjRule,
                        bjRuleStr: bjRuleStr
                      });
                    }
                  });
                }
              });
              for (var i = allOptions.length - 1; i >= 0; i--) {
                var option = allOptions[i];
                var shouldDelete = false;
                var totalProfit = 0;
                var _iterator = _createForOfIteratorHelper(expressList),
                  _step;
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var express = _step.value;
                    if (option.companyCode === express.deliveryType) {
                      if (express.isClose === 0) {
                        shouldDelete = true;
                        break; // 发现需删除，跳出循环
                      } else if (express.profit !== 0) {
                        totalProfit += express.profit;
                      }
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                if (shouldDelete) {
                  allOptions.splice(i, 1); // 删除元素
                } else if (totalProfit !== 0) {
                  option.fee += option.fee * (totalProfit / 100); // 调整费用
                }
              }

              // 按价格排序
              _this2.expressCompanies = allOptions.sort(function (a, b) {
                return a.fee - b.fee;
              });

              // 重要：明确设置expressOptions与expressCompanies相同
              _this2.expressOptions = (0, _toConsumableArray2.default)(_this2.expressCompanies);
              if (_this2.expressCompanies.length > 0) {
                var selectedExpress = {};
                if (updateUI) {
                  _this2.formData.expressIndex = 0;
                  selectedExpress = _this2.expressCompanies[0];
                  order.price = selectedExpress.fee;

                  // 更新当前快递公司是否支持保价
                  _this2.insuranceSupported = selectedExpress.bjRule !== "";
                  _this2.insuranceNotSupportedTip = selectedExpress.bjRuleStr || "";
                  _this2.updateBatchSummary();
                } else {
                  selectedExpress = _this2.expressCompanies[_this2.formData.expressIndex];
                  order.price = selectedExpress.fee;
                  _this2.updateBatchSummary();
                }
                if (selectedExpress.originalData.payMethod == 30) {
                  if (_this2.formData.paymentMethod !== "onlineCollect") {
                    _this2.canUseCommission = true;
                  } else {
                    _this2.canUseCommission = false;
                  }
                } else {
                  _this2.canUseCommission = false;
                }
                // 获取到快递选项后，检查第一个快递选项的保价支持情况
                // 检查支付方式支持情况
                _this2.checkSupportedPayMethods(selectedExpress);
                // 如果当前选择的支付方式不支持，重置为默认支付方式
                _this2.resetToSupportedPaymentMethod();

                // 保存批量订单信息到本地存储
                // this.saveBatchOrdersToStorage();
                // 设置已获取快递价格标志，触发相关内容显示
                _this2.hasExpressOptions = true;
              } else {
                _this2.expressCompanies = [];
                _this2.hasExpressOptions = false;
                uni.showToast({
                  title: '未找到可用的快递服务',
                  icon: 'none'
                });
              }
            } else {
              _this2.expressCompanies = [];
              _this2.hasExpressOptions = false;
              uni.showToast({
                title: '未找到可用的快递服务',
                icon: 'none'
              });
            }
          });
        } else {
          _this2.expressCompanies = [];
          _this2.hasExpressOptions = false;
          uni.showToast({
            title: '未找到可用的快递服务',
            icon: 'none'
          });
        }
      }).catch(function (error) {
        console.error('查询快递选项错误:', error);
        _this2.expressCompanies = [];
        _this2.hasExpressOptions = false;
        uni.showToast({
          title: error.message || '查询快递选项失败',
          icon: 'none'
        });
      }).finally(function () {
        _this2.expressLoading = false;
      });
    },
    // 清空快递选项
    clearExpressOptions: function clearExpressOptions() {
      this.expressCompanies = [];
      this.formData.expressIndex = -1;
      this.formData.companyCode = '';
      this.baseFee = 0;
      this.insuranceFee = 0;
      this.totalFee = 0;

      // 重置快递价格获取状态
      this.hasExpressOptions = false;
      console.log('已清空快递选项，隐藏相关内容');
    },
    // 选择快递
    selectExpress: function selectExpress(index) {
      var _this3 = this;
      // 更新选中的快递索引
      this.formData.expressIndex = index;

      // 获取选中的快递公司信息
      var selectedExpress = this.expressCompanies[index];

      // 检查选中的快递公司是否支持保价
      var bjRule = selectedExpress.bjRule || "";
      var bjRuleStr = selectedExpress.bjRuleStr || "该渠道暂时不支持保价";

      // 更新是否支持保价的状态
      this.insuranceSupported = bjRule !== "";
      this.insuranceNotSupportedTip = bjRuleStr;

      // 如果不支持保价，关闭保价选项
      if (!this.insuranceSupported && this.formData.insured) {
        this.formData.insured = false;
        this.formData.insuranceValue = '';
      }

      // 更新所有批量订单的快递信息和保价支持状态
      for (var i = 0; i < this.batchOrders.length; i++) {
        // 保存快递公司索引到订单中
        this.$set(this.batchOrders[i], 'expressIndex', index);

        // 如果该快递不支持保价，关闭保价
        if (!this.insuranceSupported && this.batchOrders[i].insured) {
          this.$set(this.batchOrders[i], 'insured', false);
          this.$set(this.batchOrders[i], 'insuranceValue', '');
        }

        // 更新每个订单的运费选项
        this.queryExpressOptions(this.batchOrders[i], false);
      }

      // 更新基础运费
      if (selectedExpress.originalData && selectedExpress.originalData.payMethod == 30) {
        this.canUseCommission = true;
      } else {
        this.canUseCommission = false;
        this.formData.commissionAmount = 0;
        this.formData.useCommission = false;
        this.$nextTick(function () {
          _this3.forceUpdate = !_this3.forceUpdate;
        });
      }

      // 检查支付方式支持情况
      this.checkSupportedPayMethods(selectedExpress);

      // 如果当前选择的支付方式不支持，重置为默认支付方式
      this.resetToSupportedPaymentMethod();

      // 保存批量订单信息到本地存储
      this.saveBatchOrdersToStorage();
    },
    // 获取快递logo
    getExpressLogo: function getExpressLogo(companyCode) {
      // 快递公司代码到图标路径的映射关系
      var logoMap = {
        // 标准物流公司编码映射
        'SF': '/static/icon/顺丰.png',
        'ZTO': '/static/icon/中通.png',
        'YTO': '/static/icon/圆通.png',
        'YUND': '/static/icon/韵达.png',
        'HTKY': '/static/icon/百世.png',
        'STO': '/static/icon/申通.png',
        'JD': '/static/icon/京东.png',
        'DOP': '/static/icon/德邦.png',
        'JT': '/static/icon/极兔.png',
        'KYSY': '/static/icon/跨越.png',
        'EMS': '/static/icon/邮政.png',
        'CAINIAO': '/static/icon/菜鸟裹裹.png',
        'SXJD': '/static/icon/顺心捷达.png',
        'YMDD': '/static/icon/壹米滴答.png',
        // 添加别名映射，以防API返回不同的代码格式
        'SHUNFENG': '/static/icon/顺丰.png',
        'ZHONGTONG': '/static/icon/中通.png',
        'YUANTONG': '/static/icon/圆通.png',
        'YUNDA': '/static/icon/韵达.png',
        'HUITONGKUAIDI': '/static/icon/百世.png',
        'STO-INT': '/static/icon/申通.png',
        'JINGDONG': '/static/icon/京东.png',
        'DEBANG': '/static/icon/德邦.png',
        'JITU': '/static/icon/极兔.png',
        'KUAYUE': '/static/icon/跨越.png',
        'YOUZHENG': '/static/icon/邮政.png',
        'CAINIAOBK': '/static/icon/菜鸟裹裹.png'
      };

      // 如果能直接找到映射，返回对应图标
      if (logoMap[companyCode]) {
        return logoMap[companyCode];
      }

      // 尝试转换为大写匹配
      var uppercaseCode = companyCode.toUpperCase();
      if (logoMap[uppercaseCode]) {
        return logoMap[uppercaseCode];
      }

      // 如果没有找到映射，返回默认图标
      console.log('未找到快递公司图标:', companyCode);
      return '/static/icon/菜鸟裹裹.png'; // 默认使用菜鸟裹裹图标
    },
    // 获取用户佣金
    getUserCommission: function getUserCommission() {
      try {
        var userInfo = uni.getStorageSync('userInfo') || {};
        this.userInfo = userInfo;
        this.userCommission = parseFloat(userInfo.money || 0);
      } catch (error) {
        console.error('获取用户佣金失败', error);
      }
    },
    submitOrder: function submitOrder() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this4$processPickupT, startDateTime, endDateTime, express, payStrategy, wechatId, price, openId, user, payResult, i, orderId, _i, _orderId, finalPrice, _orderId2, _i2, commissionDeductionAmount, money, _i3, _orderId3, _commissionDeductionAmount, _money, _wechatId, _price2, _openId, _user, _payResult, _i4, _orderId4, _wechatId2, _price4, _openId2, _user2, _payResult2, _i5, _orderId5;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // const userInfo = this.$store.getters['user/getUserInfo']
                // if (userInfo.isReal !== 2) {
                // 	uni.showToast({
                // 		title: '请先实名',
                // 		icon: 'none'
                // 	});
                // 	return;
                // }
                console.log("提交订单");
                // // 检查是否同意协议
                if (_this4.checkBeforeSubmit()) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return");
              case 3:
                // 公共时间处理
                _this4$processPickupT = _this4.processPickupTime(), startDateTime = _this4$processPickupT.startDateTime, endDateTime = _this4$processPickupT.endDateTime; // 获取快递信息
                express = _this4.expressCompanies[_this4.formData.expressIndex].originalData; // 根据支付类型执行不同逻辑
                payStrategy = {
                  10: _this4.handleOfflinePayment.bind(_this4),
                  20: _this4.handleOfflinePayment.bind(_this4)
                };
                if (!express.payMethod) {
                  _context.next = 88;
                  break;
                }
                if (!(express.payMethod === 10 || express.payMethod === 20)) {
                  _context.next = 25;
                  break;
                }
                wechatId = 'PAY' + new Date().getTime() + Math.floor(Math.random() * 1000);
                price = parseFloat(_this4.getTotalFee().toFixed(2)) - parseFloat((_this4.formData.commissionAmount || 0).toFixed(2)) > 0 ? (parseFloat(_this4.getTotalFee().toFixed(2)) - parseFloat((_this4.formData.commissionAmount || 0).toFixed(2))).toFixed(2) : '0.00';
                openId = uni.getStorageSync('openId');
                if (!openId) {
                  user = _this4.$store.getters['user/getUserInfo'];
                  user.openId, (0, _readOnlyError2.default)("openId");
                }
                _context.next = 14;
                return _wechat.default.processPayment(openId, wechatId, price, "快递下单");
              case 14:
                payResult = _context.sent;
                if (!payResult.success) {
                  _context.next = 20;
                  break;
                }
                for (i = 0; i < _this4.batchOrders.length; i++) {
                  orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                  payStrategy[express.payMethod](_this4.batchOrders[i], express, startDateTime, endDateTime, orderId, wechatId);
                }
                _order.default.batchesAdd(_this4.orders).then(function (orderIds) {
                  if (orderIds) {
                    _this4.orderIds = orderIds;
                    _this4.handleOrderResult(orderIds);
                  }
                });
                _context.next = 23;
                break;
              case 20:
                // 支付失败
                console.log("支付结果:", payResult.message);
                if (!payResult.canceled) {
                  uni.showToast({
                    title: payResult.message,
                    icon: 'none'
                  });
                }
                return _context.abrupt("return");
              case 23:
                _context.next = 86;
                break;
              case 25:
                if (!(express.payMethod === 30)) {
                  _context.next = 86;
                  break;
                }
                if (!(!_this4.formData.useCommission && _this4.formData.paymentMethod === 'monthly')) {
                  _context.next = 31;
                  break;
                }
                for (_i = 0; _i < _this4.batchOrders.length; _i++) {
                  _orderId = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                  _this4.handleMonthlyPayment(_this4.batchOrders[_i], express, startDateTime, endDateTime, _orderId, _orderId);
                }
                _order.default.batchesAdd(_this4.orders).then(function (orderIds) {
                  if (orderIds) {
                    _this4.orderIds = orderIds;
                    // this.handleOrderResult(orderIds);
                    for (var j = 0; j < _this4.orderIds.length; j++) {
                      var statement = _this4.createMonthlyStatement(_this4.orderIds[j], _this4.orders[j].orderTotalPrice);
                      console.log(_this4.orders[j]);
                      _this4.statements.push(statement);
                    }
                    _monthly.default.batchesAdd(_this4.statements).then(function (statementResult) {
                      _this4.handleOrderResult(statementResult);
                    });
                  }
                });

                //佣金抵扣方式
                _context.next = 86;
                break;
              case 31:
                if (!(_this4.formData.useCommission && _this4.storeUserInfo.money > 0.00)) {
                  _context.next = 67;
                  break;
                }
                finalPrice = _this4.calculateFinalAmount();
                console.log(finalPrice);
                //佣金抵扣，如果佣金够那么就全额使用佣金
                if (!(finalPrice === '0.00')) {
                  _context.next = 40;
                  break;
                }
                _orderId2 = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                for (_i2 = 0; _i2 < _this4.batchOrders.length; _i2++) {
                  _this4.handleMonthlyPayment(_this4.batchOrders[_i2], express, startDateTime, endDateTime, _orderId2, _orderId2);
                }
                _order.default.batchesAdd(_this4.orders).then(function (orderIds) {
                  if (orderIds) {
                    _this4.orderIds = orderIds;
                    // this.handleOrderResult(orderIds);
                    for (var j = 0; j < _this4.orderIds.length; j++) {
                      var commissionFlow = _this4.createCommissionFlow(_this4.orderIds[j], _this4.orders[j]);
                      console.log(commissionFlow);
                      _this4.commissionFlows.push(commissionFlow);
                    }
                    _commissionFlow3.default.batchesAdd(_this4.commissionFlows).then(function (commissionFlowResult) {
                      if (commissionFlowResult) {
                        _user3.default.getUserById(_this4.storeUserInfo.userId).then(function (r2) {
                          if (r2) {
                            _this4.$store.commit('user/setUserInfo', r2);
                            _this4.handleOrderResult(r2);
                          }
                        });
                      }
                    });
                  }
                });
                // await this.handleUseCommission(order,express, startDateTime, endDateTime);
                //如果佣金不够
                _context.next = 65;
                break;
              case 40:
                if (!(_this4.formData.paymentMethod === 'monthly')) {
                  _context.next = 47;
                  break;
                }
                commissionDeductionAmount = 0;
                money = _this4.storeUserInfo.money;
                for (_i3 = 0; _i3 < _this4.batchOrders.length; _i3++) {
                  if (money > _this4.batchOrders[_i3].price) {
                    commissionDeductionAmount = _this4.batchOrders[_i3].price;
                    money = money - _this4.batchOrders[_i3].price;
                  } else {
                    commissionDeductionAmount = money;
                    // this.storeUserInfo.money = 0;
                  }
                  // console.log(money)
                  // console.log(commissionDeductionAmount)
                  _orderId3 = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                  _this4.handleUseCommissionAndMonthlyPayment(_this4.batchOrders[_i3], express, startDateTime, endDateTime, commissionDeductionAmount, 4, _orderId3, _orderId3);
                }
                _order.default.batchesAdd(_this4.orders).then(function (orderIds) {
                  if (orderIds) {
                    _this4.orderIds = orderIds;

                    // this.handleOrderResult(orderIds);
                    for (var j = 0; j < _this4.orderIds.length; j++) {
                      if (_this4.storeUserInfo.money - _this4.orders[j].orderTotalPrice >= 0.00) {
                        var commissionFlow = _this4.createCommissionFlow(_this4.orderIds[j], _this4.orders[j].orderTotalPrice);
                        _this4.commissionFlows.push(commissionFlow);
                      } else {
                        var _price = _this4.orders[j].orderTotalPrice - _this4.storeUserInfo.money;
                        var _commissionFlow = _this4.createCommissionFlow(_this4.orderIds[j], _this4.storeUserInfo.money);
                        _this4.commissionFlows.push(_commissionFlow);
                        var statement = _this4.createMonthlyStatement(_this4.orderIds[j], _price);
                        _this4.statements.push(statement);
                        _this4.storeUserInfo.money = 0.00;
                      }
                    }
                    _commissionFlow3.default.batchesAdd(_this4.commissionFlows).then(function (commissionFlowResult) {
                      if (commissionFlowResult) {
                        _monthly.default.batchesAdd(_this4.statements).then(function (statementResult) {
                          if (statementResult) {
                            _user3.default.getUserById(_this4.storeUserInfo.userId).then(function (r2) {
                              if (r2) {
                                _this4.$store.commit('user/setUserInfo', r2);
                                _this4.handleOrderResult(r2);
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
                //剩下使用微信支付
                _context.next = 65;
                break;
              case 47:
                if (!(_this4.formData.paymentMethod === 'online')) {
                  _context.next = 65;
                  break;
                }
                _commissionDeductionAmount = 0;
                _money = _this4.storeUserInfo.money;
                _wechatId = 'PAY' + new Date().getTime() + Math.floor(Math.random() * 1000);
                _price2 = parseFloat(_this4.getTotalFee().toFixed(2)) - parseFloat((_this4.formData.commissionAmount || 0).toFixed(2)) > 0 ? (parseFloat(_this4.getTotalFee().toFixed(2)) - parseFloat((_this4.formData.commissionAmount || 0).toFixed(2))).toFixed(2) : '0.00';
                _openId = uni.getStorageSync('openId');
                if (!_openId) {
                  _user = _this4.$store.getters['user/getUserInfo'];
                  _user.openId, (0, _readOnlyError2.default)("openId");
                }
                _context.next = 56;
                return _wechat.default.processPayment(_openId, _wechatId, _price2, "快递下单");
              case 56:
                _payResult = _context.sent;
                if (!_payResult.success) {
                  _context.next = 62;
                  break;
                }
                for (_i4 = 0; _i4 < _this4.batchOrders.length; _i4++) {
                  if (_money > _this4.batchOrders[_i4].price) {
                    _commissionDeductionAmount = _this4.batchOrders[_i4].price;
                    _money = _money - _this4.batchOrders[_i4].price;
                  } else {
                    _commissionDeductionAmount = _money;
                    // this.storeUserInfo.money = 0;
                  }
                  // console.log(money)
                  // console.log(commissionDeductionAmount)
                  _orderId4 = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                  _this4.handleUseCommissionAndMonthlyPayment(_this4.batchOrders[_i4], express, startDateTime, endDateTime, _commissionDeductionAmount, 1, _orderId4, _wechatId);
                }
                _order.default.batchesAdd(_this4.orders).then(function (orderIds) {
                  if (orderIds) {
                    _this4.orderIds = orderIds;
                    // this.handleOrderResult(orderIds);
                    for (var j = 0; j < _this4.orderIds.length; j++) {
                      if (_this4.storeUserInfo.money - _this4.orders[j].orderTotalPrice >= 0.00) {
                        var commissionFlow = _this4.createCommissionFlow(_this4.orderIds[j], _this4.orders[j].orderTotalPrice);
                        _this4.commissionFlows.push(commissionFlow);
                      } else {
                        var _price3 = _this4.orders[j].orderTotalPrice - _this4.storeUserInfo.money;
                        var _commissionFlow2 = _this4.createCommissionFlow(_this4.orderIds[j], _this4.storeUserInfo.money);
                        _this4.commissionFlows.push(_commissionFlow2);
                        _this4.storeUserInfo.money = 0.00;
                      }
                    }
                    _commissionFlow3.default.batchesAdd(_this4.commissionFlows).then(function (commissionFlowResult) {
                      if (commissionFlowResult) {
                        _user3.default.getUserById(_this4.storeUserInfo.userId).then(function (r2) {
                          if (r2) {
                            _this4.$store.commit('user/setUserInfo', r2);
                            _this4.handleOrderResult(r2);
                          }
                        });
                      }
                    });
                  }
                });
                _context.next = 65;
                break;
              case 62:
                // 支付失败
                console.log("支付结果:", _payResult.message);
                if (!_payResult.canceled) {
                  uni.showToast({
                    title: _payResult.message,
                    icon: 'none'
                  });
                }
                return _context.abrupt("return");
              case 65:
                _context.next = 86;
                break;
              case 67:
                if (!(!_this4.formData.useCommission && _this4.formData.paymentMethod === 'online')) {
                  _context.next = 85;
                  break;
                }
                _wechatId2 = 'PAY' + new Date().getTime() + Math.floor(Math.random() * 1000);
                _price4 = parseFloat(_this4.getTotalFee().toFixed(2)) - parseFloat((_this4.formData.commissionAmount || 0).toFixed(2)) > 0 ? (parseFloat(_this4.getTotalFee().toFixed(2)) - parseFloat((_this4.formData.commissionAmount || 0).toFixed(2))).toFixed(2) : '0.00';
                _openId2 = uni.getStorageSync('openId');
                if (!_openId2) {
                  _user2 = _this4.$store.getters['user/getUserInfo'];
                  _user2.openId, (0, _readOnlyError2.default)("openId");
                }
                _context.next = 74;
                return _wechat.default.processPayment(_openId2, _wechatId2, _price4, "快递下单");
              case 74:
                _payResult2 = _context.sent;
                if (!_payResult2.success) {
                  _context.next = 80;
                  break;
                }
                for (_i5 = 0; _i5 < _this4.batchOrders.length; _i5++) {
                  _orderId5 = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                  _this4.handleWechatPay(_this4.batchOrders[_i5], express, startDateTime, endDateTime, _orderId5, _wechatId2);
                }
                _order.default.batchesAdd(_this4.orders).then(function (orderIds) {
                  if (orderIds) {
                    _this4.orderIds = orderIds;
                    _this4.handleOrderResult(orderIds);
                  }
                });
                _context.next = 83;
                break;
              case 80:
                // 支付失败
                console.log("支付结果:", _payResult2.message);
                if (!_payResult2.canceled) {
                  uni.showToast({
                    title: _payResult2.message,
                    icon: 'none'
                  });
                }
                return _context.abrupt("return");
              case 83:
                _context.next = 86;
                break;
              case 85:
                if (!_this4.formData.useCommission && _this4.formData.paymentMethod === 'onlineCollect') {
                  (function () {
                    var errorNumber = '';
                    var promises = []; // 存储所有的Promise
                    var _loop = function _loop(_i6) {
                      var promise = _user3.default.isRealByPhone(_this4.batchOrders[_i6].receiverMobile).then(function (res) {
                        if (res) {
                          if (res === '0') {
                            var _orderId6 = 'ORDER' + new Date().getTime() + Math.floor(Math.random() * 1000);
                            _this4.handleOnlineCollect(_this4.batchOrders[_i6], express, startDateTime, endDateTime, _orderId6, _orderId6);
                          } else {
                            errorNumber = errorNumber + _this4.batchOrders[_i6].receiverMobile + ';';
                            console.log(errorNumber);
                          }
                        }
                      });
                      promises.push(promise);
                    };
                    for (var _i6 = 0; _i6 < _this4.batchOrders.length; _i6++) {
                      _loop(_i6);
                    }

                    // 等待所有Promise完成
                    Promise.all(promises).then(function () {
                      if (_this4.orders.length > 0) {
                        _order.default.batchesAdd(_this4.orders).then(function (orderIds) {
                          if (orderIds) {
                            _this4.orderIds = orderIds;
                            _this4.handleOrderResult(orderIds);
                          }
                        });
                      } else {
                        var errortTile = '部分下单失败，请及时通知收件人' + errorNumber + '注册并实名"神州邮"';
                        uni.showToast({
                          title: errortTile,
                          icon: 'none',
                          duration: 3000 // 3000ms = 3秒
                        });
                      }
                    });
                  })();
                }
              case 86:
                _context.next = 90;
                break;
              case 88:
                console.error('未知的支付方式:', express.payMethod);
                uni.showToast({
                  title: '不支持的支付方式',
                  icon: 'none'
                });
              case 90:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    //处理微信支付
    handleOnlineCollect: function handleOnlineCollect(order, express, startDateTime, endDateTime, orderId, wechatId) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var orderData;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                uni.showLoading({
                  title: '下单中...',
                  mask: true
                });
                try {
                  // const requestData = this.createBaseRequestData(order, express, startDateTime, endDateTime);
                  // requestData.businessParams.onlinePay = "Y";
                  // requestData.businessParams.payMethod = 30;
                  // const expressRes = await expressApi.createExpress(requestData);
                  // if (!expressRes) throw new Error('快递下单失败');
                  orderData = _this5.createOrderData(order, express, 2,
                  // 支付方式
                  7,
                  // 订单状态
                  startDateTime, endDateTime, 0, order.price, orderId, wechatId);
                  orderData.orderNo = '';
                  orderData.deliveryId = '';
                  // orderData.orderNo = '测试';
                  // orderData.deliveryId = '测试';
                  _this5.orders.push(orderData);
                } catch (error) {
                  console.error('创建线上到付订单失败:', error);
                  uni.showToast({
                    title: '下单失败',
                    icon: 'none'
                  });
                }
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 公共方法 - 处理时间
    processPickupTime: function processPickupTime() {
      var formatTime = function formatTime(rawTime) {
        var _rawTime$split = rawTime.split(":"),
          _rawTime$split2 = (0, _slicedToArray2.default)(_rawTime$split, 2),
          hour = _rawTime$split2[0],
          minute = _rawTime$split2[1];
        return "".concat(hour.padStart(2, "0"), ":").concat(minute, ":00");
      };
      var _this$formData$pickup = this.formData.pickupTime.split("-"),
        _this$formData$pickup2 = (0, _slicedToArray2.default)(_this$formData$pickup, 2),
        startRaw = _this$formData$pickup2[0],
        endRaw = _this$formData$pickup2[1];
      return {
        startDateTime: "".concat(this.formData.pickupDate, " ").concat(formatTime(startRaw)),
        endDateTime: "".concat(this.formData.pickupDate, " ").concat(formatTime(endRaw))
      };
    },
    // 公共方法 - 创建基础请求数据
    createBaseRequestData: function createBaseRequestData(order, express, startDateTime, endDateTime, thirdNo) {
      console.log(order);
      var baseData = {
        deliveryBusiness: express.deliveryBusiness,
        channelId: express.channelId,
        pickUpStartTime: startDateTime,
        pickUpEndTime: endDateTime,
        deliveryType: express.deliveryType,
        // 收件人信息
        receiveAddress: order.receiverDetailAddress || '',
        receiveMobile: order.receiverMobile,
        receiveTel: order.receiverTel || "",
        receiveName: order.receiverName,
        receiveProvince: order.receiverProvince,
        receiveCity: order.receiverCity,
        receiveDistrict: order.receiverDistrict,
        // 发件人信息
        senderAddress: order.senderDetailAddress || '',
        senderMobile: order.senderMobile,
        senderTel: order.senderTel || "",
        senderName: order.senderName,
        senderProvince: order.senderProvince,
        senderCity: order.senderCity,
        senderDistrict: order.senderDistrict,
        // 物品信息
        goods: order.itemTypeName,
        packageCount: order.packageCount || 1,
        weight: order.estimatedItemWeight,
        vloumLong: order.length,
        vloumWidth: order.width,
        vloumHeight: order.height,
        // 其他公共参数
        customerType: "kd",
        guaranteeValueAmount: order.insuranceValue || 0,
        thirdNo: "TD" + Date.now(),
        remark: order.remark
      };

      // 体积参数处理
      if (this.hasVolumeDimensions(order)) {
        baseData.vloumLong = order.length;
        baseData.vloumWidth = order.width;
        baseData.vloumHeight = order.height;
      }
      return {
        businessParams: baseData
      };
    },
    // 公共方法 - 创建订单数据
    createOrderData: function createOrderData(order, express, paymentMethod, orderStatus, startDateTime, endDateTime, commissionDeductionAmount, orderPrice, orderId, wechatId) {
      var insuranceFee = this.formatPrice(this.calculateInsuranceFee(order));
      return {
        orderId: orderId,
        wechatId: wechatId,
        userId: this.storeUserInfo.userId,
        // 寄件人信息
        senderName: order.senderName,
        senderPhone: order.senderMobile,
        senderProvince: order.senderProvince,
        senderCity: order.senderCity,
        senderDistrict: order.senderDistrict,
        senderDetailAddress: order.senderDetailAddress || '',
        // 收货人信息
        receiverDetailAddress: order.receiverDetailAddress || '',
        receiverPhone: order.receiverMobile,
        receiverName: order.receiverName,
        receiverProvince: order.receiverProvince,
        receiverCity: order.receiverCity,
        receiverDistrict: order.receiverDistrict,
        deliveryBusiness: express.deliveryBusiness,
        // 订单信息
        expressCode: express.deliveryType,
        typeId: express.channelId,
        goods: order.itemTypeName,
        estimatedItemWeight: order.estimatedItemWeight,
        actualWeight: '',
        length: order.length,
        width: order.width,
        height: order.height,
        pickUpStartTime: startDateTime,
        pickUpEndTime: endDateTime,
        shippingTime: '',
        receivingTime: '',
        guaranteeValueAmount: order.insuranceValue,
        insuranceFee: insuranceFee,
        paymentMethod: paymentMethod,
        commissionDeductionAmount: commissionDeductionAmount,
        orderTotalPrice: orderPrice,
        amountAfterCommissionDeduction: orderPrice - commissionDeductionAmount,
        orderPriceDifference: 0,
        shippingStatus: 0,
        isPriceDifferencePaid: 0,
        orderStatus: orderStatus,
        remark: order.remark
      };
    },
    // 辅助方法 - 计算最终金额
    calculateFinalAmount: function calculateFinalAmount() {
      var total = parseFloat((this.totalFee || 0).toFixed(2));
      var commission = parseFloat((this.formData.commissionAmount || 0).toFixed(2));
      var final = total - commission;
      return final > 0 ? final.toFixed(2) : '0.00';
    },
    // 辅助方法 - 判断是否有体积信息
    hasVolumeDimensions: function hasVolumeDimensions(order) {
      return order.length && order.width && order.height;
    },
    // 处理线下支付（寄付/到付）
    handleOfflinePayment: function handleOfflinePayment(order, express, startDateTime, endDateTime, orderId, wechatId) {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var requestData, expressRes, orderData;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                uni.showLoading({
                  title: '下单中...',
                  mask: true
                });
                _context3.prev = 1;
                requestData = _this6.createBaseRequestData(order, express, startDateTime, endDateTime);
                requestData.businessParams.onlinePay = "N";
                requestData.businessParams.payMethod = express.payMethod;
                _context3.next = 7;
                return _express.default.createExpress(requestData);
              case 7:
                expressRes = _context3.sent;
                if (expressRes) {
                  _context3.next = 10;
                  break;
                }
                throw new Error('快递下单失败');
              case 10:
                _this6.expressOrders.push(requestData);
                orderData = _this6.createOrderData(order, express, express.payMethod === 10 ? 0 : 1,
                // 支付方式映射
                5,
                // 订单状态
                startDateTime, endDateTime, 0, order.price, orderId, wechatId);
                orderData.orderNo = expressRes.orderNo || '';
                orderData.deliveryId = expressRes.deliveryId || '';
                // orderData.orderNo = '测试';
                // orderData.deliveryId = '测试';
                _this6.orders.push(orderData);
                _context3.next = 21;
                break;
              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](1);
                console.error('下单失败:', _context3.t0);
                uni.showToast({
                  title: '下单失败',
                  icon: 'none'
                });
              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 17]]);
      }))();
    },
    handleUseCommissionAndMonthlyPayment: function handleUseCommissionAndMonthlyPayment(order, express, startDateTime, endDateTime, commissionDeductionAmount, payFuntion, orderId, wechatId) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var requestData, expressRes, orderData;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                uni.showLoading({
                  title: '下单中...',
                  mask: true
                });
                _context4.prev = 1;
                requestData = _this7.createBaseRequestData(order, express, startDateTime, endDateTime);
                requestData.businessParams.onlinePay = "Y";
                requestData.businessParams.payMethod = 30;
                _context4.next = 7;
                return _express.default.createExpress(requestData);
              case 7:
                expressRes = _context4.sent;
                if (expressRes) {
                  _context4.next = 10;
                  break;
                }
                throw new Error('快递下单失败');
              case 10:
                orderData = _this7.createOrderData(order, express, 2,
                // 支付方式
                payFuntion,
                // 订单状态
                startDateTime, endDateTime, commissionDeductionAmount, order.price, orderId, wechatId, orderId, wechatId);
                orderData.orderNo = expressRes.orderNo || '';
                orderData.deliveryId = expressRes.deliveryId || '';
                // orderData.orderNo = '测试';
                // orderData.deliveryId = '测试';
                _this7.orders.push(orderData);
                _context4.next = 20;
                break;
              case 16:
                _context4.prev = 16;
                _context4.t0 = _context4["catch"](1);
                console.error('月结支付失败:', _context4.t0);
                uni.showToast({
                  title: '下单失败',
                  icon: 'none'
                });
              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 16]]);
      }))();
    },
    handleUseCommission: function handleUseCommission(order, express, startDateTime, endDateTime) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var requestData, expressRes, orderData, orderRes, commissionFlow;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                uni.showLoading({
                  title: '下单中...',
                  mask: true
                });
                _context5.prev = 1;
                requestData = _this8.createBaseRequestData(order, express, startDateTime, endDateTime);
                requestData.businessParams.onlinePay = "Y";
                requestData.businessParams.payMethod = 30;
                _context5.next = 7;
                return _express.default.createExpress(requestData);
              case 7:
                expressRes = _context5.sent;
                if (expressRes) {
                  _context5.next = 10;
                  break;
                }
                throw new Error('快递下单失败');
              case 10:
                orderData = _this8.createOrderData(order, express, 2,
                // 支付方式
                1,
                // 订单状态
                startDateTime, endDateTime, order.price, order.price);
                orderData.orderNo = expressRes.orderNo || '';
                orderData.deliveryId = expressRes.deliveryId || '';

                // orderData.orderNo = '测试';
                // orderData.deliveryId = '测试';
                _context5.next = 15;
                return _order.default.createOrder(orderData);
              case 15:
                orderRes = _context5.sent;
                if (orderRes) {
                  _context5.next = 18;
                  break;
                }
                throw new Error('订单创建失败');
              case 18:
                _context5.next = 20;
                return _this8.createCommissionFlow(orderRes);
              case 20:
                commissionFlow = _context5.sent;
                _context5.next = 23;
                return _this8.$store.dispatch('user/updateUserInfo');
              case 23:
                _this8.handleOrderResult(commissionFlow);
                _context5.next = 30;
                break;
              case 26:
                _context5.prev = 26;
                _context5.t0 = _context5["catch"](1);
                console.error('月结支付失败:', _context5.t0);
                uni.showToast({
                  title: '下单失败',
                  icon: 'none'
                });
              case 30:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 26]]);
      }))();
    },
    // 处理月结支付
    handleMonthlyPayment: function handleMonthlyPayment(order, express, startDateTime, endDateTime, orderId, wechatId) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var requestData, expressRes, orderData;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                uni.showLoading({
                  title: '下单中...',
                  mask: true
                });
                _context6.prev = 1;
                requestData = _this9.createBaseRequestData(order, express, startDateTime, endDateTime);
                requestData.businessParams.onlinePay = "Y";
                requestData.businessParams.payMethod = 30;
                _context6.next = 7;
                return _express.default.createExpress(requestData);
              case 7:
                expressRes = _context6.sent;
                if (expressRes) {
                  _context6.next = 10;
                  break;
                }
                throw new Error('快递下单失败');
              case 10:
                orderData = _this9.createOrderData(order, express, 2,
                // 支付方式
                4,
                // 订单状态
                startDateTime, endDateTime, 0, order.price, orderId, wechatId);
                orderData.orderNo = expressRes.orderNo || '';
                orderData.deliveryId = expressRes.deliveryId || '';
                // orderData.orderNo = '测试';
                // orderData.deliveryId = '测试';
                _this9.orders.push(orderData);
                _context6.next = 20;
                break;
              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6["catch"](1);
                console.error('月结支付失败:', _context6.t0);
                uni.showToast({
                  title: '下单失败',
                  icon: 'none'
                });
              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 16]]);
      }))();
    },
    //处理微信支付
    handleWechatPay: function handleWechatPay(order, express, startDateTime, endDateTime, orderId, wechatId) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var requestData, expressRes, orderData;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                uni.showLoading({
                  title: '下单中...',
                  mask: true
                });
                _context7.prev = 1;
                requestData = _this10.createBaseRequestData(order, express, startDateTime, endDateTime);
                requestData.businessParams.onlinePay = "Y";
                requestData.businessParams.payMethod = 30;
                _context7.next = 7;
                return _express.default.createExpress(requestData);
              case 7:
                expressRes = _context7.sent;
                if (expressRes) {
                  _context7.next = 10;
                  break;
                }
                throw new Error('快递下单失败');
              case 10:
                orderData = _this10.createOrderData(order, express, 2,
                // 支付方式
                1,
                // 订单状态
                startDateTime, endDateTime, 0, order.price, orderId, wechatId);
                orderData.orderNo = expressRes.orderNo || '';
                orderData.deliveryId = expressRes.deliveryId || '';
                // orderData.orderNo = '测试';
                // orderData.deliveryId = '测试';
                _this10.orders.push(orderData);
                _context7.next = 20;
                break;
              case 16:
                _context7.prev = 16;
                _context7.t0 = _context7["catch"](1);
                console.error('月结支付失败:', _context7.t0);
                uni.showToast({
                  title: '下单失败',
                  icon: 'none'
                });
              case 20:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[1, 16]]);
      }))();
    },
    // 创建月结账单
    createMonthlyStatement: function createMonthlyStatement(orderId, orderTotalPrice) {
      var statement = {
        userId: this.storeUserInfo.userId,
        monthlySettlementEligibilityId: this.storeUserInfo.monthlySettlementEligibilityId,
        orderId: orderId,
        type: 0,
        isUserPays: 0,
        amount: orderTotalPrice
      };
      return statement;
    },
    //创建微信支付流水记录
    createPaymentFlow: function createPaymentFlow(orderId, orderTotalPrice, merchantOrderId, transactionId) {
      var paymentFlow = {
        userId: this.storeUserInfo.userId,
        merchantOrderId: merchantOrderId,
        description: '',
        orderId: orderId,
        openid: '',
        transactionId: transactionId,
        refundFlag: 0,
        errorDescription: '',
        amount: orderTotalPrice
      };
      return paymentFlow;
    },
    // 创建佣金抵扣账单
    createCommissionFlow: function createCommissionFlow(orderId, orderTotalPrice) {
      this.storeUserInfo.money = this.storeUserInfo.money - orderTotalPrice;
      var balance = this.storeUserInfo.money;
      var commissionFlow = {
        userId: this.storeUserInfo.userId,
        monthlySettlementEligibilityId: this.storeUserInfo.monthlySettlementEligibilityId,
        orderId: orderId,
        type: 0,
        isUserPays: 0,
        amount: -orderTotalPrice,
        balance: balance,
        flowType: 1
      };
      return commissionFlow;
    },
    // 处理订单结果
    handleOrderResult: function handleOrderResult(result) {
      if (result) {
        uni.showToast({
          title: '下单成功',
          icon: 'success'
        });
        setTimeout(function () {
          return uni.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      } else {
        uni.showToast({
          title: '下单失败',
          icon: 'none'
        });
      }
    },
    // 计算保险费
    calculateInsuranceFee: function calculateInsuranceFee(order) {
      if (!order || !order.insured || !order.insuranceValue) {
        return 0;
      }
      var expressIndex = order.expressIndex || 0;
      var insuranceFee = 0; // 默认保价费

      // 获取保价金额
      var insValue = parseFloat(order.insuranceValue);
      if (isNaN(insValue) || insValue <= 0) return 0;

      // 从快递公司配置中获取保价规则
      if (this.expressCompanies && this.expressCompanies.length > expressIndex && this.expressCompanies[expressIndex].bjRule) {
        try {
          // 尝试解析bjRule JSON字符串
          var bjRuleStr = this.expressCompanies[expressIndex].bjRule;
          var bjRules = JSON.parse(bjRuleStr);

          // 确保bjRules是数组
          if (!Array.isArray(bjRules)) {
            // 如果不是数组，可能是单一规则或者百分比
            var rateNum = parseFloat(bjRuleStr);
            if (!isNaN(rateNum)) {
              // 按照百分比计算
              return insValue * (rateNum / 100);
            }
            return insValue * 0.01; // 默认1%
          }

          // 遍历规则寻找适用范围
          var _iterator2 = _createForOfIteratorHelper(bjRules),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var rule = _step2.value;
              var start = parseFloat(rule.start || 0);
              var end = parseFloat(rule.end || 0);

              // 判断保价金额是否在当前规则范围内
              if (insValue >= start && (end === 0 || insValue <= end)) {
                // 存在固定价格
                if (rule.bjPrice !== undefined) {
                  insuranceFee = parseFloat(rule.bjPrice);
                }
                // 存在费率
                else if (rule.bjRate !== undefined) {
                  insuranceFee = insValue * parseFloat(rule.bjRate);
                }
                break; // 找到适用规则后退出循环
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } catch (e) {
          console.error('解析保价规则出错:', e);
          // 解析失败时使用默认计算(1%)
          insuranceFee = insValue * 0.01;
        }
      } else {
        // 没有规则时使用默认费率1%
        insuranceFee = insValue * 0.01;
      }
      return insuranceFee;
    },
    // 检查月结资格
    checkMonthlyEligibility: function checkMonthlyEligibility() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var eligibilityId, code, result;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                if (!(_this11.storeUserInfo && _this11.storeUserInfo.isMonth === 1)) {
                  _context8.next = 17;
                  break;
                }
                // 用户基本具有月结权限，现在检查资格是否有效
                eligibilityId = _this11.storeUserInfo.monthlySettlementEligibilityId;
                code = _this11.storeUserInfo.code; // 用户的验证码
                console.log('检查月结资格:', eligibilityId, code);
                if (!(eligibilityId && code)) {
                  _context8.next = 13;
                  break;
                }
                _context8.next = 8;
                return _monthly.default.checkEffective(eligibilityId, code);
              case 8:
                result = _context8.sent;
                // 1表示有效
                _this11.hasMonthlyEligibility = result === 1;
                console.log('月结资格检查结果:', _this11.hasMonthlyEligibility ? '有效' : '无效');
                _context8.next = 15;
                break;
              case 13:
                console.log('缺少月结资格ID或验证码');
                _this11.hasMonthlyEligibility = false;
              case 15:
                _context8.next = 19;
                break;
              case 17:
                console.log('用户不具备月结权限');
                _this11.hasMonthlyEligibility = false;
              case 19:
                _context8.next = 26;
                break;
              case 21:
                _context8.prev = 21;
                _context8.t0 = _context8["catch"](0);
                console.error('检查月结资格出错:', _context8.t0);
                _this11.hasMonthlyEligibility = false;
                uni.showToast({
                  title: '月结资格检查失败',
                  icon: 'none'
                });
              case 26:
                // 如果没有月结资格，且当前支付方式为月结，则改为在线支付
                if (!_this11.hasMonthlyEligibility && _this11.formData.onlinePayType === 'monthly') {
                  _this11.formData.onlinePayType = 'online';
                }
              case 27:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 21]]);
      }))();
    },
    // 加载用户佣金
    loadUserCommission: function loadUserCommission() {
      try {
        if (this.storeUserInfo && this.storeUserInfo.money !== undefined) {
          this.userCommission = parseFloat(this.storeUserInfo.money) || 0;
          console.log('加载用户佣金成功:', this.userCommission);

          // 如果佣金为0，禁用佣金抵扣
          if (this.userCommission <= 0) {
            this.formData.useCommission = false;
            this.formData.commissionAmount = 0;
          }

          // 重新计算抵扣金额
          if (this.formData.useCommission) {
            this.calculateCommissionDeduction();
          }
        } else {
          console.log('用户未登录或佣金信息不存在');
          this.userCommission = 0;
        }
      } catch (error) {
        console.error('加载用户佣金出错:', error);
        this.userCommission = 0;
      }
    },
    // 计算佣金抵扣金额
    calculateCommissionDeduction: function calculateCommissionDeduction() {
      if (!this.formData.useCommission || this.userCommission <= 0) {
        this.formData.commissionAmount = 0;
        return;
      }

      // 计算可抵扣金额（不超过总费用，也不超过可用佣金）
      var total = this.totalFee || 0;
      var maxDeduction = Math.min(total, this.userCommission);
      this.formData.commissionAmount = parseFloat(maxDeduction.toFixed(2));
      console.log('佣金抵扣计算:', {
        总费用: total,
        可用佣金: this.userCommission,
        抵扣金额: this.formData.commissionAmount
      });
    },
    // 切换保险服务
    toggleInsurance: function toggleInsurance() {
      this.formData.insured = !this.formData.insured;
      if (!this.formData.insured) {
        this.formData.insuranceValue = '';
      }
    },
    // 验证保价金额
    validateInsuranceValue: function validateInsuranceValue(e) {
      var value = e.detail ? e.detail.value : this.formData.insuranceValue;

      // 只允许数字和小数点
      value = value.replace(/[^\d.]/g, '');

      // 确保只有一个小数点
      var parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }

      // 限制小数位数为2位
      if (parts.length > 1 && parts[1].length > 2) {
        value = parts[0] + '.' + parts[1].substring(0, 2);
      }

      // 限制最大值（假设10万元为上限）
      if (parseFloat(value) > 100000) {
        value = '100000';
      }
      this.formData.insuranceValue = value;
    },
    // 格式化价格显示 - 别忘了这里的逗号
    formatPrice: function formatPrice(price) {
      return parseFloat(price || 0).toFixed(2);
    },
    // 初始化取件日期选项 - 修改标签格式
    initPickupDateOptions: function initPickupDateOptions() {
      var options = [];
      var now = new Date();

      // 今天的日期（如果已过截止时间，则不包含今天）
      var currentHour = now.getHours();
      var startDay = 0; // 从今天开始

      // 如果已经超过下午5点，则不能选择今天
      if (currentHour >= 16) {
        startDay = 1; // 从明天开始
      }

      // 生成未来7天的日期选项
      for (var i = startDay; i < startDay + 7; i++) {
        var date = new Date();
        date.setDate(now.getDate() + i);

        // 格式化日期为 YYYY-MM-DD
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        var dateStr = "".concat(year, "-").concat(month, "-").concat(day);

        // 获取星期几
        var weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];

        // 统一使用相同的标签格式，不再添加"今天"、"明天"字样
        var label = "".concat(month, "\u6708").concat(day, "\u65E5 ").concat(weekday);
        options.push({
          value: dateStr,
          label: label,
          isToday: i === 0
        });
      }
      this.pickupDateOptions = options;

      // 默认选择第一个可用日期
      if (options.length > 0 && !this.formData.pickupDate) {
        this.formData.pickupDate = options[0].value;

        // 如果选择的是今天，过滤掉已过的时间段
        this.updateAvailableTimeOptions();
      }
    },
    // 更新可用的时间段选项
    updateAvailableTimeOptions: function updateAvailableTimeOptions() {
      var _this12 = this;
      // 如果选择的是今天，需要过滤已过的时间段
      var selectedDateObj = this.pickupDateOptions.find(function (o) {
        return o.value === _this12.formData.pickupDate;
      });
      if (selectedDateObj && selectedDateObj.isToday) {
        var now = new Date();
        var currentHour = now.getHours();

        // 过滤已过的时间段
        var availableTimeOptions = this.pickupTimeOptions.filter(function (option) {
          var startHour = parseInt(option.value.split(':')[0]);
          // 提前2小时截止
          return startHour > currentHour + 2;
        });

        // 如果当前选择的时间段已不可用，重置选择
        if (this.formData.pickupTime) {
          var isCurrentTimeAvailable = availableTimeOptions.some(function (o) {
            return o.value === _this12.formData.pickupTime;
          });
          if (!isCurrentTimeAvailable) {
            this.formData.pickupTime = availableTimeOptions.length > 0 ? availableTimeOptions[0].value : '';
          }
        } else if (availableTimeOptions.length > 0) {
          // 默认选择第一个可用时间段
          this.formData.pickupTime = availableTimeOptions[0].value;
        }
        return availableTimeOptions;
      }

      // 如果不是今天，所有时间段都可用
      if (!this.formData.pickupTime && this.pickupTimeOptions.length > 0) {
        // 默认选择第一个时间段
        this.formData.pickupTime = this.pickupTimeOptions[0].value;
      }
      return this.pickupTimeOptions;
    },
    // 选择取件日期
    selectPickupDate: function selectPickupDate(date) {
      var _this13 = this;
      // console.log('选择取件日期:', date);

      // 使用临时变量存储之前的日期
      var oldDate = this.formData.pickupDate;

      // 强制更新对象，确保Vue检测到变化
      var newFormData = _objectSpread({}, this.formData);
      newFormData.pickupDate = date;
      this.formData = newFormData;

      // console.log(`取件日期已从${oldDate}更新为${this.formData.pickupDate}`);

      // 检查时间是否需要重置
      this.$nextTick(function () {
        var availableTimeOptions = _this13.updateAvailableTimeOptions();
        if (availableTimeOptions.length > 0) {
          var timeValues = availableTimeOptions.map(function (item) {
            return item.value;
          });
          if (!timeValues.includes(_this13.formData.pickupTime)) {
            var _newFormData = _objectSpread({}, _this13.formData);
            _newFormData.pickupTime = availableTimeOptions[0].value;
            _this13.formData = _newFormData;
          }
        }
      });
    },
    // 选择取件时间段
    selectPickupTime: function selectPickupTime(time) {
      // console.log('选择取件时间:', time);

      // 使用临时变量存储之前的时间
      var oldTime = this.formData.pickupTime;

      // 强制更新对象，确保Vue检测到变化
      var newFormData = _objectSpread({}, this.formData);
      newFormData.pickupTime = time;
      this.formData = newFormData;
    },
    // 初始化方法中调用
    onLoad: function onLoad() {
      // 初始化取件日期选项
      this.initPickupDateOptions();

      // 检查是否有缓存数据
      var cachedOrders = uni.getStorageSync('batchOrders');
      if (cachedOrders) {
        try {
          var parsedOrders = cachedOrders;
          // 只有当缓存中有数据时才替换示例数据
          if (parsedOrders && parsedOrders.length > 0) {
            this.batchOrders = parsedOrders;
            for (var i = 0; i < this.batchOrders.length; i++) {
              this.queryExpressOptions(this.batchOrders[i], true);
            }
          }
        } catch (e) {
          console.error('解析缓存订单数据失败:', e);
          // 保留默认示例数据
        }
      }

      // 检查月结资格
      this.checkMonthlyEligibility();
    },
    // 选择支付方式
    selectPaymentMethod: function selectPaymentMethod(method, event) {
      // 如果传入了事件对象，阻止事件冒泡
      if (event) {
        event.stopPropagation();
      }

      // 检查是否支持该支付方式
      if (this.isPaymentMethodSupported(method)) {
        // 使用Vue.set确保响应式更新
        this.$set(this.formData, 'paymentMethod', method);

        // 强制更新视图以确保UI立即刷新
        this.$forceUpdate();
        if (method === 'onlineCollect') {
          this.$set(this.formData, 'useCommission', false);
          this.$set(this.formData, 'commissionAmount', 0);
          this.canUseCommission = false;
        } else {
          this.canUseCommission = true;
        }
        // 可选：使用nextTick确保DOM更新
        this.$nextTick(function () {
          console.log('支付方式已更新为:', method);
        });
      } else {
        uni.showToast({
          title: '当前快递不支持该支付方式',
          icon: 'none'
        });
      }
    },
    // 初始化支付方式
    initPaymentMethods: function initPaymentMethods() {
      // 检查用户是否有月结账户
      this.checkMonthlyAccount();

      // 检查选择的快递是否支持到付
      this.checkCodSupport();
    },
    // 检查月结账户
    checkMonthlyAccount: function checkMonthlyAccount() {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var userInfo, res;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                // 获取用户信息
                userInfo = uni.getStorageSync('userInfo') || {}; // console.log('检查月结资格，userInfo:', userInfo);
                if (!(userInfo.isMonth === 1)) {
                  _context9.next = 12;
                  break;
                }
                if (!(userInfo.monthlySettlementEligibilityId && userInfo.code)) {
                  _context9.next = 9;
                  break;
                }
                _context9.next = 5;
                return _monthly.default.checkEffective(userInfo.monthlySettlementEligibilityId, userInfo.code);
              case 5:
                res = _context9.sent;
                if (res === 1) {
                  _this14.hasMonthlyAccount = true;
                  // console.log('月结账户检查结果:', this.hasMonthlyAccount);
                } else {
                  _this14.hasMonthlyAccount = false;
                }
                _context9.next = 10;
                break;
              case 9:
                _this14.hasMonthlyAccount = false;
              case 10:
                _context9.next = 13;
                break;
              case 12:
                _this14.hasMonthlyAccount = false;
              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    // 检查是否支持到付
    checkCodSupport: function checkCodSupport() {
      var selectedExpress = this.expressCompanies[this.formData.expressIndex];
      if (!selectedExpress || !selectedExpress.originalData) {
        this.codSupported = false;
        return;
      }

      // 根据快递公司数据判断是否支持到付
      this.codSupported = selectedExpress.originalData.supportCOD === true;
    },
    // 检查支持的支付方式
    checkSupportedPayMethods: function checkSupportedPayMethods(expressOption) {
      this.supportedPayMethods = [];
      if (!expressOption || !expressOption.originalData) {
        return;
      }
      var payMethod = expressOption.originalData.payMethod;

      // 根据payMethod判断支持的支付方式
      if (payMethod === 10) {
        // 线下寄付 - 表示只支持在线支付
        // this.supportedPayMethods.push('online');
        // // 如果有月结账户，也支持月结支付
        // if (this.hasMonthlyAccount) {
        // 	this.supportedPayMethods.push('monthly');
        // }
      } else if (payMethod === 20) {
        // 线下到付 - 表示支持到付
        this.supportedPayMethods.push('cod');
      } else if (payMethod === 30) {
        // 线上支付 - 支持微信支付和月结
        this.supportedPayMethods.push('online');
        this.supportedPayMethods.push('onlineCollect');
        if (this.hasMonthlyAccount) {
          this.supportedPayMethods.push('monthly');
        }
      } else {
        // 默认支持在线支付
        this.supportedPayMethods.push('online');
      }
    },
    // 重置为支持的支付方式
    resetToSupportedPaymentMethod: function resetToSupportedPaymentMethod() {
      // 如果当前支付方式不在支持列表中，选择第一个支持的方式
      if (!this.supportedPayMethods.includes(this.formData.paymentMethod) && this.supportedPayMethods.length > 0) {
        this.formData.paymentMethod = this.supportedPayMethods[0];
      }
    },
    // 判断支付方式是否可用
    isPaymentMethodSupported: function isPaymentMethodSupported(method) {
      // 添加适当的日志以便调试
      // console.log('支持的支付方式:', this.supportedPayMethods);
      // console.log('当前检查的支付方式:', method);

      var supported = this.supportedPayMethods.includes(method);
      // console.log('是否支持:', supported);

      return supported;
    },
    // 初始化检查月结账户
    initPaymentSettings: function initPaymentSettings() {
      // 已经在created钩子中执行了月结账户检查
      // 这里只需初始化其他支付相关设置

      // 如果已选择快递公司，检查支持的支付方式
      if (this.formData.expressIndex >= 0) {
        var selectedExpress = this.expressCompanies[this.formData.expressIndex];
        if (selectedExpress) {
          this.checkSupportedPayMethods(selectedExpress);
        }
      }
    },
    // 初始化用户余额
    initUserBalance: function initUserBalance() {
      var userInfo = uni.getStorageSync('userInfo') || {};
      this.availableBalance = parseFloat(userInfo.money) || 0;
      // console.log('用户余额:', this.availableBalance);
    },
    // 切换是否使用余额抵扣
    toggleUseBalance: function toggleUseBalance(e) {
      var _this15 = this;
      // 首先检查当前快递公司是否支持线上支付
      if (!this.canUseCommission) {
        // 显示提示信息
        uni.showToast({
          title: '当前快递公司不支持线上支付，无法使用佣金抵扣',
          icon: 'none',
          duration: 2000
        });

        // 强制关闭开关
        this.formData.useCommission = false;
        this.formData.commissionAmount = 0;

        // 刷新UI
        this.$nextTick(function () {
          _this15.forceUpdate = !_this15.forceUpdate;
        });
        return;
      }

      // 处理switch的change事件
      var useBalance;
      if (e && (0, _typeof2.default)(e) === 'object') {
        // 兼容不同平台的事件对象结构
        if (e.detail && e.detail.value !== undefined) {
          // 微信小程序switch组件
          useBalance = e.detail.value;
        } else if (e.detail && e.detail.checked !== undefined) {
          // 某些平台的switch组件
          useBalance = e.detail.checked;
        } else if (e.target && e.target.value !== undefined) {
          // 标准Web组件
          useBalance = e.target.value;
        } else {
          // 如果无法从事件中获取值，则切换当前状态
          useBalance = !this.formData.useCommission;
        }
      } else {
        // 如果是程序直接调用，切换当前状态
        useBalance = !this.formData.useCommission;
      }

      // 确保useBalance是布尔值
      useBalance = Boolean(useBalance);
      console.log('切换余额抵扣状态:', useBalance);

      // 设置状态
      this.formData.useCommission = useBalance;

      // 根据开关状态计算抵扣金额
      if (this.formData.useCommission) {
        this.calculateBalanceDeduction();
      } else {
        this.formData.commissionAmount = 0;
      }

      // 添加延时强制刷新UI
      this.$nextTick(function () {
        console.log('余额抵扣最终状态:', _this15.formData.useCommission, '抵扣金额:', _this15.formData.commissionAmount);
        // 触发一个虚拟的状态更新，强制刷新UI
        _this15.forceUpdate = !_this15.forceUpdate;
      });
    },
    // 重命名并完善计算余额抵扣金额的方法
    calculateBalanceDeduction: function calculateBalanceDeduction() {
      var _this16 = this;
      // 确保用户有余额且已打开余额抵扣开关，且快递公司支持线上支付
      if (!this.formData.useCommission || !this.canUseCommission || !this.availableBalance || this.availableBalance <= 0) {
        this.formData.commissionAmount = 0;
        return;
      }

      // 确保总费用已计算
      var total = this.totalFee || 0;
      if (total <= 0) {
        this.formData.commissionAmount = 0;
        return;
      }

      // 计算可抵扣金额（不超过总费用，也不超过可用余额）
      var maxDeduction = Math.min(total, this.availableBalance);

      // 使用 Vue 的响应式系统正确更新对象深层属性
      this.$set(this.formData, 'commissionAmount', parseFloat(maxDeduction.toFixed(2)));

      // 强制更新（我们已经这样做了，保留这行）
      this.$nextTick(function () {
        _this16.forceUpdate = !_this16.forceUpdate;
      });
      console.log('余额抵扣计算结果:', {
        总费用: total,
        可用余额: this.availableBalance,
        抵扣金额: this.formData.commissionAmount,
        最终支付: this.finalPayAmount
      });

      // 使用临时变量直接计算最终金额并打印，绕过计算属性
      var rawTotal = parseFloat(this.totalFee.toFixed(2));
      var rawDeduction = parseFloat(this.formData.commissionAmount.toFixed(2));
      var directFinalAmount = rawTotal - rawDeduction;
      console.log('直接计算的最终金额:', {
        总费用原始值: this.totalFee,
        总费用处理后: rawTotal,
        抵扣金额原始值: this.formData.commissionAmount,
        抵扣金额处理后: rawDeduction,
        计算结果: directFinalAmount,
        最终结果: directFinalAmount.toFixed(2)
      });

      // 强制刷新
      this.$forceUpdate();
      return directFinalAmount.toFixed(2);
    },
    // 切换同意协议
    toggleAgreement: function toggleAgreement() {
      this.formData.agreedToTerms = !this.formData.agreedToTerms;
      if (this.formData.agreedToTerms) {
        this.showAgreementError = false;
      }
    },
    // 查看协议详情
    viewAgreement: function viewAgreement() {
      uni.navigateTo({
        url: '/views/agreement/service-agreement'
      });
    },
    // 提交订单前检查
    checkBeforeSubmit: function checkBeforeSubmit() {
      // 检查是否同意协议
      if (!this.formData.agreedToTerms) {
        this.showAgreementError = true;
        uni.showToast({
          title: '请先同意神州邮服务协议',
          icon: 'none'
        });
        return false;
      }

      // 其他检查...
      return true;
    },
    // 添加新订单
    addNewOrder: function addNewOrder() {
      uni.navigateTo({
        url: '/views/express/batch-order-edit'
      });
    },
    // 编辑订单
    editOrder: function editOrder(index) {
      // 获取要编辑的订单
      var order = this.batchOrders[index];

      // 方法一：通过URL参数传递（适合数据量较小的情况）
      // 将订单数据转换为JSON字符串并编码后通过URL传递
      uni.navigateTo({
        url: '/views/express/batch-order-edit?orderData=' + encodeURIComponent(JSON.stringify(order)) + '&index=' + index
      });
    },
    // 删除单个订单
    deleteOrder: function deleteOrder(index) {
      var _this17 = this;
      uni.showModal({
        title: '删除订单',
        content: '确定要删除这个寄件订单吗？',
        success: function success(res) {
          if (res.confirm) {
            _this17.batchOrders.splice(index, 1);
            _this17.updateBatchSummary();
            _this17.saveBatchOrdersToStorage();
            for (var i = 0; i < _this17.batchOrders.length; i++) {
              _this17.queryExpressOptions(_this17.batchOrders[i]);
            }
          }
        }
      });
    },
    // 计算批量订单总价
    calculatetotalFee: function calculatetotalFee() {
      // 计算批量订单总价的逻辑
      console.log('计算批量订单总价');
    },
    // 更新批量订单摘要信息
    updateBatchSummary: function updateBatchSummary() {
      this.totalFee = this.batchOrders.filter(function (order) {
        return order.price;
      }).reduce(function (sum, order) {
        return sum + parseFloat(order.price);
      }, 0);
    },
    // 添加缺失的批量寄件处理方法
    addBatchOrder: function addBatchOrder(orderData) {
      if (!orderData) return false;
      console.log(orderData);
      // 添加到批量订单列表
      this.batchOrders.push(_objectSpread(_objectSpread({}, orderData), {}, {
        selected: true
      }));

      // 保存到本地存储
      this.saveBatchOrdersToStorage();

      // 更新UI
      this.$forceUpdate();
      for (var i = 0; i < this.batchOrders.length; i++) {
        this.queryExpressOptions(this.batchOrders[i]);
      }
      this.$nextTick(function () {
        console.log('新增订单');
      });
      return true;
    },
    // 更新批量订单方法 - 供编辑页面调用
    updateBatchOrder: function updateBatchOrder(index, orderData) {
      if (index >= 0 && index < this.batchOrders.length) {
        // 更新订单数据但保持选中状态
        this.batchOrders[index] = _objectSpread(_objectSpread({}, orderData), {}, {
          selected: true
        });

        // 保存到本地存储
        this.saveBatchOrdersToStorage();

        // 更新UI
        this.$forceUpdate();
        for (var i = 0; i < this.batchOrders.length; i++) {
          this.queryExpressOptions(this.batchOrders[i]);
        }
        this.$nextTick(function () {
          console.log('修改订单');
        });
        return true;
      }
      this.$nextTick(function () {
        console.log('修改订单');
      });
      return false;
    },
    // 保存批量订单到本地存储
    saveBatchOrdersToStorage: function saveBatchOrdersToStorage() {
      try {
        uni.setStorageSync('batchOrders', this.batchOrders);
      } catch (e) {
        console.error('保存批量订单失败:', e);
      }
    },
    // 从本地存储加载批量订单
    loadBatchOrdersFromStorage: function loadBatchOrdersFromStorage() {
      try {
        var storageData = uni.getStorageSync('batchOrders');
        if (storageData) {
          this.batchOrders = storageData;
        }
      } catch (e) {
        console.error('加载批量订单失败:', e);
      }
    },
    // 添加到methods中
    formatInsuranceFee: function formatInsuranceFee(insuranceValue) {
      if (!insuranceValue) return '0.00';
      // 保价费率为1%
      var fee = parseFloat(insuranceValue) * 0.01;
      return fee.toFixed(2);
    },
    // 在methods中添加
    // 切换订单保价状态
    toggleOrderInsurance: function toggleOrderInsurance(index) {
      if (index >= 0 && index < this.batchOrders.length) {
        // 设置默认值
        if (this.batchOrders[index].insured === undefined) {
          this.$set(this.batchOrders[index], 'insured', false);
        }

        // 切换状态
        this.batchOrders[index].insured = !this.batchOrders[index].insured;

        // 如果关闭保价，清空保价金额
        if (!this.batchOrders[index].insured) {
          this.batchOrders[index].insuranceValue = '';
        }

        // 保存到本地存储
        this.saveBatchOrdersToStorage();
      }
    },
    // 更新保价金额
    updateInsuranceValue: function updateInsuranceValue(index, e) {
      if (index >= 0 && index < this.batchOrders.length) {
        var value = e.detail.value;

        // 只允许数字和小数点
        value = value.replace(/[^\d.]/g, '');

        // 确保只有一个小数点
        var parts = value.split('.');
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('');
        }

        // 限制小数位数为2位
        if (parts.length > 1 && parts[1].length > 2) {
          value = parts[0] + '.' + parts[1].substring(0, 2);
        }

        // 限制最大值（假设10万元为上限）
        if (parseFloat(value) > 100000) {
          value = '100000';
        }

        // 更新保价金额
        this.$set(this.batchOrders[index], 'insuranceValue', value);

        // 保存到本地存储
        this.saveBatchOrdersToStorage();
      }
    },
    // 检查订单是否支持保价（优化版）
    isExpressOrderSupported: function isExpressOrderSupported(index) {
      // console.log(this.batchOrders)
      if (!this.batchOrders || index < 0 || index >= this.batchOrders.length) {
        return false;
      }
      var order = this.batchOrders[index];
      var expressIndex = this.formData.expressIndex || 0;
      // console.log(this.expressOptions)
      if (this.expressOptions.length == 0 || this.expressOptions.length <= expressIndex) {
        return false;
      }
      var express = this.expressOptions[expressIndex];
      // console.log(express)
      // console.log(express && express.bjRule && express.bjRule !== "")
      return express && express.bjRule && express.bjRule !== "";
    },
    // 安全地显示不支持保价的提示
    showInsuranceNotSupportedTip: function showInsuranceNotSupportedTip(index) {
      // 防御性检查
      if (!this.batchOrders || index < 0 || index >= this.batchOrders.length) {
        uni.showModal({
          title: '保价规则说明',
          content: '该快递不支持保价',
          showCancel: false,
          confirmText: '我知道了'
        });
        return;
      }
      var order = this.batchOrders[index];
      var expressIndex = order.expressIndex || 0;

      // 从expressCompanies获取保价规则说明
      var ruleText = '该快递不支持保价服务';
      if (this.expressCompanies && this.expressCompanies[expressIndex] && this.expressCompanies[expressIndex].bjRuleStr) {
        ruleText = this.expressCompanies[expressIndex].bjRuleStr;
      }

      // 使用模态框显示详细规则
      uni.showModal({
        title: '保价规则说明',
        content: ruleText,
        showCancel: false,
        confirmText: '我知道了'
      });
    },
    getExpressBjRuleStr: function getExpressBjRuleStr(index) {
      if (!this.batchOrders || index < 0 || index >= this.batchOrders.length) {
        return '保价费率：1%（默认）';
      }
      var order = this.batchOrders[index];
      var expressIndex = order.expressIndex || 0;
      if (!this.expressCompanies || expressIndex >= this.expressCompanies.length || !this.expressCompanies[expressIndex].bjRule) {
        return '保价费率：1%（默认）';
      }
      try {
        // 尝试解析复杂规则
        var bjRuleStr = this.expressCompanies[expressIndex].bjRule;
        var bjRules = JSON.parse(bjRuleStr);
        if (Array.isArray(bjRules) && bjRules.length > 0) {
          var ruleTexts = [];
          var _iterator3 = _createForOfIteratorHelper(bjRules),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var rule = _step3.value;
              var ruleText = '';
              var start = rule.start || 0;
              var end = rule.end || '以上';
              if (rule.bjPrice !== undefined) {
                // 固定价格规则
                ruleText = "\u4FDD\u4EF7\u91D1\u989D".concat(start, "-").concat(end === 0 ? '以上' : end, "\u5143\uFF0C\u56FA\u5B9A\u6536\u8D39").concat(rule.bjPrice, "\u5143");
              } else if (rule.bjRate !== undefined) {
                // 费率规则
                var ratePercent = (rule.bjRate * 100).toFixed(2);
                ruleText = "\u4FDD\u4EF7\u91D1\u989D".concat(start, "-").concat(end === 0 ? '以上' : end, "\u5143\uFF0C\u8D39\u7387").concat(ratePercent, "%");
              }
              if (ruleText) ruleTexts.push(ruleText);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          return ruleTexts.join('；') || '保价费用根据保价金额阶梯计算';
        } else {
          var rateNum = parseFloat(bjRuleStr);
          if (!isNaN(rateNum)) {
            return "\u4FDD\u4EF7\u8D39\u7387\uFF1A".concat(rateNum, "%");
          }
        }
      } catch (e) {
        console.error('解析保价规则描述出错:', e);
      }
      return this.expressCompanies[expressIndex].bjRuleStr || '保价费率：1%（默认）';
    },
    // 添加获取总费用的方法
    getTotalFee: function getTotalFee() {
      return this.totalBaseFee + this.totalInsuranceFee;
    },
    // 根据索引更新订单
    updateOrderAtIndex: function updateOrderAtIndex(index, updatedOrder) {
      if (index >= 0 && index < this.batchOrders.length) {
        // 使用Vue.set确保响应式更新
        this.$set(this.batchOrders, index, updatedOrder);

        // 保存到本地存储
        uni.setStorageSync('batchOrders', this.batchOrders);
        uni.showToast({
          title: '订单已更新',
          icon: 'success'
        });
      }
    }
  },
  // 组件销毁时清除计时器
  beforeDestroy: function beforeDestroy() {
    if (this.expressTypeSearchTimer) {
      clearTimeout(this.expressTypeSearchTimer);
    }
  },
  onShow: function onShow() {
    var _this18 = this;
    this.$nextTick(function () {
      for (var i = 0; i < _this18.batchOrders.length; i++) {
        _this18.queryExpressOptions(_this18.batchOrders[i]);
      }
    });
  },
  // 监听费用变化，重新计算佣金抵扣
  watch: {
    totalFee: {
      handler: function handler(newVal) {
        if (this.formData.useCommission) {
          this.calculateBalanceDeduction();
        }
      }
    },
    // 添加对 formData.commissionAmount 的监听
    'formData.commissionAmount': {
      handler: function handler(newVal) {
        // console.log('佣金抵扣金额变更:', newVal);
        // 强制刷新
        this.$forceUpdate();
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 272:
/*!*************************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./batch.vue?vue&type=style&index=0&lang=scss& */ 273);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 273:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[264,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/views/express/batch.js.map