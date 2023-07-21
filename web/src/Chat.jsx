export default function Chat() {
  return (
    <>
      <div className="flex flex-row h-full justify-between">
        <div className="h-full w-1/4 bg-red-200">friend list</div>
        <div className="h-full w-3/4 bg-blue-200 flex flex-col">
          <div className="bg-teal-400 h-3/4">information list</div>
          <div className="h-1/4">input</div>
        </div>
      </div>
    </>
  );
}
