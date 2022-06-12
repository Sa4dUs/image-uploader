import React from "react";

const FilePreview = ({ fileData }) => {
  return (
    <div className="">
      <div className="">
        {/* loop over the fileData */}
        {fileData.fileList.map((f) => {
          return (
              <span key={f.name}>{f.name}</span>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;