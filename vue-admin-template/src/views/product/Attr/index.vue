<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CateGorySelect @getCategoryId="getCategoryId"></CateGorySelect>
    </el-card>

    <el-card>

      <el-button type="primary" icon="el-icon-plus">添加属性</el-button>
      <el-table style="width: 100%" border :data="list">
        <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="150px"></el-table-column>
        <el-table-column label="属性值列表">
          <template slot-scope="{row,$index}">
            <el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id" style="margin: 0px 5px ">
              {{ attrValue.valueName }}
            </el-tag>

          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="{row,$index}">
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAttr(row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>

    </el-card>

  </div>
</template>

<script>
  export default {
    name: "attr",
    data() {
      return {
        list: []
      }
    },
    methods: {
      //自定义事件回调
      async getCategoryId(cForm) {
        const result = await this.$API.attr.reqAttrInfoList(cForm.category1Id, cForm.category2Id, cForm.category3Id)
        if (result.code == 200) {
          this.list = result.data
        }
      }
    },
  }
</script>

<style scoped>

</style>
