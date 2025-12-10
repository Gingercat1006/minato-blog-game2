// src/data/gameData.js 

// 今日の日付を 'YYYY-MM-DD' 形式で取得する魔法の関数
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 日付計算関数
// N=0 を指定すれば「今日」が手に入る！
const getDateBefore = (days) => {
  const today = new Date();
  const targetDate = new Date();
  targetDate.setDate(today.getDate() - days);
  return formatDate(targetDate);
};
const articlesList = [
  // --- 第1部：日常と違和感 ---
  { id: '1', date: getDateBefore(28), title: 'はじめまして', theme: '日常', content: `はじめまして。湊（みなと）です。\nここは、私の“記録”です。` },
  { id: '2', date: getDateBefore(25), title: '雨の音', theme: '日常', content: `今日は一日中、雨が降っていました。\n雨の日は嫌いです。あの日のことを思い出すので。\n昔、誰かに教えてもらいました。物事の「真実」を見抜かなければならない、と。` },
  { id: '3', date: getDateBefore(22), title: '月', theme: '日常', content: `今夜は、月が綺麗ですね。\n静かな夜は、思考がクリアになります。\nあの夜も、こんな月が出ていた。\n[IMAGE:/images/bar_whale.jpg]`},
  { id: '4', date: getDateBefore(18), title: 'コーヒーの時間', theme: '日常', content: `お気に入りの豆を、丁寧に挽く。\n苦味とその奥にある、微かな甘み。まるで人生のようです。` },
  { id: '5', date: getDateBefore(16), title: 'あの日のこと', theme: '思い出', content: `10年前の今日。あの冷たい雨が降る日でした。\n私は、全てを失った。あの霞町の202号室のアパートで。\n世間の人々は、もう誰も覚えていないかもしれません。\n私は一日だって忘れたことはない。` },

  // --- 第2部：第一の復讐 ---
  { id: 'weiffd', date: getDateBefore(13), isProtected: true, title: '忘れられた事件', theme: '隠された記事', hint: '私が全てを失った場所の町名は？', content: `この記録を、誰かが見ることはあるのだろうか。\n\n警察は事件を「終わらせた」。\n未解決事件という無責任なラベルを貼って、分厚いファイルの一番奥に押し込んだ。\n彼らが埃かぶった資料の山に、真実を埋もれさせている間、私はたった一人でこの10年間、真実の欠片を拾い集めてきた。\nあの日あの場所にいた、3人の悪魔。
    \n家族に最初に目をつけた、あの下劣なS。\n偽りの笑顔を浮かべ、警察を欺いたあの狡猾なM。\nそして、その全てを企て妻と娘を私の腕から奪い去った、あの主犯のO。\n警察が放棄した「正義」。\nならば私が執行する。\n\nこれは復讐ではない。\n10年遅れただけの、たった一つの「真実」の記録だ。` 
      },
  { id: '47reuyecb', date: getDateBefore(11), isProtected: true, title: '最初の場所', theme: '隠された記事', hint: 'Sがあの夜、仲間と飲んでいた店の名前は？ヒントは「月」', content: `Sは今も酒を飲んで生きている。\n調べ上げた。奴の経営する店「bar WHALE」。\n今夜、私が最後の客だ。\n\n[IMAGE:/images/mikaka2.jpg]` },
  { id: 'z.lsd', date: getDateBefore(10), isProtected: true, title: '一人目', theme: '隠された記事', hint: 'xs4とは誰か？手元をよく見て', content: `佐藤の息の根を止めた。\n奴は最後まで何も思い出さなかった。\nそれでいい。ただ、消えればいい。\nあと二人。[IMAGE:/images/iphone.jpg]` },

  // --- 第3部：第二、第三の復讐 ---
  { id: 'yurtuyroi', date: getDateBefore(9), isProtected: true, title: '二人目', theme: '隠された記事', hint: 'Mの名前は？', content: `二人目の男、三宅。隣の部屋に住んでいた男。\nあの夜、彼は何も見なかったと証言した。嘘つき。\n奴は当時と同じ場所で、息を潜めて暮らしている。` },
  { id: 'iuyerewv', date: getDateBefore(7), isProtected: true, title: '二人目の男', theme: '隠された記事', hint: '二人目の男、Mが住んでいた部屋番号は？', content: `三宅も消した。\nこれであと一人。\n最後の男、O。奴だけは、絶対にこの手で。\n「真実は目に見えるとは限らない。」\n\n\n[HIDDEN]最後は奴を...「折戸」を殺すだけ...[/HIDDEN]` },
  { id: 'pa;xa', date: getDateBefore(5), isProtected: true, title: '最後の男', theme: '隠された記事', hint: 'Oの名前は？君は本当に昨日の投稿を全部見た？', content: `主犯、折戸。あの日、青いトラックに乗って妻と娘を連れ去った男。\n奴は、全てを奪った。\n10年間、ずっとこの日のために生きてきた。\n娘が最後に私にくれた宝物。それが、最後の道標だ。[IMAGE:/images/1107.jpg]` },
  
  // ここを変更：折戸殺害後に、暗号メモを発見させるⅢ
  { id: 'sdjkjklklj', date: getDateBefore(3), isProtected: true, title: '復讐の終わり', theme: '隠された記事', hint: '“私”の誕生日', content: `全て終わった...\n折戸も...私の手で裁いた...\n長かった...本当に長かった...\n\n奴のポケットから、汚れた2枚のメモが出てきた。\n[IMAGE:/images/memo_number.jpg]\n[IMAGE:/images/memo_hiragana.jpg]\n…今更、何だというんだ。\nもう、メモの意味などどうでもいい。この世に未練はない。\n\n[LINK:/home/article/jdfhsj|» 最後の記録へ]` },

  // --- 第4部：最後の告白と、最終分岐（自殺ルート） ---
  { id: 'jdfhsj', date: getDateBefore(2), isProtected: true,title: '最後の記録', theme: '隠された記事', hint: '娘が見たいと言っていた生物は？ヒントは、このブログのどこかに。', content: `このブログをここまで読み進めたあなたへ。\nあなたは、私のたった一人の"共犯者"です。\n\nメモの意味は、わからなかった。\n私は、これから家族で最後に行く約束だった場所へ向かいます。\nあの静かな青い光の中で、全てを終わらせるために。\n\nこのブログのヘッダー画像がその場所です。\n私の居場所が分かりましたか？`, isFinal: true },
  // True End
  {
    id: 'truth-alive',
     date: getDateBefore(0), // ← 自動的に「今日の日付」になる
    title: '【更新】真実',
    theme: '緊急更新',
    isProtected: false, // パスワードなしで読める（チャットで謎を解いたご褒美）
    isTrueEnd: true, // 特別なフラグ：これがTrueの時だけ、自首エンドへのボタンが出る
    isHidden: true, // 一覧表示制御用のフラグ：アラートが出るまで隠しておく
    content: `手が震えている。\nブログを読み進め、折戸のメモを解いた人に教えてもらった「霞倉庫」へ向かった。\n\n…いた。\n生きていた。\n監禁されていた妻と娘が。\n\n私は、なんてことをしてしまったんだ。\n復讐などせずに、もっと早くこのメモに気付いていれば。\n二人を抱きしめたい。でも、この手は血で汚れている。\n\n私は決めた。\nこれが、父親としてできる最後の償いだ。`
  }
];


const endingList = [
  {id:'1', title: 'ENDING 1-A: あなたは、彼女を止めた',text: 'あなたは震える手で、警察に「水族館です」と伝えた。\n数時間後、ニュース速報が流れる。\n「連続殺人事件の重要参考人とみられる人物の身柄を、霞水族館に駆けつけた警察官が保護した、との情報が入りました…」\nあなたは、一人の復讐者を裁くことができた。\n\n本当にこれでよかったのだろうか…'},
  {id:'2', title: 'ENDING 2: あなたは、見逃した',text: 'あなたは、見過ごすことを選んだ。\nブログが更新されることは、もう二度となかった。\n湊がどうなったのか、知る者は誰もいない。\nただ、あなたの心の中にだけ、一人の復讐者の最後の記録が静かに残り続ける。\nあなたは、彼の最後の共犯者になった。\n\n共犯者として彼にできることはなかったのだろうか…'},
  {id:'3', title: 'ENDING ×××: あなたの言葉は、届かなかった',text: 'あなたの言葉は、届かなかった。\n警察は、あなたの曖昧な通報を、いたずらだと判断したのかもしれない。\n翌日のニュースは、いつもと変わらないものだった。ただ連続殺人事件の犯人は未だ見つかっていない。\nあなたは、一人の復讐者を裁くことができなかった。'},
  
  //自首（生存）エンド
  {id:'4', title: 'TRUE ENDING: 罪と、生と', text: 'あなたは、彼の背中を押した。\n\n湊は震える手で、自ら警察に通報した。\n「10年前の誘拐事件の被害者を見つけました。\nそして、私は連日起こっていた殺人事件の犯人です。」\n\n翌日ニュースは、10年前の行方不明者が保護されたこと、\nそして最近起こっていた3人の殺人事件の容疑者が、自首したことを報じた。\n\nガラス越しに再会した、妻と娘の涙。\n湊は手錠をかけられた手で、ガラスに触れ、静かに微笑んだ。\n\n彼の罪は消えない。しかし、彼の愛した命は確かに、そこにあった。'}
];

// --- 記事のリストから必要なidを引き出す処理 ---
export const articles = articlesList.reduce((acc,article) => {
  acc[article.id] = article;
  return acc;
},{});

// --- エンディングリストから必要なidを引き出す処理 ---
export const endings = endingList.reduce((acc,ending) => {
  acc[ending.id] = ending;
  return acc;
},{});