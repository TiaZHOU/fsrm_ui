import React from 'react';
import data from '../data/data.json';
class ShowTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: ''
        };
    }

    handleChange = event => {
        this.setState({
            filterText: event.target.value
        });
    };

    render() {

        const keys = ["showID", "date", "shift", "皇上", "皇后", "皇贵妃", "首辅", "户部", "都指挥使", "萧柬", "老鸨", "大仙", "掌柜", "赌霸天", "前台"];

        const filteredData = data.filter(item =>
            Object.values(item.cast).includes(this.state.filterText) ||
            item.serving.前台 === this.state.filterText
        );

        return (
            <div>
                <input type="text" placeholder="Filter by actor name..." value={this.state.filterText} onChange={this.handleChange} />
                <table>
                    <thead>
                    <tr>
                        <th>Property</th>
                        {filteredData.map((item, index) => (
                            <th key={index}>Show {index + 1}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {keys.map((key, i) => (
                        <tr key={i}>
                            <td>{key}</td>
                            {filteredData.map((item, index) => (
                                <td key={index}>
                                    {key === "showID" ? item.showID
                                        : key === "date" ? item.date
                                            : key === "shift" ? item.shift
                                                : key === "前台" ? item.serving.前台
                                                    : item.cast[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ShowTable;
