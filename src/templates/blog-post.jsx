import * as React from 'react'
import { graphql,Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const BlogPost = ({data, pageContext}) => {
  const { previous, next } = pageContext
  const image = getImage(data.mdx.frontmatter.hero_image) 
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.date}</p>
      <GatsbyImage
      image={image}
      alt={data.mdx.frontmatter.hero_image_alt}/>
      <p>
        Photo Credit:{" "}
        <Link to={data.mdx.frontmatter.hero_image_credit_link}>
          {data.mdx.frontmatter.hero_image_credit_text}
        </Link>
      </p>
      {data.mdx.tableOfContents.items.map((item)=>{
          return(
            <li key={item.url}>
              <a href={item.url} key={item.url} >
                {item.title}
              </a>
            </li>
          )
        })}
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>
      <nav className="page-links">
        <h2>More Readings</h2>
        {!previous && !next && <p>Nothing here yet!</p>}
        <ul>
          <li>
            {previous && (
              <Link to={`/blog${previous.fields.slug}`} rel="prev">
                {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog${next.fields.slug}`} rel="next">
                {next.frontmatter.title}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const query = graphql`
query($slug: String!) {
  mdx(fields: { slug: { eq: $slug } }) {
    body
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
      hero_image_alt
      hero_image_credit_link
      hero_image_credit_text
      hero_image {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    tableOfContents
  }
}
`

export default BlogPost
