import React from 'react';
import data from '../data/data.json';
class SearchTable extends React.Component {
    state = {
        actorName: '',
        totalShows: 0,
        servingTimes: 0,
        firstShowDate: null,
        lastShowDate: null,
        mostPartner: '',
    };

    onActorNameChange = e => {
        this.setState({ actorName: e.target.value }, this.calculateStatistics);
    };

    calculateStatistics = () => {


        const filteredData = data.filter(item => Object.values(item.cast).includes(this.state.actorName) || Object.values(item.serving).includes(this.state.actorName));

        let totalShows = filteredData.length;
        let servingTimes = filteredData.reduce((total, show) => total + (Object.values(show.serving).includes(this.state.actorName) ? 1 : 0), 0);

        let firstShowDate = null;
        let lastShowDate = null;

        if (filteredData.length > 0) {
            firstShowDate = new Date(filteredData[0].date);
            lastShowDate = new Date(filteredData[filteredData.length - 1].date);
        }

        let daysBetween = firstShowDate && lastShowDate ? Math.round((lastShowDate - firstShowDate) / (1000 * 60 * 60 * 24)) : null;

        let partnerCount = {};

        filteredData.forEach(item => {
            Object.values(item.cast).forEach(name => {
                if (name !== this.state.actorName) {
                    if (!partnerCount[name]) {
                        partnerCount[name] = 0;
                    }
                    partnerCount[name]++;
                }
            });
            Object.values(item.serving).forEach(name => {
                if (name !== this.state.actorName) {
                    if (!partnerCount[name]) {
                        partnerCount[name] = 0;
                    }
                    partnerCount[name]++;
                }
            });
        });

        let mostPartner = Object.keys(partnerCount).reduce((a, b) => partnerCount[a] > partnerCount[b] ? a : b, '');
        this.setState({ totalShows, servingTimes, firstShowDate, lastShowDate, daysBetween, mostPartner });
    };

    render() {
        const { actorName, totalShows, servingTimes, firstShowDate, lastShowDate, daysBetween, mostPartner } = this.state;

        return (
            <div>
                <h1>Show Statistics for Actor</h1>
                <input type="text" value={actorName} onChange={this.onActorNameChange} placeholder="Enter actor name..." />
                {actorName && (
                    <div>
                        <p>Total shows number: {totalShows}</p>
                        <p>Serving times: {servingTimes}</p>
                        <p>First show date: {firstShowDate ? firstShowDate.toISOString().substring(0, 10) : '-'}</p>
                        <p>Last show date: {lastShowDate ? lastShowDate.toISOString().substring(0, 10) : '-'}</p>
                        <p>Days between first and last show: {daysBetween}</p>
                        <p>Most Acting with: {mostPartner}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default SearchTable;
