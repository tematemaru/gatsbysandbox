import React from "react"
import { graphql } from "gatsby"
import LottiePlayer from '../components/LottiePlayer/LottiePlayer';
import Layout from '../components/Layout/Layout';
import SEO from '../components/Seo/Seo';
import * as animationData from  '../animations/animation.json';
import * as animationDataCrab from  '../animations/crab.json';
import * as animationDataCoce from  '../animations/coce.json';
import * as animationDataPizza from  '../animations/pizza.json';
import * as animationDataPeoples from  '../animations/peoples.json';
import * as animationDataSnta from  '../animations/santa.json';
import * as animationDataSite from  '../animations/site.json';
import * as animationDataCat from  '../animations/cat.json';

const animations = [
  animationData,
  animationDataCrab,
  animationDataCoce,
  animationDataPizza,
  animationDataPeoples,
  animationDataSnta,
  animationDataSite,
  animationDataCat,
];


class PlayerPage extends React.PureComponent {
  render() {
    // const { markdownRemark } = this.props.data; // data.markdownRemark holds our post data
    
    return (
      <Layout>
        <SEO title="Home" />
        {
          animations.map((a, i) => {
            return <LottiePlayer animationData={a} delay={i}/>
          })
        }
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

export default PlayerPage;
