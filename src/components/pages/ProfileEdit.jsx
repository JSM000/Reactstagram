import React, { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as firebaseStorage from "../../service/firebaseStorage";
import { updateProfile } from "../../modules/profileDB";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import FIleinput from "../innerComponents/FIleinput";
import Loading from "./Loading";

const TopBtns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 30px;
`;
const Title = styled.div`
  margin-right: 150px;
  font-weight: bolder;
  font-size: 1rem;
`;
const NoneBtn = styled.button`
  background: none;
  border: none;
  color: #0095f6;
`;
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const InputBox = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  margin: 10px;
`;
const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: grey;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileEdit = () => {
  const navigate = useNavigate();
  const introduceRef = useRef();
  const userNameRef = useRef();
  const [file, setFile] = useState({});
  const [loading, setloading] = useState(false);

  // 전역값 받아오기
  const Profile = useSelector(({ profileDB }) => profileDB.Profile);
  const dispatch = useDispatch();
  const onUpdateProfile = useCallback((ref, profile) =>
    dispatch(updateProfile(ref, profile))
  );

  //제출버튼 클립하면,
  // 1. 로딩 표시
  // 2. 이미지 스토리지에 저장
  // 2. 프로필 DB에 저장, 전역에 저장
  // 3. 프로필로 페이지 이동
  const onSubmitBtnClick = async () => {
    setloading(true);
    try {
      const url = await firebaseStorage.putStorage("ProfileImg", file);
      const UserImgURL = url ? url : Profile.UserImgURL;
      const profile = {
        Introduce: introduceRef.current.value,
        Uid: Profile.Uid,
        UserImgURL,
        UserName: userNameRef.current.value,
      };
      await onUpdateProfile(`users/${Profile.Uid}/Profile`, profile);
      navigate("/MyPage");
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <UploadContainer>
        <TopBtns>
          <NoneBtn onClick={() => navigate("/Mypage")}>
            <AiOutlineClose />
          </NoneBtn>
          <Title>프로필 편집</Title>
          <NoneBtn onClick={onSubmitBtnClick}>
            <AiOutlineCheck />
          </NoneBtn>
        </TopBtns>
        <FIleinput
          UserImgURL={Profile.UserImgURL}
          saveFile={(file) => setFile(file)}
        />
        <InputBox
          ref={userNameRef}
          type="text"
          placeholder="이름"
          defaultValue={Profile.UserName}
        />
        <InputBox
          ref={introduceRef}
          placeholder="소개"
          name="post_content"
          defaultValue={Profile.Introduce}
        />
      </UploadContainer>
      {loading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
    </>
  );
};

export default React.memo(ProfileEdit);
