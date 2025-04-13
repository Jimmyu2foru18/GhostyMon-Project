/**
 * Ghostymon Battle Game
 * A turn-based monster battle game with ghost theme
 */

document.addEventListener('DOMContentLoaded', () => {
    // Audio setup
    const audio = {
        characterSelect: new Audio('./Character select game open sound.mp3'),
        battleMusic: new Audio('./Game Music to loop.mp3')
    };

    // Set audio volumes to 50%
    audio.characterSelect.volume = 0.3;
    audio.battleMusic.volume = 0.3;

    // Set character select screen background
    document.getElementById('character-select').style.backgroundImage = "url('./Character Select Page Background.jpg')";
    document.getElementById('character-select').style.backgroundSize = "cover";
    document.getElementById('character-select').style.backgroundPosition = "center";

    // Configure battle music to loop
    audio.battleMusic.loop = true;

    // Game state
    const gameState = {
        currentLevel: 1,
        maxLevels: 6,
        playerMonster: null,
        enemyMonster: null,
        isPlayerTurn: true,
        battleActive: false,
        battleLog: []
    };

    // Monster templates
    const monsterTemplates = {
        // Player monsters
        1: {
            name: 'The Infamous N',
            types: ['dark', 'ghost'],
            maxHp: 120,
            maxMana: 165,
            moves: [
                { name: 'Shadow Strike', damage: 45, manaCost: 20, type: 'dark', accuracy: 90 },
                { name: 'Ghost Slash', damage: 40, manaCost: 15, type: 'ghost', accuracy: 95 },
                { name: 'Dark Barrier', damage: 0, manaCost: 10, type: 'dark', isDefensive: true, accuracy: 100 },
                { name: 'Phantom Edge', damage: 50, manaCost: 25, type: 'ghost', accuracy: 85 }
            ],
            sprite: './images/Monster1.png'
        },
        2: {
            name: 'Cheese of Chair',
            types: ['fire', 'ghost'],
            maxHp: 100,
            maxMana: 180,
            moves: [
                { name: 'Ghost Fire', damage: 45, manaCost: 20, type: 'fire', accuracy: 90 },
                { name: 'Spirit Burst', damage: 35, manaCost: 15, type: 'ghost', accuracy: 95 },
                { name: 'Flame Shield', damage: 0, manaCost: 10, type: 'fire', isDefensive: true, accuracy: 100 },
                { name: 'Inferno Spirit', damage: 50, manaCost: 25, type: 'ghost', accuracy: 85 }
            ],
            sprite: './images/Monster2.png'
        },
        3: {
            name: "Ghosty of Beans",
            types: ['ice', 'ghost'],
            maxHp: 150,
            maxMana: 200,
            moves: [
                { name: 'Frost Spirit', damage: 40, manaCost: 15, type: 'ice', accuracy: 90 },
                { name: 'Ghostly Wind', damage: 35, manaCost: 20, type: 'ghost', accuracy: 95 },
                { name: 'Ice Barrier', damage: 0, manaCost: 10, type: 'ice', isDefensive: true, accuracy: 100 },
                { name: 'Glacial Haunt', damage: 45, manaCost: 25, type: 'ghost', accuracy: 85 }
            ],
            sprite: './images/Monster3.png'
        }
    };

    // Enemy templates for each level
    const enemyTemplates = {
        1: {
            name: 'SharpSandwich',
            types: ['fire', 'ghost'],
            maxHp: 100,
            maxMana: 60,
            moves: [
                { name: 'Flame Burst', damage: 40, manaCost: 15, type: 'fire', accuracy: 85 },
                { name: 'Ghost Flame', damage: 30, manaCost: 20, type: 'ghost', accuracy: 90 },
                { name: 'Spirit Shield', damage: 0, manaCost: 10, type: 'ghost', isDefensive: true, accuracy: 100 },
                { name: 'Blaze Haunt', damage: 45, manaCost: 25, type: 'fire', accuracy: 80 }
            ],
            sprite: './images/Enemy1.png'
        },
        2: {
            name: 'Gh03stGi0rl',
            types: ['electric', 'ghost'],
            maxHp: 110,
            maxMana: 65,
            moves: [
                { name: 'Thunder Spirit', damage: 45, manaCost: 15, type: 'electric', accuracy: 85 },
                { name: 'Static Ghost', damage: 35, manaCost: 20, type: 'ghost', accuracy: 90 },
                { name: 'Voltage Veil', damage: 0, manaCost: 10, type: 'electric', isDefensive: true, accuracy: 100 },
                { name: 'Lightning Phantom', damage: 50, manaCost: 25, type: 'ghost', accuracy: 80 }
            ],
            sprite: './images/Enemy2.png'
        },
        3: {
            name: 'WaxOfMax',
            types: ['rock', 'ghost'],
            maxHp: 130,
            maxMana: 55,
            moves: [
                { name: 'Rock Spirit', damage: 50, manaCost: 20, type: 'rock', accuracy: 85 },
                { name: 'Stone Phantom', damage: 40, manaCost: 25, type: 'ghost', accuracy: 90 },
                { name: 'Granite Veil', damage: 0, manaCost: 10, type: 'rock', isDefensive: true, accuracy: 100 },
                { name: 'Spectral Crush', damage: 55, manaCost: 30, type: 'ghost', accuracy: 80 }
            ],
            sprite: './images/Enemy3.png'
        },
        4: {
            name: 'OvenPG',
            types: ['psychic', 'ghost'],
            maxHp: 120,
            maxMana: 70,
            moves: [
                { name: 'Mind Haunt', damage: 55, manaCost: 20, type: 'psychic', accuracy: 85 },
                { name: 'Spectral Wave', damage: 45, manaCost: 25, type: 'ghost', accuracy: 90 },
                { name: 'Psy Shield', damage: 0, manaCost: 15, type: 'psychic', isDefensive: true, accuracy: 100 },
                { name: 'Soul Drain', damage: 60, manaCost: 30, type: 'ghost', accuracy: 80 }
            ],
            sprite: './images/Enemy4.png'
        },
        5: {
            name: 'DragonGhost',
            types: ['dragon', 'ghost'],
            maxHp: 140,
            maxMana: 75,
            moves: [
                { name: 'Dragon Spirit', damage: 60, manaCost: 25, type: 'dragon', accuracy: 85 },
                { name: 'Ghost Pulse', damage: 50, manaCost: 30, type: 'ghost', accuracy: 90 },
                { name: 'Dragon Veil', damage: 0, manaCost: 15, type: 'dragon', isDefensive: true, accuracy: 100 },
                { name: 'Spectral Roar', damage: 65, manaCost: 35, type: 'ghost', accuracy: 80 }
            ],
            sprite: './images/Enemy5.png'
        },
        6: {
            name: 'Henry',
            types: ['dark', 'ghost'],
            maxHp: 160,
            maxMana: 80,
            moves: [
                { name: 'Void Strike', damage: 65, manaCost: 30, type: 'dark', accuracy: 85 },
                { name: 'Phantom Force', damage: 55, manaCost: 35, type: 'ghost', accuracy: 90 },
                { name: 'Shadow Veil', damage: 0, manaCost: 20, type: 'dark', isDefensive: true, accuracy: 100 },
                { name: 'Soul Crusher', damage: 70, manaCost: 40, type: 'ghost', accuracy: 80 }
            ],
            sprite: './images/Enemy6.png'
        }
    };

    // DOM Elements
    const screens = {
        characterSelect: document.getElementById('character-select'),
        battleArena: document.getElementById('battle-arena'),
        victoryScreen: document.getElementById('victory-screen'),
        gameOverScreen: document.getElementById('game-over-screen'),
        gameCompleteScreen: document.getElementById('game-complete-screen')
    };

    const battleElements = {
        background: document.querySelector('.battle-background'),
        enemySprite: document.querySelector('.monster-sprite.enemy'),
        playerSprite: document.querySelector('.monster-sprite.player'),
        enemyName: document.querySelector('.enemy-section .name-level'),
        playerName: document.querySelector('.player-section .name-level'),
        enemyHealth: document.querySelector('.enemy-section .health-bar'),
        playerHealth: document.querySelector('.player-section .health-bar'),
        enemyHealthText: document.querySelector('.enemy-section .health-text'),
        playerHealthText: document.querySelector('.player-section .health-text'),
        enemyMana: document.querySelector('.enemy-section .mana-bar'),
        playerMana: document.querySelector('.player-section .mana-bar'),
        enemyManaText: document.querySelector('.enemy-section .mana-text'),
        playerManaText: document.querySelector('.player-section .mana-text'),
        moveButtons: document.querySelectorAll('.move-btn'),
        battleMessage: document.querySelector('.battle-message'),
        resultMessage: document.querySelectorAll('.result-message')
    };

    // Event Listeners
    function setupEventListeners() {
        // Character selection
        audio.characterSelect.play();
        const monsterOptions = document.querySelectorAll('.monster-option');
        monsterOptions.forEach(option => {
            option.addEventListener('click', () => selectStarterMonster(option.dataset.monster));
        });

        // Move buttons
        battleElements.moveButtons.forEach((button, index) => {
            button.addEventListener('click', () => handleMoveSelection(index));
        });

        // Next level button
        document.getElementById('next-level-btn').addEventListener('click', startNextLevel);

        // Retry button
        document.getElementById('retry-btn').addEventListener('click', restartGame);

        // Play again button
        document.getElementById('play-again-btn').addEventListener('click', restartGame);
    }

    // Game Functions
    function selectStarterMonster(monsterId) {
        // Play character select sound


        // Create player monster
        gameState.playerMonster = createMonster(monsterTemplates[monsterId]);

        // Create enemy monster for level 1
        gameState.enemyMonster = createMonster(enemyTemplates[1]);

        // Start battle
        startBattle();
    }

    function createMonster(template) {
        return {
            name: template.name,
            types: [...template.types],
            maxHp: template.maxHp,
            currentHp: template.maxHp,
            maxMana: template.maxMana,
            currentMana: template.maxMana,
            moves: template.moves.map(move => ({ ...move })),
            sprite: template.sprite,
            defense: 1.0
        };
    }

    function startBattle() {
        gameState.battleActive = true;
        // Start battle music
        audio.battleMusic.play();
        gameState.isPlayerTurn = true;
        gameState.battleLog = [];

        // Switch to battle screen
        switchScreen('battle-arena');

        // Set background based on level
        battleElements.background.style.backgroundImage = `url('./images/Background${gameState.currentLevel}.png')`;

        // Set sprites
        battleElements.playerSprite.style.backgroundImage = `url('${gameState.playerMonster.sprite}')`;
        battleElements.enemySprite.style.backgroundImage = `url('${gameState.enemyMonster.sprite}')`;

        // Update UI
        updateBattleUI();
        displayBattleMessage(`Battle started! ${gameState.playerMonster.name} vs ${gameState.enemyMonster.name}!`);
    }

    function updateBattleUI() {
        const player = gameState.playerMonster;
        const enemy = gameState.enemyMonster;

        // Update names and levels
        battleElements.playerName.textContent = `${player.name}`;
        battleElements.enemyName.textContent = `${enemy.name}`;

        // Update health bars
        const playerHealthPercent = (player.currentHp / player.maxHp) * 100;
        const enemyHealthPercent = (enemy.currentHp / enemy.maxHp) * 100;
        battleElements.playerHealth.style.width = `${playerHealthPercent}%`;
        battleElements.enemyHealth.style.width = `${enemyHealthPercent}%`;
        battleElements.playerHealthText.textContent = `HP: ${player.currentHp}/${player.maxHp}`;
        battleElements.enemyHealthText.textContent = `HP: ${enemy.currentHp}/${enemy.maxHp}`;

        // Update mana bars
        const playerManaPercent = (player.currentMana / player.maxMana) * 100;
        const enemyManaPercent = (enemy.currentMana / enemy.maxMana) * 100;
        battleElements.playerMana.style.width = `${playerManaPercent}%`;
        battleElements.enemyMana.style.width = `${enemyManaPercent}%`;
        battleElements.playerManaText.textContent = `Mana: ${player.currentMana}/${player.maxMana}`;
        battleElements.enemyManaText.textContent = `Mana: ${enemy.currentMana}/${enemy.maxMana}`;

        // Update move buttons
        player.moves.forEach((move, index) => {
            const button = battleElements.moveButtons[index];
            button.textContent = `${move.name} (${move.manaCost} Mana)`;
            button.disabled = player.currentMana < move.manaCost || !gameState.isPlayerTurn;
        });
    }

    function handleMoveSelection(moveIndex) {
        // Don't proceed if battle is not active, it's not player's turn, or enemy is already defeated
        if (!gameState.battleActive || !gameState.isPlayerTurn || gameState.enemyMonster.currentHp <= 0) return;

        const player = gameState.playerMonster;
        const enemy = gameState.enemyMonster;
        const selectedMove = player.moves[moveIndex];

        // Check if player has enough mana
        if (player.currentMana < selectedMove.manaCost) {
            displayBattleMessage("Not enough mana for this move!");
            return;
        }

        // Use mana
        player.currentMana -= selectedMove.manaCost;

        // Calculate hit type (full, partial, miss)
        const hitType = calculateHitType(selectedMove.accuracy);
        let damage = 0;

        if (hitType === 'miss') {
            displayBattleMessage(`${player.name}'s ${selectedMove.name} missed!`);
        } else {
            // Calculate damage
            if (!selectedMove.isDefensive) {
                const baseDamage = selectedMove.damage;
                const damageMultiplier = hitType === 'full' ? 1.0 : 0.5;
                damage = Math.round(baseDamage * damageMultiplier / enemy.defense);
                
                // Apply damage
                enemy.currentHp = Math.max(0, enemy.currentHp - damage);
                
                displayBattleMessage(`${player.name} used ${selectedMove.name}! ${hitType === 'full' ? 'It was a direct hit' : 'It was a glancing blow'} for ${damage} damage!`);
            } else {
                // Defensive move
                player.defense *= 1.5;
                displayBattleMessage(`${player.name} used ${selectedMove.name}! Defense increased!`);
            }
        }

        // Update UI
        updateBattleUI();

        // Check if enemy is defeated
        if (enemy.currentHp <= 0) {
            // Ensure HP is exactly 0 for display purposes
            enemy.currentHp = 0;
            updateBattleUI();
            
            // Display victory message
            displayBattleMessage(`${enemy.name} has been defeated!`);
            
            // Disable battle controls
            gameState.battleActive = false;
            gameState.isPlayerTurn = false;
            
            // Heal player's monster for next battle
            player.currentHp = Math.min(player.maxHp, player.currentHp + Math.floor(player.maxHp * 0.3));
            player.currentMana = player.maxMana;
            player.defense = 1.0;
            
            // Add a slight delay before showing victory screen
            setTimeout(() => {
                handleVictory();
            }, 1000);
            return;
        }

        // Switch to enemy turn only if enemy is still alive
        gameState.isPlayerTurn = false;
        setTimeout(enemyTurn, 1500);
    }

    function enemyTurn() {
        const enemy = gameState.enemyMonster;
        const player = gameState.playerMonster;
        
        // If battle is not active or enemy is already defeated, don't proceed
        if (!gameState.battleActive || enemy.currentHp <= 0) return;

        // Select a move (simple AI)
        let availableMoves = enemy.moves.filter(move => move.manaCost <= enemy.currentMana);
        
        if (availableMoves.length === 0) {
            // If no moves available, regenerate some mana and skip turn
            enemy.currentMana += 10;
            displayBattleMessage(`${enemy.name} is gathering energy!`);
            gameState.isPlayerTurn = true;
            updateBattleUI();
            return;
        }

        // Prioritize defensive move if health is low
        if (enemy.currentHp < enemy.maxHp * 0.3) {
            const defensiveMove = enemy.moves.find(move => move.isDefensive && move.manaCost <= enemy.currentMana);
            if (defensiveMove) {
                availableMoves = [defensiveMove];
            }
        }

        // Randomly select a move
        const selectedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

        // Use mana
        enemy.currentMana -= selectedMove.manaCost;

        // Calculate hit type
        const hitType = calculateHitType(selectedMove.accuracy);
        let damage = 0;

        if (hitType === 'miss') {
            displayBattleMessage(`${enemy.name}'s ${selectedMove.name} missed!`);
        } else {
            // Calculate damage
            if (!selectedMove.isDefensive) {
                const baseDamage = selectedMove.damage;
                const damageMultiplier = hitType === 'full' ? 1.0 : 0.5;
                damage = Math.round(baseDamage * damageMultiplier / player.defense);
                
                // Apply damage
                player.currentHp = Math.max(0, player.currentHp - damage);
                
                displayBattleMessage(`${enemy.name} used ${selectedMove.name}! ${hitType === 'full' ? 'It was a direct hit' : 'It was a glancing blow'} for ${damage} damage!`);
            } else {
                // Defensive move
                enemy.defense *= 1.5;
                displayBattleMessage(`${enemy.name} used ${selectedMove.name}! Defense increased!`);
            }
        }

        // Update UI
        updateBattleUI();

//-------------------------------------------------------------------------------------------//
        // Check if player is defeated
        if (player.currentHp <= 0) {
            handleGameOver();
            return;
        }
//--------------------------------------------------------------------------------------------//
        // Reset defense multipliers slightly each turn
        player.defense = Math.max(1.0, player.defense * 0.8);
        enemy.defense = Math.max(1.0, enemy.defense * 0.8);

        // Regenerate some mana each turn
        player.currentMana = Math.min(player.maxMana, player.currentMana + 5);
        enemy.currentMana = Math.min(enemy.maxMana, enemy.currentMana + 5);

        // Switch back to player turn
        gameState.isPlayerTurn = true;
        updateBattleUI();
    }

    function calculateHitType(accuracy) {
        const roll = Math.random() * 100;
        if (roll > accuracy) {
            return 'miss';
        } else if (roll > accuracy * 0.6) {
            return 'partial';
        } else {
            return 'full';
        }
    }
//-------------------------------------------------------------------------------------------------------------------//
    function handleVictory() {
        // Ensure battle is inactive and player can't make moves
        gameState.battleActive = false;
        gameState.isPlayerTurn = false;
        
        if (gameState.currentLevel === gameState.maxLevels) {
            // Game completed
            const resultMessage = document.querySelector('#game-complete-screen .result-message');
            if (resultMessage) {
                resultMessage.textContent = `Congratulations! You've defeated Henry, the final boss!`;
            }
            
            // Add game complete image and show screen with animation
            const gameCompleteScreen = document.getElementById('game-complete-screen');
            if (gameCompleteScreen) {
                const imagePath = `./images/Background${gameState.currentLevel}.png`;
                gameCompleteScreen.style.backgroundImage = `url('${imagePath}')`;
                gameCompleteScreen.style.display = 'flex';
                setTimeout(() => {
                    gameCompleteScreen.classList.add('active');
                }, 50);
            }
            
            // Switch to game complete screen
            switchScreen('game-complete-screen');
        } else {
            // Level completed
            const resultMessage = document.querySelector('#victory-screen .result-message');
            if (resultMessage) {
                resultMessage.textContent = `You've defeated ${gameState.enemyMonster.name}! Get ready for the next challenge!`;
            }
            
            // Add victory image and show screen with animation
            const victoryScreen = document.getElementById('victory-screen');
            if (victoryScreen) {
                const imagePath = `./images/Background${gameState.currentLevel}.png`;
                victoryScreen.style.backgroundImage = `url('${imagePath}')`;
                victoryScreen.style.display = 'flex';
                
                // Enable and show next level button with animation
                const nextLevelBtn = document.getElementById('next-level-btn');
                if (nextLevelBtn) {
                    nextLevelBtn.style.display = 'block';
                    nextLevelBtn.disabled = false;
                    setTimeout(() => {
                        victoryScreen.classList.add('active');
                        nextLevelBtn.style.opacity = '1';
                    }, 50);
                }

                // Switch to victory screen
                switchScreen('victory-screen');
            }
        }
    }
//--------------------------------------------------------------------------------------------------------------------//
    function handleGameOver() {
        gameState.battleActive = false;
        console.log('Game over handler called');
        
        const resultMessage = document.querySelector('#game-over-screen .result-message');
        if (resultMessage) {
            resultMessage.textContent = `Your ${gameState.playerMonster.name} was defeated by ${gameState.enemyMonster.name}!`;
        } else {
            console.error('Result message element not found in game over screen');
        }
        
        // Add game over image
        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) {
            const imagePath = `./images/Background${gameState.currentLevel}.png`;
            console.log(`Setting background image: ${imagePath}`);
            gameOverScreen.style.backgroundImage = `url('${imagePath}')`;
        } else {
            console.error('Game over screen element not found');
        }
        
        switchScreen('game-over-screen');
    }
//---------------------------------------------------------------------------------------------------------------------//
    function startNextLevel() {
        // Increase level
        gameState.currentLevel++;
        
        // Heal player monster partially
        const player = gameState.playerMonster;
        player.currentHp = Math.min(player.maxHp, player.currentHp + Math.floor(player.maxHp * 0.5));
        player.currentMana = player.maxMana;
        player.defense = 1.0;
        
        // Create enemy for next level
        gameState.enemyMonster = createMonster(enemyTemplates[gameState.currentLevel]);
        
        // Start new battle
        startBattle();
    }
//---------------------------------------------------------------------------------------------------------------------//
    function restartGame() {
        // Reset game state
        gameState.currentLevel = 1;
        gameState.playerMonster = null;
        gameState.enemyMonster = null;
        gameState.battleActive = false;
        
        // Go back to character select
        switchScreen('character-select');
    }


    function switchScreen(screenId) {
        console.log(`Attempting to switch to screen: ${screenId}`);
        
        // Get the target screen
        const targetScreen = document.getElementById(screenId);
        if (!targetScreen) {
            console.error(`Screen with ID ${screenId} not found`);
            return;
        }
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        targetScreen.classList.add('active');
        
        // Force a reflow to ensure the transition applies
        void targetScreen.offsetWidth;
        
        // Make sure the screen is visible
        targetScreen.style.opacity = '1';
        targetScreen.style.visibility = 'visible';
        
        console.log(`Switched to screen: ${screenId}`);
    }


















    function displayBattleMessage(message) {
        battleElements.battleMessage.textContent = message;
        gameState.battleLog.push(message);
    }

    // Initialize the game
    setupEventListeners();
});