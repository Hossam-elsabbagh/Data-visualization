from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, text
import pandas as pd

app = Flask(__name__)

DATABASE_URI = "mssql+pyodbc://@localhost/datasetvs?driver=ODBC+Driver+17+for+SQL+Server&Trusted_Connection=yes"

df = pd.read_csv('dataset.csv')
engine = create_engine(DATABASE_URI)
df.to_sql('dataset', engine, if_exists='replace', index=False)


def calculate_percentage(counts):
    total = sum(counts.values())
    return {key: (value / total * 100) if total > 0 else 0 for key, value in counts.items()}

@app.route('/get-datachart-bar', methods=['GET'])
def get_datachart_bar():
    """Provides data for the bar chart showing gender distribution."""
    try:
        query = "SELECT Gender, COUNT(*) AS Count FROM dataset GROUP BY Gender"
        df = pd.read_sql(text(query), engine)

        chart_data = df.to_dict(orient='records')
        return jsonify(chart_data)
    except Exception as e:
        return jsonify({"error": f"Error processing bar chart data: {str(e)}"}), 500
    

@app.route('/get-datachart-pie', methods=['GET'])
def get_datachart_pie():
    """Provides data for the pie chart showing school distribution."""
    try:
        query = """
        SELECT 
            School,
            COUNT(*) * 100.0 / (SELECT COUNT(*) FROM dataset) AS Percentage
        FROM 
            dataset
        GROUP BY 
            School;
        """
        df = pd.read_sql(text(query), engine)
        chart_data = [{"category": row['School'], "value": row['Percentage']} for index, row in df.iterrows()]
        return jsonify(chart_data)
    except Exception as e:
        return jsonify({"error": f"Error processing pie chart data: {str(e)}"}), 500

@app.route('/get-datachart-histogram', methods=['GET'])
def get_datachart_histogram():
    """Provides data for the histogram showing GPA distribution."""
    try:
        query = "SELECT GPA FROM dataset WHERE GPA IS NOT NULL"
        df = pd.read_sql(text(query), engine)

        gpa_data = df['GPA'].tolist()
        
        return jsonify(gpa_data)
    except Exception as e:
        return jsonify({"error": f"Error processing histogram data: {str(e)}"}), 500

@app.route('/get-datachart-pyramid', methods=['GET'])
def get_datachart_pyramid():
    """Provides data for the pyramid chart showing student status distribution."""
    try:
        query = "SELECT Student_status, COUNT(*) AS Count FROM dataset GROUP BY Student_status"
        df = pd.read_sql(text(query), engine)

        counts = df.set_index('Student_status')['Count'].to_dict()
        percentages = calculate_percentage(counts)
        chart_data = [{"category": status, "value": percentage} for status, percentage in percentages.items()]
        return jsonify(chart_data)
    except Exception as e:
        return jsonify({"error": f"Error processing pyramid chart data: {str(e)}"}), 500

@app.route('/')
def index():
    """Serves the main dashboard page."""
    try:
        return render_template('index.html')
    except Exception as e:
        return f"Error loading the page: {e}", 500

if __name__ == '__main__':
    app.run(debug=True)
