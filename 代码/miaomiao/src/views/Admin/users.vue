<template>
    <div>
        <el-table
            :data="nowTableData"
            border
            style="width: 100%">
            <el-table-column
            prop="userHead"
            label="用户头像">
                 <template slot-scope="scope">
                     <img class="userHead" :src="scope.row.userHead">
                 </template>
            </el-table-column>
            <el-table-column
            prop="date"
            label="注册日期">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户姓名">
            </el-table-column>
            <el-table-column
            prop="email"
            label="用户邮箱">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleToFreeze(scope.$index, scope.row)">{{ scope.row.isFreeze ? '已冻结' : '未冻结' }}</el-button>
                    <el-button size="small" @click="handleToDelete(scope.$index, scope.row)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="page"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name : 'users',
    data(){
        return {
            tableData : [],
            currentPage : 1,
            pageSize : 2
        }
    },
    mounted(){
        this.axios.get('/api2/admin/usersList').then((res)=>{
           var status = res.data.status;
           if(status === 0){
               this.tableData = res.data.data.usersList;
           }
        });
    },
    computed : {
        nowTableData(){
            return this.tableData.slice( (this.currentPage - 1)*this.pageSize , this.currentPage*this.pageSize ) || [];
        }
    },
    methods : {
        handleToFreeze(index,row){
            this.axios.post('/api2/admin/updateFreeze',{
                email : row.email,
                isFreeze : !row.isFreeze
            }).then((res)=>{
                var status = res.data.status;
                if(status === 0){
                    this.$alert('冻结操作已成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.tableData[index].isFreeze = !row.isFreeze;
                        }
                    });
                }
                else{
                    this.$alert('冻结操作失败', '信息', {
                        confirmButtonText: '确定'
                    });
                }
            });
        },
        handleToDelete(index,row){
            this.axios.post('/api2/admin/deleteUser',{
                email : row.email
            }).then((res)=>{
                var status = res.data.status;
                if(status === 0){
                     this.$alert('删除操作已成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.tableData.splice(index,1);
                        }
                    });
                }
                else{
                     this.$alert('删除操作失败', '信息', {
                        confirmButtonText: '确定'
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
.page{ margin-top:20px;}
.userHead{ width:50px; height:50px; border-radius: 50%; overflow:hidden;}
</style>
