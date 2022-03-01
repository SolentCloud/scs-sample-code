import BlogArticle from "../../../components/Blog/BlogArticle.js";
import Footer from "../../../components/_App/Footer";
import Link from "next/link";
import Navbar from "../../../components/_App/Navbar";
import PageBanner from "../../../components/Common/PageBanner";
import React from "react";
import { parseArticles } from "../../../utils/ParseArticles";

const NEWS_DIRECTORY = "config/news";

export async function getStaticPaths() {
  const articles = await parseArticles(NEWS_DIRECTORY);
  const paths = articles.map(({ slug }) => `/news/${slug}`);

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const articles = await parseArticles(NEWS_DIRECTORY);
  const slug = params.slug;

  const article = articles.find(article => article.slug === slug);
  
  return {
    props: {
      seoPageTitle: article.seoPageTitle,
      seoPageDescription: article.seoPageDescription,
      previewImage: article.previewImage,
      article,
    },
  };
};

const Article = ({ article }) => {
  return (
    <>
      <Navbar />
      <PageBanner pageTitle={article.subtitle} />
      <BlogArticle {...article} />
      <Footer />
    </>
  );
}

export default Article;