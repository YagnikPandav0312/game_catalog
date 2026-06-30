const providerService = require("../service/providerService");

async function getProviders(req, res) {
  try {
    const result = await providerService.getProviders();
    return res.status(200).json({
      success: true,
      message: "Providers Fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function getProvidersById(req, res) {
  try {
    const game_provider_id = req.params.id;
    const result = await providerService.getProvidersById(game_provider_id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Provider Fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function createProviders(req, res) {
  try {
    const { provider_name } = req.body || {};
    let logo = req.body?.logo;
    if (req.file) {
      logo = `/uploads/${req.file.filename}`;
    }
    const result = await providerService.createProviders(provider_name, logo);
    res.status(200).json({
      success: true,
      message: "Provider Created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateProviders(req, res) {
  try {
    const { id } = req.params;
    const { provider_name } = req.body || {};
    let logo = req.body?.logo;
    if (req.file) {
      logo = `/uploads/${req.file.filename}`;
    }
    const result = await providerService.updateProviders(id, provider_name, logo);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Update Provider Failed",
      });
    }
    res.status(200).json({
      success: true,
      message: "Updated Provider Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteProviders(req, res) {
  try {
    const { id } = req.params;
    const result = await providerService.deleteProviders(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Delete Provider Failed",
      });
    }
    res.status(200).json({
      success: true,
      message: "Deleted Provider Successfully",
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
  getProviders,
  getProvidersById,
  createProviders,
  updateProviders,
  deleteProviders,
};
