
import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type MenuData = any; // Define this according to your menu data structure

const useMenuData = () => {
    const [menu, setMenu] = useState<MenuData | null>(null);
    const users = useSelector((state: RootState) => state.users.entities);

    useLayoutEffect(() => {
        if (users?.role?.menu) {
            const data = JSON.parse(users.role.menu);
            setMenu(data);
        }
    }, [users?.role?.menu]);

    return menu;
};

export default useMenuData;