<template>
  <div id="app" align="center">
    <el-container class="app-container">
      <el-header style="min-height: 90px; padding: 0 5px;">
        <el-menu
          style="float: right; margin-top: 5px;"
          :default-active="activeIndex"
          mode="horizontal"
          :router="true"
          menu-trigger="click"
        >
          <el-menu-item
            v-for="menuItem in menuItems"
            :key="menuItem.index"
            class="hidden-xs-only"
            :index="menuItem.index"
          >{{ menuItem.name }}</el-menu-item>
          <el-menu-item class="hidden-xs-only">
            <a :href="aboutLink" target="_blank" class="about-link">关于我们</a>
          </el-menu-item>
          <el-menu-item v-if="showLogoutButton" class="hidden-xs-only">
            <el-button type="text" @click.stop="logout">退出登录</el-button>
          </el-menu-item>
          <el-submenu index="null" class="hidden-sm-and-up">
            <template slot="title">
              <i class="el-icon-menu" />
              <span>{{ activeMenuItemName }}</span>
            </template>
            <el-menu-item
              v-for="menuItem in menuItems"
              :key="menuItem.index"
              :index="menuItem.index"
            >{{ menuItem.name }}</el-menu-item>
            <el-menu-item>
              <a :href="aboutLink" target="_blank" class="about-link">关于我们</a>
            </el-menu-item>
            <el-menu-item v-if="showLogoutButton">
              <el-button type="text" @click.stop="logout">退出登录</el-button>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main style="padding: 20px 5px;">
        <div>
          <el-alert
            type="success"
            center
            title="建议您使用 Chrome, Firefox 或者 Safari 浏览器访问本网站，以获取最佳的志愿调查体验"
          />
          <el-alert
            type="info"
            center
            :closable="false"
            title="注意：本调查和高考志愿填报无关。同学们务必通过宁夏教育考试院公布的高考志愿填报入口来填报志愿。"
          />
        </div>
        <router-view @logout="logout" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    // Logo
  },
  data() {
    return {
      // aboutLink: "https://siminedu.com/#/about",
      aboutLink: "http://www.gse.pku.edu.cn/",
      activeIndex: "/letter",
      menuItems: [
        {
          name: "北京大学志愿调查",
          index: "/letter"
        },
        {
          name: "志愿调查",
          index: "/zhiyuan"
        },
        {
          name: "联系我们",
          index: "/contact"
        }
      ],
      clickable: false,
      timeout: 10,
      buttonString: "确认"
    };
  },
  computed: {
    ...mapState(["majorStep", "minorStep"]),
    activeMenuItemName() {
      const activeMenuItem = this.menuItems.find(
        item => item.index === this.activeIndex
      );
      return activeMenuItem.name;
    },
    showLogoutButton() {
      return this.loginUser.name != null;
    },
    finishAll() {
      return this.majorStep == 10 && this.minorStep == 1;
    },
    content() {
      var r = "";
      if (this.finishAll) {
        r =
          "问卷填写已完成。若您还有其它的问题，请通过微信pku_zhiyuan1联系我们，感谢您的支持与配合！";
      } else {
        r =
          "如果您尚未完成问卷，您的部分回答将无法被记录。如果您想再次登录之前填写的问卷，请重新填写问卷开头的身份信息，网页将自动跳转到您之前填写的地方。您还有其它的问题，请通过微信pku_zhiyuan1联系我们。";
      }

      return r;
    }
  },
  watch: {
    $route(to) {
      const availableIndices = this.menuItems.map(item => item.index);
      if (availableIndices.includes(to.path)) {
        this.activeIndex = to.path; // set active index when path router change
      }
    }
  },
  methods: {
    countDown() {
      this.timeout = 10;
      this.buttonString = this.timeout + "s后可以退出";
      let clock = window.setInterval(() => {
        this.timeout--;
        this.buttonString = this.timeout + "s后可以退出";
        if (this.timeout < 0) {
          window.clearInterval(clock);
          this.buttonString = "确定要退出么？";
          this.clickable = true;
          this.timeout = 10;

          this.$confirm(this.content, this.buttonString, {
            showConfirmButton: this.clickable,
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$store.commit("clearUser");
              this.$message({
                type: "success",
                message: "成功登出"
              });
              this.$router.push("/letter");
            })
            .catch(() => {});
        }
      }, 1000);
    },
    logout() {
      if (!this.finishAll) {
        this.clickable = false;
        this.countDown();
        this.$notify({
          title: this.buttonString,
          message: this.content,
          duration: 9500,
          showClose: false,
        });
      } else {
        this.buttonString = "确定要退出么？";
        this.$confirm(this.content, this.buttonString, {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store.commit("clearUser");
            this.$message({
              type: "success",
              message: "成功登出"
            });
            this.$router.push("/letter");
          })
          .catch(() => {});
      }
    }
  }
};
</script>

.about-link {
  text-decoration: none;
}
</style>
