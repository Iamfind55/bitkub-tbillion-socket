const express = require("express");
const { createServer } = require("node:http");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file
const { Server } = require("socket.io");
const { default: axios } = require("axios");
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "http://localhost";
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors()); // Use cors middleware
app.set("view engine", "ejs");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.get("/", (req, res) => {
  console.log("Hello World");
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    if (data.route == "/trade") {
      io.emit("message", "data trade");
    }
    if (data.route == "/user") {
      io.emit("message", "data users");
    }
    if (data.route == "/product") {
      io.emit("message", "data product");
    }
  });
});

// get data from client
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});

// send data to client
io.on("connection", (socket) => {
  socket.emit("message", "Hello from server Socket.io");
});

// Interval to fetch data every 3 seconds
// const interval1 = setInterval(() => {
//   Promise.all([
//     fetchBTCUSDT(),
//     fetchETHUSDT(),
//     fetchBNBUSDT(),
//     fetchXRPUSDT(),
//   ]).then((responses) => {
//     const [btcData, ethData, bnbData, xrpData] = responses;
//     io.emit("BTCUSDT", btcData);
//     io.emit("ETHUSDT", ethData);
//     io.emit("BNBUSDT", bnbData);
//     io.emit("XRPUSDT", xrpData);
//   });
// }, 3000);

const interval2 = setInterval(() => {
  io.emit("refresh", "refresh data");
}, 5000);

// const interval3 = setInterval(() => {
//   Promise.all([fetchOURUSERS()]).then((responses2) => {
//     const [userData] = responses2;
//     io.emit("OURUSERS", userData);
//   });
// }, 3000);

server.listen(PORT, () => {
  console.log("server running at" + URL + ":" + PORT);
});

// get PORT from env

// async function fetchBTCUSDT() {
//   try {
//     const response = await axios.get(
//       "https://www.binance.com/api/v3/uiKlines?limit=1&symbol=BTCUSDT&interval=1m"
//     ); // Replace with your API endpoint
//     return response?.data; // Returns the data from the API response
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Handle or rethrow the error as needed
//   }
// }
// async function fetchETHUSDT() {
//   try {
//     const response = await axios.get(
//       "https://www.binance.com/api/v3/uiKlines?limit=1&symbol=ETHUSDT&interval=1m"
//     ); // Replace with your API endpoint
//     return response?.data; // Returns the data from the API response
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Handle or rethrow the error as needed
//   }
// }

// async function fetchBNBUSDT() {
//   try {
//     const response = await axios.get(
//       "https://www.binance.com/api/v3/uiKlines?limit=1&symbol=BNBUSDT&interval=1m"
//     ); // Replace with your API endpoint
//     return response?.data; // Returns the data from the API response
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Handle or rethrow the error as needed
//   }
// }

// async function fetchXRPUSDT() {
//   try {
//     const response = await axios.get(
//       "https://www.binance.com/api/v3/uiKlines?limit=1&symbol=XRPUSDT&interval=1m"
//     ); // Replace with your API endpoint
//     return response?.data; // Returns the data from the API response
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Handle or rethrow the error as needed
//   }
// }

// async function fetchOURUSERS() {
//   try {
//     const response = await axios.get(
//       "https://www.binance.com/bapi/bigdata/v1/public/bigdata/homePage/registeredUserCount"
//     ); // Replace with your API endpoint
//     return response?.data; // Returns the data from the API response
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Handle or rethrow the error as needed
//   }
// }

// async function fetchCURRENCY() {
//   try {
//     const response = await axios.get(
//       "https://www.binance.com/bapi/bigdata/v1/public/bigdata/homePage/registeredUserCount"
//     ); // Replace with your API endpoint
//     return response?.data; // Returns the data from the API response
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Handle or rethrow the error as needed
//   }
// }
