const router = require("express").Router();

const {
  getDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
} = require("../controllers/deviceType.controller");

router.get("/get_device_type", getDeviceTypes);
router.get("/get_device_type_by_id/:id", getDeviceTypeById);
router.post("/create_device_type", createDeviceType);
router.put("/update_device_type/:id", updateDeviceType);
router.delete("/delete_device_type/:id", deleteDeviceType);
module.exports = router;
