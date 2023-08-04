// Import required modules
import express from "express";
import powerXRouter from "./routes/power-x.js";
import dusKaDumRouter from "./routes/dus-ka-dum.js";
import { readFile } from "fs/promises";
import admin from "firebase-admin";

const json = await readFile(
  new URL(
    "../countdown-timer-5d62f-firebase-adminsdk-x2az6-f0b9ce8d6c.json",
    import.meta.url
  )
);

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(json)),
  databaseURL: "https://countdown-timer-5d62f-default-rtdb.firebaseio.com"
});

const app = express();
app.use(express.json());

app.use("/power-x", powerXRouter); 
app.use("/dus-ka-dum", dusKaDumRouter); 

// Start the server
const PORT = process.env.PORT || 3000; // Use the environment variable PORT or port 3000 if not defined
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
