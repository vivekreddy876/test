import "./WeeklyChart.css";
import { useNavigate } from "react-router-dom";

type ChartItem = {
  day: string;
  value: number;
};

const data: ChartItem[] = [
  { day: "High", value: 20 },
  { day: "Medium", value: 75 },
  { day: "Low", value: 68 },
];

const WeeklyChart = () => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="header">
        <h2>Current week</h2>

        <div className="total-section">
          <span className="count">199</span>
          <span className="subtitle">Total Calls</span>
        </div>
      </div>

      <div className="chart">
        {data.map((item) => (
          <div
            key={item.day}
            className="bar-wrapper"
            onClick={() => navigate(`/day/${item.day}`)}
          >
            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{
                  height: `${item.value}%`,
                }}
              />
            </div>

            <span className="label">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyChart;