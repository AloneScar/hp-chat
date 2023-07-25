import Message from "./Message";

export default function Messages({ messages }) {
  return (
    <div className="rounded my-1 mx-2 overflow-y-auto gap-0 scroll-smooth no-scrollbar flex-grow flex flex-col bg-[#FFD89C] dark:bg-[#526D82]">
      {messages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
      <div id="divUnderMessages" className="bg-transparent w-full"></div>
    </div>
  );
}
