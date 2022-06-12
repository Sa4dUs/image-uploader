import React from "react";

const FilePreview = ({ fileData }) => {
  return (
    <div className="">
      <div className="">
        {/* loop over the fileData */}
        {fileData ? fileData.fileList.map((f) => {
          return (
              <span key={f.name}>{f.name}</span>
          );
        }): <React.Fragment></React.Fragment>}
      </div>
    </div>
  );
};

export default FilePreview;