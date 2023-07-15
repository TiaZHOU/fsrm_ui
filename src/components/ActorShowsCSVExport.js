import React from "react";
import { CSVLink } from "react-csv";

const ActorShowsCSVExport = ({ actor, data }) => {
  const filteredShows = data.filter((show) =>
    Object.values(show.cast).includes(actor),
  );

  const csvHeaders = [
    { label: "Show ID", key: "showID" },
    { label: "Date", key: "date" },
    { label: "Shift", key: "shift" },
    { label: "Cast", key: "cast" },
    { label: "Serving", key: "serving" },
  ];

  const csvData = filteredShows.map((show) => ({
    showID: show.showID,
    date: show.date,
    shift: show.shift,
    cast: JSON.stringify(show.cast),
    serving: JSON.stringify(show.serving),
  }));

  return (
    <>
      <div>
        <h1>{actor}</h1>
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename={`${actor}_shows.csv`}
        >
          Export data
        </CSVLink>
      </div>
    </>
  );
};

export default ActorShowsCSVExport;
