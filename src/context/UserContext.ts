import { createContext } from "react";
import { UserClientTypes } from "../types/ClientTypes";

interface UserContextType {
  profile: UserClientTypes | null;
  setUser: (newProfile: UserClientTypes) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
