# NeatoFood

A multi-stack food price comparison application with three backend/frontend options.

## 🎯 Project Overview

Develop a webapp to compare food prices in and around town.

## 🏗️ Architecture

This repository contains three independent implementations:

1. **Spring Boot Backend** (Java/Gradle) - Original implementation
2. **Django Backend** (Python) - REST API with Django REST Framework
3. **Expo Frontend** (React Native) - Mobile application

## 📁 Project Structure

```
NeatoFood/
├── src/                    # Spring Boot application
├── django-backend/         # Django REST API
├── expo-frontend/          # Expo React Native app
├── build.gradle           # Spring Boot build config
├── .gitignore            # Comprehensive ignore file
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- **For Spring Boot**: Java 17+, Gradle
- **For Django**: Python 3.8+, pip
- **For Expo**: Node.js 16+, npm, Expo CLI

### Running Spring Boot Backend

```bash
# Build and run
./gradlew bootRun

# The application will start on http://localhost:8080
```

### Running Django Backend

```bash
cd django-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver 8000

# API available at http://localhost:8000/api/
```

### Running Expo Frontend

```bash
cd expo-frontend

# Install dependencies
npm install

# Update API URL in api/client.js for your environment
# - Android emulator: http://10.0.2.2:8000
# - iOS simulator: http://localhost:8000
# - Physical device: http://YOUR_COMPUTER_IP:8000

# Start Expo
npm start

# Scan QR code with Expo Go app or press 'i' for iOS, 'a' for Android
```

## 🔧 Configuration

### Django Backend

1. Copy `.env.example` to `.env` in `django-backend/`
2. Update environment variables as needed
3. Configure database settings in `settings.py`

### Expo Frontend

1. Edit `expo-frontend/api/client.js`
2. Update `API_BASE_URL` to point to your Django backend

## 📚 API Documentation

### Django Endpoints

- `GET /api/health/` - Health check endpoint

(Add more endpoints as you develop)

## 🛠️ Development

### Django - Create New App

```bash
cd django-backend
python manage.py startapp your_app_name
```

### Expo - Add Dependencies

```bash
cd expo-frontend
npm install package-name
```

### Spring Boot - Add Dependencies

Edit `build.gradle` and run:
```bash
./gradlew build
```

## 📱 Testing

### Django Tests

```bash
cd django-backend
python manage.py test
```

### Expo Tests

```bash
cd expo-frontend
npm test
```

## 📦 Deployment

Refer to individual README files in each directory for deployment instructions:
- `django-backend/README.md`
- `expo-frontend/README.md`

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

