"use client";

import { FC } from "react";

interface QuestionType {
  index: number;
  question: string;
  choice_answer: string[];
  reason: string;
  answer: number;
  id_question: string;
  onChange: (v: string, idQuestion: string) => void;
}

const Question: FC<QuestionType> = ({
  index,
  question,
  choice_answer,
  reason,
  onChange,
  id_question,
}) => {
  return (
    <div className="mt-2">
      <span>
        {index + 1}. {question}
      </span>
      <ul className="pl-4">
        {choice_answer.map((ans, indexAns) => (
          <li key={indexAns}>
            <input
              type="radio"
              id={ans}
              name={"jawaban" + index}
              value={indexAns}
              onChange={(e) => onChange(e.target.value, id_question)}
            />
            <label className="ml-2">{ans}</label>
          </li>
        ))}
      </ul>
      <div className="bg-blue-light p-4 rounded text-white mt-2">
        Alasan: {reason}
      </div>
    </div>
  );
};

export default Question;
