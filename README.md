# Crypto-Exchange-API
Crypto Exchange API
A simpler API built with Node.js, Express.js and MongoDB.

- Register
- Buy/Sell Crypto
- Transfer to another users
- View wallet and Transaction history

-----

Tech to use
- Node.js
- Express.js
- MongoDB (Mongoose)
- Postman (for testing)

-----

Setup
1. Clone the project
git clone https://github.com/pacharakanarsa/Crypto-Exchange-API.git
cd Crypto-Exchange-API

2. Install dependencies
npm install

3. Create database in MongoDB or use mine URL in step 4
	3.1 Go to Mongo Atlas
	3.2 Create a new project and cluster
	3.3 Create a database
	3.4 Get your MongoDB Connection String to use in .env file (ex. "mongodb+srv://<user>:<pass>@cluster0.mongodb.net/crypto-exchange?retryWrites=true&w=majority")

4. Configure .env file
Create .env file in project and paste
code in .env file

PORT = 3000
MONGO_URL=your_mongodb_connection_url

or use mine
MONGO_URL=mongodb+srv://pacharakanarsa:0CunJApq3hFkDKyx@cluster0.gmfrmwt.mongodb.net/

6. Start the server
run this command in bash
node app.js

Test API on Postman
Server will run on: http://localhost:3000

1. Register User
POST http://localhost:3000/api/users
Body using json:
{
    "name": "Your username",
    "email": "yourgmailname@gmail.com",
    "password": "password"
}

2.View all User
GET  http://localhost:3000/api/users

3. Check user wallet
GET  http://localhost:3000/api/user/{userId}/wallet

4. Buy Crypto
POST http://localhost:3000/api/transaction/buy
Body:
{
    "userId": "userId from register",
    "currency": "BTC/ETH/XRP/DOGE",
    "amount": *number*,
    "price": *number*
}

5. Sell crypto
POST  http://localhost:3000/api/transactions/sell
Body:
{
  "userId": "userId",
  "currency": "BTC/ETH/XRP/DOGE",
  "amount": *number*,
  "price": *number*
}

6. Transfer crypto
POST http://localhost:3000/api/transactions/transfer
Body:
{
  "fromUserId": "your userId",
  "toUserId": "receiver userId",
  "currency": "BTC/ETH/XRP/DOGE",
  "amount": *number*
}

7. Check transaction history
GET  http://localhost:3000/api/transactions/list/{userId}
