<template>
  <div class="dynasty-list">
    <div class="dynasty-table">
      <el-table :data="dynastyData" height="100%" border stripe>
        <el-table-column
          prop="id"
          label="ID"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="朝代名称"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
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
    <div class="dynasty-actions">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="addDynasty"
        >添加朝代</el-button
      >
    </div>
    <el-dialog
      :title="editId ? '编辑朝代' : '添加朝代'"
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
          label="朝代名"
          prop="name"
          :rules="[
            { required: true, message: '朝代名称不能为空' },
            { validator: validataDynastyName },
          ]"
        >
          <el-input
            v-model.trim="edit.name"
            placeholder="请输入朝代名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editShowing = false" size="small">取消</el-button>
        <el-button @click="save" type="primary" size="small">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { dynastyStore, poetryStore } from '@/mock/data-store'

export default {
  name: 'DynastyList',
  data() {
    return {
      dynastyData: [],

      editId: undefined,
      edit: undefined,
      editShowing: false,
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.dynastyData = dynastyStore.list(null, 1, 1000)
    },
    addDynasty() {
      this.editId = undefined
      this.edit = {
        name: '',
      }
      this.editShowing = true
    },
    validataDynastyName(rules, value, callback) {
      const list = dynastyStore.list(
        (d) => {
          if (value !== d.name) return false
          // 排除掉当前编辑的数据
          if (this.editId && this.editId === d.id) return false
          return true
        },
        1,
        1
      )
      if (list.length > 0) {
        callback(new Error('朝代名不能重复'))
      } else {
        callback()
      }
    },
    async save() {
      try {
        await this.$refs.form.validate()
      } catch {
        return
      }
      dynastyStore.save({
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
        await this.$confirm(
          '删除该项会同时删除所有引用该项的诗句，确定删除吗？',
          {
            title: '警告',
            type: 'warning',
          }
        )
      } catch {
        return
      }

      const poetries = poetryStore.list((d) => d.dynastyId === data.id, 1, 1000)
      poetries.forEach((p) => {
        poetryStore.delete(p.id)
      })

      dynastyStore.delete(data.id)
      this.loadData()
    },
  },
}
</script>
<style lang="scss" scoped>
.dynasty-list {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
}

.dynasty-table {
  flex: 1;
  overflow: hidden;
}

.dynasty-actions {
  padding-top: 10px;
  text-align: right;
  padding-bottom: 10px;
}
</style>
