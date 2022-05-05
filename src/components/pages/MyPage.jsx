import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as firebaseAuth from "../../service/firebaseAuth";

const ProfileZone = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
`;
const UserImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 10px;
`;
const UserZoen = styled.div`
  padding: 10px;
  strong {
    font-size: 20px;
  }
  div {
    color: #000;
  }
`;

const UserDataSec = styled.div`
  display: flex;
`;
const UserDataBlock = styled.p`
  margin: 10px;
  font-weight: bold;
`;
const ProfileBtn = styled.button`
  width: 100%;
  background-color: #fff;
`;

const MyPage = (props) => {
  // 전역 Porfile 받아오기
  const profile = useSelector(({ profileDB }) => profileDB.Profile);

  // 버튼이벤트 - 프로필 편집으로 페이지 이동
  const navigate = useNavigate();
  const goProfileEdit = () => {
    navigate("/ProfileEdit");
  };

  // 버튼이벤트 - 로그아웃 시키기
  const onLogout = () => {
    try {
      firebaseAuth.logout();
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <ProfileZone>
        <UserImg
          src={
            profile.UserImgURL
              ? profile.UserImgURL
              : "images/default_profile.png"
          }
        />
        <UserDataSec>
          <UserDataBlock>게시물 0</UserDataBlock>
          <UserDataBlock>팔로워 0</UserDataBlock>
          <UserDataBlock>팔로잉 0</UserDataBlock>
        </UserDataSec>
      </ProfileZone>
      <UserZoen>
        <strong>{profile.UserName}</strong>
        <div>{profile.Introduce && profile.Introduce}</div>
      </UserZoen>
      <ProfileBtn onClick={goProfileEdit}>프로필 편집</ProfileBtn>
      <ProfileBtn onClick={onLogout}>로그아웃</ProfileBtn>
    </>
  );
};

export default MyPage;
