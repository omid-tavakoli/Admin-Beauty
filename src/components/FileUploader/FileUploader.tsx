import { FC, useState } from "react";
import { compress, pickFile } from "../../utils/file";
import { FileType } from "../../utils/file";
import { uploadFile } from "../../service/api/uploadFile";
// import { UploadFileType } from "../../service/api/uploadFile";

interface ImageUploader {
  fileHandler: (file: string | undefined) => void;
  multiFile?: boolean;
  image?: string;
  disable?: boolean;
}
const ImageUploader: FC<ImageUploader> = (props) => {
  const [file, setFile] = useState<FileType | undefined>();
  const acceptFormats = "video/mp4,video/x-m4v,video/image/png, image/jpeg";

  const fileHandler = () => {
    pickFile(acceptFormats).then((res) => {
      if (res && res.blob && res.blob.type.includes("image")) {
        compress(res.blob).then((img) => {
          !props?.multiFile && setFile(res);
          if (img?.dataUrl) {
            uploadFile({
              FileBase64: img.dataUrl.split(",")[1],
              Type: 1,
            })
              ?.then((res) => {
                if (res.data.entity) {
                  props.fileHandler(res.data.entity.filePath);
                } else {
                  props.fileHandler("");
                }
              })
              .catch((err) => props.fileHandler(res.dataUrl));
          }
        });
      } else if (res) {
        !props?.multiFile && setFile(res);
        uploadFile({
          FileBase64: res.dataUrl.split(",")[1],
          Type: 2,
        })
          ?.then((res) => {
            if (res.data.entity) {
              props.fileHandler(res.data.entity.filePath);
            } else {
              props.fileHandler("");
            }
          })
          .catch((err) => props.fileHandler(res.dataUrl));
      }
    });
  };
  const videoHandeler = (img: any) => {
    uploadFile({
      FileBase64: img.dataUrl.split(",")[1],
      Type: 2,
    })?.then((res) => {
      if (res.data.entity) {
        props.fileHandler(res.data.entity.filePath);
      } else {
        props.fileHandler("");
      }
    });
  };

  const removeHandler = () => {
    props.fileHandler(undefined);
    setFile(undefined);
  };

  return (
    <div className="relative">
      <div className="mt-6 w-fit !z-0" onClick={fileHandler}>
        <div className="border rounded-xl flex items-center justify-center  w-[5.5rem] h-[5.5rem] hover:cursor-pointer overflow-hidden">
          {file?.blob.type.includes("image") && (
            <div className="relative">
              <img
                src={file?.dataUrl}
                className="!w-[5.5rem] !h-[5.5rem]"
                alt="user-img"
              />
            </div>
          )}
          {file?.blob?.type.includes("video") && (
            <div className="relative">
              <video width="88px" height="!880px">
                <source
                  width="100"
                  height="100"
                  src={file.dataUrl}
                  type="video/mp4"
                />
              </video>
            </div>
          )}
          {!file?.blob && (
            <>
              {props.image ? (
                <>
                  <img
                    src={props.image}
                    className="!w-[5.5rem] !h-[5.5rem] rounded-xl object-cover"
                    alt=""
                  />
                </>
              ) : (
                <span className="flex items-center justify-center w-9 h-9 p-2 rounded-xl">
                  <svg
                    width="20"
                    height="20"
                    className="fill-black stroke-transparent cursor-pointer"
                  >
                    <use href={"/images/icons/panel.svg#upload-img"}></use>
                  </svg>
                </span>
              )}
            </>
          )}
        </div>
      </div>
      {file && !props?.image && (
        <div
          className="absolute top-0 right-0 !z-[1000] pt-2 ps-2"
          onClick={removeHandler}
        >
          <span className="flex items-center justify-center bg-main-secondary w-9 h-9 rounded-lg cursor-pointer">
            <svg width="20" height="20">
              <use href={"images/icons/panel.svg#delete"}></use>
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};
export default ImageUploader;
