export default function ProcessingModal({openModal,setOpenModal,isSuccess,isError,isLoading,error}) {
  return (
    <div>
      <div className="mx-auto flex w-72 items-center justify-center">
        <div
          onClick={() => setOpenModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
        >
          <div
            onClick={(e_) => e_.stopPropagation()}
            className={`absolute w-80 rounded-lg bg-white p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${
              openModal
                ? "opacity-1 translate-y-0 duration-300"
                : "translate-y-20 opacity-0 duration-150"
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              {isLoading && (
                <>
                  <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-sky-900 border-sky-400"></div>
                  <h6 className="text-center text-sm font-medium opacity-70">
                    Processing...
                  </h6>
                </>
              )}
              {isSuccess && (
                <>
                  <svg
                    className="w-16 stroke-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h6 className="text-center text-sm font-medium opacity-70">
                    Success! Product has been added completed.
                  </h6>
                </>
              )}
              {isError && (
                <div className=" text-center">
                 
                  <h6 className="text-center text-red-600 text-sm font-medium opacity-70">
                    Error! {error?.data?.error || "Something went wrong."}
                  </h6>

                  <button className=" bg-gray-700 text-white px-3 mt-5 rounded py-1" onClick={()=>setOpenModal(false)} >Try Again</button>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
