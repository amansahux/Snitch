
export const welcomeEmailTemplate = (userName) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Snitch Atelier</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');

        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: 'Inter', Arial, sans-serif;
            color: #1a1a1a;
        }

        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f4f4f4;
            padding-bottom: 40px;
        }

        .main {
            background-color: #ffffff;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            color: #1a1a1a;
        }

        .header {
            padding: 40px 0 20px;
            text-align: center;
            background-color: #ffffff;
        }

        .logo {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 8px;
            text-transform: uppercase;
            color: #000000;
            text-decoration: none;
            display: block;
        }

        .hero-image {
            width: 100%;
            height: auto;
            display: block;
        }

        .content {
            padding: 60px 50px;
            text-align: center;
        }

        .greeting {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            font-weight: 400;
            margin-bottom: 24px;
            color: #1a1a1a;
            line-height: 1.2;
        }

        .message {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 40px;
            color: #4a4a4a;
            font-weight: 300;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
        }

        .cta-button {
            display: inline-block;
            background-color: #1a1a1a;
            color: #ffffff !important;
            padding: 20px 50px;
            text-decoration: none;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 3px;
            border-radius: 0;
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .footer {
            padding: 60px 50px;
            text-align: center;
            background-color: #000000;
            color: #ffffff;
        }

        .footer-logo {
            font-family: 'Playfair Display', serif;
            font-size: 22px;
            letter-spacing: 5px;
            margin-bottom: 30px;
            display: block;
            color: #D4AF37;
        }

        .social-links {
            margin-bottom: 20px;
        }

        .social-links a {
            color: #ffffff;
            text-decoration: none;
            margin: 0 10px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .copyright {
            font-size: 11px;
            color: #888888;
            letter-spacing: 1px;
        }

        @media screen and (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            .greeting {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main" width="100%">
            <!-- Header -->
            <tr>
                <td class="header">
                    <a href="https://snitch.co.in" class="logo">SNITCH</a>
                </td>
            </tr>

            <!-- Hero Image -->
            <tr>
                <td>
                    <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" alt="Luxury Fashion" class="hero-image">
                </td>
            </tr>

            <!-- Content -->
            <tr>
                <td class="content">
                    <h1 class="greeting">Welcome to the Inner Circle, ${userName}.</h1>
                    <p class="message">
                        You have officially joined Snitch. Discover a world where high-end craftsmanship meets contemporary design. Your journey into redefined luxury begins now.
                    </p>
                    <a href="https://snitch.co.in" class="cta-button">Explore the Collection</a>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td class="footer">
                    <span class="footer-logo">SNITCH ATELIER</span>
                    <div class="social-links">
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                        <a href="#">Facebook</a>
                    </div>
                    <p class="copyright">
                        &copy; 2026 SNITCH ATELIER. ALL RIGHTS RESERVED.<br>
                        IF YOU WISH TO NO LONGER RECEIVE THESE EMAILS, <a href="#" style="color: #888888; text-decoration: underline;">UNSUBSCRIBE</a>.
                    </p>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
  `;
};
