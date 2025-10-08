import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TakeQuestionnaire from "./TakeQuestionnaire.jsx";
import Report from "./Report.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TakeQuestionnaire />} />
                <Route path="/report" element={<Report />} />
            </Routes>
        </Router>
    );
}

export default App;
