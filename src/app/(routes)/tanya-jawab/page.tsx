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
import Modal from "@/app/_components/Modal";
import { useEdgeStore } from "@/app/_lib/edgestore";
import { CameraIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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
  createdAt: Date;
  replies: ReplyType[];
  image: string[];
  isReply: boolean;
}

type FileState = {
  file: File;
  key: string;
  progress: "PENDING" | "COMPLETE" | "ERROR" | number;
};

export default function TanyaJawab() {
  const router = useRouter();

  const tanyajawabsFetch: TanyaJawabClientTypes[] = GetTanyaJawab();
  const usersFetch: UserClientTypes[] = GetUser();
  const repliesFetch: ReplyTypes[] = GetReply();

  const { edgestore } = useEdgeStore();

  const [tanyajawabs, setTanyaJawabs] = useState<TanyaJawabUpdatedType[]>([]);

  const ctx = useContext(UserContext);
  const { status } = useSession();

  const [loading, setLoading] = useState<boolean>(true);

  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [modal, setModal] = useState({
    msg: "",
    success: false,
  });

  const [files, setFiles] = useState<FileState[]>([]);
  const [thumbImage, setThumbImage] = useState<string[]>([]);
  const [openRemove, setOpenRemove] = useState(false);
  const [inputTextPost, setInputTextPost] = useState("");
  const [inputTextReply, setInputTextReply] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (tanyajawabsFetch.length > 0 && usersFetch.length > 0) {
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
            createdAt: tanyaJawab.createdAt,
            image: tanyaJawab.image,
            replies: userReplies ? userReplies : [],
            isReply: false,
          };
        }
      );
      setTanyaJawabs(tanyaJawabsUpdated);
    }
  }, [tanyajawabsFetch, usersFetch, repliesFetch]);

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFiles((file) => {
      const newFileStates = structuredClone(file);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const postSubmitHandler = async (e: any) => {
    e.preventDefault();

    let urlImages: string[] = [];

    setLoadingBtn(true);

    const post = e.target["post"].value;

    if (status !== "authenticated") {
      window.location.href = "/login";
      return;
    }

    if (post.length >= 500) {
      setModal({
        msg: "tidak boleh lebih dari 500 character",
        success: false,
      });
      setModalIsOpen(true);
      return;
    }

    const uploadImage = files.map(async (addedFileState) => {
      try {
        const res = await edgestore.myPublicImages.upload({
          file: addedFileState.file,
          onProgressChange: async (progress) => {
            updateFileProgress(addedFileState.key, progress);
            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              updateFileProgress(addedFileState.key, "COMPLETE");
            }
          },
        });
        urlImages.push(res.url);
      } catch (err) {
        setLoadingBtn(false);
        updateFileProgress(addedFileState.key, "ERROR");
      }
    });

    Promise.all(uploadImage)
      .then(async () => {
        setLoadingBtn(false);

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
                image: urlImages,
              }),
            });

            if (res.status === 200) {
              window.location.reload();
            }
          } catch (e) {}
        }
      })
      .catch((error) => {
        console.error("Error during file uploads:", error);
      });
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

  const inputImageHandler = (e: any) => {
    if (e.target.files?.[0]) {
      if (e.target.files?.[0].size > 3000000) {
        setModal({
          msg: "Gambar tidak boleh lebih dari 3 MB",
          success: false,
        });
        setModalIsOpen(true);
        return;
      }

      if (files.length > 3) {
        setModal({
          msg: "Tidak boleh lebih dari 4 gambar",
          success: false,
        });
        setModalIsOpen(true);
        return;
      }
      const addedFiles = {
        file: e.target.files?.[0],
        key: Math.random().toString(36).slice(2),
        progress: "PENDING" as const,
      };
      setFiles([addedFiles, ...files]);
      const convertImage = URL.createObjectURL(e.target.files?.[0]);
      setThumbImage([convertImage, ...thumbImage]);
    }
  };

  const removeImgHandler = (i: number) => {
    const deletedFiles = files.filter((f, index) => i !== index);
    const deletedThumb = thumbImage.filter((t, index) => i !== index);
    setFiles(deletedFiles);
    setThumbImage(deletedThumb);
  };

  const replyShowHandler = (id: string) => {
    console.log("aselole");
    const updatedTanyaJawabs = tanyajawabs.map((tj) => {
      if (tj._id === id) {
        return { ...tj, isReply: true };
      }
      return { ...tj, isReply: false };
    });

    setTanyaJawabs(updatedTanyaJawabs);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto px-4 min-h-screen">
          <Modal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            message={modal.msg}
            success={modal.success}
          />
          <h1 className="text-3xl font-bold text-blue-dark text-center">
            Tanya Jawab
          </h1>
          <form onSubmit={postSubmitHandler}>
            <div className="flex mx-auto flex-col max-w-[500px] mt-4">
              <textarea
                rows={5}
                cols={50}
                name="post"
                className="p-2"
                placeholder="tulis pertanyaanmu"
                style={{ resize: "none" }}
                onChange={(e) => setInputTextPost(e.target.value)}
              />
              {thumbImage.length > 0 && (
                <div className="flex gap-2 my-2">
                  {thumbImage.map((thumb, i) => (
                    <div
                      key={i}
                      className="relative"
                      onMouseEnter={() => setOpenRemove(true)}
                      onMouseLeave={() => setOpenRemove(false)}
                    >
                      <img
                        className="w-36 h-20 object-cover"
                        src={thumb}
                        alt={`Thumbnail ${i + 1}`}
                      />

                      {typeof files[i].progress === "number" && (
                        <div className="h-[6px] w-full border rounded overflow-hidden mt-2">
                          <div
                            className="h-full bg-blue-dark transition-all duration-150"
                            style={{
                              width: `${files[i].progress}%`,
                            }}
                          ></div>
                        </div>
                      )}

                      <button
                        className={`absolute top-0 right-0 p-1 bg-white text-red-500 rounded-full ${
                          openRemove
                            ? "opacity-100 transition-opacity duration-300"
                            : "opacity-0"
                        }`}
                        onClick={() => removeImgHandler(i)}
                      >
                        <XCircleIcon className="h-8 w-8" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex">
                <img />
              </div>
              <div className="flex justify-between items-center">
                <div className="file-input">
                  <label htmlFor="file-upload" className="file-label">
                    <CameraIcon
                      className="h-6 w-6 text-gray"
                      onClick={inputImageHandler}
                    />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={inputImageHandler}
                  />
                </div>
                <Button
                  type="submit"
                  style="solid"
                  loading={loadingBtn}
                  disabled={loadingBtn || inputTextPost === ""}
                >
                  Post
                </Button>
              </div>
            </div>
          </form>

          {tanyajawabs.length > 0 && (
            <>
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
                      {item.image && (
                        <div className="flex flex-row gap-4 mt-2">
                          {item.image.map((src) => (
                            <Link href={src} target="_blank">
                              <img
                                src={src}
                                className="w-36 h-20 object-cover"
                              />
                            </Link>
                          ))}
                        </div>
                      )}

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

                      {!item.isReply && (
                        <div className="my-4">
                          <Button
                            loading={false}
                            style="solid"
                            onClick={() => replyShowHandler(item._id)}
                          >
                            Balas
                          </Button>
                        </div>
                      )}

                      {item.isReply && (
                        <form onSubmit={replySubmitHandler}>
                          <div className="flex flex-col gap-2 my-2">
                            <input
                              type="hidden"
                              name="id_post"
                              value={item._id}
                            />
                            <input
                              className="p-2 rounded border-2 border-gray"
                              type="text"
                              name="reply"
                              placeholder="tulis balasan"
                              onChange={(e) =>
                                setInputTextReply(e.target.value)
                              }
                            />
                            <div className="self-end">
                              <Button
                                type="submit"
                                loading={loadingBtn}
                                disabled={loadingBtn || inputTextReply === ""}
                                style="solid"
                              >
                                Kirim Balasan
                              </Button>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
