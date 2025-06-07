
# DigiPin Project

## 🌍 Overview

**DigiPin** is a full-stack web application designed to encode geographic coordinates (latitude and longitude) within India's geographic bounds into a unique 10-character alphanumeric DigiPin code, and decode them back into coordinates. Inspired by India Post's open-source geolocation encoding system, DigiPin provides a robust, user-friendly geolocation solution for logistics, navigation, and urban planning.

**Backend:** Node.js, Express  
**Frontend:** Vite, React, Tailwind CSS, Shadcn/UI, Leaflet  

---

## ✨ Features

### 🔧 Backend

- **API Endpoints:**
  - `POST /api/digipin/encode`: Encode coordinates (with optional `includeHyphens`)
  - `GET /api/digipin/encode`: Same as POST using query parameters
  - `POST /api/digipin/decode`: Decode DigiPin into coordinates
  - `GET /api/digipin/decode`: Same as POST using query parameters

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
- **Postman:** For testing APIs
- **Modern browser:** Chrome, Firefox, Edge
- **Git:** (optional)
- **Terminal:** Bash, PowerShell, etc.

---

## 🛠 Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/gaurav-048-sharma/digipin.git
   cd digipin/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install express cors morgan dotenv swagger-ui-express yaml yamljs
   ```

   > Ensure `digipin.js` is in the backend directory and referenced in `digipinController.js`.

3. **Environment Variables**
   Create `.env`:
   ```env
   PORT=3000
   ```

4. **Run the Backend**
   ```bash
   node index.js
   ```

   Expected Output:
   ```
   index is running on port http://localhost:3000/api/digipin
   ```

5. **Access API**
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

---

## 📬 Contact

For issues, suggestions, or feature requests, please open an issue or pull request on GitHub:  
🔗 `https://github.com/gaurav-048-sharma/digipin.git

---

_Generated on June 06, 2025, 07:47 PM IST_

---

