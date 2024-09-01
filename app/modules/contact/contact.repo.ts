import { contactModel } from "./contact.schema";
import { IContact, ICreateContact } from "./contact.types";

const create = (createContactDto: ICreateContact) =>
  contactModel.create({ ...createContactDto });

const getAll = () => contactModel.findAll({ raw: true });

export default {
  create,
  getAll,
};
