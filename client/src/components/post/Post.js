import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import { useParams } from "react-router-dom";

const Post = ({ getPost, post: { post, loading }, match }) => {
  const { id } = useParams();
  console.log(`ID IS ${id}`);

  useEffect(() => {
    getPost(id);
  }, [getPost]);

  return <div>post</div>;
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
