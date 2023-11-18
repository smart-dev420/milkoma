import axios from "axios";
import { HOST_URL } from "../components/Constants";

export const API = HOST_URL;

export const fetcher =
  <T, U>(endpoint: string, token: string, map?: (data: T) => U) =>
  async () => {
    const res = await fetch(`${API}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();

    return map ? map(data) : data;
  };

  // export const poster =
  // (
  //   endpoint: string,
  //   token: string,
  //   method: "POST" | "PUT" | "DELETE" = "POST"
  // ) =>
  // async (data: Object) => {
  //   return await fetch(`${API}${endpoint}`, {
  //     method: method,
  //     headers: {
  //       "X-Requested-With": "XMLHttpRequest",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data?.error) {
  //         throw new Error(JSON.stringify(data.error), data.error);
  //       }
  //       if (data?.errors?.length) {
  //         throw new Error(JSON.stringify(data.errors), data.errors);
  //       }
  //       return data;
  //     })
  //     .catch((err) => ({ err }));
  // };


  export const Reserposter = (
    endpoint: string,
    token: string,
    method: "POST" | "PUT" | "DELETE" = "POST"
  ) => async (data: Object) => {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method: method,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
  
      if (responseData?.error) {
        throw new Error(JSON.stringify(responseData.error), responseData.error);
      }
  
      if (responseData?.errors?.length) {
        throw new Error(JSON.stringify(responseData.errors), responseData.errors);
      }
  
      return responseData;
    } catch (err) {
      return { err };
    }
  };
export const uploadImage =
  async (endpoint: string, token: string|null,formdata: any)=> {
    return await axios
      .post(`${API}${endpoint}`, formdata, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })

      .then((data) => {
        console.log(data.data)
        return data.data;
      })
      .catch((err) => ({ err }));
  };
export const filePoster = async ({
  file,
  authToken
}: {
  file: File;
  authToken: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);

  return await fetch(`${API}/images`, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${authToken}`
    },
    body: formData
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export const poster =
  async (
    endpoint: string, 
    token: string|null,
    formdata: any)=> {
    return await axios
      .post(`${API}${endpoint}`, formdata, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data)
        return res.data;
      })
      .catch((err) => ({ err }));
  };



