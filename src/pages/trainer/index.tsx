import { useState, useEffect } from 'react';
import { Card, Row, Col, Progress, Button, Input, Modal, message, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetTrainerProfileQuery, useUpdateTrainerProfileMutation } from '../../features/api/trainer';

const ROBOT_SVGS: Record<string, string> = {
  beginner: new URL('../../assets/robots/beginner.svg', import.meta.url).href,
  thinker: new URL('../../assets/robots/thinker.svg', import.meta.url).href,
  'problem-solver': new URL('../../assets/robots/problem-solver.svg', import.meta.url).href,
  scientist: new URL('../../assets/robots/scientist.svg', import.meta.url).href,
  'ai-master': new URL('../../assets/robots/ai-master.svg', import.meta.url).href,
};

const STAGE_TO_SVG: Record<string, string> = {
  Beginner: 'beginner',
  Thinker: 'thinker',
  'Problem Solver': 'problem-solver',
  Scientist: 'scientist',
  'AI Master': 'ai-master',
};

const ACCENT_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
  '#f97316', '#eab308', '#22c55e', '#06b6d4',
];

// XP earning guide — chat links to /chat/new to start fresh session
const XP_ACTIVITIES = [
  { icon: '📝', label: 'Take a Quiz', xp: '+5-15 XP per quiz', path: '/quiz', color: '#3b82f6' },
  { icon: '🃏', label: 'Study Flashcards', xp: '+3-10 XP per session', path: '/cards', color: '#8b5cf6' },
  { icon: '💬', label: 'Chat with AI Tutor', xp: '+2 XP per message', path: '/chat/new', color: '#10b981' },
  { icon: '🔥', label: 'Daily Login Streak', xp: '+10 XP + streak bonus', path: null, color: '#f97316' },
];

const EVOLUTION_STAGES = [
  { level: 1, name: 'Beginner', xpRequired: 0, description: 'Your robot is just starting out!' },
  { level: 5, name: 'Thinker', xpRequired: 100, description: 'Learning to think analytically' },
  { level: 10, name: 'Problem Solver', xpRequired: 450, description: 'Solving complex problems' },
  { level: 15, name: 'Scientist', xpRequired: 1200, description: 'Scientific thinking mode' },
  { level: 20, name: 'AI Master', xpRequired: 2500, description: 'Full AI capabilities unlocked!' },
];

// Dark background surface colors (app uses #101622 bg)
const DARK_CARD_BG = '#1a2236';
const DARK_BORDER = '#2a3a5c';
const DARK_TEXT = '#e2e8f0';
const DARK_TEXT_SECONDARY = '#94a3b8';

export default function TrainerPage() {
  const { data, isLoading, refetch } = useGetTrainerProfileQuery();
  const [updateProfile, { isLoading: updating }] = useUpdateTrainerProfileMutation();
  const navigate = useNavigate();

  const [renameModal, setRenameModal] = useState(false);
  const [newName, setNewName] = useState('');

  const profile = data?.data;

  useEffect(() => {
    if (profile) {
      setNewName(profile.robot_name);
    }
  }, [profile]);

  const getRobotSvg = () => {
    if (!profile) return ROBOT_SVGS.beginner;
    const stageKey = STAGE_TO_SVG[profile.stage_name] || 'beginner';
    return ROBOT_SVGS[stageKey];
  };

  const handleRename = async () => {
    if (!newName.trim()) {
      message.warning('Please enter a name');
      return;
    }
    try {
      await updateProfile({ name: newName.trim() }).unwrap();
      message.success('Robot renamed!');
      setRenameModal(false);
      refetch();
    } catch {
      message.error('Failed to rename');
    }
  };

  const handleColorChange = async (color: string) => {
    try {
      await updateProfile({ color }).unwrap();
      message.success('Robot color updated!');
      refetch();
    } catch {
      message.error('Failed to update color');
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ color: DARK_TEXT_SECONDARY }}>Loading your AI Trainer...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ color: DARK_TEXT_SECONDARY }}>No trainer found. Try refreshing.</p>
      </div>
    );
  }

  const stats = profile.stats || {};
  const selectedColor = profile.robot_color || '#6366f1';
  const currentLevel = profile.current_level || 1;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>

      {/* ===== ROBOT DISPLAY ===== */}
      <Card
        styles={{ body: { padding: 24 } }}
        style={{
          background: DARK_CARD_BG,
          borderColor: selectedColor + '60',
          marginBottom: 24,
          textAlign: 'center',
          borderRadius: 16,
          boxShadow: `0 0 30px ${selectedColor}15`,
        }}
      >
        <img
          src={getRobotSvg()}
          alt={profile.stage_name}
          style={{
            width: 150,
            height: 150,
            filter: `drop-shadow(0 0 20px ${selectedColor}60)`,
          }}
        />
        <h2 style={{ marginTop: 12, marginBottom: 4, color: DARK_TEXT, fontSize: 22 }}>
          {profile.robot_name || 'AI Buddy'}
        </h2>
        <Tag color={selectedColor} style={{ fontSize: 14, padding: '4px 12px', marginTop: 4 }}>
          Level {currentLevel} — {profile.stage_name || 'Beginner'}
        </Tag>

        {/* XP Progress */}
        <div style={{ marginTop: 20, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          <Progress
            percent={Math.round(stats.progress_percent || 0)}
            strokeColor={selectedColor}
            trailColor="#2a3a5c"
            size="default"
            format={() => `${stats.current_level_xp || 0} / ${stats.next_level_xp || 100} XP`}
          />
          <p style={{ fontSize: 12, color: DARK_TEXT_SECONDARY, margin: '6px 0 0' }}>
            {Math.round(stats.next_level_xp - stats.current_level_xp)} XP until next level
          </p>
        </div>

        {/* Rename — subtle ghost button, not prominent */}
        <div style={{ marginTop: 16 }}>
          <Button
            type="text"
            size="small"
            onClick={() => setRenameModal(true)}
            style={{ color: DARK_TEXT_SECONDARY, fontSize: 12 }}
          >
            ✏️ Rename Robot
          </Button>
        </div>
      </Card>

      {/* ===== HOW TO LEVEL UP ===== */}
      <Card
        title={<span style={{ color: DARK_TEXT }}>⚡ How to Level Up</span>}
        styles={{ body: { padding: 16 } }}
        style={{
          background: DARK_CARD_BG,
          borderColor: DARK_BORDER,
          marginBottom: 24,
          borderRadius: 12,
        }}
      >
        <Row gutter={[12, 12]}>
          {XP_ACTIVITIES.map((activity) => {
            const isClickable = !!activity.path;
            return (
              <Col span={12} key={activity.label}>
                <Card
                  size="small"
                  hoverable={isClickable}
                  onClick={() => isClickable && navigate(activity.path!)}
                  styles={{ body: { padding: '12px 16px' } }}
                  style={{
                    background: isClickable ? '#1e293b' : '#151d30',
                    borderColor: activity.color + '30',
                    cursor: isClickable ? 'pointer' : 'default',
                    borderRadius: 8,
                    opacity: isClickable ? 1 : 0.6,
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 28, width: 36, textAlign: 'center' }}>{activity.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: DARK_TEXT, fontSize: 14 }}>
                        {activity.label}
                      </div>
                      <Tag
                        color={activity.color}
                        style={{ marginTop: 4, fontSize: 11, border: 'none' }}
                      >
                        {activity.xp}
                      </Tag>
                    </div>
                    {isClickable && (
                      <span style={{ marginLeft: 'auto', color: DARK_TEXT_SECONDARY, fontSize: 16 }}>→</span>
                    )}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
        <p style={{ fontSize: 12, color: DARK_TEXT_SECONDARY, margin: '12px 0 0', textAlign: 'center' }}>
          Tap an activity to start earning XP!
        </p>
      </Card>

      {/* ===== STATS ===== */}
      <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
        {[
          { icon: '⭐', label: 'Total XP', value: stats.total_xp?.toLocaleString() || 0 },
          { icon: '📝', label: 'Quizzes', value: stats.quizzes_completed || 0 },
          { icon: '🃏', label: 'Cards', value: stats.flashcards_studied || 0 },
          { icon: '📋', label: 'Assignments', value: stats.assignments_completed || 0 },
          { icon: '🔥', label: 'Streak', value: `${stats.current_streak || 0}d` },
          { icon: '🏆', label: 'Best', value: `${stats.longest_streak || 0}d` },
        ].map((stat) => (
          <Col span={8} key={stat.label}>
            <Card
              size="small"
              styles={{ body: { padding: '12px 8px' } }}
              style={{
                background: DARK_CARD_BG,
                borderColor: DARK_BORDER,
                textAlign: 'center',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 22 }}>{stat.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: selectedColor }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: DARK_TEXT_SECONDARY }}>{stat.label}</div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ===== EVOLUTION ROADMAP ===== */}
      <Card
        title={<span style={{ color: DARK_TEXT }}>📈 Evolution Roadmap</span>}
        styles={{ body: { padding: 16 } }}
        style={{
          background: DARK_CARD_BG,
          borderColor: DARK_BORDER,
          marginBottom: 24,
          borderRadius: 12,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {EVOLUTION_STAGES.map((stage) => {
            const isCompleted = currentLevel >= stage.level;
            const nextUncompleted = EVOLUTION_STAGES.find(s => s.level > currentLevel);
            const isCurrent = nextUncompleted ? stage.level === nextUncompleted.level : false;
            return (
              <div
                key={stage.level}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: isCurrent ? selectedColor + '18' : 'transparent',
                  border: isCurrent ? `1px solid ${selectedColor}50` : '1px solid transparent',
                }}
              >
                <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>
                  {isCompleted ? '✅' : isCurrent ? '▶️' : '⬜'}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: DARK_TEXT, fontSize: 14 }}>
                    Level {stage.level}: {stage.name}
                  </div>
                  <div style={{ fontSize: 12, color: DARK_TEXT_SECONDARY }}>
                    {stage.description}
                  </div>
                </div>
                <Tag
                  color={isCompleted ? 'green' : isCurrent ? 'blue' : 'default'}
                  style={{ minWidth: 70, textAlign: 'center' }}
                >
                  {stage.xpRequired} XP
                </Tag>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ===== COLOR PICKER ===== */}
      <Card
        title={<span style={{ color: DARK_TEXT }}>🎨 Robot Appearance</span>}
        styles={{ body: { padding: 16 } }}
        style={{
          background: DARK_CARD_BG,
          borderColor: DARK_BORDER,
          borderRadius: 12,
        }}
      >
        <p style={{ fontSize: 12, color: DARK_TEXT_SECONDARY, marginBottom: 12 }}>
          Choose your robot's accent color. Changes the glow and highlights.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {ACCENT_COLORS.map((color) => {
            const isSelected = selectedColor === color;
            return (
              <div
                key={color}
                onClick={() => handleColorChange(color)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: color,
                  cursor: 'pointer',
                  // Use colored ring instead of white border for dark bg
                  border: isSelected ? `3px solid ${color}` : '3px solid #2a3a5c',
                  boxShadow: isSelected ? `0 0 0 2px #1a2236, 0 0 16px ${color}80` : 'none',
                  transition: 'all 0.2s',
                  transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                }}
              />
            );
          })}
        </div>
        <p style={{ fontSize: 11, color: DARK_TEXT_SECONDARY, margin: '8px 0 0' }}>
          Selected: <span style={{ color: selectedColor }}>{selectedColor}</span>
        </p>
      </Card>

      {/* ===== RENAME MODAL ===== */}
      <Modal
        title={<span style={{ color: DARK_TEXT }}>Rename Your Robot</span>}
        open={renameModal}
        onOk={handleRename}
        onCancel={() => setRenameModal(false)}
        confirmLoading={updating}
        okButtonProps={{
          style: {
            background: selectedColor,
            borderColor: selectedColor,
          }
        }}
        styles={{
          content: { background: DARK_CARD_BG, borderColor: DARK_BORDER },
          header: { background: DARK_CARD_BG, borderBottom: `1px solid ${DARK_BORDER}` },
          body: { background: DARK_CARD_BG },
          footer: { background: DARK_CARD_BG, borderTop: `1px solid ${DARK_BORDER}` },
        } as any}
      >
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter a name for your robot"
          maxLength={30}
          showCount
          onPressEnter={handleRename}
          style={{
            background: '#151d30',
            borderColor: DARK_BORDER,
            color: DARK_TEXT,
          }}
        />
      </Modal>
    </div>
  );
}
