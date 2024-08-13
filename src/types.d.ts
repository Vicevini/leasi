import { User } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Torne o user opcional e use o tipo User
    }
  }
}
