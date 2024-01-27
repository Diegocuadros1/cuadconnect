import React, { Fragment, useEffect } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  console.log(`ID IS ${id}`);

  useEffect(() => {
    getPost(id);
  }, [getPost]);

  return loading || post === null ? (<Spinner />) : (<Fragment>
    <Link to='/posts' className='btn'>Back To Posts</Link>
    <PostItem post={post} showActions={false}/>
    <CommentForm postId={post._id} />
  </Fragment>)
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
