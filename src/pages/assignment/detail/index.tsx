import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Tag, Button, Spin, message, Input, Modal } from 'antd';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useGetAssignmentByIdQuery, useGetMySubmissionsQuery } from '../../../features/api/assignment';

const { TextArea } = Input;

export default function AssignmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: assignment, isLoading } = useGetAssignmentByIdQuery(id!);
  const { data: submissions = [] } = useGetMySubmissionsQuery({});
  const [submitModal, setSubmitModal] = useState(false);
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submission = submissions.find((s: any) => s.assignment_id === Number(id));

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8082'}/assignment/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answer: answer.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        message.error(data.message || 'Failed to submit');
        return;
      }
      message.success('Answer submitted successfully!');
      setSubmitModal(false);
      setAnswer('');
      // Refetch
      window.location.reload();
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

  if (isLoading) return <div style={{ textAlign: 'center', padding: 60 }}><Spin size="large" /></div>;
  if (!assignment) return <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Assignment not found</div>;

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      {/* Back */}
      <Button
        type="text"
        icon={<ArrowLeft size={16} />}
        onClick={() => navigate('/assignments')}
        style={{ color: '#94a3b8', marginBottom: 16, padding: 0 }}
      >
        Back to Assignments
      </Button>

      {/* Assignment Card */}
      <Card
        style={{
          background: 'rgba(15,23,42,0.5)',
          borderColor: 'rgb(51,65,85)',
          borderRadius: 12,
        }}
        bodyStyle={{ padding: 24 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>
              {assignment.title}
            </h1>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {assignment.subject && (
                <Tag style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: 'none', borderRadius: 6 }}>
                  {assignment.subject}
                </Tag>
              )}
              <Tag style={{ background: 'rgba(148,163,184,0.15)', color: '#94a3b8', border: 'none', borderRadius: 6 }}>
                Grade {assignment.grade_min}-{assignment.grade_max}
              </Tag>
              <Tag style={{ background: 'rgba(148,163,184,0.1)', color: '#64748b', border: 'none', borderRadius: 6 }}>
                by {assignment.teacher_name}
              </Tag>
            </div>
          </div>
        </div>

        {/* Question */}
        <div style={{
          padding: 16, background: 'rgba(30,41,59,0.5)', borderRadius: 10,
          marginBottom: 16, borderLeft: '3px solid #1152d4',
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Question
          </div>
          <div style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {assignment.question}
          </div>
        </div>

        {/* Rubric */}
        {assignment.rubric && (
          <div style={{
            padding: 16, background: 'rgba(234,179,8,0.05)', borderRadius: 10,
            marginBottom: 16, borderLeft: '3px solid #eab308',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              Evaluation Criteria
            </div>
            <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {assignment.rubric}
            </div>
          </div>
        )}

        {/* Submit button */}
        {!submission && (
          <Button
            type="primary"
            size="large"
            block
            onClick={() => setSubmitModal(true)}
            style={{ background: '#1152d4', borderColor: '#1152d4', fontWeight: 600, height: 48, borderRadius: 10 }}
          >
            ✍️ Submit Your Answer
          </Button>
        )}
      </Card>

      {/* Submission Result */}
      {submission && (
        <Card
          style={{
            marginTop: 16,
            background: 'rgba(15,23,42,0.5)',
            borderColor: submission.is_evaluated ? 'rgba(34,197,94,0.3)' : 'rgba(234,179,8,0.3)',
            borderRadius: 12,
          }}
          bodyStyle={{ padding: 24 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            {submission.is_evaluated ? (
              <CheckCircle size={20} style={{ color: '#22c55e' }} />
            ) : (
              <Clock size={20} style={{ color: '#eab308' }} />
            )}
            <span style={{ fontWeight: 600, color: '#f1f5f9', fontSize: 16 }}>
              {submission.is_evaluated ? 'Your Evaluation' : 'Submitted — Awaiting Evaluation'}
            </span>
          </div>

          {submission.is_evaluated && (
            <>
              {/* Score */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'baseline', gap: 4,
                  padding: '12px 24px',
                  background: `${getScoreColor(submission.score)}15`,
                  borderRadius: 12,
                }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: getScoreColor(submission.score) }}>
                    {submission.score}
                  </span>
                  <span style={{ fontSize: 16, color: '#64748b' }}>/100</span>
                </div>
              </div>

              {/* Feedback */}
              {submission.feedback && (
                <div style={{
                  padding: 16, background: 'rgba(30,41,59,0.5)', borderRadius: 10,
                  marginBottom: 12,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>FEEDBACK</div>
                  <p style={{ margin: 0, color: '#e2e8f0', lineHeight: 1.6 }}>{submission.feedback}</p>
                </div>
              )}

              {/* Strengths */}
              {submission.strengths?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', marginBottom: 8 }}>✅ STRENGTHS</div>
                  {submission.strengths.map((s: string, i: number) => (
                    <div key={i} style={{ color: '#cbd5e1', fontSize: 13, padding: '2px 0' }}>• {s}</div>
                  ))}
                </div>
              )}

              {/* Improvements */}
              {submission.improvements?.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', marginBottom: 8 }}>📈 IMPROVEMENTS</div>
                  {submission.improvements.map((s: string, i: number) => (
                    <div key={i} style={{ color: '#cbd5e1', fontSize: 13, padding: '2px 0' }}>• {s}</div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Student's answer */}
          <div style={{ marginTop: 16, padding: 16, background: 'rgba(30,41,59,0.3)', borderRadius: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>YOUR ANSWER</div>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {submission.answer}
            </p>
          </div>
        </Card>
      )}

      {/* Submit Modal */}
      <Modal
        title="📝 Submit Your Answer"
        open={submitModal}
        onCancel={() => { setSubmitModal(false); setAnswer(''); }}
        onOk={handleSubmit}
        okText="Submit Answer"
        confirmLoading={submitting}
        okButtonProps={{ disabled: submitting || !answer.trim() }}
        width={600}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>
          YOUR ANSWER:
        </div>
        <TextArea
          rows={8}
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
          Your answer will be evaluated by AI. You can only submit once per assignment.
        </p>
      </Modal>
    </div>
  );
}
