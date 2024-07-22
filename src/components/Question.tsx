"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { EvaluasiClientTypes, UserResultTypes } from "../types/ClientTypes";
import Link from "next/link";

interface QuestionType {
  evaluasis: EvaluasiClientTypes[];
  onSubmitAnswer: (userAnswer: UserResultTypes[]) => void;
}

interface AnswerListType {
  id: string;
  name: string;
  value: number;
  answer: string;
  onChangeAnswerHandler: (e: any) => void;
}

const AnswerList: FC<AnswerListType> = ({
  id,
  name,
  value,
  answer,
  onChangeAnswerHandler,
}) => {
  function changeAnswerHandler(e: any) {
    onChangeAnswerHandler(e);
  }

  return (
    <li className="p-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={changeAnswerHandler}
      />
      <label className="ml-2">{answer}</label>
    </li>
  );
};

const Question: FC<QuestionType> = ({ evaluasis, onSubmitAnswer }) => {
  const [userAnswer, setUserAnswer] = useState<UserResultTypes[]>([]);

  function changeAnswerHandler(e: any) {
    const userAns = {
      id_evaluasi: e.target.name,
      user_answer: parseInt(e.target.value),
      correct: false,
      image: "test", //TODO
      id_user: "",
    };

    setUserAnswer((exArr) => [...exArr, userAns]);
  }

  function submitHandler() {
    userAnswer.map((ans) => {
      const evalObj = evaluasis.find((ev) => ev._id === ans.id_evaluasi);
      ans.correct = evalObj?.answer === ans.user_answer;
    });

    onSubmitAnswer(userAnswer);
  }

  return (
    <div className="max-w-[800px] border rounded-3xl border-gray p-6 mx-auto mt-4">
      {evaluasis.map((ev, index) => (
        <div key={ev._id}>
          <Link href={ev.image_question} target="_blank" className="flex">
            {index + 1}.
            <img src={ev.image_question} />
          </Link>
          <ul className="pl-4">
            {ev.choice_answer.map((e, i) => (
              <AnswerList
                key={e}
                id={e}
                name={ev._id}
                value={i}
                onChangeAnswerHandler={changeAnswerHandler}
                answer={e}
              />
            ))}
          </ul>
        </div>
      ))}
      <div className="mt-2 text-center">
        <Button loading={false} onClick={submitHandler} style="solid">
          Kirim Jawaban
        </Button>
      </div>
    </div>
  );
};

export default Question;
