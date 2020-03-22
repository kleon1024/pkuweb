<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row>
          <span class="card-title"> 你查找的页面不存在 </span>
          <span style="float: right;">
            <el-button
              type="primary"
              plain
              @click="$router.replace('/letter')"
            >
              点击返回首页
            </el-button>
          </span>
        </el-row>
      </div>
      <p>如果有问题也可以通过搜索 pku_zhiyuan 或者扫描下方的二维码添加我们的微信来咨询</p>
      <div align="center">
        <img
          height="480"
          :src="require('@/assets/qr.png')"
          alt="二维码"
        >
      </div>
    </el-card>
  </div>
</template>
