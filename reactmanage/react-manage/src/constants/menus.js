export const menus = [
    { key: '/app/dashboard/index', title: '首页', icon: 'mobile', },
    {
        key: '/app/table', title: '表格', icon: 'copy',
        sub: [
            { key: '/app/table/basicTable', title: '心愿单管理', icon: '', },
            { key: '/app/table/userlistTable', title: '用户管理', icon: '', },
            { key: '/app/table/goodsTable', title: '商品管理', icon: '', },
        ],
    },
    {
        key: '/sub4', title: '页面', icon: 'switcher',
        sub: [
            { key: '/login', title: '登录', icon: '', },
            { key: '/404', title: '404', icon: '', },
        ],
    }
];