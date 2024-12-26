import { Accounts } from "../models/accounts.model.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { ApiResponce } from "../utils/apiResponce.util.js";

/** __________ Store Emails __________ */
export const storeEmailAccounts = async (req, res) => {
  const { docs } = req.body;

  if (!Array.isArray(docs) || docs.length === 0) {
    throw new BadRequestError(
      "Invalid data format. Expected array of documents."
    );
  }
  await Promise.all(
    docs.map(async (doc) => {
      await Accounts.create(doc);
    })
  );

  return res.status(201).json(
    new ApiResponce({
      statusCode: 201,
      message: "Data imported successfully",
    })
  );
};

/** __________ GET ALL EMAILS __________ */
export const getAllEmailAccountDetails = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const emails = await Accounts.find().skip(skip).limit(limit);

  const totalEmails = await Accounts.countDocuments();

  const pagination = {
    page,
    limit,
    totalEmails,
    totalPages: Math.ceil(totalEmails / limit),
    hasNextPage: page * limit < totalEmails,
    hasPrevPage: page > 1,
  };

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Emails fetched successfully.",
      pagination,
      data: emails,
    })
  );
};

/** __________ GET ALL ENABLED EMAILS __________ */
export const getAllEnabledEmailAccounts = async (req, res) => {
  const value = parseInt(req.query.value) || 0;
  const { ids } = req.body;
  console.log("boyyyyyyyyyyyyyyyyyyyy: ", req.body);
  console.log("Idssssssssssssssssssssssssssssss: ", ids);
  const emails = await Accounts.find({ Enable: 1, _id: { $in: ids } }).sort({
    Email: 1,
  });
  // .skip(value)
  // .limit(value);

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "All enabled emails fetched successfully.",
      data: emails,
    })
  );
};

/** __________ GET EMAIL ACCOUNT DETAILS BY ID __________ */
export const getEmailAccountDetialsById = async (req, res) => {
  const accountDetails = await Accounts.findOne({ _id: req.params.id });

  if (!accountDetails) {
    throw new NotFoundError("Details not found.");
  }

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Details fetched successfully.",
      data: accountDetails,
    })
  );
};

/** __________ UPDATE EMAIL ACCOUNT DETAILS __________ */
export const updateEmailAcoutnDetails = async (req, res) => {
  const accountDetails = await Accounts.findOne({ _id: req.params.id });

  if (!accountDetails) {
    throw new NotFoundError("Details not found.");
  }

  await Accounts.findOneAndUpdate({ _id: req.params.id }, req.body);

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Details updated successfully.",
    })
  );
};

/** __________ DELETED EMAIL ACCOUNT DETAILS __________ */
export const deleteEmailAcoutnDetails = async (req, res) => {
  const accountDetails = await Accounts.findOne({ _id: req.params.id });

  if (!accountDetails) {
    throw new NotFoundError("Details not found.");
  }

  await Accounts.findOneAndDelete({ _id: req.params.id });

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Details deleted successfully.",
    })
  );
};

/** __________ CHANGE ACCOUNT ACTIVE STATE __________ */
export const changeActiveState = async (req, res) => {
  const accountDetails = await Accounts.findOne({ _id: req.params.id });

  if (!accountDetails) {
    throw new NotFoundError("Details not found.");
  }

  if (accountDetails.Enable === 1) {
    accountDetails.Enable = 0;
  } else {
    accountDetails.Enable = 1;
  }
  await accountDetails.save();

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Account active state changed successfully.",
    })
  );
};

/** __________ CHANGE ACCOUNT ACTIVE STATE __________ */
export const changeAccountVisibility = async (req, res) => {
  const accountDetails = await Accounts.findOne({ _id: req.params.id });

  if (!accountDetails) {
    throw new NotFoundError("Details not found.");
  }

  if (accountDetails.Enable === 1) {
    accountDetails.Enable = 0;
  } else {
    accountDetails.Enable = 1;
  }
  await accountDetails.save();

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Account visibility state changed successfully.",
    })
  );
};

/** __________ INCREASE LIMIT __________ */
export const increaseLimit = async (req, res) => {
  const accountDetails = await Accounts.findOne({ _id: req.params.id });

  if (!accountDetails) {
    throw new NotFoundError("Details not found.");
  }

  accountDetails.Limit += 1;
  await accountDetails.save();

  return res.status(200).json(
    new ApiResponce({
      statusCode: 200,
      message: "Account limit increased successfully.",
    })
  );
};
