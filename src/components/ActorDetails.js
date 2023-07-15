import React, { useState, useEffect } from 'react';
import './ActorDetails.css';


const ActorDetails = ({ actor, data }) => {
    const [details, setDetails] = useState({
        showCount: 0,
        firstDay: '',
        lastDay: '',
        daysBetween: 0
    });

    useEffect(() => {
        const roleCounts = {};
        const servingCount = { [actor]: 0 };
        const actorShows = data.filter(show => {
            let cast = Object.values(show.cast).includes(actor);
            let serving = Object.values(show.serving).includes(actor);
            if (serving) servingCount[actor]++;
            if (cast) {
                Object.keys(show.cast).forEach(role => {
                    if (show.cast[role] === actor) {
                        if (roleCounts[role]) roleCounts[role]++;
                        else roleCounts[role] = 1;
                    }
                });
            }
            return cast || serving;
        });

        const allActors = new Set();
        data.forEach(show =>
            Object.values(show.cast).forEach(name => allActors.add(name))
        );

        setDetails({
            showCount: actorShows.length,
            firstDay: actorShows[0]?.date,
            lastDay: actorShows.reduce((prev, current) => (new Date(prev?.date) > new Date(current?.date) ? prev : current))?.date,
            daysBetween: Math.round(
                (new Date(actorShows[actorShows.length - 1]?.date) -
                    new Date(actorShows[0]?.date)) /
                (1000 * 60 * 60 * 24)
            )
        });
    }, [actor, data]);

    const renderTotalShows = () => {
        return(
            <>
        <h1>{actor}</h1>
        <h6>（统计来源为所有排班表中的正式场次，不包含排练、内测、跟场）</h6>
        <h2>在过去的 {data.length} 场演出中</h2>
        <h2>你一共参加演出: {details.showCount} 场</h2>
        <h2>第一次正式演出: {details.firstDay}</h2>
        <h2>最后一次正式演出: {details.lastDay}</h2>
        <h2>中间间隔了: {details.daysBetween} 天</h2>
            </>
        )
    }

    return (
        <div className="actor-details-container">
            {renderTotalShows()}
        </div>
    );
};

export default ActorDetails;