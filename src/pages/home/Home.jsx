import Chart from "../../components/chart/Chart";
// import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
// import { authContext } from "../../context/authContext/AuthContext";

import { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(
          `https://netflix-clone-backend-c5fq.onrender.com/api/users/stats`,
          {
            headers: {
              token: "Bearer " + user.accessToken,
            },
          }
        );

        const stats = res.data.sort((a, b) => a._id - b._id);
        stats.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS, user]);

  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
