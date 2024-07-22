"use client";

import { Button } from "@/ui/Button";
import Image from "next/image";
import GetTanyaJawab from "@/lib/GetTanyaJawab";
import GetUser from "@/lib/GetUser";
import GetReply from "@/lib/GetReply";
import {
  TanyaJawabClientTypes,
  UserClientTypes,
  ReplyTypes,
} from "@/types/ClientTypes";
import { useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import UserContext from "@/context/UserContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { useEdgeStore } from "@/lib/edgestore";
import {
  CameraIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "./tanyajawab.module.css";

interface ReplyType {
  _id: string;
  id_tanyajawab: string;
  id_user_reply: string;
  name_user_reply: string;
  reply: string;
  image: string[];
  username: string;
  school: string;
  user_class: string;
  role: string;
}

interface TanyaJawabUpdatedType {
  _id: string;
  id_user_post: string;
  post: string;
  createdAt: Date;
  replies: ReplyType[];
  image: string[];
  isReply: boolean;
  username: string;
  school: string;
  user_class: string;
  role: string;
  displayReply: boolean;
}

type FileState = {
  file: File;
  key: string;
  progress: "PENDING" | "COMPLETE" | "ERROR" | number;
};

export default function TanyaJawab() {
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
  const [inputTextPost, setInputTextPost] = useState("");

  const [filesReply, setFilesReply] = useState<FileState[]>([]);
  const [thumbImageReply, setThumbImageReply] = useState<string[]>([]);
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
          const userReplies: ReplyType[] = repliesFetch
            .filter((reply) => reply.id_tanyajawab === tanyaJawab._id)
            .map((rep) => {
              const user = usersFetch.find((u) => u._id === rep.id_user_reply);
              return { ...rep, name_user_reply: user!.username };
            });

          return {
            _id: tanyaJawab._id,
            id_user_post: tanyaJawab.id_user_post,
            post: tanyaJawab.post,
            createdAt: tanyaJawab.createdAt,
            image: tanyaJawab.image,
            username: tanyaJawab.username,
            role: tanyaJawab.role,
            school: tanyaJawab.school,
            user_class: tanyaJawab.user_class,
            replies: userReplies ? userReplies : [],
            isReply: false,
            displayReply: false,
          };
        }
      );
      setTanyaJawabs(tanyaJawabsUpdated);
    }
  }, [tanyajawabsFetch, usersFetch, repliesFetch]);

  function updateFileProgress(
    key: string,
    progress: FileState["progress"],
    form: "post" | "reply"
  ) {
    if (form === "post") {
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

    if (form === "reply") {
      setFilesReply((file) => {
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
  }

  const postSubmitHandler = async (e: any) => {
    e.preventDefault();

    let urlImages: string[] = [];

    const user = usersFetch.find((u) => u.username === ctx?.profile?.username);

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
      setLoadingBtn(false);
      return;
    }

    if (tanyajawabsFetch.length > 0) {
      const filteredTanyaJawabs = tanyajawabsFetch.filter(
        (tj) => tj.id_user_post === user?._id
      );

      if (filteredTanyaJawabs.length > 1) {
        setModal({
          msg: "Maaf tidak bisa mengirim pertanyaan lagi",
          success: false,
        });
        setModalIsOpen(true);
        setLoadingBtn(false);
        return;
      }
    }

    const uploadImage = files.map(async (addedFileState) => {
      try {
        const res = await edgestore.myPublicImages.upload({
          file: addedFileState.file,
          onProgressChange: async (progress) => {
            updateFileProgress(addedFileState.key, progress, "post");
            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              updateFileProgress(addedFileState.key, "COMPLETE", "post");
            }
          },
        });
        urlImages.push(res.url);
      } catch (err) {
        setLoadingBtn(false);
        updateFileProgress(addedFileState.key, "ERROR", "post");
      }
    });

    Promise.all(uploadImage)
      .then(async () => {
        setLoadingBtn(false);

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
                username: user.username,
                role: user.role,
                school: user.school,
                user_class: user.user_class,
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

    let urlImages: string[] = [];

    setLoadingBtn(true);

    const reply = e.target["reply"].value;
    const id_post = e.target["id_post"].value;

    const tanyaJawabsIndex = tanyajawabs.findIndex((tj) => tj._id === id_post);

    if (tanyajawabs[tanyaJawabsIndex].replies.length > 4) {
      setModal({
        msg: "Tidak bisa mengirim balasan lagi",
        success: false,
      });
      setModalIsOpen(true);
      return;
    }

    if (status !== "authenticated") {
      window.location.href = "/login";
      return;
    }

    if (reply.length >= 500) {
      setModal({
        msg: "tidak boleh lebih dari 500 character",
        success: false,
      });
      setModalIsOpen(true);
      return;
    }

    const uploadImage = filesReply.map(async (addedFileState) => {
      try {
        const res = await edgestore.myPublicImages.upload({
          file: addedFileState.file,
          onProgressChange: async (progress) => {
            updateFileProgress(addedFileState.key, progress, "reply");
            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              updateFileProgress(addedFileState.key, "COMPLETE", "reply");
            }
          },
        });
        urlImages.push(res.url);
      } catch (err) {
        setLoadingBtn(false);
        updateFileProgress(addedFileState.key, "ERROR", "reply");
      }
    });

    Promise.all(uploadImage)
      .then(async () => {
        setLoadingBtn(false);

        const user = usersFetch.find(
          (u) => u.username === ctx?.profile?.username
        );

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
                image: urlImages,
                username: user.username,
                role: user.role,
                school: user.school,
                user_class: user.user_class,
              }),
            });

            setLoadingBtn(true);

            if (res.status === 200) {
              window.location.reload();
            }

            setLoading(false);
          } catch (e) {}
        }
      })
      .catch((error) => {
        console.error("Error during file uploads:", error);
      });
  };

  const inputImageHandler = (e: any, form: "post" | "reply") => {
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

      const convertImage = URL.createObjectURL(e.target.files?.[0]);

      if (form === "post") {
        setFiles([addedFiles, ...files]);
        setThumbImage([convertImage, ...thumbImage]);
      }

      if (form === "reply") {
        setFilesReply([addedFiles, ...filesReply]);
        setThumbImageReply([convertImage, ...thumbImageReply]);
      }
    }
  };

  const removeImgHandler = (
    i: number,
    form: "post" | "reply",
    file: FileState[],
    thumb: string[]
  ) => {
    const deletedFiles = file.filter((f, index) => i !== index);
    const deletedThumb = thumb.filter((t, index) => i !== index);

    if (form === "post") {
      setFiles(deletedFiles);
      setThumbImage(deletedThumb);
    }

    if (form === "reply") {
      setFilesReply(deletedFiles);
      setThumbImageReply(deletedThumb);
    }
  };

  const replyShowHandler = (id: string) => {
    const updatedTanyaJawabs = tanyajawabs.map((tj) => {
      if (tj._id === id) {
        return { ...tj, isReply: true };
      }
      return { ...tj, isReply: false };
    });

    setTanyaJawabs(updatedTanyaJawabs);
  };

  const replyCloseHandler = (id: string) => {
    const updatedTanyaJawabs = tanyajawabs.map((tj) => {
      if (tj._id === id) {
        return { ...tj, isReply: false };
      }
      return { ...tj, isReply: false };
    });

    setTanyaJawabs(updatedTanyaJawabs);
  };

  const displayRepliesShowHandler = (id: string) => {
    const updatedTanyaJawabs = tanyajawabs.map((tj) => {
      if (tj._id === id) {
        return { ...tj, displayReply: true };
      }
      return { ...tj, displayReply: false };
    });

    setTanyaJawabs(updatedTanyaJawabs);
  };

  const displayRepliesCloseHandler = (id: string) => {
    const updatedTanyaJawabs = tanyajawabs.map((tj) => {
      if (tj._id === id) {
        return { ...tj, displayReply: false };
      }
      return { ...tj, displayReply: false };
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
                      className={`relative ${styles["img-wrapper"]}`}
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
                        className={`absolute top-0 right-0 p-1 bg-white text-red-500 rounded-full opacity-0`}
                        onClick={() =>
                          removeImgHandler(i, "post", files, thumbImage)
                        }
                      >
                        <XCircleIcon className="h-8 w-8" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center">
                <div className="file-input">
                  <label htmlFor="file-upload" className="file-label">
                    <CameraIcon
                      className="h-6 w-6 text-gray"
                      onClick={(e) => inputImageHandler(e, "post")}
                    />
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    style={{ display: "none" }}
                    onChange={(e) => inputImageHandler(e, "post")}
                  />
                </div>
                <Button
                  type="submit"
                  style="solid"
                  loading={loadingBtn}
                  disabled={loadingBtn || inputTextPost === ""}
                >
                  Unggah
                </Button>
              </div>
            </div>
          </form>

          {tanyajawabs.length > 0 && (
            <>
              {tanyajawabs.map((item) => (
                <div key={item._id}>
                  <div className="mt-10">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 ">
                        <Image
                          src={"/icons/avatar.svg"}
                          width={36}
                          height={36}
                          alt="avatar"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-blue-dark capitalize">
                            {item.username}
                          </span>
                          <span className="font-bold text-gray capitalize">
                            {item.role === "siswa"
                              ? `${item.school} - ${item.user_class}`
                              : item.role}
                          </span>
                        </div>
                      </div>

                      <span className="mt-4 text-base">{item.post}</span>
                      {item.image && (
                        <div className="flex flex-row gap-4 mt-2">
                          {item.image.map((src) => (
                            <Link key={src} href={src} target="_blank">
                              <img
                                src={src}
                                className="w-36 h-20 object-cover"
                              />
                            </Link>
                          ))}
                        </div>
                      )}
                      {item.displayReply ? (
                        <>
                          <hr className="my-2" />
                          {item.replies.length > 0 ? (
                            <>
                              {item.replies.map((rep) => (
                                <div className="my-4 ml-4" key={rep._id}>
                                  <div className="flex flex-row gap-2">
                                    <Image
                                      src={"/icons/avatar.svg"}
                                      width={36}
                                      height={36}
                                      alt="avatar"
                                    />

                                    <div className="flex flex-col mb-1">
                                      <span className="font-bold text-blue-dark capitalize">
                                        {rep.username}
                                      </span>
                                      <span className="font-bold text-gray capitalize">
                                        {rep.role === "siswa"
                                          ? `${rep.school} - ${rep.user_class}`
                                          : rep.role}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-base ml-4">
                                    {rep.reply}
                                  </span>
                                  {rep.image && (
                                    <div className="flex flex-row gap-4 mt-2">
                                      {rep.image.map((src) => (
                                        <Link
                                          key={src}
                                          href={src}
                                          target="_blank"
                                        >
                                          <img
                                            src={src}
                                            className="w-36 h-20 object-cover"
                                          />
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </>
                          ) : (
                            <div>
                              <span>
                                {item.isReply ? "" : "belum ada balasan"}
                              </span>
                            </div>
                          )}

                          {!item.isReply && (
                            <div className="my-4">
                              {item.replies.length > 4 ? (
                                <div>
                                  <Button
                                    loading={false}
                                    style="solid"
                                    onClick={() =>
                                      displayRepliesCloseHandler(item._id)
                                    }
                                    className="bg-red mr-4"
                                  >
                                    Tutup
                                  </Button>
                                  <Button
                                    loading={false}
                                    style="solid"
                                    disabled={true}
                                  >
                                    Pertanyaan Ditutup
                                  </Button>
                                </div>
                              ) : (
                                <div>
                                  <Button
                                    loading={false}
                                    style="solid"
                                    onClick={() =>
                                      displayRepliesCloseHandler(item._id)
                                    }
                                    className="bg-red mr-4"
                                  >
                                    Tutup
                                  </Button>
                                  <Button
                                    loading={false}
                                    style="solid"
                                    onClick={() => replyShowHandler(item._id)}
                                  >
                                    Balas
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}

                          {item.isReply && (
                            <form onSubmit={replySubmitHandler}>
                              <div className="flex flex-col gap-2 my-2">
                                <XMarkIcon
                                  className="h-6 w-6 text-gray self-end"
                                  onClick={() => replyCloseHandler(item._id)}
                                />
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
                                {thumbImageReply.length > 0 && (
                                  <div className="flex gap-2 my-2">
                                    {thumbImageReply.map((thumb, i) => (
                                      <div
                                        key={i}
                                        className={`relative ${styles["img-wrapper"]}`}
                                      >
                                        <img
                                          className="w-36 h-20 object-cover"
                                          src={thumb}
                                          alt={`Thumbnail ${i + 1}`}
                                        />

                                        {typeof filesReply[i].progress ===
                                          "number" && (
                                          <div className="h-[6px] w-full border rounded overflow-hidden mt-2">
                                            <div
                                              className="h-full bg-blue-dark transition-all duration-150"
                                              style={{
                                                width: `${filesReply[i].progress}%`,
                                              }}
                                            ></div>
                                          </div>
                                        )}

                                        <button
                                          className={`absolute top-0 right-0 p-1 bg-white text-red-500 rounded-full opacity-0`}
                                          onClick={() =>
                                            removeImgHandler(
                                              i,
                                              "reply",
                                              filesReply,
                                              thumbImageReply
                                            )
                                          }
                                        >
                                          <XCircleIcon className="h-8 w-8" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div className="flex justify-end items-center gap-4">
                                  <div className="file-input">
                                    <label
                                      htmlFor="file-upload-reply"
                                      className="file-label"
                                    >
                                      <CameraIcon
                                        className="h-6 w-6 text-gray"
                                        onClick={(e) =>
                                          inputImageHandler(e, "reply")
                                        }
                                      />
                                    </label>
                                    <input
                                      id="file-upload-reply"
                                      name="file-upload-reply"
                                      type="file"
                                      accept="image/png, image/jpeg, image/jpg"
                                      style={{ display: "none" }}
                                      onChange={(e) =>
                                        inputImageHandler(e, "reply")
                                      }
                                    />
                                  </div>
                                  <Button
                                    type="submit"
                                    style="solid"
                                    loading={loadingBtn}
                                    disabled={
                                      loadingBtn || inputTextReply === ""
                                    }
                                  >
                                    Kirim Balasan
                                  </Button>
                                </div>
                              </div>
                            </form>
                          )}
                        </>
                      ) : (
                        <div>
                          <Button
                            type="submit"
                            style="solid"
                            loading={false}
                            onClick={() => displayRepliesShowHandler(item._id)}
                          >
                            Lihat Balasan
                          </Button>
                        </div>
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
