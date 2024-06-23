import React from "react";
import PropTypes from "prop-types";

const CastTable = ({ casts, algorithm }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Profile Image</th>
          <th>Profile Name</th>
          <th>Text</th>
          <th>Number of Replies</th>
          <th>Number of Recasts</th>
          <th>Number of Likes</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {algorithm === "OpenRank" &&
          casts.map((cast, index) => (
            <tr key={index}>
              <td>{cast.castedAtTimestamp}</td>
              <td>
                {cast.castedBy?.profileImage ? (
                  <img
                    src={cast.castedBy.profileImage}
                    alt={cast.castedBy.profileName}
                    className="profile-image"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td>{cast.castedBy?.profileName || "N/A"}</td>
              <td>{cast.text || "N/A"}</td>
              <td>{cast.numberOfReplies ?? "N/A"}</td>
              <td>{cast.numberOfRecasts ?? "N/A"}</td>
              <td>{cast.numberOfLikes ?? "N/A"}</td>
              <td>
                <a href={cast.url} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </td>
            </tr>
          ))}
        {algorithm === "Social Capital" &&
          casts.map((cast, index) => (
            <tr key={index}>
              <td>{cast.timeFrom}</td>
              <td>
                {cast.cast?.castedBy?.profileImage ? (
                  <img
                    src={cast.cast.castedBy.profileImage}
                    alt={cast.cast.castedBy.profileName}
                    className="profile-image"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td>{cast.cast?.castedBy?.profileName || "N/A"}</td>
              <td>{cast.cast?.text || "N/A"}</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>{cast.socialCapitalValueFormatted || "N/A"}</td>
              <td>
                <a
                  href={cast.cast?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

CastTable.propTypes = {
  casts: PropTypes.arrayOf(
    PropTypes.shape({
      castedAtTimestamp: PropTypes.string,
      castedBy: PropTypes.shape({
        profileName: PropTypes.string,
        profileImage: PropTypes.string,
      }),
      text: PropTypes.string,
      numberOfReplies: PropTypes.number,
      numberOfRecasts: PropTypes.number,
      numberOfLikes: PropTypes.number,
      url: PropTypes.string,
    })
  ).isRequired,
  algorithm: PropTypes.string.isRequired,
};

export default CastTable;
