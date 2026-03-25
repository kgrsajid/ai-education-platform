# 🎓 SDU AI Education Platform - Frontend

React + TypeScript + Vite frontend for an AI-powered education platform for Kazakhstan school students (Grades 1-11).

## ✨ Features

### Grade-Based Adaptive UI
- 🌱 **Sprouts** (Grades 0-4): Cute, colorful, beginner-friendly
- 🚀 **Explorers** (Grades 5-9): Adventure-themed, discovery-focused
- 🎯 **Champions** (Grades 10-11): Professional, UNT exam prep

### AI Chat
- Real-time WebSocket chat with AI tutor
- Chat history and session management
- Summary mode for quick topic overviews

### Quiz System
- Browse and take quizzes
- Timed quiz sessions
- Results with scoring

### Flashcards
- Study flashcards by subject
- Card browsing and management

### Gamification (Phase 0)
- Points & XP tracking
- Level progression system
- Daily streak bonuses
- Reward redemption

### AI Trainer (Phase 1)
- Personal robot companion
- 5 evolution stages (Beginner → AI Master)
- Robot customization (name, color)
- Evolution roadmap

### Leaderboard (Phase 1)
- Rankings by Level, Points, or Streak
- Podium display for top 3
- Per-grade filtering

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── context/          # GradeBand theme context
│   │   └── router/           # React Router config
│   ├── features/
│   │   ├── api/             # RTK Query API slices
│   │   ├── auth/            # Login, register
│   │   ├── chat/            # Chat components
│   │   └── query/           # Query hooks
│   ├── pages/               # Page components
│   │   ├── home/           # Dashboard
│   │   ├── quiz/            # Quiz pages
│   │   ├── cards/          # Flashcard pages
│   │   ├── trainer/        # AI Trainer (Phase 1)
│   │   ├── leaderboard/    # Rankings (Phase 1)
│   │   └── rewards/        # Reward shop (Phase 0)
│   ├── widgets/            # Reusable components
│   │   ├── sidebar/        # Navigation sidebar
│   │   └── Chat/           # Chat window, input
│   ├── assets/
│   │   └── robots/         # Robot SVG avatars (Phase 1)
│   └── providers/          # App providers
├── public/
└── docker-compose.yml
```

## 🎨 Theme System

The app adapts its UI based on student's grade:

| Grade | Theme | Primary Color |
|-------|-------|--------------|
| 0-4 | 🌱 Sprouts | Indigo (#6366f1) |
| 5-9 | 🚀 Explorers | Orange (#f97316) |
| 10-11 | 🎯 Champions | Emerald (#10b981) |

## 🤖 Robot Evolution (Phase 1)

Students earn XP by completing activities:

| Activity | XP Earned |
|----------|-----------|
| Take Quiz | +5-15 XP |
| Study Flashcards | +3-10 XP |
| Chat with AI | +2 XP |
| Daily Login | +10 XP |

Robot evolves through stages as students level up:

```
Beginner (Lv 1) → Thinker (Lv 5) → Problem Solver (Lv 10) 
→ Scientist (Lv 15) → AI Master (Lv 20)
```

## 🔌 API Integration

The frontend connects to the Go backend at `VITE_API_URL`:

```bash
# .env
VITE_API_URL=http://localhost:8082/
```

## 🐳 Docker

```bash
# Build and run
docker compose up -d

# Access at http://localhost
```

## 📝 Pages

| Route | Description |
|-------|-------------|
| `/home` | Dashboard with progress stats |
| `/quiz` | Browse available quizzes |
| `/quiz/:id/start` | Take a quiz |
| `/cards` | Study flashcards |
| `/chat` | AI tutor chat |
| `/chat/:id` | Continue chat session |
| `/trainer` | Robot trainer profile (Phase 1) |
| `/leaderboard` | Rankings (Phase 1) |
| `/rewards` | Reward shop (Phase 0) |
| `/rewards/my` | My redeemed coupons (Phase 0) |

## 📦 Dependencies

- React 18
- React Router 6
- Ant Design 5
- RTK Query
- Lucide Icons

## 📄 License

MIT
