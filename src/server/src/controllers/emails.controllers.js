import { BadRequestError, NotFoundError } from "../errors/index.js";
import { Emails } from "../models/emails.model.js";
import { ApiResponce } from "../utils/apiResponce.util.js";

/** __________ ADD EMAIL LIST __________ */
export const addEmailList = async (req, res) => {
  const { docs } = req.body;

  if (!Array.isArray(docs) || docs.length === 0) {
    throw new BadRequestError("Please provide a non-empty array of documents.");
  }

  await Promise.all(
    docs.map(async (doc) => {
      await Emails.create(doc);
    })
  );

  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "Emails added successfully",
    })
  );
};

/** __________ GET EMAIL LIST __________ */
export const getAllEmailLists = async (req, res) => {
  const { id } = req.params;
  const allEmail = await Emails.find({ EmailListId: id });

  if (allEmail.length === 0) {
    return res.status(200).json(
      new ApiResponce({
        statusCode: 200,
        message: "Emails collection is empty.",
        data: [],
      })
    );
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Emails collection fetched successfully.",
      data: allEmail,
    })
  );
};

/** __________ GET ALL UN-SENDED EMAILS  __________ */
export const getAllNotSendedEmails = async (req, res) => {
  const { ids } = req.body;
  const allEmail = await Emails.find({
    isEmailSended: false,
    EmailListId: { $in: ids },
  }).sort({ Email: 1 });
  // .skip(req?.query?.value)
  // .limit(req?.query?.value);

  if (allEmail.length === 0) {
    return res.status(200).json(
      new ApiResponce({
        statusCode: 200,
        message: "There is no any email for send.",
        data: [],
      })
    );
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "All un-sended emails fetched successfully.",
      data: allEmail,
    })
  );
};

/** __________ DELETE EMAIL LIST __________ */
export const deleteEmailList = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("Please provide list name id.");
  }

  await Emails.deleteMany({ EmailListId: id });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Email list deleted successfully.",
    })
  );
};

/** __________ DELETE SINGLE EMAIL FROM LIST __________ */
export const deleteSingleEmailFromList = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("Please provide document id");
  }

  const emailList = await Emails.findByIdAndDelete(id);

  if (!emailList) {
    throw new NotFoundError("Document not found.");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Email deleted from list successfully.",
      data: emailList,
    })
  );
};

/** __________ MARK EMAIL SENDED __________ */
export const markEmailSended = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide document id");
  }

  const email = await Emails.findByIdAndUpdate(
    id,
    { isEmailSended: true },
    { new: true }
  );

  if (!email) {
    throw new NotFoundError("Document not found.");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Email marked as sended successfully.",
      data: email,
    })
  );
};
