import fs from 'fs';
const { readFile, readdir } = require("fs").promises;

const jsonMatch = new RegExp(/\.json$/);

export const parseArticles = async (contentDirectory, maxArticles) => {
  const articleFilenames = await directoryRead(contentDirectory, maxArticles) || [];

  const articles = await Promise.all(
    articleFilenames
      .filter((filename) => jsonMatch.test(filename))
      .map(async (filename) => {
        const content = await readFile(`${contentDirectory}/${filename}`);
        return JSON.parse(content);
      })
      .filter(async (content) => {
        const { isPublished, isVisible } = await content;
        
        if (isPublished && isVisible) {
            return true;
        } else {
            return false;
        }
      })
  );

  return articles.sort((a, b) => b.articleId < a.articleId ? 1 : -1);
};

const directoryRead = async (contentDirectory, maxArticles) => {
  const filenames = await readdir(contentDirectory);
  
  return maxArticles ? filenames.slice(0, maxArticles) : filenames;
};
