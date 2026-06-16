import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const NAME = process.env.SERVER_NAME;
const VERSION = process.env.SERVER_VERSION;
const DESCRIPTION = process.env.SERVER_DESCRIPTION;
const PORT = process.env.SERVER_PORT || 3000;
app.use(express.json());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    name: NAME,
    version: VERSION,
    description: DESCRIPTION,
    puerto: PORT
  });
});

app.listen(PORT, () => {
  console.log(`${NAME} version ${VERSION} corriendo en http://localhost:${PORT}`);
});

export default app;