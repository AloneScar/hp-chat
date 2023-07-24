export default function AuthForm({
  username,
  password,
  setUsername,
  setPassword,
  handle_submit,
  setIsLogin,
  isLogin,
}) {
  return (
    <div className="bg-[#91C8E4] dark:bg-[#526D82] px-5 pt-7 pb-3 rounded-lg flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="username"
        className="w-full hover:outline-none focus:outline-none p-1 rounded dark:bg-[#DDE6ED] bg-[#749BC2] placeholder:text-[#A1CCD1]"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="w-full hover:outline-none focus:outline-none mt-2 mb-1 p-1 rounded bg-[#749BC2] dark:bg-[#DDE6ED] placeholder:text-[#A1CCD1]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="dark:bg-[#9DB2BF] bg-[#4682A9] my-1 py-1 px-4 rounded dark:hover:bg-[#9AC5F4] hover:bg-[#7C73C0]"
        onClick={() => handle_submit()}
      >
        {`${isLogin ? "Login" : "Register"} `}
      </button>
      <div className="w-full text-center dark:text-[#DDE6ED]">
        {`${isLogin ? "Don`t have an account?" : "Already a member?"} `}
        <button
          onClick={() => {
            setUsername("");
            setPassword("");
            setIsLogin(!isLogin);
          }}
          className="underline dark:hover:text-[#CCEEBC] hover:text-[#F11A7B]"
        >
          {`${isLogin ? "Register" : "Login"} `}
        </button>
        !
      </div>
    </div>
  );
}
