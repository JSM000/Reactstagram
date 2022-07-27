import React, { useState } from "react";
import Welcome from "./Welcome";

const Create = (props) => {
  const [backBtn, setBackBtn] = useState(false);

  return (
    <>
      {backBtn && <Welcome></Welcome>}
      {!backBtn && <button onClick={() => setBackBtn(true)}>뒤로가기</button>}
    </>
  );
};

export default Create;
