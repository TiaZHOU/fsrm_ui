import React from "react";
import "./ActorDetails.css";
import { useAction } from "../hook/useAction";

const ActorCastList = ({ actor, data }) => {
  const details = useAction(data, actor);
  const renderCastList = () => {
    return (
      <>
        <h1>{actor}</h1>
        <h2>一共演了：{Object.entries(details.roleCounts).length} 个角色。</h2>
        <h2>角色统计:</h2>
        <h6>
          -灵殒（徐虎，袁思道）与浮生若梦分开统计，商海角色和浮生若梦一起统计-
        </h6>
        <ul>
          {Object.entries(details.roleCounts).map(([role, count]) => (
            <li key={role}>
              {role}: {count} 场
            </li>
          ))}
        </ul>
        {details.servingCount > 0 && <li>前台: {details.servingCount} 场</li>}
      </>
    );
  };

  return <div className="actor-details-container">{renderCastList()}</div>;
};

export default ActorCastList;
