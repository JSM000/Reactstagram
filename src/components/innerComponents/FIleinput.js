import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const FileInputButton = styled.button`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bolder;
  color: #0095f6;
  text-align: center;
`;
const UserImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 10px;
`;

const FIleinput = ({ saveFile, UserImgURL }) => {
  const fileInputRef = useRef();
  const previewRef = useRef();

  useEffect(() => {
    if (UserImgURL) {
      previewRef.current.src = UserImgURL;
    }
  }, [UserImgURL, previewRef]);

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
    saveFile(newfile);
  };

  return (
    <>
      <FileInputButton onClick={onFileInputBtnClick}>
        <UserImg ref={previewRef} src="images/default_profile.png" />
      </FileInputButton>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default FIleinput;
