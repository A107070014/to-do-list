import { TiDelete } from "react-icons/ti";
import { deleteFetch, editFetch, useGetFetch } from "../useFetch";
import {
  EStatus,
  deleteData,
  editData,
  listType,
  stateType,
} from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

export default function List() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: stateType) => state.activeTab);

  const { allData, error } = useGetFetch("/api/lists");
  const data = allData.filter((item) => {
    if (activeTab === EStatus.All) return true;
    if (item.status === activeTab) return true;
  });

  type editListType = {
    name: string;
    status: EStatus;
  };
  async function _editListStatus(item: listType) {
    const status =
      item.status === EStatus.Pending ? EStatus.Completed : EStatus.Pending;
    const reqData = { ...item, status };
    await editFetch<editListType>(`/api/lists/${item.id}`, reqData);
    dispatch(editData({ id: item.id, status }));
  }

  async function _deleteList(id: number) {
    await deleteFetch(`/api/lists/${id}`);
    dispatch(deleteData(id));
  }

  if (error) return <></>;
  return (
    <section>
      {data.map((item: listType) => (
        <div key={item.id} className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="input-checkbox mr-2"
              checked={item.status === EStatus.Completed}
              onChange={() => _editListStatus(item)}
            />
            <p
              className={twMerge(
                "mr-2",
                item.status === EStatus.Completed && "line-through"
              )}
            >
              {item.name}
            </p>
          </div>
          <div className="flex items-center">
            <TiDelete
              className="text-xl cursor-pointer hover:opacity-80"
              onClick={() => _deleteList(item.id)}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
