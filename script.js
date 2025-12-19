// Game State
const gameState = {
    players: [],
    currentPlayerIndex: 0,
    board: locations, // from locations.js
    phase: "roll", // roll, action, end
    doublesCount: 0,
    gameActive: false
};

// DOM Elements
const boardEl = document.getElementById('board');
const playerInfoEl = document.getElementById('player-info');
const messageBoxEl = document.getElementById('message-box');
const rollBtn = document.getElementById('roll-btn');
const buyBtn = document.getElementById('buy-btn');
const passBtn = document.getElementById('pass-btn');
const endTurnBtn = document.getElementById('end-turn-btn');
const dice1El = document.getElementById('dice-1');
const dice2El = document.getElementById('dice-2');
const startModal = document.getElementById('start-modal');
const humanCountSelect = document.getElementById('human-count');
const startGameBtn = document.getElementById('start-game-btn');

// Initialization
function init() {
    startGameBtn.addEventListener('click', () => {
        const humans = parseInt(humanCountSelect.value);
        startGame(humans);
    });
}

function startGame(humanCount) {
    startModal.classList.add('hidden');
    gameState.gameActive = true;

    // Initialize Players
    const colors = ["red", "blue", "green", "orange"];
    gameState.players = [];

    for (let i = 0; i < 4; i++) {
        const isHuman = i < humanCount;
        gameState.players.push({
            id: i,
            name: isHuman ? `玩家 ${i + 1}` : `電腦 ${String.fromCharCode(65 + (i - humanCount))}`,
            color: colors[i],
            money: 15000,
            position: 0,
            properties: [],
            jailed: false,
            isComputer: !isHuman
        });
    }

    renderBoard();
    updatePlayerInfo();
    logMessage("遊戲開始！");
    updateControls();

    checkAITurn();
}

// Render Board Tiles
function renderBoard() {
    // Clear existing tiles (except center)
    const center = boardEl.querySelector('.center-area');
    boardEl.innerHTML = '';
    boardEl.appendChild(center);

    gameState.board.forEach((loc, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.id = `tile-${index}`;

        // Calculate Grid Position
        const pos = getGridPosition(index);
        tile.style.gridRow = pos.row;
        tile.style.gridColumn = pos.col;

        // Content
        if (loc.type === 'property' || loc.type === 'station' || loc.type === 'utility') {
            const header = document.createElement('div');
            header.classList.add('tile-header');
            if (loc.group) header.classList.add(`group-${loc.group}`);
            tile.appendChild(header);

            const name = document.createElement('div');
            name.classList.add('tile-name');
            name.innerText = loc.name;
            tile.appendChild(name);

            const price = document.createElement('div');
            price.classList.add('tile-price');
            price.innerText = `$${loc.price}`;
            tile.appendChild(price);

            // House Container
            const houseContainer = document.createElement('div');
            houseContainer.classList.add('house-container');
            houseContainer.id = `houses-${index}`;
            tile.appendChild(houseContainer);

        } else {
            tile.classList.add('corner');
            const name = document.createElement('div');
            name.classList.add('tile-name');
            name.innerText = loc.name;
            tile.appendChild(name);
        }

        boardEl.appendChild(tile);
    });

    renderPlayers();
}

function getGridPosition(index) {
    if (index === 0) return { row: 11, col: 11 };
    if (index < 10) return { row: 11, col: 11 - index };
    if (index === 10) return { row: 11, col: 1 };
    if (index < 20) return { row: 11 - (index - 10), col: 1 };
    if (index === 20) return { row: 1, col: 1 };
    if (index < 30) return { row: 1, col: 1 + (index - 20) };
    if (index === 30) return { row: 1, col: 11 };
    if (index < 40) return { row: 1 + (index - 30), col: 11 };
    return { row: 1, col: 1 }; // Fallback
}

function renderPlayers() {
    // Remove existing tokens
    document.querySelectorAll('.token').forEach(el => el.remove());

    gameState.players.forEach(player => {
        const tile = document.getElementById(`tile-${player.position}`);
        const token = document.createElement('div');
        token.classList.add('token', `token-p${player.id}`);
        tile.appendChild(token);
    });
}

function updatePlayerInfo() {
    playerInfoEl.innerHTML = '';
    gameState.players.forEach((player, index) => {
        const card = document.createElement('div');
        card.classList.add('player-card');
        if (index === gameState.currentPlayerIndex) card.classList.add('active');

        card.innerHTML = `
            <strong>${player.name}</strong> <span style="color:${player.color}">●</span><br>
            現金: $${player.money}<br>
            地產: ${player.properties.length} 處
        `;
        playerInfoEl.appendChild(card);
    });
}

function logMessage(msg) {
    messageBoxEl.innerText = msg;
    messageBoxEl.scrollTop = messageBoxEl.scrollHeight;
}

function updateControls() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];

    if (currentPlayer.isComputer) {
        rollBtn.disabled = true;
        buyBtn.disabled = true;
        passBtn.disabled = true;
        endTurnBtn.disabled = true;
        return;
    }

    rollBtn.disabled = gameState.phase !== 'roll';
    buyBtn.disabled = gameState.phase !== 'action';
    passBtn.disabled = gameState.phase !== 'action';
    endTurnBtn.disabled = gameState.phase !== 'end';

    // Check if current tile is buyable or buildable
    if (gameState.phase === 'action') {
        const loc = gameState.board[currentPlayer.position];
        if (loc.type === 'property' || loc.type === 'station' || loc.type === 'utility') {
            if (loc.owner === undefined) {
                // Buy Property
                if (currentPlayer.money >= loc.price) {
                    buyBtn.disabled = false;
                    buyBtn.innerText = `購買 ($${loc.price})`;
                } else {
                    buyBtn.disabled = true;
                    buyBtn.innerText = `現金不足 ($${loc.price})`;
                }
                passBtn.disabled = false; // Always allow passing
            } else if (loc.owner === currentPlayer.id && loc.type === 'property') {
                // Build House Logic
                const houseCost = Math.floor(loc.price * 0.3); // House cost is 30% of property price
                if (currentPlayer.money >= houseCost && (!loc.houses || loc.houses < 4)) {
                    buyBtn.disabled = false;
                    buyBtn.innerText = `蓋房子 ($${houseCost})`;
                } else if (loc.houses >= 4) {
                    buyBtn.disabled = true;
                    buyBtn.innerText = "已蓋滿";
                } else {
                    buyBtn.disabled = true;
                    buyBtn.innerText = `現金不足 ($${houseCost})`;
                }
                passBtn.disabled = false;
            } else {
                buyBtn.disabled = true;
                buyBtn.innerText = "無法操作";
                passBtn.disabled = false;
            }
        } else {
            buyBtn.disabled = true;
            buyBtn.innerText = "無法購買";
            passBtn.disabled = true;
        }
    }
}

// Game Actions
rollBtn.addEventListener('click', () => {
    if (gameState.phase === 'roll') executeRoll();
});

function executeRoll() {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const total = d1 + d2;

    dice1El.innerText = d1;
    dice2El.innerText = d2;

    movePlayer(total);
}

function movePlayer(steps) {
    const player = gameState.players[gameState.currentPlayerIndex];
    let newPos = player.position + steps;

    if (newPos >= 40) {
        newPos -= 40;
        player.money += 2000; // Pass Go
        logMessage(`${player.name} 經過起點，獲得 $2000！`);
    }

    player.position = newPos;
    renderPlayers();
    handleLanding();
}

function handleLanding() {
    const player = gameState.players[gameState.currentPlayerIndex];
    const loc = gameState.board[player.position];

    logMessage(`${player.name} 來到 ${loc.name}`);

    if (loc.type === 'property' || loc.type === 'station' || loc.type === 'utility') {
        if (loc.owner !== undefined && loc.owner !== player.id) {
            // Pay Rent
            const owner = gameState.players[loc.owner];
            let rent = loc.rent;

            // Increase rent for houses
            if (loc.houses) {
                rent += loc.rent * loc.houses;
            }

            player.money -= rent;
            owner.money += rent;
            logMessage(`支付租金 $${rent} 給 ${owner.name}`);
            gameState.phase = 'end';
        } else if (loc.owner === player.id) {
            if (loc.type === 'property') {
                logMessage("這是你的地產，可以加蓋房子。");
                gameState.phase = 'action';
            } else {
                logMessage("這是你的地產。");
                gameState.phase = 'end';
            }
        } else {
            // Buyable
            gameState.phase = 'action';
        }
    } else if (loc.type === 'chance' || loc.type === 'chest') {
        handleCardEffect(loc.type);
        gameState.phase = 'end';
    } else if (loc.type === 'tax') {
        player.money -= loc.rent; // Tax amount stored in rent
        logMessage(`繳納稅金 $${loc.rent}`);
        gameState.phase = 'end';
    } else if (loc.type === 'go_to_jail') {
        player.position = 10;
        player.jailed = true;
        renderPlayers();
        logMessage("被送進監獄！");
        gameState.phase = 'end';
    } else {
        gameState.phase = 'end';
    }

    updatePlayerInfo();
    updateControls();

    // If AI, continue turn
    if (player.isComputer) {
        setTimeout(playAITurnAction, 1000);
    }
}

function handleCardEffect(type) {
    const player = gameState.players[gameState.currentPlayerIndex];
    const isChance = type === 'chance';
    const effects = [
        { text: "中獎了！獲得 $500", money: 500 },
        { text: "股票獲利，獲得 $1000", money: 1000 },
        { text: "超速罰單，支付 $200", money: -200 },
        { text: "請客吃飯，支付 $500", money: -500 },
        { text: "撿到錢，獲得 $100", money: 100 }
    ];

    const effect = effects[Math.floor(Math.random() * effects.length)];
    player.money += effect.money;
    logMessage(`${isChance ? '機會' : '命運'}：${effect.text}`);
}

buyBtn.addEventListener('click', () => {
    if (gameState.phase === 'action') executeBuyOrBuild();
});

passBtn.addEventListener('click', () => {
    if (gameState.phase === 'action') {
        logMessage(`${gameState.players[gameState.currentPlayerIndex].name} 選擇放棄購買/蓋房。`);
        gameState.phase = 'end';
        updateControls();
    }
});

function executeBuyOrBuild() {
    const player = gameState.players[gameState.currentPlayerIndex];
    const loc = gameState.board[player.position];

    if (loc.owner === undefined) {
        // Buy Property
        if (player.money >= loc.price) {
            player.money -= loc.price;
            player.properties.push(loc.id);
            loc.owner = player.id;
            loc.houses = 0;

            // Visual update for ownership
            const tile = document.getElementById(`tile-${loc.id}`);
            tile.style.border = `3px solid ${player.color}`;

            logMessage(`購買了 ${loc.name}！`);
            gameState.phase = 'end';
        } else {
            logMessage("現金不足！");
        }
    } else if (loc.owner === player.id) {
        // Build House
        const houseCost = Math.floor(loc.price * 0.3);
        if (player.money >= houseCost) {
            if (!loc.houses) loc.houses = 0;
            if (loc.houses < 4) {
                player.money -= houseCost;
                loc.houses++;

                // Visual House
                const houseContainer = document.getElementById(`houses-${loc.id}`);
                const house = document.createElement('div');
                house.classList.add('house');
                houseContainer.appendChild(house);

                logMessage(`在 ${loc.name} 蓋了一棟房子！`);
                gameState.phase = 'end';
            } else {
                logMessage("房子已蓋滿！");
                gameState.phase = 'end';
            }
        } else {
            logMessage("現金不足蓋房子！");
        }
    }

    updatePlayerInfo();
    updateControls();

    if (player.isComputer) {
        setTimeout(executeEndTurn, 1000);
    }
}

endTurnBtn.addEventListener('click', () => {
    if (gameState.phase === 'end') executeEndTurn();
});

function executeEndTurn() {
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % 4;
    gameState.phase = 'roll';

    // Reset dice visuals
    dice1El.innerText = '-';
    dice2El.innerText = '-';

    updatePlayerInfo();
    updateControls();

    checkAITurn();
}

// AI Logic
function checkAITurn() {
    const player = gameState.players[gameState.currentPlayerIndex];
    if (player.isComputer) {
        logMessage(`輪到 ${player.name} (電腦)...`);
        setTimeout(executeRoll, 1500);
    } else {
        logMessage(`輪到 ${player.name}`);
    }
}

function playAITurnAction() {
    const player = gameState.players[gameState.currentPlayerIndex];

    if (gameState.phase === 'action') {
        const loc = gameState.board[player.position];

        if (loc.owner === undefined) {
            // Buy logic
            // Simple AI Strategy: Buy if money > price + 500 (reserve)
            if (player.money >= loc.price + 500) {
                executeBuyOrBuild();
            } else {
                logMessage(`${player.name} 選擇放棄購買。`);
                gameState.phase = 'end';
                setTimeout(executeEndTurn, 1000);
            }
        } else if (loc.owner === player.id) {
            // Build logic
            const houseCost = Math.floor(loc.price * 0.3);
            if (player.money >= houseCost + 1000) { // Conservative build
                executeBuyOrBuild();
            } else {
                logMessage(`${player.name} 決定不蓋房子。`);
                gameState.phase = 'end';
                setTimeout(executeEndTurn, 1000);
            }
        }
    } else {
        // If phase is already end (e.g. paid rent or landed on chance), just end turn
        setTimeout(executeEndTurn, 1000);
    }
}

// Start
init();
