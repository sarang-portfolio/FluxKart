import { Router } from "express";
import { ResponseHandler } from "../../utility/responseHandler";
import contactService from "./contact.service";
import { IContactBodyDto } from "./contact.types";

export const ContactRouter = Router();

ContactRouter.post("/identify", async (req, res, next) => {
  try {
    const { email, phoneNumber } = req.body as IContactBodyDto;
    const response = await contactService.identifyUser(email, phoneNumber);
    return res.send(new ResponseHandler(response));
  } catch (error) {
    next(error);
  }
});
