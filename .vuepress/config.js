module.exports = {
    "title": "panther",
    "description": "",
    "dest": "public",
    "locales": {
        '/': {
            lang: 'zh-CN'
        }
    },
    "head": [
        [
            "link",
            {
                "rel": "icon",
                "href": "/favicon.ico"
            }
        ],
        [
            "meta",
            {
                "name": "viewport",
                "content": "width=device-width,initial-scale=1,user-scalable=no"
            }
        ],
    ],
    "theme": "reco",
    "themeConfig": {
        "mode": 'dark',
        "nav": [{
                "text": "主页",
                "link": "/",
                "icon": "reco-home"
            },
            {
                "text": "学习笔记",
                "icon": "reco-message",
                "items": [
                    { "text": "java基础", "link": "/docs/javaSE/bag" },
                    { "text": "javweb", "link": "/docs/javaweb/XML" },
                    { "text": "mysql", "link": "/docs/mysql/baseQuery" },
                    { "text": "JVM", "link": "/docs/JVM/ClassFile" },
                ]
            },
            {
                "text": "计算机基础",
                "icon": "reco-message",
                "items": [
                    { "text": "Linux", "link": "/docs/computer/Linux/linuxFire" },
                    { "text": "操作系统", "link": "/docs/computer/OperatingSys/cpu" },
                    { "text": "计算机网络", "link": "/docs/computer/computerNet/OSI" },
                    { "text": "汇编", "link": "/docs/computer/ASAM/ASAM" },
                ]
            },
            {
                "text": "Contact",
                "icon": "reco-message",
                "items": [{
                    "text": "GitHub",
                    "link": "https://github.com/panther",
                    "icon": "reco-github"
                }]
            }
        ],
        sidebar: require('./sidebarConf'),
        "type": "blog",
        "blogConfig": {
            "category": {
                "location": 2,
                "text": "没啥用的分类"
            },
            "tag": {
                "location": 3,
                "text": "无关紧要的小标签"
            }
        },
        "friendLink": [{
                "title": "午后南杂",
                "desc": "Enjoy when you can, and endure when you must.",
                "email": "1156743527@qq.com",
                "link": "https://www.recoluan.com"
            },
            {
                "title": "vuepress-theme-reco",
                "desc": "A simple and beautiful vuepress Blog & Doc theme.",
                "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
                "link": "https://vuepress-theme-reco.recoluan.com"
            }
        ],
        "logo": "/logo.png",
        subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
        "search": true,
        "searchMaxSuggestions": 10,
        "lastUpdated": "Last Updated",
        "author": "panther",
        "authorAvatar": "/avatar.png",
        "record": "一剑霜寒十四州",
        "startYear": "2022",
        // 评论
        valineConfig: {
            appId: '69hzynGvFc9GJB3F6fNDtwnQ-9Nh9j0Va', // your appId
            appKey: 'JTbkRTA4ci2TEXwOzEeQiYvS', // your appKey  
        }

    },
    "markdown": {
        "lineNumbers": true
    },
    plugins: [
        [
            //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
            "cursor-effects",
            {
                size: 3, // size of the particle, default: 2
                shape: 'circle', // shape of the particle, default: 'star'
                zIndex: 999999999 // z-index property of the canvas, default: 999999999
            }
        ],
        [
            //动态标题 先安装在配置， npm install vuepress-plugin-dynamic-title --save
            "dynamic-title",
            {
                showIcon: "/favicon.ico",
                showText: "(/≧▽≦/)",
                hideIcon: "/failure.ico",
                hideText: "失联中。。。",
                recoverTime: 2000
            }
        ],
        [
            //图片放大插件 先安装在配置， npm install vuepress-plugin-dynamic-title --save
            '@vuepress/plugin-medium-zoom', {
                selector: '.page img',
                delay: 1000,
                options: {
                    margin: 24,
                    background: 'rgba(25,18,25,0.9)',
                    scrollOffset: 40
                }
            }
        ],
        //vuepress复制粘贴提示npm install vuepress-plugin-nuggets-style-copy --save
        ["vuepress-plugin-nuggets-style-copy", {
            copyText: "复制代码",
            tip: {
                content: "复制成功!"
            }
        }],
        ["vuepress-reco/vuepress-plugin-loading-page"],
        ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
            title: '公告',
            body: [{
                    type: 'title',
                    content: '欢迎加我的QQ 🎉🎉🎉',
                    style: 'text-aligin: center;',
                },
                {
                    type: 'text',
                    content: '喜欢我的文章可以给我留言',
                    style: 'text-align: center;'
                },
                {
                    type: 'text',
                    content: '友链或疑问均可在留言板给我留言',
                    style: 'text-align: center;'
                }
            ],
        }],
        ["ribbon-animation", {
            size: 90, // 默认数据
            opacity: 0.3, //  透明度
            zIndex: -1, //  层级
            opt: {
                // 色带HSL饱和度
                colorSaturation: "80%",
                // 色带HSL亮度量
                colorBrightness: "60%",
                // 带状颜色不透明度
                colorAlpha: 0.65,
                // 在HSL颜色空间中循环显示颜色的速度有多快
                colorCycleSpeed: 6,
                // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
                verticalPosition: "center",
                // 到达屏幕另一侧的速度有多快
                horizontalSpeed: 200,
                // 在任何给定时间，屏幕上会保留多少条带
                ribbonCount: 2,
                // 添加笔划以及色带填充颜色
                strokeSize: 0,
                // 通过页面滚动上的因子垂直移动色带
                parallaxAmount: -0.5,
                // 随着时间的推移，为每个功能区添加动画效果
                animateSections: true
            },
            ribbonShow: false, //  点击彩带  true显示  false为不显示
            ribbonAnimationShow: true // 滑动彩带
        }],
        //动态标题
        ["dynamic-title", {
            showIcon: "https://www.zpzpup.com/assets/image/favicon.ico",
            showText: "欢迎回来 O(∩_∩)O~",
            hideIcon: "https://www.zpzpup.com/assets/image/favicon.ico",
            hideText: "失联中。。。",
            recoverTime: 2000
        }]

    ],


}