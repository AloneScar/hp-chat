import { useState } from "react";

export default function RegisterOrLogin() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="flex flex-col justify-center gap-2">
      {!isLogin && (
        <>
          <input
            type="text"
            placeholder="username"
            className="input input-bordered input-secondary w-full hover:outline-none focus:outline-none"
          />
          <input
            type="password"
            placeholder="password"
            className="input input-bordered input-info w-full hover:outline-none focus:outline-none"
          />
          <button className="btn btn-outline btn-primary w-full">
            REGISTER
          </button>
          <div className="w-full text-center">
            Already a member?{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="underline">
              Login
            </button>
            !
          </div>
        </>
      )}
      {isLogin && (
        <>
          <input
            type="text"
            placeholder="username"
            className="input input-bordered input-secondary w-full hover:outline-none focus:outline-none"
          />
          <input
            type="password"
            placeholder="password"
            className="input input-bordered input-info w-full hover:outline-none focus:outline-none"
          />
          <button className="btn btn-outline btn-primary w-full">LOGIN</button>
          <div className="w-full text-center">
            Don`t have an account?{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="underline">
              Register
            </button>
            !
          </div>
        </>
      )}
    </div>
  );
}
