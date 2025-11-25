// src/components/Calendar.jsx (★★★★★ 時を旅する魔法の時計バージョン ★★★★★)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/gameData';

const Calendar = () => {
  // ★★★ 物語のクライマックスである「2025年11月」を、初期値に設定します ★★★
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // (0-indexed, 10は11月)

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // --- 月を移動するための、2つの魔法の呪文 ---
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const articleDates = {};
  Object.values(articles).forEach(article => {
    const articleDate = new Date(article.date);
    if (articleDate.getFullYear() === year && articleDate.getMonth() === month) {
      articleDates[articleDate.getDate()] = article.id;
    }
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<td key={`empty-${i}`}></td>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const articleId = articleDates[day];
    calendarDays.push(
      <td key={day} className={articleId ? "calendar-day has-post" : "calendar-day"}>
        {articleId ? <Link to={`/article/${articleId}`}>{day}</Link> : day}
      </td>
    );
  }

  const rows = [];
  let cells = [];
  calendarDays.forEach((day, i) => {
    cells.push(day);
    if ((i + 1) % 7 === 0 || i === calendarDays.length - 1) {
      rows.push(<tr key={i}>{cells}</tr>);
      cells = [];
    }
  });

  return (
    <table className="calendar-table">
      <thead>
        {/* ★★★ ここが、時を旅するための、新しい「操縦席」です ★★★ */}
        <tr>
          <th><button onClick={goToPreviousMonth} className="calendar-nav-button">&laquo;</button></th>
          <th colSpan="5">{`${year}年 ${month + 1}月`}</th>
          <th><button onClick={goToNextMonth} className="calendar-nav-button">&raquo;</button></th>
        </tr>
        <tr>
          <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Calendar;