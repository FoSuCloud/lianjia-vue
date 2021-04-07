import Vue from "vue";
import VueRouter from "vue-router";
import { RouterConstant } from "@/router/RouterConstant";
import MainLayout from "@/views/MainLayout.vue";

Vue.use(VueRouter);

let routes = [];

const dynamicRoutes = [
  {
    path: RouterConstant.HOME,
    name: "首页",
    component: MainLayout,
    permission: true,
    redirect: RouterConstant.HOME_DATA,
    children: [
      {
        path: RouterConstant.HOME_DATA,
        name: "数据总概括",
        component: () => import("@/views/home/Data.vue"),
        parentPath: RouterConstant.HOME
      },
      {
        path: RouterConstant.HOME_LIST,
        name: "数据可视化",
        component: () => import("@/views/home/Home.vue"),
        parentPath: RouterConstant.HOME
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
    name: "智能化",
    component: MainLayout,
    permission: true,
    redirect: RouterConstant.BRAIN_CALCULATE,
    children: [
      {
        path: RouterConstant.BRAIN_CALCULATE,
        name: "房价预测",
        component: () => import("@/views/brain/Calculate.vue"),
        parentPath: RouterConstant.BRAIN
      }
    ]
  }
];

const withoutAuthRoutes = [
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: "/registry",
    name: "registry",
    component: () => import("@/views/registry/Registry.vue")
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
