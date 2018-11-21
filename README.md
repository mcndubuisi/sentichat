# Sentichat

Sentichat is an instant messaging app. It uses AFINN-111 wordlist to perform sentiment analysis on conversations for positive or negative sentiment and changes the background accordingly. The web application analyses sentiment on a scale of -5 (negative) to 5 (positive) and generates background gradient (red for negative, blue for positive and green for neutral) depending on the overall sentiment scale.

![Sentichat Cover Photo](/public/img/sentichat.png)

How to run the app locally:

* Run npm install to install all needed dependencies
* Then start the server using node sentichat.js
* Navigate to your browser http://localhost:3000/ to view the app
