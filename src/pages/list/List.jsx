import { Link, useLocation } from "react-router-dom";
import "./list.css";
// import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
// import { updateMovie } from "../../context/movieContext/movieApiCalls";
// import { MovieContext } from "../../context/movieContext/MovieContext";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import storage from "../../firebase";

export default function List() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [list, setList] = useState({
    title: "",
    type: "",
    genre: "",
    content: [],
  });

  // const { dispatch } = useContext(MovieContext);

  console.log(list, id);

  useEffect(() => {
    const getListDetails = async () => {
      const res = await axios.get(
        `https://netflix-clone-backend-c5fq.onrender.com/api/lists/find/${id}`,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setList(res.data);
    };
    getListDetails();
  }, [id]);

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   updateMovie(movie, id, dispatch);
  // };

  const handleChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newlist">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              value={list.title}
              name="title"
              onChange={handleChange}
            />
            <label>Type</label>
            <input
              type="text"
              value={list.type}
              name="type"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              value={list.genre}
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <button className="addProductButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
