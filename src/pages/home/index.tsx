import { Card, Row, Col, Progress, Button, message } from "antd";
import { useGetProgressionQuery, useClaimDailyBonusMutation } from '../../features/api/progression';
import { useGradeBand } from '../../app/context/grade-band';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { data, isLoading, refetch } = useGetProgressionQuery();
  const [claimBonus, { isLoading: claiming }] = useClaimDailyBonusMutation();
  const { theme, grade } = useGradeBand();
  const navigate = useNavigate();

  const progression = data?.data;

  const handleClaimBonus = async () => {
    try {
      const res = await claimBonus().unwrap();
      message.success(`Daily bonus claimed! +${res.data.points_earned} points, +${res.data.xp_earned} XP`);
      refetch();
    } catch (err: any) {
      message.error(err?.data?.error ?? 'Failed to claim bonus');
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ color: theme.colors.textSecondary }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          borderRadius: 16,
          padding: 24,
          color: 'white',
          marginBottom: 24,
        }}
      >
        <h1 style={{ color: 'white', margin: 0, fontSize: 24 }}>
          {theme.name} — Grade {grade}
        </h1>
        <p style={{ margin: '8px 0 0', opacity: 0.9 }}>
          Welcome back! Keep learning to level up your robot and unlock rewards.
        </p>
      </div>

      {/* Daily Bonus Claim */}
      <Card
        size="small"
        style={{ background: theme.colors.surface, borderColor: theme.colors.border, marginBottom: 24 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: theme.colors.text }}>
              🎁 Claim Daily Bonus
            </div>
            <div style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 }}>
              +{theme.currencyIcon} 5 points + 10 XP (streak bonus at 7/14/30 days!)
            </div>
          </div>
          <Button
            type="primary"
            size="large"
            loading={claiming}
            onClick={handleClaimBonus}
            style={{ background: theme.colors.primary, borderColor: theme.colors.primary }}
          >
            Claim Bonus
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card size="small" style={{ background: theme.colors.surface, borderColor: theme.colors.border }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32 }}>{theme.currencyIcon}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: theme.colors.primary }}>
                {progression?.available_points?.toLocaleString() ?? 0}
              </div>
              <div style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                {progression?.currency_label ?? 'Points'}
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" style={{ background: theme.colors.surface, borderColor: theme.colors.border }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32 }}>🎯</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: theme.colors.primary }}>
                Level {progression?.current_level ?? 1}
              </div>
              <div style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                {progression?.level_name ?? 'Beginner'}
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" style={{ background: theme.colors.surface, borderColor: theme.colors.border }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32 }}>🔥</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#F97316' }}>
                {progression?.current_streak ?? 0}
              </div>
              <div style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                Day Streak
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* XP Progress */}
      <Card
        title="XP Progress"
        size="small"
        style={{ background: theme.colors.surface, borderColor: theme.colors.border, marginBottom: 24 }}
      >
        <Progress
          percent={Math.round(progression?.progress_percent ?? 0)}
          strokeColor={theme.colors.primary}
          trailColor={theme.colors.border}
          format={(p) => `${p}%`}
        />
        <p style={{ fontSize: 12, color: theme.colors.textSecondary, margin: '8px 0 0' }}>
          {progression?.total_xp ?? 0} XP total • {progression?.next_level_xp ?? 100} XP to next level
        </p>
      </Card>

      {/* Quick Actions */}
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="📝 Take a Quiz"
            size="small"
            hoverable
            style={{ background: theme.colors.surface, borderColor: theme.colors.border }}
            onClick={() => navigate('/quiz')}
          >
            <p style={{ fontSize: 13, color: theme.colors.textSecondary, margin: 0 }}>
              Test your knowledge and earn points!
            </p>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="🃏 Study Flashcards"
            size="small"
            hoverable
            style={{ background: theme.colors.surface, borderColor: theme.colors.border }}
            onClick={() => navigate('/cards')}
          >
            <p style={{ fontSize: 13, color: theme.colors.textSecondary, margin: 0 }}>
              Learn with spaced repetition flashcards.
            </p>
          </Card>
        </Col>
      </Row>

      {/* Grade Info */}
      <Card
        title="ℹ️ Your Grade"
        size="small"
        style={{ background: theme.colors.surface, borderColor: theme.colors.border, marginTop: 24 }}
      >
        <p style={{ margin: 0, color: theme.colors.textSecondary, fontSize: 13 }}>
          You are viewing content for Grade {grade} ({theme.name}). Content is filtered to match your level.
          {grade >= 10 && " You're preparing for UNT exams!"}
        </p>
      </Card>
    </div>
  );
}
