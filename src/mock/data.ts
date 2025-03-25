// mock/data.ts - FFIE Sentiment Tool Mock Data

export const trendingKeywords = [
  { keyword: "FFIE", count: 128 },
  { keyword: "Branding FFAI", count: 96 },
  { keyword: "new funding", count: 88 },
  { keyword: "YT", count: 77 },
  { keyword: "short squeeze", count: 65 },
  { keyword: "EV future", count: 53 },
  { keyword: "moon", count: 41 },
];

export const sentimentTrend = [
  { date: "2025-03-19", score: 0.1 },
  { date: "2025-03-20", score: 0.05 },
  { date: "2025-03-21", score: -0.2 },
  { date: "2025-03-22", score: -0.4 },
  { date: "2025-03-23", score: -0.1 },
  { date: "2025-03-24", score: 0.15 },
  { date: "2025-03-25", score: 0.3 },
];

export const sentimentAlert = {
  triggered: true,
  message: "⚠️ Sentiment dropped significantly on 2025-03-22. Monitor closely.",
};

export const botPreview = `
📊 FFIE Sentiment Report - 2025-03-25

- 7-day Sentiment Trend: ↑ Improving
- Top Keywords: FFIE, Branding FFAI, new funding
- Last Peak Fear: 2025-03-22 (-0.40)

🔥 Stay informed. Stay strong. #FFIE
`; 