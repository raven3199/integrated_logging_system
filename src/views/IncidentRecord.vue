<template>
  <div class="Incident_container" :style="{width: containerWidth}" >
    <el-card class="Title">
      <h1>事件记录</h1>
    </el-card>
    <el-card class="Retrieval">
      <h1>信息检索</h1>
      <el-form ref="InidentFormRef" :model="IncidentForm" :rules="IncidentFormRules" label-width="100px" class="Incident_form">
        
        <el-row>
        <el-col :span="8">
        <el-form-item prop="Time" label="日期">

          <el-date-picker v-model="IncidentForm.Time" placeholder="请选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        </el-col>
        
        
          <el-col :span="8">
        <el-form-item prop="AccountType" label="账号类型">
          
          <el-select v-model="IncidentForm.AccountType" placeholder="请选择账号类型">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="家长" value="parent"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item prop="Username" label="处理人">

          <el-input v-model="IncidentForm.Username" placeholder="请输入处理人"></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="8">
        <el-form-item prop="IncidentID" label="事件ID">
          <el-input v-model="IncidentForm.IncidentID" placeholder="请输入事件ID"></el-input>
        </el-form-item>
        </el-col>
        
          <el-col :span="8">
        <el-form-item prop="Result" label="处理结果">
          <el-select v-model="IncidentForm.Result" placeholder="请选择处理结果">
            <el-option label="已处理" value="handled"></el-option>
            <el-option label="正在处理" value="being handled"></el-option>
            <el-option label="等待处理" value="will be handled"></el-option>
           </el-select>
        </el-form-item>
        </el-col>
          <el-col :span="8">
        <el-form-item prop="IsBully" label="是否霸凌">
          <el-select v-model="IncidentForm.IsBully" placeholder="请选择是否霸凌">
            <el-option label="是" value="yes"></el-option>
            <el-option label="否" value="no"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        </el-row>
        
        <el-form-item class="btns">
          <el-button type="primary" @click="retrieval">检索</el-button>
          <el-button type="info" @click="resetInidentForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
 <el-card class="ADD">
    <el-row>
        <el-button type="primary" plain @click="dialogVisible = true">新增</el-button>
    </el-row>
      

    <el-dialog
            title="添加事件"
            :visible.sync="dialogVisible"
            width="40%"
            >
 
        <!--弹出的对话框的内容-->
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



<!--表格主体-->
<el-table       border
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                @selection-change="handleSelectionChange"
                 max-height="840" >

        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="Time" width="200" label="日期" align="center" sortable=""> </el-table-column>
       <el-table-column prop="AccountType" width="200" label="账号类型" align="center">
       </el-table-column>
       <el-table-column prop="Username" width="200" label="处理人" align='center'>
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.Username}}</span>
          <el-input v-if="scope.row.isEgdit" v-model="scope.row.Username"></el-input>
        </template>
      </el-table-column>
       <el-table-column prop="IncidentID" width="200" label="处理事件ID" align="center" sortable="">
       </el-table-column>

       <el-table-column prop="Result" width="200" label="处理结果" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.Result}}</span>
          <el-select v-if="scope.row.isEgdit" v-model="scope.row.Result" placeholder="请选择处理结果">
            <el-option label="已处理" value="已处理"></el-option>
            <el-option label="正在处理" value="正在处理"></el-option>
            <el-option label="等待处理" value="待处理"></el-option>
           </el-select>
        </template>
      </el-table-column>
       <el-table-column prop="IsBully" width="200" label="是否霸凌" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.IsBully}}</span>
          <el-select v-if="scope.row.isEgdit" v-model="scope.row.IsBully" placeholder="请选择是否霸凌">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
           </el-select>
        </template>
       </el-table-column>
       <el-table-column prop="Details" width="500" label="事件详情" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{scope.row.Details}}</span>
          <el-input v-if="scope.row.isEgdit" v-model="scope.row.Details"></el-input>
        </template>
       </el-table-column>
       <el-table-column prop="operation" width="500" label="操作" align="center">
       <template slot-scope="scope">
          <el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click='edit(scope.$index,scope.row)' icon="el-icon-edit" circle></el-button>
          <el-button v-if="scope.row.isEgdit" type="success" size="small" @click='editSuccess(scope.$index,scope.row)' icon="el-icon-check" circle></el-button>
          <el-button @click.native.prevent="deleteItem(scope.$index, list)" type="danger" size="small" icon="el-icon-delete" circle></el-button>
        </template>

       </el-table-column>
     </el-table>
     </el-card>
</div>

  
</template>

<script>
export default {
  
  data() {
    
    return {
      dialogVisible: false,//对话框是否可见
      isCollapse: false,  // 侧边栏是否折叠
      IncidentForm: {//检索框参数
        Time: '',
        AccountType: '',
        Username: '',
        IncidentID: '',
        Result: '',
        IsBully: ''
      },
      addForm: {//对话框参数
        Time: '',
        AccountType: '',
        Username: '',
        IncidentID: '',
        Result: '',
        IsBully: '',
        Details:'',
      },
      tableData: [{//表格数据
        Time: '2021-06-03',
        AccountType: '管理员',
        Username: '李昊洋',
        IncidentID: '125896324',
        Result: '正在处理',
        IsBully: '是',
        Details:'',
      },
      {
        Time: '2023-02-23',
        AccountType: '教师',
        Username: '李昊洋',
        IncidentID: '125896348',
        Result: '已处理',
        IsBully: '否',
        Details:'',
      },
      {
        Time: '2022-07-15',
        AccountType: '家长',
        Username: '李昊洋',
        IncidentID: '125896365',
        Result: '待处理',
        IsBully: '否',
        Details:'',
      },
      
      ],
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
      addFormRules: {
        Time: [
          { required: true, message: '请选择时间', trigger: 'blur' },
        ],
        AccountType: [
          { required: true, message: '请选择账号类型', trigger: 'blur' },
        ],
        Username: [
          { required: true, message: '请输入处理人', trigger: 'blur' },
        ],
        IncidentID: [
          { required: true, message: '请输入事件ID', trigger: 'blur' },
          { min: 1, max: 10, message: '请输入正确的ID', trigger: 'blur' }
        ],
        Result: [
          { required: true, message: '请选择处理结果', trigger: 'blur' },
        ],
        IsBully: [
          { required: true, message: '请选择是否霸凌', trigger: 'blur' },
        ],
        Details: [
          { required: false, message: '请输入事件详情', trigger: 'blur' },
        ]
      }
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
    deleteItem(index, list) {
      list.splice(index, 1);
    },
    //编辑数据
    edit(index, row) {
      this.$set(row, 'isEgdit', true)
    },
    //编辑成功
    editSuccess(index, row) {
      this.$set(row, 'isEgdit', false)
    },


    // 重置输入
    resetInidentForm() {
      // console.log(this);
      //ref 获取实例化对象，和自己设置的相对应
      this.$refs.InidentFormRef.resetFields()
    },
    //添加数据方法
    addIncident(){
      var newValue = {
        Time: this.addForm.Time,
        AccountType: this.addForm.AccountType,
        Username: this.addForm.Username,
        IncidentID: this.addForm.IncidentID,
        Result: this.addForm.Result,
        IsBully: this.addForm.IsBully,
        Details: this.addForm.Details,
      }
      this.tableData.push(newValue)
      this.$refs.addFormRef.resetFields()
      this.dialogVisible= false
    },

  },
  mounted() {
    this.isCollapse = this.$store.state.isCollapse;
    console.log(this.isCollapse);
  }
}
</script>

<style lang="scss" scoped>
.Incident_container {
  width:100%;			
  height:100%;
  position: fixed;
  background-size:100% 100%;
}



.add_form {
  position: absolute;
  bottom: 50;
  width: 40%;
  padding: 0px;
  box-sizing: border-box;
}
.Incident_form {
  position: relative;
  margin-top: 20px;
  bottom: 50;
  width: 40%;
  padding: 0px;
  box-sizing: border-box;
}
.table {
  position: relative;
  margin-top: 0px;
  bottom: 50;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
