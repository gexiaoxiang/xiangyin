<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg t="1657555146036" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="2410" width="25" height="25">
        <path
          d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
          p-id="2411" fill="#8a8a8a"></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">1234</span>
      <span class="main-content">122</span>
      <svg t="1657634039100" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg" p-id="1758" width="16" height="16">
        <path
          d="M288.864 636.032 511.968 405.312 735.136 636Z" p-id="1759" fill="#d81e06"></path>
      </svg>
      <svg t="1657634129488" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg" p-id="2105" width="16" height="16">
        <path
          d="M735.136 405.28 512 636 288.864 405.28Z" p-id="2106" fill="#1afa29"></path>
      </svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "",
    mounted() {
      let lineCharts = echarts.init(this.$refs.charts);

      lineCharts.setOption({
        xAxis: {
          show: false,
          type: 'category'
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'line',
          smooth:true,
          data: [10, 7, 33, 12, 48, 9,29,10,44],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: 'purple'
          },
          //填充颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'purple' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }

          }
        }],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        }
      })

    }
  }
</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;

  }

  .search-header {
    margin-right: 20px;
  }

  .main {
    margin: 10px 0px;
  }

  .main-title {
    margin-right: 30px;
  }

  .main-content {
    margin-right: 10px;
  }

  .charts {
    width: 100%;
    height: 50px;
  }
</style>
