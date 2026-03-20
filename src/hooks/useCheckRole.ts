import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export const useCheckRoleLeTan = () => {
    const { entities } = useSelector((state: RootState) => state.users);
    return entities?.role?.id === 3;
  };
  
  export const useCheckRoleTuVan = () => {
    const { entities } = useSelector((state: RootState) => state.users);
    return entities?.role?.id === 2;
  };

  export const useCheckRoleAdmin= () => {
    const { entities } = useSelector((state: RootState) => state.users);
    return entities?.role?.id === 1;
  };