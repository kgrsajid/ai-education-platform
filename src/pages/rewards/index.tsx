import { Card, Row, Col, Tag, Button, message } from "antd";
import { useGetRewardsQuery, useRedeemRewardMutation, useGetProgressionQuery } from '../../features/api/progression';
import { useGradeBand } from '../../app/context/grade-band';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/router/config';

export default function RewardsPage() {
  const { theme } = useGradeBand();
  const { data: rewardsData, isLoading } = useGetRewardsQuery();
  const { data: progressionData } = useGetProgressionQuery();
  const [redeem] = useRedeemRewardMutation();
  const navigate = useNavigate();

  const rewards = rewardsData?.data?.rewards ?? [];
  const availablePoints = progressionData?.data?.available_points ?? 0;

  const handleRedeem = async (rewardId: number, cost: number) => {
    if (availablePoints < cost) {
      message.error('Not enough points!');
      return;
    }
    try {
      await redeem(rewardId).unwrap();
      message.success('Reward redeemed! Check your coupons.');
      navigate(ROUTES.RewardsMy);
    } catch (err: any) {
      message.error(err?.data?.error ?? 'Failed to redeem');
    }
  };

  const categoryColors: Record<string, string> = {
    food: '#FF6B6B',
    retail: '#4ECDC4',
    entertainment: '#FFE66D',
    education: '#95E1D3',
    virtual: '#A78BFA',
  };

  if (isLoading) {
    return <div style={{ padding: 24, textAlign: 'center' }}>Loading rewards...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.colors.text, margin: 0 }}>
          🎁 Reward Shop
        </h1>
        <p style={{ color: theme.colors.textSecondary, margin: '8px 0 0' }}>
          Spend your {theme.currencyIcon} {availablePoints.toLocaleString()} {theme.currencyLabel} on rewards!
        </p>
      </div>

      {/* Rewards Grid */}
      {rewards.length === 0 ? (
        <Card style={{ background: theme.colors.surface, borderColor: theme.colors.border, textAlign: 'center', padding: 40 }}>
          <p style={{ color: theme.colors.textSecondary }}>
            No rewards available for your grade yet. Check back soon!
          </p>
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {rewards.map((reward) => {
            const canAfford = availablePoints >= reward.point_cost;
            const categoryColor = categoryColors[reward.category] ?? '#A78BFA';

            return (
              <Col xs={24} sm={12} lg={8} key={reward.id}>
                <Card
                  hoverable
                  style={{
                    background: theme.colors.surface,
                    borderColor: theme.colors.border,
                    opacity: canAfford ? 1 : 0.6,
                  }}
                  cover={
                    <div
                      style={{
                        height: 120,
                        background: `linear-gradient(135deg, ${categoryColor}33, ${categoryColor}11)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 48,
                      }}
                    >
                      {reward.category === 'food' && '🍕'}
                      {reward.category === 'retail' && '🛍️'}
                      {reward.category === 'entertainment' && '🎮'}
                      {reward.category === 'education' && '📚'}
                      {reward.category === 'virtual' && '✨'}
                    </div>
                  }
                >
                  <Card.Meta
                    title={
                      <div>
                        <span style={{ color: theme.colors.text }}>{reward.title}</span>
                        <Tag
                          style={{ marginLeft: 8 }}
                          color={categoryColor}
                        >
                          {reward.category}
                        </Tag>
                      </div>
                    }
                    description={
                      <p style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                        {reward.partner_name && `From: ${reward.partner_name}`}
                      </p>
                    }
                  />
                  <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.primary }}>
                      {theme.currencyIcon} {reward.point_cost.toLocaleString()}
                    </div>
                    <Button
                      type="primary"
                      disabled={!canAfford}
                      onClick={() => handleRedeem(reward.id, reward.point_cost)}
                    >
                      {canAfford ? 'Redeem' : 'Need more'}
                    </Button>
                  </div>
                  {reward.total_stock !== -1 && (
                    <p style={{ fontSize: 11, color: theme.colors.textSecondary, marginTop: 8 }}>
                      {reward.total_stock} remaining
                    </p>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* My Coupons Link */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Button type="link" onClick={() => navigate(ROUTES.RewardsMy)}>
          View my redeemed coupons →
        </Button>
      </div>
    </div>
  );
}
