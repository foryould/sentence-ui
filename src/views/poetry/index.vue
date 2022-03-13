<template>
  <div class="poetry-list">
    <div class="poetry-table">
      <el-table :data="poetryData" height="100%" border stripe>
        <el-table-column
          prop="id"
          label="#"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column
          prop="dynasty"
          label="朝代"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          align="center"
        ></el-table-column>
        <el-table-column pro label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="editItem(scope.row)"
              >修改</el-button
            >
            <el-button size="small" type="danger" @click="deleteItem(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        background
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </div>

    <div class="poetry-actions">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="addPoetry"
        >新增</el-button
      >
    </div>
    <el-dialog
      :title="editId ? '编辑诗词' : '添加诗词'"
      :visible.sync="editShowing"
      width="600px"
    >
      <el-form
        v-if="edit"
        :model="edit"
        ref="form"
        label-width="70px"
        size="small"
      >
        <el-form-item
          label="作者"
          prop="author"
          :rules="[
            { required: true, message: '作者不能为空' },
            {
              pattern: /^[\u4e00-\u9fa5]{2,10}$/,
              message: '请输入正确的作者名称，2-10个中文字符',
            },
          ]"
        >
          <el-input
            v-model.trim="edit.author"
            size="small"
            placeholder="2-10个字之间，仅支持中文"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="诗词"
          prop="content"
          :rules="[
            { required: true, message: '请输入诗句' },
            { pattern: /^.{2,20}$/, message: '诗句必须是2-20个字符' },
          ]"
        >
          <el-input
            v-model="edit.content"
            size="small"
            placeholder="诗句，2-20个字之间"
          />
        </el-form-item>
        <el-form-item
          label="朝代"
          prop="dynastyId"
          :rules="[{ required: true, message: '请选择朝代' }]"
        >
          <el-select v-model="edit.dynastyId">
            <el-option
              v-for="d in dynasties"
              :key="d.id"
              :label="d.name"
              :value="d.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editShowing = false">取消</el-button>
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { poetryStore, dynastyStore } from '@/mock/data-store'

export default {
  name: 'PoetryList',
  data() {
    return {
      poetryData: [],
      total: 0,
      pageSize: 10,
      page: 1,

      editId: undefined,
      edit: undefined,
      editShowing: false,
      dynasties: [],
    }
  },
  created() {
    this.dynasties = dynastyStore.list(null, 1, 1000)
    this.dynastiesMap = {}
    this.dynasties.forEach((d) => {
      this.dynastiesMap[d.id] = d
    })
    this.loadData()
  },
  methods: {
    loadData() {
      this.poetryData = poetryStore.list(null, this.page, this.pageSize)
      this.total = this.poetryData.total
      this.poetryData.forEach((p) => {
        p.dynasty = this.dynastiesMap[p.dynastyId].name
      })
    },
    addPoetry() {
      this.editId = undefined
      this.edit = {
        content: '',
        dynastyId: undefined,
        author: '',
      }
      this.editShowing = true
    },
    async save() {
      try {
        await this.$refs.form.validate()
      } catch {
        return
      }
      poetryStore.save({
        ...this.edit,
        id: this.editId,
      })
      this.editShowing = false
      this.loadData()
    },
    editItem(data) {
      this.editShowing = true
      this.editId = data.id
      this.edit = data
    },
    async deleteItem(data) {
      try {
        await this.$confirm('确定删除该诗句吗？', {
          title: '警告',
          type: 'warning',
        })
      } catch {
        return
      }
      poetryStore.delete(data.id)
      this.loadData()
    },
    onCurrentChange(page) {
      this.page = page
      this.loadData()
    },
  },
}
</script>
<style lang="scss" scoped>
.poetry-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.poetry-table {
  flex: 1;
  overflow: hidden;
}

.pagination {
  text-align: center;
  padding-top: 10px;
}

.poetry-actions {
  text-align: right;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
