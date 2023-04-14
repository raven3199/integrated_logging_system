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
              <el-button type="info" icon="el-icon-refresh-left" @click="resetSearchForm">重置</el-button>
              <el-button type="primary" icon="el-icon-search" @click="retrieval">检索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    
    <el-card class="second_container" shadow="always">
      <el-row type="flex" style="line-height:50px;margin-bottom: 10px;">
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-circle-plus-outline" plain>新建用户</el-button>
        </el-col>
        <el-col :span="6" :offset="14" style="text-align: right;">
          <el-button type="info" icon="el-icon-upload2" plain>批量上传</el-button>
          <el-button type="info" icon="el-icon-download" plain>批量下载</el-button>
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

        <el-table-column prop="ID" width="200" label="用户ID" align="center" sortable=""> </el-table-column>

        <el-table-column prop="Username" width="200" label="用户名" align='center'>
          <template slot-scope="scope">
            <span v-if="!scope.row.isEgdit">{{scope.row.Username}}</span>
            <el-input v-if="scope.row.isEgdit" v-model="scope.row.Username"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="PhoneNumber" width="200" label="手机号码" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEgdit">{{scope.row.PhoneNumber}}</span>
            <el-input v-if="scope.row.isEgdit" v-model="scope.row.PhoneNumber"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="Type" width="200" label="账号类型" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEgdit">{{scope.row.Type}}</span>
            <el-select v-if="scope.row.isEgdit" v-model="scope.row.Type" placeholder="请选择账号类型">
              <el-option label="教师账号" value="教师账号"></el-option>
              <el-option label="家长账号" value="家长账号"></el-option>
              <el-option label="管理员账号" value="管理员账号"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="RelatedStudent" width="200" label="关联学生" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEgdit">{{scope.row.RelatedStudent}}</span>
            <el-input v-if="scope.row.isEgdit&&scope.row.Type=='家长账号'" v-model="scope.row.RelatedStudent"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="operation" width="200" label="操作" align="center">
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
      SearchForm: {//检索框参数
        ID: '',
        Username: '',
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
      SearchFormRules: {  // 检索规则
        PhoneNumber: [
          { required: false, message: '请输入ID', trigger: 'blur' },
          { min: 1, max: 10, message: '请输入正确的ID', trigger: 'blur' }
        ],
        Username: [
          { required: false, message: '请输入处理人', trigger: 'blur' },
          { min: 2, max: 20, message: '请输入正确的处理人姓名', trigger: 'blur' }
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
    editSuccess(index, row) {
      this.$set(row, 'isEgdit', false)
      console.log(row)
      //发送修改信息和修改记录给后端
    },
    // 删除某条用户信息
    deleteUser(index) {
      this.$confirm('此操作将删除该用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice((this.currentPage-1)*this.pageSize+index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.totalPage = Math.ceil(this.tableData.length / this.pageSize);
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
    resetSearchForm() {
      this.$refs.SearchFormRef.resetFields()
    },
    // 向后端检索
    retrieval() {
      let search_rules = this.SearchForm;
      console.log(search_rules);
      let result_list = [];
      let search_array = this.totalData;
      console.log(search_array)
      search_array.forEach((e) => {
        var ID = JSON.stringify(e.ID);
        console.log(ID);
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
    },
  },
	mounted() {
    this.isCollapse = this.$store.state.isCollapse;
    let isLogin = this.$store.state.isLogin;
    if (isLogin == 0) {
      this.$alert('您还未登录，请先登录再行使功能', '提示', {
        confirmButtonText: '确定',
      }).then(this.$router.push('/'));
      this.totalData = this.tableData;
      this.totalPage = Math.ceil(this.tableData.length / this.pageSize);
      this.tableTotalHeight = (this.pageSize + 1) * 60 + 20;
    }
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


