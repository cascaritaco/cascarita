import React, { useCallback, useMemo } from "react";
import styles from "./FileUpload.module.css";
import { useDropzone } from "react-dropzone";
import { FileIcon, Cross1Icon } from "@radix-ui/react-icons";
import { FileUploadProps } from "./types";

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const FileUpload: React.FC<FileUploadProps> = ({ className }) => {
  const [filePreview, setFilePreview] = React.useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new FileReader();

    file.onload = () => {
      setFilePreview(file.result as string);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    // maxSize: 1024 * 1000,
  });

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  const removeFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setFilePreview("");
  };

  return (
    <div
      {...getRootProps({
        className: className,
        style: style,
      })}>
      {filePreview && (
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={filePreview || undefined}
            alt=""
            onLoad={() => {
              URL.revokeObjectURL(filePreview);
            }}
          />
        </div>
      )}

      <input {...getInputProps()} />
      {isDragActive ? (
        <div className={styles.dropZoneContent}>
          {!filePreview && (
            <>
              <FileIcon className={styles.fileIcon} width={60} height={60} />
              <p className={styles.textSm}>Drop the files here ...</p>
            </>
          )}
        </div>
      ) : (
        <div className={styles.dropZoneContent}>
          {!filePreview && (
            <>
              <FileIcon className={styles.fileIcon} width={60} height={60} />
              <p className={styles.textSm}>
                Drag and drop a file here or{" "}
                <span className={styles.boldLogoText}>Choose a file</span>
              </p>
            </>
          )}
        </div>
      )}

      {filePreview && (
        <aside>
          <button className={styles.removeBtn} onClick={removeFile}>
            <Cross1Icon />
          </button>
        </aside>
      )}
    </div>
  );
};

export default FileUpload;
