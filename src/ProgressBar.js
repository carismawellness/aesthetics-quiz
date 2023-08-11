import React from "react";

function ProgressBar({progressPercentage}) {
    return (
      <div className="content-wrapper">
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {/* Your other component code */}
      </div>
    );
}

export default ProgressBar;
  