import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { postFetch } from "../useFetch";
import { useDispatch } from "react-redux";
import { createData } from "../app/store";
import { twMerge } from "tailwind-merge";

export default function Input() {
  const [value, setValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  type createListType = {
    name: string;
    status: string;
  };

  const dispatch = useDispatch();
  async function _createList() {
    if (!value) {
      setErrorMsg("請輸入代辦事項");
      return;
    }
    const reqData = {
      name: value,
      status: "pending",
    };
    const { data } = await postFetch<createListType>(
      "http://localhost:8000/lists",
      reqData
    );
    dispatch(createData(data));
    setValue("");
    setErrorMsg("");
  }

  return (
    <section className="flex justify-center items-center mb-10">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="請輸入代辦事項..."
          value={value}
          className={twMerge("input-text mr-2", errorMsg && 'border border-solid border-red-500')}
          onChange={(e) => setValue(e.target.value)}
        />
        {errorMsg && (
          <p className="absolute -bottom-5 text-red-500 text-xs">{errorMsg}</p>
        )}
      </div>
      <button
        className="text-5xl text-white hover:opacity-80"
        onClick={_createList}
      >
        <CiSquarePlus />
      </button>
    </section>
  );
}
