import { useState } from 'react';
import { Form, Input, Button, Select, Switch, message, InputNumber } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CreateAssignmentPayload } from '../../../features/api/assignment';

const { TextArea } = Input;

export default function AssignmentCreatePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload: CreateAssignmentPayload = {
        title: values.title,
        question: values.question,
        rubric: values.rubric || '',
        subject: values.subject || '',
        grade_min: values.grade_min ?? 0,
        grade_max: values.grade_max ?? 11,
        is_published: values.is_published ?? false,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8082'}/assignment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        message.error(data.message || 'Failed to create assignment');
        return;
      }

      message.success('Assignment created!');
      navigate('/assignments');
    } catch {
      message.error('Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  const subjectOptions = [
    { label: '🧮 Mathematics', value: 'Mathematics' },
    { label: '🔬 Biology', value: 'Biology' },
    { label: '⚗️ Chemistry', value: 'Chemistry' },
    { label: '🌍 Geography', value: 'Geography' },
    { label: '📜 History', value: 'History' },
    { label: '🇰🇿 Kazakh Language', value: 'Kazakh Language' },
    { label: '🇷🇺 Russian Language', value: 'Russian Language' },
    { label: '🇬🇧 English Language', value: 'English Language' },
    { label: '💻 Computer Science', value: 'Computer Science' },
    { label: '📐 Physics', value: 'Physics' },
    { label: '📚 Literature', value: 'Literature' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <Button
        type="text"
        icon={<ArrowLeft size={16} />}
        onClick={() => navigate('/assignments')}
        style={{ color: '#94a3b8', marginBottom: 16, padding: 0 }}
      >
        Back to Assignments
      </Button>

      <h1 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>
        ✏️ Create Assignment
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          grade_min: 0,
          grade_max: 11,
          is_published: true,
        }}
      >
        {/* Title */}
        <Form.Item
          name="title"
          label={<span style={{ color: '#cbd5e1', fontWeight: 500 }}>Title</span>}
          rules={[{ required: true, message: 'Title is required' }]}
        >
          <Input
            size="large"
            placeholder="e.g. Explain photosynthesis"
            style={{ background: 'rgba(15,23,42,0.6)', borderColor: 'rgb(51,65,85)', color: '#e2e8f0' }}
          />
        </Form.Item>

        {/* Subject */}
        <Form.Item
          name="subject"
          label={<span style={{ color: '#cbd5e1', fontWeight: 500 }}>Subject</span>}
        >
          <Select
            size="large"
            options={subjectOptions}
            placeholder="Select a subject"
            allowClear
            style={{ background: 'rgba(15,23,42,0.6)' }}
          />
        </Form.Item>

        {/* Grade Range */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Form.Item
            name="grade_min"
            label={<span style={{ color: '#cbd5e1', fontWeight: 500 }}>Min Grade</span>}
          >
            <InputNumber min={0} max={11} style={{ width: '100%', background: 'rgba(15,23,42,0.6)', borderColor: 'rgb(51,65,85)', color: '#e2e8f0' }} />
          </Form.Item>
          <Form.Item
            name="grade_max"
            label={<span style={{ color: '#cbd5e1', fontWeight: 500 }}>Max Grade</span>}
          >
            <InputNumber min={0} max={11} style={{ width: '100%', background: 'rgba(15,23,42,0.6)', borderColor: 'rgb(51,65,85)', color: '#e2e8f0' }} />
          </Form.Item>
        </div>

        {/* Question */}
        <Form.Item
          name="question"
          label={<span style={{ color: '#cbd5e1', fontWeight: 500 }}>Question</span>}
          rules={[{ required: true, message: 'Question is required' }]}
        >
          <TextArea
            rows={5}
            placeholder="Write the assignment question here. Be specific about what you expect students to answer."
            style={{ background: 'rgba(15,23,42,0.6)', borderColor: 'rgb(51,65,85)', color: '#e2e8f0', resize: 'vertical' }}
          />
        </Form.Item>

        {/* Rubric */}
        <Form.Item
          name="rubric"
          label={<span style={{ color: '#cbd5e1', fontWeight: 500 }}>Evaluation Criteria (optional)</span>}
          extra={<span style={{ color: '#64748b', fontSize: 12 }}>Guidelines for AI to evaluate student answers</span>}
        >
          <TextArea
            rows={3}
            placeholder="e.g. Answer must include 3 key concepts, proper examples, and conclusion"
            style={{ background: 'rgba(15,23,42,0.6)', borderColor: 'rgb(51,65,85)', color: '#e2e8f0', resize: 'vertical' }}
          />
        </Form.Item>

        {/* Publish Toggle */}
        <div style={{
          padding: '16px 20px', background: 'rgba(59,130,246,0.05)',
          border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 24,
        }}>
          <div>
            <div style={{ fontWeight: 600, color: '#f1f5f9' }}>Publish Immediately</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>Students will see this assignment right away</div>
          </div>
          <Form.Item name="is_published" valuePropName="checked" style={{ margin: 0 }}>
            <Switch />
          </Form.Item>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button
            size="large"
            onClick={() => navigate('/assignments')}
            style={{ background: 'transparent', borderColor: 'rgb(51,65,85)', color: '#94a3b8' }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            style={{ background: '#1152d4', borderColor: '#1152d4', fontWeight: 600, paddingInline: 32 }}
          >
            Create Assignment
          </Button>
        </div>
      </Form>
    </div>
  );
}
