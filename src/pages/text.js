import React from "react"
import { graphql } from "gatsby"
import { Power4 } from 'gsap';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Seo/Seo';
// import Arcanoid from '../components/Arcanoid';
import StripAnimator from '../components/StripAnimator';


class TextPage extends React.PureComponent {
  state = {
    isVisible: true,
    direction: 'up',
    from: 'start',
  }

  switch = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }

  switchDir = () => {
    this.setState({ direction: this.state.direction === 'up' ? 'down' : 'up' });
  }

  switchFrom = () => {
    const from = this.state.from === 'start' ? 'end' : 'start';
    this.setState({ from });
  }

  render() {
    console.log(this.state.from);
    
    return (
      <Layout>
        <SEO title="Home" />
        <StripAnimator
          strip="Strip Animator"
          isVisible={this.state.isVisible}
          direction={this.state.direction}
          from={this.state.from}
          amount={0.3}
          duration={1}
          delayIn={0}
          delayOut={0.5}
          ease={Power4.easeInOut}
          textTransform="uppercase"
          animateOnMount
        />
        <button onClick={this.switch}>Toggle</button>
        <button onClick={this.switchDir}>Toggle Dir</button>
        <button onClick={this.switchFrom}>Toggle From</button>
      </Layout>
    );
  }
}


export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;

export default TextPage;
