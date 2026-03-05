import { Checkbox, Form, Input, Slider, Switch } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FC } from 'react';

type OptionItemProps = {
  questionIndex: number;
  oName: number;
  oIdx: number;
};

const OptionItem: FC<OptionItemProps> = ({ questionIndex, oName, oIdx }) => {
  const form = Form.useFormInstance();
  const isCorrect = Form.useWatch(
    ['questions', questionIndex, 'options', oIdx, 'isCorrect'],
    form,
  );

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
        isCorrect
          ? 'border-primary/50 bg-primary/10'
          : 'border-slate-700 bg-slate-800/50 focus-within:border-primary/50'
      }`}
    >
      <Form.Item
        name={[oName, 'isCorrect']}
        valuePropName="checked"
        className="!mb-0 shrink-0"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        name={[oName, 'optionText']}
        rules={[{ required: true, message: 'Option is required' }]}
        className="flex-1 !mb-0"
      >
        <Input
          placeholder={`Option ${oIdx + 1}`}
          variant="borderless"
          size="small"
          className="!p-0 !text-sm"
        />
      </Form.Item>
    </div>
  );
};

type Props = {
  name: number;
  index: number;
  onRemove: (name: number) => void;
  canRemove: boolean;
};

export const CreateQuestionCard: FC<Props> = ({
  name,
  index,
  onRemove,
  canRemove,
}) => {
  const form = Form.useFormInstance();
  const timeValue = Form.useWatch(['questions', name, 'time'], form) ?? 30;

  return (
    <div className="bg-[#1a2233] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Primary accent bar */}
      <div className="h-1 bg-primary" />

      <div className="p-8">
        {/* Header row */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 max-w-2xl">
            <div className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">
              Question {String(index + 1).padStart(2, '0')}
            </div>
            <Form.Item
              name={[name, 'question']}
              rules={[{ required: true, message: 'Question is required' }]}
              className="!mb-0"
            >
              <Input
                placeholder="Type your question here..."
                variant="borderless"
                className="!text-xl !font-medium !px-0"
                style={{
                  borderBottom: '1px solid #334155',
                  borderRadius: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              />
            </Form.Item>
          </div>

          <div className="flex gap-1 ml-4 mt-6">
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-800"
              title="Duplicate question"
            >
              <CopyOutlined />
            </button>
            {canRemove && (
              <button
                type="button"
                onClick={() => onRemove(name)}
                className="p-2 text-red-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                title="Delete question"
              >
                <DeleteOutlined />
              </button>
            )}
          </div>
        </div>

        {/* Options grid */}
        <Form.List name={[name, 'options']}>
          {(optionFields) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {optionFields.map(({ key, name: oName }, oIdx) => (
                <OptionItem
                  key={key}
                  questionIndex={index}
                  oName={oName}
                  oIdx={oIdx}
                />
              ))}
            </div>
          )}
        </Form.List>

        {/* Bottom settings bar */}
        <div className="flex flex-wrap gap-8 items-center border-t border-slate-800 pt-6">
          {/* Time Limit slider */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Time Limit
              </span>
              <span className="text-xs font-bold text-primary">{timeValue} sec</span>
            </div>
            <Form.Item name={[name, 'time']} noStyle>
              <Slider min={5} max={300} step={5} tooltip={{ open: false }} />
            </Form.Item>
          </div>

          {/* Multiple Choices toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Multiple Choices
            </span>
            <Switch size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};
