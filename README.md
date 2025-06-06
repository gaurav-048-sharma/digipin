
# DigiPin Project

## 🌍 Overview

**DigiPin** is a full-stack web application designed to encode geographic coordinates (latitude and longitude) within India's geographic bounds into a unique 10-character alphanumeric DigiPin code, and decode them back into coordinates. Inspired by India Post's open-source geolocation encoding system, DigiPin provides a robust, user-friendly geolocation solution for logistics, navigation, and urban planning.

**Backend:** Node.js, Express, MongoDB  
**Frontend:** Vite, React, Tailwind CSS, Shadcn/UI, Leaflet  

---

## ✨ Features

### 🔧 Backend

- **API Endpoints:**
  - `POST /api/digipin/encode`: Encode coordinates (with optional `includeHyphens`)
  - `GET /api/digipin/encode`: Same as POST using query parameters
  - `POST /api/digipin/decode`: Decode DigiPin into coordinates
  - `GET /api/digipin/decode`: Same as POST using query parameters

- **Database Integration:**
  - MongoDB stores DigiPin records (code, coordinates, timestamp)

- **Validation:**
  - Coordinates: Latitude (2.5°–38.5°), Longitude (63.5°–99.5°)
  - DigiPin: 10 characters, valid alphanumeric set

- **Error Handling:**
  - Custom `DigiPinError` class for detailed validation errors

- **Performance:**
  - Optimized character map in `digipin.js` for fast encoding/decoding

- **Documentation:**
  - Swagger UI at `/api-docs`

- **Logging:**
  - Morgan middleware for HTTP logs

---

### 💻 Frontend

- **🗺️ Interactive Map**
  - Built with Leaflet via `react-leaflet`
  - Centered on India: `[20.5937, 78.9629]`, zoom level 10
  - Click to place marker and select coordinates
  - Map updates on decode or input

- **📌 Manual Coordinate Input**
  - Input fields for latitude and longitude
  - Validates and sets marker on "Set Coordinates"

- **🔁 Encode/Decode Interface**
  - Encode coordinates → DigiPin (with/without hyphens)
  - Decode DigiPin → coordinates, map, and input update

- **🎨 UI Design**
  - Built with Tailwind CSS & Shadcn/UI:
    - Buttons, Cards, Inputs, Labels
    - Inter font (Google Fonts)
    - Blue-gray gradient background
    - Blue buttons, red error messages, green success indicators
    - Responsive layout with card hover, focus rings, and shadows

- **❌ Error Handling**
  - Displays red messages for:
    - Invalid coordinates
    - Invalid DigiPins
    - API failures

- **📱 Responsive Design**
  - Single-column on mobile, two-column on desktop

---

## 🚀 Prerequisites

- **Node.js:** v16 or higher (tested with v18)
- **MongoDB:** Local v4.4+ or MongoDB Atlas
- **Postman:** For testing APIs
- **Modern browser:** Chrome, Firefox, Edge
- **Git:** (optional)
- **Terminal:** Bash, PowerShell, etc.

---

## 🛠 Backend Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd digipin-project/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install express cors morgan dotenv mongoose swagger-ui-express yaml yamljs
   ```

   > Ensure `digipin.js` is in the backend directory and referenced in `digipinController.js`.

3. **Environment Variables**
   Create `.env`:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/digipin
   ```

4. **Verify MongoDB**
   ```bash
   mongod  # or connect to Atlas
   ```

   Use MongoDB Compass or CLI:
   ```bash
   mongo --host localhost --port 27017
   ```

5. **Run the Backend**
   ```bash
   node server.js
   ```

   Expected Output:
   ```
   MongoDB connected successfully
   Server is running on port 3000
   ```

6. **Access API**
   - Root: [http://localhost:3000](http://localhost:3000)
   - Swagger Docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🌐 Frontend Setup

1. **Navigate to Frontend**
   ```bash
   cd digipin-project/digipin-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install react-leaflet leaflet @types/leaflet axios tailwindcss postcss autoprefixer
   ```

3. **Initialize Shadcn/UI**
   ```bash
   npx shadcn-ui@latest init
   ```

   - Choose Tailwind CSS
   - Install UI components:
     ```bash
     npx shadcn-ui@latest add button input card label
     ```

4. **Environment Variables**
   Create `.env`:
   ```env
   VITE_API_URL=http://localhost:3000/api/digipin
   ```

5. **Configure Tailwind**
   In `tailwind.config.js`:
   ```js
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ]
   ```

6. **Import CSS**
   In `src/index.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   @import 'leaflet/dist/leaflet.css';
   ```

7. **Run the Frontend**
   ```bash
   npm run dev
   ```

   Open in browser: [http://localhost:5173](http://localhost:5173)

---

## ✅ Validation & Testing

- **Click on the map** → marker is placed
- **Enter coordinates manually** → set marker via button
- **Encode → DigiPin**, **Decode → coordinates**
- **Use Postman** for API testing
- **Check browser console** and **network tab** for issues

---

## 📄 License

This project is open-sourced under the **MIT License**, based on India Post’s DigiPin specification. Contributions are welcome via pull requests and issues.

---

## 🙏 Acknowledgments

- **India Post** – DigiPin specification  
- **Leaflet / react-leaflet** – Map functionality  
- **Tailwind CSS + Shadcn/UI** – UI Components  
- **MongoDB + Mongoose** – Database Integration  

---

## 📬 Contact

For issues, suggestions, or feature requests, please open an issue or pull request on GitHub:  
🔗 `<repository-url>`

---

_Generated on June 06, 2025, 07:47 PM IST_

---


## 🧩 Additional Setup Instructions (Raw Format)

### 📦 Install Backend Dependencies

```bash
npm install express cors morgan dotenv mongoose swagger-ui-express yaml yamljs
```

> Ensure `digipin.js` is in the backend directory and referenced in `digipinController.js`.

### 🛠 Environment Variables

Create `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/digipin
```

### 🧪 Verify MongoDB

Start MongoDB server:

```bash
mongod  # or connect to Atlas
```

Use MongoDB Compass or CLI:

```bash
mongo --host localhost --port 27017
```

### 🚀 Run the Backend

```bash
node server.js
```

**Expected Output:**

```arduino
MongoDB connected successfully
Server is running on port 3000
```

### 🌐 Access API

- Root: [http://localhost:3000](http://localhost:3000)
- Swagger Docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)


---

## 💻 Frontend Setup (Raw Format)

### 📂 Navigate to Frontend

```bash
cd digipin-project/digipin-frontend
```

### 📦 Install Frontend Dependencies

```bash
npm install react-leaflet leaflet @types/leaflet axios tailwindcss postcss autoprefixer
```

### ✨ Initialize Shadcn/UI

```bash
npx shadcn-ui@latest init
```

- Choose Tailwind CSS

**Install UI components:**

```bash
npx shadcn-ui@latest add button input card label
```

### 🛠 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000/api/digipin
```

### ⚙️ Configure Tailwind

Edit `tailwind.config.js`:

```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

### 🎨 Import CSS

In `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
@import 'leaflet/dist/leaflet.css';
```

### 🚀 Run the Frontend

```bash
npm run dev
```

Open in browser: [http://localhost:5173](http://localhost:5173)

---

## ✅ Validation & Testing

- Click on the map → marker is placed  
- Enter coordinates manually → set marker via button  
- Encode → DigiPin, Decode → coordinates  
- Use Postman for API testing  
- Check browser console and network tab for issues  

---

## 📄 License

This project is open-sourced under the **MIT License**, based on India Post’s DigiPin specification. Contributions are welcome via pull requests and issues.

---

## 🙏 Acknowledgments

- India Post – DigiPin specification  
- Leaflet / react-leaflet – Map functionality  
- Tailwind CSS + Shadcn/UI – UI Components  
- MongoDB + Mongoose – Database Integration  
