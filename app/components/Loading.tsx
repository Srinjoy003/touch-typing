import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loading() {

  return (
    <div className="">
      
      <ClipLoader
        loading={true}
        color="#ffffff"
        cssOverride={override}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;