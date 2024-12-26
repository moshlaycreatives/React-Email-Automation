import { BadRequestError, NotFoundError } from "../errors/index.js";
import { Emails } from "../models/emails.model.js";
import { EmailLists } from "../models/emailsList.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";

/** __________ ADD LIST NAME __________ */
export const addListName = async (req, res) => {
  if (!req?.body?.Name) {
    throw new NotFoundError("Please provide list name.");
  }

  const existingListName = await EmailLists.findOne({ Name: req.body.Name });
  if (existingListName) {
    throw new BadRequestError("List name already taken.");
  }

  const newListName = await EmailLists.create(req.body);

  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "List name added successfully",
      data: newListName,
    })
  );
};

/** __________ GET LIST NAMES __________ */
export const getAllNameLists = async (req, res) => {
  const listsNames = await EmailLists.find();

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "List names fetched successfully",
      data: listsNames,
    })
  );
};

/** __________ DELETE LIST NAME __________ */
export const deleteListName = async (req, res) => {
  const { id } = req.params;

  const list = await EmailLists.findByIdAndDelete(id);

  if (!list) {
    throw new NotFoundError("List not found.");
  }

  await Emails.deleteMany({ EmailLists: id });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "List name deleted successfully",
    })
  );
};

/** __________ UPDATE LIST NAME __________ */
export const updateListName = async (req, res) => {
  const { id } = req.params;

  if (!req.body?.Name) {
    throw new NotFoundError("Please provide list name.");
  }

  const updatedList = await EmailLists.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedList) {
    throw new NotFoundError("List not found.");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "List name updated successfully",
      data: updatedList,
    })
  );
};
