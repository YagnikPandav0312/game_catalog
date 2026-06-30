const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger.middleware");
const {
  getProviders,
  getProvidersById,
  createProviders,
  updateProviders,
  deleteProviders,
} = require("../controllers/providers.controller");

router.get("/get_providers", logger, getProviders);
router.get("/get_provider_by_id/:id", logger, getProvidersById);
router.post("/create_providers", logger, createProviders);
router.put("/update_providers/:id", logger, updateProviders);
router.delete("/delete_provider/:id", logger, deleteProviders);

module.exports = router;
