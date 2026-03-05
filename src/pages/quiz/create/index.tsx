import { Breadcrumb, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  useCreateQuizMutation,
  useGetQuizByIdQuery,
  useGetQuizCategoryQuery,
  useUpdateQuizMutation,
} from '../../../features/query/quiz';
import { useEffect, useMemo, type FC } from 'react';
import type {
  QuizCreatePayload,
  TOption,
  TQuestion,
} from '../../../features/api/quiz/type';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { QuizCategory } from '../../../features/api/quiz-category/type';
import { CreateGeneralInfoSection } from '../../../features/quiz/create-general-info';
import { CreateQuestionCard } from '../../../features/quiz/create-question-card';

type Props = {
  isEdit?: boolean;
};

const DEFAULT_QUESTION = {
  question: '',
  time: 30,
  options: [
    { optionText: '', isCorrect: false },
    { optionText: '', isCorrect: false },
    { optionText: '', isCorrect: false },
    { optionText: '', isCorrect: false },
  ],
};

export const QuizCreatePage: FC<Props> = ({ isEdit = false }) => {
  const [form] = Form.useForm<QuizCreatePayload>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

  const quizId = state?.quizId;

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetQuizCategoryQuery();

  const { data: quiz, isLoading: isQuizLoading } =
    useGetQuizByIdQuery(quizId);

  const createQuizMutation = useCreateQuizMutation();
  const updateQuizMutation = useUpdateQuizMutation();

  const categoryOptions = useMemo(
    () => categoryData?.map((c) => ({ label: c.name, value: c.id })),
    [categoryData],
  );

  useEffect(() => {
    if (!quiz || !isEdit) return;
    form.setFieldsValue({
      title: quiz.title,
      description: quiz.description,
      difficulty: quiz.difficulty,
      isPrivate: quiz.isPrivate,
      tags: quiz.tags ?? [],
      categories: quiz.categories?.map((c: QuizCategory) => c.id) ?? [],
      questions: quiz.questions.map((q: TQuestion) => ({
        question: q.question,
        options: q.options.map((o: TOption) => ({
          optionText: o.optionText,
          isCorrect: o.isCorrect,
        })),
      })),
    });
  }, [quiz, isEdit, form]);

  const onFinish = (values: QuizCreatePayload) => {
    if (isEdit) {
      updateQuizMutation.mutate({ quizId, quiz: values });
      navigate(`/quiz/${quizId}`);
    } else {
      createQuizMutation.mutate(values);
      navigate('/quiz');
    }
  };

  if (isEdit && isQuizLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-40 py-8 max-w-[1280px] mx-auto w-full">
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-4"
        items={[
          {
            title: (
              <Link to="/quiz" className="hover:text-primary transition-colors">
                Tests
              </Link>
            ),
          },
          { title: isEdit ? 'Edit Test' : 'Create New' },
        ]}
      />

      {/* Page header */}
      <div className="flex flex-wrap justify-between items-center gap-6 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-white text-4xl font-black leading-tight tracking-tight">
            {isEdit ? t('quiz.phrases.editPage.title') : 'Create New Test'}
          </h1>
          <p className="text-slate-400 text-base font-normal">
            Design your assessment with AI-enhanced tools.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => form.submit()}
            className="px-6 py-2.5 rounded-lg border border-slate-700 font-semibold text-slate-200 hover:bg-slate-800 transition-all"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => form.submit()}
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
          >
            {isEdit ? t('quiz.phrases.editPage.editText') : 'Publish Test'}
          </button>
        </div>
      </div>

      <Form<QuizCreatePayload>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        initialValues={
          isEdit
            ? undefined
            : {
                difficulty: 'easy',
                isPrivate: false,
                questions: [DEFAULT_QUESTION],
              }
        }
      >
        {/* General Information section */}
        <CreateGeneralInfoSection
          categoryOptions={categoryOptions}
          isCategoryLoading={isCategoryLoading}
        />

        {/* Questions section */}
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {/* Section header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    quiz
                  </span>
                  <h2 className="text-white text-xl font-bold leading-tight">
                    Questions
                  </h2>
                  <span className="bg-primary/20 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                    {fields.length}{' '}
                    {fields.length === 1 ? 'Question' : 'Questions'} Added
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => add(DEFAULT_QUESTION)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-all"
                >
                  <PlusOutlined />
                  Add Question
                </button>
              </div>

              {/* Question cards */}
              <div className="space-y-6">
                {fields.map(({ key, name }, idx) => (
                  <CreateQuestionCard
                    key={key}
                    name={name}
                    index={idx}
                    onRemove={remove}
                    canRemove={fields.length > 1}
                  />
                ))}
              </div>

              {/* Add another question dashed button */}
              <button
                type="button"
                onClick={() => add(DEFAULT_QUESTION)}
                className="w-full mt-6 py-12 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="size-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-all">
                  <span className="material-symbols-outlined text-2xl">
                    add_circle
                  </span>
                </div>
                <span className="font-bold">Add another question</span>
              </button>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};
