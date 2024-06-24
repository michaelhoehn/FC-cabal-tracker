export const fetchDuneData = async () => {
  const DUNE_API_KEY = process.env.REACT_APP_DUNE_API_KEY;
  const response = await fetch(
    "https://api.dune.com/api/v1/query/3854565/results",
    {
      headers: {
        "X-Dune-API-Key": DUNE_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const fids = data.result.rows.slice(0, 50).map((row) => row.fid);

  return fids;
};
