# logging-system前端介绍

本项目前端框架为Vue2 + Element UI，前后端连接使用Axios，数据储存使用Vuex。以下是项目的启动方法：



## Project setup
```
npm install
```

### Compiles and hot-reloads for development（启动项目的方法）
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```



## 项目功能与页面

### 1. 首页（登录界面）

主要负责用户登录、注册、退出等功能
![登录页面](https://user-images.githubusercontent.com/93770915/227142492-92111b9d-ae45-48d3-9d68-45c669309438.jpg)



### 2. 账号认证页面

主要负责对教师以及超级管理员账号的注册进行审核，决定账号申请是否通过。
![账号认证界面](https://user-images.githubusercontent.com/93770915/227142644-e4989ebc-1c11-4f3a-9170-a16148f84af7.jpg)



### 3.用户权限管理页面

可以查看全部的用户账号信息，拥有信息检索、信息导入与导出功能，还可以对用户账号进行增删改查等操作。
![权限管理](https://user-images.githubusercontent.com/93770915/227142748-d9d28115-3fb8-4eb0-b892-9e3ab32cbc96.jpg)



### 4. 事件记录页面

可查看所有的霸凌记录，对信息进行检索，并对其中的一些信息（处理结果、是否存在霸凌现象、处理人等）进行修改。



### 5. 操作记录页面

对所有用户的操作（上报、处理、包括管理员对于账号与事件的修改）进行记录的页面。按事件排序，点开可查看详细信息，有检索功能。不必具有修改功能，仅仅作为记录存在。（不必和样例一样，看自己的实现需要）
![事件记录](https://user-images.githubusercontent.com/93770915/227142940-23e3bc97-7955-44d0-af57-441548c64fca.jpg)



## 项目框架结构

<<<<<<< HEAD
![项目架构](D:\LearningRecords\Grade4.1\Integrated Design\images\项目架构.jpg)
=======
![项目架构](https://user-images.githubusercontent.com/93770915/229750479-cb8c6ae1-199a-4e81-95cf-f7b40cace491.jpg)
>>>>>>> 322bb575580f59e84b5737e8195ba97f811233a3


1. assets中用于放置图片等静态资源；
2. components中用于放置所有页面通用的模块，目前的`Layout.vue`是所有页面的统一布局（上方栏+侧边导航栏）；
3. router中放置的是页面路由，在`index.js`中；
4. utils中放置与整个项目相关的方法，其中store.js用于跨页面记录整个项目的公共变量，之后还可能在该文件夹中放置整个项目的公共方法等文件；
5. views中是各个页面，命名尾部为Record的是与记录相关的页面。



PS：关于页面的整体UI风格尽可能简洁，如果页面出现窗口堆叠，其背景颜色尽可能由浅到深遵循以下标准：

<<<<<<< HEAD
![UI颜色](D:\LearningRecords\Grade4.1\Integrated Design\images\UI颜色.jpg)



## 项目流程与信息交换要求

![工单系统流程](D:\LearningRecords\Grade4.1\Integrated Design\images\工单系统流程.jpg)
=======

![UI颜色](https://user-images.githubusercontent.com/93770915/229750557-04912def-b3d3-451c-b262-91ee9f39554d.jpg)
>>>>>>> 322bb575580f59e84b5737e8195ba97f811233a3



## 项目相关链接

1. Element UI：https://element.eleme.cn/#/zh-CN
2. Vue2：https://v2.cn.vuejs.org/
3. Axios：https://www.axios-http.cn/
4. Vuex：https://vuex.vuejs.org/zh/guide/



## 项目任务分配

**张润东：前端，登录、账号认证、权限管理页面**

**张习之：后端，登录、账号认证、权限管理功能**

**李昊洋：前端，事件记录、操作记录页面**

**张嘉晖：后端，事件记录、操作记录功能**

**吴沛伦：测试，负责测试前后端页面与模块功能**
