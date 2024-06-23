import React, { useState } from "react";
import PropTypes from "prop-types";
import "./OpenRankTable.css"; // Import the CSS file

const OpenRankTable = ({ casts }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="open-rank-table-container">
      <table className="open-rank-table">
        <thead>
          <tr>
            <th>Profile Image</th>
            <th>Profile Name</th>
            <th>Number of Recasts</th>
            <th>Number of Likes</th>
            <th>Timestamp</th>
            <th>URL</th>
            <th></th> {/* For the drop-down indicator */}
          </tr>
        </thead>
        <tbody>
          {casts.map((cast, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleRow(index)} className="collapsible-row">
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
                <td>{cast.numberOfRecasts ?? "N/A"}</td>
                <td>{cast.numberOfLikes ?? "N/A"}</td>
                <td>{cast.castedAtTimestamp}</td>
                <td>
                  <a href={cast.url} target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                </td>
                <td className="arrow-cell">
                  {expandedRows[index] ? "▲" : "▼"}
                </td>
              </tr>
              {expandedRows[index] && (
                <tr className="expandable-row">
                  <td colSpan="7" className="expandable-content">
                    {cast.text || "N/A"}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

OpenRankTable.propTypes = {
  casts: PropTypes.arrayOf(
    PropTypes.shape({
      castedAtTimestamp: PropTypes.string.isRequired,
      castedBy: PropTypes.shape({
        profileName: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
      }).isRequired,
      text: PropTypes.string,
      numberOfRecasts: PropTypes.number,
      numberOfLikes: PropTypes.number,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OpenRankTable;
