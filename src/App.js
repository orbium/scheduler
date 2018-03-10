import React, { Component } from 'react';
import './App.css';

const HOURS = [...(new Array(24).keys())]
    , DEFAULT_DAY_START = 7
    , SAMPLE_SCHEDULE = {
        name: 'Schedule 1',
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
    ;

class App extends Component {
  constructor() {
    super();
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSelectDayStart = this.handleSelectDayStart.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleSelectSchedule = this.handleSelectSchedule.bind(this);
    this.getCurrentSchedule = this.getCurrentSchedule.bind(this);
    this.handleCreateSchedule = this.handleCreateSchedule.bind(this);

    this.state = {
      currentSchedule: SAMPLE_SCHEDULE.name,
      schedules: [SAMPLE_SCHEDULE]
    };
  }

  componentDidMount() {
    const positions = this.calculatePositions()
        , schedule = this.state.schedules.find(s => s.name === this.state.currentSchedule)
        , dayStart = schedule.dayStart || DEFAULT_DAY_START
        ;

    this.setState({
      hour1: positions[dayStart + 1] - positions[dayStart],
      positions: positions
    })
  }

  handleCreate(e) {
    const { startTime, endTime, description } = this;
    if (!startTime.value || !endTime.value || !description.value) return;

    const { schedules, currentSchedule } = this.state
        , schedule = schedules.find(s => s.name === currentSchedule)
        , scheduleIndex = schedules.findIndex(s => s.name === currentSchedule)
        ;

    this.setState({
      schedules: [
        ...schedules.filter((s, i) => i !== scheduleIndex),
        {...schedule, items: [...schedule.items,
          { start: startTime.value,
            end: endTime.value,
            description: description.value
          }
        ]}
      ]
    });
    startTime.value = endTime.value = description.value = '';
  }

  handleCreateSchedule(e) {
    const name = `Schedule ${this.state.schedules.length + 1}`;
    this.setState(
      { currentSchedule: name,
        schedules: [...this.state.schedules, { name: name, items: [] }]
      },
      () => this.setState({ positions: this.calculatePositions() })
    );
  }

  handleDeleteItem(e, index) {
    const { schedules, currentSchedule } = this.state
        , schedule = schedules.find(s => s.name === currentSchedule)
        , scheduleIndex = schedules.findIndex(s => s.name === currentSchedule)
        ;

    this.setState({
      schedules: [
        ...schedules.filter((s, i) => i !== scheduleIndex),
        {...schedule, items: schedule.items.filter((item, i) => i !== index)}
      ]
    })
  }

  calculatePositions() {
    const getRect = hour =>
            document.getElementById(`${hour}`).getBoundingClientRect()
        , schedule = document.getElementById('schedule').getBoundingClientRect()
        , rects = HOURS.reduce((acc, h) => ({ ...acc, [h]: getRect(h) }), {})
        , positions = Object.entries(rects).reduce((acc, [hour, rect]) =>
            ({ ...acc, [parseInt(hour, 10)]: rect.top - schedule.top })
          , {})
        ;

    return positions;
  }

  handleSelectDayStart(e) {
    const { schedules, currentSchedule } = this.state
        , schedule = schedules.find(s => s.name === currentSchedule)
        , scheduleIndex = schedules.findIndex(s => s.name === currentSchedule)
        ;

    this.setState({
      schedules: [
        ...schedules.filter((s, i) => i !== scheduleIndex),
        { ...schedule, dayStart: parseInt(e.target.value, 10) }
      ]},
      () => this.setState({ positions: this.calculatePositions() })
    );
  }

  handleSelectSchedule(e) {
    this.setState(
      { currentSchedule: e.target.value },
      () => this.setState({ positions: this.calculatePositions() })
    );
  }

  renderHours() {
    const schedule = this.state.schedules.find(s => s.name === this.state.currentSchedule)

    return HOURS.map(hour => {
      const computedHour = (hour + (schedule.dayStart || DEFAULT_DAY_START)) % 24
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

  renderSchedule() {
    if (!this.state.positions) return;

    const pixelsPerHr = this.state.hour1
        , pixelsPerMin = pixelsPerHr / 60
        , schedule =
            this.state.schedules.find(s => s.name === this.state.currentSchedule)
        ;

    return schedule.items.map((si, index) => {
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
          <div className="delete-item"
            onClick={e => this.handleDeleteItem(e, index)}
          >
            ×
          </div>
          {si.description}
        </div>
      );
    });
  }

  renderScheduleSelector() {
    return (
      <p className="App-intro">
        <select value={this.state.currentSchedule}
          onChange={this.handleSelectSchedule}
        >
          {this.state.schedules.sort((a, b) => a.name > b.name).map((s, index) =>
            <option key={index} value={s.name}>{s.name}</option>
          )}
        </select>
        {' '}
        <button onClick={this.handleCreateSchedule}>New schedule</button>
      </p>
    );
  }

  getCurrentSchedule() {
    return this.state.schedules.find(s => s.name === this.state.currentSchedule);
  }

  renderDayStartSelector() {
    return (
      <select id="day-start"
        onChange={this.handleSelectDayStart}
        value={this.getCurrentSchedule().dayStart || DEFAULT_DAY_START}
      >
        {HOURS.map(hour => {
          const computedHour = hour % 24
              , twelveHour = ((computedHour + 11) % 12) + 1
              , suffix = computedHour >= 12 ? "pm" : "am"
              ;

          return (
            <option key={hour} value={hour}>
              {twelveHour + suffix}
            </option>
          );
        })}
      </select>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Scheduler</h1>
        </header>
        {this.renderScheduleSelector()}
        Day starts at
        {' '}
        {this.renderDayStartSelector()}
        <p>
          start
          {' '}
          <input type="time" id="start-time" ref={el => this.startTime = el}
            // defaultValue="07:15"
          />
          {' '}
          end
          {' '}
          <input type="time" id="end-time" ref={el => this.endTime = el}
            // defaultValue="07:45"
          />
          {' '}
          desc.
          {' '}
          <input id="description" ref={el => this.description = el}
            // defaultValue="test"
          />
          {' '}
          <button onClick={this.handleCreate}>Create</button>
        </p>
        <div className="center">
          <div className="column" id="time-column">
            {this.renderHours()}
          </div>
          <div className="column" id="schedule">
            <div style={{width: 200}}></div>
            {this.renderSchedule()}
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
