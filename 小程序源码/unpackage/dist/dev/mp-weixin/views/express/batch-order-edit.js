(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["views/express/batch-order-edit"],{

/***/ 274:
/*!*********************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/main.js?{"page":"views%2Fexpress%2Fbatch-order-edit"} ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _batchOrderEdit = _interopRequireDefault(__webpack_require__(/*! ./views/express/batch-order-edit.vue */ 275));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_batchOrderEdit.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 275:
/*!**************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch-order-edit.vue ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _batch_order_edit_vue_vue_type_template_id_6caf09ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./batch-order-edit.vue?vue&type=template&id=6caf09ea& */ 276);
/* harmony import */ var _batch_order_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./batch-order-edit.vue?vue&type=script&lang=js& */ 278);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _batch_order_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _batch_order_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _batch_order_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./batch-order-edit.vue?vue&type=style&index=0&lang=scss& */ 280);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _batch_order_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _batch_order_edit_vue_vue_type_template_id_6caf09ea___WEBPACK_IMPORTED_MODULE_0__["render"],
  _batch_order_edit_vue_vue_type_template_id_6caf09ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _batch_order_edit_vue_vue_type_template_id_6caf09ea___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "views/express/batch-order-edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 276:
/*!*********************************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch-order-edit.vue?vue&type=template&id=6caf09ea& ***!
  \*********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_template_id_6caf09ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./batch-order-edit.vue?vue&type=template&id=6caf09ea& */ 277);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_template_id_6caf09ea___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_template_id_6caf09ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_template_id_6caf09ea___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_template_id_6caf09ea___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 277:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch-order-edit.vue?vue&type=template&id=6caf09ea& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var m0 = !!_vm.formData.senderName
    ? _vm.formatPhone(_vm.formData.senderMobile)
    : null
  var m1 = !!_vm.formData.receiverName
    ? _vm.formatPhone(_vm.formData.receiverMobile)
    : null
  var g0 = _vm.showTypeDropdown
    ? _vm.filteredExpressTypes.length === 0 && !_vm.expressTypeSearchLoading
    : null
  var g1 = _vm.formData.length
  var g2 = _vm.formData.length
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.showTypeDropdown = true
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
        g0: g0,
        g1: g1,
        g2: g2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 278:
/*!***************************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch-order-edit.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./batch-order-edit.vue?vue&type=script&lang=js& */ 279);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 279:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch-order-edit.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _address = _interopRequireDefault(__webpack_require__(/*! @/api/address */ 121));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      // 表单数据
      formData: {
        // 寄件人信息
        senderName: '',
        senderPhone: '',
        senderProvince: '',
        senderCity: '',
        senderDistrict: '',
        senderDetailAddress: '',
        // 收件人信息
        receiverName: '',
        receiverPhone: '',
        receiverProvince: '',
        receiverCity: '',
        receiverDistrict: '',
        receiverDetailAddress: '',
        // 物品信息
        itemTypeName: '',
        estimatedItemWeight: '',
        remark: '',
        length: '',
        // 长度(cm)
        width: '',
        // 宽度(cm)
        height: '' // 高度(cm)
      },

      // 编辑状态
      isEdit: false,
      orderIndex: -1,
      // 滚动位置
      scrollTop: 0,
      // 系统信息
      isIPhoneX: false,
      // 物品类型相关
      expressTypeQuery: '',
      showTypeDropdown: false,
      expressTypeSearchLoading: false,
      expressTypeSearchTimer: null,
      filteredExpressTypes: [],
      // 模拟物品类型数据
      expressTypes: [{
        typeId: '1',
        typeName: '日用品'
      }, {
        typeId: '2',
        typeName: '电子产品'
      }, {
        typeId: '3',
        typeName: '数码产品'
      }, {
        typeId: '4',
        typeName: '服装鞋帽'
      }, {
        typeId: '5',
        typeName: '食品'
      }, {
        typeId: '6',
        typeName: '图书文具'
      }, {
        typeId: '7',
        typeName: '运动户外'
      }, {
        typeId: '8',
        typeName: '家居家装'
      }, {
        typeId: '9',
        typeName: '美妆个护'
      }, {
        typeId: '10',
        typeName: '母婴用品'
      }],
      // 是否显示体积输入区域
      showVolumeFields: false
    };
  },
  computed: {
    // 表单是否填写完整，用于启用/禁用保存按钮
    isFormValid: function isFormValid() {
      return this.formData.senderName && this.formData.senderMobile && this.formData.receiverName && this.formData.receiverMobile && this.formData.estimatedItemWeight && this.expressTypeQuery;
    }
  },
  methods: {
    getDefault: function getDefault() {
      var _this = this;
      var userInfo = this.$store.getters['user/getUserInfo'];
      _address.default.getDefaultAddress(userInfo.userId).then(function (data) {
        console.log(data);
        if (data) {
          _this.formData.senderName = data.contactName;
          _this.formData.senderMobile = data.contactPhone; // 修正：发件人手机应该放到senderMobile
          _this.formData.senderProvince = data.province;
          _this.formData.senderCity = data.city;
          _this.formData.senderDistrict = data.district || '';
          _this.formData.senderDetailAddress = data.detailAddress;
        }
      });
    },
    // 返回上一页
    goBack: function goBack() {
      uni.navigateBack();
    },
    // 保存订单
    saveOrder: function saveOrder() {
      // 表单验证
      if (!this.isFormValid) {
        uni.showToast({
          title: '请完善寄件信息',
          icon: 'none'
        });
        return;
      }

      // 如果是编辑模式，使用原来的index
      if (this.isEdit && this.orderIndex !== undefined) {
        // 将编辑后的数据提交回主页面
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; // 获取上一个页面对象

        if (prevPage && prevPage.$vm) {
          // 更新原来的订单数据
          prevPage.$vm.updateOrderAtIndex(this.orderIndex, this.formData);
        }

        // 返回上一级页面
        uni.navigateBack();
      } else {
        // 新增订单的逻辑...
        var _pages = getCurrentPages();
        var _prevPage = _pages[_pages.length - 2];
        if (_prevPage && _prevPage.$vm) {
          _prevPage.$vm.addBatchOrder(this.formData);
        }
        uni.navigateBack();
      }
    },
    // 从地址簿选择地址
    selectAddress: function selectAddress(type) {
      var _this2 = this;
      uni.navigateTo({
        url: "/views/address/address?select=true&type=".concat(type),
        events: {
          // 选择地址后的回调
          addressSelected: function addressSelected(data) {
            if (type === 'sender') {
              // 填充寄件人信息 - 修正字段映射
              _this2.formData.senderName = data.address.contactName;
              _this2.formData.senderMobile = data.address.contactPhone; // 修正：发件人手机应该放到senderMobile
              _this2.formData.senderProvince = data.address.province;
              _this2.formData.senderCity = data.address.city;
              _this2.formData.senderDistrict = data.address.district || '';
              _this2.formData.senderDetailAddress = data.address.detailAddress;
            } else {
              // 填充收件人信息 - 修正字段映射
              _this2.formData.receiverName = data.address.contactName;
              _this2.formData.receiverMobile = data.address.contactPhone; // 修正：收件人手机应该放到receiverMobile
              _this2.formData.receiverProvince = data.address.province;
              _this2.formData.receiverCity = data.address.city;
              _this2.formData.receiverDistrict = data.address.district || '';
              _this2.formData.receiverDetailAddress = data.address.detailAddress;
            }
            console.log('完成地址填充，表单数据:', _this2.formData);
          }
        }
      });
    },
    // 验证重量输入
    validateWeightInput: function validateWeightInput(e) {
      // 从输入事件获取值
      var input = e.detail ? e.detail.value : this.formData.estimatedItemWeight;

      // 移除非数字字符，只保留数字和小数点
      input = input.replace(/[^\d.]/g, '');

      // 确保只有一个小数点
      var parts = input.split('.');
      if (parts.length > 2) {
        input = parts[0] + '.' + parts.slice(1).join('');
      }

      // 限制小数位数为2位
      if (parts.length > 1 && parts[1].length > 2) {
        input = parts[0] + '.' + parts[1].substring(0, 2);
      }
      var numValue = parseFloat(input);
      // 如果输入完成且值小于20kg，给出提示
      if (numValue > 20 && e.type === 'blur') {
        uni.showToast({
          title: '物品重量不得大于20kg',
          icon: 'none'
        });
        // 可以选择重置为20
        input = '19';
      }
      // 更新模型值
      this.formData.estimatedItemWeight = input;
    },
    // 格式化电话号码
    formatPhone: function formatPhone(phone) {
      if (!phone) return '';
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    // 初始化页面数据
    initPageData: function initPageData() {
      var _this3 = this;
      // 获取页面参数
      var eventChannel = this.getOpenerEventChannel();
      if (eventChannel) {
        // 监听编辑数据
        eventChannel.on('editOrderData', function (data) {
          if (data && data.orderIndex !== undefined) {
            _this3.isEdit = true;
            _this3.orderIndex = data.orderIndex;

            // 使用深拷贝防止引用修改
            if (data.order) {
              Object.keys(data.order).forEach(function (key) {
                if (_this3.formData.hasOwnProperty(key)) {
                  _this3.formData[key] = data.order[key];
                }
              });
            }
          }
        });
      }

      // 初始化物品类型查询
      if (this.formData.itemTypeName) {
        this.expressTypeQuery = this.formData.itemTypeName;
      } else {
        // 默认设置为日用品
        this.formData.itemTypeName = '';
        this.expressTypeQuery = '';
        this.formData.itemType = '1';
      }
    },
    // 物品类型相关方法
    onExpressTypeSearch: function onExpressTypeSearch(e) {
      var _this4 = this;
      this.expressTypeQuery = e.detail.value;

      // 清除之前的定时器
      if (this.expressTypeSearchTimer) {
        clearTimeout(this.expressTypeSearchTimer);
      }

      // 显示加载状态
      this.expressTypeSearchLoading = true;

      // 模拟网络请求延迟
      this.expressTypeSearchTimer = setTimeout(function () {
        // 过滤物品类型
        _this4.filteredExpressTypes = _this4.expressTypes.filter(function (item) {
          return !_this4.expressTypeQuery || item.typeName.toLowerCase().indexOf(_this4.expressTypeQuery.toLowerCase()) > -1;
        });
        _this4.expressTypeSearchLoading = false;
      }, 300);
    },
    onTypeInputBlur: function onTypeInputBlur() {
      var _this5 = this;
      // 延迟隐藏，确保点击事件先触发
      setTimeout(function () {
        _this5.showTypeDropdown = false;

        // 如果没有选择物品类型，但输入了查询内容，则自动设置
        if (!_this5.formData.itemType && _this5.expressTypeQuery) {
          _this5.formData.itemTypeName = _this5.expressTypeQuery;
        }
      }, 200);
    },
    selectExpressType: function selectExpressType(item) {
      this.formData.itemType = item.typeId;
      this.formData.itemTypeName = item.typeName;
      this.expressTypeQuery = item.typeName;
      this.showTypeDropdown = false;
    },
    // 验证长度输入
    validateLengthInput: function validateLengthInput(e) {
      // 从输入事件获取值
      var input = e.detail ? e.detail.value : this.formData.length;

      // 移除非数字字符，只保留数字和小数点
      input = input.replace(/[^\d.]/g, '');

      // 确保只有一个小数点
      var parts = input.split('.');
      if (parts.length > 2) {
        input = parts[0] + '.' + parts.slice(1).join('');
      }

      // 限制小数位数为2位
      if (parts.length > 1 && parts[1].length > 2) {
        input = parts[0] + '.' + parts[1].substring(0, 2);
      }

      // 更新模型值
      this.formData.length = input;
    },
    // 验证宽度输入
    validateWidthInput: function validateWidthInput(e) {
      // 从输入事件获取值
      var input = e.detail ? e.detail.value : this.formData.width;

      // 移除非数字字符，只保留数字和小数点
      input = input.replace(/[^\d.]/g, '');

      // 确保只有一个小数点
      var parts = input.split('.');
      if (parts.length > 2) {
        input = parts[0] + '.' + parts.slice(1).join('');
      }

      // 限制小数位数为2位
      if (parts.length > 1 && parts[1].length > 2) {
        input = parts[0] + '.' + parts[1].substring(0, 2);
      }

      // 更新模型值
      this.formData.width = input;
    },
    // 验证高度输入
    validateHeightInput: function validateHeightInput(e) {
      // 从输入事件获取值
      var input = e.detail ? e.detail.value : this.formData.height;

      // 移除非数字字符，只保留数字和小数点
      input = input.replace(/[^\d.]/g, '');

      // 确保只有一个小数点
      var parts = input.split('.');
      if (parts.length > 2) {
        input = parts[0] + '.' + parts.slice(1).join('');
      }

      // 限制小数位数为2位
      if (parts.length > 1 && parts[1].length > 2) {
        input = parts[0] + '.' + parts[1].substring(0, 2);
      }

      // 更新模型值
      this.formData.height = input;
    }
  },
  // 页面加载
  onLoad: function onLoad(options) {
    if (options.isEdit === 'true' || options.orderData) {
      this.isEdit = true;

      // 方法一：从URL参数获取数据
      if (options.orderData) {
        try {
          var orderData = JSON.parse(decodeURIComponent(options.orderData));
          this.orderIndex = parseInt(options.index);

          // 填充表单数据
          this.formData = _objectSpread(_objectSpread({}, this.formData), orderData);
          console.log('接收到的订单数据:', this.formData);
        } catch (e) {
          console.error('解析订单数据出错:', e);
          uni.showToast({
            title: '加载订单数据失败',
            icon: 'none'
          });
        }
      }

      // 方法二：从本地存储获取数据
      // const orderData = uni.getStorageSync('currentEditingOrder');
      // this.orderIndex = uni.getStorageSync('currentEditingOrderIndex');
      // if (orderData) {
      //   this.formData = {...this.formData, ...orderData};
      // }
    }

    // 检查设备类型
    var systemInfo = uni.getSystemInfoSync();
    this.isIPhoneX = systemInfo.model.indexOf('iPhone X') !== -1 || systemInfo.model.indexOf('iPhone 11') !== -1 || systemInfo.model.indexOf('iPhone 12') !== -1 || systemInfo.model.indexOf('iPhone 13') !== -1 || systemInfo.model.indexOf('iPhone 14') !== -1 || systemInfo.model.indexOf('iPhone 15') !== -1;

    // 初始化数据
    this.initPageData();
    this.getDefault();
    // 如果传入了编辑索引
    if (options.orderIndex) {
      this.orderIndex = parseInt(options.orderIndex);
      this.isEdit = true;
    }
  },
  // 页面加载完成后调用
  onReady: function onReady() {
    // 初始化时执行搜索，预加载物品类型
    this.onExpressTypeSearch({
      detail: {
        value: this.expressTypeQuery
      }
    });
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 280:
/*!************************************************************************************************************************************!*\
  !*** C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch-order-edit.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./batch-order-edit.vue?vue&type=style&index=0&lang=scss& */ 281);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_batch_order_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 281:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/GIGABYTE/Desktop/shenzhou-post-app-code-master/views/express/batch-order-edit.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[274,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/views/express/batch-order-edit.js.map