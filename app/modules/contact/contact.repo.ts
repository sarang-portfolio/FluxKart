import { Op } from "sequelize";
import { contactModel } from "./contact.schema";
import {
  IContact,
  ICreateContactDto,
  IUpdateContactDto,
} from "./contact.types";

const create = (createContactDto: ICreateContactDto): Promise<IContact> =>
  contactModel.create({ ...createContactDto }, { raw: true });

const getAll = (): Promise<IContact[]> => contactModel.findAll({ raw: true });

const getOneContact = (
  email?: string,
  phoneNumber?: string
): Promise<IContact[]> => {
  return contactModel.findAll({
    where: { [Op.or]: [{ email }, { phoneNumber }] },
    raw: true,
  });
};

const getPrimaryContact = (id: number): Promise<IContact | null> =>
  contactModel.findOne({ where: { id: id }, raw: true });

const update = (
  id: number,
  updateContactDto: IUpdateContactDto
): Promise<[affectedCount: number]> =>
  contactModel.update(
    {
      // linkPrecedence: updateContactDto.linkPrecedence,
      // linkedId: updateContactDto.olderPrimaryUserId,
      ...updateContactDto,
    },
    { where: { id: id } }
  );

export default {
  create,
  getAll,
  getOneContact,
  getPrimaryContact,
  update,
};
