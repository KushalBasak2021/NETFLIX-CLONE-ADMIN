import { Email, PermIdentity, Publish } from "@material-ui/icons";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import axios from "axios";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import { UserContext } from "../../context/userContext/UserContext";
import { useContext } from "react";
import { updateUser } from "../../context/userContext/UserApiCalls";
import { useHistory } from "react-router-dom";

export default function User() {
  const { dispatch } = useContext(UserContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: "",
    isAdmin: false,
  });
  const history = useHistory();
  console.log(id);

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get(
        `https://netflix-clone-backend-c5fq.onrender.com/api/users/find/${id}`,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setUser(res.data);
    };
    getUserDetails();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
            setUser((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    updateUser(user, id, dispatch);
    history.push("/users");
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: profilePic, label: "profilePic" }]);
  };

  console.log(user);
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.profilePic ||
                "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <Email className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={user.username}
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={user.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    profilePic !== null
                      ? URL.createObjectURL(profilePic)
                      : user.profilePic ||
                        "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                  }
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  name="profilePic"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>
              {profilePic === null && (
                <button className="userUpdateButton" onClick={handleUpdate}>
                  Update
                </button>
              )}

              {profilePic !== null && uploaded !== 1 && (
                <button className="userUpdateButton" onClick={handleUpload}>
                  Upload
                </button>
              )}

              {uploaded === 1 && (
                <button className="userUpdateButton" onClick={handleUpdate}>
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
