import React from "react";
import DotLoader from "react-spinners/DotLoader";

const Loading = () => {
  return <DotLoader color={"#333"} loading={true} size={24} />;
};

export default Loading;
