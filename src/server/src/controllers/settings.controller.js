import { Settings } from "../models/setting.model.js";

// Create Settings
const addSettings = async (req, res) => {
  const { max_browser_automation, gologin_api_token } = req.body;
  console.log(req.body);
  console.log(req.user);
  if (!max_browser_automation || !gologin_api_token) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newSettings = new Settings({
      max_browser_automation,
      gologin_api_token,
      user_id: req.user._id,
    });

    await newSettings.save();
    res
      .status(201)
      .json({ message: "Settings created successfully.", newSettings });
  } catch (error) {
    console.error("Error creating settings:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Read Settings
const getSettingsById = async (req, res) => {
  try {
    const settings = await Settings.findOne(
      { user_id: req.user._id },
      { max_browser_automation: 1, gologin_api_token: 1 }
    );
    res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Internal server error.", error });
  }
};

// Update Settings
const updateSettings = async (req, res) => {
  const { max_browser_automation, gologin_api_token } = req.body;

  try {
    const updatedSettings = await Settings.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      { max_browser_automation, gologin_api_token },
      { new: true }
    );

    if (!updatedSettings) {
      return res.status(404).json({ message: "Settings not found." });
    }

    res
      .status(200)
      .json({ message: "Settings updated successfully.", updatedSettings });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete Settings
const deleteSettings = async (req, res) => {
  try {
    const deletedSettings = await Settings.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!deletedSettings) {
      return res.status(404).json({ message: "Settings not found." });
    }

    res.status(200).json({ message: "Settings deleted successfully." });
  } catch (error) {
    console.error("Error deleting settings:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export { addSettings, updateSettings, getSettingsById, deleteSettings };
