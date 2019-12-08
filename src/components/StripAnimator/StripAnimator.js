import React from 'react';
import PropTypes from 'prop-types';
import { TweenMax, Power4 } from 'gsap';

import './styles.css';

class StripAnimator extends React.PureComponent {
  static propTypes = {
    strip: PropTypes.string.isRequired,
    ease: PropTypes.func,
    isVisible: PropTypes.bool,
    animateOnMount: PropTypes.bool,
    direction: PropTypes.string,
    from: PropTypes.string,
    amount: PropTypes.number,
    duration: PropTypes.number,
    delayIn: PropTypes.number,
    delayOut: PropTypes.number,
    textTransform: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.chars = this.props.strip.split('').map((char) => (
      <span className="char">{char === ' ' ? '\u00A0' : char}</span>
    ));
  }

  componentDidMount() {
    this.charHeight = this.node.getBoundingClientRect().height;
    const {
      animateOnMount,
      direction,
      from,
      amount,
      delayIn,
      ease,
    } = this.props;
    
    if (animateOnMount) {
      const to = direction === 'up' ? -this.charHeight: this.charHeight;
      this.animate(to, 0, 0, 0, from, ease, () => {
        this.animate(0, 1.5, delayIn, amount, from)
      });
    }
  }

  animate = (
    to,
    duration,
    delay=0,
    amount=0,
    from='end',
    ease=Power4.easeInOut, 
    easeForLine,
    axis='x',
    callback,
  ) => {
    let fromChar = from;
    if (from === 'start') { fromChar = 0; }

    if (duration === 0) {
      for (let i = 0; i < this.node.childNodes.length; i++) {
        TweenMax.set(this.node.childNodes[i], {y: `${to}px`, onComplete: callback });
      }
    }
    
    TweenMax.staggerTo(
      this.node.childNodes,
      duration,
      {
        y: `${to}px`,
        ease,
        delay,
        stagger: {
          from: fromChar,
          axis: axis,
          ease: easeForLine,
          amount,
        },
        onComplete: callback,
      });
  }

  UNSAFE_componentWillReceiveProps({
    isVisible: isVisibleNext,
    direction: directionNext,
    from: fromNext,
    amount: amountNext,
    delayIn: delayInNext,
    delayOut: delayOutNext,
    ease: easeNext,
  }) {
    const { isVisible } = this.props;
    if (isVisible !== isVisibleNext) {
      const to = directionNext === 'up' ? -this.charHeight: this.charHeight;

      if (!isVisibleNext) {
        this.animate(to, 1.5, delayOutNext, amountNext, fromNext, easeNext);
      } else {
        this.animate(0, 1.5, delayInNext, amountNext, fromNext)
      }
    }
  }

  render() {
    const { textTransform } = this.props;
    return (
      <div className="strip-wrapper" style={{ textTransform }}>
        <div className="strip" ref={(node) => { this.node = node}}>
          {this.chars}
        </div>
      </div>
    );
  }
}

export default StripAnimator;
