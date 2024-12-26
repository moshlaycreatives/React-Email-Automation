import { Spintax } from "../models/spintax.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { filterMissingFields } from "../utils/filterMissingFields.utils.js";

/** __________ ADD SPINTAX __________ */
export const addSpintax = async (req, res) => {
  if (req.body.Values) {
    throw new BadRequestError(
      "Values can't be sent while saving Spintax name and descirption"
    );
  }
  const requiredFields = ["Name", "Description"];
  const missingFields = filterMissingFields(req.body, requiredFields);

  if (missingFields.length > 0) {
    if (missingFields.length > 1) {
      missingFields[missingFields.length - 1] = `and ${
        missingFields[missingFields.length - 1]
      }`;
    }

    throw new NotFoundError(`Please provide ${missingFields.join(", ")}`);
  }

  const newSpintax = await Spintax.create(req.body);

  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "Spintax added successfully.",
      data: newSpintax,
    })
  );
};

/** __________ ADD SPINTAX VALUE __________ */
export const addSpintaxValue = async (req, res) => {
  if (!req?.body?.spintaxValue) {
    throw new BadRequestError("Please provide spintax value");
  }

  const spintax = await Spintax.findOne({ _id: req.params.id });

  if (!spintax) {
    throw new NotFoundError("Spintax not found.");
  }

  const updatedSpinTax = await Spintax.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { Values: req.body.spintaxValue } },
    { new: true }
  );

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Spintax value added successfully.",
      data: updatedSpinTax,
    })
  );
};

/** __________ DELETE SPINTAX VALUE __________ */
export const deleteSpintaxValue = async (req, res) => {
  if (!req?.body?.spintaxValue) {
    throw new BadRequestError("Please provide spintax value");
  }

  const spintax = await Spintax.findOne({ _id: req.params.id });

  if (!spintax) {
    throw new NotFoundError("Spintax not found.");
  }

  const updatedSpinTax = await Spintax.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { Values: req.body.spintaxValue } },
    { new: true }
  );

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Spintax value deleted successfully.",
      data: updatedSpinTax,
    })
  );
};

/** __________ GET ALL SPINTAX __________ */
export const getAllSpintax = async (req, res) => {
  const allSpintax = await Spintax.find({});

  if (allSpintax.length === 0) {
    return res.status(200).json(
      new ApiResponce({
        statusCode: 200,
        message: "Spintax collection is empty.",
        data: [],
      })
    );
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Spintax collection feteched successfully.",
      data: allSpintax,
    })
  );
};

/** __________ GET SPINTAX BY ID __________ */
export const getSpintaxById = async (req, res) => {
  const spintax = await Spintax.findOne({ _id: req.params.id });

  if (!spintax) {
    throw new NotFoundError("Spintax not found.");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Spintax feteched successfully.",
      data: spintax,
    })
  );
};

/** __________ UPDATE SPINTAX __________ */
export const updateSpintax = async (req, res) => {
  const spintax = await Spintax.findOne({ _id: req.params.id });

  if (!spintax) {
    throw new NotFoundError("Spintax not found.");
  }

  await Spintax.findOneAndUpdate({ _id: req.params.id }, req.body);

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Spintax updated successfully.",
    })
  );
};

/** __________ DELETE SPINTAX __________ */
export const deleteSpintax = async (req, res) => {
  const spintax = await Spintax.findOne({ _id: req.params.id });

  if (!spintax) {
    throw new NotFoundError("Spintax not found.");
  }

  await Spintax.findOneAndDelete({ _id: req.params.id });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Spintax deleted successfully.",
    })
  );
};
