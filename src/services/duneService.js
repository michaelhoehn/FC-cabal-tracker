// src/services/duneService.js
export let duneFids = [];

export const fetchDuneData = async () => {
  const DUNE_API_KEY = process.env.REACT_APP_DUNE_API_KEY;
  // console.log("Dune API Key:", DUNE_API_KEY); // Log to check if the key is being read correctly
  const response = await fetch(
    "https://api.dune.com/api/v1/query/3854565/results",
    {
      headers: {
        "X-Dune-API-Key": DUNE_API_KEY,
      },
    }
  );

  if (!response.ok) {
    console.error("Dune API Error:", response.status, response.statusText); // Log the error response
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  console.log("Dune API Response:", data); // Log the response data

  // Extract the first 50 'fid' values
  duneFids = data.result.rows.slice(0, 50).map((row) => row.fid);

  return data;
};
