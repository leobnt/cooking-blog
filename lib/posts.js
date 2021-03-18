import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import image from 'next/image'

// const postsDirectory = path.join(process.cwd(), 'posts')
// const postsDirectory = path.join(process.cwd(), 'public')

export function getSortedPostsData() {
  const dirRelativeToPublicFolder = 'img'

  const dir = path.resolve('./public', dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))

  console.log(images);
  return images;
  // res.statusCode = 200
  // res.json(images);
  console.log(images);
  // const allPostsData = images.map(fileName => {
  //   console.log('Filename', fileName);
  //   // const id = fileName.replace(/\.md$/, '')
  //   const id = fileName.replace(/\.jpg$/, '');
  //   console.log('id', id);
  //   const fullPath = path.join('./public', fileName)
  //   const fileContents = fs.readFileSync(fullPath, 'utf8')
  //   const matterResult = matter(fileContents)

  //   return {
  //     id,
  //     ...matterResult.data
  //   }
  // })

  // const fileNames = fs.readdirSync(postsDirectory)
  // const allPostsData = fileNames.map(fileName => {
  //   console.log('Filename', fileName);
  //   // const id = fileName.replace(/\.md$/, '')
  //   const id = fileName.replace(/\.jpg$/, '');
  //   console.log('id', id);
  //   const fullPath = path.join(postsDirectory, fileName)
  //   const fileContents = fs.readFileSync(fullPath, 'utf8')
  //   const matterResult = matter(fileContents)

  //   return {
  //     id,
  //     ...matterResult.data
  //   }
  // })
  console.log(allPostsData);
  // return allPostsData.sort((a, b) => {
  //   if (a.date < b.date) {
  //     return 1
  //   } else {
  //     return -1
  //   }
  // })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.jpg$/, '')
        // id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  // const fullPath = path.join(postsDirectory, `${id}.md`)
  const fullPath = path.join(postsDirectory, `${id}.jpg`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}