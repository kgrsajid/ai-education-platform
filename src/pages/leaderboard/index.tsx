import { useState } from 'react';
import { Card, Table, Tag, Tabs, Avatar, Alert } from 'antd';
import { useGetLeaderboardQuery } from '../../features/api/trainer';
import { useGradeBand } from '../../app/context/grade-band';

const SORT_OPTIONS = [
  { key: 'level', label: '🎯 Level', description: 'Ranked by current level and XP' },
  { key: 'points', label: '⭐ Points', description: 'Ranked by total points earned' },
  { key: 'streak', label: '🔥 Streak', description: 'Ranked by longest daily streak' },
];

export default function LeaderboardPage() {
  const [sort, setSort] = useState('level');
  const [page, setPage] = useState(1);
  const { theme } = useGradeBand();

  const { data, isLoading } = useGetLeaderboardQuery({ sort, page, limit: 20 });

  const leaderboard = data?.data?.leaderboard || [];
  const total = data?.data?.total || 0;
  const currentSort = SORT_OPTIONS.find(s => s.key === sort);

  // Find current user's position
  const currentUser = leaderboard.find((u: any) => u.is_current_user);

  const getPodiumEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 70,
      render: (rank: number) => (
        <span style={{ fontWeight: 700, fontSize: 18 }}>{getPodiumEmoji(rank)}</span>
      ),
    },
    {
      title: 'Student',
      key: 'name',
      render: (_: unknown, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar
            style={{
              background: record.robot_color || '#6366f1',
              fontSize: 14,
              border: record.is_current_user ? `2px solid ${theme.colors.primary}` : 'none',
            }}
          >
            {record.name?.charAt(0)?.toUpperCase() || '?'}
          </Avatar>
          <div>
            <div style={{ fontWeight: record.is_current_user ? 700 : 400, color: theme.colors.text }}>
              {record.name || record.email}
              {record.is_current_user && <Tag color="blue" style={{ marginLeft: 8 }}>You</Tag>}
            </div>
            <div style={{ fontSize: 12, color: theme.colors.textSecondary }}>
              Grade {record.grade} • {record.robot_name || 'AI Buddy'}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Level',
      dataIndex: 'current_level',
      key: 'current_level',
      width: 90,
      render: (level: number) => (
        <Tag color={theme.colors.primary} style={{ fontWeight: 600, fontSize: 13 }}>
          Lv. {level}
        </Tag>
      ),
    },
    {
      title: 'XP',
      dataIndex: 'total_xp',
      key: 'total_xp',
      width: 100,
      render: (xp: number) => (
        <span style={{ fontWeight: 500 }}>{xp?.toLocaleString() || 0}</span>
      ),
    },
    {
      title: 'Points',
      dataIndex: 'total_points',
      key: 'total_points',
      width: 100,
      render: (pts: number) => (
        <span style={{ color: '#eab308', fontWeight: 500 }}>{pts?.toLocaleString() || 0}</span>
      ),
    },
    {
      title: 'Streak',
      dataIndex: 'longest_streak',
      key: 'longest_streak',
      width: 80,
      render: (streak: number) => (
        <span>{streak || 0} 🔥</span>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>

      <h1 style={{ marginBottom: 8, color: theme.colors.text }}>🏆 Leaderboard</h1>
      <p style={{ color: theme.colors.textSecondary, marginBottom: 24, fontSize: 14 }}>
        Compete with other students! Complete quizzes, study flashcards, and maintain streaks to climb the ranks.
      </p>

      {/* Current User Position */}
      {currentUser && (
        <Alert
          message={
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>{getPodiumEmoji(currentUser.rank)}</span>
              <div>
                <strong>Your Position:</strong> Rank #{currentUser.rank} — Level {currentUser.current_level}
                <span style={{ marginLeft: 12, color: theme.colors.textSecondary }}>
                  {currentUser.total_xp?.toLocaleString()} XP • {currentUser.total_points?.toLocaleString()} points
                </span>
              </div>
            </div>
          }
          type="info"
          showIcon={false}
          style={{ marginBottom: 24, borderColor: theme.colors.primary + '40', background: theme.colors.primary + '10' }}
        />
      )}

      {/* Sort Tabs */}
      <Tabs
        activeKey={sort}
        onChange={(key) => { setSort(key); setPage(1); }}
        items={SORT_OPTIONS.map((opt) => ({
          key: opt.key,
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {opt.label}
            </div>
          ),
        }))}
        style={{ marginBottom: 8 }}
      />
      <p style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 24 }}>
        {currentSort?.description}
      </p>

      {/* Podium for top 3 */}
      {page === 1 && leaderboard.length >= 3 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          marginBottom: 32,
          alignItems: 'flex-end',
        }}>
          {/* 2nd place */}
          <Card
            size="small"
            style={{
              width: 140,
              background: theme.colors.surface,
              borderColor: '#c0c0c0',
              textAlign: 'center',
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 36 }}>🥈</div>
            <Avatar style={{ background: leaderboard[1].robot_color || '#6366f1', margin: '8px 0' }}>
              {leaderboard[1].name?.charAt(0) || '?'}
            </Avatar>
            <div style={{ fontWeight: 700, fontSize: 14, color: theme.colors.text }}>
              {leaderboard[1].name?.split(' ')[0] || 'Student'}
            </div>
            <Tag color={leaderboard[1].robot_color || '#6366f1'} style={{ marginTop: 4 }}>
              Lv. {leaderboard[1].current_level}
            </Tag>
            <div style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 }}>
              {leaderboard[1].total_xp?.toLocaleString()} XP
            </div>
          </Card>

          {/* 1st place - bigger */}
          <Card
            size="small"
            style={{
              width: 160,
              background: theme.colors.surface,
              borderColor: '#fbbf24',
              textAlign: 'center',
              borderRadius: 12,
              transform: 'translateY(-16px)',
              boxShadow: '0 4px 16px #fbbf2430',
            }}
          >
            <div style={{ fontSize: 48 }}>🥇</div>
            <Avatar size={48} style={{ background: leaderboard[0].robot_color || '#6366f1', margin: '8px 0', fontSize: 18 }}>
              {leaderboard[0].name?.charAt(0) || '?'}
            </Avatar>
            <div style={{ fontWeight: 700, fontSize: 16, color: theme.colors.text }}>
              {leaderboard[0].name?.split(' ')[0] || 'Student'}
            </div>
            <Tag color={leaderboard[0].robot_color || '#6366f1'} style={{ marginTop: 4, fontSize: 13 }}>
              Lv. {leaderboard[0].current_level}
            </Tag>
            <div style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 }}>
              {leaderboard[0].total_xp?.toLocaleString()} XP
            </div>
          </Card>

          {/* 3rd place */}
          <Card
            size="small"
            style={{
              width: 140,
              background: theme.colors.surface,
              borderColor: '#cd7f32',
              textAlign: 'center',
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 36 }}>🥉</div>
            <Avatar style={{ background: leaderboard[2].robot_color || '#6366f1', margin: '8px 0' }}>
              {leaderboard[2].name?.charAt(0) || '?'}
            </Avatar>
            <div style={{ fontWeight: 700, fontSize: 14, color: theme.colors.text }}>
              {leaderboard[2].name?.split(' ')[0] || 'Student'}
            </div>
            <Tag color={leaderboard[2].robot_color || '#6366f1'} style={{ marginTop: 4 }}>
              Lv. {leaderboard[2].current_level}
            </Tag>
            <div style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 }}>
              {leaderboard[2].total_xp?.toLocaleString()} XP
            </div>
          </Card>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <Card
        style={{
          background: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: 12,
        }}
      >
        <Table
          dataSource={leaderboard}
          columns={columns}
          rowKey="user_id"
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: 20,
            total,
            onChange: setPage,
            showSizeChanger: false,
            showTotal: (t) => `${t} students`,
          }}
          rowClassName={(record: any) => record.is_current_user ? 'leaderboard-highlight' : ''}
        />
      </Card>

      <style>{`
        .leaderboard-highlight td {
          background: ${theme.colors.primary}12 !important;
        }
      `}</style>
    </div>
  );
}
