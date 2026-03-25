import { useGetProgressionQuery } from '../../api/progression';
import { useGradeBand } from '../../../app/context/grade-band';
import './progress-hud.css';

export function ProgressHUD() {
  const { data, isLoading } = useGetProgressionQuery();
  const { theme } = useGradeBand();

  if (isLoading || !data?.data) {
    return (
      <div className="progress-hud" style={{ background: theme.colors.surface, borderColor: theme.colors.border }}>
        <div className="progress-hud-loading">Loading...</div>
      </div>
    );
  }

  const { available_points, current_level, level_name, currency_icon, currency_label, current_streak, progress_percent } = data.data;

  return (
    <div className="progress-hud" style={{ background: theme.colors.surface, borderColor: theme.colors.border }}>
      {/* Currency + Level */}
      <div className="progress-hud-left">
        <div className="progress-hud-currency" style={{ color: theme.colors.primary }}>
          <span className="progress-hud-icon">{currency_icon}</span>
          <span className="progress-hud-points">{available_points.toLocaleString()}</span>
          <span className="progress-hud-label">{currency_label}</span>
        </div>
        <div className="progress-hud-level" style={{ color: theme.colors.text }}>
          <span className="progress-hud-level-badge" style={{ background: theme.colors.primary }}>
            Lv.{current_level}
          </span>
          <span className="progress-hud-level-name">{level_name}</span>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="progress-hud-center">
        <div className="progress-hud-bar-container">
          <div
            className="progress-hud-bar-fill"
            style={{
              width: `${Math.min(progress_percent, 100)}%`,
              background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent})`,
            }}
          />
        </div>
        <span className="progress-hud-xp-text" style={{ color: theme.colors.textSecondary }}>
          {Math.round(progress_percent)}%
        </span>
      </div>

      {/* Streak */}
      {theme.showCompetition && (
        <div className="progress-hud-right">
          <div className="progress-hud-streak" style={{ color: current_streak > 0 ? '#F97316' : theme.colors.textSecondary }}>
            <span className="progress-hud-streak-icon">🔥</span>
            <span className="progress-hud-streak-count">{current_streak}</span>
            <span className="progress-hud-streak-label">day streak</span>
          </div>
        </div>
      )}
    </div>
  );
}
