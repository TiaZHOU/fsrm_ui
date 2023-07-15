import React from "react";
import "./ActorDetails.css";
import { useAction } from "../hook/useAction";

const ActorDetails = ({ actor, data }) => {
  const details = useAction(data, actor);

  const renderTotalShows = () => {
    return (
      <>
        <h1>{actor}</h1>
        <h6>（统计来源为所有排班表中的正式场次，不包含排练、内测、跟场）</h6>
        <h2>在过去的 {data.length} 场演出中</h2>
        <h2>你一共参加演出: {details.showCount} 场</h2>
        <h2>第一次正式演出: {details.firstDay}</h2>
        <h2>最后一次正式演出: {details.lastDay}</h2>
        <h2>中间间隔了: {details.daysBetween} 天</h2>
      </>
    );
  };

  return <div className="actor-details-container">{renderTotalShows()}</div>;
};

export default ActorDetails;
