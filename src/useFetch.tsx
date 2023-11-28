import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllData, stateType } from "./app/store";

export const useGetFetch = (url: string) => {
  const [error, setError] = useState<string>("");
  const allData = useSelector((state: stateType) => state.allData);
  const dispatch = useDispatch();
  useEffect(() => {
    const get = async () => {
      try {
        const resData = await axios.get(url);
        setError("");
        dispatch(setAllData(resData.data));
      } catch (error) {
        // console.log("useGetFetch error:", error);
        setError(String(error));
      }
    };
    get();
  }, [url]);

  return { allData, error };
};

export const postFetch = async <T extends unknown>(url: string, reqData: T) => {
  return await axios.post(url, reqData);
};

export const editFetch = async <T extends unknown>(url: string, reqData:T ) => {
  return await axios.put(url, reqData);
};

export const deleteFetch = async (url: string) => {
  return await axios.delete(url);
};
