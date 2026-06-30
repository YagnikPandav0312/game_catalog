const service = require("../service/devicetype.service");

async function getDeviceTypes(req, res) {
  try {
    const result = await service.getDeviceTypes();
    return res.status(200).json({
      success: true,
      message: "Device Types fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getDeviceTypeById(req, res) {
  try {
    const id = req.params.id;
    const result = await service.getDeviceTypeById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "DeviceType not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Device Type Fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function createDeviceType(req, res) {
  try {
    const { device_type_name, slug } = req.body;
    const result = await service.createDeviceType(device_type_name, slug);
    return res.status(201).json({
      success: true,
      message: "Device Type Created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateDeviceType(req, res) {
  try {
    const { device_type_name, slug } = req.body;
    const result = await service.updateDeviceType(
      req.params.id,
      device_type_name,
      slug,
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Update Device Type Failed",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Device Type Updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteDeviceType(req, res) {
  try {
    const result = await service.deleteDeviceType(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Delete Device Type Failed",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Device Type Deleted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
};
