import { Form, Input, Select, Switch } from 'antd';
import type { FC } from 'react';
import { TagsInput } from '../tags-input';

type Props = {
  categoryOptions?: { label: string; value: number }[];
  isCategoryLoading?: boolean;
};

export const CreateGeneralInfoSection: FC<Props> = ({
  categoryOptions,
  isCategoryLoading,
}) => {
  return (
    <section className="bg-[#1a2233] border border-slate-800 rounded-xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-primary">settings</span>
        <h2 className="text-white text-xl font-bold leading-tight">
          General Information
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Title + Description */}
        <div className="flex flex-col">
          <Form.Item
            name="title"
            label="Test Title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input
              size="large"
              placeholder="e.g. Advanced Quantum Physics Final"
            />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea
              rows={6}
              placeholder="Brief overview of what this test covers..."
              style={{ resize: 'none' }}
            />
          </Form.Item>
        </div>

        {/* Right column: Category, Difficulty, Tags, Private */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="categories"
              label="Category"
              rules={[{ required: true, message: 'Select at least one category' }]}
            >
              <Select
                mode="multiple"
                options={categoryOptions}
                loading={isCategoryLoading}
                placeholder="Select..."
                size="large"
              />
            </Form.Item>

            <Form.Item name="difficulty" label="Difficulty">
              <Select
                size="large"
                options={[
                  { label: 'Easy', value: 'easy' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Hard', value: 'hard' },
                ]}
              />
            </Form.Item>
          </div>

          <Form.Item name="tags" label="Tags" valuePropName="value">
            <TagsInput />
          </Form.Item>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-white font-semibold">Private Mode</span>
                <p className="text-xs text-slate-400">
                  Only people with the link can access this test.
                </p>
              </div>
              <Form.Item name="isPrivate" valuePropName="checked" className="!mb-0">
                <Switch />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
