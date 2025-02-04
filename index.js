// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Utility Functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isPerfect = (num) => {
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num && num !== 1;
};

const isArmstrong = (num) => {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  return digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0) === num;
};

const getDigitSum = (num) =>
  num
    .toString()
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

// API Route
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;
  const num = parseInt(number, 10);

  if (isNaN(num)) {
    return res.status(400).json({ number, error: true });
  }

  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  try {
    const funFactResponse = await axios.get(
      `http://numbersapi.com/${num}/math`
    );
    const funFact = funFactResponse.data;

    res.json({
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties,
      digit_sum: getDigitSum(num),
      fun_fact: funFact,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch fun fact" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
