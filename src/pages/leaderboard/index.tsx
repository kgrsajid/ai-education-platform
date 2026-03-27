import { useState } from 'react';
import { Avatar, Spin, Empty } from 'antd';
import { Trophy, Star, Flame, TrendingUp } from 'lucide-react';
import { useGetLeaderboardQuery } from '../../features/api/trainer';
import { useGradeBand } from '../../app/context/grade-band';

const SORT_OPTIONS = [
  { key: 'level', label: 'Level', icon: <Trophy size={16} /> },
  { key: 'points', label: 'Points', icon: <Star size={16} /> },
  { key: 'streak', label: 'Streak', icon: <Flame size={16} /> },
];

export default function LeaderboardPage() {
  const [sort, setSort] = useState('level');
  const [page, setPage] = useState(1);
  const { theme } = useGradeBand();

  const { data, isLoading } = useGetLeaderboardQuery({ sort, page, limit: 20 });

  const leaderboard = data?.data?.leaderboard || [];
  const total = data?.data?.total || 0;

  const currentUser = leaderboard.find((u: any) => u.is_current_user);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { emoji: '🥇', bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)', glow: '0 0 20px rgba(251,191,36,0.2)' };
    if (rank === 2) return { emoji: '🥈', bg: 'rgba(192,192,192,0.15)', border: 'rgba(192,192,192,0.3)' };
    if (rank === 3) return { emoji: '🥉', bg: 'rgba(205,127,50,0.15)', border: 'rgba(205,127,50,0.3)' };
    return { emoji: null, bg: 'transparent', border: 'transparent' };
  };

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 20px', background: 'rgba(251,191,36,0.1)',
          border: '1px solid rgba(251,191,36,0.2)', borderRadius: 20,
          marginBottom: 12,
        }}>
          <Trophy size={18} style={{ color: '#fbbf24' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#fbbf24' }}>LEADERBOARD</span>
        </div>
        <h1 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: '#f1f5f9' }}>
          Top Students
        </h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
          Complete quizzes, study flashcards, submit assignments, and keep your streak alive!
        </p>
      </div>

      {/* Current User Banner */}
      {currentUser && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '16px 20px', marginBottom: 24,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(99,102,241,0.08))',
          border: '1px solid rgba(59,130,246,0.25)', borderRadius: 14,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: currentUser.robot_color || '#6366f1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 700, color: '#fff',
          }}>
            {currentUser.rank}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 15 }}>
              Your Position
            </div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>
              Level {currentUser.current_level} • {currentUser.total_xp?.toLocaleString()} XP • {currentUser.total_points?.toLocaleString()} pts
            </div>
          </div>
          <TrendingUp size={20} style={{ color: '#3b82f6' }} />
        </div>
      )}

      {/* Sort Tabs */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 20, justifyContent: 'center',
      }}>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => { setSort(opt.key); setPage(1); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 18px', borderRadius: 10,
              border: sort === opt.key ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(51,65,85,0.5)',
              background: sort === opt.key ? 'rgba(59,130,246,0.15)' : 'rgba(15,23,42,0.5)',
              color: sort === opt.key ? '#60a5fa' : '#94a3b8',
              cursor: 'pointer', fontSize: 13, fontWeight: sort === opt.key ? 600 : 400,
              transition: 'all 0.2s',
            }}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 60 }}><Spin size="large" /></div>
      ) : leaderboard.length === 0 ? (
        <Empty description="No students yet" style={{ padding: 60 }} />
      ) : (
        <>
          {/* Podium - Top 3 */}
          {page === 1 && leaderboard.length >= 3 && (
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
              gap: 12, marginBottom: 28,
            }}>
              {/* 2nd */}
              <PodiumCard user={leaderboard[1]} rank={2} badge={getRankBadge(2)} />
              {/* 1st */}
              <div style={{ transform: 'translateY(-20px)' }}>
                <PodiumCard user={leaderboard[0]} rank={1} badge={getRankBadge(1)} />
              </div>
              {/* 3rd */}
              <PodiumCard user={leaderboard[2]} rank={3} badge={getRankBadge(3)} />
            </div>
          )}

          {/* Full List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(page === 1 && leaderboard.length >= 3 ? leaderboard.slice(3) : leaderboard).map((u: any) => (
              <div
                key={u.user_id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 18px', borderRadius: 12,
                  background: u.is_current_user ? 'rgba(59,130,246,0.08)' : 'rgba(15,23,42,0.3)',
                  border: u.is_current_user ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{
                  width: 32, textAlign: 'center', fontWeight: 700,
                  fontSize: 15, color: '#64748b',
                }}>
                  {u.rank}
                </span>
                <Avatar
                  size={38}
                  style={{
                    background: u.robot_color || '#6366f1',
                    fontSize: 15, fontWeight: 600,
                    border: u.is_current_user ? '2px solid #3b82f6' : 'none',
                  }}
                >
                  {(u.name || '?').charAt(0).toUpperCase()}
                </Avatar>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: u.is_current_user ? 600 : 400, color: '#f1f5f9', fontSize: 14 }}>
                    {u.name || u.email}
                    {u.is_current_user && (
                      <span style={{
                        marginLeft: 8, fontSize: 11, padding: '1px 8px',
                        background: 'rgba(59,130,246,0.2)', color: '#60a5fa',
                        borderRadius: 4, fontWeight: 600,
                      }}>YOU</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>
                    Grade {u.grade} • {u.robot_name || 'AI Buddy'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 20, textAlign: 'right' }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Level</div>
                    <div style={{ fontWeight: 700, color: '#60a5fa', fontSize: 15 }}>{u.current_level}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>XP</div>
                    <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: 15 }}>{(u.total_xp || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Points</div>
                    <div style={{ fontWeight: 600, color: '#fbbf24', fontSize: 15 }}>{(u.total_points || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Streak</div>
                    <div style={{ fontWeight: 600, color: '#f97316', fontSize: 15 }}>{u.longest_streak || 0}🔥</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {total > 20 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: '6px 16px', borderRadius: 8,
                  background: 'rgba(15,23,42,0.5)', border: '1px solid rgb(51,65,85)',
                  color: '#94a3b8', cursor: page === 1 ? 'not-allowed' : 'pointer',
                  opacity: page === 1 ? 0.5 : 1,
                }}
              >
                Previous
              </button>
              <span style={{ padding: '6px 16px', color: '#64748b', fontSize: 13 }}>
                Page {page} of {Math.ceil(total / 20)}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= Math.ceil(total / 20)}
                style={{
                  padding: '6px 16px', borderRadius: 8,
                  background: 'rgba(15,23,42,0.5)', border: '1px solid rgb(51,65,85)',
                  color: '#94a3b8', cursor: page >= Math.ceil(total / 20) ? 'not-allowed' : 'pointer',
                  opacity: page >= Math.ceil(total / 20) ? 0.5 : 1,
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Podium card component for top 3
function PodiumCard({ user, rank, badge }: { user: any; rank: number; badge: { emoji: string | null; bg: string; border: string; glow?: string } }) {
  return (
    <div style={{
      width: rank === 1 ? 180 : 150,
      textAlign: 'center',
      padding: '20px 12px 16px',
      background: badge.bg,
      border: `1px solid ${badge.border}`,
      borderRadius: 16,
      ...(badge.glow ? { boxShadow: badge.glow } : {}),
    }}>
      <div style={{ fontSize: rank === 1 ? 40 : 32, marginBottom: 8 }}>{badge.emoji}</div>
      <Avatar
        size={rank === 1 ? 52 : 44}
        style={{
          background: user.robot_color || '#6366f1',
          margin: '0 auto 8px',
          display: 'flex', fontSize: rank === 1 ? 20 : 16, fontWeight: 700,
        }}
      >
        {(user.name || '?').charAt(0).toUpperCase()}
      </Avatar>
      <div style={{
        fontWeight: 700, color: '#f1f5f9',
        fontSize: rank === 1 ? 15 : 13,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {user.name?.split(' ')[0] || 'Student'}
      </div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>
        Grade {user.grade}
      </div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '3px 10px', borderRadius: 6,
        background: `${user.robot_color || '#6366f1'}25`,
        fontSize: 12, fontWeight: 600,
        color: user.robot_color || '#6366f1',
      }}>
        Lv. {user.current_level}
      </div>
      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
        {(user.total_xp || 0).toLocaleString()} XP
      </div>
    </div>
  );
}
