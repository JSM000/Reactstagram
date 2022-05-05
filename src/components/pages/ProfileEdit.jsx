import React, { useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import styled from "styled-components";
import * as firebaseStorage from "../../service/firebaseStorage";
import { updateProfile } from "../../modules/profileDB";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
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
const SubmitBtn = styled.button`
  background: none;
  border: none;
`;
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const FileInputButton = styled.button`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bolder;
  color: #0095f6;
`;
const UserImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 10px;
`;
const InputBox = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  margin: 10px;
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  position: absolute;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileEdit = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const previewRef = useRef();
  const introduceRef = useRef();
  const userNameRef = useRef();
  const [file, setFile] = useState({});
  const [loading, setloading] = useState(false);

  // 전역값 받아오기
  const uid = useSelector(({ profileDB }) => profileDB.Profile.Uid);
  const dispatch = useDispatch();
  const onUpdateProfile = useCallback((ref, profile) =>
    dispatch(updateProfile(ref, profile))
  );
  //버튼 클릭 후 이미지 파일 열면,
  // 1. 이미지 미리보기로 보여주기
  // 2. 이미지 파일 useState로 저장해두기
  const onFileInputBtnClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  const onFileChange = (e) => {
    const reader = new FileReader();
    const newfile = e.target.files[0];
    reader.onload = (e) => {
      previewRef.current.src = e.target.result;
    };
    reader.readAsDataURL(newfile);
    setFile(newfile);
  };

  //제출버튼 클립하면,
  // 1. 로딩 표시
  // 2. 이미지 스토리지에 저장
  // 2. 프로필 DB에 저장, 전역에 저장
  // 3. 프로필로 페이지 이동
  const onSubmitBtnClick = async () => {
    setloading(true);
    try {
      const url = await firebaseStorage.putStorage("ProfileImg", file);
      const profile = {
        Introduce: introduceRef.current.value,
        Uid: uid,
        UserImgURL: url,
        UserName: userNameRef.current.value,
      };
      await onUpdateProfile(`users/${uid}/Profile`, profile);
      navigate("/MyPage");
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <UploadContainer>
        <TopBtns>
          <AiOutlineClose />
          <Title>프로필 편집</Title>
          <SubmitBtn onClick={onSubmitBtnClick}>
            <AiOutlineCheck style={{ color: "#0095f6" }} />
          </SubmitBtn>
        </TopBtns>
        <FileInputButton onClick={onFileInputBtnClick}>
          <UserImg ref={previewRef} src="images/default_profile.png" />
          프로필 사진 변경
        </FileInputButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <InputBox ref={userNameRef} type="text" placeholder="이름" />
        <InputBox ref={introduceRef} placeholder="소개" name="post_content" />
      </UploadContainer>
      {loading && (
        <LoadingContainer>
          <ReactLoading
            type="spin"
            color="white"
            width="200px"
            height="200px"
          />
        </LoadingContainer>
      )}
    </>
  );
};

export default React.memo(ProfileEdit);
