"use client";

import { Button } from "@/app/_ui/Button";
import Image from "next/image";
import GetTanyaJawab from "@/app/_lib/GetTanyaJawab";
import GetUser from "@/app/_lib/GetUser";
import GetReply from "@/app/_lib/GetReply";
import {
  TanyaJawabClientTypes,
  UserClientTypes,
  ReplyTypes,
} from "@/app/_types/ClientTypes";
import { useEffect, useState } from "react";

interface ReplyType {
  _id: string;
  id_tanyajawab: string;
  id_user_reply: string;
  name_user_reply: string;
  reply: string;
}

interface TanyaJawabUpdatedType {
  _id: string;
  id_user_post: string;
  name_user_post: string;
  post: string;
  replies: ReplyType[];
}

export default function TanyaJawab() {
  const tanyajawabsFetch: TanyaJawabClientTypes[] = GetTanyaJawab();
  const usersFetch: UserClientTypes[] = GetUser();
  const repliesFetch: ReplyTypes[] = GetReply();

  const [tanyajawabs, setTanyaJawabs] = useState<TanyaJawabUpdatedType[]>([]);

  useEffect(() => {
    if (
      tanyajawabsFetch.length > 0 &&
      usersFetch.length > 0 &&
      repliesFetch.length > 0
    ) {
      const tanyaJawabsUpdated: TanyaJawabUpdatedType[] = tanyajawabsFetch.map(
        (tanyaJawab) => {
          const user = usersFetch.find(
            (u) => u._id === tanyaJawab.id_user_post
          );

          const userReplies: ReplyType[] = repliesFetch
            .filter((reply) => reply.id_tanyajawab === tanyaJawab._id)
            .map((rep) => {
              const user = usersFetch.find((u) => u._id === rep.id_user_reply);
              return { ...rep, name_user_reply: user!.username };
            });

          return {
            _id: tanyaJawab._id,
            id_user_post: tanyaJawab.id_user_post,
            name_user_post: user ? user.username : "",
            post: tanyaJawab.post,
            replies: userReplies ? userReplies : [],
          };
        }
      );
      setTanyaJawabs(tanyaJawabsUpdated);
    }
  }, [tanyajawabsFetch, usersFetch, repliesFetch]);

  if (tanyajawabs.length > 0) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-dark text-center">
          Tanya Jawab
        </h1>

        <div className="text-center flex mx-auto flex-col max-w-[500px] mt-4 gap-4">
          <textarea
            rows={4}
            cols={50}
            className="p-2 rounded border-2 border-gray"
            placeholder="tulis pertanyaanmu"
          />
          <div>
            <Button style="solid">Post</Button>
          </div>
        </div>
        {tanyajawabs.map((item) => (
          <div key={item._id}>
            <div className="">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 ">
                  <Image
                    src={"/icons/avatar.svg"}
                    width={36}
                    height={36}
                    alt="avatar"
                  />
                  <span className="font-bold text-blue-dark">
                    {item.name_user_post}
                  </span>
                </div>

                <span className="text-base">{item.post}</span>
                <hr className="my-2" />
                {item.replies.map((rep) => (
                  <div className="flex flex-row gap-2 my-4" key={rep._id}>
                    <Image
                      src={"/icons/avatar.svg"}
                      width={36}
                      height={36}
                      alt="avatar"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-blue-dark">
                        {rep.name_user_reply}
                      </span>
                      <span className="text-base">{rep.reply}</span>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-2 my-2">
                  <input
                    className="p-2 rounded border-2 border-gray"
                    type="text"
                    placeholder="tulis balasan"
                  />
                  <div className="self-end">
                    <Button style="solid">Reply</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
