import React, { useRef, useState } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
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

function Upload() {
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
          사진넣기
          <img ref={previewRef} style={{ height: "150px" }}></img>
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
          placeholder="내용"
          name="post_content"
          style={{ width: "300px", height: "150px" }}
        />
        <button onClick={onSubmitBtnClick}>글 올리기</button>
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
}

export default Upload;
