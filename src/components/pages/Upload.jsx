import React, { useRef, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  width: 350px;
  height: 200px;
  padding: 10px;
  border-radius: 10px;
  background-color: #eaeaeaea;
  border: 3px solid #a1a1a1a1;
`;
const Textarea = styled.textarea`
  margin: 15px;
  border-radius: 10px;
  width: 350px;
  height: 150px;
  text-align: center;
`;
const Img = styled.img`
  height: 100%;
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
const UploadBtn = styled.button`
  width: 350px;
  padding: 10px 0px;
  color: white;
  font-weight: bold;
  background-color: #0095f6;
  border: none;
  border-radius: 10px;
`;

function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const previewRef = useRef();
  const postContentRef = useRef();
  const [file, setFile] = useState();
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
  const onSubmitBtnClick = async () => {
    setloading(true);
    try {
      const url = await firebaseStorage.putStorage("PostImg", file);
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

  return (
    <>
      <UploadContainer>
        <FileInputButton onClick={onFileInputBtnClick}>
          {file ? "" : "사진"}
          <Img ref={previewRef} />
        </FileInputButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <Textarea ref={postContentRef} placeholder="내용" name="post_content" />
        <UploadBtn onClick={onSubmitBtnClick}>글 올리기</UploadBtn>
      </UploadContainer>
      {loading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
    </>
  );
}

export default Upload;
