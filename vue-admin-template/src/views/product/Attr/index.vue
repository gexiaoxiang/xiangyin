<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CateGorySelect @getCategoryId="getCategoryId" :isShow="!isShowTable"></CateGorySelect>
    </el-card>

    <el-card>

      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" :disabled="list.length==0" @click="addAttr">添加属性
        </el-button>
        <el-table style="width: 100%" border :data="list">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px"></el-table-column>
          <el-table-column label="属性值列表">
            <template slot-scope="{row,$index}">
              <el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id"
                      style="margin: 0px 5px ">
                {{ attrValue.valueName }}
              </el-tag>

            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAttr(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--添加属性|修改-->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>

        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值
        </el-button>
        <el-button @click="isShowTable=true">取消</el-button>
        <el-table style="width: 100%; margin:20px 0px" border :data="attrInfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
          <el-table-column with="with" prop="prop" label="属性值名称">
            <template slot-scope="{row,$index}">
              <el-input v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)" v-model="row.valueName"
                        placeholder="请输入属性值名称"
                        size="mini" :ref="$index"></el-input>
              <span v-else @click="toEdit(row,$index)" style="display: block">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column with="with" prop="prop" label="操作">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button type="danger"
                           icon="el-icon-delete"
                           size="mini"
                           slot="reference"></el-button>
              </el-popconfirm>

            </template>

          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>

    </el-card>

  </div>
</template>

<script>
  import cloneDeep from 'lodash/cloneDeep';
  import Item from "@/layout/components/Sidebar/Item";

  export default {
    name: "attr",
    data() {
      return {
        // category3Id: '',
        cmForm: {},
        list: [],
        isShowTable: true,
        //收集新增属性|修改属性
        attrInfo: {
          attrName: '',
          attrValueList: [],
          categoryId: 0,//三级分类
          categoryLevel: 3,
        },

      }
    },
    methods: {
      //自定义事件回调
      async getCategoryId(cForm) {
        this.cForm = cForm;
        const result = await this.$API.attr.reqAttrInfoList(cForm.category1Id, cForm.category2Id, cForm.category3Id)
        if (result.code == 200) {
          this.list = result.data
        }
      },
      //添加属性
      addAttr() {
        this.isShowTable = false
        this.attrInfo = {
          attrName: '',
          attrValueList: [],
          categoryId: 0,//三级分类
          categoryLevel: 3,
        }

      },
      //修改属性
      updateAttr(row) {

        this.isShowTable = false
        this.attrInfo = cloneDeep(row)
        this.attrInfo.attrValueList.forEach(item => {
          this.$set(item, 'flag', false)
        })
      },
      //删除属性
      deleteAttr(row) {
        this.list
      },
      //添加属性值
      addAttrValue() {
        this.attrInfo.attrValueList.push({
          attrId: this.attrInfo.id,
          valueName: '',
          flag: true
        })
        this.$nextTick(() => {
          this.$refs[this.attrInfo.attrValueList.length - 1].focus()
        })
      },
      //删除属性值
      deleteAttrValue(index) {
        this.attrInfo.attrValueList.splice(index, 1)
      },
      //失去焦点事件
      toLook(row) {
        if (row.valueName.trim() == '') {
          this.$message('属性值不能为空')
          return;
        }
        let isRepat = this.attrInfo.attrValueList.some(item => {
          if (item !== row) {
            return item.valueName == row.valueName
          }
        })
        if (isRepat) {
          this.$message('属性值不能重复')
          return;
        }

        row.flag = false
      },
      //点击span的回调
      toEdit(row, index) {
        row.flag = true
        //获取不到 DOM更新了
        // console.log(this.$refs[0]);
        this.$nextTick(() => {
          this.$refs[index].focus()
        })
      },
      //保存
      async addOrUpdateAttr() {
        this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
          if (item.valueName != '') {
            delete item.flag;
            return true
          }
        })
        const result = await this.$API.attr.reqAddorUpdateAttr(this.attrInfo);
        if (result.code == 200) {
          this.isShowTable = true
          this.getCategoryId(this.cForm)
        }

      }
    }
  }
</script>

<style scoped>

</style>
