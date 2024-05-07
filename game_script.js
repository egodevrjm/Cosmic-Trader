// Global game data variable
let gameData = null;
let currentPlanet = null;
let currentShip = null;

// Load game data from JSON file and initialize the game
async function loadGameData() {
    const response = await fetch('gameData.json');
    gameData = await response.json();
    setupGame();
}

// Set up initial game UI based on loaded game data
function setupGame() {
    currentShip = gameData.ships[0];
    currentPlanet = gameData.planets.find(planet => planet.name === 'Home Base');

    document.getElementById('player-credits').textContent = currentShip.credits;
    document.getElementById('ship-name').textContent = currentShip.type;
    document.getElementById('cargo-capacity').textContent = currentShip.cargoCapacity;
    document.getElementById('fuel-level').textContent = `${currentShip.fuelCurrent}/${currentShip.fuelCapacity}`;
    updateCargoDisplay();
    updateHomeBaseDisplay(); // Display home base information
    checkPlanetAccessibility();
    updatePlanetDisplay();
    addLogEntry('Welcome to Cosmic Trader!');
    showTutorial();
}

function checkPlanetRequirements(planet) {
    switch (planet.name) {
      case 'Zyther':
        return true; // Make Zyther accessible by default
      case 'Aquilae':
        return true; // Make Aquilae accessible by default
      case 'Nebula':
        return currentShip.upgrades.engine === 'advanced engine'; // Require advanced engine for Nebula
      case 'Solaris':
        return currentShip.credits >= 10000; // Require 10,000 credits for Solaris
      case 'Glacius':
        return currentShip.upgrades.defenseSystem === 'military-grade shields'; // Require military-grade shields for Glacius
      default:
        return false;
    }
  }

// Update cargo display based on current ship's cargo
function updateCargoDisplay() {
    const cargoList = document.getElementById('cargo-list');
    cargoList.innerHTML = '';

    currentShip.cargoLoad.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} (${item.quantity})`;
        cargoList.appendChild(listItem);
    });
}

// Add new entry to the game log
function addLogEntry(message) {
    const logList = document.getElementById('log-entries');
    const logEntry = document.createElement('li');
    logEntry.textContent = message;
    logList.appendChild(logEntry);
    logList.scrollTop = logList.scrollHeight;
}

// Calculate distance between two planets
function calculateDistance(currentPlanet, destinationPlanet) {
    const dx = destinationPlanet.x - currentPlanet.x;
    const dy = destinationPlanet.y - currentPlanet.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function updateHomeBaseDisplay() {
    const locationInfo = document.getElementById('location-info');
    const planetInfo = document.getElementById('planet-info');
  
    if (currentPlanet && currentPlanet.name === 'Home Base') {
      document.getElementById('current-planet').textContent = currentPlanet.name;
      document.getElementById('planet-image').src = currentPlanet.image;
      document.getElementById('planet-image').style.display = 'block';
      document.getElementById('game-map').style.display = 'none';
  
      planetInfo.innerHTML = `
        <p>${currentPlanet.description}</p>
      `;
  
      locationInfo.style.display = 'block';
    } else {
      document.getElementById('planet-image').style.display = 'none';
      document.getElementById('game-map').style.display = 'block';
      locationInfo.style.display = 'none';
    }
  }

// Show overlay for selecting travel destination
function showPlanetOverlay() {
    const overlay = document.getElementById('planet-overlay');
    const planetList = document.getElementById('planet-list');
    planetList.innerHTML = '';
  
    gameData.planets.forEach(planet => {
      const planetCard = document.createElement('div');
      planetCard.className = 'planet-card';
  
      const planetImage = document.createElement('img');
      planetImage.src = planet.image;
      planetImage.alt = planet.name;
      planetImage.className = 'planet-image';
  
      const planetDetails = document.createElement('div');
      planetDetails.className = 'planet-details';
  
      const planetName = document.createElement('h3');
      planetName.textContent = planet.name;
      planetName.className = 'planet-name';
  
      const planetDescription = document.createElement('p');
      planetDescription.textContent = planet.description;
      planetDescription.className = 'planet-description';
  
      const planetGoods = document.createElement('div');
      planetGoods.className = 'planet-goods';
  
      const goodsHeading = document.createElement('h4');
      goodsHeading.textContent = 'Available Goods:';
  
      const goodsList = document.createElement('ul');
      planet.goods.forEach(good => {
        const goodItem = document.createElement('li');
        goodItem.textContent = `${good.name} - Price: ${good.currentPrice}`;
        goodsList.appendChild(goodItem);
      });
  
      planetGoods.appendChild(goodsHeading);
      planetGoods.appendChild(goodsList);
      
      const travelButton = document.createElement('button');
      travelButton.textContent = 'Travel Here';
      travelButton.className = 'btn btn-primary travel-btn';
      travelButton.onclick = () => selectDestination(planet.name);
  
      planetDetails.appendChild(planetName);
      planetDetails.appendChild(planetDescription);
      planetDetails.appendChild(planetGoods);
      planetDetails.appendChild(travelButton);
  
      planetCard.appendChild(planetImage);
      planetCard.appendChild(planetDetails);
  
      planetList.appendChild(planetCard);
    });
  
    overlay.style.display = 'block';
  }


// Select destination and handle travel logic
function selectDestination(planetName) {
    const destination = gameData.planets.find(p => p.name === planetName);
    if (destination) {
        const distance = calculateDistance(currentPlanet, destination);
        const fuelRequired = Math.round(distance / 10); // Adjust fuel consumption rate as needed

        if (currentShip.fuelCurrent >= fuelRequired) {
            currentShip.fuelCurrent -= fuelRequired;
            document.getElementById('fuel-level').textContent = `${currentShip.fuelCurrent}/${currentShip.fuelCapacity}`;

            handleTravel(destination, distance);
            closeOverlay('planet-overlay');
        } else {
            addLogEntry('Insufficient fuel for the journey.');
        }
    } else {
        console.error('Destination planet not found');
    }
}

function closeOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = 'none';
  }

// Handle logic when travel is initiated
function handleTravel(destination, distance) {
    const travelTime = Math.round(distance / 10); // Adjust travel speed as needed
    simulateTravelTime(destination, travelTime);
    addLogEntry(`Travel initiated to ${destination.name}.`);
    updateFuelTransferButtonVisibility();
}

function simulateTravelTime(destination, travelTime) {
    const mapImage = document.getElementById('game-map');
    const planetImage = document.getElementById('planet-image');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const rocketIcon = document.getElementById('rocket-icon');
    const locationInfo = document.getElementById('location-info');

    // Ensuring the map image is visible and the specific planet image is hidden
    mapImage.style.display = 'block';  // Make sure the map is visible
    mapImage.src = 'images/game-map-traveling.gif';
    planetImage.style.display = 'none';  // Hide the planet image during travel
    progressContainer.style.display = 'block';
    locationInfo.style.display = 'none';
    progressBar.style.width = '0%';
    rocketIcon.style.left = '0%';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        rocketIcon.style.left = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                mapImage.src = 'images/game-map.png';  // Reset the map image back to the normal map
                planetImage.src = destination.image;   // Update planet image to the destination
                planetImage.style.display = 'block';   // Show planet image after arrival
                progressContainer.style.display = 'none';
                addLogEntry(`Arrived at ${destination.name}.`);
                currentPlanet = destination;
                autoTransferFuel();
                updatePlanetDisplay();
                checkRandomEvent();
            }, 500);
        }
    }, travelTime * 10);
}


function updateFuelTransferButtonVisibility() {
    const fuelItem = currentShip.cargoLoad.find(item => item.name === "Fuel");
    const transferFuelButton = document.getElementById('transfer-fuel-button');

    if (fuelItem && fuelItem.quantity > 0) {
        transferFuelButton.style.display = 'block';
    } else {
        transferFuelButton.style.display = 'none';
    }
}

function checkPlanetAccessibility() {
    gameData.planets.forEach(planet => {
      if (!planet.isAccessible) {
        const meetsRequirements = checkPlanetRequirements(planet);
        planet.isAccessible = meetsRequirements;
      }
    });
  }
  
  function checkPlanetRequirements(planet) {
    // Check specific requirements for each planet
    switch (planet.name) {
      case 'Solaris':
        // Example requirement: Player must have a specific ship upgrade
        return currentShip.upgrades.engine === 'advanced engine';
      case 'Glacius':
        // Example requirement: Player must have a minimum amount of credits
        return currentShip.credits >= 10000;
      // Add more cases for other planets and their respective requirements
      default:
        return false;
    }
  }

// Update planet display with current planet information
function updatePlanetDisplay() {
    document.getElementById('current-planet').textContent = currentPlanet.name;
    document.getElementById('planet-image').src = currentPlanet.image;

    const locationInfo = document.getElementById('location-info');
    const planetInfo = document.getElementById('planet-info');

    const availableGoods = currentPlanet.goods.concat(gameData.coreCommodities);
    planetInfo.innerHTML = `
        <p>${currentPlanet.description}</p>
        <h4>Available Goods:</h4>
        <ul>
            ${availableGoods.map(good => `<li>${good.name} - Price: ${good.currentPrice}</li>`).join('')}
        </ul>
    `;

    locationInfo.style.display = 'block';
}

function buyUpgrade(upgrade) {
    // ... existing code ...
  
    checkPlanetAccessibility();
  }
  
  function earnCredits(amount) {
    // ... existing code ...
  
    checkPlanetAccessibility();
  }

function buyGoods(goodName, button) {
    const quantityInput = button.previousElementSibling;
    const quantity = parseInt(quantityInput.value, 10);
    const good = currentPlanet.goods.find(g => g.name === goodName) || gameData.coreCommodities.find(g => g.name === goodName);

    if (good && quantity > 0) {
        const totalPrice = good.currentPrice * quantity;
        if (currentShip.credits >= totalPrice && (currentShip.cargoCapacity - currentShip.cargoLoad.reduce((acc, item) => acc + item.quantity, 0)) >= quantity) {
            currentShip.credits -= totalPrice;
            const cargoItem = currentShip.cargoLoad.find(item => item.name === goodName);
            if (cargoItem) {
                cargoItem.quantity += quantity;
            } else {
                currentShip.cargoLoad.push({ name: goodName, quantity: quantity });
            }      
            updateCargoDisplay();
            document.getElementById('player-credits').textContent = currentShip.credits;
            addLogEntry(`Bought ${quantity} units of ${goodName} for ${totalPrice} credits.`);
        } else {
            addLogEntry('Insufficient credits or cargo space.');
        }
    } else {
        addLogEntry('Invalid quantity entered.');
    }
}

function sellGoods(goodName, button) {
    const quantityInput = button.previousElementSibling;
    const quantity = parseInt(quantityInput.value, 10);
    const cargoItem = currentShip.cargoLoad.find(item => item.name === goodName);

    if (cargoItem && quantity > 0 && quantity <= cargoItem.quantity) {
        const totalPrice = currentPlanet.goods.find(g => g.name === goodName).currentPrice * quantity;
        currentShip.credits += totalPrice;
        cargoItem.quantity -= quantity;
        if (cargoItem.quantity === 0) {
            currentShip.cargoLoad.splice(currentShip.cargoLoad.indexOf(cargoItem), 1);
        }
        updateCargoDisplay();
        document.getElementById('player-credits').textContent = currentShip.credits;
        addLogEntry(`Sold ${quantity} units of ${goodName} for ${totalPrice} credits.`);
    } else {
        addLogEntry(`Invalid quantity entered or insufficient stock of ${goodName}.`);
    }
}


function populateTradeList() {
    const goodsList = document.getElementById('buy-goods-list');
    goodsList.innerHTML = ''; // Clear existing list

    gameData.coreCommodities.forEach(good => {
        const listItem = document.createElement('li');
        listItem.className = 'good-item';

        listItem.innerHTML = `
            <div class="good-image"><img src="${good.imageUrl}" alt="${good.name}"></div>
            <div class="good-info">
                <h3>${good.name}</h3>
                <p>Price: ${good.currentPrice}</p>
                <p>Available: ${good.quantity}</p>
                <input type="number" min="1" value="1">
                <button onclick="buyGoods('${good.name}', this)">Buy</button>
            </div>
        `;

        goodsList.appendChild(listItem);
    });
}


function openTradeOverlay() {
    const buyGoodsList = document.getElementById('buy-goods-list');
    const sellGoodsList = document.getElementById('sell-goods-list');

    buyGoodsList.innerHTML = '';
    sellGoodsList.innerHTML = '';

    const availableGoods = currentPlanet.goods.concat(gameData.coreCommodities);
    availableGoods.forEach(good => {
        const buyItem = document.createElement('li');
        buyItem.className = 'trade-item';
        buyItem.innerHTML = `
            <span>${good.name}</span>
            <span>Price: ${good.currentPrice}</span>
            <input type="number" min="1" value="1">
            <button class="btn btn-primary btn-sm" onclick="buyGoods('${good.name}', this)">Buy</button>
        `;
        buyGoodsList.appendChild(buyItem);

        const cargoItem = currentShip.cargoLoad.find(item => item.name === good.name);
        if (cargoItem) {
            const sellItem = document.createElement('li');
            sellItem.className = 'trade-item';
            sellItem.innerHTML = `
                <span>${good.name}</span>
                <span>Price: ${good.currentPrice}</span>
                <input type="number" min="1" max="${cargoItem.quantity}" value="1">
                <button class="btn btn-primary btn-sm" onclick="sellGoods('${good.name}', this)">Sell</button>
            `;
            sellGoodsList.appendChild(sellItem);
        }
    });

    document.getElementById('trade-overlay').style.display = 'block';
}

function closeOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Optionally, provide a UI button for manual fuel transfer
document.getElementById('transfer-fuel-button').addEventListener('click', () => {
    autoTransferFuel();
    updateFuelTransferButtonVisibility();
});

function autoTransferFuel() {
    if (currentShip.fuelCurrent < currentShip.fuelCapacity * 0.5) {
        const fuelNeeded = currentShip.fuelCapacity - currentShip.fuelCurrent;
        const fuelUnitsNeeded = Math.ceil(fuelNeeded / (currentShip.fuelCapacity * 0.5));

        const fuelItem = currentShip.cargoLoad.find(item => item.name === "Fuel");
        if (fuelItem && fuelItem.quantity > 0) {
            const fuelToTransfer = Math.min(fuelUnitsNeeded, fuelItem.quantity);
            const fuelToAdd = fuelToTransfer * (currentShip.fuelCapacity * 0.5);
            currentShip.fuelCurrent += fuelToAdd;
            fuelItem.quantity -= fuelToTransfer;

            if (currentShip.fuelCurrent > currentShip.fuelCapacity) {
                currentShip.fuelCurrent = currentShip.fuelCapacity;
            }

            document.getElementById('fuel-level').textContent = `${currentShip.fuelCurrent}/${currentShip.fuelCapacity}`;
            updateCargoDisplay();
            addLogEntry(`${fuelToAdd} units of fuel added to the ship.`);

            if (fuelItem.quantity === 0) {
                const index = currentShip.cargoLoad.indexOf(fuelItem);
                currentShip.cargoLoad.splice(index, 1);
            }
        } else {
            addLogEntry('No fuel in cargo to transfer.');
        }
    } else {
        addLogEntry('Fuel level sufficient, no transfer needed.');
    }
}

// Attach event listeners after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadGameData();

    document.getElementById('travel-button').addEventListener('click', showPlanetOverlay);
    document.getElementById('trade-button').addEventListener('click', openTradeOverlay);
});

// Overlay dragging functionality
let isDragging = false;
let currentOverlay = null;
let offsetX = 0;
let offsetY = 0;

function startDragging(overlay, event) {
    isDragging = true;
    currentOverlay = overlay;
    offsetX = event.clientX - overlay.offsetLeft;
    offsetY = event.clientY - overlay.offsetTop;
}

function stopDragging() {
    isDragging = false;
    currentOverlay = null;
}

function dragOverlay(event) {
    if (isDragging && currentOverlay) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        currentOverlay.style.left = mouseX - offsetX + 'px';
        currentOverlay.style.top = mouseY - offsetY + 'px';
    }
}

document.addEventListener('mousedown', (event) => {
    if (event.target.closest('.overlay-header')) {
        const overlay = event.target.closest('.overlay');
        startDragging(overlay, event);
    }
});

document.addEventListener('mouseup', stopDragging);
document.addEventListener('mousemove', dragOverlay);

// Tutorial functionality
function showTutorial() {
    const tutorialOverlay = document.getElementById('tutorial-overlay');
    tutorialOverlay.style.display = 'block';
}

function closeTutorial() {
    const tutorialOverlay = document.getElementById('tutorial-overlay');
    tutorialOverlay.style.display = 'none';
}

// Random event functionality
function checkRandomEvent() {
    const randomNum = Math.random();
    if (randomNum < 0.1) {
        const eventIndex = Math.floor(Math.random() * currentPlanet.events.length);
        const event = currentPlanet.events[eventIndex];
        handleRandomEvent(event);
    }
}

function handleRandomEvent(event) {
    switch (event.type) {
        case 'marketBoom':
            currentPlanet.goods.forEach(good => {
                good.currentPrice *= event.effectOnPrices;
            });
            addLogEntry(`A market boom occurred on ${currentPlanet.name}. Prices have increased.`);
            break;
        case 'pirateAttack':
            currentShip.cargoLoad = currentShip.cargoLoad.filter(item => item.name !== 'Fuel');
            addLogEntry('Pirates attacked your ship and stole all your fuel!');
            break;
        // Add more cases for different event types
        default:
            break;
    }
}