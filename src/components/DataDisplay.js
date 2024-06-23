import React, { useEffect, useState } from "react";
import { fetchDuneData } from "../services/duneService";
import { fetchAirstackData } from "../services/airstackService";
import { fetchSocialCapitalData } from "../services/airstackSocialCap";
import OpenRankTable from "./OpenRankTable";
import SocialCapitalTable from "./SocialCapitalTable";
import "./OpenRankTable.css"; // Import the OpenRankTable CSS file
import "./SocialCapitalTable.css"; // Import the SocialCapitalTable CSS file

const DataDisplay = () => {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [algorithm, setAlgorithm] = useState("OpenRank");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (algorithm === "OpenRank") {
          await fetchDuneData();
          const airstackResult = await fetchAirstackData();
          if (airstackResult.data) {
            setCasts(airstackResult.data.FarcasterCasts.Cast);
          }
        } else if (algorithm === "Social Capital") {
          const socialCapitalResult = await fetchSocialCapitalData();
          if (socialCapitalResult.data) {
            setCasts(socialCapitalResult.data.TrendingCasts.TrendingCast);
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [algorithm]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h1>Crated by cmplx.eth</h1>
      <div className="button-group">
        <button
          className={algorithm === "OpenRank" ? "active" : ""}
          onClick={() => setAlgorithm("OpenRank")}
        >
          OpenRank
        </button>
        <button
          className={algorithm === "Social Capital" ? "active" : ""}
          onClick={() => setAlgorithm("Social Capital")}
        >
          Social Capital
        </button>
      </div>
      {algorithm === "OpenRank" ? (
        <OpenRankTable casts={casts} />
      ) : (
        <SocialCapitalTable casts={casts} />
      )}
    </div>
  );
};

export default DataDisplay;
