import Component from "/modules/component.js";
import { fileToBase64 } from "/modules/utils.js";

const Dragdrop = new Component({
  name: "dragdrop",
});

const dragdropInit = (api, dragdropNode) => {
  const fileInput = dragdropNode.querySelector("#file-input");
  const box = dragdropNode.querySelector("#dragdrop-box");
  const info = dragdropNode.querySelector("#dragdrop-info");
  const infoDefMsg = info.innerHTML;
  const enter = (e) => {
    e.preventDefault();
    info.innerHTML = "Drop!";
  };
  box.addEventListener("dragenter", enter);
  box.addEventListener("dragover", enter);

  box.addEventListener("dragleave", () => {
    info.innerHTML = infoDefMsg;
  });

  box.addEventListener("drop", async (e) => {
    e.preventDefault();
    info.innerHTML = "Uploading...";
    let fileBase64;
    try {
      fileBase64 = await fileToBase64(e.dataTransfer.files[0]);
    } catch {
      info.innerHTML = "Upload error!";
    } finally {
      info.innerHTML = infoDefMsg;
    }
    console.log(fileBase64);
    const resp = await api.postPhoto(fileBase64.mime, fileBase64.data);
  });
};

export { Dragdrop, dragdropInit };
