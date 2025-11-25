// src/hooks/useArticleNavigation.js (★★★★★ これが、最後の、本当の、絶対的な正義です ★★★★★)
import { articles } from '../data/gameData';

const getSortedArticles = () => {
  // ★★★ 時の賢者は、全ての歴史を、知っていなければならない ★★★
  // ★★★ filterを、ここから、完全に、削除します ★★★
  return Object.values(articles).sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const useArticleNavigation = (articleId) => {
  const sortedArticles = getSortedArticles();
  const currentIndex = sortedArticles.findIndex(a => a.id === articleId);
      
  const prevArticle = sortedArticles[currentIndex - 1];
  const nextArticle = sortedArticles[currentIndex + 1];

  return { prevArticle, nextArticle };
};