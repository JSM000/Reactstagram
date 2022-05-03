import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
  .asd {
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
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const goProfileEdit = () => {
    navigate("/ProfileEdit");
  };
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
        <UserImg />
        <UserDataSec>
          <UserDataBlock>게시물 0</UserDataBlock>
          <UserDataBlock>팔로워 0</UserDataBlock>
          <UserDataBlock>팔로잉 0</UserDataBlock>
        </UserDataSec>
      </ProfileZone>
      <UserZoen>
        <strong>테리어몬</strong>
        <div>안녕하세요</div>
        <div className="asd">반가워요</div>
      </UserZoen>
      <ProfileBtn onClick={goProfileEdit}>프로필 편집</ProfileBtn>
      <ProfileBtn onClick={onLogout}>로그아웃</ProfileBtn>
    </>
    //  <button onClick={() => navigate('/')}>홈으로</button>
  );
};

export default MyPage;
