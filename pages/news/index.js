import Footer from "../../components/_App/Footer";
import Navbar from "../../components/_App/Navbar";
import NewsSnippet from "../../components/News/NewsSnippet";
import PageBanner from "../../components/Common/PageBanner";
import React from "react";
import { parseArticles } from "../../utils/ParseArticles";

const NEWS_DIRECTORY = "config/news";

export const getStaticProps = async () => {
  const articles = await parseArticles(NEWS_DIRECTORY);

  return {
    props: {
      seoPageTitle: 'Latest News from Solent Cloud Systems',
      seoPageDescription:
        'The latest news, articles, awards, R&D notifications and press releases from Solent Cloud Systems',
      previewImage: '/images/awards/sme-news-southern-enterprise-awards-2021.png',
      articles,
    },
  };
};

const News = ({ articles }) => {
  const newsArticles = articles.map(article => <NewsSnippet key={article.articleId} {...article} />);

  return (
    <>
      <Navbar />

      <PageBanner pageTitle="Latest News" />

      <div className="blog-area bg-f9f9f9 ptb-100">
        <div className="container">
          <div className="row">
            <>
              {newsArticles}
            </>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default News;
