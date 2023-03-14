import React from "react";

const Qualities = (props) => {
    const{color, name} = props
  return <span className={`badge bg-${color} ms-2`}>{name}</span>;
};

export default Qualities;
