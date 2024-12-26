import { useState } from 'react';
import { Tab } from '../interfaces/tabs';
import { Link, useLocation } from 'react-router-dom';

const Tabs = ({ items }: { items: Tab[] }) => {
  const location = useLocation();
  const item = items.find(item=>item.path === location.pathname)
  const [selectedItem, setSelectedItem] = useState(item?.id || 1);
  return (
    <div className="pt-4 mb-5">
      {items.map((item: Tab) => (
        <Link
          onClick={() => setSelectedItem(item.id)}
          className={`btn btn-sm btn-secondary me-5 fw-bold ${selectedItem === item.id ? 'text-light' : 'text-dark'}`}
          style={{
            border: '2px',
            borderRadius: '25px',
            borderStyle: 'solid',
            borderColor: 'rgb(250, 175, 67)',
            boxShadow: 'rgb(250, 175, 67) 0px 4px 0px',
            background:
              selectedItem === item.id ? 'rgb(250, 175, 67)' : '#FFFFFF',
            padding: '8px 20px',
            marginBottom: 10,
          }}
          key={item.id}
          to={item.path}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
