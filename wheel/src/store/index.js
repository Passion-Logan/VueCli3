import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  // 储存所有公共数据的仓库
  state: {
    token: null,
    tabItem: [], // 标签栏数组
    currentTab: "/system" // 当前新增标签栏
  },
  // 要修改仓库数据的唯一通道 不支持异步
  mutations: {
    // 保存token状态
    SAVE_TOKEN(state, obj) {
      state.token = obj;
    },
    // tab标签栏数组
    EDIT_TAB(state, obj) {
      // 数组去重
      let flag = false;
      for (const item of state.tabItem) {
        if (item.title === obj.title) {
          flag = true;
        }
      }
      if (!flag) {
        state.tabItem.push(obj);
        console.log(state.tabItem);
      }
    },
    // 当前tab标签栏
    CURRENT_TAB(state, obj) {
      state.currentTab = obj;
    }
  },
  // 异步获取数据
  actions: {
    addCount(context) {
      let count = 5;
      context.commit({
        type: "ADD_COUNT",
        data: count
      });
    }
  },
  // 用法相当于computed计算属性
  getters: {}
});

export default store;
