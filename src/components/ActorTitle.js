import React from 'react';

const ActorTitle = ({ data, actor }) => {
        const getActorTitles = () => {
        const actorData = data.filter(show => Object.values(show.cast).includes(actor));

        const totalPresence = actorData.length;
        const castCount = actorData.filter(show => Object.keys(show.cast).includes(actor)).length;
        const servingTime = actorData.filter(show => Object.values(show.serving).includes(actor)).length;

        const titles = [
            { title: '戏精之王', figure: totalPresence + castCount },
            { title: '灵感洞悉者', figure: servingTime },
            { title: '舞台之星', figure: Math.max(totalPresence, castCount) },
            { title: '表演风云', figure: Math.min(totalPresence, castCount) },
            { title: '剧场宠儿', figure: totalPresence },
            { title: '剧中人物', figure: castCount },
            { title: '表演巨擘', figure: servingTime + castCount },
            { title: '台上台下', figure: servingTime + totalPresence },
            { title: '演绎艺术家', figure: totalPresence + castCount + servingTime },
        ];

        titles.sort((a, b) => b.figure - a.figure);

        return titles.slice(0, 3); // Return 2 or 3 titles
    };

    const actorTitles = getActorTitles();

    return (
        <div>
            <h1>{actor}</h1>
            <h2>Actor Titles</h2>
            <ul>
                {actorTitles.map((title, index) => (
                    <li key={index}>
                        <strong>{title.title}</strong>: {title.figure}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActorTitle;
