export default function Message({ message }) {
  const { sender, send_time, contents } = message;
  return (
    <div className="p-2">
      <div className="text-black">
        <span className="text-lg">{sender}</span>{" "}
        <span className="text-sm">{send_time.split(" ")[1]}</span>
      </div>
      <div>
        {contents.map((content, index) => {
          return (
            <div key={index} className="text-red-400">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
