import { createContext } from "react";

interface UserContextType {
  username: string;
  status: string;
  setUser: (newUname: string) => void;
  setStatus: (newStatus: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
