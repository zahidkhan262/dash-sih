import { useLocation } from "react-router-dom";

const findRouteName = (routes, pathname) => {
    for (const route of routes) {
        if (route.path === pathname) {
            return route.name;
        }

        if (route.subRoutes) {
            const subRouteName = findRouteName(route.subRoutes, pathname);
            if (subRouteName) {
                return subRouteName;
            }
        }

        if (route.subMenus) {
            const subMenuName = findRouteName(route.subMenus, pathname);
            if (subMenuName) {
                return subMenuName;
            }
        }
    }
    return null;
};

const useActiveRouteName = (routes) => {
    const location = useLocation();
    const pathname = location.pathname;

    return findRouteName(routes, pathname);
};

export default useActiveRouteName;