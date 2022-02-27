import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "../store";
import Login from '../views/Login.vue';
import ErrorPage from '../components/Error404Page.vue';
import Logout from '../components/Logout.vue';
import Navigation from "../views/Navigation";
import Dashboard from "../views/Dashboard.vue";
import Faculty from "../views/Faculty/Faculty.vue";
import StudentDashboard from "../views/Student/StudentDashboard.vue";
import Applications from "../views/Applications.vue";
import { isBoolean } from 'lodash';
import { name } from 'store/storages/cookieStorage';


Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage
  },
  {
    meta: {
      requiresAuth: true,
      isAdmin:true,
    },
    path: "/faculty",
    name: "faculty",
    component: Faculty
  },
  {
    path: "/student-dashboard",
    meta: {
      requiresAuth: true,
      isAdmin:true,
    },
    name: "student-dashboard",
    component: StudentDashboard
  },
  {
    meta: {
      requiresAuth: false,
      isAdmin:true,
    },
    path: "/applications",
    name: "applications",
    component: Applications
  },
  {
    path: "/personal-info",
    meta: {
      requiresAuth: true,
      isAdmin:true,

    },
    name: "personal-info",
    component:() =>
      import("../views/Student/UpdatePersonalInfo.vue"),
  },
  {
    path: "/applyform",
    meta: {
      requiresAuth: true,
      isAdmin:true,

    },
    name: "applyform",
    component:() =>
      import("../views/Student/StudentForm.vue"),
  },
  
  {
    path: "/applyform-edit",
    name: "applyform-edit",
    meta: {
      requiresAuth: true,
      isAdmin:true,

    },
    component: () =>
      import(/* webpackChunkName: "term" */ "../views/Student/ApplyFormEdit.vue"),
  },

  {
    path: "/",
    component: Navigation,
    meta: {
      requiresAuth: true,
      isAdmin:true,
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  store,
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn && to.path != '/login') {
      next({ name: "login" });
    } else {
      let role = store.getters.userDetails.role;
      console.log(store.getters.userDetails.role,"role in routes js ")
      if (to.matched.some((record) => record.meta.isAdmin)) {
        if (role === "admin") {
           if(to.path!="/dashboard"){
            next({name:"dashboard"});
           }
          next();
        } 
        else if(role === "user"){
           if(to.path != "/student-dashboard" && to.path!="/personal-info" && to.path!="/applyform"  && to.path!="/applyform-edit"){
          
           next({ name: "student-dashboard" });
          }
            else{
              next();
            }
        }
        else{
          if(role === "faculty" && to.path != "/faculty"){
          
            next({ name: "faculty" });
           }
             else{
               next();
             }
        }
        
      
      } 
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
   next();
  }
}
);

export default router;
