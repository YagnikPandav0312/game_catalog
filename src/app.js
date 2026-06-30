const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const providersRoutes = require("./routes/providers.routes");
const gametypeRoutes = require("./routes/gametype.routes");
const logger = require("./middlewares/logger.middleware");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(logger);

app.use("/api/providers", providersRoutes);
app.use("/api/gametype", gametypeRoutes);

module.exports = app;
