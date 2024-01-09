<!-- 公共组件 -->
<!-- 侧边栏 -->
<template>
    <!-- background-color="#545c64" text-color="#fff"-->
    <el-menu style="width: 200px;height: calc(100vh);" default-active="1" active-text-color="#ffd04b" router>
        <el-submenu index="1">
        <template>算法演示</template>
        <el-menu-item index="/">图论算法</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
        <template>上传算法</template>
        <el-menu-item index="/main">上传cpp</el-menu-item>
        </el-submenu>
    </el-menu>
</template>