# Instant Analytics

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://alsopranab.github.io/Instant-Analytics/)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow)
![Status](https://img.shields.io/badge/Status-Stable-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

Instant Analytics is a lightweight, client-side analytics dashboard that allows users to upload CSV files or connect public Google Sheets and ask natural-language questions to generate charts and insights instantly — with **no backend required**.

---

## Live Demo

```
https://alsopranab.github.io/Instant-Analytics/
```
---

## What This Project Does

Instant Analytics lets you:

- Load data from CSV files or public Google Sheets  
- Ask questions like “total revenue by region”  
- Automatically detect metrics and dimensions  
- Generate charts instantly in the browser  
- Receive explanations and suggestions for each query  

Everything runs **entirely on the frontend** using modern JavaScript.

---

## Why This Project Exists

Most analytics tools are heavy, backend-driven, and opaque.

This project demonstrates that:
- Analytics can be done fully in the browser
- Rule-based intelligence can be explainable and predictable
- Clean architecture matters more than “AI buzzwords”
- A modular frontend can handle real analytical workflows

---

## Features

- CSV upload support  
- Public Google Sheets integration  
- Natural-language query parsing  
- Automatic schema inference  
- Intelligent chart selection (bar, line, table)  
- Clear result explanations  
- Query refinement suggestions  

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
## Demo: Try It Yourself

You can test Instant Analytics in under two minutes using either a public Google Sheet or a CSV file.

---

### Option 1: Google Sheets (Recommended)

Sample Google Sheet:
```
https://docs.google.com/spreadsheets/d/1Iw1DKurGcWc_LMpTnkVBmDhmx8UWc_-cS404DGuZ3y0/edit?gid=0#gid=0
```
How to use:

- Open the Google Sheet
- Click **Share**
- Set **Anyone with the link → Viewer**
- Copy the sheet URL
- Paste the URL into the **Google Sheet input**
- Press **Enter**

---

### Option 2: CSV Upload

How to use:

- Create a CSV file using the same data
- Click **Upload CSV**
- Select the CSV file from your system

---

### Example Queries

Try any of the following natural-language queries:

- `total revenue by region`
- `average revenue by product`
- `count by category`
- `total units_sold by category`
- `show sales`

---

### Expected Output

After submitting a query, the application will:

- Render a chart instantly
- Automatically choose an appropriate chart type
- Display a clear explanation of the result
- Suggest ways to refine the analysis
