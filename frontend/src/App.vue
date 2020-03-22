<template>
  <div
    id="app"
    align="center"
  >
    <el-container class="app-container">
      <el-header style="min-height: 90px; padding: 0 5px;">
        <el-row class="top-banner">
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
            >
              {{ menuItem.name }}
            </el-menu-item>
            <el-menu-item class="hidden-xs-only">
              <a
                :href="aboutLink"
                target="_blank"
                class="about-link"
              >关于我们</a>
            </el-menu-item>
            <el-menu-item
              v-if="showLogoutButton"
              class="hidden-xs-only"
            >
              <el-button
                type="text"
                @click.stop="logout"
              >
                退出登录
              </el-button>
            </el-menu-item>
            <el-submenu
              index="null"
              class="hidden-sm-and-up"
            >
              <template slot="title">
                <i class="el-icon-menu" />
                <span>{{ activeMenuItemName }}</span>
              </template>
              <el-menu-item
                v-for="menuItem in menuItems"
                :key="menuItem.index"
                :index="menuItem.index"
              >
                {{ menuItem.name }}
              </el-menu-item>
              <el-menu-item>
                <a
                  :href="aboutLink"
                  target="_blank"
                  class="about-link"
                >关于我们</a>
              </el-menu-item>
              <el-menu-item v-if="showLogoutButton">
                <el-button
                  type="text"
                  @click.stop="logout"
                >
                  退出登录
                </el-button>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-row>
      </el-header>
      <el-main style="padding: 20px 5px;">
        <div>
          <el-alert
            type="success"
            center
            title="建议您使用 Chrome, Firefox 或者 Safari 浏览器访问本网站，以获取最佳的志愿辅导体验"
          />
          <el-alert
            type="error"
            center
            :closable="false"
            title="报考一批次志愿院校的同学请务必通过宁夏教育考试院公布的高考志愿填报入口来填报志愿。我们的志愿辅导只是模拟志愿的填写，并不是真正的志愿填报！"
          />
        </div>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
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
          name: "致宁夏2019届考生的一封信",
          index: "/letter"
        },
        {
          name: "志愿辅导",
          index: "/zhiyuan"
        },
        {
          name: "联系我们",
          index: "/contact"
        }
      ]
    };
  },
  computed: {
    activeMenuItemName() {
      const activeMenuItem = this.menuItems.find(
        item => item.index === this.activeIndex
      );
      return activeMenuItem.name;
    },
    showLogoutButton() {
      return this.loginUser.gaokao_id || this.$store.state.zhiyuanColleges;
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
    logout() {
      this.$confirm(
        "如果你有尚未提交的志愿信息，这些信息将无法被记录。",
        "确定要退出么？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$store.commit("clearUser");
        this.$message({
          type: "success",
          message: "成功登出"
        });
        this.$router.push("/letter");
      }).catch(() => {});
    }
  }
};
</script>

<style scoped>
.top-banner {
  padding: 10px 10px;
}

.about-link {
  text-decoration: none;
}
</style>
