"use client";

import { FC } from "react";
import { EvaluasiClientTypes, UserResultTypes } from "../_types/ClientTypes";
import { Button } from "../_ui/Button";

interface QuestionAnsweredType {
  evaluasis: EvaluasiClientTypes[];
  userResult: UserResultTypes[];
}

interface ReasonsType {
  reason: string;
}

interface AnswerListType {
  id: string;
  name: string;
  value: number;
  answer: string;
  correct: boolean;
  user_answer: number;
  real_answer: number;
}

const AnswerList: FC<AnswerListType> = ({
  id,
  name,
  value,
  answer,
  correct,
  user_answer,
  real_answer,
}) => {
  if (user_answer === value) {
    if (correct) {
      return (
        <li className={`p-2 mb-2 ${"bg-green"}`}>
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked
            disabled
          />
          <label className="ml-2">{answer}</label>
        </li>
      );
    } else if (!correct) {
      return (
        <li className={`p-2 mb-2 ${"bg-red"}`}>
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked
            disabled
          />
          <label className="ml-2">{answer}</label>
        </li>
      );
    }
  }

  if (!correct && real_answer === value) {
    return (
      <li className={`p-2 mb-2 ${"bg-green"}`}>
        <input type="radio" id={id} name={name} value={value} disabled />
        <label className="ml-2">{answer}</label>
      </li>
    );
  }

  return (
    <li className="p-2 mb-2">
      <input type="radio" id={id} name={name} value={value} disabled />
      <label className="ml-2">{answer}</label>
    </li>
  );
};

const Reasons: FC<ReasonsType> = ({ reason }) => {
  return (
    <div className="bg-blue-light p-4 rounded text-white mt-2">
      Alasan: {reason}
    </div>
  );
};

const QuestionAnswered: FC<QuestionAnsweredType> = ({
  evaluasis,
  userResult,
}) => {
  return (
    <div className="max-w-[800px] border rounded-3xl border-gray p-6 mx-auto mt-4">
      {evaluasis.map((ev, index) => (
        <div key={ev._id}>
          <span>
            {index + 1}. {ev.question}
          </span>
          <ul className="pl-4">
            {ev.choice_answer.map((e, i) => (
              <AnswerList
                key={e}
                id={e}
                name={ev._id}
                value={i || 0}
                answer={e}
                correct={userResult[index].correct}
                user_answer={userResult[index].user_answer}
                real_answer={ev.answer}
              />
            ))}
          </ul>
          <Reasons reason={ev.reason} />
        </div>
      ))}
      <div className="mt-2 text-center">
        <Button loading={false} style="solid" disabled>
          Jawaban Terkirim
        </Button>
      </div>
    </div>
  );
};

export default QuestionAnswered;
