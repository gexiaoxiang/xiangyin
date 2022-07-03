<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        海绵宝宝
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" rows="3"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form inline="true">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" value="">
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="无线通信">
            <el-select placeholder="请选择" value="">
              <el-option></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline="true">

          <el-form-item label="颜色">
            <el-select placeholder="请选择" value="">
              <el-option></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table border="true" style="width: 100%">
          <el-table-column width="80px" type="selection">

          </el-table-column>
          <el-table-column prop="" label="图片名称"></el-table-column>
          <el-table-column prop="" label="名称"></el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="{row,$index}">
              <el-button type="primary">设为默认</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "SkuForm"
  }
</script>

<style scoped>

</style>
