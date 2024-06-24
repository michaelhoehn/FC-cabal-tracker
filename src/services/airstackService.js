import { init, fetchQuery } from "@airstack/airstack-react";

const AIRSTACK_API_KEY = process.env.REACT_APP_AIRSTACK_API_KEY;
// console.log('Airstack API Key:', AIRSTACK_API_KEY); // Log to check if the key is being read correctly

// Initialize the Airstack SDK
init(AIRSTACK_API_KEY);

export const fetchAirstackData = async (fids) => {
  const fetchPromises = fids.map((fid) => {
    const query = `
      query GetMostRecentCastForFID {
        FarcasterCasts(input: {blockchain: ALL, filter: {castedBy: {_eq: "fc_fid:${fid}"}}, limit: 1}) {
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
    return fetchQuery(query).then((response) => {
      if (response.data && response.data.FarcasterCasts.Cast.length > 0) {
        return response.data.FarcasterCasts.Cast[0];
      }
      return null;
    });
  });

  const results = await Promise.all(fetchPromises);
  return results.filter((result) => result !== null);
};
