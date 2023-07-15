import React, { useState, useEffect } from 'react';
import './ActorDetails.css';


const ActorWorkedWith = ({ actor, data }) => {
    const [details, setDetails] = useState({
        showCount: 0,
        firstDay: '',
        lastDay: '',
        daysBetween: 0,
        roleCounts: {},
        mostWorkedWith: '',
        servingCount: 0,
        neverWorkedWith: []
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

        const actorsWorkedWith = {};
        actorShows.forEach(show => {
            Object.values(show.cast).forEach(name => {
                if (actorsWorkedWith[name]) actorsWorkedWith[name]++;
                else actorsWorkedWith[name] = 1;
            });
        });

        let mostWorkedWith = '';
        let maxShowsTogether = 0;
        Object.keys(actorsWorkedWith).forEach(name => {
            if (actorsWorkedWith[name] >= maxShowsTogether) {
                maxShowsTogether = actorsWorkedWith[name];
                mostWorkedWith = name;
            }
        });

        const allActors = new Set();
        data.forEach(show =>
            Object.values(show.cast).forEach(name => allActors.add(name))
        );
        const neverWorkedWith = Array.from(allActors).filter(
            name => !actorsWorkedWith[name]
        );



        const mostWorkedWithList = Object.entries(actorsWorkedWith)
            .sort((a, b) => b[1] - a[1])
            .map(([name, count]) => `${name} (${count} 场)`);

        //get first 5 elements of mostWorkedWithList
        mostWorkedWith = mostWorkedWithList.slice(2, 5).join('');

        setDetails({
            showCount: actorShows.length,
            firstDay: actorShows[0]?.date,
            lastDay: actorShows.reduce((prev, current) => (new Date(prev?.date) > new Date(current?.date) ? prev : current))?.date,
            daysBetween: Math.round(
                (new Date(actorShows[actorShows.length - 1]?.date) -
                    new Date(actorShows[0]?.date)) /
                (1000 * 60 * 60 * 24)
            ),
            roleCounts,
            mostWorkedWith: mostWorkedWith,
            servingCount: servingCount[actor],
            neverWorkedWith
        });
    }, [actor, data]);

    const renderWorkedWith = () =>{
        return(
            <>
                <h1>{actor}</h1>
                <h2>与你合作最多的演员:</h2>
                <h2>
                    {details.mostWorkedWith}
                </h2>

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
        )
    }

    return (
        <div className="actor-details-container">
            {renderWorkedWith()}
        </div>
    );
};

export default ActorWorkedWith;