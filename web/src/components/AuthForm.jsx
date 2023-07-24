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
    <div className="bg-[#526D82] px-5 pt-7 pb-3 rounded-lg flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="username"
        className="w-full hover:outline-none focus:outline-none p-1 rounded bg-[#DDE6ED]"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="w-full hover:outline-none focus:outline-none mt-2 mb-1 p-1 rounded bg-[#DDE6ED]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-[#9DB2BF] my-1 py-1 px-4 rounded hover:bg-[#9AC5F4]"
        onClick={() => handle_submit()}
      >
        {`${isLogin ? "Login" : "Register"} `}
      </button>
      <div className="w-full text-center text-[#DDE6ED]">
        {`${isLogin ? "Don`t have an account?" : "Already a member?"} `}
        <button
          onClick={() => {
            setUsername("");
            setPassword("");
            setIsLogin(!isLogin);
          }}
          className="underline hover:text-[#CCEEBC]"
        >
          {`${isLogin ? "Register" : "Login"} `}
        </button>
        !
      </div>
    </div>
  );
}
