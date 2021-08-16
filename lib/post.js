import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostData(){
    
    const fileNames = fs.readdirSync(postDirectory)

    const allPostData = fileNames.map(fileNames => {
        
        // Remove ".md" from file name to get id
        const id = fileNames.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postDirectory, fileNames)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // User gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        }
    });

    // Sort posts by date
    return allPostData.sort(({data: a}, {date: b}) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}

export function getAllPostId(){
    const filesNames = fs.readdirSync(postDirectory)

    return filesNames.map(filesName => {
        return {
            params: {
                id: filesName.replace(/\.md$/, '')
            }
        }
    })
}

export function getPostData(id) {
    const fullPath = path.join(postDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section 
    const matterResult = matter(fileContents)

    // Coombine the data with the id
    return {
        id, 
        ...matterResult.data
    }
}