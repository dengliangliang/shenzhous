# 快递主题加载动画集成指南

本文档提供了如何在神州邮管理后台的各个页面中集成快递主题加载动画的详细说明。

## 目录

1. [组件概述](#组件概述)
2. [集成步骤](#集成步骤)
3. [使用示例](#使用示例)
4. [自定义选项](#自定义选项)
5. [常见问题](#常见问题)

## 组件概述

`DeliveryLoading` 是一个专为神州邮管理后台设计的加载动画组件，具有以下特点：

- 快递物流主题的视觉效果
- 支持全屏和局部加载状态
- 提供进度条显示
- 可自定义加载文本
- 支持插槽扩展

## 集成步骤

### 1. 引入组件和混入

在页面中引入 `DeliveryLoading` 组件和 `loadingMixin`：

```js
import DeliveryLoading from '@/components/common/DeliveryLoading'
import loadingMixin from '@/mixins/loadingMixin'

export default {
  components: {
    DeliveryLoading
  },
  mixins: [loadingMixin]
  // ...
}
```

### 2. 在模板中使用加载动画

#### 全屏加载动画

```html
<delivery-loading 
  v-if="fullscreenLoading" 
  :fullscreen="true" 
  :progress="loadingProgress" 
  text="数据加载中...">
</delivery-loading>
```

#### 局部加载动画

```html
<div style="position: relative;">
  <delivery-loading v-if="loadingStates.areaName"></delivery-loading>
  <!-- 您的内容 -->
</div>
```

### 3. 控制加载状态

使用 `loadingMixin` 提供的方法控制加载状态：

```js
// 在 created 或 mounted 钩子中启动全屏加载
created() {
  // 开始全屏加载
  this.startFullscreenLoading();
  
  // 加载数据
  this.getList().finally(() => {
    // 关闭全屏加载
    this.stopFullscreenLoading();
  });
}

// 加载数据的方法
async getList() {
  return this.loadDataWithLoading(
    () => api.getData(params), // API 调用
    'areaName',               // 区域名称
    (data) => {
      // 成功回调处理数据
      this.tableData = data.list;
    },
    '获取数据失败'            // 错误消息
  );
}
```

## 使用示例

以下是几种常见场景的使用示例：

### 表格数据加载

```html
<div class="table-container" style="position: relative;">
  <delivery-loading v-if="loadingStates.table"></delivery-loading>
  
  <el-table :data="tableData" border>
    <!-- 表格内容 -->
  </el-table>
</div>
```

```js
methods: {
  async getTableData() {
    return this.loadDataWithLoading(
      () => api.getTableData(this.queryParams),
      'table',
      (data) => {
        this.tableData = data.list;
        this.total = data.total;
      }
    );
  }
}
```

### 表单提交加载

```html
<el-form ref="form" :model="form" :rules="rules">
  <!-- 表单内容 -->
  <el-form-item>
    <el-button type="primary" @click="submitForm" :loading="loadingStates.submit">
      提交
    </el-button>
  </el-form-item>
</el-form>
```

```js
methods: {
  submitForm() {
    this.$refs.form.validate(async (valid) => {
      if (valid) {
        this.loadDataWithLoading(
          () => api.submitForm(this.form),
          'submit',
          () => {
            this.$message.success('提交成功');
            this.$router.push('/success');
          }
        );
      }
    });
  }
}
```

### 详情数据加载

```html
<el-dialog title="详情" :visible.sync="detailVisible">
  <div style="position: relative;">
    <delivery-loading v-if="loadingStates.detail"></delivery-loading>
    
    <el-descriptions :column="2" border>
      <!-- 详情内容 -->
    </el-descriptions>
  </div>
</el-dialog>
```

```js
methods: {
  showDetail(id) {
    this.detailVisible = true;
    
    this.loadDataWithLoading(
      () => api.getDetail(id),
      'detail',
      (data) => {
        this.detailData = data;
      }
    );
  }
}
```

## 自定义选项

`DeliveryLoading` 组件支持以下属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fullscreen | Boolean | false | 是否全屏显示 |
| text | String | '' | 加载提示文本 |
| showProgress | Boolean | true | 是否显示进度条（仅全屏模式有效） |
| progress | Number | 0 | 进度值 (0-100) |
| customStyle | Object | {} | 自定义样式对象 |

您还可以使用插槽来完全自定义加载动画内容：

```html
<delivery-loading>
  <template #card>
    <div class="custom-loading">
      <!-- 自定义加载内容 -->
    </div>
  </template>
</delivery-loading>
```

## 常见问题

### 1. 加载动画没有显示在正确的位置

确保包含加载动画的父容器设置了 `position: relative`：

```html
<div style="position: relative;">
  <delivery-loading v-if="loadingStates.area"></delivery-loading>
  <!-- 内容 -->
</div>
```

### 2. 全屏加载状态无法正确关闭

确保在适当的时机调用 `stopFullscreenLoading()`：

```js
// 方式一：在 Promise 的 finally 中关闭
this.getList().finally(() => {
  this.stopFullscreenLoading();
});

// 方式二：使用 try/catch/finally
try {
  await this.getList();
} catch (error) {
  console.error(error);
} finally {
  this.stopFullscreenLoading();
}
```

### 3. 如何修改加载动画样式

您可以通过传递 `customStyle` 属性来修改加载动画样式：

```html
<delivery-loading 
  :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff' }">
</delivery-loading>
```

或者，您可以在全局样式表中覆盖样式：

```css
.delivery-loading-mask {
  /* 自定义样式 */
}
```

---

如需更多帮助，请参考示例文件 `src/view/Order/ExampleOrderManageWithLoading.vue`。 