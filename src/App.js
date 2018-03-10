import React, { Component } from 'react';
import './App.css';

const hours = [...(new Array(24).keys())];

class App extends Component {
  constructor() {
    super();
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSelectDayStart = this.handleSelectDayStart.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);

    this.state = {
      dayStart: 7,
      schedules: [
        { name: 'Weekday schedule',
          dayStart: 7,
          items: [
            { start: '07:00', end: '9:00', description: 'shower, shave, breakfast' },
            { start: '9:00', end: '12:00', description: 'work' },
            { start: '12:00', end: '13:00', description: 'lunch' },
            { start: '13:00', end: '17:00', description: 'work' },
            { start: '17:00', end: '18:00', description: 'read' },
            { start: '18:00', end: '19:00', description: 'walk' },
            { start: '19:00', end: '20:00', description: 'dinner' },
            { start: '22:00', end: '23:00', description: 'wind down' },
            { start: '23:00', end: '7:00', description: 'sleep' },
          ]
        }
      ],
      scheduledItems: [
        { index: 0, start: '07:00', end: '9:00', description: 'shower, shave, breakfast' },
        { index: 1, start: '9:00', end: '12:00', description: 'work' },
        { index: 2, start: '12:00', end: '13:00', description: 'lunch' },
        { index: 3, start: '13:00', end: '17:00', description: 'work' },
        { index: 4, start: '17:00', end: '18:00', description: 'read' },
        { index: 5, start: '18:00', end: '19:00', description: 'walk' },
        { index: 6, start: '19:00', end: '20:00', description: 'dinner' },
        { index: 7, start: '22:00', end: '23:00', description: 'wind down' },
        { index: 8, start: '23:00', end: '7:00', description: 'sleep' },
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
    const { startTime, endTime, description } = this;
    if (!startTime.value || !endTime.value || !description.value) return;

    this.setState({ scheduledItems: [...this.state.scheduledItems,
      { start: startTime.value,
        end: endTime.value,
        description: description.value
      }
    ]});
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

  handleDeleteItem(e, index) {
    this.setState({
      scheduledItems: this.state.scheduledItems.filter(i => i.index !== index)
    });
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

  getHeight(startHr, startMins, endHr, endMins, pixelsPerHr, pixelsPerMin) {
    const mins = (endMins - startMins) * pixelsPerMin
        , hrs = neg => pixelsPerHr * (endHr + (neg ? 24 : 0) - startHr) + mins;

    return hrs(endHr < startHr);
  }

  renderScheduledItems() {
    if (!this.state.positions) return;

    const pixelsPerHr = this.state.hour1
        , pixelsPerMin = pixelsPerHr / 60
        ;

    return this.state.scheduledItems.map((si, index) => {
      let colonIndex = si.start.indexOf(':');
      const startHr = parseInt(si.start.slice(0, colonIndex), 10)
          , startMins = parseInt(si.start.slice(colonIndex + 1, si.start.length), 10)
          ;
      colonIndex = si.end.indexOf(':');
      const endHr = parseInt(si.end.slice(0, colonIndex), 10)
          , endMins = parseInt(si.end.slice(colonIndex + 1, si.end.length), 10)
          , height = this.getHeight(startHr, startMins, endHr, endMins, pixelsPerHr, pixelsPerMin)
          ;

      return (
        <div key={index} className="scheduled-item"
          style={{
            top: this.state.positions[startHr] + startMins * pixelsPerMin,
            height: height
          }}
        >
          <div className="delete-item" onClick={e => this.handleDeleteItem(e, si.index)}>×</div>
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
          start <input type="time" id="start-time" ref={el => this.startTime = el} />
          {' '}
          end <input type="time" id="end-time" ref={el => this.endTime = el} />
          {' '}
          desc. <input id="description" ref={el => this.description = el} />
          {' '}
          <button onClick={this.handleCreate}>Create</button>
        </p>
        <div className="center">
          <div className="column" id="time-column">
            {this.renderHours()}
          </div>
          <div className="column" id="schedule">
            <div style={{width: 200}}></div>
            {this.renderScheduledItems()}
          </div>
        </div>
        <footer className="App-footer">
          Copyright © 2018, Embetterment, Inc
        </footer>
      </div>
    );
  }
}

export default App;
