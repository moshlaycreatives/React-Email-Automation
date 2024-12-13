import { Outlet } from 'react-router-dom';

const RenderChild = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RenderChild;
