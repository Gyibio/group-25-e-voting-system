import React from "react";

const Header = () => {
  return (
    <div className="w-full h-16 py-2 px-4 items-center justify-between flex">
      <div className="text-3xl font-bold text-primary">E-UG</div>
      <div className="flex">
        <button className="btn-primary bg-transparent text-black">
          Sign In
        </button>
        <button className="btn-primary">Vote now</button>
      </div>
    </div>
  );
};

export default Header;
