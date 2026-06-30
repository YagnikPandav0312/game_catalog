const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const path = require("path");
const providersRoutes = require("./routes/providers.routes");
const gametypeRoutes = require("./routes/gametype.routes");
const devicetypeRoutes = require("./routes/devicetype.routes");
const logger = require("./middlewares/logger.middleware");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(logger);

app.use("/api/providers", providersRoutes);
app.use("/api/gametype", gametypeRoutes);
app.use("/api/devicetype", devicetypeRoutes);

module.exports = app;
