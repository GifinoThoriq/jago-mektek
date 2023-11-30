import Image from "next/image";

export default function SumberBelajar() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl text-blue-dark text-center font-bold">
        Sumber Belajar
      </h1>
      <div className="mt-8">
        <h3 className="text-2xl text-blue-dark font-bold">Buku Pembelajaran</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 mt-6 gap-6 px-6 md:px-0">
          <div className="flex flex-col items-center">
            <Image
              src={"/images/buku.png"}
              width={222}
              height={346}
              alt="buku"
            />
            <span className="text-base md:text-xl text-blue-dark font-medium text-center mt-4">
              Fundamentals of Structural Dynamics
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={"/images/buku.png"}
              width={222}
              height={346}
              alt="buku"
            />
            <span className="text-base md:text-xl text-blue-dark font-medium text-center mt-4">
              Fundamentals of Structural Dynamics
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={"/images/buku.png"}
              width={222}
              height={346}
              alt="buku"
            />
            <span className="text-base md:text-xl text-blue-dark font-medium text-center mt-4">
              Fundamentals of Structural Dynamics
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={"/images/buku.png"}
              width={222}
              height={346}
              alt="buku"
            />
            <span className="text-base md:text-xl text-blue-dark font-medium text-center mt-4">
              Fundamentals of Structural Dynamics
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl text-blue-dark font-bold">
          Video Pembalajaran
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 mt-6 gap-6 px-6 md:px-0">
          <div className="flex flex-col items-center">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/A1V-QQ5wFU4?si=UHmwjwmH0f2hS-BU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <span className="text-xl text-blue-dark font-medium text-center mt-4">
              Mechanical Engineering
            </span>
          </div>
          <div className="flex flex-col items-center">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/A1V-QQ5wFU4?si=UHmwjwmH0f2hS-BU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <span className="text-xl text-blue-dark font-medium text-center mt-4">
              Mechanical Engineering
            </span>
          </div>
          <div className="flex flex-col items-center">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/A1V-QQ5wFU4?si=UHmwjwmH0f2hS-BU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <span className="text-xl text-blue-dark font-medium text-center mt-4">
              Mechanical Engineering
            </span>
          </div>
          <div className="flex flex-col items-center">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/A1V-QQ5wFU4?si=UHmwjwmH0f2hS-BU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <span className="text-xl text-blue-dark font-medium text-center mt-4">
              Mechanical Engineering
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
