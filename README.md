# 🐾 Paw Prints App

An **Ionic Angular** mobile and web application designed to manage pets and their medical history, powered by a clean and modern UI.

Built to work seamlessly across **iOS**, **Android**, and **web**.

Attempts to follow at a top level this [_Adobe XD design_](https://xd.adobe.com/view/b1f381db-0046-4f1c-7c9f-e217c8f3c015-c7c2/grid/) with some tweaks and modifications to simplify the development.

## ✨ Features

- 🔐 Google Authentication (OAuth2 + JWT)
- 🐶 Manage your pets (create, view details, medical records, images)
- 📸 Upload pet photos directly from the device (camera or gallery)
- 🏥 Add medical records (vaccines, surgeries, checkups)
- 📱 Responsive, mobile-first UI with Ionic components
- 📦 Capacitor plugins for native device features
- 🧪 Integrated with the Paw Prints NestJS Backend API

## 📁 Project Structure

```
src/app/
├── pages/
│   ├── home/                # Home page (pet listing)
│   ├── pet-details/         # Pet details page
│   ├── pet-creation/        # Pet creation form
│   ├── create-medical-record/ # Add new medical record
│   ├── profile/             # User profile
│   └── info/                # Informational page
│
├── core/
│   ├── services/            # API services (user, pet, medical records)
│   ├── interceptors/        # Loading and Auth interceptors
│   ├── guards/              # Auth guards for routing
│   └── models/              # Typescript interfaces
│
├── shared/
│   ├── enums/               # Enums
│   ├── utils/               # Utility functions
│
└── assets/                  # Images, icons, etc.
```

## 🚀 Setup

### 1. Clone the Repository

Clone the repository, then:

```bash
cd paw-prints-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create an `environment.ts` file in `src/environments/`:

```typescript
export const environment = {
  // Replace with your API URL
  apiUrl: 'https://api.example.com',
  // Replace with your Google Client ID
  googleClientId: 'PRODUCTION_CLIENT_ID.apps.googleusercontent.com',
  production: false,
};
};
```

(Adjust for production builds later.)

## 📱 Running the App

### 1. Serve in the Browser

```bash
ionic serve
```

> This opens the app in your browser (`http://localhost:8100` by default).

### 2. Run on Android/iOS (Capacitor)

```bash
npm run build
npx cap sync
npx cap open android
npx cap open ios
```

## 🔐 Authentication

The app uses Google OAuth for login.

- First time: User is redirected to Google Login
- Once authenticated: Token is stored securely (`Capacitor Storage`)

All authenticated API calls automatically inject the JWT using an **Auth Interceptor**.

## ⚙️ Core Technologies Used

- **Ionic Angular 7+**
- **Capacitor 5+**
- **RxJS 7+**
- **Prisma Backend API Integration**
- **JWT Auth & OAuth**

## 🧪 Development Highlights

- **Form Management**: Native Ionic inputs, custom design for Pet Creation
- **Image Handling**: Using Capacitor Camera API (with fallback to file upload for browsers)
- **Navigation**: Router + Tabs architecture
- **Loading Experience**: Global loading spinner via HTTP interceptor
- **Error Handling**: Basic console errors (expandable)

## 📦 API Endpoints Used

- `POST /auth/google`
- `GET /users/me`
- `GET /pets`
- `GET /pets/:id`
- `POST /pets`
- `POST /pet-images`
- `POST /medical-records`

> **Note:** All except `/auth/google` require JWT authentication.

## 🛤️ Future Improvements

- [ ] Add unit tests
- [ ] Profile editing (user image, name, more info)
- [ ] Pet editing (name, picture, age, more info)
- [ ] Medical records editing (title, images, more info)

## 🧑‍💻 Author

Developed by **Rafael Francisco Zacca Romano**

## 🐾 License

MIT
