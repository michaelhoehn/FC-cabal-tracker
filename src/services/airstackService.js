// src/services/airstackService.js
import { init, fetchQuery } from "@airstack/airstack-react";
import { duneFids } from "./duneService";

const AIRSTACK_API_KEY = process.env.REACT_APP_AIRSTACK_API_KEY;
// console.log("Airstack API Key:", AIRSTACK_API_KEY); // Log to check if the key is being read correctly

// Initialize the Airstack SDK
init(AIRSTACK_API_KEY);

export const fetchAirstackData = async () => {
  // Transform duneFids to match the expected format (e.g., "fc_fid:1110")
  const formattedFids = duneFids.map((fid) => `\"fc_fid:${fid}\"`).join(", ");

  const query = `
    query GetLatestCastsByFids {
      FarcasterCasts(
        input: {
          blockchain: ALL, 
          filter: {
            castedBy: {
              _in: [${formattedFids}]
            }, 
            castedAtTimestamp: {
              _gte: "2024-06-22T00:00:00Z", 
              _lt: "2024-06-23T00:00:00Z"
            }
          }, 
          limit: 50
        }
      ) {
        Cast {
          castedAtTimestamp
          url
          text
          numberOfReplies
          numberOfRecasts
          numberOfLikes
          fid
          castedBy {
            profileName
            profileImage
          }
          channel {
            name
          }
        }
      }
    }
  `;

  const response = await fetchQuery(query);
  if (response.errors) {
    console.error("Airstack API Error:", response.errors); // Log any errors from the response
  } else {
    console.log("Airstack API Response:", response); // Log the response data
  }

  return response;
};
