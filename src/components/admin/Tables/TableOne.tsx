"use client";

import { UserTypes } from "@/types/Types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const TableOne = () => {
  const router = useRouter();

  const [users, setUsers] = useState<UserTypes[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/user_page/${page}/${search}`);
      const data = await res.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    };

    fetchPosts();
  }, [page, search]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const searchChangeHandler = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-row justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Daftar Murid
          </h4>
          <input
            type="text"
            placeholder="Default Input"
            className="rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            onChange={searchChangeHandler}
          />
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Asal Sekolah
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Kelas
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>

          {users.map((user, index) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                index === users.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={index}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {user.username}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.school}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.user_class}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <div className="flex items-center space-x-3.5">
                  <button
                    className="hover:text-primary"
                    onClick={() => router.push(`/admin/student/${user._id}`)}
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill=""
                      />
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <nav className="mt-4 text-center" aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button onClick={handlePreviousPage} disabled={page === 1}>
              <a className="flex items-center justify-center px-3 h-8 ms-0 leading-tight font-medium text-black bg-white border border-e-0 border-stroke rounded-s-lg hover:bg-gray-2 hover:text-gray">
                Previous
              </a>
            </button>
          </li>
          {Array.from(Array(totalPages), (e, i) => (
            <li key={i}>
              <button onClick={() => setPage(i + 1)}>
                <a className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-stroke hover:bg-gray-2 hover:text-gray">
                  {i + 1}
                </a>
              </button>
            </li>
          ))}
          <li onClick={handleNextPage}>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-stroke rounded-e-lg hover:bg-gray-2 hover:text-gray"
              >
                Next
              </a>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TableOne;
