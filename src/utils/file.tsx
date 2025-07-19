export interface FileType {
  blob: Blob;
  dataUrl: string;
}
export function compress(image: string | Blob) {
  return new Promise<FileType>((resolve, reject) => {
    if (typeof image === "string") {
      const i = document.createElement("img");
      i.src = image;
      i.crossOrigin = "anonymous";
      const c = document.createElement("canvas");
      i.onerror = () => {
        reject("Failed!");
      };
      i.onload = () => {
        const ctx = c.getContext("2d");
        if (i.width > 2000 || i.height > 2000) {
          c.width = i.width / 2;
          c.height = i.height / 2;
        } else {
          c.width = i.width;
          c.height = i.height;
        }
        if (ctx) {
          ctx.drawImage(i, 0, 0, c.width, c.height);
          c.toBlob(
            (blob) => {
              blob &&
                resolve({
                  blob: blob,
                  dataUrl: c.toDataURL("image/webp", 0.7),
                });
              !blob && reject("Failed!");
            },
            "image/webp",
            0.7
          );
        }
      };
    } else {
      const reader = new FileReader();
      reader.onload = (ev) => {
        image = ev.target?.result as string;
        const i = new Image();

        i.src = image;
        const c = document.createElement("canvas");
        i.onerror = () => {
          reject("Failed!");
        };
        i.onload = () => {
          const ctx = c.getContext("2d");
          c.width = i.width;
          c.height = i.height;
          if (ctx) {
            ctx.drawImage(i, 0, 0, c.width, c.height);
            c.toBlob(
              (blob) => {
                blob &&
                  resolve({
                    blob: blob,
                    dataUrl: c.toDataURL("image/webp", 0.7),
                  });
                !blob && reject("Failed!");
              },
              "image/webp",
              0.7
            );
          }
        };
      };
      reader.readAsDataURL(image);
    }
  });
}
export function pickFile(
  accept?: string
): Promise<{ dataUrl: string; blob: Blob }> {
  return new Promise<{ dataUrl: string; blob: Blob }>((resolve, reject) => {
    const input = document.createElement("input");
    input.accept = accept ?? "image/jpeg,image/png,image/jpg,image/webp";
    input.type = "file";
    input.hidden = true;
    input.onchange = (e) => {
      // @ts-ignore
      const file = e.currentTarget?.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        resolve({
          blob: file,
          dataUrl: ev.target?.result! as string,
        });
      };
      reader.readAsDataURL(file);
    };
    input.onerror = () => {
      reject("");
    };
    document.body.appendChild(input);
    input.click();
  });
}
