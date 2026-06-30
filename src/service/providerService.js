const providerRepo = require("../repositories/providers.repository");

async function getProviders() {
  const result = await providerRepo.getProviders();
  return result;
}

async function getProvidersById(provider_id) {
  return await providerRepo.getProviderById(provider_id);
}

async function createProviders(provider_name, logo) {
  if (!provider_name || provider_name.trim() === "") {
    throw new Error("Provider name is required");
  }
  const result = await providerRepo.createProviders(provider_name, logo);
  return result;
}

async function updateProviders(provider_id, provider_name, logo) {
  const result = await providerRepo.updateProvider(provider_id, provider_name, logo);
  if (!result.success) {
    return null;
  }
  return result.success;
}

async function deleteProviders(provider_id) {
  const result = await providerRepo.deleteProviders(provider_id);
  if (!result.success) {
    return null;
  }
  return result.success;
}

module.exports = {
  getProviders,
  getProvidersById,
  createProviders,
  updateProviders,
  deleteProviders,
};
