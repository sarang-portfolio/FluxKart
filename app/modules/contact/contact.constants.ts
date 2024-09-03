import { MessageHandler } from "../../utility/responseHandler";

export const CONTACT_CONSTANTS = {
  MISSING_CONTACT_INFO: new MessageHandler(
    400,
    "Either email or phoneNumber must be provided."
  ),
};
