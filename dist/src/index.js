import express from "express";
import { env } from "node:process";
import cors from "cors";
import router from "./routes.js";
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(router);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map