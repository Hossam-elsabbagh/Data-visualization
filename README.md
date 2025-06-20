# 📊 Data Visualization Dashboard with Flask & SQL Server

This project is a simple yet powerful **data visualization web app** built using **Flask**, **Pandas**, and **SQL Server**.  
It uses a CSV dataset imported into a local SQL Server database and visualizes various insights with **interactive charts**.

## 🖥️ Features

- ✅ Web server using Flask
- 📦 Dataset imported from `dataset.csv` into SQL Server
- 📊 Four visualizations:
  - **Bar Chart**: Gender distribution
  - **Pie Chart**: School percentage
  - **Histogram**: GPA distribution
  - **Pyramid Chart**: Student status percentage
- 📡 API endpoints return JSON data for each chart
- 📈 Chart-ready frontend with HTML (via `index.html`)
- 🔁 Real-time updates on page refresh

## 🧰 Tech Stack

- Python 3.6+
- Flask
- Pandas
- SQLAlchemy
- SQL Server (ODBC)
- HTML/CSS/JavaScript for frontend charts (assumed via `index.html`)

## 📂 Project Structure

```
DataVizProject/
├── app.py             # Main Flask backend
├── dataset.csv        # CSV file for initial data
├── templates/
│   └── index.html     # Dashboard UI (assumed here)
└── README.md
```

## 🔌 API Endpoints

| Endpoint                 | Description                      | Returns     |
|--------------------------|----------------------------------|-------------|
| `/get-datachart-bar`     | Gender distribution (bar chart) | JSON list   |
| `/get-datachart-pie`     | School distribution (pie chart) | JSON list   |
| `/get-datachart-histogram` | GPA values (histogram)         | JSON array  |
| `/get-datachart-pyramid` | Student status % (pyramid)      | JSON list   |

## ⚙️ Setup Instructions

1. ✅ Install dependencies:
   ```bash
   pip install flask pandas sqlalchemy pyodbc
   ```

2. ✅ Ensure SQL Server is installed and running

3. ✅ Setup ODBC:
   - Use `ODBC Driver 17 for SQL Server`
   - Make sure `datasetvs` database is created

4. ✅ Run the app:
   ```bash
   python app.py
   ```

5. 🌐 Open browser:
   ```
   http://127.0.0.1:5000/
   ```

## ⚠️ Notes

- This project uses **Trusted Connection** with SQL Server.  
  If using SQL authentication, update the connection string accordingly.
- Make sure to place your `dataset.csv` in the root directory.

## ✨ Author

**Hossam Elsabbagh**  
📍 Zewail City of Science & Technology  
🎓 Computer Science & Artificial Intelligence  
🧠 Made with Flask
