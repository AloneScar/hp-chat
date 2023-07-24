export default function Message({ message }) {
  const { sender, send_time, contents } = message;
  return (
    <div className="p-2">
      <div className="text-black">
        <span className="text-lg text-[#FDA769]">{sender}</span>{" "}
        <span className="text-sm text-[#8B7E74]">
          {send_time.split(" ")[1]}
        </span>
      </div>
      <div>
        {contents.map((content, index) => {
          return (
            <div key={index} className="text-[#A2CDB0]">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
