import React, { useState, useEffect } from 'react';

// Assuming data is imported from a local json file
// import data from './data.json';

const ActorDetails = ({ actor, data }) => {
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
            if(serving) servingCount[actor]++;
            if(cast) {
                Object.keys(show.cast).forEach(role => {
                    if(show.cast[role] === actor) {
                        if(roleCounts[role]) roleCounts[role]++;
                        else roleCounts[role] = 1;
                    }
                });
            }
            return cast || serving;
        });

        const actorsWorkedWith = {};
        actorShows.forEach(show => {
            Object.values(show.cast).forEach(name => {
                if(name !== actor) {
                    if(actorsWorkedWith[name]) actorsWorkedWith[name]++;
                    else actorsWorkedWith[name] = 1;
                }
            });
        });

        let mostWorkedWith = '';
        let maxShowsTogether = 0;
        Object.keys(actorsWorkedWith).forEach(name => {
            if(actorsWorkedWith[name] > maxShowsTogether) {
                maxShowsTogether = actorsWorkedWith[name];
                mostWorkedWith = name;
            }
        });

        const allActors = new Set();
        data.forEach(show => Object.values(show.cast).forEach(name => allActors.add(name)));
        const neverWorkedWith = Array.from(allActors).filter(name => !actorsWorkedWith[name]);

        setDetails({
            showCount: actorShows.length,
            firstDay: actorShows[0]?.date,
            lastDay: actorShows[actorShows.length - 1]?.date,
            daysBetween: Math.round((new Date(actorShows[actorShows.length - 1]?.date) - new Date(actorShows[0]?.date)) / (1000 * 60 * 60 * 24)),
            roleCounts,
            mostWorkedWith: mostWorkedWith,
            servingCount: servingCount[actor],
            neverWorkedWith
        });
    }, [actor, data]);

    return (
        <div>
            <h1>{actor}</h1>
            <h2>Show Count: {details.showCount - details.servingCount}</h2>
            <h2>First Day: {details.firstDay}</h2>
            <h2>Last Day: {details.lastDay}</h2>
            <h2>Days Between: {details.daysBetween}</h2>
            <h2>Role Counts:</h2>
            <ul>
                {Object.entries(details.roleCounts).map(([role, count]) => <li key={role}>{role}: {count}</li>)}
            </ul>
            <h2>Most Worked With: {details.mostWorkedWith}</h2>
            <h2>Serving Count: {details.servingCount}</h2>
            <h2>Never Worked With:</h2>
            <ul>
                {details.neverWorkedWith.map(actor => <li key={actor}>{actor}</li>)}
            </ul>
        </div>
    );
}

export default ActorDetails;
