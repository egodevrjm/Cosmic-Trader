<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cosmic Trader - Game</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/a1f7eae18c.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="game_style.css">
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" href="index.php">
                    <img src="images/logo.png" alt="Cosmic Trader Logo" class="logo">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="index.php">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Leaderboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Settings</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <section class="game-container">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="player-info">
                            <h2><i class="fas fa-user icon"></i> Player Name</h2>
                            <p><i class="fas fa-credit-card icon"></i> Credits: <span id="player-credits">1000</span></p>
                            <p><i class="fas fa-star icon"></i> Reputation: <span id="player-reputation">0</span></p>
                            <p><i class="fas fa-level-up-alt icon"></i> Level: <span id="player-level">1</span></p>
                        </div>
                        <div class="ship-info">
                            <h3><i class="fas fa-space-shuttle icon"></i> Ship Details</h3>
                            <p><i class="fa-solid fa-signature icon"></i> Name: <span id="ship-name">Starship</span></p>
                            <p><i class="fas fa-box icon"></i> Cargo Capacity: <span id="cargo-capacity">100</span></p>
                            <p><i class="fas fa-gas-pump icon"></i> Fuel: <span id="fuel-level">100%</span></p>
                        </div>
                        <div class="cargo-info">
                            <h3><i class="fas fa-boxes icon"></i> Cargo</h3>
                            <ul id="cargo-list"></ul>
                            <button id="transfer-fuel-button" class="btn btn-primary" style="display: none;">
                                <i class="fas fa-gas-pump"></i> Transfer Fuel to Ship
                            </button>
                        </div>
                        <div class="action-info">
                            <h2><i class="fas fa-cog icon"></i> Game Actions</h2>
                            <div class="game-actions">
                                <button id="travel-button" class="btn btn-primary"><i class="fas fa-globe"></i> Travel</button>
                                <button id="trade-button" class="btn btn-secondary" onclick="openTradeOverlay()"><i class="fas fa-exchange-alt"></i> Trade</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-8">
                        <div class="game-view">
                            <div class="map-container">
                                <div class="map-wrapper">
                                    <img src="images/game-map.png" alt="Game Map" class="img-fluid" id="game-map">
                                    <img src="" alt="Planet Image" class="img-fluid" id="planet-image" style="display: none;">
                                </div>
                            </div>
                            <div class="progress-container" id="progress-container" style="display: none;">
                                <div class="progress">
                                    <div class="progress-bar" id="progress-bar" role="progressbar" style="width: 0%;"></div>
                                    <img src="images/rocket-icon.png" alt="Rocket Icon" class="rocket-icon" id="rocket-icon">
                                </div>
                            </div>
                            <div class="location-info" id="location-info" style="display: none;">
                                <h2><i class="fa-solid fa-satellite-dish"></i> <span id="current-planet"></span></h2>
                                <div id="planet-info"></div>
                            </div>
                          
                        </div>
                    </div>
                </div>

                <!-- Overlays -->

                <div id="planet-overlay" class="overlay" style="display: none;">
                    <div class="overlay-content">
                        <div class="overlay-header">
                        <h2>Select Your Destination</h2>
                        <span class="overlay-close" onclick="closeOverlay('planet-overlay')">&times;</span>
                        </div>
                        <div class="overlay-body">
                        <div id="planet-list" class="planet-list">
                            <!-- Planet cards will be dynamically inserted here -->
                        </div>
                        </div>
                    </div>
                    </div>


            <div id="trade-overlay" class="overlay" style="display: none;">
            <div class="overlay-content">
                <div class="overlay-header">
                    <h2>Marketplace</h2>
                    <span class="overlay-close" onclick="closeOverlay('trade-overlay')">&times;</span>
                </div>
                <div class="overlay-body">
                        <div id="buy-section" class="trade-section">
                            <h3>Buy Goods</h3>
                            <ul id="buy-goods-list" class="goods-list"></ul>
                        </div>
                        <div id="sell-section" class="trade-section">
                            <h3>Sell Goods</h3>
                            <ul id="sell-goods-list" class="goods-list"></ul>
                        </div>
                    </div>
</div>
            </div>





                <div id="tutorial-overlay" class="overlay" style="display: none;">
                    <div class="overlay-content">
                        <div class="overlay-header">
                        <h2>Tutorial</h2>
                        <span class="overlay-close" onclick="closeTutorial()">&times;</span>
                        </div>
                        <div class="overlay-body">
                        <!-- Add your tutorial content here -->
                        <p>Welcome to Cosmic Trader!</p>
                        <p>Here's how to play the game...</p>
                        </div>
                    </div>
                    </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="game-log">
                            <h3><i class="fas fa-scroll icon"></i> Game Log</h3>
                            <ul id="log-entries">
                                <!-- Game log entries will be dynamically added here -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <p>&copy; 2023 Cosmic Trader. All rights reserved.</p>
                </div>
                <div class="col-lg-6">
                    <ul class="social-media">
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="game_script.js"></script>
</body>
</html>