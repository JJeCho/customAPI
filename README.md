
# **Custom API**

## **Overview**

This project is a **custom-built API** using **Node.js** and **Express**, offering a wide range of services including weather forecasts, currency exchange rates, news aggregation, and more. The API integrates with various third-party services and is organized into multiple routes for specific functionalities.

---

## **Features**

- **Weather Forecast**: Provides current and historical weather data, climate projections, and ensemble models.
- **Currency Exchange**: Offers real-time and historical currency exchange rates.
- **News Aggregation**: Fetches the latest news headlines and allows searches based on keywords.
- **Quote Services**: Retrieves quotes and checks for inappropriate language.
- **Color Information**: Generates color palettes and provides details about specific colors.
- **Environmental Data**: Includes air quality, marine forecasts, geocoding, elevation, and flood data.

---

## **Project Structure**

- **`index.js`**: The main entry point of the application.

- **`routes/`**: Contains all the route handlers for different API endpoints.
    - **`ai.js`**: Handles AI-related requests, such as interacting with GPT-3.
    - **`authorization.js`**: Manages user authentication and authorization.
    - **`color.js`**: Provides color-related functionalities.
    - **`currency.js`**: Handles currency exchange and conversion requests.
    - **`environment.js`**: Provides environmental data, including air quality, marine forecasts, geocoding, elevation, and flood information.
    - **`news.js`**: Aggregates news articles and allows searching for specific topics.
    - **`quote.js`**: Fetches quotes and checks for inappropriate language.
    - **`utils.js`**: Utility functions used across different routes.
    - **`weather.js`**: Provides weather-related data, including current weather, historical weather, ensemble models, and climate projections.

- **`models/`**: Contains Mongoose models for interacting with MongoDB.
    - **`User.js`**: The user model for handling user data.

- **`middlewares/`**: Contains custom middleware for the application.
    - **`auth.js`**: Middleware for authentication.
    - **`rateLimit.js`**: Middleware for rate limiting requests.
    - **`requestTime.js`**: Middleware for logging request times.
    - **`timelog.js`**: Middleware for logging the time of requests.

- **`.gitignore`**: Specifies files and directories to be ignored by Git.

---

## **Getting Started**

### **Prerequisites**

- **Node.js**: Ensure you have Node.js installed on your machine.
- **MongoDB**: Set up a MongoDB database for storing user data.
- **API Keys**: You will need API keys for various third-party services used in the project (e.g., Open-Meteo, SerpAPI).

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/customAPI.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd customAPI
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

### **Configuration**

- Create a `.env` file in the root directory with the following environment variables:
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   OPENAI_API_KEY=your_openai_api_key
   NEWS_API_KEY=your_newsapi_key
   SERPAPI_KEY=your_serpapi_key
   ACCESS_TOKEN_SECRET=your_jwt_secret
   ```

### **Running the Application**

- Start the application by running:
   ```bash
   npm start
   ```
- The server will start on the specified port (default is 5000). You can then access the API endpoints via `http://localhost:5000`.

---

## **API Endpoints**

### **Weather**

- **GET `/weather`**: Fetch current weather information.
- **GET `/weather/historical`**: Fetch historical weather data.
- **GET `/weather/ensemble`**: Fetch ensemble model data.
- **GET `/weather/climate`**: Fetch climate projections.

### **Currency**

- **GET `/currency/latest`**: Fetch the latest exchange rates.
- **GET `/currency/convert`**: Convert between currencies.
- **GET `/currency/historical`**: Fetch historical exchange rates.

### **News**

- **GET `/news`**: Fetch the latest top news.
- **GET `/news/search`**: Search for news articles based on keywords.
- **GET `/news/floridaman`**: Fetch "Florida Man" articles.

### **Quote**

- **GET `/quote`**: Fetch a random quote.
- **POST `/check-language`**: Check a text for bad language.

### **Color**

- **GET `/colors/theme`**: Fetch a color theme.
- **GET `/colors/complementary`**: Get complementary colors for a given color.

### **Environment**

- **GET `/marine`**: Fetch marine forecast data.
- **GET `/air-quality`**: Fetch air quality data.
- **GET `/geocode`**: Geocode a location query.
- **GET `/elevation`**: Fetch elevation data for a location.
- **GET `/flood`**: Fetch flood data for a location.

---

## **Contributing**

Feel free to submit issues or pull requests if you have suggestions or improvements.

---

## **License**

This project is licensed under the MIT License.
