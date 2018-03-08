import React, { Component } from 'react';
import './App.css';

const hours = [... new Array(24).keys()];

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
        { time: '07:00', description: 'shower, shave, breakfast' },
        { time: '09:00', description: 'work' }
      ]
    };
  }

  componentDidMount() {
    const schedule = document.getElementById('schedule').getBoundingClientRect();
    const am7Rect = document.getElementById('7am').getBoundingClientRect();
    const am8Rect = document.getElementById('8am').getBoundingClientRect();
    const am9Rect = document.getElementById('9am').getBoundingClientRect();
    const am10Rect = document.getElementById('10am').getBoundingClientRect();
    const am11Rect = document.getElementById('11am').getBoundingClientRect();
    const pm12Rect = document.getElementById('12pm').getBoundingClientRect();
    const pm1Rect = document.getElementById('1pm').getBoundingClientRect();
    const pm2Rect = document.getElementById('2pm').getBoundingClientRect();
    const pm3Rect = document.getElementById('3pm').getBoundingClientRect();
    const pm4Rect = document.getElementById('4pm').getBoundingClientRect();
    const pm5Rect = document.getElementById('5pm').getBoundingClientRect();
    const pm6Rect = document.getElementById('6pm').getBoundingClientRect();
    const pm7Rect = document.getElementById('7pm').getBoundingClientRect();
    const pm8Rect = document.getElementById('8pm').getBoundingClientRect();
    const pm9Rect = document.getElementById('9pm').getBoundingClientRect();
    const pm10Rect = document.getElementById('10pm').getBoundingClientRect();
    const pm11Rect = document.getElementById('11pm').getBoundingClientRect();

    this.setState({
      distance1hour: am8Rect.top - am7Rect.top,
      hour1: am8Rect.top - am7Rect.top,
      am7: am7Rect.top - schedule.top,
      am8: am8Rect.top - schedule.top,
      am9: am9Rect.top - schedule.top,
      am10: am10Rect.top - schedule.top,
      am11: am11Rect.top - schedule.top,
      pm12: pm12Rect.top - schedule.top,
      pm1: pm1Rect.top - schedule.top,
      pm2: pm2Rect.top - schedule.top,
      pm3: pm3Rect.top - schedule.top,
      pm4: pm4Rect.top - schedule.top,
      pm5: pm5Rect.top - schedule.top,
      pm6: pm6Rect.top - schedule.top,
      pm7: pm7Rect.top - schedule.top,
      pm8: pm8Rect.top - schedule.top,
      pm9: pm9Rect.top - schedule.top,
      pm10: pm10Rect.top - schedule.top,
      pm11: pm11Rect.top - schedule.top
    })
  }

  handleCreate(e) {
    const time = document.getElementById('scheduled-time').value;
  }

  handleSelectDayStart(e) {
    this.setState({ dayStart: parseInt(e.target.value) });
  }

  renderHours() {
    return (
      hours.map(hour => {
        const computedHour = (hour + this.state.dayStart) % 24
            , twelveHour = ((computedHour + 11) % 12) + 1
            , suffix = computedHour >= 12 ? "pm" : "am"
            ;

        return (
          <div key={computedHour} id={twelveHour + suffix} className="time-marker">
            {twelveHour}{suffix}<hr />&nbsp;
          </div>
        );
      })
    );
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
        <select id="day-start" onChange={this.handleSelectDayStart} defaultValue={this.state.dayStart}>
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
            <div className="scheduled-item"
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
            </div>
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
