<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" @click="showDialog">添加</el-button>
    <!--表单-->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌" width="width"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-count="7"
      :page-sizes="[3,5,10]"
      @current-change="getPageList"
      @size-change="handSizeChange"
      layout="prev, pager, next, jumper,->,sizes,total">
    </el-pagination>
    <!--对话框-->
    <el-dialog :title="tmTiTle" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%" :model="tmForm">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <!--文件上传-->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "tradeMark",
    data() {
      return {
        page: 1,
        limit: 3,
        total: 0,
        list: [],
        dialogFormVisible: false,

        tmForm: {
          tmName: '',
          logoUrl: ''
        },
        tmTiTle: ''

      }
    },
    mounted() {
      this.getPageList();
    },
    methods: {
      async getPageList(pager = 1) {
        this.page = pager
        const result = await this.$API.trademark.reqTradeMarkList(this.page, this.limit)
        if (result.code == 200) {
          this.total = result.data.total
          this.list = result.data.records
        }

      },
      handSizeChange(limit) {
        this.limit = limit;
        this.getPageList();
      },
      showDialog() {
        this.tmTiTle = '添加品牌'
        this.dialogFormVisible = true
        this.tmForm = {
          tmName: '',
          logoUrl: ''
        }
      },
      updateTradeMark(row) {
        this.tmTiTle = '修改品牌'
        this.dialogFormVisible = true
        this.tmForm = {...row}

      },
      handleAvatarSuccess(res, file) {
        this.tmForm.logoUrl = res.data

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      async addOrUpdateTradeMark() {
        this.dialogFormVisible = false

        const result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
        if (result.code == 200) {
          this.$message({
            message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
            type: 'success'
          })

        } else {
          this.$message.error(this.tmForm.id ? '修改品牌失败' : '添加品牌失败')
        }
        this.getPageList(this.tmForm.id ? this.page : 1)
        this.tmForm = {
          tmName: '',
          logoUrl: ''
        }
      }

    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
