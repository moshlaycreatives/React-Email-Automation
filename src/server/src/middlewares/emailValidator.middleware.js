import { NotFoundError, BadRequestError } from "../errors/index.js";

export const emailValidator = (req, res, next) => {
  if (!req?.body?.email) {
    throw new NotFoundError("Email address must be provided.");
  }
  req.body.email = req.body.email.replace(/\s+/g, "").toLowerCase();

  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValidEmail = emailPattern.test(req.body.email);

  if (!isValidEmail) {
    throw new BadRequestError(
      "Please enter correct email address.(eg. example@example.com)"
    );
  }
  next();
};
