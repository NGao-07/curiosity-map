// js/data.js
const curiositiesData = [
    {
        id: "beijing_gugong", // 唯一ID，方便管理
        lat: 39.9042,
        lng: 116.4074,
        title: "北京故宫的神秘传说",
        category: "历史", // 分类
        tags: ["北京", "故宫", "传说", "宫廷"], // 关键词标签，用于搜索
        description: "故宫，旧称紫禁城，是中国明清两代的皇家宫殿，这里流传着许多不为人知的宫闱秘事和传说。",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Forbidden_City_Beijing_Shenwumen_Gate_2013_PD.jpg/640px-Forbidden_City_Beijing_Shenwumen_Gate_2013_PD.jpg",
        douyinLink: "https://www.douyin.com/your_video_id_1"
    },
    {
        id: "shanghai_waitan",
        lat: 31.2304,
        lng: 121.4737,
        title: "上海外滩的百年变迁",
        category: "历史",
        tags: ["上海", "外滩", "建筑", "近代史"],
        description: "外滩是上海的标志性景点，见证了这座城市的沧桑巨变，每一栋建筑背后都有着独特的故事。",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/The_Bund_2019_01.jpg/640px-The_Bund_2019_01.jpg",
        douyinLink: "https://www.douyin.com/your_video_id_2"
    },
    {
        id: "xian_bingmayong",
        lat: 34.3853,
        lng: 109.2792,
        title: "西安兵马俑的未解之谜",
        category: "神秘",
        tags: ["西安", "兵马俑", "考古", "秦始皇"],
        description: "秦始皇兵马俑是世界第八大奇迹，规模宏大，但仍有许多未解之谜等待探索。",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Terracotta_Warriors_xian.jpg/640px-Terracotta_Warriors_xian.jpg",
        douyinLink: "https://www.douyin.com/your_video_id_3"
    },
    {
        id: "chengdu_panda",
        lat: 30.6590,
        lng: 104.0660, // 大概位置，可以更精确
        title: "成都大熊猫的搞笑日常",
        category: "搞笑",
        tags: ["成都", "熊猫", "动物", "可爱"],
        description: "成都大熊猫繁育研究基地是观赏国宝的最佳去处，熊猫们的日常憨态可掬，趣事不断。",
        // imageUrl: "your_panda_image.jpg",
        douyinLink: "https://www.douyin.com/your_video_id_4"
    }
    // ... 更多数据
];

// 提取所有不重复的分类用于筛选器
const allCategories = [...new Set(curiositiesData.map(item => item.category))];