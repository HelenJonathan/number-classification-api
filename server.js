require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Utility functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isPerfect = (num) => {
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return num !== 1 && sum === num;
};

const isArmstrong = (num) => {
  const digits = Math.abs(num).toString().split("");
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(parseInt(digit), power),
    0
  );
  return sum === Math.abs(num);
};

// Support negative numbers for digit sum calculation
const getDigitSum = (num) =>
  Math.abs(num)
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit), 0);

// Root route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Number Classification API! Use /api/classify-number?number=371 to get number properties."
  );
});

// API Endpoint using query parameter
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;

  // Validate input
  if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
    return res.status(400).json({ number: "alphabet", error: true });
  }

  const num = parseInt(number);

  // Determine properties
  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  // Get fun fact
  let funFact = "No fun fact available.";
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
    funFact = response.data.text;
  } catch (error) {
    console.error("Error fetching fun fact:", error.message);
  }

  // JSON response
  res.json({
    number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfect(num),
    properties,
    digit_sum: getDigitSum(num),
    fun_fact: funFact,
  });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
