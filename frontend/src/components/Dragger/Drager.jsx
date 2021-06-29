// Dragger compot for dragging and sending images
import { useState } from "react";
import axios from "axios";

const Dragger = () => {
  console.log("-=Dragger component render=- ");

  // declare image existanse flag
  const [flag, setFlag] = useState(false);
  // declare the send flag for axios

  // declare the URL (for display pic on the page) state
  const [url, setUrl] = useState("");

  // set function that make the URL pointer for further use
  const handleFile = (file) => {
    setUrl(URL.createObjectURL(file));
    // setWFile(file)
  };

  // set draggers
  // dragger starts
  const handleOndragOver = (event) => {
    event.preventDefault();
  };

  // dragging release
  const handleOndrop = (event) => {
    //prevent the browser from opening the image
    event.preventDefault(); // to prevent reRender
    event.stopPropagation(); // to prevent Parent Actions

    // declare the file reciever
    let recievedFile = event.dataTransfer.files[0];
    console.log("DATA Transfer is ----> ", recievedFile);

    handleFile(recievedFile);

    console.log("working file is ", recievedFile);
    console.log(" file URL is ", url);

    setFlag(true);

    imageFetcher(recievedFile);
  };

  const imageFetcher = (file) => {
    console.log("File for AXIOS", file);
    const formData = new FormData();
    formData.append("file", file);
    console.log("File fo send by axios", file);
    axios
      .post("http://localhost:8080/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log("AXIOS RES ", res.data));
  };

  return (
    <>
      <div className="Dragger">
        <h3> Dragger component </h3>
        <div
          className="drop_zone"
          onDragOver={handleOndragOver}
          onDrop={handleOndrop}
        >
          <p>Drag _ Zone </p>
          {flag ? (
            <div className="pic">
              <img src={url} style={{ height: 200, width: 200 }} />
            </div>
          ) : (
            <p>Nothing to show</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dragger;