<template>
	<el-card class="container" :style="{width: containerWidth}" shadow="always">
    <el-card class="second_container" id="searchBox" shadow="always">
      <el-row type="flex" style="line-height:50px" id="searchBoxTitle">
        <el-col :span="4">
          <h1 style="line-height: 50px;">账号认证</h1>
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
            <el-form-item prop="Time" label="日期">
              <el-date-picker v-model="SearchForm.Time" placeholder="请选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="7" :offset="1">
            <el-form-item prop="Username" label="申请人">
              <el-input v-model="SearchForm.Username" prefix-icon="el-icon-user" placeholder="请输入申请人姓名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7" :offset="1">
            <el-form-item prop="PhoneNumber" label="手机号">
              <el-input v-model="SearchForm.PhoneNumber" prefix-icon="el-icon-phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <el-form-item prop="Confirm" label="验证状态">
              <el-select v-model="SearchForm.Confirm" placeholder="请选择验证状态">
                <el-option label="" value=""></el-option>
                <el-option label="未验证" value="未验证"></el-option>
                <el-option label="已验证" value="已验证"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
          <el-col :span="5" :offset="1">
            <el-form-item prop="State" label="处理状态">
              <el-select v-model="SearchForm.State" placeholder="请选择处理结果">
                <el-option label="" value=""></el-option>
                <el-option label="待处理" value="待处理"></el-option>
                <el-option label="已同意" value="已同意"></el-option>
                <el-option label="已拒绝" value="已拒绝"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="10" >
            <el-form-item class="btns">
              <el-button type="success" icon="el-icon-upload2" @click="uploadTeacherInfo">上传新增教师信息</el-button>
              <el-button type="info" icon="el-icon-refresh-left" @click="resetSearchForm">重置</el-button>
              <el-button type="primary" icon="el-icon-search" @click="retrieval">检索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!--表格主体-->
    <el-card class="second_container" shadow="always">
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
        <el-table-column prop="Time" width="200" label="日期" align="center" sortable=""> </el-table-column>
        <el-table-column prop="Username" width="200" label="申请人" align='center'></el-table-column>
        <el-table-column prop="PhoneNumber" width="200" label="手机号码" align="center"></el-table-column>
        <el-table-column prop="Confirm" width="200" label="验证状态" align="center"></el-table-column>
        <el-table-column prop="State" width="200" label="处理状态" align="center"></el-table-column>

        <el-table-column prop="operation" width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.State=='待处理'" @click='makeDecision(scope.$index,scope.row,1)' type="success" size="small" icon="el-icon-check" circle></el-button>
            <el-button v-if="scope.row.State=='待处理'" @click='makeDecision(scope.$index,scope.row,0)' type="danger" size="small" icon="el-icon-close" circle></el-button>
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
      tableTotalHeight: 670,
      SearchForm: {//检索框参数
        Time: '',
        Username: '',
        PhoneNumber: '',
        State: '',
        Confirm: ''
      },
      tableData: [],  // 表格数据，仅显示出的数据
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
    },
  },
  methods: {
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
    // 重置搜索框输入
    resetSearchForm() {
      this.$refs.SearchFormRef.resetFields()
    },
    // 向后端检索
    retrieval() {
      let search_rules = this.SearchForm;
      let result_list = [];
      let search_array = this.totalData;
      search_array.forEach((e) => {
        var Time = JSON.stringify(e.Time);
        var Username = JSON.stringify(e.Username);
        var PhoneNumber = JSON.stringify(e.PhoneNumber);
        var State = JSON.stringify(e.State);
        var Confirm = JSON.stringify(e.Confirm);
        if(search_rules.Time == '' || Time.indexOf(search_rules.Time) != '-1') {
          if(search_rules.Username == '' || Username.indexOf(search_rules.Username) != '-1') {
            if(search_rules.PhoneNumber == '' || PhoneNumber.indexOf(search_rules.PhoneNumber) != '-1') {
              if(search_rules.State == '' || State.indexOf(search_rules.State) != '-1') {
                if(search_rules.Confirm == '' || Confirm.indexOf(search_rules.Confirm) != '-1') {
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
    // 决定是否同意教师的申请
    makeDecision(index, row, decision) {
      let message = {
        id: row.id,
        decision: decision
      };
      console.log(message);
      this.$axios({
        method: 'post',
        url: '/api/account/confirm/verify',
        data: message
      }).then((res) => {
        console.log(res);
        if(res.data.flag) {
          if (decision == 1) {
            this.tableData[index].State = '已同意';
            this.$message({
              type: 'success',
              message: '已同意'
            });
          } else if (decision == 0) {
            this.tableData[index].State = '已拒绝';
            this.$message({
              type: 'success',
              message: '已拒绝'
            });
          }
        } else {
          this.$alert('上传操作出现错误！', '提示', {
            confirmButtonText: '确定',
          })
        }
      })
    },
    // 上传新增教师信息
    uploadTeacherInfo() {

    }
  },
	async mounted() {
    this.isCollapse = this.$store.state.isCollapse;
    let isLogin = this.$store.state.isLogin;
    if (isLogin == '0') {
      this.$alert('您还未登录，请先登录再行使功能', '提示', {
        confirmButtonText: '确定',
      }).then(this.$router.push('/'));
    } else {
      await this.$axios({  //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
		    method: 'get',
		    url: '/api/account/confirm/getList'
		  }).then((res) => {
        this.tableData = res.data.data;
        console.log(this.tableData);
      });
      for(let i=0; i<this.tableData.length; i++) {
        if(this.tableData[i].Confirm == 0) {
          this.tableData[i].Confirm = '未验证';
        } else if (this.tableData[i].Confirm == 1) {
          this.tableData[i].Confirm = '已验证';
        } else {
          console.log(i);
        }
        if(this.tableData[i].State == 0) {
          this.tableData[i].State= '待处理';
        } else if (this.tableData[i].State == 1) {
          this.tableData[i].State= '已同意';
        } else if (this.tableData[i].State == 2) {
          this.tableData[i].State= '已拒绝';
        } else {
          console.log(i);
        }
      }
      this.totalData = this.tableData;
      console.log(this.tableData)
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


