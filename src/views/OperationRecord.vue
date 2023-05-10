<template>
	<el-card class="Operation_container" :style="{width: containerWidth}" shadow="always">
    <el-card class="second_container" id="searchBox" shadow="always">
      <el-row type="flex" style="line-height:50px" id="searchBoxTitle">
        <el-col :span="4">
          <h1 style="line-height: 50px;">操作记录</h1>
        </el-col>
        <el-col :span="4" :offset="15" style="text-align: right;">
        </el-col>
      </el-row>
    </el-card>
    <el-card class="second_container" id="searchBox" shadow="always">
      
<el-table       border
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                style="width: 100% height:100%"
                :height="tableTotalHeight"
                :row-style="{height: '60px'}" >
        <el-table-column label="序号" width="80px" align='center'>
        <template slot-scope="scope">
          <span>{{ scope.$index +1 }}</span>
        </template>
        </el-table-column>
        <!--
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        -->

        <el-table-column prop="Time" width="180" label="操作时间" align="center" sortable=""> 
        </el-table-column>
        
       <el-table-column prop="UserType" width="150" label="操作人类型" align="center">
       </el-table-column>

       <el-table-column prop="Username" width="100" label="操作人" align='center'>
      </el-table-column>

       <el-table-column prop="OpType" width="140" label="操作类型" align="center">
      </el-table-column>

       <el-table-column prop="OpObject" width="140" label="操作对象" align="center">
       </el-table-column>

      <el-table-column prop="detail" width="400" label="操作详情" align="center">
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
      isCollapse: false,  // 侧边栏是否折叠
      currentPage: 1, // 当前页码
      total:10, // 总条数
      pageSize: 10, // 每页的数据条数
      tableTotalHeight: 670,
      tableData: [
        {
          UserType:"管理员",
          UserName:"abcd",
          OpType:"修改"
      }],
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
    // 重置输入
    resetInidentForm() {
      // console.log(this);
      //ref 获取实例化对象，和自己设置的相对应
      this.$refs.InidentFormRef.resetFields()
    },
  },
  mounted() {
    this.isCollapse = this.$store.state.isCollapse;
    console.log(this.isCollapse);
    let isLogin = this.$store.state.isLogin;
    if (isLogin == 0) {
      this.$alert('您还未登录，请先登录再行使功能', '提示', {
        confirmButtonText: '确定',
      }).then(this.$router.push('/'));
    }
    this.total = Math.ceil(this.tableData.length / this.pageSize)*this.pageSize;
    this.tableTotalHeight = (this.pageSize + 1) * 60 + 20;
  }
}
</script>

<style lang="scss" scoped>
.Operation_container {
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
.table {
  position: relative;
  margin-top: 0px;
  bottom: 0;
  width: 100%;
  height:90%;
  padding: 50px;
  box-sizing: border-box;
}


</style>
