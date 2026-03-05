import { Input, Tag, Space } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type TagsInputProps = {
  value?: string[];
  onChange?: (tags: string[]) => void;
};

export const TagsInput = ({ value = [], onChange }: TagsInputProps) => {
  const [tags, setTags] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState("");
  const {t} = useTranslation();
  useEffect(() => {
    setTags(value);
  }, [value]);

  const addTag = () => {
    const val = inputValue.trim();
    if (val && !tags.includes(val)) {
      const newTags = [...tags, val];
      setTags(newTags);
      onChange?.(newTags);
    }
    setInputValue("");
  };

  const removeTag = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
    onChange?.(newTags);
  };

  return (
    <div>
      <Space wrap>
        {tags.map((tag) => (
          <Tag key={tag} closable onClose={() => removeTag(tag)} color="blue">
            {tag}
          </Tag>
        ))}
      </Space>
      <Input
        placeholder={t("quiz.phrases.createPage.form.tags.placeholder")}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={addTag}
        className=" rounded-lg"
      />
    </div>
  );
};
