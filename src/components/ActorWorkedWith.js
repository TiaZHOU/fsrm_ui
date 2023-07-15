import React, { useState } from "react";
import "./ActorDetails.css";
import { useAction } from "../hook/useAction";

const ActorWorkedWith = ({ actor, data }) => {
  const details = useAction(data, actor);
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const renderWorkedWith = () => {
    return (
      <div className="actor-details-container">
        <h2>与你合作最多的演员:</h2>
        <h2>{details.mostWorkedWith}</h2>
        <h2>很遗憾，有很多人还没有合作过:</h2>

        {expanded && (
          <div className="expanded-section">
            <ul>
              {details.neverWorkedWith.map((actor, index) => (
                <React.Fragment key={actor}>
                  <text key={actor}>{actor} </text>
                  {(index + 1) % 5 === 0 && <br />}
                </React.Fragment>
              ))}
            </ul>
          </div>
        )}
        <button className="expand-button" onClick={handleToggleExpand}>
          {expanded ? "收起" : "展开"}
        </button>
      </div>
    );
  };

  return renderWorkedWith();
};

export default ActorWorkedWith;
