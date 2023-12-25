import { createContext } from "react";

interface UserContextType {
  username: string;
  setUser: (newUname: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
