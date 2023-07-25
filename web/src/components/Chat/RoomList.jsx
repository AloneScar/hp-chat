export default function RoomList({ isHidden, setIshidden }) {
  if (isHidden)
    return (
      <div
        className="absolute right-0 left-0 bottom-0 top-0 m-auto w-full h-full bg-transparent flex justify-center items-center"
        onClick={() => {
          setIshidden(false);
        }}
      >
        <div
          className="border p-2 overflow-y-scroll no-scrollbar h-2/3 w-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col">
            <li className="flex flex-row mb-2 border-gray-400">
              <div className="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                <div className="flex-1 pl-1 md:mr-16">
                  <div className="font-medium dark:text-white">Public</div>
                  <div className="text-sm text-gray-600 dark:text-gray-200">
                    Developer
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  else return <></>;
}
