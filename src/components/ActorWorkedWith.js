import React from "react";
import "./ActorDetails.css";
import { useAction } from "../hook/useAction";

const ActorWorkedWith = ({ actor, data }) => {
  const details = useAction(data, actor);

  const renderWorkedWith = () => {
    return (
      <>
        <h2>与你合作最多的演员:</h2>
        <h2>{details.mostWorkedWith}</h2>

        <h2>很遗憾，有很多人还没有合作过:</h2>
        <ul>
          {details.neverWorkedWith.map((actor, index) => (
            <React.Fragment key={actor}>
              <text key={actor}>{actor} </text>
              {(index + 1) % 5 === 0 && <br />}
            </React.Fragment>
          ))}
        </ul>
      </>
    );
  };

  return <div className="actor-details-container">{renderWorkedWith()}</div>;
};

export default ActorWorkedWith;
