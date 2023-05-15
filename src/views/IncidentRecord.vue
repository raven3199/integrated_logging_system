<template>
  <el-card class="Incident_container" :style="{width: containerWidth}" shadow="always" >

    <el-card class="second_container" id="searchBox" shadow="always">
      <el-row type="flex" style="line-height:50px" id="searchBoxTitle">
        <el-col :span="4">
          <h1 style="line-height: 50px;">事件记录</h1>
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
      <el-form ref="InidentFormRef" :model="IncidentForm" :rules="IncidentFormRules" label-width="100px" class="Incident_form">
        
        <el-row>
        <el-col :span="7">
        <el-form-item prop="Time" label="日期">

          <el-date-picker v-model="IncidentForm.Time" placeholder="请选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        </el-col>
        
        
          <el-col :span="7" :offset="1">
        <el-form-item prop="IncidentType" label="事件类型">
          
          <el-select v-model="IncidentForm.IncidentType" placeholder="请选择事件类型">
            <el-option label="自动上报" value="自动上报"></el-option>
            <el-option label="家长上报" value="家长上报"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
        <el-form-item prop="Username" label="处理人">
          <el-input v-model="IncidentForm.Username" placeholder="请输入处理人"></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="7">
        <el-form-item prop="IncidentID" label="事件编号">
          <el-input v-model="IncidentForm.IncidentID" placeholder="请输入事件编号"></el-input>
        </el-form-item>
        </el-col>
        
          <el-col :span="7" :offset="1">
        <el-form-item prop="Result" label="处理状态">
          <el-select v-model="IncidentForm.Result" placeholder="请选择处理状态">
            <el-option label="已处理" value="已处理"></el-option>
            <el-option label="正在处理" value="正在处理"></el-option>
            <el-option label="等待处理" value="待处理"></el-option>
            <el-option label="无效事件" value="无效事件"></el-option>
           </el-select>
        </el-form-item>
        </el-col>
          <el-col :span="7" :offset="1">
        <el-form-item prop="IsBully" label="是否存在霸凌">
          <el-select v-model="IncidentForm.IsBully" placeholder="请选择是否存在霸凌">
            <el-option label="是" value="yes"></el-option>
            <el-option label="否" value="no"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        
        </el-row>
        <el-row>
          <el-col :span="7">
        <el-form-item prop="place" label="发生地点">
          <el-select v-model="IncidentForm.place" placeholder="请选择发生地点">
            <el-option label="第一教学楼" value="第一教学楼"></el-option>
            <el-option label="学生宿舍" value="学生宿舍"></el-option>
          </el-select>
        </el-form-item>
        </el-col>

      <el-col :span="7" :offset="1">
        <el-form-item prop="victim" label="受害者">
          <el-input v-model="IncidentForm.Victim" placeholder="请输入受害者"></el-input>
        </el-form-item>
        </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item class="btns">
          <el-button type="primary" icon="el-icon-search" @click="retrieval">检索</el-button> <!--待增加检索方法-->
          <el-button type="info" icon="el-icon-refresh-left" @click="resetInidentForm">重置</el-button>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      
      
    </el-card>
 <el-card class="second_container" shadow="always">
      <el-row type="flex" style="line-height:50px;margin-bottom: 10px;">
        <el-col :span="6" :offset="20" style="text-align: right;">
          <el-button type="info" icon="el-icon-download" @click="export2Excel" plain>批量下载</el-button>
        </el-col>
      </el-row>
    
      
<!--
    <el-dialog
            title="添加事件"
            :visible.sync="dialogVisible"
            width="40%"
            >
 
        //弹出的对话框的内容
        <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="80px">
        <el-form-item prop="Time" label="日期">
          <el-date-picker v-model="addForm.Time" placeholder="请选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item prop="AccountType" label="账号类型">
           <el-select v-model="addForm.AccountType" placeholder="请选择账号类型">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="教师" value="老师"></el-option>
            <el-option label="家长" value="家长"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="Username" label="处理人">
          <el-input v-model="addForm.Username" placeholder="请输入处理人"></el-input>
        </el-form-item>
        <el-form-item prop="IncidentID" label="事件ID">
          <el-input v-model="addForm.IncidentID" placeholder="请输入事件ID"></el-input>
        </el-form-item>
        <el-form-item prop="Result" label="处理结果">
          <el-select v-model="addForm.Result" placeholder="请选择处理结果">
            <el-option label="已处理" value="已处理"></el-option>
            <el-option label="正在处理" value="正在处理"></el-option>
            <el-option label="等待处理" value="待处理"></el-option>
           </el-select>
        </el-form-item>
          <el-form-item prop="IsBully" label="是否霸凌">
          <el-select v-model="addForm.IsBully" placeholder="请选择是否霸凌">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
          </el-form-item>
        <el-form-item prop="Details" label="事件详情">
          <el-input v-model="addForm.Details" placeholder="请输入事件详情"></el-input>
        
        </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addIncident" >立即添加</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
-->


<!--表格主体-->

      <el-table border
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        
        :height="tableTotalHeight"
        :row-style="{height: '60px'}">

        <el-table-column label="序号" width="80px" align='center'>
        <template slot-scope="scope">
          <span>{{ scope.$index +1 }}</span>
        </template>
        </el-table-column>
        <!--
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        -->
       <el-table-column prop="IncidentID" width="150" label="事件编号" align="center" sortable="">
       </el-table-column>
        <el-table-column prop="Time" width="150" label="上报时间" align="center" sortable=""> 
          <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.Time}}</span>
          <el-input v-if="scope.row.isEgdit" v-model="scope.row.Time"></el-input>
        </template>
        </el-table-column>
        
       <el-table-column prop="IncidentType" width="150" label="事件类型" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.IncidentType}}</span>
          <el-select v-if="scope.row.isEgdit" v-model="scope.row.IncidentType" placeholder="请选择事件类型">
            <el-option label="自动上报" value="自动上报"></el-option>
            <el-option label="家长上报" value="家长上报"></el-option>
           </el-select>
        </template>
       </el-table-column>

       <el-table-column prop="Username" width="150" label="处理人" align='center'>
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.Username}}</span>
          <el-input v-if="scope.row.isEgdit" v-model="scope.row.Username"></el-input>
        </template>
      </el-table-column>

       <el-table-column prop="Result" width="150" label="处理状态" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.Result}}</span>
          <el-select v-if="scope.row.isEgdit" v-model="scope.row.Result" placeholder="请选择处理状态">
            <el-option label="已处理" value="已处理"></el-option>
            <el-option label="正在处理" value="正在处理"></el-option>
            <el-option label="等待处理" value="待处理"></el-option>
            <el-option label="无效事件" value="无效事件"></el-option>
           </el-select>
        </template>
      </el-table-column>

       <el-table-column prop="IsBully" width="150" label="是否存在霸凌" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.IsBully}}</span>
          <el-select v-if="scope.row.isEgdit" v-model="scope.row.IsBully" placeholder="请选择是否存在霸凌">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
           </el-select>
        </template>
       </el-table-column>

      <el-table-column prop="place" width="150" label="发生地点" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.place}}</span>
          <el-select v-if="scope.row.isEgdit" v-model="scope.row.place" placeholder="请选择发生地点">
            <el-option label="第一教学楼" value="第一教学楼"></el-option>
            <el-option label="学生宿舍" value="学生宿舍"></el-option>
           </el-select>
        </template>
       </el-table-column>

       <el-table-column prop="victim" width="150" label="受害者" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.victim}}</span>
          <el-input v-if="scope.row.isEgdit" v-model="scope.row.victim"></el-input>
        </template>
       </el-table-column>

       <el-table-column prop="Details" width="500" label="详细信息" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.Details}}</span>
          <el-input v-if="scope.row.isEgdit" v-model="scope.row.Details"></el-input>
        </template>
       </el-table-column>

       <el-table-column prop="operation" width="150" label="操作" align="center">
       <template slot-scope="scope">
          <el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click='edit(scope.$index,scope.row)' icon="el-icon-edit" circle></el-button>
          <el-button v-if="scope.row.isEgdit" type="success" size="small" @click='editSuccess(scope.$index,scope.row)' icon="el-icon-check" circle></el-button>
        </template>
       </el-table-column>
     </el-table>
     <div class="block" style="margin-top:15px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="currentPage" 
            :page-sizes="[10,1,5]" 
            :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total">
            </el-pagination>
        </div>
        
     </el-card>
</el-card>

  
</template>

<script>
export default {
  
  data() {
    
    return {
      //dialogVisible: false,//对话框是否可见
      isCollapse: false,  // 侧边栏是否折叠
      currentPage: 1, // 当前页码
      total: 10, // 总条数
      searchCollapse: true,
      pageSize: 10, // 每页的数据条数
      tableTotalHeight: 670,  // 表格总高度，单位为px
      IncidentForm: {//检索框参数
        Time: '',
        IncidentType: '',
        Username: '',
        IncidentID: '',
        Result: '',
        IsBully: '',
        place:'',
        victim:'',
        
      },
      //addForm: {//对话框参数
      //Time: '',
      //AccountType: '',
      //Username: '',
      //IncidentID: '',
      //Result: '',
      //IsBully: '',
      //Details:'',
      //},
      tableData: [{ Time: '2023-02-11',
        IncidentType: 'aaa',
        Username: 'aaa',
        IncidentID: 'aaa',
        Result: 'aaa',
        IsBully: 'aaa',
        place:'aaa',
        victim:'aaa',
        Details: '无'}],
      // 检索规则
      IncidentFormRules: {


        IncidentID: [
          { required: false, message: '请输入ID', trigger: 'blur' },
          { min: 1, max: 10, message: '请输入正确的ID', trigger: 'blur' }
        ],
        Username: [
          { required: false, message: '请输入处理人', trigger: 'blur' },
          { min: 2, max: 20, message: '请输入正确的处理人姓名', trigger: 'blur' }
        ]
      },
      //添加规则
      //addFormRules: {
        //Time: [
          //{ required: true, message: '请选择时间', trigger: 'blur' },
        //],
        //AccountType: [
          //{ required: true, message: '请选择账号类型', trigger: 'blur' },
        //],
        //Username: [
          //{ required: true, message: '请输入处理人', trigger: 'blur' },
        //],
        //IncidentID: [
          //{ required: true, message: '请输入事件ID', trigger: 'blur' },
          //{ min: 1, max: 10, message: '请输入正确的ID', trigger: 'blur' }
        //],
        //Result: [
          //{ required: true, message: '请选择处理结果', trigger: 'blur' },
        //],
        //IsBully: [
          //{ required: true, message: '请选择是否霸凌', trigger: 'blur' },
        //],
        //Details: [
          //{ required: false, message: '请输入事件详情', trigger: 'blur' },
        //]
      //}
    }
  },
  watch: {
    "$store.state.isCollapse":{
      handler:function(newVal){
        this.isCollapse = newVal;
        console.log(this.isCollapse);
      }
    }
  },
  computed: {
    containerWidth: {
      get: function() {
        if(this.isCollapse) {
          return (window.innerWidth) + 'px';
        } else {
          return (window.innerWidth - 180) + 'px';
        }
      }
    }
  },
  methods: {
    //编辑数据
    edit(index, row) {
      this.$set(row, 'isEgdit', true)
    },
    //编辑成功
    editSuccess(index, row) {
      this.$set(row, 'isEgdit', false)
      console.log(row)
      //发送修改信息和修改记录给后端
    },

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.total = Math.ceil(this.tableData.length / this.pageSize)*this.pageSize;
      this.tableTotalHeight = (this.pageSize + 1) * 60 + 20;
          },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
    console.log(`当前页: ${val}`);
    this.currentPage = val;
      },
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
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../excel/Export2Excel");
        const tHeader = ["事件编号", "上报时间", "事件类型", "处理人", "处理状态", "是否存在霸凌","发生地点", "受害者", "详细信息"]; // 设置Excel的表格第一行的标题
        const filterVal = ["IncidentID","Time","IncidentType","Username","Result","IsBully","place","victim","Details"]; // 对象tableData中一个对象的属性
        const list = this.tableData; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list); //对数据过滤
        const head = "事件记录表";
        // tHeader：第一行标题； data:要显示的数据；head：下载的文件名
        export_json_to_excel(tHeader, data, head); 
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    // 重置输入
    resetInidentForm() {
      // console.log(this);
      //ref 获取实例化对象，和自己设置的相对应
      this.$refs.InidentFormRef.resetFields()
    },
    //添加数据方法
    //addIncident(){
      //var newValue = {
        //Time: this.addForm.Time,
        //AccountType: this.addForm.AccountType,
        //Username: this.addForm.Username,
        //IncidentID: this.addForm.IncidentID,
        //Result: this.addForm.Result,
        //IsBully: this.addForm.IsBully,
        //Details: this.addForm.Details,
      //}
      //this.tableData.push(newValue)
      //his.$refs.addFormRef.resetFields()
      //this.dialogVisible= false
    //},
    //
    retrieval(){
      console.log(this.I)
    }
  },
  async mounted() {
    this.isCollapse = this.$store.state.isCollapse;
    console.log(this.isCollapse);
    let isLogin = this.$store.state.isLogin;
    if (isLogin == 0) {
      this.$alert('您还未登录，请先登录再行使功能', '提示', {
        confirmButtonText: '确定',
      }).then(this.$router.push('/'));
    }
    this.totalData = this.tableData;
    this.total = Math.ceil(this.tableData.length / this.pageSize)*this.pageSize;
    console.log(this.totalPage);
    this.tableTotalHeight = (this.pageSize + 1) * 60 + 20;
    console.log(this.tableData)
  }
}
</script>

<style lang="scss" scoped>
.Incident_container {
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

.add_form {
  position: absolute;
  bottom: 50;
  width: 40%;
  padding: 0px;
  box-sizing: border-box;
}
.second_container {
  background-color: #FAFAFA;
  margin-bottom: 20px;
}
.Incident_form {
  position: relative;
  margin-top: 20px;
  bottom: 50;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
}
.table {
  position: relative;
  margin-top: 0px;
  bottom: 50;
  width: 100%;
  height: 90%;
  padding: 50px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
