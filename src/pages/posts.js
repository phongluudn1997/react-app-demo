import * as React from "react";
import { client } from "../utils/api-clients";

import { useAsync } from "../utils/hooks/useAsync";

const Posts = () => {
  const { execute, data, isLoading, isSuccess } = useAsync();
  React.useEffect(() => {
    execute(client("posts"));
  }, [execute]);

  if (isLoading) return <h1>Loading...</h1>;
  else if (isSuccess) {
    console.log(data);
  }

  return <h1>Posts</h1>;
};

export { Posts };
