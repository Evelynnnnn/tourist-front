import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/home',
                    component: ()=> import( '../components/page/home'),
                    meta: {title: '测试'}
                },
                {
                    path:'/test',
                    component: () => import( '../components/page/tourist/settings/NumberWarning')
                },
                // {
                //     path:'/userManage',
                //     component: () => import( '../components/page/tourist/manage/UserManage'),
                //     meta: {title: '人员管理'}
                // },
                // {
                //     path: '/icon',
                //     component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                //     meta: { title: '自定义图标' }
                // },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/tourist/manage/LoginRecord.vue'),
                    meta: { title: '登录记录' }
                },
                {
                    path: '/sendTopic',
                    component: () => import( '../components/page/tourist/manage/SendTopic'),
                    meta: { title: '下发通知'}
                },
                {
                    path: '/numberWarningSetting',
                    component: () => import( '../components/page/tourist/settings/NumberWarningSetting'),
                    meta: { title: '人数预警设置'}
                },
                {
                    path: '/numberWarning',
                    component: () => import( '../components/page/tourist/settings/NumberWarning'),
                    meta: { title: '人数预警查看'}
                },
                // {
                //     path: '/tabs',
                //     component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                //     meta: { title: 'tab选项卡' }
                // },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                //     meta: { title: '富文本编辑器' }
                // },
                // {
                //     // markdown组件
                //     path: '/markdown',
                //     component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                //     meta: { title: 'markdown编辑器' }
                // },
                // {
                //     // 图片上传组件
                //     path: '/upload',
                //     component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                //     meta: { title: '文件上传' }
                // },
                // {
                //     // vue-schart组件
                //     path: '/charts',
                //     component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                //     meta: { title: 'schart图表' }
                // },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                //     meta: { title: '拖拽列表' }
                // },
                // {
                //     // 拖拽Dialog组件
                //     path: '/dialog',
                //     component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                //     meta: { title: '拖拽弹框' }
                // },
                // {
                //     // 国际化组件
                //     path: '/i18n',
                //     component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                //     meta: { title: '国际化' }
                // },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/tourist/manage/Permission.vue'),
                    meta: { title: '人员管理', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/dayPersonNum',
                    component: () => import( '../components/page/tourist/DayPersonNum'),
                    meta: { title: '按日查看'}
                },
                {
                    path: '/moreDayPersonNum',
                    component: () => import( '../components/page/tourist/MoreDayPersonNum'),
                    meta: { title: '多日查看' }
                },
                {
                    path: '/weekPersonNum',
                    component: () => import( '../components/page/tourist/WeekPersonNum'),
                    meta: { title: '按周查看' }
                },
                {
                    path: '/monthPersonNum',
                    component: () => import( '../components/page/tourist/MonthPersonNum'),
                    meta: { title: '按月查看' }
                },
                {
                    path: '/tomorrowPersonNum',
                    component: () => import( '../components/page/tourist/TomorrowPersonNum'),
                    meta: { title: '明日人数预计'}
                }
                // {
                //     path: '/personNumPie',
                //     component: () => import( '../components/page/tourist/WeekPersonNum'),
                //     meta: { title: '人数时间饼图' }
                // }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
