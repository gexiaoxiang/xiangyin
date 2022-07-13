<template>
  <div class="charts" ref="charts">

  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "",
    mounted() {
      let lineCharts = echarts.init(this.$refs.charts);

      lineCharts.setOption({
        xAxis: {
          show: false,
          min: 0,
          max: 100


        },
        yAxis: {
          type: 'category',
          show: false,

        },
        series: [{
          type: 'bar',
          data: [78],
          barWidth: 10,
          color: 'yellow',
          showBackground: true,
          backgroundStyle: {
            color: '#eee',

          },
          label: {
            show: true,
            formatter: '|',
            position: 'right'

          }

        }],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        tooltip: {}
      })

    }
  }
</script>

<style scoped>
  .charts {
    width: 100%;
    height: 100%;
  }
</style>
