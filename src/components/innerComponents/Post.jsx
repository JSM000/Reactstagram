import React from "react";
import styled from "styled-components";

const PostBlock = styled.div`
  width: 100%;
  height: 100%;
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  display: flex;
  flex-direction: column;
`;

const PostImg = styled.img`
  width: 100%;
  height: 300px;
`;

const PostText = styled.p`
  margin: 0px;
  padding: 5px;
`;

const Post = ({ post }) => {
  return (
    <PostBlock key={post.postKey}>
      <PostText>{`게시자: ${post.userName}`}</PostText>
      <PostImg src={post.imgURL} />
      <PostText>{`좋아요: ${post.starCount}`}</PostText>
      <PostText>{post.postContent}</PostText>
    </PostBlock>
  );
};

export default Post;
