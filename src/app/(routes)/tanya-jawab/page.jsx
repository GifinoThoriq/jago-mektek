import { Button } from "@/app/_ui/Button";
import Image from "next/image";

export default function TanyaJawab() {
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
          type="text"
          placeholder="tulis pertanyaanmu"
        />
        <div>
          <Button style="solid">Post</Button>
        </div>
      </div>

      <div>
        <div className="flex flex-row items-start gap-2">
          <Image
            src={"/icons/avatar.svg"}
            width={36}
            height={36}
            alt="avatar"
          />
          <div className="flex flex-col">
            <span className="font-bold text-blue-dark">Gifino</span>
            <span className="text-base">
              praesent elementum facilisis leo vel fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam quis enim lobortis
              scelerisque fermentum dui faucibus in ornare quam viverra orci
              sagittis eu volutpat odio facilisis mauris sit amet massa vitae
              tortor condimentum lacinia quis vel eros donec ac odio tempor orci
              dapibus ultrices in
            </span>
            <hr className="my-2" />
            <div className="flex flex-row gap-2">
              <Image
                src={"/icons/avatar.svg"}
                width={36}
                height={36}
                alt="avatar"
              />
              <div className="flex flex-col">
                <span className="font-bold text-blue-dark">Guru</span>
                <span className="text-base">
                  praesent elementum facilisis leo vel fringilla est ullamcorper
                  eget nulla facilisi etiam
                </span>
              </div>
            </div>
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
    </div>
  );
}
