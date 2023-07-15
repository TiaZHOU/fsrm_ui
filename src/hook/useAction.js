import { useEffect, useState } from "react";
export const useAction = (data, actor) => {
  const [details, setDetails] = useState({
    showCount: 0,
    firstDay: "",
    lastDay: "",
    daysBetween: 0,
    roleCounts: {},
    mostWorkedWith: "",
    servingCount: 0,
    neverWorkedWith: [],
    presenceMap: [],
  });

  useEffect(() => {
    const roleCounts = {};
    const servingCount = { [actor]: 0 };
    const actorShows = data.filter((show) => {
      let cast = Object.values(show.cast).includes(actor);
      let serving = Object.values(show.serving).includes(actor);
      if (serving) servingCount[actor]++;
      if (cast) {
        Object.keys(show.cast).forEach((role) => {
          if (show.cast[role] === actor) {
            if (roleCounts[role]) roleCounts[role]++;
            else roleCounts[role] = 1;
          }
        });
      }
      return cast || serving;
    });

    const actorsWorkedWith = {};
    actorShows.forEach((show) => {
      Object.values(show.cast).forEach((name) => {
        if (actorsWorkedWith[name]) actorsWorkedWith[name]++;
        else actorsWorkedWith[name] = 1;
      });
    });

    let mostWorkedWith = "";
    let maxShowsTogether = 0;
    Object.keys(actorsWorkedWith).forEach((name) => {
      if (actorsWorkedWith[name] >= maxShowsTogether) {
        maxShowsTogether = actorsWorkedWith[name];
        mostWorkedWith = name;
      }
    });

    const allActors = new Set();
    data.forEach((show) =>
      Object.values(show.cast).forEach((name) => allActors.add(name)),
    );
    const neverWorkedWith = Array.from(allActors).filter(
      (name) => !actorsWorkedWith[name],
    );

    const mostWorkedWithList = Object.entries(actorsWorkedWith)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => `${name} (${count} 场)`);

    //get first 5 elements of mostWorkedWithList
    mostWorkedWith = mostWorkedWithList.slice(2, 5).join(" ");

    const getActorMonthlyPresence = () => {
      const presenceMap = new Map();
      data.forEach((show) => {
        const { date, cast } = show;
        const month = new Date(date).toISOString().substr(0, 7);

        if (Object.values(cast).includes(actor)) {
          const count = presenceMap.get(month) || 0;
          presenceMap.set(month, count + 1);
        }
      });
      return presenceMap;
    };

    setDetails({
      showCount: actorShows.length,
      firstDay: actorShows[0]?.date,
      lastDay: actorShows.reduce((prev, current) =>
        new Date(prev?.date) > new Date(current?.date) ? prev : current,
      )?.date,
      daysBetween: Math.round(
        (new Date(actorShows[actorShows.length - 1]?.date) -
          new Date(actorShows[0]?.date)) /
          (1000 * 60 * 60 * 24),
      ),
      roleCounts,
      mostWorkedWith: mostWorkedWith,
      servingCount: servingCount[actor],
      neverWorkedWith,
      presenceMap: getActorMonthlyPresence(),
    });
  }, [actor, data]);

  return details;
};
