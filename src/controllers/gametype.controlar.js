const service = require("../service/gametype.service");

async function getGameType(req, res) {
  try {
    const result = await service.getGameType();
    return res.status(200).json({
      success: true,
      data: result,
      message: "GameType Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getGameTypeById(req, res) {
  try {
    const id = req.params.id;
    const result = await service.getGameTypeById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "GameType not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Game Type Fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function createGameType(req, res) {
  try {
    const { game_types_name, slug } = req.body;
    const result = await service.createGameType(game_types_name, slug);
    return res.status(200).json({
      success: true,
      message: "Game Type Created Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// async function updateGameType(req, res) {
//   const { game_types_name, slug } = req.body;

//   const result = await service.updateGameType(req.params.id, game_types_name, slug);

//   res.json({
//     success: true,
//     message: "Updated successfully",
//     data: result,
//   });
// }

// async function deleteGameType(req, res) {
//   const result = await service.deleteGameType(req.params.id);

//   res.json({
//     success: true,
//     message: "Deleted successfully",
//     data: result,
//   });
// }

module.exports = {
  createGameType,
  getGameType,
  getGameTypeById,
  // updateGameType,
  // deleteGameType,
};
