import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { add, remove } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
interface ProductProps {
  post: {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    rating: {
      rate: number;
      count: number;
    };
  };
}

const Product: React.FC<ProductProps> = ({ post }) => {
  const wishlist = useSelector((state: RootState) => state.wishlist); 
  console.log(wishlist);
  const dispatch = useDispatch();

  const addToWishList = () => {
    dispatch(add(post));
    toast.success("Item is added to your Wishlist");
  };

  const removeFromWishList = () => {
    dispatch(remove(post.id));
    toast.success("Item is removed from wishList");
  };
  const handleWishlistToggle = () => {
    if (wishlist.some((p) => p.id === post.id)) {
      removeFromWishList();
    } else {
      addToWishList();
    }
  };
  return (
    
    <Link to={`/product/${post.id}`} style={{ textDecoration: 'none' }}>
    <div className="post-container" >
      <div>
        <p className="product-title">{post.title.split(" ").slice(0,3).join(" ")}</p>
      </div>
      <div>
        <p className="product-description">{post.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
      </div>
      <div className="product-image">
        <img src={post.image} className="product-image" alt="product " />
      </div>
      <div className="product-wishlist-price">
        <p className="product-price" >$:{post.price}</p>
        <div onClick={handleWishlistToggle} className="wishlist-icon-container">
          {wishlist.some((p) => p.id === post.id) ? (
            <div className="heart-icon heart-icon-fa">
              <FaHeart className="heart-icon-inner" />
            </div>
          ) : (
            <div className="heart-icon heart-icon-ci">
              <CiHeart className="heart-icon-inner" />
            </div>
          )}
        </div>
      </div>
      
    </div>
    </Link>
  );
};

export default Product;
