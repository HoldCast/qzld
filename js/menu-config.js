var homeMenu = [
    {
        name: '门户首页',                //名称
        type: '',
        icon: 'fa-home' ,           //图标样式
        children: []                //子目录
    },
    {
        name: '接处警',
        type: '',
        icon: 'fa-bar-chart-o' ,
        children: []
    },
    {
        name: '重大警情',
        icon: 'fa-sitemap',
        children: [
            {name: '情指联动',type: 'qzld'},
            {name: '任务受令',type: 'qzld2'}
        ]
    },
    {
        name: '图上指挥',
        icon: 'fa-users',
        children: []
    },
    {
        name: '综合通信',
        icon: 'fa-th',
        children: []
    },
    {
        name: '情务管理',
        icon: 'fa-tasks',
        children: []
    }
];