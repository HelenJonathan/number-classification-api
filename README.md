# Number Classification API

## Description
This is a simple API that takes a number as input and returns its mathematical properties along with a fun fact. It classifies the number based on whether it is prime, perfect, Armstrong, odd/even, and also provides the sum of its digits.

## Features
- Determines if a number is **prime**
- Checks if a number is **perfect**
- Identifies **Armstrong numbers**
- Classifies numbers as **odd or even**
- Computes the **sum of digits**
- Fetches a **fun fact** about the number from the Numbers API
- Returns responses in **JSON format**

## Technologies Used
- Node.js
- Express.js
- Axios (for external API requests)
- CORS

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/number-classification-api.git
   cd number-classification-api
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

   ```
4. **Run the server:**
   ```sh
   node server.js
   ```

## Usage
### API Endpoint
#### **GET /api/classify-number?number=371**

**Example Request:**
```
GET http://localhost:4000/api/classify-number?number=371
```

**Example Response:**
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Error Handling
If an invalid number is provided, the API returns:
```json
{
    "number": "invalid",
    "error": true
}
```

