import React from "react"

import Lottie from 'react-lottie';
import './styles.css';

class LottiePlayer extends React.PureComponent {

  state = {isStopped: false, isPaused: false};

  render() {
    const buttonStyle = {
      display: 'block',
      margin: '10px auto'
    };

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: this.props.animationData.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    
    return (
      <div className="player" style={{ animationDelay: `${this.props.delay}s` }}>
      <Lottie
        ref={(node) => { this.ref = node }}
        options={defaultOptions}
        height={window.innerHeight}
        width={window.innerWidth}
        isStopped={this.state.isStopped}
        isPaused={this.state.isPaused}
      />
        <button style={buttonStyle} onClick={() => this.setState({isStopped: true})}>stop</button>
        <button style={buttonStyle} onClick={() => this.setState({isStopped: false})}>play</button>
        <button style={buttonStyle} onClick={() => {
            // this.setState({isPaused: !this.state.isPaused})
            this.ref.anim.setDirection(-1);
          }}>goToAndPlay</button>
                <button style={buttonStyle} onClick={() => {
        // this.setState({isPaused: !this.state.isPaused})
        this.ref.anim.goToAndStop(30, true );
      }}>goToAndPlay</button>
      </div>
    );
  }
}

export default LottiePlayer;
