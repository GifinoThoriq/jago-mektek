interface IUserResult {
  _id: string;
  title: string;
  user_answer: string | null;
  correct: string | null;
  text_answer: string | null;
  text_real_answer: string | null;
}

interface ITableTwo {
  userResult: IUserResult[];
}

const TableTwo: React.FC<ITableTwo> = ({ userResult }) => {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Laporan Pengerjaan
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Materi
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Jawaban Siswa
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Hasil
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Jawaban Benar
              </h5>
            </div>
          </div>

          {userResult.map((user, index) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                index === userResult.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={index}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {user.title}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {user.text_answer ? user.text_answer : "-"}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                {user.correct === null ? (
                  "-"
                ) : (
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      user.correct
                        ? "bg-success text-success"
                        : "bg-danger text-danger"
                    }`}
                  >
                    {user.correct ? "Benar" : "Salah"}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {user.text_real_answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TableTwo;
