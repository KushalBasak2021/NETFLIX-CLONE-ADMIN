import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  //   updateMovieFailure,
  //   updateMovieStart,
  //   updateMovieSuccess,
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get(
      "https://netflix-clone-backend-c5fq.onrender.com/api/lists",
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

export const deleteList = async (listId, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete(`http://localhost:8800/api/lists/${listId}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteListSuccess(listId));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};

export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post(`http://localhost:8800/api/lists`, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

// export const updateMovie = async (movie, id, dispatch) => {
//   dispatch(updateMovieStart());
//   try {
//     const res = await axios.put(
//       `http://localhost:8800/api/movies/${id}`,
//       movie,
//       {
//         headers: {
//           token:
//             "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
//         },
//       }
//     );
//     dispatch(updateMovieSuccess(res.data));
//   } catch (err) {
//     dispatch(updateMovieFailure());
//   }
// };
