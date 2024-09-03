import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface IContact
  extends Model<InferAttributes<IContact>, InferCreationAttributes<IContact>> {
  id: CreationOptional<number>;
  phoneNumber?: string | null;
  email?: string | null;
  linkedId?: number | null;
  linkPrecedence: "primary" | "secondary";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface ICreateContactDto {
  phoneNumber?: string | null;
  email?: string | null;
  linkPrecedence: "primary" | "secondary";
  linkedId?: number | null;
}

export interface IUpdateContactDto extends Partial<IContact> {}

export interface IContactBodyDto {
  email?: string;
  phoneNumber?: string;
}
