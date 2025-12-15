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
