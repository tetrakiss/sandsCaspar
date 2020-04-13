import React, { Component } from 'react'
import { TimelineMax } from 'gsap'
import { States } from 'caspar-graphics'

export default class Example extends Component {
  static previewData = {
    leftText: 'Live',
    rightText: 'nxtedition demo'
  }

  componentDidMount() {
    this.timeline = new TimelineMax({ paused: true })
      .from(this.element, 0.6, { x: '100%', opacity: 0 })

    this.setState({ didMount: true }) // Make sure componentDidUpadte() is called
  }

  componentDidUpdate() {
    if (this.state.state === this.props.state) {
      return
    }

    if (this.props.state === States.playing) {
      this.timeline.play()
      this.setState({ state: States.playing })
    } else if (this.props.state === States.paused) {
      this.timeline.pause()
      this.setState({ state: States.paused })
    }
  }

  componentWillLeave(onComplete) {
    this.timeline
      .eventCallback('onReverseComplete', onComplete)
      .timeScale(2)
      .reverse()
  }

  componentWillUnmount() {
    this.timeline.kill()
  }

  render() {
    const { leftText, rightText } = this.props.data

    return (
      <div ref={ref => (this.element = ref)}>
        <div>{leftText}</div>
        <div>{rightText}</div>
      </div>
    )
  }
}
