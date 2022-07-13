<template>
  <div>
    <el-table style="width: 100%" border :data="skuList">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称"></el-table-column>
      <el-table-column prop="skuDesc" label="描述"></el-table-column>
      <el-table-column prop="skuDefaultImg" label="默认图片">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)"></el-table-column>
      <el-table-column prop="price" label="价格(元)"></el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.isSale==1" type="success" icon="el-icon-top" size="mini"
                     @click="cancelSale(row)"></el-button>
          <el-button v-else type="info" icon="el-icon-bottom" size="mini"
                     @click="onSale(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(row)"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="info(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete " size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="text-align: center"
      :current-page="pageNum"
      :page-sizes="[3,5,10]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, -> ,sizes,total"
      :total="totalCount">

    </el-pagination>

    <!--抽屉-->

    <el-drawer

      size="50%"
      :visible.sync="drawer">
      <el-row>
        <el-col :span="5">
          名称
        </el-col>
        <el-col :span="16">
          {{ skuInfo.skuName }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          描述
        </el-col>
        <el-col :span="16">
          {{ skuInfo.skuDesc }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          价格
        </el-col>
        <el-col :span="16">
          {{ skuInfo.price }}元
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          平台属性
        </el-col>
        <el-col :span="16">
          <el-tag type="success" style="margin: 10px" v-for="(attr,index) in skuInfo.skuAttrValueList" :key="attr.id">{{
              attr.attrId
            }}-{{ attr.valueId }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          商品图片
        </el-col>
        <el-col :span="11">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="(image,$index) in skuInfo.skuImageList" :key="image.id">
              <img :src="image.imgUrl"/>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>

    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "sku",
    data() {
      return {
        pageNum: 3,
        pageSize: 3,
        totalCount: 2,
        skuList: [],
        skuInfo: {},
        drawer: false
      }
    },
    methods: {
      async getData(pageNum, pageSize) {
        if (pageNum) {
          this.pageNum = pageNum
        }
        if (pageSize) {
          this.pageSize = pageSize
        }

        const result = await this.$API.sku.reqSkuList(this.pageNum, this.pageSize);
        if (result.code == 200) {
          this.pageNum = result.data.current
          this.pageSize = result.data.size
          this.totalCount = result.data.total
          this.skuList = result.data.records
        }
      }, handleSizeChange(pageSize) {
        this.getData(undefined, pageSize)
      }, handleCurrentChange(page) {
        this.getData(page, undefined)
      },
      async cancelSale(row) {
        const result = await this.$API.sku.reqCancelSale(row.id);
        console.log(result);
        if (result.code == 200) {
          this.$message({type: 'success', message: '下架成功'})
          row.isSale = 0
        }


      },
      async onSale(row) {
        const result = await this.$API.sku.reqOnSale(row.id);
        console.log(result);
        if (result.code == 200) {
          this.$message({type: 'success', message: '上架成功'})
          row.isSale = 1
        }

      },
      edit() {
        this.$message('正在开发中')
      },
      async info(row) {
        const result = await this.$API.sku.reqSkuById(row.id);
        if (result.code == 200) {
          this.drawer = true
          this.skuInfo = result.data
        }
      }

    },
    mounted() {
      this.getData()
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }


</style>
<style scoped>
  .el-row .el-col-5 {
    font-size: 18px;
    text-align: right;
  }

  .el-col {
    margin: 10px 10px;
  }
  >>>.el-carousel__button {
    width: 10px;
    height: 10px;
    background-color: deeppink;
    border-radius: 50%;
  }
</style>
