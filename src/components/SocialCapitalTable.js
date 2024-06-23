import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SocialCapitalTable.css"; // Import the CSS file

const SocialCapitalTable = ({ casts }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="social-capital-table-container">
      <table className="social-capital-table">
        <thead>
          <tr>
            <th>Profile Image</th>
            <th>Profile Name</th>
            <th>Number of Recasts</th>
            <th>Number of Likes</th>
            <th>Social Capital Value</th>
            <th>Timestamp</th>
            <th>URL</th>
            <th></th> {/* For the drop-down indicator */}
          </tr>
        </thead>
        <tbody>
          {casts.map((cast, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleRow(index)} className="collapsible-row">
                <td data-label="Profile Image">
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
                <td data-label="Profile Name">
                  {cast.cast?.castedBy?.profileName || "N/A"}
                </td>
                <td data-label="Number of Recasts">
                  {cast.cast?.numberOfRecasts ?? "N/A"}
                </td>
                <td data-label="Number of Likes">
                  {cast.cast?.numberOfLikes ?? "N/A"}
                </td>
                <td data-label="Social Capital Value">
                  {cast.socialCapitalValueFormatted
                    ? Number(cast.socialCapitalValueFormatted).toFixed(2)
                    : "N/A"}
                </td>
                <td data-label="Timestamp">{cast.timeFrom}</td>
                <td data-label="URL">
                  <a
                    href={cast.cast?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </td>
                <td className="arrow-cell">
                  {expandedRows[index] ? "▲" : "▼"}
                </td>
              </tr>
              {expandedRows[index] && (
                <tr className="expandable-row">
                  <td colSpan="8" className="expandable-content">
                    {cast.cast?.text || "N/A"}
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

SocialCapitalTable.propTypes = {
  casts: PropTypes.arrayOf(
    PropTypes.shape({
      timeFrom: PropTypes.string.isRequired,
      socialCapitalValueFormatted: PropTypes.string,
      cast: PropTypes.shape({
        profileName: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        text: PropTypes.string,
        numberOfRecasts: PropTypes.number,
        numberOfLikes: PropTypes.number,
        url: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default SocialCapitalTable;
