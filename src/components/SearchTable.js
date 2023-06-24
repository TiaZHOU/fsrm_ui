import React, { useMemo } from 'react';

const ActorDetails = ({ data, actor }) => {
    const actorData = useMemo(() => {
        const actorShows = data.filter(show => {
            const castValues = Object.values(show.cast);
            return castValues.includes(actor);
        });

        //count the number of times the actor occurs in the serving section
        const timesServed = actorShows.reduce((total, show) => {
            return total + Object.values(show.serving).filter(served => served === actor).length;
        }, 0);


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

        const mostActedWith = Object.keys(actorsWorkedWith).reduce((mostActed, currentActor) => {
            if (!mostActed.length || actorsWorkedWith[currentActor] > actorsWorkedWith[mostActed[0]]) {
                return [currentActor];
            } else if (actorsWorkedWith[currentActor] === actorsWorkedWith[mostActed[0]]) {
                mostActed.push(currentActor);
            }
            return mostActed;
        }, []);


        return {
            totalShows: actorShows.length,
            timesServed,
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
            <p>Serving times: {actorData.timesServed}</p>
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
