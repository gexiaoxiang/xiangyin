<template>
  <div>
    <el-card>
      <CateGorySelect @getCategoryId="getCategoryId" :isShow="scene!=0"></CateGorySelect>
    </el-card>
    <el-card>
      <!-- 列表 -->
      <div v-show="scene==0">
        <el-button type="primary" icon="el-icon-plus" @click="addSpu" :disabled="!cForm.category3Id">添加SPU</el-button>
        <el-table border style="width: 100%" :data="list">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column prop="spuName" label="spu名称"></el-table-column>
          <el-table-column prop="description" label="spu描述"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <HintButton title="添加sku" type="success" icon="el-icon-plus" size="mini"
                          @click="addSku(row)"></HintButton>
              <HintButton title="修改spu" type="warning" icon="el-icon-edit" size="mini"
                          @click="updateSpu(row)"></HintButton>
              <HintButton title="查看当前spu的所有实例" type="info" icon="el-icon-info" size="mini"
                          @click="handler(row)"></HintButton>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm=" deleteSpu(row)">


                <HintButton title="删除spu" type="danger" icon="el-icon-delete" size="mini"
                            slot="reference"></HintButton>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          @size-change="changeSize"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[3,5,10]"
          :page-size="limit"
          layout="prev, pager, next,jumper,->,sizes,total"
          :total="total">
        </el-pagination>
      </div>
      <!-- 添加|修改SPU -->

      <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu"></SpuForm>

      <!-- 添加SKU -->
      <SkuForm v-show="scene==2" @changeScene="changeScene" ref="sku"></SkuForm>

      <!--SKU实例列表-->


      <el-dialog :title="`${spu.spuName}的SKU列表`"
                 :visible.sync="dialogTableVisible"
                 before-close="close"
      >
        <el-table :data="skuList" border style="width: 100%" v-loading="loading">
          <el-table-column prop="skuName" property="date" label="名称"></el-table-column>
          <el-table-column prop="price" property="name" label="价格"></el-table-column>
          <el-table-column prop="weight" property="address" label="重量"></el-table-column>
          <el-table-column property="address" label="图片">
            <template slot-scope="{row,$index}">
              <img :src="row.skuDefaultImg" style="width: 100px;height: 100px">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import SkuForm from './SkuForm'
  import SpuForm from './SpuForm'

  export default {
    name: "spu",
    components: {
      SkuForm, SpuForm
    },
    data() {
      return {
        loading:true,
        dialogTableVisible: false,
        spu: {},
        skuList: [],
        limit: 3,
        page: 1,
        total: 0,
        cForm: {},
        list: [],

        //0 展示SPU列表  1 添加|修改SPU 2 添加 SKU
        scene: 0,
      }
    },
    methods: {
      //三级联动自定义事件
      getCategoryId(cForm) {
        this.scene = 0;
        this.cForm = cForm
        this.getSpuList();

      },
      //点击分页器的第几页按钮回调
      handleCurrentChange(page) {
        this.page = page
        this.getSpuList();
      },
      //修改分页器每页条数的按钮回调
      changeSize(sizes) {
        this.limit = sizes
        this.getSpuList();
      },
      //获取SPU列表
      async getSpuList(page) {
        if (page) {
          this.page = page
        }
        const result = await this.$API.spu.reqSpuInfoList(this.page, this.limit, this.cForm.category3Id);
        if (result.code == 200) {
          this.list = result.data.records
          this.total = result.data.total
          this.limit = result.data.size
        }
      },
      //添加SPU按钮
      addSpu() {

        this.scene = 1;
        //获取子组件spuForm
        this.$refs.spu.initSpuData({}, this.cForm)
      },
      //添加SkU按钮
      addSku(row) {

        this.scene = 2;
        this.$refs.sku.initSkuData(this.cForm, row);
      },
      //修改SPU按钮
      updateSpu(row) {
        this.scene = 1;
        //获取子组件spuForm
        this.$refs.spu.initSpuData(row)
      },
      async deleteSpu(row) {
        const result = await this.$API.spu.reqDeleteSpu(row.id)
        if (result.code == 200) {
          this.$message({type: 'success', message: '删除成功'})
          if (this.list.length > 1) {
            this.getSpuList(this.page - 1 > 0 ? this.page - 1 : 1);
          } else {
            this.getSpuList(this.page);
          }

        }

      },
      async handler(spu) {
        this.dialogTableVisible = true
        this.spu = spu;
        const reslut = await this.$API.spu.reqSkuList(spu.id);
        if (reslut.code == 200) {
          this.loading=false
          this.skuList = reslut.data
          console.log(this.skuList.length);
          if (this.skuList.length == 0) {
            for (let i = 0; i < 5; i++) {
              let sku = {
                category3Id: i,
                id: i,
                skuName: '名' + i,
                isSale: 1,
                price: i + 2,
                weight: i + 3,
                skuDefaultImg: 'http://139.198.127.41:9000/sph/20220709/QQ图片20151121224819.jpg'

              }
              this.skuList.push(sku)
            }
          }
        }
      },
      //spuForm自定义事件回调
      changeScene({scene, flag}) {

        this.scene = scene;
        if (flag == '修改') {
          this.getSpuList(this.page);
        } else {
          this.getSpuList(1);
        }

      },
      close(){
        this.loading=true,
          this.skuList=[];
      }
    }
  }
</script>

<style scoped>

</style>
