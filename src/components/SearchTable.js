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
            <p>一共演出了: {actorData.totalShows} 场</p>
            {actorData.timesServed>0 && <p>还有 {actorData.timesServed} 场前台</p>}
            <p>第一次演出的时间是: {actorData.firstShowDate.toLocaleDateString()}</p>
            <p>最后一场演出是: {actorData.lastShowDate.toLocaleDateString()}</p>
            <p>
               演出跨度: {actorData.daysBetweenShows} 天
            </p>
            <p>和你搭档最多的演员是: {actorData.mostActedWith}</p>
        </div>
    );
};

export default ActorDetails;
