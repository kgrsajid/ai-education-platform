import { Form, Input, Select, Switch } from 'antd';
import type { FC } from 'react';
import { TagsInput } from '../tags-input';
import { useTranslation } from 'react-i18next';

type Props = {
  categoryOptions?: { label: string; value: number }[];
  isCategoryLoading?: boolean;
};

export const CreateGeneralInfoSection: FC<Props> = ({
  categoryOptions,
  isCategoryLoading,
}) => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#1a2233] border border-slate-800 rounded-xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-primary">settings</span>
        <h2 className="text-white text-xl font-bold leading-tight">
          {t('quizDetail.generalInfo')}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Title + Description */}
        <div className="flex flex-col">
          <Form.Item
            name="title"
            label={t('quizDetail.testTitle')}
            rules={[{ required: true, message: t('quizDetail.titleRequired') }]}
          >
            <Input
              size="large"
              placeholder={t('quizDetail.titlePlaceholder')}
            />
          </Form.Item>

          <Form.Item name="description" label={t('quizDetail.description')}>
            <Input.TextArea
              rows={6}
              placeholder={t('quizDetail.descriptionPlaceholder')}
              style={{ resize: 'none' }}
            />
          </Form.Item>
        </div>

        {/* Right column: Category, Difficulty, Tags, Private */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="categories"
              label={t('quizDetail.category')}
              rules={[{ required: true, message: t('quizDetail.categoryRequired') }]}
            >
              <Select
                mode="multiple"
                options={categoryOptions}
                loading={isCategoryLoading}
                placeholder={t('quizDetail.selectCategory')}
                size="large"
              />
            </Form.Item>

            <Form.Item name="difficulty" label={t('quizDetail.difficulty')}>
              <Select
                size="large"
                options={[
                  { label: t('quiz.words.diff.easy'), value: 'easy' },
                  { label: t('quiz.words.diff.medium'), value: 'medium' },
                  { label: t('quiz.words.diff.hard'), value: 'hard' },
                ]}
              />
            </Form.Item>
          </div>

          <Form.Item name="tags" label={t('quizDetail.tags')} valuePropName="value">
            <TagsInput />
          </Form.Item>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-white font-semibold">{t('quizDetail.privateMode')}</span>
                <p className="text-xs text-slate-400">
                  {t('quizDetail.privateModeDesc')}
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
