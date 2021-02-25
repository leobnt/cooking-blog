import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
// import Date from '../components/date'
import PxlComponent from '../pages/pexel'
import React from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleHookFunc = this.handleHookFunc.bind(this);
    this.state = {
      handleHook: '',
      handleNumb: 0
    };
  }
  handleHookFunc(event) {
    if (event.keyCode === 32 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 || event.keyCode == 67 ) {
      this.setState({handleHook: event.keyCode, handleNumb: ++this.state.handleNumb});
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleHookFunc, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleHookFunc, false);
  }
  render() {
    return (
      <Layout home tabIndex='0'>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        {/* <section className={utilStyles.headingMd}>
          <p>[...]</p>
        </section> */}
        <PxlComponent handleHook={this.state.handleHook} handleNumb={this.state.handleNumb}/>
        {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {this.props.allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section> */}
      </Layout>
    )
  }
}

// export default function Home({ allPostsData }) {
//   return (
//     <Layout home onKeyDown={ handleKeyDown } tabIndex='0'>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
//       <section className={utilStyles.headingMd}>
//         <p>[...]</p>
//       </section>
//       <PxlComponent/>
//       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//         <h2 className={utilStyles.headingLg}>Blog</h2>
//         <ul className={utilStyles.list}>
//           {allPostsData.map(({ id, date, title }) => (
//             <li className={utilStyles.listItem} key={id}>
//               <Link href={`/posts/${id}`}>
//                 <a>{title}</a>
//               </Link>
//               <br/>
//               <small className={utilStyles.lightText}>
//                 <Date dateString={date} />
//               </small>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </Layout>
//   )
// }

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
