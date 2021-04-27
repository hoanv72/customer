import React from "react";
import FolderTree, { testData } from "react-folder-tree";

const BasicTree = () => {
  const onTreeStateChange = (state) => console.log("tree state: ", state);

  return <FolderTree data={testData} onChange={onTreeStateChange} />;
};

export default BasicTree;
