import React, { useState, FC, KeyboardEvent, useEffect } from "react";

interface TagsInputProps {
  tags: string[];
  selectedTags: (tags: string[]) => void;
}

const TagsInput: FC<TagsInputProps> = ({ tags: initialTags, selectedTags }) => {
  const [tags, setTags] = useState<string[]>(initialTags);

  useEffect(() => {
    setTags(initialTags);

    return () => {
      setTags([]);
    };
  }, [initialTags]);

  const removeTags = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    selectedTags(newTags);
  };

  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (event.key === "Enter" && input.value !== "") {
      const newTags = [...tags, input.value];
      setTags(newTags);
      selectedTags(newTags);
      input.value = "";
    }
  };

  return (
    <div className="flex flex-wrap items-start min-h-12 w-full p-2 border border-gray-card-border rounded-md ">
      <ul id="tags" className="flex flex-wrap p-0 mt-1">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="flex items-center justify-center bg-main-primary text-white py-2 px-2 text-sm list-none rounded-md m-1 gap-2"
          >
            <span className="">{tag}</span>
            <svg
              width="18"
              height="18"
              className="!fill-white stroke-transparent cursor-pointer"
              onClick={() => removeTags(index)}
            >
              <use href="/images/icons/panel.svg#close"></use>
            </svg>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={addTags}
        placeholder="کلمه جدید"
        className="flex-1 border-none h-12 text-sm p-0 focus:outline-none ms-3 placeholder:text-black/40"
      />
    </div>
  );
};

export default TagsInput;
