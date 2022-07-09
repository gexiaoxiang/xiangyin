<template>
  <div>
    <el-form label-width="80px" :model="skuInfo">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input    placeholder="价格(元)" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input   placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" rows="3" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item :label="attr.attrName" v-for="(attr,$index) in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.attrId}`"
                         v-for="(attrValue,$index) in attr.attrValueList"
                         :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>

          <el-form-item :label="saleAttr.saleAttrName"
                        v-for="(saleAttr,$index) in spuSaleAttrList"
                        :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName"
                         :key="saleAttrValue.id"
                         :value="`${saleAttr.id}:${saleAttrValue.id}`"
                         v-for=" (saleAttrValue,$index) in saleAttr.spuSaleAttrValueList">

              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table border style="width: 100%" :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column width="80px" type="selection">

          </el-table-column>
          <el-table-column prop="imgUrl" label="图片">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称"></el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="{row,$index}">
              <el-button v-if="row.isDefault==0" type="primary" size="mini" @click="changeDefalut(row)">设为默认</el-button>
              <el-button v-else type="success" size="mini"> 默认</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "SkuForm",
    data() {
      return {
        spuImageList: [],
        spuSaleAttrList: [],
        attrInfoList: [],
        skuInfo: {
          category3Id: '',
          spuId: '',
          tmId: '',

          skuName: '',
          price: 0,
          weight: 0,
          skuDesc: '',
          skuDefaultImg: '',

          skuImageList: [],
          skuAttrValueList: [],
          skuSaleAttrValueList: []

        },
        spu: {},
        imageList: []
      }
    },
    methods: {
      async initSkuData(cForm, spu) {
        this.skuInfo.category3Id = spu.category3Id;
        this.skuInfo.spuId = spu.id;
        this.skuInfo.tmId = spu.tmId;
        this.spu = spu;
        //获取图片
        const spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
        if (spuImageResult.code == 200) {

          let listArr = spuImageResult.data
          listArr.forEach(item => {
            // item.name = item.imgName
            // item.url = item.imgUrl
            item.isDefault = 0;
          })
          this.spuImageList = listArr
        }
        //获取销售属性
        const spuSaleAttrListResult = await this.$API.sku.reqSpuSaleAttrList(spu.id);
        if (spuSaleAttrListResult.code == 200) {

          this.spuSaleAttrList = spuSaleAttrListResult.data
        }
        //获取平台属性
        const attrInfoListResult = await this.$API.attr.reqAttrInfoList(cForm.category1Id, cForm.category2Id, cForm.category3Id);
        if (attrInfoListResult.code == 200) {

          this.attrInfoList = attrInfoListResult.data
        }
      }
      ,
      async save() {
        this.skuInfo.skuAttrValueList = this.attrInfoList.reduce((prev, item) => {
          if (item.attrIdAndValueId) {

            const [attrId, valueId] = item.attrIdAndValueId.split(':');
            prev.push({attrId, valueId})
          }
          return prev
        }, [])
        this.skuInfo.skuSaleAttrValueList = this.spuSaleAttrList.reduce((prev, item) => {
          if (item.attrIdAndValueId) {

            const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':');
            prev.push({saleAttrId, saleAttrValueId})
          }
          return prev
        }, [])

        this.skuInfo.skuImageList = this.imageList.map(item => {
          return {
            imgName: item.imgName,
            imgUrl: item.imgUrl,
            isDefault: item.isDefault,
            spuImgId: item.id,
          }
        })
        const response = await this.$API.spu.reqAddSku(this.skuInfo);
        if (response.code == 200) {

          this.$message({type: 'success', message: "添加SKU成功"})
          this.$emit('changeScene', {scene: 0, flag: ''})
          Object.assign(this._data, this.$options.data())

        }

      },
      cancel() {

        this.$emit('changeScene', {scene: 0, flag: ''})
        Object.assign(this._data, this.$options.data())


      },
      handleSelectionChange(params) {
        this.imageList = params
      },
      changeDefalut(row) {
        this.spuImageList.forEach(item => {
          item.isDefault = 0
        })
        row.isDefault = 1
        this.skuInfo.skuDefaultImg = row.imgUrl
      }
    },

  }
</script>

<style scoped>

</style>
