import React, { useRef, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useInputs from "../innerComponents/useInputs";
import styled from "styled-components";
import * as firebaseDB from "../../service/firebaseDB";
import * as firebaseStorage from "../../service/firebaseStorage";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const FileInputButton = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 200px;
  padding: 10px;
  &: active {
    opacity: 0.5;
  }
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
  const postContentRef = useRef();
  const [file, setFile] = useState({});
  const [loading, setloading] = useState(false);
  const uid = useSelector(({ profileDB }) => profileDB.Profile.Uid);

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
  // 2. 전체 포스트에 저장 / 현재 유저의 포스트에 저장
  // 3. 홈으로 페이지 이동
  const onSubmitBtnClick = async (e) => {
    setloading(true);
    try {
      const url = await firebaseStorage.putStorage(file);
      const postData = {
        postContent: postContentRef.current.value,
        imgURL: url,
        starCount: 0,
        uid: uid,
        userName: "정승민",
      };
      await firebaseDB.updateDB("posts", postData);
      await firebaseDB.updateDB(`users/${uid}/Posts`, postData);
      navigate("/");
    } catch (e) {
      throw e;
    }
  };

  const [{ username, text }, onChange, reset] = useInputs({
    username: "",
    text: "",
  });
  const nextId = useRef(4);
  return (
    <UploadContainer>
      <FileInputButton onClick={onFileInputBtnClick}>
        프로필 사진{" "}
        <img
          ref={previewRef}
          src="images/default_profile.png"
          style={{ height: "150px" }}
        ></img>
      </FileInputButton>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: "none" }}
      />
      <textarea
        ref={postContentRef}
        placeholder="자기소개"
        name="post_content"
        style={{ width: "300px", height: "150px" }}
      />
      <button onClick={onSubmitBtnClick}>등록하기</button>
    </UploadContainer>
  );
};

export default React.memo(ProfileEdit);
