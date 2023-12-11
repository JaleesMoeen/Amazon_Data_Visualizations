# Import necessary modules
from flask import Flask, jsonify, render_template
import pandas as pd

# Create a Flask application
app = Flask(__name__)

# Define a route for the home page
@app.route("/")
def index():

    # Render the "index.html" template
    return render_template("index.html")

# Define a route for the iPhone Samsung details API
@app.route("/api/iphone_samsung_details")
def api_iphone_samsung_details():

    # Read the iPhone  Samsung merged data from CSV into a DataFrame
    df= pd.read_csv('Cleaned Data\iphone_samsung_merged_data.csv')
    df1=df.to_json(orient='records')
    df1=pd.read_json(df1)

    # Return the iPhone  Samsung details as JSON
    return jsonify(df1.to_dict(orient='records'))


# Define a route for the iPhone details API
@app.route("/api/iphone_details")
def api_iphone_details():

    # Read the iPhone cleaned data from CSV into a DataFrame
    df= pd.read_csv('Cleaned Data\iphone_cleaned_data.csv')
    df1=df.to_json(orient='records')
    df1=pd.read_json(df1)

    # Return the iPhone details as JSON
    return jsonify(df1.to_dict(orient='records'))

# Define a route for the Samsung details API
@app.route("/api/samsung_details")
def api_samsung_details():

    # Read the Samsung cleaned data from CSV into a DataFrame
    df = pd.read_csv('Cleaned Data\samsung_cleaned_data.csv')
    df1=df.to_json(orient='records')
    df1=pd.read_json(df1)

    # Return the iPhone details as JSON
    return jsonify(df1.to_dict(orient='records'))

# Run the application if this script is executed
if __name__ == "__main__":
    app.run()