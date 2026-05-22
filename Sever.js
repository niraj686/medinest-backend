import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "PASTE_YOUR_GEMINI_API_KEY_HERE";

app.post("/ai", async (req, res) => {
    const userText = req.body.text;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "You are Medinest AI medical assistant. Give safe advice only.\n\nSymptoms:\n" + userText
                    }]
                }]
            })
        }
    );

    const data = await response.json();

    const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response";

    res.json({ reply });
});

app.listen(3000, () => {
    console.log("Server running");
});