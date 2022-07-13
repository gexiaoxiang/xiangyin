<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span>周同比 56.67% <svg t="1657634039100" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1758" width="16" height="16"><path
                d="M288.864 636.032 511.968 405.312 735.136 636Z" p-id="1759" fill="#d81e06"></path></svg></span>
              <span>日同比 19.96% <svg t="1657634129488" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2105" width="16" height="16"><path
                d="M735.136 405.28 512 636 288.864 405.28Z" p-id="2106" fill="#1afa29"></path></svg></span>
            </template>
            <template slot="footer">

              <span>日销售额</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <LineChart></LineChart>
            </template>
            <template slot="footer">
              <span>日访量 1234</span>
            </template>
          </Detail>

        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <BarChart></BarChart>
            </template>
            <template slot="footer">
              <span>转换率67%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressChart></ProgressChart>
            </template>

            <template slot="footer">
              <span>周同比 56.67% <svg t="1657634039100" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1758" width="16" height="16"><path
                d="M288.864 636.032 511.968 405.312 735.136 636Z" p-id="1759" fill="#d81e06"></path></svg></span>
              <span>日同比 19.96% <svg t="1657634129488" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2105" width="16" height="16"><path
                d="M735.136 405.28 512 636 288.864 405.28Z" p-id="2106" fill="#1afa29"></path></svg></span>
            </template>

          </Detail>
        </el-card>
      </el-col>

    </el-row>


  </div>
</template>

<script>
  import Detail from './Detail'
  import LineChart from './LineChart'
  import BarChart from './BarChart'
  import ProgressChart from './ProgressChart'

  export default {
    name: "",
    components: {
      Detail, LineChart, BarChart, ProgressChart
    }
  }
</script>

<style scoped>

</style>
