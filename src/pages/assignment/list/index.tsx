import { useState } from 'react';
import { Card, Button, Tag, Empty, Spin, message, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  SearchOutlined,
  ClipboardCheck,
  CheckCircle,
  ClockCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  useGetAssignmentsQuery,
  useGetMySubmissionsQuery,
  useGetStudentStatsQuery,
} from '../../../features/api/assignment';

const { TextArea } = Input;

export default function AssignmentsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [submitModal, setSubmitModal] = useState<{ open: boolean; assignmentId: string; question: string }>({
    open: false,
    assignmentId: '',
    question: '',
  });
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { data: assignments = [], isLoading } = useGetAssignmentsQuery({ grade: undefined, page: 1, limit: 50 });
  const { data: submissions = [] } = useGetMySubmissionsQuery({ page: 1, limit: 50 });
  const { data: stats } = useGetStudentStatsQuery();

  const submittedIds = new Set(submissions.map((s: any) => s.assignment_id));

  const filtered = assignments.filter((a: any) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!answer.trim()) {
      message.warning('Please write your answer');
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8082'}/assignment/${submitModal.assignmentId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answer: answer.trim() }),
      });
      message.success('Answer submitted! Your AI evaluation will appear shortly.');
      setSubmitModal({ open: false, assignmentId: '', question: '' });
      setAnswer('');
    } catch {
      message.error('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#22c55e';
    if (score >= 70) return '#3b82f6';
    if (score >= 50) return '#eab308';
    return '#ef4444';
  };

  const getSubmission = (assignmentId: number) =>
    submissions.find((s: any) => s.assignment_id === assignmentId);

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#f1f5f9' }}>
            📋 Assignments
          </h1>
          <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: 14 }}>
            Complete assignments to earn XP and climb the leaderboard
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {stats && (
            <div style={{
              display: 'flex', gap: 16, padding: '8px 16px',
              background: 'rgba(30,41,59,0.5)', borderRadius: 10, fontSize: 13,
            }}>
              <span style={{ color: '#94a3b8' }}>
                ✅ {stats.total_submitted} completed
              </span>
              <span style={{ color: '#eab308' }}>
                📊 Avg: {Math.round(stats.average_score || 0)}/100
              </span>
            </div>
          )}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/assignments/create')}
            style={{ background: '#1152d4', borderColor: '#1152d4', fontWeight: 600 }}
          >
            Create
          </Button>
        </div>
      </div>

      {/* Search */}
      <Input
        placeholder="Search assignments..."
        prefix={<SearchOutlined style={{ color: '#64748b' }} />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: 20,
          background: 'rgba(15,23,42,0.6)',
          borderColor: 'rgb(51,65,85)',
          color: '#e2e8f0',
        }}
        size="large"
        allowClear
      />

      {/* Assignment Cards */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <Spin size="large" />
        </div>
      ) : filtered.length === 0 ? (
        <Empty
          description="No assignments yet"
          style={{ padding: 60 }}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button
            type="primary"
            onClick={() => navigate('/assignments/create')}
            style={{ background: '#1152d4', borderColor: '#1152d4' }}
          >
            Create First Assignment
          </Button>
        </Empty>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((a: any) => {
            const submission = getSubmission(a.id);
            const isSubmitted = submittedIds.has(a.id);

            return (
              <Card
                key={a.id}
                hoverable
                onClick={() => navigate(`/assignments/${a.id}`)}
                style={{
                  background: 'rgba(15,23,42,0.5)',
                  borderColor: isSubmitted ? 'rgba(34,197,94,0.3)' : 'rgb(51,65,85)',
                  borderRadius: 12,
                  cursor: 'pointer',
                }}
                bodyStyle={{ padding: '16px 20px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      {isSubmitted ? (
                        <CheckCircle size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                      ) : (
                        <ClipboardCheck size={16} style={{ color: '#64748b', flexShrink: 0 }} />
                      )}
                      <span style={{ fontWeight: 600, fontSize: 15, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {a.title}
                      </span>
                    </div>
                    <p style={{
                      margin: 0, fontSize: 13, color: '#94a3b8',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      maxWidth: 600,
                    }}>
                      {a.question}
                    </p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      {a.subject && (
                        <Tag style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: 'none', borderRadius: 6, fontSize: 11 }}>
                          {a.subject}
                        </Tag>
                      )}
                      <Tag style={{ background: 'rgba(148,163,184,0.15)', color: '#94a3b8', border: 'none', borderRadius: 6, fontSize: 11 }}>
                        Grade {a.grade_min}-{a.grade_max}
                      </Tag>
                      <Tag style={{ background: 'rgba(148,163,184,0.1)', color: '#64748b', border: 'none', borderRadius: 6, fontSize: 11 }}>
                        by {a.teacher_name || 'Teacher'}
                      </Tag>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0, marginLeft: 16 }}>
                    {isSubmitted && submission?.is_evaluated ? (
                      <div style={{
                        padding: '6px 14px',
                        background: `${getScoreColor(submission.score)}20`,
                        border: `1px solid ${getScoreColor(submission.score)}40`,
                        borderRadius: 8,
                        textAlign: 'center',
                      }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: getScoreColor(submission.score) }}>
                          {submission.score}
                        </div>
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>/100</div>
                      </div>
                    ) : isSubmitted ? (
                      <div style={{
                        padding: '6px 14px',
                        background: 'rgba(234,179,8,0.15)',
                        border: '1px solid rgba(234,179,8,0.3)',
                        borderRadius: 8,
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 12, color: '#eab308',
                      }}>
                        <ClockCircle size={12} />
                        Evaluating...
                      </div>
                    ) : (
                      <Button
                        size="small"
                        type="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubmitModal({ open: true, assignmentId: String(a.id), question: a.question });
                        }}
                        style={{ background: '#1152d4', borderColor: '#1152d4', borderRadius: 8 }}
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Submit Modal */}
      <Modal
        title="📝 Submit Your Answer"
        open={submitModal.open}
        onCancel={() => { setSubmitModal({ open: false, assignmentId: '', question: '' }); setAnswer(''); }}
        onOk={handleSubmit}
        okText="Submit Answer"
        confirmLoading={submitting}
        okButtonProps={{ disabled: submitting || !answer.trim() }}
        width={600}
      >
        <div style={{ margin: '16px 0' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>
            QUESTION:
          </div>
          <div style={{
            padding: 12, background: 'rgba(15,23,42,0.6)', borderRadius: 8,
            color: '#e2e8f0', fontSize: 14, lineHeight: 1.6,
          }}>
            {submitModal.question}
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>
          YOUR ANSWER:
        </div>
        <TextArea
          rows={6}
          placeholder="Write your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{
            background: 'rgba(15,23,42,0.6)',
            borderColor: 'rgb(51,65,85)',
            color: '#e2e8f0',
            borderRadius: 8,
          }}
        />
        <p style={{ fontSize: 11, color: '#64748b', marginTop: 8 }}>
          Your answer will be evaluated by AI. Score: 0-100 points.
        </p>
      </Modal>
    </div>
  );
}
