import express from "express";
import { readFile } from "fs/promises";
import path from "node:path";

const app = express();
const PORT = 3000;

app.get("/file", async (req, res) => {
    const filePath = req.query.path;
    try {
        const fileContent = await readFile(
            path.join(path.dirname(new URL(import.meta.url).pathname), filePath),
            "utf-8"
        );
        res.send(fileContent);
    } catch (error) {
        res.status(500).send("Error reading file.");
    }
});

app.use(express.static("public"));

app.listen(PORT);
