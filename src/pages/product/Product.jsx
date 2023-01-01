import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { updateMovie } from "../../context/movieContext/movieApiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";

export default function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [movie, setMovie] = useState({
    desc: "",
    genre: "",
    img: "",
    imgSm: "",
    imgTitle: "",
    isSeries: false,
    limit: 0,
    title: "",
    trailer: "",
    video: "",
    year: "",
  });
  const [img, setImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [filesTobeUploaded, setFilesTobeUploaded] = useState(0);

  const { dispatch } = useContext(MovieContext);

  useEffect(() => {
    const getMovieDetails = async () => {
      const res = await axios.get(
        `https://netflix-clone-backend-c5fq.onrender.com/api/movies/find/${id}`,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setMovie(res.data);
    };
    getMovieDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    updateMovie(movie, id, dispatch);
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  if (filesTobeUploaded === uploaded) console.log("true");
  console.log(filesTobeUploaded, uploaded);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie?.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Name</label>
            <input
              type="text"
              value={movie.title}
              name="title"
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              type="text"
              value={movie.year}
              name="year"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              value={movie.genre}
              name="genre"
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              type="text"
              value={movie.limit}
              name="limit"
              onChange={handleChange}
            />
            <label>Trailer</label>
            <input
              type="file"
              placeholder={movie.trailer}
              name="trailer"
              onChange={(e) => {
                setTrailer(e.target.files[0]);
                setFilesTobeUploaded((prev) => prev + 1);
              }}
            />
            <label>Video</label>
            <input
              type="file"
              placeholder={movie.video}
              name="video"
              onChange={(e) => {
                setVideo(e.target.files[0]);
                setFilesTobeUploaded((prev) => prev + 1);
              }}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={img !== null ? URL.createObjectURL(img) : movie.img}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                name="img"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                  setFilesTobeUploaded((prev) => prev + 1);
                }}
              />
            </div>
            {uploaded === 3 ? (
              <button className="addProductButton" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className="addProductButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
