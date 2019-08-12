<template>
    <el-container>
        <el-header>喵喵网管理后台 ，欢迎：{{ $store.state.user.name }}</el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="1">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <router-link to="/admin/users" tag="span" slot="title">用户管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-document"></i>
                        <router-link to="/admin/movie" tag="span" slot="title">电影管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <router-link to="/admin/cinema" tag="span" slot="title">影院管理</router-link>
                    </el-menu-item>
                </el-menu>    
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import axios from 'axios';
export default {
    name : 'admin',
    beforeRouteEnter (to, from, next) {
        axios.get('/api2/admin').then((res)=>{
            var status = res.data.status;
            if(status === 0){
                next();
            }
            else{
                next('/mine/login');
            }
        });
    }
}
</script>

<style scoped>
.el-header, .el-footer {
background-color: #B3C0D1;
color: #333;
padding-left:60px;
line-height: 60px;
}

.el-aside {
background-color: #D3DCE6;
color: #333;
text-align: center;
line-height: 200px;
}

.el-main {
background-color: #E9EEF3;
color: #333;
text-align: center;
}

body > .el-container {
margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
line-height: 320px;
}
</style>
