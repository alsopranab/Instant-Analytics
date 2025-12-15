# Instant Analytics

A lightweight, client-side analytics dashboard that lets you upload CSV files or paste public Google Sheets links and ask natural-language questions to generate insights instantly — no backend required.

---

## Live Demo

*(Add your GitHub Pages URL here once deployed)*

---

## Project Structure

```text
Instant-Analytics/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   ├── tokens.css
    │   ├── base.css
    │   ├── components.css
    │   ├── charts.css
    │   └── motion.css
    └── js/
        ├── app.js
        ├── utils/
        │   ├── debounce.js
        │   └── helpers.js
        ├── ui/
        │   ├── input.js
        │   ├── query.js
        │   ├── dashboard.js
        │   └── tabs.js
        ├── intelligence/
        │   ├── intent.js
        │   ├── explain.js
        │   └── suggest.js
        ├── charts/
        │   ├── decide.js
        │   ├── render.js
        │   └── transform.js
        └── data/
            ├── csv.js
            ├── load.js
            ├── sheets.js
            ├── schema.js
            └── tabs.js
```
## Features

> Upload CSV or paste a public Google Sheets link

> Natural-language queries (e.g., total revenue by category)

> Automatic schema inference

> Intelligent chart selection

> Explanations and suggestions per query

## Demo: Try It Yourself

You can test Instant Analytics in under 2 minutes using either a CSV file or a public Google Sheet.

---

### Option 1: Use a Sample Google Sheet (Recommended)

1. Open this public Google Sheet (copy it or create your own using the data below):
Link: 
```
https://docs.google.com/spreadsheets/d/1Iw1DKurGcWc_LMpTnkVBmDhmx8UWc_-cS404DGuZ3y0/edit?gid=0#gid=0
```
## Screenshots & Demo

### 1. Data Input (CSV / Google Sheets)
Upload a CSV file or paste a public Google Sheets link to load data instantly.

> _Supports automatic schema detection and multiple data sources._

![Data Input](docs/screenshots/data-input.png)

---

### 2. Natural Language Query
Ask questions like:
- `total revenue by region`
- `average revenue by product`
- `count by category`

The system automatically interprets intent and selects the best visualization.

![Query Input](docs/screenshots/query-input.png)

---

### 3. Instant Charts & Insights
Charts are generated instantly along with:
- A clear explanation of the result
- Intelligent suggestions to refine analysis

![Analytics Output](docs/screenshots/analytics-output.png)

---

### Optional: Short Demo GIF
A short walkthrough showing data upload → query → chart rendering.

![Demo GIF](docs/screenshots/demo.gif)


2. Make the sheet **Public (Viewer access)**  
3. Copy the Google Sheets URL  
4. Paste it into the **Google Sheet input**  
5. Press **Enter**

---

### Option 2: Upload CSV

1. Save the data above as `sales_demo.csv`
2. Click **Upload CSV**
3. Select the file

---

### Example Queries to Try

Type any of these in the query box and press **Enter**:

- `total revenue by region`
- `average revenue by product`
- `count by category`
- `total units_sold by category`
- `show sales`

---

### What You Should See

- A chart rendered instantly
- Automatic chart type selection (bar / line / table)
- A clear explanation of the result
- Intelligent suggestions to refine the query

If this works, the entire analytics pipeline is functioning correctly.

# Instant Analytics

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://alsopranab.github.io/Instant-Analytics/)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow)
![Status](https://img.shields.io/badge/Status-Stable-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)


## How to Run Locally

This app uses ES modules, so it needs to be served over HTTP.

## Using Python
```cd Instant-Analytics
python3 -m http.server 5500
```

## Then open:

```
http://localhost:5500
```
## Using VS Code

```
> Install the Live Server extension

> Right-click index.html → Open with Live Server
```
## Google Sheets Usage

> Make the sheet public (Viewer access)

> Paste the full sheet URL in the input

> Press *Enter*

> Ask your *analytics question*

## Supported Queries

```Examples:

total revenue by region

average sales by product

count by category

show units_sold by product
```
## License

This repository contains code you can use for learning or internal projects.


---

## After you paste this

Once you replace your `README.md` with that:

1. **Commit and push**
2. GitHub should render it correctly
3. The structure will be clear
4. The repo will look professional

---

## Next steps (optional but recommended)

If you want, I can:
- Add a **GitHub Pages live URL section**
- Write a **feature demo GIF** snippet to embed
- Add **badges** (build, license, GitHub Pages)

Tell me one.
::contentReference[oaicite:1]{index=1}

