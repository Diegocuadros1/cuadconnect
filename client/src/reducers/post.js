import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case GET_POSTS:
      return {
        ...state, //getting the previous state
        posts: payload, //getting every users posts
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        //taking out the single post that was deleted and setting that to the new post id
        posts: state.posts.filter((post) => post._id !== payload), //for each post, match post id where it is not equal to the payload
        loading: false,
      };

    case UPDATE_LIKES:
      return {
        ...state,
        //looping through the posts, if the post matches the post id,
        //then update the likes, else, just return the post
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    default:
      return state;
  }
}
