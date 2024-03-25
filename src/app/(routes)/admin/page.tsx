"use client";

import { useEdgeStore } from "@/app/_lib/edgestore";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function admin() {
  const { status } = useSession();

  console.log(status);

  const logoutHandler = () => {
    sessionStorage.removeItem("username");
    signOut({ callbackUrl: "/" });
  };

  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>(); 
  const [thumbImage, setThumbImage] = useState('');
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>()

  const fileChangeHandler = (e: any) => {
    setFile(e.target.files?.[0])
    console.log(e.target.files?.[0])
    const a = URL.createObjectURL(e.target.files?.[0]);
    console.log(a);
    setThumbImage(a);
  }

  const uploadHandler = async () => {
    if(file) {
      const res = await edgestore.myPublicImages.upload({ 
        file,
        onProgressChange: (progress) => {
          setProgress(progress);
        } 
      })
      //save data here
      setUrls({
        url: res.url,
        thumbnailUrl: res.thumbnailUrl
      })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-orange-600">admin</h1>
      <button onClick={logoutHandler}>log out</button>

      {/* test feature */}

      <div className="flex flex-col items-center m-6 gap-2">
        <input type="file" onChange={fileChangeHandler}/>
        <div className="h-[6px] w-44 border rounded overflow-hidden">
          <div className="h-full bg-blue-dark transition-all duration-150"
            style={{
              width: `${progress}%`
            }}
          ></div>
        </div>
        <button className="bg-blue-dark text-white rounded px-2 hover:opacity-80"
          onClick={uploadHandler}
        >
          Upload
        </button>
        { thumbImage !== '' && 
          <div>
            <img src={thumbImage} />
          </div>
        }
        {urls?.url && <Link href={urls.url} target="_blank">URL</Link>}
        {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target="_blank">thumbnail</Link>}
      </div>

      {/* test feature */}
    </div>
  );
}
