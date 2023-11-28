import { RxDashboard } from "react-icons/rx";
import { FiCheckCircle } from "react-icons/fi";
import { ImClock } from "react-icons/im";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { EStatus, setActiveTab, stateType } from "../app/store";

export default function Tab() {
  type tabType = {
    img: ReactNode;
    title: string;
    status: EStatus;
  };
  const tabs = [
    { img: <RxDashboard />, title: "All", status: EStatus.All },
    { img: <ImClock />, title: "Pending", status: EStatus.Pending },
    {
      img: <FiCheckCircle />,
      title: "Completed",
      status: EStatus.Completed,
    },
  ];

  const dispatch = useDispatch();
  const activeTab = useSelector((state: stateType) => state.activeTab);

  return (
    <section className="grid grid-cols-3 mb-4">
      {tabs.map((item: tabType) => (
        <div
          key={item.title}
          className={twMerge(
            "flex justify-center items-center text-white p-2 rounded-md cursor-pointer border-solid border-white hover:border-b",
            activeTab === item.status && "border-b"
          )}
          onClick={() => dispatch(setActiveTab(item.status))}
        >
          <span className="mr-2">{item.img}</span>
          <span>{item.title}</span>
        </div>
      ))}
    </section>
  );
}
