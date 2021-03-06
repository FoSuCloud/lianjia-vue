import Vue from "vue";
import VueRouter from "vue-router";
import { RouterConstant } from "@/router/RouterConstant";
import MainLayout from "@/views/MainLayout.vue";

Vue.use(VueRouter);

let routes = [];

const dynamicRoutes = [
  {
    path: RouterConstant.HOME_DATA,
    name: "数据总概括",
    component: MainLayout,
    permission: true,
    hiddenSub: true,
    redirect: RouterConstant.HOME_DATA_TRUE,
    children: [
      {
        path: RouterConstant.HOME_DATA_TRUE,
        parentPath: RouterConstant.HOME_DATA,
        name: "数据总概括",
        component: () => import("@/views/home/Data.vue")
      }
    ]
  },
  {
    path: RouterConstant.HOME_LIST,
    name: "数据可视化",
    component: MainLayout,
    permission: true,
    hiddenSub: true,
    redirect: RouterConstant.HOME_LIST_TRUE,
    children: [
      {
        path: RouterConstant.HOME_LIST_TRUE,
        parentPath: RouterConstant.HOME_LIST,
        name: "数据可视化",
        component: () => import("@/views/home/Home.vue")
      }
    ]
  },
  {
    path: RouterConstant.VISUALIZE,
    name: "可视化",
    component: MainLayout,
    permission: true,
    redirect: RouterConstant.VISUALIZE_GZ,
    children: [
      {
        path: RouterConstant.VISUALIZE_GZ,
        name: "广州",
        component: () => import("@/views/visualize/City.vue"),
        parentPath: RouterConstant.VISUALIZE
      },
      {
        path: RouterConstant.VISUALIZE_SZ,
        name: "深圳",
        component: () => import("@/views/visualize/City.vue"),
        parentPath: RouterConstant.VISUALIZE
      },
      {
        path: RouterConstant.VISUALIZE_BJ,
        name: "北京",
        component: () => import("@/views/visualize/City.vue"),
        parentPath: RouterConstant.VISUALIZE
      },
      {
        path: RouterConstant.VISUALIZE_SH,
        name: "上海",
        component: () => import("@/views/visualize/City.vue"),
        parentPath: RouterConstant.VISUALIZE
      }
    ]
  },
  {
    path: RouterConstant.BRAIN,
    name: "租金预测",
    component: MainLayout,
    permission: true,
    hiddenSub: true,
    redirect: RouterConstant.BRAIN_CALCULATE,
    children: [
      {
        path: RouterConstant.BRAIN_CALCULATE,
        name: "租金预测",
        component: () => import("@/views/brain/Calculate.vue"),
        parentPath: RouterConstant.BRAIN
      }
    ]
  },
  {
    path: RouterConstant.CONFIG_USER,
    name: "用户",
    component: MainLayout,
    permission: true,
    hiddenSub: true,
    Admin:true,
    redirect: RouterConstant.USER,
    children: [
      {
        path: RouterConstant.USER,
        name: "用户",
        component: () => import("@/views/config/User.vue"),
        parentPath: RouterConstant.CONFIG_USER
      }
    ]
  },
  {
    path: RouterConstant.CONFIG_ABOUT,
    name: "关于",
    component: MainLayout,
    permission: true,
    hiddenSub: true,
    redirect: RouterConstant.ABOUT,
    children: [
      {
        path: RouterConstant.ABOUT,
        name: "关于",
        component: () => import("@/views/config/About.vue"),
        parentPath: RouterConstant.CONFIG_ABOUT
      }
    ]
  }
];

const withoutAuthRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue")
  }
];

const staticRoutes = [
  {
    path: "/",
    redirect: "/login"
  }
];

routes.push(...dynamicRoutes, ...withoutAuthRoutes, ...staticRoutes);

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
