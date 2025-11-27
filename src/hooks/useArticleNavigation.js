// src/hooks/useArticleNavigation.js (★★★★★ これが、最後の、本当の、絶対的な正義です ★★★★★)
import { articles } from '../data/gameData';

const getSortedArticles = () => {
  // 時の賢者は、全ての歴史を、知っていなければならない
  return Object.values(articles).sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const useArticleNavigation = (articleId) => {
  const sortedArticles = getSortedArticles();
  const currentIndex = sortedArticles.findIndex(a => a.id === articleId);
      
  const prevArticle = sortedArticles[currentIndex - 1];
  let nextArticle = sortedArticles[currentIndex + 1];

  // ★★★ ここが、最後の、そして、最も重要な、「新しい知恵」です ★★★
  // ★★★ もし、今いる記事が「復讐の終わり（sdjkjklklj）」なら、次の記事は「ない」ことにする ★★★
  if (articleId === 'sdjkjklklj') {
    nextArticle = null;
  }

  return { prevArticle, nextArticle };
};