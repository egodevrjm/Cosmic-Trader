<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cosmic Trader</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="index_style.css">
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="images/logo.png" alt="Cosmic Trader Logo" class="logo">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#home">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#features">Features</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#about">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <h1>Cosmic Trader</h1>
                        <h3>Navigating the Nebula of Commerce</h3>
                        <p class="lead">Embark on an epic journey through the vastness of space, trading goods and building your cosmic empire. As a shrewd merchant, you'll navigate the challenges of supply and demand, forge alliances, and outsmart your rivals in the quest for galactic dominance.</p>
                        <a href="game.php" class="btn btn-primary btn-lg">
                            <i class="fas fa-rocket"></i> Start Trading
                        </a>
                        <a href="tutorial.php" class="btn btn-secondary btn-lg">
                            <i class="fas fa-book"></i> Learn the Ropes
                        </a>
                    </div>
                    <div class="col-lg-6">
                        <img src="images/hero-image.png" alt="Cosmic Trader Hero Image" class="img-fluid">
                    </div>
                </div>
            </div>
        </section>

        <section id="features" class="features">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="feature">
                            <i class="fas fa-globe"></i>
                            <h4>Explore the Galaxy</h4>
                            <p>Discover new planets, each with its own unique resources and markets.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="feature">
                            <i class="fas fa-chart-line"></i>
                            <h4>Master the Market</h4>
                            <p>Buy low, sell high, and adapt to shifting economic conditions to maximize profits.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="feature">
                            <i class="fas fa-space-shuttle"></i>
                            <h4>Upgrade Your Fleet</h4>
                            <p>Customize and enhance your spaceships to tackle the challenges of interstellar trade.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="about" class="about">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <h2>About Cosmic Trader</h2>
                        <p>Cosmic Trader is a captivating space trading game that immerses you in the role of a galactic merchant. With its rich universe, diverse planets, and dynamic market system, Cosmic Trader offers endless possibilities for exploration, strategy, and economic conquest.</p>
                        <p>Whether you're a seasoned trader or a newcomer to the galaxy, Cosmic Trader provides a deep and rewarding experience. Forge your own path to success, build a formidable fleet, and leave your mark on the cosmic trade routes.</p>
                    </div>
                    <div class="col-lg-6">
                        <img src="images/about-image.png" alt="About Cosmic Trader" class="img-fluid">
                    </div>
                </div>
            </div>
        </section>

        <section id="contact" class="contact">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <h2>Contact Us</h2>
                        <p>If you have any questions, feedback, or suggestions, we'd love to hear from you. Feel free to reach out to us using the contact form or the provided email address.</p>
                        <ul class="contact-info">
                            <li><i class="fas fa-envelope"></i> info@atripto.space</li>
                           
                        </ul>
                    </div>
                    <div class="col-lg-6">
                        <form>
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter your name">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter your email">
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">Message</label>
                                <textarea class="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <p class="text-muted">&copy; 2023 Cosmic Trader. All rights reserved.</p>
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
</body>
</html>