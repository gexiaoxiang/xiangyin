<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">

      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cForm.category1Id" @change="getCategory2List(cForm.category1Id)">
          <el-option :label="category1.name" :value="category1.id" v-for="category1   in category1List"
                     :key="category1.id"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cForm.category2Id" @change="getCategory3List(cForm.category2Id)">
          <el-option :label="category2.name" :value="category2.id" v-for="category2  in category2List"
                     :key="category2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler()">
          <el-option :label="category3.name" :value="category3.id" v-for="category3 in category3List"
                     :key="category3.id"></el-option>
        </el-select>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    name: "CateGorySelect",
    mounted() {
      this.getCategory1List();
    },
    data() {
      return {
        cForm: {
          category1Id: '',
          category2Id: '',
          category3Id: '',
        },
        category1List: [],
        category2List: [],
        category3List: [],
      }
    },
    methods: {
      async getCategory1List() {
        const result = await this.$API.attr.reqCategory1List();
        if (result.code == 200) {
          this.category1List = result.data

        }
      },
      async getCategory2List(category1Id) {
        this.category2List = [];
        this.category3List = [];
        this.cForm.category2Id = '';
        this.cForm.category3Id = '';

        const result = await this.$API.attr.reqCategory2List(category1Id);
        if (result.code == 200) {
          this.category2List = result.data
        }
      },
      async getCategory3List(category2Id) {
        this.category3List = [];
        this.cForm.category3Id = '';

        const result = await this.$API.attr.reqCategory2List(category2Id);
        if (result.code == 200) {
          this.category3List = result.data
        }
      },
      handler() {
        const cForm = {...this.cForm}
        this.$emit('getCategoryId', this.cForm)
      }
    }
  }
</script>

<style scoped>

</style>
