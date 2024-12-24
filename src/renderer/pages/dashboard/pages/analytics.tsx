import { LineChart } from 'recharts';

const Analytics = () => {
  return (
    <div>
      <h3>Analytics</h3>
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
