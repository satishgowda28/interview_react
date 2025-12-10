import { Outlet } from "react-router";

const Root = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default Root;
