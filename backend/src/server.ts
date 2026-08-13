import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT as number, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});