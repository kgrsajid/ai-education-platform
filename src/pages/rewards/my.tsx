import { Card, Row, Col, Tag, Button, Empty, QRCode } from "antd";
import { useGetMyRedemptionsQuery } from '../../features/api/progression';
import { useGradeBand } from '../../app/context/grade-band';
import { useNavigate } from 'react-router-dom';

export default function RewardsMyPage() {
  const { theme } = useGradeBand();
  const { data, isLoading } = useGetMyRedemptionsQuery();
  const navigate = useNavigate();

  const redemptions = data?.data?.redemptions ?? [];

  if (isLoading) {
    return <div style={{ padding: 24, textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.colors.text, margin: '0 0 24px' }}>
        🎟️ My Coupons
      </h1>

      {redemptions.length === 0 ? (
        <Empty
          description={
            <span style={{ color: theme.colors.textSecondary }}>
              You haven't redeemed any rewards yet.
            </span>
          }
        >
          <Button type="primary" onClick={() => navigate('/rewards')}>
            Browse Rewards
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {redemptions.map((redemption) => (
            <Col xs={24} sm={12} lg={8} key={redemption.id}>
              <Card
                style={{
                  background: theme.colors.surface,
                  borderColor: theme.colors.border,
                  opacity: redemption.is_used ? 0.6 : 1,
                }}
                title={
                  <span style={{ color: theme.colors.text }}>
                    {redemption.reward?.title ?? 'Reward'}
                  </span>
                }
                extra={
                  <Tag color={redemption.is_used ? 'default' : 'success'}>
                    {redemption.is_used ? 'Used' : 'Active'}
                  </Tag>
                }
              >
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  {redemption.coupon_code && (
                    <QRCode
                      value={redemption.coupon_code}
                      size={120}
                      bgColor={theme.colors.surface}
                      fgColor={theme.colors.text}
                    />
                  )}
                </div>
                <p style={{
                  fontFamily: 'monospace',
                  fontSize: 16,
                  fontWeight: 700,
                  textAlign: 'center',
                  color: theme.colors.primary,
                  margin: '8px 0',
                }}>
                  {redemption.coupon_code}
                </p>
                <p style={{ fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center', margin: 0 }}>
                  Redeemed for {theme.currencyIcon} {redemption.points_spent} •{' '}
                  {new Date(redemption.created_at).toLocaleDateString()}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
