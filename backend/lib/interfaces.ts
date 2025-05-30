import { JwtPayload } from "jsonwebtoken";

export interface UserData extends JwtPayload {
  id: number;
  email: string;
  role: string;
  name: string;
}
