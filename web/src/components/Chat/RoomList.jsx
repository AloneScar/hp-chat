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
          className="h-1/2 w-1/2 bg-white"
          onClick={(e) => {
            e.stopPropagation();
          }}
        ></div>
      </div>
    );
  else return <></>;
}
