from flask import Flask, jsonify, request
import json
import random
from datetime import datetime, timedelta
import threading
import time

app = Flask(__name__)

# File paths for JSON data
TEMPERATURE_JSON_FILE = "src/assets/temperature_data.json"
HUMIDITY_JSON_FILE = "src/assets/humidity_sensor.json"
ELECTRICITY_JSON_FILE = "src/assets/electricity_sensor.json"

# Function to generate random data
def generate_new_temperature():
    """Generate a new temperature between 15°C and 35°C"""
    return round(random.uniform(15, 35), 1)

def generate_new_humidity():
    """Generate a new humidity between 30% and 80%"""
    return round(random.uniform(30, 80), 1)

def generate_new_electricity():
    """Generate a new electricity consumption between 0.5 kWh and 5 kWh"""
    return round(random.uniform(0.5, 5), 1)

# Function to load JSON data
def load_json_data(file_path):
    """Load JSON data from a file"""
    try:
        with open(file_path, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        # If the file is missing or corrupted, initialize with default data
        return {
            "sensor_id": "SENSOR_001",
            "location": "Tunis, Tunisia",
            "unit": "",  # Will be set based on the sensor type
            "data": []
        }

# Function to save JSON data
def save_json_data(file_path, data):
    """Save updated data to a JSON file"""
    with open(file_path, "w") as file:
        json.dump(data, file, indent=2)

# Function to add a new entry for a sensor
def add_sensor_entry(file_path, unit, generate_value_func):
    """Add a new entry for a sensor and save it to the JSON file"""
    data = load_json_data(file_path)
    
    # Get the current time (rounded to the nearest minute)
    current_time = datetime.now().replace(second=0, microsecond=0)
    
    # Create a new entry
    new_entry = {
        "timestamp": current_time.strftime("%Y-%m-%dT%H:%M:00"),
        "value": generate_value_func()  # Use the provided function to generate a value
    }

    # Add the new entry and keep only the last 60 entries (1 hour)
    data["data"].append(new_entry)
    data["data"] = data["data"][-60:]

    # Set the unit based on the sensor type
    data["unit"] = unit

    # Save the updated data to the JSON file
    save_json_data(file_path, data)

# Function to schedule data generation at the start of every minute
def schedule_sensor_entry(file_path, unit, generate_value_func):
    """Schedule adding a new sensor entry at the start of every minute"""
    while True:
        # Get the current time
        now = datetime.now()
        
        # Calculate the time until the next minute
        next_minute = (now + timedelta(minutes=1)).replace(second=0, microsecond=0)
        sleep_time = (next_minute - now).total_seconds()
        
        # Sleep until the next minute
        time.sleep(sleep_time)
        
        # Add a new entry
        add_sensor_entry(file_path, unit, generate_value_func)

# Functions to start scheduling for each sensor
def start_temperature_scheduler():
    """Start the temperature data scheduler"""
    schedule_sensor_entry(TEMPERATURE_JSON_FILE, "°C", generate_new_temperature)

def start_humidity_scheduler():
    """Start the humidity data scheduler"""
    schedule_sensor_entry(HUMIDITY_JSON_FILE, "%", generate_new_humidity)

def start_electricity_scheduler():
    """Start the electricity data scheduler"""
    schedule_sensor_entry(ELECTRICITY_JSON_FILE, "kWh", generate_new_electricity)

# Endpoints to get data for each sensor
@app.route("/temperature", methods=["GET"])
def get_temperature_data():
    """Endpoint to get temperature data"""
    data = load_json_data(TEMPERATURE_JSON_FILE)
    return jsonify(data)

@app.route("/humidity", methods=["GET"])
def get_humidity_data():
    """Endpoint to get humidity data"""
    data = load_json_data(HUMIDITY_JSON_FILE)
    return jsonify(data)

@app.route("/electricity", methods=["GET"])
def get_electricity_data():
    """Endpoint to get electricity data"""
    data = load_json_data(ELECTRICITY_JSON_FILE)
    return jsonify(data)

# Endpoints to manually add data for each sensor
@app.route("/temperature", methods=["POST"])
def update_temperature_data():
    """Endpoint to manually add a temperature entry"""
    data = load_json_data(TEMPERATURE_JSON_FILE)
    
    current_time = datetime.now().replace(second=0, microsecond=0)
    new_entry = {
        "timestamp": current_time.strftime("%Y-%m-%dT%H:%M:00"),
        "value": generate_new_temperature()
    }

    data["data"].append(new_entry)
    data["data"] = data["data"][-60:]
    save_json_data(TEMPERATURE_JSON_FILE, data)

    return jsonify({"message": "Temperature updated", "new_entry": new_entry}), 201

@app.route("/humidity", methods=["POST"])
def update_humidity_data():
    """Endpoint to manually add a humidity entry"""
    data = load_json_data(HUMIDITY_JSON_FILE)
    
    current_time = datetime.now().replace(second=0, microsecond=0)
    new_entry = {
        "timestamp": current_time.strftime("%Y-%m-%dT%H:%M:00"),
        "value": generate_new_humidity()
    }

    data["data"].append(new_entry)
    data["data"] = data["data"][-60:]
    save_json_data(HUMIDITY_JSON_FILE, data)

    return jsonify({"message": "Humidity updated", "new_entry": new_entry}), 201

@app.route("/electricity", methods=["POST"])
def update_electricity_data():
    """Endpoint to manually add an electricity entry"""
    data = load_json_data(ELECTRICITY_JSON_FILE)
    
    current_time = datetime.now().replace(second=0, microsecond=0)
    new_entry = {
        "timestamp": current_time.strftime("%Y-%m-%dT%H:%M:00"),
        "value": generate_new_electricity()
    }

    data["data"].append(new_entry)
    data["data"] = data["data"][-60:]
    save_json_data(ELECTRICITY_JSON_FILE, data)

    return jsonify({"message": "Electricity updated", "new_entry": new_entry}), 201

if __name__ == "__main__":
    # Start the schedulers in separate threads
    threading.Thread(target=start_temperature_scheduler, daemon=True).start()
    threading.Thread(target=start_humidity_scheduler, daemon=True).start()
    threading.Thread(target=start_electricity_scheduler, daemon=True).start()
    
    # Run the Flask app
    app.run(debug=True)