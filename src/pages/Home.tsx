import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import FilterData from "../components/FilterData";

interface Post{
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
};
  
}

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]); // Provide type for posts array

  async function fetchProductData() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data: Post[] = await res.json(); // Provide type for data
      setPosts(data);
    } catch (error) {
      console.log("Error in Home");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="parent-div">
      <FilterData/>
      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <div className="posts">
          {posts.map((post) => (
            <Product key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="">
          <p>No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
