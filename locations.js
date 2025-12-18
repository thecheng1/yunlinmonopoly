const locations = [
    {
        id: 0,
        name: "起點 (Start)",
        type: "start",
        price: 0,
        rent: 0,
        group: "special",
        description: "領取薪水 $2000"
    },
    {
        id: 1,
        name: "北港遊客中心",
        type: "property",
        price: 600,
        rent: 20,
        group: "brown",
        description: "由水道頭文化園區改建，古色古香。"
    },
    {
        id: 2,
        name: "機會 (Chance)",
        type: "chance",
        price: 0,
        rent: 0,
        group: "special",
        description: "命運的安排..."
    },
    {
        id: 3,
        name: "西螺延平老街",
        type: "property",
        price: 600,
        rent: 40,
        group: "brown",
        description: "充滿巴洛克式建築的歷史街區。"
    },
    {
        id: 4,
        name: "所得稅 (Income Tax)",
        type: "tax",
        price: 0,
        rent: 200,
        group: "special",
        description: "繳納稅金 $200"
    },
    {
        id: 5,
        name: "虎尾鐵橋",
        type: "property",
        price: 2000,
        rent: 250,
        group: "station",
        description: "百年歷史的鐵道橋樑。"
    },
    {
        id: 6,
        name: "澄霖沉香味道森林館",
        type: "property",
        price: 1000,
        rent: 60,
        group: "light-blue",
        description: "日式庭園造景，沉香主題館。"
    },
    {
        id: 7,
        name: "命運 (Community Chest)",
        type: "chest",
        price: 0,
        rent: 0,
        group: "special",
        description: "社區的溫暖..."
    },
    {
        id: 8,
        name: "鵝媽媽鵝童樂園",
        type: "property",
        price: 1000,
        rent: 60,
        group: "light-blue",
        description: "親子同樂的鵝主題樂園。"
    },
    {
        id: 9,
        name: "雅聞峇里海岸",
        type: "property",
        price: 1200,
        rent: 80,
        group: "light-blue",
        description: "充滿南洋風情的度假勝地。"
    },
    {
        id: 10,
        name: "監獄 (Jail)",
        type: "jail",
        price: 0,
        rent: 0,
        group: "special",
        description: "探監或坐牢"
    },
    {
        id: 11,
        name: "桂林映象會館",
        type: "property",
        price: 1400,
        rent: 100,
        group: "pink",
        description: "泰式風情的休閒會館。"
    },
    {
        id: 12,
        name: "電力公司 (Electric Company)",
        type: "utility",
        price: 1500,
        rent: 75,
        group: "utility",
        description: "提供雲林電力。"
    },
    {
        id: 13,
        name: "三條崙海水浴場",
        type: "property",
        price: 1400,
        rent: 100,
        group: "pink",
        description: "海濱戲水與忘憂森林。"
    },
    {
        id: 14,
        name: "成龍濕地",
        type: "property",
        price: 1600,
        rent: 120,
        group: "pink",
        description: "國際環境藝術節舉辦地。"
    },
    {
        id: 15,
        name: "高鐵雲林站",
        type: "property",
        price: 2000,
        rent: 250,
        group: "station",
        description: "快速連接南北的交通樞紐。"
    },
    {
        id: 16,
        name: "埤頭繪本公園",
        type: "property",
        price: 1800,
        rent: 140,
        group: "orange",
        description: "立體繪本造景的童趣公園。"
    },
    {
        id: 17,
        name: "命運 (Community Chest)",
        type: "chest",
        price: 0,
        rent: 0,
        group: "special",
        description: "社區的溫暖..."
    },
    {
        id: 18,
        name: "摩爾花園",
        type: "property",
        price: 1800,
        rent: 140,
        group: "orange",
        description: "西班牙高第風格的城堡。"
    },
    {
        id: 19,
        name: "斗六太平老街",
        type: "property",
        price: 2000,
        rent: 160,
        group: "orange",
        description: "斗六最繁華的歷史街區。"
    },
    {
        id: 20,
        name: "免費停車 (Free Parking)",
        type: "parking",
        price: 0,
        rent: 0,
        group: "special",
        description: "休息一下，沒事發生。"
    },
    {
        id: 21,
        name: "古坑咖啡大道",
        type: "property",
        price: 2200,
        rent: 180,
        group: "red",
        description: "台灣咖啡的原鄉。"
    },
    {
        id: 22,
        name: "機會 (Chance)",
        type: "chance",
        price: 0,
        rent: 0,
        group: "special",
        description: "命運的安排..."
    },
    {
        id: 23,
        name: "雲林布袋戲館",
        type: "property",
        price: 2200,
        rent: 180,
        group: "red",
        description: "虎尾郡役所改建，布袋戲故鄉。"
    },
    {
        id: 24,
        name: "五年千歲公園",
        type: "property",
        price: 2400,
        rent: 200,
        group: "red",
        description: "全台最大的迷宮公園。"
    },
    {
        id: 25,
        name: "斗六火車站",
        type: "property",
        price: 2000,
        rent: 250,
        group: "station",
        description: "斗六的交通中心。"
    },
    {
        id: 26,
        name: "虎尾糖廠",
        type: "property",
        price: 2600,
        rent: 220,
        group: "yellow",
        description: "唯二仍在製糖的糖廠。"
    },
    {
        id: 27,
        name: "華山小天梯",
        type: "property",
        price: 2600,
        rent: 220,
        group: "yellow",
        description: "挑戰膽量的吊橋與美景。"
    },
    {
        id: 28,
        name: "自來水廠 (Water Works)",
        type: "utility",
        price: 1500,
        rent: 75,
        group: "utility",
        description: "提供雲林水源。"
    },
    {
        id: 29,
        name: "雲嶺之丘",
        type: "property",
        price: 2800,
        rent: 240,
        group: "yellow",
        description: "跨越三縣市的絕美視野。"
    },
    {
        id: 30,
        name: "入獄 (Go to Jail)",
        type: "go_to_jail",
        price: 0,
        rent: 0,
        group: "special",
        description: "直接入獄，不經過起點。"
    },
    {
        id: 31,
        name: "興隆毛巾觀光工廠",
        type: "property",
        price: 3000,
        rent: 260,
        group: "green",
        description: "造型毛巾的創意發源地。"
    },
    {
        id: 32,
        name: "千巧谷牛樂園牧場",
        type: "property",
        price: 3000,
        rent: 260,
        group: "green",
        description: "崙背酪農區的快樂牧場。"
    },
    {
        id: 33,
        name: "命運 (Community Chest)",
        type: "chest",
        price: 0,
        rent: 0,
        group: "special",
        description: "社區的溫暖..."
    },
    {
        id: 34,
        name: "劍湖山世界",
        type: "property",
        price: 3200,
        rent: 280,
        group: "green",
        description: "摩天輪與G5的刺激體驗。"
    },
    {
        id: 35,
        name: "西螺大橋",
        type: "property",
        price: 2000,
        rent: 250,
        group: "station",
        description: "昔日遠東第一大橋。"
    },
    {
        id: 36,
        name: "機會 (Chance)",
        type: "chance",
        price: 0,
        rent: 0,
        group: "special",
        description: "命運的安排..."
    },
    {
        id: 37,
        name: "北港朝天宮",
        type: "property",
        price: 3500,
        rent: 350,
        group: "dark-blue",
        description: "媽祖信仰總本山，香火鼎盛。"
    },
    {
        id: 38,
        name: "奢侈稅 (Luxury Tax)",
        type: "tax",
        price: 0,
        rent: 100,
        group: "special",
        description: "繳納稅金 $100"
    },
    {
        id: 39,
        name: "雲林縣政府",
        type: "property",
        price: 4000,
        rent: 500,
        group: "dark-blue",
        description: "雲林的行政中心。"
    }
];
