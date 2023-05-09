<template>
	<el-card class="container" :style="{width: containerWidth}" shadow="always">
    <el-card class="second_container" id="searchBox" shadow="always">
      <el-row type="flex" style="line-height:50px" id="searchBoxTitle">
        <el-col :span="4">
          <h1 style="line-height: 50px;">权限管理</h1>
        </el-col>
        <el-col :span="4" :offset="15" style="text-align: right;">
          <h1>
            信息检索
            <el-button type="text" style="font-size: 1.17em;" id="closeSearchBtn" @click="closeSearch">
              <i :class="searchCollapse ? 'el-icon-arrow-up ': 'el-icon-arrow-down'"></i>
            </el-button>
          </h1>
        </el-col>
      </el-row>
    
      <el-form ref="SearchFormRef" :model="SearchForm" :rules="SearchFormRules" label-width="100px" class="search_form">
        <el-row>
          <el-col :span="7">
            <el-form-item prop="ID" label="用户ID">
              <el-input v-model="SearchForm.ID" prefix-icon="el-icon-user-solid" placeholder="请输入用户ID"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7" :offset="1">
            <el-form-item prop="Username" label="用户名">
              <el-input v-model="SearchForm.Username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7" :offset="1">
            <el-form-item prop="PhoneNumber" label="手机号">
              <el-input v-model="SearchForm.PhoneNumber" prefix-icon="el-icon-phone" placeholder="请输入用户绑定的手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <el-form-item prop="Type" label="账号类型">
              <el-select v-model="SearchForm.Type" placeholder="请选择账号类型">
                <el-option label="教师账号" value="教师账号"></el-option>
                <el-option label="家长账号" value="家长账号"></el-option>
                <el-option label="管理员账号" value="管理员账号"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
          <el-col :span="7" :offset="1">
            <el-form-item prop="RelatedStudent" label="关联学生">
              <el-input v-model="SearchForm.RelatedStudent" prefix-icon="el-icon-s-custom" placeholder="请输入所关联学生姓名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7" :offset="1">
            <el-form-item class="btns">
              <el-button type="info" icon="el-icon-refresh-left" @click="resetForm('SearchFormRef')">重置</el-button>
              <el-button type="primary" icon="el-icon-search" @click="retrieval">检索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    
    <el-card class="second_container" shadow="always">
      <el-row type="flex" style="line-height:50px;margin-bottom: 10px;">
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="dialogFormVisible = true">新建用户</el-button>
        </el-col>
        <el-col :span="12" :offset="8" style="text-align: right;">
          <el-upload 
	          :limit=1
	          :auto-upload="false"
	          accept=".xlsx"
	          :action="UploadUrl()"
	          :before-upload="beforeUploadFile"
	          :on-change="fileChange"
	          :on-exceed="exceedFile"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
	          :file-list="fileList">
              <el-button slot="trigger" icon="el-icon-circle-plus-outline" type="primary">选取用户信息文件</el-button>
              <el-button style="margin-left: 10px;" icon="el-icon-upload2" type="info" @click="uploadFile" plain>批量上传</el-button>
              <el-button type="info" icon="el-icon-download" @click="export2Excel" plain>批量下载</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <!--表格主体-->
      <el-table border
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%;"
        :height="tableTotalHeight"
        :row-style="{height: '60px'}">

        <el-table-column label="序号" width="80px" align='center'>
          <template slot-scope="scope">
            <span>{{ scope.$index +1 }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="ID" width="150" label="用户ID" align="center" sortable=""> </el-table-column>

        <el-table-column prop="Username" width="150" label="用户名" align='center'>
          <template slot-scope="scope">
            <span v-if="!scope.row.isEgdit">{{scope.row.Username}}</span>
            <el-input v-if="scope.row.isEgdit" v-model="scope.row.Username"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="Password" width="150" label="密码" align='center'>
          <template slot-scope="scope">
            <span v-if="!scope.row.isEgdit">{{scope.row.Password}}</span>
            <el-input v-if="scope.row.isEgdit" v-model="scope.row.Password"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="PhoneNumber" width="150" label="手机号码" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEgdit">{{scope.row.PhoneNumber}}</span>
            <el-input v-if="scope.row.isEgdit" v-model="scope.row.PhoneNumber"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="Type" width="150" label="账号类型" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEgdit">{{scope.row.Type}}</span>
            <el-select v-if="scope.row.isEgdit" v-model="scope.row.Type" placeholder="请选择账号类型">
              <el-option label="教师账号" value="教师账号"></el-option>
              <el-option label="家长账号" value="家长账号"></el-option>
              <el-option label="管理员账号" value="管理员账号"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="RelatedStudent" width="150" label="关联学生" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEgdit">{{scope.row.RelatedStudent}}</span>
            <el-input v-if="scope.row.isEgdit&&scope.row.Type=='家长账号'" v-model="scope.row.RelatedStudent"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="operation" width="150" label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click='edit(scope.$index,scope.row)' icon="el-icon-edit" circle></el-button>
            <el-button v-if="scope.row.isEgdit" type="success" size="small" @click='editSuccess(scope.$index,scope.row)' icon="el-icon-check" circle></el-button>
            <el-button v-if="!scope.row.isEgdit" type="warning" size="small" @click='deleteUser(scope.$index,scope.row)' icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block" style="margin-top:15px;">
        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
          :current-page="currentPage" 
          :page-sizes="[10,1,5]" 
          :page-size="pageSize" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="totalPage">
        </el-pagination>
      </div>
    </el-card> 

    <el-dialog title="新建用户" :visible.sync="dialogFormVisible" :append-to-body="true">
      <el-form :model="AddForm" ref="AddFormRef" label-position="left" :rules="AddFormRules" :label-width="formLabelWidth">
        <el-form-item label="用户名" prop="Username">
          <el-input v-model="AddForm.Username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="AddForm.Password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="PhoneNumber">
          <el-input v-model="AddForm.PhoneNumber" autocomplete="off" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="账号类型" prop="Type">
          <el-select v-model="AddForm.Type" placeholder="请选择账号类型">
            <el-option label="教师账号" value="教师账号"></el-option>
            <el-option label="家长账号" value="家长账号"></el-option>
            <el-option label="管理员账号" value="管理员账号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联学生" v-if="AddForm.Type=='家长账号'" prop="RelatedStudent">
          <el-input v-model="AddForm.RelatedStudent" autocomplete="off" placeholder="请输入所关联学生姓名"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadAddForm(false)">取 消</el-button>
        <el-button type="primary" @click="uploadAddForm(true)">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,  // 侧边栏是否折叠
      searchCollapse: true,  // 搜索栏是否折叠
      currentPage: 1, // 当前页码
      totalPage: 10, // 总条数
      pageSize: 10, // 每页的数据条数
      tableTotalHeight: 670,  // 表格总高度，单位为px
      dialogFormVisible: false,  // 新建用户表单是否显示
      SearchForm: {//检索框参数
        ID: '',
        Username: '',
        PhoneNumber: '',
        Type: '',
        RelatedStudent: '',
      },
      formLabelWidth: '120px',
      AddForm: {
        Username: '',
        Password: '',
        PhoneNumber: '',
        Type: '',
        RelatedStudent: '',
      },
      tableData: [
        {
          ID: '1',
          Username: 'aaa',
          PhoneNumber: '13955510106',
          Type: '教师账号',
          RelatedStudent: '',
        }, {
          ID: '2',
          Username: 'bbb',
          PhoneNumber: '13955510127',
          Type: '教师账号',
          RelatedStudent: '',
        }, {
          ID: '3',
          Username: 'ccc',
          PhoneNumber: '13955511441',
          Type: '家长账号',
          RelatedStudent: 'hoad',
        }, {
          ID: '4',
          Username: 'ddd',
          PhoneNumber: '13955512221',
          Type: '管理员账号',
          RelatedStudent: '',
        }, {
          ID: '5',
          Username: 'eee',
          PhoneNumber: '13955517777',
          Type: '家长账号',
          RelatedStudent: 'fred',
        }
      ],  // 表格数据，仅显示出的数据
      totalData: [],  // 获得的所有数据
      fileList: [],  // 上传xlsx文件列表
      SearchFormRules: {  // 检索规则
        ID: [
          { required: false, message: '请输入用户ID', trigger: 'blur' },
          { min: 0, max: 24, message: '用户ID长度错误', trigger: 'blur' }
        ],
        Username: [
          { required: false, message: '请输入用户名', trigger: 'blur' },
          { min: 0, max: 24, message: '用户名长度错误', trigger: 'blur' }
        ],
        PhoneNumber: [
          { required: false, message: '请输入用户绑定的手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        RelatedStudent: [
          { required: false, message: '请输入所关联学生姓名', trigger: 'blur' },
          { min: 0, max: 24, message: '关联学生姓名长度错误', trigger: 'blur' }
        ]
      },
      AddFormRules: {  // 新建用户规则
        Username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 0, max: 24, message: '用户名长度错误', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 0, max: 20, message: '密码格式错误', trigger: 'blur' }
        ],
        PhoneNumber: [
          { required: true, message: '请输入用户绑定的手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        Type: [
          { required: true, message: '请选择账号类型', trigger: 'blur' },
        ],
        RelatedStudent: [
          { required: true, message: '请输入所关联学生姓名', trigger: 'blur' },
          { min: 0, max: 24, message: '关联学生姓名长度错误', trigger: 'blur' }
        ]
      },
    }
  },
	watch: {
    "$store.state.isCollapse":{
      handler:function(newVal){
        this.isCollapse = newVal;
      }
    }
  },
  computed: {
    containerWidth: {
      get: function() {
        if(this.isCollapse) {
          return (window.innerWidth - 40) + 'px';
        } else {
          return (window.innerWidth - 180 - 40) + 'px';
        }
      }
    }
  },
  methods: {
    // 编辑数据
    edit(index, row) {
      this.$set(row, 'isEgdit', true)
    },
    // 编辑成功
    async editSuccess(index, row) {
      //发送修改信息和修改记录给后端
      await this.$axios({
		    method: 'post',
		    url: '/api/account/permission/update',
        data: row
		  }).then((res) => {
        if(res.status == 200) {
          this.$set(row, 'isEgdit', false);
          this.$message({
            type: 'success',
            message: '修改用户信息成功!'
          });
        }
      });
    },
    // 删除某条用户信息
    async deleteUser(index, row) {
      await this.$confirm('此操作将删除该用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$axios({
		      method: 'post',
		      url: '/api/account/permission/delete',
          data: row
		    }).then((res) =>{
          console.log(res);
          if(res.data.flag) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      await this.$axios({
		    method: 'get',
		    url: '/api/account/permission/getList'
		  }).then((res) => {
        this.tableData = res.data.data;
      });
      this.totalData = this.tableData;
      this.totalPage = Math.ceil(this.tableData.length / this.pageSize)*this.pageSize;
      this.tableTotalHeight = (this.pageSize + 1) * 60 + 20;
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.totalPage = Math.ceil(this.tableData.length / this.pageSize)*this.pageSize;
      this.tableTotalHeight = (this.pageSize + 1) * 60 + 20;
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 收起搜索栏
    closeSearch() {
      this.searchCollapse = !this.searchCollapse;
      let searchBox = document.getElementById("searchBox");
      let searchBoxTitle = document.getElementById("searchBoxTitle");
      if (this.searchCollapse == false) {
        searchBox.style.height = 70 + "px";
        searchBoxTitle.style.marginTop = -10 + "px";
      } else {
        searchBox.style.height = "auto";
        searchBoxTitle.style.marginTop = 0 + "px";
      }
    },
    // 重置搜索栏输入
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 检索功能
    retrieval() {
      this.$refs['SearchFormRef'].validate((valid) => {
        if(valid) {
          let search_rules = this.SearchForm;
          let result_list = [];
          let search_array = this.totalData;
          search_array.forEach((e) => {
            var ID = JSON.stringify(e.ID);
            var Username = JSON.stringify(e.Username);
            var PhoneNumber = JSON.stringify(e.PhoneNumber);
            var Type = JSON.stringify(e.Type);
            var RelatedStudent = JSON.stringify(e.RelatedStudent);
            if(search_rules.ID == '' || ID.indexOf(search_rules.ID) != '-1') {
              if(search_rules.Username == '' || Username.indexOf(search_rules.Username) != '-1') {
                if(search_rules.PhoneNumber == '' || PhoneNumber.indexOf(search_rules.PhoneNumber) != '-1') {
                  if(search_rules.Type == '' || Type.indexOf(search_rules.Type) != '-1') {
                    if(search_rules.RelatedStudent == '' || RelatedStudent.indexOf(search_rules.RelatedStudent) != '-1') {
                      if(result_list.indexOf(e) == '-1') {
                        result_list.push(e);
                      }
                    }
                  }
                }
              }
            }
          });
          this.tableData = result_list;
        } else {
          this.$message({
            message: '检索内容错误，请重新输入!',
            type: 'error'
          });
          this.$refs['SearchFormRef'].resetFields();
        }
      })
    },
    // 新建用户
    async uploadAddForm(val) {
      if(!val) {
        this.$message('已取消新建用户');
      } else {
        this.$refs['AddFormRef'].validate((valid) => {
          if(valid) {
            this.$axios({  //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
		          method: 'post',
		          url: '/api/account/permission/add',
              data: this.AddForm
		        }).then((res) => {
              console.log(res);
              if(res.data.flag) {
                this.$message({
                  message: '新建用户成功!',
                  type: 'success'
                });
                
              } else {
                this.$message({
                  message: '新建用户失败!',
                  type: 'error'
                });
              }
            });
          } else {
            this.$message({
              message: '新建用户信息存在错误，请重新输入!',
              type: 'error'
            });
          }
        })
      }
      await this.$axios({
		    method: 'get',
		    url: '/api/account/permission/getList'
		  }).then((res) => {
        this.tableData = res.data.data;
      });
      this.totalData = this.tableData;
      this.totalPage = Math.ceil(this.tableData.length / this.pageSize)*this.pageSize;
      this.tableTotalHeight = (this.pageSize + 1) * 60 + 20;
      this.$refs['AddFormRef'].resetFields()
      this.dialogFormVisible = false;
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning(`只能选择 1 个文件，当前共选择了 ${files.length + fileList.length} 个`);
    },
    // 文件状态改变时的钩子
    fileChange(file) {
      console.log(file.raw);
      this.fileList.push(file.raw) ;
      console.log(this.fileList);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload');
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf('.')+1);
      let size = file.size / 1024 / 1024;
      if(extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.xlsx的文件');
      }
      if(size > 10) {
        this.$message.warning('文件大小不得超过10M');
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    UploadUrl:function(){
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，
      // 所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ""
    },
    async uploadFile() {
      if (this.fileList.length === 0){
        this.$message.warning('请上传文件');
      } else {
        let form = new FormData();
        form.append('file', this.fileList[0]);
        this.$axios({
          method:"post",
          url: "/api/account/permission/addUserByExcel",
          headers:{
            'Content-type': 'multipart/form-data'
          },
          data:form
        }).then((res) => {
          if(res.data.flag) {
            this.$message.success('文件上传成功');
          } else {
            this.$message.error('文件上传失败');
          }
          this.fileList = [];
        });
        await this.$axios({
		      method: 'get',
		      url: '/api/account/permission/getList'
		    }).then((res) => {
          this.tableData = res.data.data;
        });
        this.totalData = this.tableData;
        this.totalPage = Math.ceil(this.tableData.length / this.pageSize)*this.pageSize;
        this.tableTotalHeight = (this.pageSize + 1) * 60 + 20;
      }
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../excel/Export2Excel");
        const tHeader = ["用户ID", "用户名", "密码", "手机号码", "账号类型", "关联学生"]; // 设置Excel的表格第一行的标题
        const filterVal = ["ID", "Username", "Password", "PhoneNumber", "Type", "RelatedStudent"]; // 对象tableData中一个对象的属性
        const list = this.tableData; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list); //对数据过滤
        const head = "用户信息表";
        // tHeader：第一行标题； data:要显示的数据；head：下载的文件名
        export_json_to_excel(tHeader, data, head); 
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },

	async mounted() {
    this.isCollapse = this.$store.state.isCollapse;
    let isLogin = this.$store.state.isLogin;
    if (isLogin == 0) {
      this.$alert('您还未登录，请先登录再行使功能', '提示', {
        confirmButtonText: '确定',
      }).then(this.$router.push('/'));
    } else {
      await this.$axios({
		    method: 'get',
		    url: '/api/account/permission/getList'
		  }).then((res) => {
        this.tableData = res.data.data;
      });
    }
    this.totalData = this.tableData;
    this.totalPage = Math.ceil(this.tableData.length / this.pageSize)*this.pageSize;
    console.log(this.totalPage);
    this.tableTotalHeight = (this.pageSize + 1) * 60 + 20;
    console.log(this.tableData)
  }
}
</script>

<style lang="scss" scoped>
.container {
	margin-top: 20px;
	margin-left: 20px;
	margin-bottom: 20px;
	background-color: #F0F2F5;
	height: calc(100% - 40px);
	width: calc(100% - 40px);
	position: fixed;
  background-size:100% 100%;
  overflow: auto;
}

.second_container {
  background-color: #FAFAFA;
  margin-bottom: 20px;
}
.search_form {
  position: relative;
  margin-top: 20px;
  bottom: 50;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
#searchBox {
  overflow: hidden;
}
</style>


