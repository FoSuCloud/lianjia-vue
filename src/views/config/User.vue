<template>
  <div class="user">
    <!-- 卡片视图区域 -->
    <!-- 搜索和添加区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          clearable
          class="select-input"
          v-model="queryInfo.value"
          @clear="getUserList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUserList"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4"
        ><el-button
          type="primary"
          round
          class="add-button"
          @click="addDialogVisible = true"
          >添加用户</el-button
        ></el-col
      >
    </el-row>

    <!-- 用户列表区域 -->
    <el-table :data="userList" stripe border>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="role" label="角色">
        <template slot-scope="scope">
          {{ scope.row.role === 2 ? "管理员" : "用户" }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="queryInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
        class="add-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            auto-complete="off"
            v-model="addForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button round class="dialog-button" @click="addDialogVisible = false"
          >取 消</el-button
        >
        <el-button round class="dialog-button" type="primary" @click="addUser"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { RequestConstant } from "@/api/RequestConstant";

export default {
  name: "User",
  data() {
    //验证邮箱的规则
    const checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        //合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };

    return {
      //获取用户列表的参数对象
      queryInfo: {
        value: "",
        //当前的页数
        page: 1,
        //当前每页显示多少条数据
        size: 10
      },
      userList: [],
      total: 0,
      //控制添加用户对话框的显示与隐藏
      addDialogVisible: false,

      //添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: ""
      },

      //添加表单的验证规则对象
      addFormRules: {
        username: [
          {
            require: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          {
            require: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "密码的长度在6~15个字符之间",
            trigger: "blur"
          }
        ],
        email: [
          {
            require: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          { validator: checkEmail, trigger: "blur" }
        ]
      }
    };
  },

  created() {
    this.getUserList();
  },

  methods: {
    getUserList() {
      this.$axios
        .get(RequestConstant.USER_LIST, {
          params: this.queryInfo
        })
        .then(response => {
          this.userList = response.data.records;
          this.total = response.data.total;
        });
    },
    //监听size改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.size = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      //console.log(newPage);
      this.queryInfo.page = newPage;
      this.getUserList();
    },
    //监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },

    //点击确定按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return;
        //可以发起添加用户的网络请求
        this.$axios
          .get(RequestConstant.USER_ADD, {
            params: {
              username: this.addForm.username,
              password: this.$md5(this.addForm.password),
              email: this.addForm.email
            }
          })
          .then(res => {
            if (res.code !== 0) {
              this.$message.error("添加用户失败！");
              return;
            }
            this.$message.success("添加用户成功！");
            //隐藏添加用户的对话框
            this.addDialogVisible = false;
            //重新获取用户列表数据
            this.getUserList();
          });
      });
    }
  }
};
</script>

<style lang="scss">
.user {
  padding: 10px;
  .select-input {
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    .el-input__inner {
      height: 40px;
    }
  }
  .add-button {
    font-size: 20px;
  }
  .el-table {
    font-size: 20px;
    margin: 15px 0;
    height: calc(100% - 120px);
    .el-table__body-wrapper{
      height: calc(100% - 65px);
      overflow: auto;
    }
  }
  .el-pagination {
    text-align: center;
  }
  .dialog-button {
    font-size: 16px;
  }
  .add-ruleForm {
    margin: 0 50px;
  }
}
</style>
