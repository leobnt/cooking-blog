import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/picture'
import React from 'react'
import Image from 'next/image'
import {
  Box,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
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
    if (event.keyCode === 32 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 || event.keyCode == 67) {
      this.setState({ handleHook: event.keyCode, handleNumb: ++this.state.handleNumb });
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
        <Box m={50} >
        <Wrap justify="center">
          {this.props.allPostsData.map((img, index) => (
            <WrapItem
              key={index}
              boxShadow="base"
              rounded="20px"
              overflow="hidden"
              bg="white"
              lineHeight="0"
              _hover={{ boxShadow: "dark-lg" }}>
                <Image className={utilStyles.pictureItem} src={img}
                 height={600} width={400} ></Image>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
      </Layout>
    )
  }
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}
