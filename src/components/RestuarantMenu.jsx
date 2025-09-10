import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN } from "../../utils/config.js";
import useRestaurantMenu from "../../utils/useRestaurantmenu.js";
import Shimmer from "./Shimmer";

const BASE_IMAGE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";

const RestuarantMenu = () => {
    const { id } = useParams();
    const { resInfo, menuItems, error } = useRestaurantMenu(id);
    const [showRecommended, setShowRecommended] = useState(true);

    if (error) return <div>{error}</div>;
    if (!resInfo) return <Shimmer />;

    return (
        <div className="restaurant-menu max-w-3xl mx-auto p-4">
            <div className="restaurant-summary flex items-center gap-4 mb-6">
                <img className="w-24 h-24 object-cover rounded" src={IMG_CDN + resInfo?.cloudinaryImageId} alt={resInfo?.name} />
                <div>
                    <h2 className="text-2xl font-semibold">{resInfo?.name}</h2>
                    <p className="text-gray-600">{resInfo?.cuisines?.join(", ")}</p>
                    <p className="text-sm">{resInfo?.avgRating} ★ | {resInfo?.sla?.slaString} | {resInfo?.costForTwoMessage}</p>
                </div>
            </div>

            <div className="mt-4">
                <button
                    className="w-full flex items-center justify-between bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded px-4 py-3 transition"
                    onClick={() => setShowRecommended(!showRecommended)}
                >
                    <span className="font-semibold text-orange-700">Recommended items</span>
                    <span className="text-sm bg-orange-200 text-orange-800 px-2 py-0.5 rounded">
                        {menuItems?.length || 0}
                    </span>
                </button>

                {showRecommended && (
                    <div className="grid gap-4 mt-4">
                        {menuItems.map((item, index) => (
                            <div className="menu-item flex gap-4 items-start border p-3 rounded" key={index}>
                                <img
                                    className="w-20 h-20 object-cover rounded"
                                    src={BASE_IMAGE_URL + item?.card?.info?.imageId}
                                    alt={item?.card?.info?.name}
                                />
                                <div>
                                    <h3 className="font-medium">{item?.card?.info?.name}</h3>
                                    <p className="text-sm text-gray-600">{item?.card?.info?.description}</p>
                                    <p className="text-sm">₹ {((item?.card?.info?.price ?? item?.card?.info?.defaultPrice) / 100) || "-"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestuarantMenu;