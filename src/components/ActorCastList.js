import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useAction } from "../hook/useAction";
import "./ActorDetails.css";

const ActorCastList = ({ actor, data }) => {
  const details = useAction(data, actor);

  const renderCastList = () => {
    return (
      <Card className="actor-details-container">
        <CardContent>
          <Typography variant="h4">{actor}</Typography>
          <Typography variant="h6">
            一共演了：{Object.entries(details.roleCounts).length} 个角色。
          </Typography>
          <Typography variant="h6">灵殒与浮生若梦分开统计</Typography>
          <ul>
            {Object.entries(details.roleCounts).map(([role, count]) => (
              <li key={role}>
                {role}: {count} 场
              </li>
            ))}
          </ul>
          {details.servingCount > 0 && (
            <Typography variant="h6">
              前台: {details.servingCount} 场
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  };

  return renderCastList();
};

export default ActorCastList;
