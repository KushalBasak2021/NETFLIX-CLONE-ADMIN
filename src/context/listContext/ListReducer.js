const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS_START":
      return {
        lists: [],
        isFetching: true,
        error: false,
      };
    case "GET_LISTS_SUCCESS":
      return {
        lists: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_LISTS_FAILURE":
      return {
        lists: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_LIST_START":
      return {
        lists: state.lists,
        isFetching: true,
        error: false,
      };
    case "DELETE_LIST_SUCCESS":
      return {
        lists: state.lists.filter((list) => list._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_LIST_FAILURE":
      return {
        lists: state.lists,
        isFetching: false,
        error: true,
      };

    case "CREATE_LIST_START":
      return {
        lists: state.lists,
        isFetching: true,
        error: false,
      };
    case "CREATE_LIST_SUCCESS":
      return {
        lists: [...state.lists, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_LIST_FAILURE":
      return {
        lists: state.movies,
        isFetching: false,
        error: true,
      };
    //   case "UPDATE_MOVIE_START":
    //     return {
    //       movies: state.movies,
    //       isFetching: true,
    //       error: false,
    //     };
    //   case "UPDATE_MOVIE_SUCCESS":
    //     return {
    //       movies: state.movies.map((movie) => {
    //         if (movie._id !== action.payload._id) {
    //           return movie;
    //         } else {
    //           return action.payload;
    //         }
    //       }),
    //       isFetching: false,
    //       error: false,
    //     };
    //   case "UPDATE_MOVIE_FAILURE":
    //     return {
    //       movies: state.movies,
    //       isFetching: false,
    //       error: true,
    //     };

    default:
      return { ...state };
  }
};

export default ListReducer;
