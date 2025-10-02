// 农场基础数据配置
const farmData = {
    money: 666666,
    day: 1,
    experience: 0,
    level: 1,
    weather: 'sunny',
    weather_forecast: [],
    weather_accuracy: {
        total: 0,
        correct: 0
    },
    disaster_cooldown: 0,
    plots: Array(12).fill().map(() => ({
        plant: null,
        growth: 0,
        watered: false,
        weeds: false,
        pests: false,
        fertilized: false,
        health: 100,
        tilled: false
    })),
    seeds: {
        carrot: { name: '胡萝卜', price: 10, grow_time: 3, value: 20, exp: 5, icon: '🥕' },
        wheat: { name: '小麦', price: 15, grow_time: 4, value: 30, exp: 7, icon: '🌾' },
        tomato: { name: '番茄', price: 20, grow_time: 5, value: 45, exp: 10, icon: '🍅' },
        strawberry: { name: '草莓', price: 25, grow_time: 4, value: 50, exp: 12, icon: '🍓' },
        corn: { name: '玉米', price: 30, grow_time: 6, value: 70, exp: 15, icon: '🌽' }
    },
    inventory: {
        water: 10,
        herbicide: 3,
        pesticide: 3,
        fertilizer: 2,
        dog_food: 5,
        dog_medicine: 2,
        dog_vitamin: 1
    },
    prices: {
        water: 2,
        herbicide: 8,
        pesticide: 10,
        fertilizer: 15,
        dog_food: 8,
        dog_medicine: 20,
        dog_vitamin: 30
    },
    stats: {
        harvests: 0,
        water_used: 0,
        weeds_removed: 0,
        pests_eliminated: 0,
        fertilizer_used: 0,
        tilling_count: 0,
        thefts_prevented: 0,
        thefts_suffered: 0,
        dogs_owned: 0,
        dogs_passed: 0,
        disasters: 0
    },
    unlocked: {
        fertilizer: true,
        corn: false,
        dog: false
    },
    dog_breeds: {
        corgi: {
            name: '柯基犬',
            price: 150,
            base_prevention: 45,
            max_age: 3650,
            happiness_decay: 4,
            hunger_decay: 12,
            energy_regen: 35,
            injury_chance: 15,
            death_chance: 5,
            fertilizer_bonus: 5,
            icon: '🐕'
        },
        german_shepherd: {
            name: '德国牧羊犬',
            price: 300,
            base_prevention: 65,
            max_age: 3285,
            happiness_decay: 3,
            hunger_decay: 10,
            energy_regen: 40,
            injury_chance: 10,
            death_chance: 3,
            fertilizer_bonus: 3,
            icon: '🐺'
        },
        golden_retriever: {
            name: '金毛寻回犬',
            price: 250,
            base_prevention: 55,
            max_age: 4015,
            happiness_decay: 2,
            hunger_decay: 11,
            energy_regen: 30,
            injury_chance: 12,
            death_chance: 4,
            fertilizer_bonus: 8,
            icon: '🐕'
        },
        shiba: {
            name: '柴犬',
            price: 200,
            base_prevention: 50,
            max_age: 4380,
            happiness_decay: 5,
            hunger_decay: 13,
            energy_regen: 25,
            injury_chance: 18,
            death_chance: 6,
            fertilizer_bonus: 4,
            icon: '🦊'
        }
    },
    dog: {
        owned: false,
        breed: null,
        name: '旺财',
        age: 0,
        happiness: 100,
        hunger: 100,
        energy: 100,
        health: 100,
        level: 1,
        experience: 0,
        injury: 0,
        days_injured: 0
    },
    messages: []
};

// 等级所需经验值
const levelRequirements = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500];

// 天气图标映射
const weatherIcons = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    stormy: '⛈️',
    snowy: '❄️'
};

// 天气中文名称映射
const weatherNames = {
    sunny: '晴天',
    cloudy: '多云',
    rainy: '雨天',
    stormy: '暴风雨',
    snowy: '下雪'
};

// 生成未来3天的天气预报
function generateWeatherForecast() {
    const weatherTypes = ['sunny', 'cloudy', 'rainy', 'stormy', 'snowy'];
    const weights = [40, 30, 20, 5, 5];
    const forecast = [];
    
    while (forecast.length < 3) {
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        const random = Math.floor(Math.random() * totalWeight) + 1;
        let currentWeight = 0;
        
        for (let i = 0; i < weatherTypes.length; i++) {
            currentWeight += weights[i];
            if (random <= currentWeight) {
                forecast.push(weatherTypes[i]);
                break;
            }
        }
    }
    
    return forecast;
}

// 添加消息到消息队列
function addMessage(text, type = 'info') {
    farmData.messages.push({
        text,
        type,
        time: new Date().getTime()
    });
    
    // 只保留最近15条消息
    if (farmData.messages.length > 15) {
        farmData.messages.shift();
    }
    
    updateMessages();
}

// 更新消息显示
function updateMessages() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    
    farmData.messages.forEach(msg => {
        const msgElement = document.createElement('div');
        msgElement.className = `message ${msg.type}`;
        msgElement.textContent = msg.text;
        messagesContainer.appendChild(msgElement);
    });
    
    // 滚动到底部
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 更新地块显示
function updatePlots() {
    const plotsContainer = document.getElementById('farmPlots');
    plotsContainer.innerHTML = '';
    
    farmData.plots.forEach((plot, index) => {
        const plotElement = document.createElement('div');
        plotElement.className = `plot ${plot.tilled ? 'tilled' : ''}`;
        
        let plotContent = `<h4>地块 ${index + 1}</h4>`;
        
        if (plot.plant) {
            const seed = farmData.seeds[plot.plant];
            plotContent += `<p>${seed.icon} ${seed.name}</p>`;
            plotContent += `<p>生长: ${Math.round(plot.growth)}/${seed.grow_time}</p>`;
            plotContent += `<p>健康: ${plot.health}%</p>`;
            
            if (plot.weeds) plotContent += '<p>🌿 有杂草</p>';
            if (plot.pests) plotContent += '<p>🐛 有害虫</p>';
            if (plot.fertilized) plotContent += '<p>💩 已施肥</p>';
            if (plot.watered) plotContent += '<p>💧 已浇水</p>';
        } else if (plot.tilled) {
            plotContent += '<p>已锄地，可种植</p>';
        } else {
            plotContent += '<p>未锄地</p>';
        }
        
        // 地块操作按钮
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'plot-actions';
        
        // 锄地按钮
        if (!plot.tilled && !plot.plant) {
            const tillBtn = document.createElement('button');
            tillBtn.className = 'btn btn-small';
            tillBtn.textContent = '锄地';
            tillBtn.onclick = () => tillPlot(index);
            actionsDiv.appendChild(tillBtn);
        }
        
        // 种植按钮
        if (plot.tilled && !plot.plant) {
            const plantSelect = document.createElement('select');
            plantSelect.className = 'btn btn-small';
            plantSelect.onchange = (e) => {
                if (e.target.value) plantSeed(index, e.target.value);
            };
            
            plantSelect.innerHTML = '<option value="">种植...</option>';
            Object.keys(farmData.seeds).forEach(seedType => {
                if (seedType !== 'corn' || farmData.unlocked.corn) {
                    const seed = farmData.seeds[seedType];
                    plantSelect.innerHTML += `<option value="${seedType}">${seed.icon} ${seed.name} (${seed.price}g)</option>`;
                }
            });
            
            actionsDiv.appendChild(plantSelect);
        }
        
        // 浇水按钮
        if (plot.plant && !plot.watered && farmData.inventory.water > 0) {
            const waterBtn = document.createElement('button');
            waterBtn.className = 'btn btn-small';
            waterBtn.textContent = '浇水';
            waterBtn.onclick = () => waterPlot(index);
            actionsDiv.appendChild(waterBtn);
        }
        
        // 施肥按钮
        if (plot.plant && !plot.fertilized && farmData.inventory.fertilizer > 0) {
            const fertilizeBtn = document.createElement('button');
            fertilizeBtn.className = 'btn btn-small';
            fertilizeBtn.textContent = '施肥';
            fertilizeBtn.onclick = () => fertilizePlot(index);
            actionsDiv.appendChild(fertilizeBtn);
        }
        
        // 除草按钮
        if (plot.plant && plot.weeds && farmData.inventory.herbicide > 0) {
            const weedBtn = document.createElement('button');
            weedBtn.className = 'btn btn-small';
            weedBtn.textContent = '除草';
            weedBtn.onclick = () => removeWeeds(index);
            actionsDiv.appendChild(weedBtn);
        }
        
        // 除虫按钮
        if (plot.plant && plot.pests && farmData.inventory.pesticide > 0) {
            const pestBtn = document.createElement('button');
            pestBtn.className = 'btn btn-small';
            pestBtn.textContent = '除虫';
            pestBtn.onclick = () => removePests(index);
            actionsDiv.appendChild(pestBtn);
        }
        
        // 收获按钮
        if (plot.plant && plot.growth >= farmData.seeds[plot.plant].grow_time) {
            const harvestBtn = document.createElement('button');
            harvestBtn.className = 'btn btn-small';
            harvestBtn.textContent = '收获';
            harvestBtn.onclick = () => harvestPlot(index);
            actionsDiv.appendChild(harvestBtn);
        }
        
        plotElement.innerHTML += plotContent;
        plotElement.appendChild(actionsDiv);
        plotsContainer.appendChild(plotElement);
    });
}

// 更新天气预报显示
function updateWeatherForecast() {
    const forecastContainer = document.getElementById('weatherForecast');
    forecastContainer.innerHTML = '';
    
    // 当前天气
    document.getElementById('current-weather').textContent = 
        `${weatherIcons[farmData.weather]} ${weatherNames[farmData.weather]}`;
    
    // 未来天气预报
    farmData.weather_forecast.forEach((weather, index) => {
        const dayElement = document.createElement('div');
        dayElement.className = 'weather-day';
        dayElement.innerHTML = `
            <div>${index + 1}天后</div>
            <div>${weatherIcons[weather]}</div>
            <div>${weatherNames[weather]}</div>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

// 更新商店显示
function updateShop() {
    const shopContainer = document.getElementById('shopList');
    shopContainer.innerHTML = '';
    
    const items = {
        water: { icon: '💧', name: '水' },
        herbicide: { icon: '🌿', name: '除草剂' },
        pesticide: { icon: '🐛', name: '杀虫剂' },
        fertilizer: { icon: '💩', name: '肥料' },
        dog_food: { icon: '🍖', name: '狗粮' },
        dog_medicine: { icon: '💊', name: '狗药' },
        dog_vitamin: { icon: '💊', name: '狗维生素' }
    };
    
    Object.keys(items).forEach(itemType => {
        const item = items[itemType];
        const itemElement = document.createElement('div');
        itemElement.className = 'shop-item';
        itemElement.innerHTML = `
            <span>${item.icon} ${item.name}</span>
            <button class="btn btn-small" onclick="buyItem('${itemType}')">
                购买 (${farmData.prices[itemType]}g)
            </button>
        `;
        shopContainer.appendChild(itemElement);
    });
}

// 更新物品栏显示
function updateInventory() {
    const inventoryContainer = document.getElementById('inventoryList');
    inventoryContainer.innerHTML = '';
    
    const items = {
        water: { icon: '💧', name: '水' },
        herbicide: { icon: '🌿', name: '除草剂' },
        pesticide: { icon: '🐛', name: '杀虫剂' },
        fertilizer: { icon: '💩', name: '肥料' },
        dog_food: { icon: '🍖', name: '狗粮' },
        dog_medicine: { icon: '💊', name: '狗药' },
        dog_vitamin: { icon: '💊', name: '狗维生素' }
    };
    
    Object.keys(items).forEach(itemType => {
        const item = items[itemType];
        const itemElement = document.createElement('div');
        itemElement.className = 'inventory-item';
        itemElement.innerHTML = `
            <span>${item.icon} ${item.name}</span>
            <span>${farmData.inventory[itemType]}</span>
        `;
        inventoryContainer.appendChild(itemElement);
    });
}

// 更新狗狗商店显示
function updateDogShop() {
    const dogBreedsContainer = document.getElementById('dogBreeds');
    dogBreedsContainer.innerHTML = '';
    
    if (!farmData.unlocked.dog) {
        dogBreedsContainer.innerHTML = '<p>等级2可解锁狗狗功能</p>';
        return;
    }
    
    if (farmData.dog.owned) {
        dogBreedsContainer.innerHTML = '<p>你已经拥有一只狗狗了</p>';
        return;
    }
    
    Object.keys(farmData.dog_breeds).forEach(breed => {
        const dog = farmData.dog_breeds[breed];
        const breedElement = document.createElement('div');
        breedElement.className = 'dog-breed';
        breedElement.innerHTML = `
            <span>${dog.icon} ${dog.name}</span>
            <button class="btn btn-small" onclick="buyDog('${breed}')">
                购买 (${dog.price}g)
            </button>
        `;
        dogBreedsContainer.appendChild(breedElement);
    });
}

// 更新狗狗状态显示
function updateDogStatus() {
    const dogStatusContainer = document.getElementById('dogStatus');
    const dogActionsContainer = document.getElementById('dogActions');
    
    if (!farmData.dog.owned) {
        dogStatusContainer.innerHTML = '<p>尚未拥有狗狗</p>';
        dogActionsContainer.style.display = 'none';
        return;
    }
    
    const breed = farmData.dog_breeds[farmData.dog.breed];
    dogStatusContainer.innerHTML = `
        <h4>${breed.icon} ${farmData.dog.name} (等级 ${farmData.dog.level})</h4>
        <p>年龄: ${farmData.dog.age} 天</p>
        <p>快乐度: ${farmData.dog.happiness}%</p>
        <div class="progress-bar">
            <div class="progress happiness" style="width: ${farmData.dog.happiness}%"></div>
        </div>
        <p>饥饿度: ${farmData.dog.hunger}%</p>
        <div class="progress-bar">
            <div class="progress hunger" style="width: ${farmData.dog.hunger}%"></div>
        </div>
        <p>健康度: ${farmData.dog.health}%</p>
        <div class="progress-bar">
            <div class="progress health" style="width: ${farmData.dog.health}%"></div>
        </div>
        ${farmData.dog.injury > 0 ? `<p>受伤程度: ${farmData.dog.injury}%</p>` : ''}
    `;
    
    dogActionsContainer.style.display = 'flex';
    dogActionsContainer.style.gap = '5px';
    dogActionsContainer.style.flexWrap = 'wrap';
}

// 更新统计信息
function updateStats() {
    document.getElementById('day').textContent = farmData.day;
    document.getElementById('money').textContent = farmData.money;
    document.getElementById('level').textContent = farmData.level;
    document.getElementById('experience').textContent = farmData.experience;
    
    // 更新下一级所需经验
    const nextLevel = farmData.level < levelRequirements.length 
        ? levelRequirements[farmData.level] 
        : levelRequirements[levelRequirements.length - 1];
    document.getElementById('nextLevel').textContent = nextLevel;
}

// 检查升级
function checkLevelUp() {
    let newLevel = farmData.level;
    
    while (newLevel < levelRequirements.length && farmData.experience >= levelRequirements[newLevel]) {
        newLevel++;
    }
    
    if (newLevel > farmData.level) {
        farmData.level = newLevel;
        addMessage(`🎉 恭喜升级到 ${farmData.level} 级！`, 'success');
        
        // 升级奖励
        const moneyReward = farmData.level * 50;
        farmData.money += moneyReward;
        addMessage(`💰 获得升级奖励 ${moneyReward} 金币！`, 'success');
        
        // 解锁新功能
        if (farmData.level >= 2 && !farmData.unlocked.dog) {
            farmData.unlocked.dog = true;
            addMessage('🐕 已解锁看门狗功能！可以去狗狗商店购买。', 'success');
            updateDogShop();
        }
        
        if (farmData.level >= 3 && !farmData.unlocked.corn) {
            farmData.unlocked.corn = true;
            addMessage('🌽 已解锁新作物：玉米！', 'success');
        }
    }
}

// 地块操作函数
function tillPlot(index) {
    if (!farmData.plots[index].tilled) {
        farmData.plots[index].tilled = true;
        farmData.stats.tilling_count++;
        farmData.experience += 2;
        addMessage(`🌱 已锄地地块 ${index + 1}`, 'info');
        checkLevelUp();
        updatePlots();
        updateStats();
        saveGame();
    }
}

function plantSeed(index, seedType) {
    const seed = farmData.seeds[seedType];
    if (farmData.plots[index].plant === null && 
        farmData.plots[index].tilled &&
        farmData.money >= seed.price) {
        
        farmData.plots[index].plant = seedType;
        farmData.plots[index].growth = 0;
        farmData.plots[index].watered = false;
        farmData.plots[index].weeds = false;
        farmData.plots[index].pests = false;
        farmData.plots[index].fertilized = false;
        farmData.plots[index].health = 100;
        farmData.money -= seed.price;
        
        addMessage(`🌱 已在地块 ${index + 1} 种植${seed.name}`, 'info');
        updatePlots();
        updateStats();
        saveGame();
    }
}

function waterPlot(index) {
    if (farmData.plots[index].plant !== null && 
        !farmData.plots[index].watered && 
        farmData.inventory.water > 0) {
        
        farmData.plots[index].watered = true;
        farmData.inventory.water--;
        farmData.stats.water_used++;
        farmData.experience += 1;
        
        const healthIncrease = Math.floor(Math.random() * 6) + 5; // 5-10
        farmData.plots[index].health = Math.min(100, farmData.plots[index].health + healthIncrease);
        
        addMessage(`💧 已给地块 ${index + 1} 浇水，健康度+${healthIncrease}`, 'info');
        checkLevelUp();
        updatePlots();
        updateInventory();
        updateStats();
        saveGame();
    }
}

function fertilizePlot(index) {
    if (farmData.plots[index].plant !== null && 
        !farmData.plots[index].fertilized && 
        farmData.inventory.fertilizer > 0) {
        
        farmData.plots[index].fertilized = true;
        farmData.inventory.fertilizer--;
        farmData.stats.fertilizer_used++;
        farmData.experience += 3;
        
        const healthIncrease = Math.floor(Math.random() * 6) + 10; // 10-15
        farmData.plots[index].health = Math.min(100, farmData.plots[index].health + healthIncrease);
        
        addMessage(`💩 已给地块 ${index + 1} 施肥，健康度+${healthIncrease}`, 'info');
        checkLevelUp();
        updatePlots();
        updateInventory();
        updateStats();
        saveGame();
    }
}

function removeWeeds(index) {
    if (farmData.plots[index].weeds && farmData.inventory.herbicide > 0) {
        farmData.plots[index].weeds = false;
        farmData.inventory.herbicide--;
        farmData.stats.weeds_removed++;
        farmData.experience += 2;
        
        const healthIncrease = Math.floor(Math.random() * 5) + 8; // 8-12
        farmData.plots[index].health = Math.min(100, farmData.plots[index].health + healthIncrease);
        
        addMessage(`🌿 已清除地块 ${index + 1} 杂草，健康度+${healthIncrease}`, 'info');
        checkLevelUp();
        updatePlots();
        updateInventory();
        updateStats();
        saveGame();
    }
}

function removePests(index) {
    if (farmData.plots[index].pests && farmData.inventory.pesticide > 0) {
        farmData.plots[index].pests = false;
        farmData.inventory.pesticide--;
        farmData.stats.pests_eliminated++;
        farmData.experience += 3;
        
        const healthIncrease = Math.floor(Math.random() * 5) + 8; // 8-12
        farmData.plots[index].health = Math.min(100, farmData.plots[index].health + healthIncrease);
        
        addMessage(`🐛 已清除地块 ${index + 1} 害虫，健康度+${healthIncrease}`, 'info');
        checkLevelUp();
        updatePlots();
        updateInventory();
        updateStats();
        saveGame();
    }
}

function harvestPlot(index) {
    const plant = farmData.plots[index].plant;
    if (plant !== null && farmData.plots[index].growth >= farmData.seeds[plant].grow_time) {
        const seed = farmData.seeds[plant];
        const healthMultiplier = farmData.plots[index].health / 100;
        let value = seed.value * healthMultiplier;
        
        if (farmData.plots[index].fertilized) {
            value *= 1.5;
        }
        
        // 狗狗肥料加成
        if (farmData.dog.owned) {
            const breed = farmData.dog_breeds[farmData.dog.breed];
            value *= (1 + breed.fertilizer_bonus / 100);
        }
        
        value = Math.round(value);
        
        farmData.money += value;
        farmData.experience += seed.exp;
        farmData.plots[index].plant = null;
        farmData.plots[index].growth = 0;
        farmData.plots[index].watered = false;
        farmData.plots[index].weeds = false;
        farmData.plots[index].pests = false;
        farmData.plots[index].fertilized = false;
        farmData.plots[index].tilled = false;
        farmData.stats.harvests++;
        
        addMessage(`🎉 收获了${seed.name}，获得 ${value} 金币！`, 'success');
        checkLevelUp();
        updatePlots();
        updateStats();
        saveGame();
    }
}

// 商店购买函数
function buyItem(itemType) {
    if (farmData.money >= farmData.prices[itemType]) {
        farmData.inventory[itemType]++;
        farmData.money -= farmData.prices[itemType];
        addMessage(`🛒 购买了${getItemName(itemType)}`, 'info');
        updateInventory();
        updateStats();
        saveGame();
    } else {
        addMessage('💸 金币不足，无法购买', 'warning');
    }
}

function getItemName(itemType) {
    const itemNames = {
        water: '水',
        herbicide: '除草剂',
        pesticide: '杀虫剂',
        fertilizer: '肥料',
        dog_food: '狗粮',
        dog_medicine: '狗药',
        dog_vitamin: '狗维生素'
    };
    return itemNames[itemType] || itemType;
}

// 狗狗相关函数
function buyDog(breed) {
    if (!farmData.unlocked.dog || farmData.dog.owned) return;
    
    const dog = farmData.dog_breeds[breed];
    if (farmData.money >= dog.price) {
        farmData.dog.owned = true;
        farmData.dog.breed = breed;
        farmData.dog.name = dog.name;
        farmData.money -= dog.price;
        farmData.stats.dogs_owned++;
        
        addMessage(`🐕 购买了${dog.name}！`, 'success');
        updateDogShop();
        updateDogStatus();
        updateStats();
        saveGame();
    } else {
        addMessage('💸 金币不足，无法购买狗狗', 'warning');
    }
}

function feedDog() {
    if (farmData.dog.owned && farmData.inventory.dog_food > 0) {
        farmData.inventory.dog_food--;
        farmData.dog.hunger = Math.min(100, farmData.dog.hunger + 30);
        farmData.dog.happiness = Math.min(100, farmData.dog.happiness + 10);
        
        if (farmData.dog.injury > 0) {
            farmData.dog.injury = Math.max(0, farmData.dog.injury - 5);
        }
        
        addMessage(`🍖 喂了${farmData.dog.name}，它很开心！`, 'info');
        updateDogStatus();
        updateInventory();
        saveGame();
    }
}

function giveMedicine() {
    if (farmData.dog.owned && farmData.inventory.dog_medicine > 0 && farmData.dog.injury > 0) {
        farmData.inventory.dog_medicine--;
        farmData.dog.injury = Math.max(0, farmData.dog.injury - 40);
        addMessage(`💊 给${farmData.dog.name}吃了药，伤势好转了！`, 'info');
        updateDogStatus();
        updateInventory();
        saveGame();
    }
}

function giveVitamin() {
    if (farmData.dog.owned && farmData.inventory.dog_vitamin > 0) {
        farmData.inventory.dog_vitamin--;
        farmData.dog.health = Math.min(100, farmData.dog.health + 20);
        farmData.dog.happiness = Math.min(100, farmData.dog.happiness + 15);
        addMessage(`💊 给${farmData.dog.name}吃了维生素，健康状况改善了！`, 'info');
        updateDogStatus();
        updateInventory();
        saveGame();
    }
}

function playWithDog() {
    if (farmData.dog.owned && farmData.dog.energy > 30 && farmData.dog.injury < 50) {
        farmData.dog.energy -= 20;
        farmData.dog.happiness = Math.min(100, farmData.dog.happiness + 15);
        farmData.dog.experience += 5;
        
        // 狗狗升级检查
        if (farmData.dog.experience >= farmData.dog.level * 50) {
            farmData.dog.level++;
            farmData.dog.experience = 0;
            addMessage(`🐾 ${farmData.dog.name}升级到${farmData.dog.level}级了！`, 'success');
        }
        
        addMessage(`🎾 和${farmData.dog.name}玩得很开心！`, 'info');
        updateDogStatus();
        saveGame();
    }
}

// 处理下一天
function nextDay() {
    farmData.day++;
    
    // 更新天气预报准确性
    farmData.weather_accuracy.total++;
    if (farmData.weather_forecast[0] === farmData.weather) {
        farmData.weather_accuracy.correct++;
    }
    
    // 更新天气
    farmData.weather = farmData.weather_forecast.shift();
    farmData.weather_forecast.push(generateWeatherForecast()[0]);
    
    // 计算天气预报准确率
    const accuracy = farmData.weather_accuracy.total > 0 
        ? Math.round((farmData.weather_accuracy.correct / farmData.weather_accuracy.total) * 100) 
        : 0;
    addMessage(`📊 天气预报准确率：${accuracy}%`, 'info');
    
    // 减少自然灾害冷却时间
    if (farmData.disaster_cooldown > 0) {
        farmData.disaster_cooldown--;
    }
    
    // 检查是否发生自然灾害 (5%几率)
    if (farmData.disaster_cooldown === 0 && Math.random() <= 0.05) {
        const disasterType = Math.floor(Math.random() * 3) + 1;
        
        if (disasterType === 1) {
            // 蝗虫灾害
            let destroyedPlots = 0;
            farmData.plots.forEach((plot, index) => {
                if (plot.plant !== null) {
                    farmData.plots[index] = {
                        plant: null,
                        growth: 0,
                        watered: false,
                        weeds: false,
                        pests: false,
                        fertilized: false,
                        health: 100,
                        tilled: false
                    };
                    destroyedPlots++;
                }
            });
            
            farmData.disaster_cooldown = 10;
            farmData.stats.disasters++;
            addMessage(`🦗 蝗虫灾害！${destroyedPlots}块田地的作物被吃光了！`, 'danger');
        } else if (disasterType === 2) {
            // 干旱灾害
            farmData.plots.forEach((plot, index) => {
                if (plot.plant !== null) {
                    farmData.plots[index].health = Math.max(0, plot.health - 30);
                }
            });
            
            farmData.disaster_cooldown = 8;
            farmData.stats.disasters++;
            addMessage('🌵 干旱灾害！所有作物的健康度下降了30%！', 'danger');
        } else if (disasterType === 3) {
            // 暴雨灾害
            farmData.plots.forEach((plot, index) => {
                if (plot.plant !== null && Math.random() <= 0.4) {
                    farmData.plots[index] = {
                        plant: null,
                        growth: 0,
                        watered: false,
                        weeds: false,
                        pests: false,
                        fertilized: false,
                        health: 100,
                        tilled: false
                    };
                }
            });
            
            farmData.disaster_cooldown = 12;
            farmData.stats.disasters++;
            addMessage('⛈️ 暴雨灾害！部分作物被洪水冲走了！', 'danger');
        }
    }
    
    // 处理作物生长
    farmData.plots.forEach((plot, index) => {
        if (plot.plant !== null) {
            // 根据天气调整生长速度
            let growthRate = 1;
            switch (farmData.weather) {
                case 'sunny': growthRate = 1; break;
                case 'cloudy': growthRate = 0.8; break;
                case 'rainy': growthRate = 1.2; break;
                case 'stormy': growthRate = 1.3; break;
                case 'snowy': growthRate = 0.5; break;
            }
            
            // 施肥增加生长速度
            if (plot.fertilized) {
                growthRate *= 1.5;
            }
            
            // 应用生长
            farmData.plots[index].growth += growthRate;
            
            // 雨天自动浇水
            if (farmData.weather === 'rainy' || farmData.weather === 'stormy') {
                farmData.plots[index].watered = true;
            }
            
            // 检查是否缺水
            if (!plot.watered) {
                farmData.plots[index].health = Math.max(0, plot.health - 10);
            }
            
            // 随机出现杂草和害虫
            if (Math.random() <= 0.15) {
                farmData.plots[index].weeds = true;
                farmData.plots[index].health = Math.max(0, plot.health - 5);
            }
            
            if (Math.random() <= 0.1) {
                farmData.plots[index].pests = true;
                farmData.plots[index].health = Math.max(0, plot.health - 8);
            }
            
            // 杂草和害虫影响健康
            if (plot.weeds) {
                farmData.plots[index].health = Math.max(0, plot.health - 3);
            }
            
            if (plot.pests) {
                farmData.plots[index].health = Math.max(0, plot.health - 5);
            }
        }
    });
    
    // 自动补充水
    let waterRefill = 5;
    if (farmData.weather === 'rainy') waterRefill += 3;
    if (farmData.weather === 'stormy') waterRefill += 5;
    farmData.inventory.water += waterRefill;
    
    // 更新狗狗状态
    if (farmData.dog.owned) {
        const breed = farmData.dog_breeds[farmData.dog.breed];
        farmData.dog.age++;
        farmData.dog.hunger = Math.max(0, farmData.dog.hunger - breed.hunger_decay);
        farmData.dog.energy = Math.min(100, farmData.dog.energy + breed.energy_regen);
        farmData.dog.happiness = Math.max(0, farmData.dog.happiness - breed.happiness_decay);
        
        // 随机受伤
        if (farmData.dog.injury === 0 && Math.random() <= breed.injury_chance / 100) {
            const injuryLevel = Math.floor(Math.random() * 30) + 20; // 20-50%
            farmData.dog.injury = injuryLevel;
            addMessage(`${farmData.dog.name}受伤了！受伤程度${injuryLevel}%`, 'warning');
        }
        
        // 受伤状态下健康下降
        if (farmData.dog.injury > 0) {
            farmData.dog.days_injured++;
            farmData.dog.health = Math.max(0, farmData.dog.health - 2);
            if (farmData.dog.days_injured % 5 === 0) {
                addMessage(`${farmData.dog.name}已经受伤${farmData.dog.days_injured}天了，需要治疗！`, 'warning');
            }
        } else {
            farmData.dog.days_injured = 0;
        }
        
        // 检查狗的健康和年龄问题
        if (farmData.dog.age >= breed.max_age && Math.random() <= 0.3) {
            farmData.dog.owned = false;
            farmData.dog.health = 0;
            farmData.stats.dogs_passed++;
            addMessage(`😢 ${farmData.dog.name}因年老去世`, 'danger');
        }
        
        if (farmData.dog.health < 20 && Math.random() <= 0.1) {
            farmData.dog.owned = false;
            farmData.stats.dogs_passed++;
            addMessage(`😢 ${farmData.dog.name}因健康问题去世`, 'danger');
        }
    }
    
    checkLevelUp();
    updateAll();
    saveGame();
}

// 自动进行天数
let autoProgressInterval = null;

function startAutoProgress() {
    const days = parseInt(document.getElementById('autoDays').value) || 1;
    const autoDays = Math.max(1, Math.min(30, days));
    
    if (autoProgressInterval) return;
    
    addMessage(`⏰ 开始自动进行 ${autoDays} 天...`, 'info');
    
    document.getElementById('startAuto').style.display = 'none';
    document.getElementById('stopAuto').style.display = 'inline-block';
    
    let daysCompleted = 0;
    
    autoProgressInterval = setInterval(() => {
        nextDay();
        daysCompleted++;
        
        if (daysCompleted >= autoDays) {
            stopAutoProgress();
            addMessage(`✅ 自动进行完成: ${daysCompleted} 天`, 'success');
        }
    }, 500);
}

function stopAutoProgress() {
    if (autoProgressInterval) {
        clearInterval(autoProgressInterval);
        autoProgressInterval = null;
        document.getElementById('startAuto').style.display = 'inline-block';
        document.getElementById('stopAuto').style.display = 'none';
        addMessage('⏹️ 自动进行已停止', 'info');
    }
}

// 游戏存档功能
function saveGame() {
    try {
        localStorage.setItem('farmGameData', JSON.stringify(farmData));
        // 控制台显示保存成功，但不向用户显示提示，避免打扰
        console.log('游戏已保存');
    } catch (e) {
        console.error('保存游戏失败:', e);
        addMessage('⚠️ 游戏保存失败', 'warning');
    }
}

// 加载游戏存档
function loadGame() {
    try {
        const savedData = localStorage.getItem('farmGameData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            // 合并保存的数据到当前游戏数据
            Object.assign(farmData, parsedData);
            addMessage('🔄 已加载游戏存档', 'success');
            return true;
        }
    } catch (e) {
        console.error('加载游戏失败:', e);
        addMessage('⚠️ 加载存档失败，将开始新游戏', 'warning');
    }
    return false;
}

// 重置游戏
function resetGame() {
    if (confirm('确定要重置游戏吗？所有进度将丢失！')) {
        localStorage.removeItem('farmGameData');
        // 重新初始化游戏数据
        Object.assign(farmData, {
            money: 666666,
            day: 1,
            experience: 0,
            level: 1,
            weather: 'sunny',
            weather_forecast: generateWeatherForecast(),
            weather_accuracy: {
                total: 0,
                correct: 0
            },
            disaster_cooldown: 0,
            plots: Array(12).fill().map(() => ({
                plant: null,
                growth: 0,
                watered: false,
                weeds: false,
                pests: false,
                fertilized: false,
                health: 100,
                tilled: false
            })),
            inventory: {
                water: 10,
                herbicide: 3,
                pesticide: 3,
                fertilizer: 2,
                dog_food: 5,
                dog_medicine: 2,
                dog_vitamin: 1
            },
            stats: {
                harvests: 0,
                water_used: 0,
                weeds_removed: 0,
                pests_eliminated: 0,
                fertilizer_used: 0,
                tilling_count: 0,
                thefts_prevented: 0,
                thefts_suffered: 0,
                dogs_owned: 0,
                dogs_passed: 0,
                disasters: 0
            },
            unlocked: {
                fertilizer: true,
                corn: false,
                dog: false
            },
            dog: {
                owned: false,
                breed: null,
                name: '旺财',
                age: 0,
                happiness: 100,
                hunger: 100,
                energy: 100,
                health: 100,
                level: 1,
                experience: 0,
                injury: 0,
                days_injured: 0
            },
            messages: []
        });
        addMessage('🔄 游戏已重置，开始新游戏', 'success');
        updateAll();
        saveGame();
    }
}

// 更新所有界面元素
function updateAll() {
    updatePlots();
    updateWeatherForecast();
    updateShop();
    updateInventory();
    updateDogShop();
    updateDogStatus();
    updateStats();
}

// 初始化游戏
function initGame() {
    // 尝试加载存档
    const loaded = loadGame();
    
    // 如果没有存档，初始化天气
    if (!loaded) {
        farmData.weather_forecast = generateWeatherForecast();
    }
    
    updateAll();
    
    // 绑定事件监听器
    document.getElementById('nextDayBtn').addEventListener('click', nextDay);
    document.getElementById('startAuto').addEventListener('click', startAutoProgress);
    document.getElementById('stopAuto').addEventListener('click', stopAutoProgress);
    document.getElementById('feedDog').addEventListener('click', feedDog);
    document.getElementById('giveMedicine').addEventListener('click', giveMedicine);
    document.getElementById('giveVitamin').addEventListener('click', giveVitamin);
    document.getElementById('playWithDog').addEventListener('click', playWithDog);
    
    // 添加重置游戏按钮
    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn';
    resetBtn.textContent = '重置游戏';
    resetBtn.style.backgroundColor = '#f44336';
    resetBtn.onclick = resetGame;
    document.querySelector('.stats-bar').appendChild(resetBtn);
    
    addMessage('👋 欢迎来到农场游戏！开始你的农场之旅吧！', 'success');
}

// 页面加载完成后初始化游戏
window.onload = initGame;

// 暴露函数到全局，供HTML中直接调用
window.buyItem = buyItem;
window.buyDog = buyDog;
    