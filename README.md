# Instant Analytics

Instant Analytics is a lightweight web application that allows anyone to visualize data instantly using plain language. Users can connect a Google Sheet or upload a CSV file, select the relevant sheet tab, and describe what they want to see. The application automatically interprets the request and generates an appropriate visualization.

The project is designed for users with no analytics or technical background who need fast insights without configuration, setup, or prior knowledge.

---

## Problem Statement

Many people store data in Google Sheets but struggle to extract insights quickly. Traditional analytics tools require configuration, chart selection, and technical understanding. This creates friction, especially when insights are needed urgently.

Instant Analytics removes this friction by allowing users to describe what they want in simple language and see results immediately.

---

## How It Works

1. Paste a public Google Sheet link or upload a CSV file  
2. The application detects all available sheet tabs  
3. Select the tab to analyze  
4. The system automatically detects column types  
5. Describe the desired insight in plain English  
6. The application determines the metric, grouping, and chart type  
7. The visualization is rendered instantly with a clear explanation  

---

## Supported Visualizations

Instant Analytics focuses on clarity and performance. The following outputs are supported:

- Line charts for trends over time  
- Bar charts for category comparisons  
- Pie charts for distribution analysis  
- KPI cards for single value summaries  

All visualizations follow a monochrome style to ensure consistency and readability.

---

## Data Sources

The application supports the following data sources:

- Public Google Sheets with multiple tabs  
- CSV file uploads  

Each sheet tab is treated as an independent dataset to avoid ambiguity and ensure accurate analysis.

---

## Intelligence Approach

Instant Analytics uses a hybrid intelligence approach focused on reliability and explainability.

- Rule-based logic handles common analytical requests  
- Column types and keywords are matched deterministically  
- Each visualization includes a clear explanation of how it was generated  

This approach avoids unpredictable behavior while covering most real-world use cases.

An optional future upgrade can introduce AI-assisted intent parsing without changing the core architecture.

---
```
## Project Structure


instant-analytics/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── charts.css
│   │   └── motion.css
│   └── js/
│       ├── app.js
│       ├── data/
│       │   ├── load.js
│       │   ├── tabs.js
│       │   ├── csv.js
│       │   └── schema.js
│       ├── intelligence/
│       │   ├── intent.js
│       │   ├── suggest.js
│       │   └── explain.js
│       ├── charts/
│       │   ├── decide.js
│       │   ├── transform.js
│       │   └── render.js
│       ├── ui/
│       │   ├── input.js
│       │   ├── tabs.js
│       │   ├── query.js
│       │   └── dashboard.js
│       └── utils/
│           ├── debounce.js
│           └── helpers.js

```
---

Technology Stack

HTML, CSS, and Vanilla JavaScript

Chart.js for data visualization

Client side CSV and Google Sheets parsing

GitHub Pages compatible deployment

No backend is required for the core functionality.

Design Principles

Minimal interface focused on content

Monochrome visual language

Stable charts with subtle transitions

Clear hierarchy and spacing

Predictable behavior over complex features

The goal is to feel like a professional analytics product rather than a demonstration.

Intended Users

Non technical users

Students and beginners

Managers and founders

Operations and sales teams

Anyone needing fast insights from spreadsheet data

If a user can describe what they want in a sentence, they can use this tool.

Future Enhancements

AI assisted intent parsing

Export charts as images

Shareable dashboards

Date range and category filters

Private sheet access with authentication

License

This project is open source and intended for learning, experimentation, and practical use.
