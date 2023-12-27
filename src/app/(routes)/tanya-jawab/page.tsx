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
import { useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import UserContext from "@/app/_context/UserContext";
import Loading from "@/app/_components/Loading";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const tanyajawabsFetch: TanyaJawabClientTypes[] = GetTanyaJawab();
  const usersFetch: UserClientTypes[] = GetUser();
  const repliesFetch: ReplyTypes[] = GetReply();

  const [tanyajawabs, setTanyaJawabs] = useState<TanyaJawabUpdatedType[]>([]);

  const ctx = useContext(UserContext);
  const { status } = useSession();

  const [loading, setLoading] = useState<boolean>(true);

  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  const postSubmitHandler = async (e: any) => {
    e.preventDefault();

    const post = e.target["post"].value;

    if (status !== "authenticated") {
      window.location.href = "/login";
      return;
    }

    const user = usersFetch.find((u) => u.username === ctx?.username);

    if (user && post !== "") {
      try {
        const res = await fetch("/api/tanyajawab", {
          method: "POST",
          headers: {
            "Content-type": "application-json",
          },
          body: JSON.stringify({
            id_user_post: user._id,
            post,
          }),
        });

        setLoadingBtn(true);

        if (res.status === 200) {
          window.location.reload();
        }

        setLoading(false);
      } catch (e) {}
    }
  };

  const replySubmitHandler = async (e: any) => {
    e.preventDefault();

    const reply = e.target["reply"].value;
    const id_post = e.target["id_post"].value;

    if (status !== "authenticated") {
      window.location.href = "/login";
      return;
    }

    const user = usersFetch.find((u) => u.username === ctx?.username);

    if (user && reply !== "") {
      try {
        const res = await fetch("/api/reply", {
          method: "POST",
          headers: {
            "Content-type": "application-json",
          },
          body: JSON.stringify({
            id_tanyajawab: id_post,
            id_user_reply: user._id,
            reply,
          }),
        });

        setLoadingBtn(true);

        if (res.status === 200) {
          window.location.reload();
        }

        setLoading(false);
      } catch (e) {}
    }
  };

  if (tanyajawabs.length > 0) {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-blue-dark text-center">
              Tanya Jawab
            </h1>
            <form onSubmit={postSubmitHandler}>
              <div className="text-center flex mx-auto flex-col max-w-[500px] mt-4 gap-4">
                <textarea
                  rows={4}
                  cols={50}
                  name="post"
                  className="p-2 rounded border-2 border-gray"
                  placeholder="tulis pertanyaanmu"
                />
                <div>
                  <Button type="submit" style="solid" loading={loadingBtn}>
                    Post
                  </Button>
                </div>
              </div>
            </form>
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

                    <form onSubmit={replySubmitHandler}>
                      <div className="flex flex-col gap-2 my-2">
                        <input type="hidden" name="id_post" value={item._id} />
                        <input
                          className="p-2 rounded border-2 border-gray"
                          type="text"
                          name="reply"
                          placeholder="tulis balasan"
                        />
                        <div className="self-end">
                          <Button
                            type="submit"
                            loading={loadingBtn}
                            style="solid"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
}
