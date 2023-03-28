// ./src/App.tsx

import React, { useState, useEffect } from "react";
import uploadFileToBlob, {
  isStorageConfigured,
  getBlobsInContainer,
} from "../ts/azure-storage-blob";
import DisplayImagesFromContainer from "../ts/ContainerImages";
import { Carousel } from "antd";

const storageConfigured = isStorageConfigured();

const UploadImgExample = (): JSX.Element => {
  // all blobs in container
  const [blobList, setBlobList] = useState<File[]>([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState<File | null>();
  const [fileUploaded, setFileUploaded] = useState<string>("");

  // UI/form management
  const [uploading, setUploading] = useState<boolean>(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  // *** GET FILES IN CONTAINER ***
  useEffect(() => {
    getBlobsInContainer().then((list: any) => {
      // prepare UI for results
      setBlobList(list);
    });
  }, [fileUploaded]);

  const onFileChange = (event: any) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    if (fileSelected && fileSelected?.name) {
      // prepare UI
      setUploading(true);

      //Rename file
      const myRenamedFile = new File([fileSelected], "NewFileName");

      // *** UPLOAD TO AZURE STORAGE ***
      await uploadFileToBlob(myRenamedFile);

      // reset state/form
      setFileSelected(null);
      setFileUploaded(fileSelected.name);
      setUploading(false);
      setInputKey(Math.random().toString(36));
    }
  };

  //file filter fcuntion
  function filterFile(files: File[], name: string): File[] {
    return files.filter((file) => file.name.includes(name));
  }

  // display form
  const DisplayForm = () => (
    <div>
      <input type="file" onChange={onFileChange} key={inputKey || ""} />
      <button type="submit" onClick={onFileUpload}>
        Upload!
      </button>
    </div>
  );

  return (
    <div>
      <h1>Upload file to Azure Blob Storage</h1>
      {storageConfigured && !uploading && DisplayForm()}
      {storageConfigured && uploading && <div>Uploading</div>}
      <hr />
      {storageConfigured && blobList.length > 0 && (
        <DisplayImagesFromContainer
          blobList={filterFile(blobList, "carImage")}
        />
      )}
      {!storageConfigured && <div>Storage is not configured.</div>}
      <Carousel>
        {blobList.map((file: any, key) => {
          return (
            <div className=" items-center justify-center flex" key={key}>
              <img className="rounded-md object-cover" src={file.url}></img>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default UploadImgExample;
