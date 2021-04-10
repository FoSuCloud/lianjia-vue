<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>

<!-- 卡片视图区域 -->
<el-card class="box-card">
  <!-- 搜索和添加区域 -->
  <el-row :gutter="20">
  <el-col :span="8" >
    <el-input placeholder="请输入内容" clearable
    class="select-input"
    v-model="queryInfo.query"
    @clear="getUserList">
    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
  </el-input>
  </el-col>
  <el-col :span="4"><el-button type="primary" round class="add-button" @click="addDialogVisible=true">添加用户</el-button></el-col>
</el-row>

<!-- 用户列表区域 -->
 <el-table
    :data="userlist"
    stripe
    border
    >
    <el-table-column
      type="index"
    >
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
    >
    </el-table-column>
    <el-table-column
      prop="useremail"
      label="邮箱"
     >
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <!-- 修改按钮 -->
        <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
        <!-- 删除按钮 -->
        <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
        <!-- 分配角色 -->
        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
          <el-button type="warning" icon="el-icon-setting" size="mini" circle></el-button>
        </el-tooltip>     
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页区域 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>

<!-- 添加用户的对话框 -->
<el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="50%"
  @close="addDialogClosed">
  <!-- 内容主体区域 -->
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef"
  label-width="70px" class="add-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="useremail">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
  </el-form>
  <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button round class="dialog-button" @click="addDialogVisible = false">取 消</el-button>
    <el-button round class="dialog-button" type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>

</div>
</template>

<script>
export default {
name: "User",
data () {
  //验证邮箱的规则
   var checkEmail = (rule, value, cb) => {
     //验证邮箱的正则表达式
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if(regEmail.test(value)){
        //合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
   };
 
  return {
    //获取用户列表的参数对象
    queryInfo:{
      query:'',
      //当前的页数
      pagenum:1,
      //当前每页显示多少条数据
      pagesize:5,
    },
    userlist:[],
    total:0,
    //控制添加用户对话框的显示与隐藏
    addDialogVisible:false,

    //添加用户的表单数据
    addForm: {
      username:'',
      password:'',
      useremail:'',
    },

    //添加表单的验证规则对象
    addFormRules: {
      username:[
        {
          require: true, message:'请输入用户名', trigger:'blur',
        },
        {
          min:3,
          max:10,
          message:'用户名的长度在3~10个字符之间',
          trigger:'blur',
        }        
      ],
      password:[
        {
          require: true, message:'请输入密码', trigger:'blur',
        },
        {
          min:6,
          max:15,
          message:'密码的长度在6~15个字符之间',
          trigger:'blur',
        }   
      ],
      email:[
        {
          require: true, message:'请输入邮箱', trigger: 'blur',
        },
         { validator:checkEmail, trigger:'blur'},
      ],
    },
  
} 
},

created() {
  this.getUserList()
},

mounted: {
  async getUserList(){
    const { data:res } = await this.$http.get('users',{ params: this.queryInfo })
    if (res.meta.status !==200) {
      return this.$message.error('获取用户列表失败！')
    }
    this.userlist = res.data.users
    this.total = res.data.total
    
  },
  //监听pagesize改变的事件
  handleSizeChange(newSize) {
        //console.log(newSize);
        this.queryInfo.pagesize = newSize
        this.getUserList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        //console.log(newPage);
        this.queryInfo.pagenum = newPage
        this.getUserList()
      },

      //监听添加用户对话框的关闭事件
      addDialogClosed(){
        this.$refs.addFormRef.resetFields()
      },

      //点击确定按钮，添加新用户
      addUser(){
        // this.$refs.addFormRef.validate(valid => {
        //   if(!valid) return
        //   //可以发起添加用户的网络请求
        //   const {data:res} = await this.$http.post('users',this.addForm)

        //   if(res.meta.status !==201){
        //     this.$message.error('添加用户失败！')
        //   }

        //   this.$message.success('添加用户成功！')
        //   //隐藏添加用户的对话框
        //   this.addDialogVisible = false
        //   //重新获取用户列表数据
        //   this.getUserList()
        // })
      }
},

}
</script>

<style scoped>
.el-breadcrumb{
  font-size: 16px;
  margin-bottom: 15px;
}
.box-card{
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
 .select-input{
  height: 38px;
  line-height: 38px;
  background-color:red;
  font-size: 16px;
}
.add-button{
  font-size: 20px;
}
.el-table{
  font-size: 20px;
  margin-top: 15px;
}
.el-pagination{
  margin-top: 15px;
  text-align:center
}
.dialog-button{
  font-size: 16px;
}
.add-ruleForm{
  margin: 0 50px;
}

</style>