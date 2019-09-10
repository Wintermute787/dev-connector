import axios from "axios";

import { ADD_POST, GET_ERRORS } from "./types";

//add Post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catcn(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};