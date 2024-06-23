import React, { useEffect, useState } from "react";
import { fetchDuneData } from "../services/duneService";
import { fetchAirstackData } from "../services/airstackService";
import CastTable from "./CastTable";

const DataDisplay = () => {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDuneData();
        const airstackResult = await fetchAirstackData();
        if (airstackResult.data) {
          setCasts(airstackResult.data.FarcasterCasts.Cast);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h1>Created by cmplx.eth</h1>
      <CastTable casts={casts} />
    </div>
  );
};

export default DataDisplay;
