

# ⭐ **NovaNews**

<div align="center">
  <img src="assets/banner.png" alt="NovaNews Banner" width="100%">

### **Your daily dose of news — fast, free, and beautifully delivered.**

  <p>
    <a href="https://reactjs.org/">
      <img src="https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react" />
    </a>
    <a href="https://getbootstrap.com/">
      <img src="https://img.shields.io/badge/Bootstrap-5.x-purple?style=for-the-badge&logo=bootstrap" />
    </a>
    <a href="https://gnews.io/">
      <img src="https://img.shields.io/badge/API-GNews-green?style=for-the-badge" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
    </a>
  </p>

  <p>
    🚀 **Live Demo:**  
    <a href="https://novanews-five.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/Click Here-Live Demo-brightgreen?style=for-the-badge" />
    </a>
  </p>
</div>

---

## 📖 **About**

**NovaNews** is a clean, fast, and modern news aggregation web app built with **React**. It fetches real-time top headlines from the **GNews API**, presented in a smooth and responsive UI powered by **Bootstrap 5**.

Whether you’re keeping up with global events, sports, tech, entertainment, or science—NovaNews delivers everything in one elegant interface.

---

## ✨ **Key Features**

### 📰 **Top Headlines**

Stay up to date with real-time news across 7 major categories:

* Business
* Entertainment
* Health
* Science
* Sports
* Technology
* General

### 🌗 **Dark / Light Mode**

Switch themes instantly for comfortable reading anytime.

### 🎙️ **Voice Commands + Text-to-Speech**

* Say **“Open Sports”**, “Show Technology”, etc.
* Listen to any article with built-in TTS.

### ⛅ **Live Weather Widget**

Shows your city's weather right inside the navbar.

### 💾 **Read Later / Save Articles**

Save articles for offline access anytime.

### 🔄 **Infinite Scroll**

Auto-load new articles as you scroll down (or use pagination mode).

### 📱 **Fully Responsive Design**

Feels smooth on:

* Mobile
* Tablet
* Desktop

---

## 📸 **Screenshots**

<div align="center">
  <table>
    <tr>
      <td align="center">
        <b>Light Mode</b><br>
        <img src="assets/light_mode.png" width="400">
      </td>
      <td align="center">
        <b>Dark Mode</b><br>
        <img src="assets/dark_mode.png" width="400">
      </td>
    </tr>
  </table>
</div>

---

## 🛠️ **Tech Stack**

### **Frontend**

* React (Hooks, Functional Components)
* React Router v6
* Context API for global theme + saved items

### **Styling**

* Bootstrap 5
* CSS3
* Smooth glassmorphism UI

### **APIs**

* **GNews API** – News data
* **Open-Meteo** – Weather data

### **Utilities**

* `react-top-loading-bar` — loading animations
* Web Speech API — voice commands & text-to-speech

---

## 🚀 **Getting Started**

### ✔ Prerequisites

* **Node.js** v14+
* **npm** v6+

### ✔ Installation

#### 1️⃣ Clone the repo

```bash
git clone https://github.com/Rex1671/NovaNews.git
cd newsapp
```

#### 2️⃣ Install dependencies

```bash
npm install
```

#### 3️⃣ Create a `.env` file

```env
REACT_APP_NEWS_API_KEY=your_api_key_here
```

👉 Get your API key from **[https://gnews.io/](https://gnews.io/)**

#### 4️⃣ Run the dev server

```bash
npm start
```

Your app will open at: **[http://localhost:3000](http://localhost:3000)**

---

## 📂 **Project Structure**

```bash
newsapp/
├── public/             # Static files
├── src/
│   ├── components/     # Reusable components
│   │   ├── NavBar.js
│   │   ├── News.js
│   │   ├── NewsItem.js
│   │   ├── Spinner.js
│   │   └── Ticker.js
│   ├── App.js          # Main app router
│   ├── App.css         # Global styles
│   └── index.js        # React entry point
├── assets/             # Screenshots & banner
├── .env                # API key (ignored in Git)
└── package.json
```

---

## 📄 **License**

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file.

---

<div align="center">
  Made with ❤️ by <b>Rakesh</b><br>
  ⭐ If you like this project, consider giving it a star on GitHub!
</div>
