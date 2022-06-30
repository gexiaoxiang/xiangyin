<template>
  <div>
    <el-form label-width="80px" :model="spu">

      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option v-for="(tradeMark ,index) in tradeMarkList"
                     :label="tradeMark.tmName"
                     :value="tradeMark.id"
                     :key="tradeMark.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input type="textarea" v-model="spu.description" placeholder="SPU描述" rows="4"></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="spuImageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndAttrName" :placeholder="`还有${unSelectSaleAttr.length}种未选择`">
          <el-option :label="unSelect.name" :value="`${unSelect.id}:${unSelect.name}`"
                     v-for="(unSelect,index) in unSelectSaleAttr" :key="unSelect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性
        </el-button>
        <el-table border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名"></el-table-column>
          <el-table-column prop="" label="属性值名称列表">
            <template slot-scope="{row,$index}">
              <el-tag :key="spuSaleAttrValue.id" v-for="(spuSaleAttrValue,index) in row.spuSaleAttrValueList" closable
                      :disable-transitions="false" @close=" row.spuSaleAttrValueList.splice(index,1)">
                {{ spuSaleAttrValue.saleAttrValueName }}
              </el-tag>
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(row)"
                        @blur="handleInputConfirm(row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
            </template>

          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdateSpu">保存</el-button>
        <el-button @click="$emit('changeScene',0)">取消</el-button>
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
  export default {
    name: "SpuForm",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        spu: {
          "category3Id": 0,
          "tmId": 0,
          "description": "string",
          "spuNam": "",
          spuImageList: [{
            "id": 0,
            "imgName": "",
            "imgUrl": "",
            "spuId": 0

          }],
          "spuSaleAttrList": [{
            "baseSaleAttrId": 0,
            "id": 0,
            "saleAttrName": "",
            "spuId": 0,
            "spuSaleAttrValueList": [{
              "baseSaleAttrId": 0,
              "id": 0,
              "isChecked": "",
              "saleAttrName": "",
              "saleAttrValueName": "",
              "spuId": 0
            }]
          }]
        },
        tradeMarkList: [],
        spuImageList: [],
        baseSaleAttrList: [],
        attrIdAndAttrName: "",


      }
    },
    methods: {
      handleRemove(file, fileList) {
        this.spuImageList = fileList
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(resp, file, fileList) {
        this.spuImageList = fileList

      },
      //初始化spuForm数据
      async initSpuData(spu) {

        const spuResult = await this.$API.spu.reqSpu(spu.id);
        if (spuResult.code == 200) {
          this.spu = spuResult.data
        }
        // const tradeMarkResult = await this.$API.trademark.reqTradeMarkList(1, 50);
        const tradeMarkResult = await this.$API.trademark.reqTradeMark();
        if (tradeMarkResult.code == 200) {
          this.tradeMarkList = tradeMarkResult.data
        }
        const spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
        if (spuImageResult.code == 200) {

          const listArr = spuImageResult.data
          listArr.forEach(item => {
            item.name = item.imgName
            item.url = item.imgUrl
          })
          this.spuImageList = listArr

        }

        const baseSaleAttrResult = await this.$API.spu.reqBaseSaleAttrList();
        if (baseSaleAttrResult.code == 200) {
          this.baseSaleAttrList = baseSaleAttrResult.data

        }
      },

      showInput(row) {
        this.$set(row, 'inputVisible', true)
        this.$set(row, 'inputValue', '')
      },

      //属性值input blur事件
      handleInputConfirm(row) {

        const {baseSaleAttrId, inputValue} = row
        if (inputValue.trim() == '') {
          this.$message('属性不能为空')
          return
        }
        const result = row.spuSaleAttrValueList.every(item => item.saleAttrValueName != inputValue);
        if (!result) {
          this.$message('属性不能重复')
          return
        }

        let newSaleAttrValue = {baseSaleAttrId, saleAttrValueName: inputValue}
        row.spuSaleAttrValueList.push(newSaleAttrValue)
        row.inputVisible = false


      },
      addSaleAttr() {
        const [basSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
        let newSaleAttr = {basSaleAttrId, saleAttrName, spuSaleAttrValueList: []}
        this.spu.spuSaleAttrList.push(newSaleAttr)
        this.attrIdAndAttrName = ''

      },
      async saveOrUpdateSpu() {
        this.spu.spuImageList = this.spuImageList.map(item => {
          return {
            imageName: item.name,
            imageUrl: (item.response && item.response.data) || item.url
          }
        })
        const result = await this.$API.spu.reqSaveOrUpdateSpu(this.spu);
        if (result.code == 200) {
          this.$message({type: 'success', message: "成功"})
          this.$emit('changeScene',0)
        }
      }
    },
    computed: {
      //计算出还未选择的销售属性
      unSelectSaleAttr() {
        this.baseSaleAttrList = this.baseSaleAttrList.filter(item => {
          return this.spu.spuSaleAttrList.every(e => {
            return item.name != e.saleAttrName
          })
        })

        return this.baseSaleAttrList
      }

    }

  }
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
