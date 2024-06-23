import React from "react";
import PropTypes from "prop-types";

const CastTable = ({ casts }) => {
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
        {casts.map((cast, index) => (
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
            <td>{cast.numberOfReplies}</td>
            <td>{cast.numberOfRecasts}</td>
            <td>{cast.numberOfLikes}</td>
            <td>
              <a href={cast.url} target="_blank" rel="noopener noreferrer">
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
      castedAtTimestamp: PropTypes.string.isRequired,
      castedBy: PropTypes.shape({
        profileName: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
      }).isRequired,
      text: PropTypes.string,
      numberOfReplies: PropTypes.number.isRequired,
      numberOfRecasts: PropTypes.number.isRequired,
      numberOfLikes: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CastTable;
