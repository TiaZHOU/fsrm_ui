import React, { useMemo } from 'react';

const ActorDetails = ({ data, actor }) => {
    const actorData = useMemo(() => {
        const actorShows = data.filter(show => {
            const castValues = Object.values(show.cast);
            return castValues.includes(actor);
        });

        const servingTimes = actorShows.filter(show => {
            return show.serving.desk === actor || show.serving.viceDesk === actor;
        }).length;

        const sortedDates = actorShows
            .map(show => new Date(show.date))
            .sort((a, b) => a - b);

        const firstShowDate = sortedDates[0];
        const lastShowDate = sortedDates[sortedDates.length - 1];
        const daysBetweenShows = Math.round(
            (lastShowDate - firstShowDate) / (1000 * 60 * 60 * 24)
        );

        const actorsWorkedWith = {};
        actorShows.forEach(show => {
            Object.values(show.cast).forEach(otherActor => {
                if (otherActor !== actor) {
                    actorsWorkedWith[otherActor] = (actorsWorkedWith[otherActor] || 0) + 1;
                }
            });
        });

        const mostActedWith = Object.keys(actorsWorkedWith).reduce((a, b) =>
            actorsWorkedWith[a] > actorsWorkedWith[b] ? a : b
        );

        return {
            totalShows: actorShows.length,
            servingTimes,
            firstShowDate,
            lastShowDate,
            daysBetweenShows,
            mostActedWith,
        };
    }, [data, actor]);

    return (
        <div>
            <h2>{actor}</h2>
            <p>Total shows number: {actorData.totalShows}</p>
            <p>Serving times: {actorData.servingTimes}</p>
            <p>First show date: {actorData.firstShowDate.toLocaleDateString()}</p>
            <p>Last show date: {actorData.lastShowDate.toLocaleDateString()}</p>
            <p>
                Days between first and last show: {actorData.daysBetweenShows}
            </p>
            <p>Most Acting with: {actorData.mostActedWith}</p>
        </div>
    );
};

export default ActorDetails;
