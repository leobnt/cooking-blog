import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export function getSortedPostsData() {
  const dirRelativeToPublicFolder = 'img'
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  const filenames = fs.readdirSync(dir);
  const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))

  console.log(images);
  return images;
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