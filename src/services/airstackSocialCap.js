import { init, fetchQuery } from "@airstack/airstack-react";

const AIRSTACK_API_KEY = process.env.REACT_APP_AIRSTACK_API_KEY;
// console.log("Airstack API Key:", AIRSTACK_API_KEY); // Log to check if the key is being read correctly

// Initialize the Airstack SDK
init(AIRSTACK_API_KEY);

export const fetchSocialCapitalData = async () => {
  const query = `
    query GetTopUserCasts {
      TrendingCasts(
        input: {timeFrame: one_day, blockchain: ALL, criteria: social_capital_value, limit: 50}
      ) {
        TrendingCast {
          timeFrom
          timeTo
          criteria
          criteriaCount
          socialCapitalValueFormatted
          cast {
            text
            url
            castedBy {
              profileName
              profileDisplayName
              profileBio
              profileImage
              profileUrl
            }
            numberOfLikes
            numberOfRecasts
          }
        }
      }
    }
  `;

  const response = await fetchQuery(query);
  return response;
};
