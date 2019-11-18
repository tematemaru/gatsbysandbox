import React from "react"
import { graphql } from "gatsby"

import Layout from '../components/Layout/Layout';
import SEO from '../components/Seo/Seo';
import Arcanoid from '../components/Arcanoid';


class IndexPage extends React.PureComponent {
  render() {
    // const { markdownRemark } = this.props.data; // data.markdownRemark holds our post data
    
    return (
      <Layout>
        <SEO title="Home" />
        <Arcanoid />
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

export default IndexPage;
