const soundBank = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: 'Welcome to the React drum kit!'
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event) {
    // Select audio element with cqorresponding id
    const key = event.key.toUpperCase();
    const audio = document.getElementById(key);
    audio.time = 0;
    audio.play();
  }
  handleClick(event) {
    // Add as event listener to each drum button
    console.log('button clicked!');
    // Play child audio element 
    const drumPad = event.target; 
    const audio = drumPad.firstElementChild;
    audio.play();
    // Set its id to state.displayText
    this.setState({
      displayText: drumPad.id
    });
  }
  render() {
    return(
      <div id='drum-machine'>
        <DrumPad handleClick={this.handleClick}/>
      <div id='display'>{this.state.displayText}</div>
      </div>
    )
  }
 }

// Potentially might need to refactor this to stateless functional component 
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const drumKeys = soundBank.map(el => <div id={el.id} className='drum-pad' onClick={this.props.handleClick}>{el.keyTrigger}<audio id={el.keyTrigger} className='clip' src={el.url}/></div>);                               
    return(<div>{drumKeys}</div>);
  }
 }

ReactDOM.render(<App />, document.getElementById('app'))