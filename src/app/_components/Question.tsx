"use client";

import { FC, useState, useEffect } from "react";

interface QuestionType {
  index: number;
  question: string;
  choice_answer: string[];
  reason: string;
  answer: number;
  id_question: string;
  onChange: (v: string, idQuestion: string) => void;
  correction: boolean;
}

interface ReasonsType {
  reason: string;
  show: boolean;
}

interface AnswerListType {
  userAnswer: string;
  index: number;
  indexUserAnswer: number;
  onChangeAnswer: (v: string) => void;
  correct: boolean;
  correction: boolean;
}

const Reasons: FC<ReasonsType> = ({ reason, show }) => {
  if (show) {
    return (
      <div className="bg-blue-light p-4 rounded text-white mt-2">
        Alasan: {reason}
      </div>
    );
  }
};

const AnswerList: FC<AnswerListType> = ({
  userAnswer,
  index,
  indexUserAnswer,
  onChangeAnswer,
  correct,
  correction,
}) => {
  const changeAnswerHandler = (e: any) => {
    onChangeAnswer(e.target.value);
  };

  return (
    <li className="p-2" key={indexUserAnswer}>
      <input
        type="radio"
        id={userAnswer}
        name={"jawaban" + index}
        value={indexUserAnswer}
        onChange={changeAnswerHandler}
      />
      <label className="ml-2">{userAnswer}</label>
    </li>
  );
};

const Question: FC<QuestionType> = ({
  index,
  question,
  choice_answer,
  reason,
  onChange,
  id_question,
  correction,
  answer,
}) => {
  const [userAnswer, setUserAnswer] = useState<number>(0);

  const changeAnswerHandler = (v: string) => {
    onChange(v, id_question);

    setUserAnswer(parseInt(v));
  };

  useEffect(() => {
    if (correction) {
      console.log("aselole");
    }
  }, [correction]);

  return (
    <div className="mt-2">
      <span>
        {index + 1}. {question}
      </span>
      <ul className="pl-4">
        {choice_answer.map((userAns, indexUserAns) => (
          <AnswerList
            onChangeAnswer={changeAnswerHandler}
            indexUserAnswer={indexUserAns}
            index={index}
            userAnswer={userAns}
            correct={true}
            correction={correction}
          />
        ))}
      </ul>
      <Reasons reason={reason} show={correction} />
    </div>
  );
};

export default Question;
