import { ContactRouter } from "../contact/contact.routes";
import { Routes, Route } from "./routes.types";

export const routes: Routes = [new Route("/user", ContactRouter)];
