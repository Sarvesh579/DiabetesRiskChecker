import sys
import os
import json
import joblib
import pandas as pd
import math

def sigmoid_scaling(p, T=5, baseline=0.1):
    """
    Apply sigmoid scaling to probability p.
    T controls curve steepness; baseline sets min risk for zero-inputs.
    """
    scaled = 1 / (1 + math.exp(-T * (p - 0.5)))  # sigmoid curve
    # Rescale to baseline–1 range
    return baseline + (1 - baseline) * scaled

# Load the trained model
model_path = os.path.join(os.path.dirname(__file__), "diabetes_prediction_model.pkl")
model = joblib.load(model_path)

# Read JSON input from stdin
data = json.loads(sys.stdin.read())

# Convert input into DataFrame with correct column names
input_df = pd.DataFrame([{
    "Age": data.get("Age", 0),
    "Sex": data.get("Sex", 0),
    "Polyuria": data.get("Polyuria", 0),
    "Polydipsia": data.get("Polydipsia", 0),
    "sudden_weight_loss": data.get("sudden_weight_loss", 0),
    "weakness": data.get("weakness", 0),
    "Polyphagia": data.get("Polyphagia", 0),
    "Genital_thrush": data.get("Genital_thrush", 0),
    "visual_blurring": data.get("visual_blurring", 0),
    "Itching": data.get("Itching", 0),
    "Irritability": data.get("Irritability", 0),
    "delayed_healing": data.get("delayed_healing", 0),
    "partial_paresis": data.get("partial_paresis", 0),
    "muscle_stiffness": data.get("muscle_stiffness", 0),
    "Alopecia": data.get("Alopecia", 0),
    "Obesity": data.get("Obesity", 0),
}])

# Make prediction (probability)
prediction = model.predict_proba(input_df)[0][1]

# Apply sigmoid scaling
scaled_prediction = sigmoid_scaling(prediction, T=5, baseline=0.05)  
""" if scaled_prediction >= 0.8:
    final_pred = 0.9 + (scaled_prediction - 0.8) * (0.1 / 0.2)
elif scaled_prediction >= 0.5:
    final_pred = 0.3 + (scaled_prediction - 0.5) * (0.6 / 0.3)
else:
    final_pred = scaled_prediction * (0.3 / 0.5) """
if scaled_prediction >= 0.5:
    final_pred = 0.3 + (scaled_prediction - 0.5) * (0.7 / 0.5)
else:
    final_pred = scaled_prediction * (0.3 / 0.5)

# Round to 4 decimal places and convert to percentage
probability = round(final_pred * 100, 2)

# Output as JSON
print(json.dumps({"probability": probability}))


""" import sys
import os
import json
import joblib
import pandas as pd

# Load the trained model
model_path = os.path.join(os.path.dirname(__file__), "diabetes_prediction_model.pkl")
model = joblib.load(model_path)

# Read JSON input from stdin
data = json.loads(sys.stdin.read())

# Convert input into DataFrame with correct column names
input_df = pd.DataFrame([{
    "Age": data.get("Age", 0),
    "Sex": data.get("Sex", 0),
    "Polyuria": data.get("Polyuria", 0),
    "Polydipsia": data.get("Polydipsia", 0),
    "sudden_weight_loss": data.get("sudden_weight_loss", 0),
    "weakness": data.get("weakness", 0),
    "Polyphagia": data.get("Polyphagia", 0),
    "Genital_thrush": data.get("Genital_thrush", 0),
    "visual_blurring": data.get("visual_blurring", 0),
    "Itching": data.get("Itching", 0),
    "Irritability": data.get("Irritability", 0),
    "delayed_healing": data.get("delayed_healing", 0),
    "partial_paresis": data.get("partial_paresis", 0),
    "muscle_stiffness": data.get("muscle_stiffness", 0),
    "Alopecia": data.get("Alopecia", 0),
    "Obesity": data.get("Obesity", 0),
}])

# Make prediction (probability)
prediction = model.predict_proba(input_df)[0][1]

# Round to 4 decimal places and convert to percentage
probability = round(prediction * 100, 2)

# Output as JSON
print(json.dumps({"probability": probability}))
"""