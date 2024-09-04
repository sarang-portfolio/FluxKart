import { Router } from "express";
import { ResponseHandler } from "../../utility/responseHandler";
import contactService from "./contact.service";
import { IContactBodyDto } from "./contact.types";

export const ContactRouter = Router();

/**
 * @swagger
 *
 * /contact/identify:
 *   post:
 *     summary: Fetch primary user from DB or create if does not exist.
 *     description: This endpoint fetches the primary user who already has an existing email or phoneNumber from the DB, if not then creates a primary user in the DB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserIdentificationRequest'
 *     responses:
 *       '200':
 *         description: Successful identification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserIdentificationResponse'
 *       '400':
 *         description: Either email or phoneNumber must be provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 error:
 *                   type: object
 *                   properties:
 *                     statusCode:
 *                       type: integer
 *                       default: 400
 *                     message:
 *                       type: string
 *                       default: "Either email or phoneNumber must be provided."
 *
 * components:
 *   schemas:
 *     UserIdentificationRequest:
 *       type: object
 *       properties:
 *         phoneNumber:
 *           type: string
 *           format: phone-number
 *           description: Phone number of the user
 *           enum: ["123456"]
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *           enum: ["abc@example.com"]
 *       required:
 *         - phoneNumber
 *         - email
 *       additionalProperties: false
 *
 *     UserIdentificationResponse:
 *       type: object
 *       properties:
 *         primaryContactId:
 *           type: integer
 *           description: ID of the primary contact
 *         emails:
 *           type: array
 *           items:
 *             type: string
 *           description: List of unique email addresses
 *         phoneNumbers:
 *           type: array
 *           items:
 *             type: string
 *           description: List of unique phone numbers
 *         secondaryUserIds:
 *           type: array
 *           items:
 *             type: integer
 *           description: IDs of secondary contacts
 *       required:
 *         - primaryContactId
 *         - emails
 *         - phoneNumbers
 *       additionalProperties: false
 */

ContactRouter.post("/identify", async (req, res, next) => {
  try {
    const { email, phoneNumber } = req.body as IContactBodyDto;
    const response = await contactService.identifyUser(email, phoneNumber);
    return res.send(new ResponseHandler(response));
  } catch (error) {
    next(error);
  }
});
