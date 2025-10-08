const express = require("express");
const cors = require("cors");
const { PythonShell } = require("python-shell");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", (req, res) => {
    console.log("Received inputs:", req.body);

    let options = {
        mode: "text",
        pythonOptions: ["-u"],
        scriptPath: path.join(__dirname, "../ml-model"), // Adjust if model.py location changes
    };

    const pyshell = new PythonShell("model.py", options);

    // Send JSON string to Python script
    pyshell.send(JSON.stringify(req.body));

    pyshell.on("message", function (message) {
        try {
            const result = JSON.parse(message);
            res.json(result); // Send back { probability: <value> }
        } catch (err) {
            console.error("Error parsing model output:", err);
            res.status(500).json({ error: "Invalid model response" });
        }
    });

    pyshell.end(function (err) {
        if (err) {
            console.error("PythonShell error:", err);
            res.status(500).json({ error: "Model execution failed" });
        }
    });
});

app.listen(4000, () => console.log("Backend running on port 4000"));
