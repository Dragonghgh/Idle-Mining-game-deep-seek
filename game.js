// Game state
let game = {
    gold: 0,
    goldPerClick: 1,
    goldPerSecond: 0,
    workers: 0,
    workerCost: 10,
    workerEfficiency: 1,
    workerUpgradeCost: 100,
    pickaxeLevel: 1,
    pickaxeCost: 50
};

// Load game from localStorage
function loadGame() {
    const savedGame = localStorage.getItem('idleMinerSave');
    if (savedGame) {
        game = JSON.parse(savedGame);
        updateUI();
    }
}

// Save game to localStorage
function saveGame() {
    localStorage.setItem('idleMinerSave', JSON.stringify(game));
}

// Update all UI elements
function updateUI() {
    document.getElementById('gold').textContent = Math.floor(game.gold);
    document.getElementById('goldPerClick').textContent = game.goldPerClick;
    document.getElementById('goldPerSecond').textContent = game.goldPerSecond;
    document.getElementById('workers').textContent = game.workers;
    document.getElementById('workerCost').textContent = game.workerCost;
    document.getElementById('workerEfficiency').textContent = game.workerEfficiency;
    document.getElementById('workerUpgradeCost').textContent = game.workerUpgradeCost;
    document.getElementById('pickaxeLevel').textContent = game.pickaxeLevel;
    document.getElementById('pickaxeCost').textContent = game.pickaxeCost;
    
    // Disable buttons if not enough gold
    document.getElementById('hireWorker').disabled = game.gold < game.workerCost;
    document.getElementById('upgradePickaxe').disabled = game.gold < game.pickaxeCost;
    document.getElementById('upgradeWorker').disabled = game.gold < game.workerUpgradeCost;
}

// Game loop - runs every second
function gameLoop() {
    // Add passive gold from workers
    if (game.workers > 0) {
        game.gold += game.goldPerSecond;
        updateUI();
    }
    
    saveGame();
}

// Event listeners
document.getElementById('mineGold').addEventListener('click', () => {
    game.gold += game.goldPerClick;
    updateUI();
});

document.getElementById('hireWorker').addEventListener('click', () => {
    if (game.gold >= game.workerCost) {
        game.gold -= game.workerCost;
        game.workers++;
        game.goldPerSecond = game.workers * game.workerEfficiency;
        game.workerCost = Math.floor(game.workerCost * 1.5);
        updateUI();
    }
});

document.getElementById('upgradePickaxe').addEventListener('click', () => {
    if (game.gold >= game.pickaxeCost) {
        game.gold -= game.pickaxeCost;
        game.goldPerClick += 1;
        game.pickaxeLevel++;
        game.pickaxeCost = Math.floor(game.pickaxeCost * 2);
        updateUI();
    }
});

document.getElementById('upgradeWorker').addEventListener('click', () => {
    if (game.gold >= game.workerUpgradeCost) {
        game.gold -= game.workerUpgradeCost;
        game.workerEfficiency += 1;
        game.goldPerSecond = game.workers * game.workerEfficiency;
        game.workerUpgradeCost = Math.floor(game.workerUpgradeCost * 2.5);
        updateUI();
    }
});

// Initialize game
loadGame();
setInterval(gameLoop, 1000);
