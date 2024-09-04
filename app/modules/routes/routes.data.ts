import { ContactRouter } from "../contact/contact.routes";
import { Routes, Route } from "./routes.types";

export const routes: Routes = [new Route("/contact", ContactRouter)];
