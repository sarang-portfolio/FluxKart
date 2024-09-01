import { Optional } from "sequelize";

export interface IContact {
  id: number;
  phoneNumber?: string | null;
  email?: string | null;
  linkedId?: number | null;
  linkPrecedence: "primary" | "secondary";
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface ICreateContact
  extends Optional<IContact, "id" | "createdAt" | "updatedAt" | "deletedAt"> {}
