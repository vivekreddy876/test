import { useParams, Link } from "react-router-dom";

const DayPage = () => {
  const { dayName } = useParams();

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>{dayName} Details</h1>

      <p>You clicked the {dayName} bar.</p>

      <Link to="/">← Back</Link>
    </div>
  );
};

export default DayPage;