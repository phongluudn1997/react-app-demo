import * as React from "react";
import axios from "axios";

import { useAsync } from "../hooks/useAsync";

const Posts = () => {
  const { execute, data, isLoading, isSuccess } = useAsync();
  React.useEffect(() => {
    execute(axios.get("https://jsonplaceholder.typicode.com/posts"));
  }, [execute]);

  if (isLoading) return <h1>Loading...</h1>;
  else if (isSuccess) {
    console.log(data);
  }

  return <h1>Posts</h1>;
};

export { Posts };
