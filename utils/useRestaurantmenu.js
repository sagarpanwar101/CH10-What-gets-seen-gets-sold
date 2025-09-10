import { useEffect, useState } from "react";
import { GET_MENU_API_URL } from "../utils/config.js";

const useRestaurantMenu = (id) => {
    const [resInfo, setResInfo] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchMenu = async () => {
            try {
                const res = await fetch(GET_MENU_API_URL(id));
                const json = await res.json();

                const info = json?.data?.cards?.[2]?.card?.card?.info || null;
                setResInfo(info);

                const items = json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards || [];
                setMenuItems(items);
            } catch (e) {
                setError("Failed to load menu");
            }
        };

        fetchMenu();
    }, [id]);

    return { resInfo, menuItems, error };
};

export default useRestaurantMenu;