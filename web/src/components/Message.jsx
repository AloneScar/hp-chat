export default function Message({ message }) {
  const { sender, send_time, contents } = message;
  return (
    <div className="pl-4">
      <div className="text-black">
        <span className="text-xl text-[#FDA769]">{sender}</span>{" "}
        <span className="text-sm text-[#8B7E74]">
          {send_time.split(" ")[1]}
        </span>
      </div>
      <div className="flex flex-col">
        {contents.map((content, index) => {
          return (
            <div key={index} className="dark:text-[#DDE6ED] text-[#7858A6]">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
