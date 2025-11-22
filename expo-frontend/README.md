# NeatoFood - Price Comparison App

Multi-page Expo React Native app with Bootstrap-inspired styling for comparing food prices across different locations.

## 📱 App Structure

### 1. **Home Page** (`screens/HomeScreen.js`)
- Category selector: ☕ Drinks | 🍰 Desserts | 🥪 Sandwiches | 🍿 Snacks
- "Compare Prices" button
- Sidebar navigation with Areas, About Us, and Map

### 2. **Comparison Page** (`screens/ComparisonScreen.js`)
- Title: "Cheapest Places for [Category]"
- Table displaying: Place Name | Item | Price | Rating | Details button
- Sorted by price (cheapest first)
- Back to Home navigation

### 3. **Place Details Page** (`screens/PlaceDetailsScreen.js`)
- Place name with star rating & review count
- Full address with location icon
- Item name & price
- "Open in Google Maps" button (shows alert - non-functional as requested)
- "Back to Comparison" button

### 4. **About Us Page** (`screens/AboutUsScreen.js`)
- Mission statement and app description
- What we do and how it works
- Coverage areas information
- Contact information
- Step-by-step guide

### 5. **Areas Page** (`screens/AreasScreen.js`)
- Toggle between University of Leicester and City Centre
- List of all places in each area with:
  - Category badges
  - Specialties
  - Opening hours
  - Building/location information

### 6. **Map Page** (`screens/MapScreen.js`)
- **Left side**: Interactive map showing all locations
  - University area pins
  - City centre area pins
  - Click pins to select places
- **Right side**: List of all places with key information
  - Place name and category
  - Rating with stars
  - Address
  - Price range
  - Specialties
  - Synced selection with map

## ✨ Key Features

✅ **No Login System** - Direct access to all features
✅ **Category-based Navigation** - Browse by food type
✅ **Price Comparison Tables** - Find the best deals
✅ **Detailed Place Information** - Everything you need to know
✅ **Bootstrap CSS Styling** - Professional, clean design
✅ **Backend Integration** - Connects to Spring Boot API with fallback data

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device (optional)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update API URL:
   - Edit `api/client.js` and update `API_BASE_URL`:
     - For Android emulator: `http://10.0.2.2:8080`
     - For iOS simulator: `http://localhost:8080`
     - For physical device: `http://YOUR_COMPUTER_IP:8080`

3. Start the development server:
```bash
npm start
```

## Running the App

### On Mobile Device (Recommended for Testing)
1. Install Expo Go from App Store (iOS) or Play Store (Android)
2. Run `npm start`
3. Scan the QR code with Expo Go app

### On Simulator/Emulator
- iOS: `npm run ios` (requires Xcode on macOS)
- Android: `npm run android` (requires Android Studio)
- Web: `npm run web`

## Project Structure

```
expo-frontend/
├── App.js              # Main app component
├── api/
│   ├── client.js       # Axios configuration
│   └── endpoints.js    # API endpoint functions
├── assets/             # Images, fonts, etc.
├── app.json           # Expo configuration
└── package.json       # Dependencies
```

## Connecting to Backend

Make sure your Spring Boot backend is running on port 8080 before testing the app. The app includes a health check feature to verify backend connectivity.

## Building for Production

For production builds, refer to [Expo documentation](https://docs.expo.dev/build/introduction/).
