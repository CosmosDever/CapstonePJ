from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def get_api():
    try:
        # Read data from the JSON file
        with open("get_api.json", "r") as file:
            api_data = json.load(file)
        return jsonify(api_data), 200
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
