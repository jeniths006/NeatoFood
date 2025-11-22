# NeatoFood - Expo with Bootstrap CSS Styling

This Expo React Native app implements your Figma designs using Bootstrap-inspired styling in React Native StyleSheet.

## 🎨 Bootstrap-Inspired Implementation

### Layout Structure
- **Sidebar** (like Bootstrap `col-md-3`): Pink/rose color (#c89797)
- **Main Content** (like Bootstrap `col-md-9`): Gray background (#d3d3d3)
- **Cards** (like Bootstrap `.card`): White category cards with shadows
- **Buttons** (like Bootstrap `.btn-light` and `.btn-outline`): Styled buttons throughout

### Features Implemented

✅ **Sidebar Navigation**
- Logo placeholder
- Brand name "NeatoFood"
- Areas section (University of Leicester, Leicester City Centre)
- About Us and Map buttons
- Bootstrap `.btn-light` styling

✅ **Top Navigation**
- Search bar with icon (Bootstrap `.form-control` style)
- Login and Sign Up buttons (Bootstrap `.btn-outline` style)

✅ **Categories Grid**
- 4 category cards: Drinks, Desserts, Sandwiches, Snacks
- Bootstrap `.card` styling with shadows and rounded corners
- Responsive 2-column layout
- Item cards within each category

✅ **Interactive Features**
- Real-time search filtering
- Fetches items from Spring Boot backend
- Fallback placeholder data if backend unavailable
- Touch interactions throughout

## 🚀 How to Run

1. **Start the Expo app:**
```bash
cd expo-frontend
npm start
```

2. **Run on your preferred platform:**
- Press `w` for web browser
- Press `i` for iOS simulator (Mac only)
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

3. **Start your Spring Boot backend** (optional):
```bash
cd ..
./gradlew bootRun
```

## 📱 Best Platform

This works best on **web** (`npm start` then press `w`) since it's designed for a desktop/tablet layout with a sidebar.

## 🎨 Bootstrap CSS Classes Replicated

- `.container-fluid` → flexDirection: 'row'
- `.col-md-3` → width: 250 (sidebar)
- `.col-md-9` → flex: 1 (main content)
- `.btn-light` → backgroundColor: '#e8e8e8'
- `.btn-outline` → borderWidth: 1, borderColor: '#333'
- `.card` → backgroundColor: 'white', borderRadius: 12, shadow
- `.form-control` → padding, borderRadius, backgroundColor
- `.row` → flexDirection: 'row', flexWrap: 'wrap'

## 🌈 Color Scheme

Matches your Figma design:
- Sidebar: `#c89797` (dusty rose/pink)
- Main background: `#d3d3d3` (light gray)
- Cards: `#ffffff` (white)
- Buttons: `#e8e8e8` (light gray)
- Text: `#333333` (dark gray)

## 📦 Dependencies

All dependencies are already in your `package.json`:
- `expo` - React Native framework
- `react-native` - Native components
- `axios` - API calls to Spring Boot backend

## 🔗 Backend Integration

The app tries to fetch items from:
- `GET http://localhost:8080/api/items`

If the backend isn't running, it displays 8 placeholder items across the 4 categories.

Enjoy your Bootstrap-styled Expo app! 🎉
