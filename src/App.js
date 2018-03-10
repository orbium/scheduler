import React, { Component } from 'react';
import './App.css';

const hours = [...(new Array(24).keys())];

class App extends Component {
  constructor() {
    super();
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSelectDayStart = this.handleSelectDayStart.bind(this);
    // this.render = this.handleCreate.bind(this);

    this.state = {
      hour1: 0,
      dayStart: 7,
      scheduledItems: [
        { start: '07:18', end: '9:00', description: 'shower, shave, breakfast' },
        // { start: '9:00', end: '12:00', description: 'work' }
      ]
    };
  }

  componentDidMount() {
    const positions = this.calculatePositions();

    this.setState({
      hour1: positions[this.state.dayStart + 1] - positions[this.state.dayStart],
      positions: positions
    })
  }

  handleCreate(e) {
    // const time = document.getElementById('scheduled-time').value;
  }

  calculatePositions() {
    const getRect = hour =>
            document.getElementById(`${hour}`).getBoundingClientRect()
        , schedule = document.getElementById('schedule').getBoundingClientRect()
        , rects = hours.reduce((acc, h) => ({ ...acc, [h]: getRect(h) }), {})
        , positions = Object.entries(rects).reduce((acc, [hour, rect]) =>
            ({ ...acc, [parseInt(hour, 10)]: rect.top - schedule.top })
          , {})
        ;

    return positions;
  }

  handleSelectDayStart(e) {
    this.setState(
      { dayStart: parseInt(e.target.value, 10) },
      () => this.setState({ positions: this.calculatePositions() })
    );
  }

  renderHours() {
    return hours.map(hour => {
      const computedHour = (hour + this.state.dayStart) % 24
          , twelveHour = ((computedHour + 11) % 12) + 1
          , suffix = computedHour >= 12 ? "pm" : "am"
          ;

      return (
        <div key={computedHour} id={computedHour} className="time-marker">
          {twelveHour}{suffix}<hr />&nbsp;
        </div>
      );
    });
  }

  renderScheduledItems() {
    if (!this.state.positions) return;

    const pixelLengthOf1Hour = this.state.hour1;

    return this.state.scheduledItems.map((si, index) => {
      const colonIndex = si.start.indexOf(':')
          , hour = parseInt(si.start.slice(0, colonIndex), 10)
          , minutes = parseInt(si.start.slice(colonIndex + 1, si.length), 10)
          , pixelsPerMinute = pixelLengthOf1Hour / 60
          ;

      return (
        <div key={index} className="scheduled-item"
          style={{
            top: this.state.positions[hour] + minutes * pixelsPerMinute,
            height: this.state.hour1 * 2
          }}
        >
          {si.description}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Scheduler</h1>
        </header>
        <p className="App-intro">
          Weekday schedule
        </p>
        Day starts
        {' '}
        <select id="day-start"
          onChange={this.handleSelectDayStart}
          defaultValue={this.state.dayStart}
        >
          {hours.map(hour =>
            <option key={hour} value={hour}>
              {hour}
            </option>
          )}
        </select>
        <p>
          start <input type="time" id="scheduled-time" />
          {' '}
          end <input type="time" id="scheduled-time" />
          {' '}
          desc. <input id="scheduled-item" />
          {' '}
          <button onClick={this.handleCreate} disabled>Create</button>
        </p>
        <div className="center">
          <div className="column" id="time-column">
            {this.renderHours()}
          </div>
          <div className="column" id="schedule">
            <div style={{width: 200}}></div>
            {this.renderScheduledItems()}
            {/* <div className="scheduled-item"
              style={{top: this.state.am7, height: this.state.hour1 * 2}}
            >
              shower, shave, breakfast
            </div>
            <div className="scheduled-item"
              style={{top: this.state.am9, height: this.state.hour1 * 3}}
            >
              work
            </div>
            <div className="scheduled-item"
              style={{top: this.state.pm12, height: this.state.hour1}}
            >
              lunch
            </div>
            <div className="scheduled-item"
              style={{top: this.state.pm1, height: this.state.hour1 * 4}}
            >
              work
            </div>
            <div className="scheduled-item"
              style={{top: this.state.pm5, height: this.state.hour1}}
            >
              read
            </div>
            <div className="scheduled-item"
              style={{top: this.state.pm6, height: this.state.hour1}}
            >
              walk
            </div>
            <div className="scheduled-item"
              style={{top: this.state.pm7, height: this.state.hour1}}
            >
              dinner
            </div>
            <div className="scheduled-item"
              style={{top: this.state.pm10, height: this.state.hour1}}
            >
              wind down
            </div>
            <div className="scheduled-item"
              style={{top: this.state.pm11, height: this.state.hour1 * 8}}
            >
              sleep
            </div> */}
          </div>
        </div>
        <footer className="App-footer">
          Copyright © 2018, Embetter, Inc
        </footer>
      </div>
    );
  }
}

export default App;
