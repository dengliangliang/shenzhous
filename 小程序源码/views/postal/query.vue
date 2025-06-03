<template>
  <view class="postal-container">
    <!-- 搜索区域 -->
   <!-- <view class="search-box">
      <view class="search-input">
        <uni-icons type="search" size="16" color="#999"></uni-icons>
        <input 
          type="text" 
          v-model="searchKey" 
          placeholder="输入地址关键词搜索"
          @confirm="handleSearch"
        />
        <uni-icons 
          v-if="searchKey" 
          type="clear" 
          size="16" 
          color="#999"
          @click="clearSearch"
        ></uni-icons>
      </view>
    </view> -->

    <!-- 筛选区域 -->
    <view class="filter-box">
      <picker 
        mode="selector" 
        :range="provinces" 
        range-key="name"
        @change="handleProvinceChange"
      >
        <view class="picker-item">
          <text>{{ selectedProvince.name || '选择省份' }}</text>
          <uni-icons type="bottom" size="12" color="#666"></uni-icons>
        </view>
      </picker>

      <picker 
        mode="selector" 
        :range="cities" 
        range-key="name"
        :disabled="!selectedProvince.id"
        @change="handleCityChange"
      >
        <view class="picker-item">
          <text>{{ selectedCity.name || '选择城市' }}</text>
          <uni-icons type="bottom" size="12" color="#666"></uni-icons>
        </view>
      </picker>

      <picker 
        mode="selector" 
        :range="districts" 
        range-key="name"
        :disabled="!selectedCity.id"
        @change="handleDistrictChange"
      >
        <view class="picker-item">
          <text>{{ selectedDistrict.name || '选择区县' }}</text>
          <uni-icons type="bottom" size="12" color="#666"></uni-icons>
        </view>
      </picker>
    </view>

    <!-- 结果列表 -->
    <scroll-view 
      class="result-list"
      scroll-y
      @scrolltolower="loadMore"
    >
      <view 
        class="result-item"
        v-for="(item, index) in postalList"
        :key="index"
      >
        <view class="postal-code">{{ item.PostNumber }}</view>
        <view class="address-info">
          <view class="full-address">
            {{ item.Province + item.City + item.District + item.Address }}
          </view>
          <view class="detail">
            <text>{{ item.Province }}</text>
            <text>{{ item.City }}</text>
            <text>{{ item.District }}</text>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </scroll-view>
  </view>
</template>

<script>
import postalApi from '@/api/postal'

export default {
  data() {
    return {
      searchKey: '',
      provinces: [],
      cities: [],
      districts: [],
      selectedProvince: {},
      selectedCity: {},
      selectedDistrict: {},
      postalList: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loading: false,
      loadMoreStatus: 'more',
	  dataList:[]
    }
  },

  onLoad() {
    this.getProvinceCity()
  },

  methods: {
    // 获取省市区数据
    async getProvinceCity() {
      try {
        const res = await postalApi.getProvinceCity()
        let data = JSON.parse(res)
		this.dataList = data;
        if (data.error_code === 0) {
          this.provinces = data.result.map(item => ({
            id: item.id,
            name: item.province
          }))
        }
      } catch (e) {
        console.error('获取省市区数据失败:', e)
      }
    },

    // 搜索
    handleSearch() {
      this.pageNum = 1
      this.postalList = []
      this.getPostalList()
    },

    // 清除搜索
    clearSearch() {
      this.searchKey = ''
      this.handleSearch()
    },

    // 省份选择
    handleProvinceChange(e) {
      const index = e.detail.value
      this.selectedProvince = this.provinces[index]
      this.selectedCity = {}
      this.selectedDistrict = {}
      
      // 获取选中省份的城市列表
      const provinceData =this.dataList.result.find(p => p.id === this.selectedProvince.id)
	  console.log(provinceData)
      if (provinceData) {
        this.cities = provinceData.city.map(item => ({
          id: item.id,
          name: item.city,
          districts: item.district || []
        }))
		
      } else {
        this.cities = []
      }
      this.districts = []
      // this.handleSearch()
    },

    // 城市选择
    handleCityChange(e) {
      const index = e.detail.value
      this.selectedCity = this.cities[index]
      this.selectedDistrict = {}
      console.log(this.cities[index])
      // 获取选中城市的区县列表
      this.districts = this.selectedCity.districts.map(item => ({
        id: item.id,
        name: item.district
      }))
      this.handleSearch()
    },

    // 区县选择
    handleDistrictChange(e) {
      const index = e.detail.value
      this.selectedDistrict = this.districts[index]
      this.handleSearch()
    },

    // 获取邮政编码列表
    async getPostalList() {
      if (this.loading) return
      
      this.loading = true
      this.loadMoreStatus = 'loading'

      try {
        const params = {
          pid: this.selectedProvince.id,
          cid: this.selectedCity.id,
          did: this.selectedDistrict.id,
          q: this.searchKey,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }

        const res = await postalApi.getPostal(params)
        let data = JSON.parse(res)
        
        if (data.error_code === 0) {
          const { list, totalcount } = data.result
          this.total = totalcount
          
          if (this.pageNum === 1) {
            this.postalList = list
          } else {
            this.postalList.push(...list)
          }
          
          this.loadMoreStatus = this.postalList.length >= totalcount ? 'noMore' : 'more'
        }
      } catch (e) {
        console.error('获取邮政编码列表失败:', e)
        this.loadMoreStatus = 'more'
      } finally {
        this.loading = false
      }
    },

    // 加载更多
    loadMore() {
      if (this.loading || this.loadMoreStatus === 'noMore') return
      
      this.pageNum++
      this.getPostalList()
    }
  }
}
</script>

<style lang="scss">
.postal-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
  
  .search-box {
    background: #fff;
    padding: 20rpx;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
    
    .search-input {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      padding: 16rpx 24rpx;
      border-radius: 8rpx;
      
      input {
        flex: 1;
        font-size: 28rpx;
        margin: 0 20rpx;
      }
    }
  }
  
  .filter-box {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 20rpx;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
    
    .picker-item {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      color: #333;
      
      text {
        margin-right: 8rpx;
      }
    }
  }
  
  .result-list {
    height: calc(100vh - 300rpx);
    
    .result-item {
      display: flex;
      align-items: flex-start;
      background: #fff;
      padding: 30rpx;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
      
      .postal-code {
        font-size: 40rpx;
        font-weight: bold;
        color: #FF6B01;
        margin-right: 30rpx;
      }
      
      .address-info {
        flex: 1;
        
        .full-address {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 12rpx;
        }
        
        .detail {
          text {
            font-size: 24rpx;
            color: #999;
            margin-right: 16rpx;
            
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style> 