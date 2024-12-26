import { useNavigate } from 'react-router-dom';
import { LineChart } from 'recharts';

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Analytics</h3>
        <button
          onClick={() => navigate('/')}
          className="btn btn-sm btn-primary"
        >
          Back
        </button>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <LineChart />
          {/* <BarCharts /> */}
        </div>
        {/* <div className="col-sm-6">
          <RadialBarchart />
        </div>
        <div className="col-sm-6">
          <BarCharts />
        </div> */}
        <div className="col-sm-6"></div>
      </div>
    </div>
  );
};

export default Analytics;
