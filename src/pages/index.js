import React, { Component } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Bio from '../components/bio';
import Post from '../components/post';

class BlogIndex extends Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;
    return (
      <Layout>
        <SEO title="All Posts" keywords={[`gatsby`, `blog`, `react`]} />
        <Bio />
        <main>
          <h3
            css={`
              font-weight: 800;
              font-size: 2.6rem;
              margin: 4rem 0 2rem;
            `}
          >
            Latest Posts
          </h3>
          {posts.map(({ node }) => {
            return <Post node={node} key={node.id} />;
          })}
        </main>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 160)
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
