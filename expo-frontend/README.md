# NeatoFood Mobile App

Expo React Native frontend for NeatoFood application.

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
