# NeatoFood

A food price comparison application with Spring Boot backend and Expo React Native frontend.

## 🎯 Project Overview

Develop a webapp to compare food prices in and around town.

## 🏗️ Architecture

This repository contains:

1. **Spring Boot Backend** (Java/Gradle) - REST API server
2. **Expo Frontend** (React Native) - Cross-platform mobile application

## 📁 Project Structure

```
NeatoFood/
├── src/                    # Spring Boot application
├── expo-frontend/          # Expo React Native app
├── build.gradle           # Spring Boot build config
├── .gitignore            # Comprehensive ignore file
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- **For Spring Boot**: Java 17+, Gradle
- **For Expo**: Node.js 16+, npm, Expo CLI, Watchman (macOS)

### Running Spring Boot Backend

```bash
# Build and run
./gradlew bootRun

# The application will start on http://localhost:8080
```

### Running Expo Frontend

```bash
cd expo-frontend

# Install dependencies
npm install

# Update API URL in api/client.js for your environment
# - Android emulator: http://10.0.2.2:8080
# - iOS simulator: http://localhost:8080
# - Physical device: http://YOUR_COMPUTER_IP:8080

# Start Expo
npm start

# Scan QR code with Expo Go app or press 'i' for iOS, 'a' for Android
```

## 🔧 Configuration

### Spring Boot Backend

Configure application properties in `src/main/resources/application.properties`

### Expo Frontend

1. Edit `expo-frontend/api/client.js`
2. Update `API_BASE_URL` to point to your Spring Boot backend (default: `http://localhost:8080`)

## 📚 API Documentation

### Spring Boot Endpoints

- Add your API endpoints here as you develop

## 🛠️ Development

### Spring Boot - Add Dependencies

Edit `build.gradle` and run:
```bash
./gradlew build
```

### Expo - Add Dependencies

```bash
cd expo-frontend
npm install package-name
```

## 📱 Testing

### Spring Boot Tests

```bash
./gradlew test
```

### Expo Tests

```bash
cd expo-frontend
npm test
```

## 📦 Deployment

Refer to `expo-frontend/README.md` for Expo deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

[Add your license here]

## 👥 Authors

[Add authors here]

