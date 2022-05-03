import React, { useState, useEffect } from "react";
import * as firebaseDB from "../../service/firebaseDB";
import Post from "../innerComponents/Post";

function Home() {
  const [posts, setPosts] = useState({});
  useEffect(() => {
    try {
      firebaseDB.syncDB("posts/", (data) => {
        setPosts(data);
      });
    } catch (e) {
      throw e;
    }
  }, [firebaseDB]);

  return (
    <div>
      {posts &&
        Object.keys(posts).map((key) => <Post key={key} post={posts[key]} />)}
    </div>
  );
}

export default React.memo(Home);
