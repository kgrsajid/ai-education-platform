import { useEffect, useRef, useState } from "react";
import type { QuizCategory } from "../api/quiz-category/type";
import { Loader } from "lucide-react";
import { Button } from "antd";

type Props = {
  categoryData?: QuizCategory[];
  isLoading: boolean;
  visibleCount?: number;  
  setCategories: (value: number[]) => void;
};

export default function NavCategories({
  categoryData = [],
  isLoading,
  visibleCount = 5,
  setCategories
}: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeCategories, setActiveCategories] = useState<number[]>([]);

  const isActive =(id: number) => activeCategories.some(val => val == id);

  const handleClick = (id: number) => {
    if(isActive(id)) {
      setActiveCategories(activeCategories.filter(val => val != id));
    }else {
      setActiveCategories([...activeCategories, id]);
    }
  }

  useEffect(() => {
    setCategories(activeCategories);
  }, [activeCategories]);

  const GAP = 12; // gap-3 = 12px

  const scrollToEnd = () => {
    navRef.current?.scrollTo({
      left: navRef.current.scrollWidth,
      behavior: "smooth",
    });
  };

  if (isLoading) return <Loader className="animate-spin" />;

  return (
    <div className="flex items-center gap-2 w-full">
      <div
        ref={navRef}
        className="flex overflow-x-auto scrollbar-hide py-3 gap-3"
      >
        {categoryData.map((val) => (
          <button
            onClick={() => handleClick(val.id)}
            key={val.id}
            style={{
              width: `calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})`,
            }}
            className={`
              flex-shrink-0
              px-4 py-2
              rounded-full
              text-gray-700
              font-medium
              text-center
              shadow-md
              hover:bg-blue-500 hover:text-white
              transition-all
              ${
                isActive(val.id) ? "bg-blue-500 text-white" : "bg-white"
              }
            `}
          >
            {val.name}
          </button>
        ))}
      </div>

      {categoryData.length > visibleCount && (
        <Button
          type="primary"
          onClick={scrollToEnd}
          className="
            px-4
            py-3
            rounded-full
            shadow-md
          "
        >
          ➜
        </Button>
      )}
    </div>
  );
}
