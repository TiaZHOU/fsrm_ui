import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, Box, Divider } from "@material-ui/core";



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
                    if(actorsWorkedWith[name]) actorsWorkedWith[name]++;
                    else actorsWorkedWith[name] = 1;
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
            <h2>一共参加演出: {details.showCount} 场</h2>
            <h2>第一次正式演出: {details.firstDay}</h2>
            <h2>最后一次正式演出: {details.lastDay}</h2>
            <h2>中间间隔了: {details.daysBetween} 天</h2>
            <h2>角色统计:</h2>
            <ul>
                {Object.entries(details.roleCounts).map(([role, count]) => <li key={role}>{role}: {count} 场</li>)}
            </ul>
            {details.servingCount >0 && <li>前台: {details.servingCount} 场</li>}
            <h2>很遗憾，有很多人还没有合作过:</h2>
            <ul>
                {details.neverWorkedWith.map((actor,index) =>(
                    <React.Fragment key={actor}>
                        <text key={actor}>{actor}- </text>
                     {(index + 1) % 5 === 0 && <br />}
                    </React.Fragment>)
            )}
            </ul>

            <Box style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {actor}
                </Typography>
                <Typography variant="h6">一共参加演出: {details.showCount} 场</Typography>
                <Typography variant="h6">第一次正式演出: {details.firstDay}</Typography>
                <Typography variant="h6">最后一次正式演出: {details.lastDay}</Typography>
                <Typography variant="h6">中间间隔了: {details.daysBetween} 天</Typography>
                <Typography variant="h6">角色统计:</Typography>
                <List>
                    {Object.entries(details.roleCounts).map(([role, count]) => (
                        <ListItem key={role}>{role}: {count} 场</ListItem>
                    ))}
                </List>
                {details.servingCount > 0 && <ListItem>前台: {details.servingCount} 场</ListItem>}
                <Divider style={{ margin: "20px 0" }} />
                <Typography variant="h6">很遗憾，有很多人还没有合作过:</Typography>
                <List>
                    {details.neverWorkedWith.map((actor,index) =>(
                        <React.Fragment key={actor}>
                            <ListItem style={{display: "inline-block", width: "20%"}}>
                                <Typography variant="body1">{actor}</Typography>
                            </ListItem>
                            {(index + 1) % 5 === 0 && <br />}
                        </React.Fragment>
                    ))}
                </List>
            </Box>

        </div>
    );
}

export default ActorDetails;
