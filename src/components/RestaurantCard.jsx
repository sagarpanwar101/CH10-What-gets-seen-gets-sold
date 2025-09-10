import { Link } from "react-router-dom";
import {IMG_CDN} from "../../utils/config"; 

const RestaurantCard = ({data}) => {
    const restID = data?.info?.id
    return (
      <div className="card p-4 m-5 w-60 hover:scale-105 transition duration-300 ease-in-out">
        <Link to={`/restaurantmenu/${restID}`}>
        <img src={ IMG_CDN + data?.info?.cloudinaryImageId } alt={data?.info} 
          className="w-full h-50 object-cover rounded-lg mb-3" />
        
        <p className="card-title"> <strong> {data?.info?.name} </strong> </p>
        <p className="card-tags">{data?.info.cuisines.join(", ")}</p>
        <p className="card-rating"> ★ {data?.info?.avgRating} </p>
       
        </Link>
      </div>
    );
  };

export default RestaurantCard;