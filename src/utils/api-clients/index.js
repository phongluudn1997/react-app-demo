import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const client = (
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) => {
  return axios({
    method: data ? "POST" : "GET",
    url: `${apiURL}/${endpoint}`,
    data: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  });
};

export { client };
