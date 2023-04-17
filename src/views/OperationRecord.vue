<template>
	<div class="Operation_container" :style="{width: containerWidth}" shadow="always">
    <el-card class="Title">
      <h1>事件记录</h1>
    </el-card>
    <el-card class="table">
      <div>
<el-table       border
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                style="width: 100% height:100%"
                :row-class-name="tableRowClassName"
                @selection-change="handleSelectionChange"
                 max-height="1020" >
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
            :page-sizes="[20,1,5,10]" 
            :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total">
            </el-pagination>
        </div>
        </div>
     </el-card>
  </div>
</template>

<script>
export default {
  
  data() {
    
    return {
      isCollapse: false,  // 侧边栏是否折叠
      currentPage: 1, // 当前页码
      total:50, // 总条数
      pageSize: 20, // 每页的数据条数
      tableData: [],
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
  }
}
</script>

<style lang="scss" scoped>
.Operation_container {
  width:100%;			
  height:100%;
  position: fixed;
  background-size:100% 100%;
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
