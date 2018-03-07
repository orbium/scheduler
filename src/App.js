import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = { hour1: 0, am7: 0 }
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

    [
      'hour1 ' + (am8Rect.top - am7Rect.top),
      'schedule ' + schedule.top,
      'am7Rect ' + am7Rect.top,
      'am8Rect ' + am8Rect.top,
      'am9Rect ' + am9Rect.top,
      'am10Rect ' + am10Rect.top,
      'am11Rect ' + am11Rect.top,
      'pm12Rect ' + pm12Rect.top,
      'pm1Rect ' + pm1Rect.top,
      'pm2Rect ' + pm2Rect.top,
      'pm3Rect ' + pm3Rect.top,
      'pm4Rect ' + pm4Rect.top,
      'pm5Rect ' + pm5Rect.top,
      'pm6Rect ' + pm6Rect.top,
      'pm7Rect ' + pm7Rect.top,
      'pm8Rect ' + pm8Rect.top,
      'pm9Rect ' + pm9Rect.top,
      'pm10Rect ' + pm10Rect.top,
      'pm11Rect ' + pm11Rect.top,
    ].forEach(e => console.log(e));

    this.setState({
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
    }, () => console.log(this.state))
  }

  render() {
    const hours = ['7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am', '1am', '2am', '3am', '4am', '5am', '6am'];
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Scheduler</h1>
        </header>
        <p className="App-intro">
          Weekday schedule
        </p>
        <div className="center">
          <div className="column" id="time-column">
            {hours.map(e =>
              <div key={e} id={e} className="time-marker">{e}<hr />&nbsp;</div>
            )}
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
