import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FileComponent() {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();

    let file_name = file.name;
    let file_ext = file_name.slice(file_name.lastIndexOf(".") + 1);

    let mimeType = "model/" + file_ext + "+json";

    const fileData = {
      name: file_name,
      mimeType: mimeType,
      file: file,
    };
    saveFile(fileData);
  };

  const saveFile = async (fileData) => {
    try {
      let data = new FormData();
      data.append("name", fileData.name);
      data.append("description", description);
      data.append("mimetype", fileData.mimeType);
      data.append("file", fileData.file);

      const result = await axios.post(
        "http://localhost:8000/api/saveModel",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (result) {
        console.log("Successfully sent the model to db");

        setTimeout(() => {
          navigate("/show-case");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="mb-40 text-5xl font-extrabold text-gray-900">
          Welcome to 3D Model Viewer.
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Upload a file
          </h2>
        </div>
        <div className="FileComponent text-black border-2 border-black border-dotted">
          <form onSubmit={submit}>
            <div className="px-4 py-2 mt-5 font-bold">
              <div class="text-sm text-gray-500">
                Accepted file types: .gltf, .glb, .ftx
              </div>
              <input
                filename={file}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                type="file"
                accept=".gltf,.glb,.ftx"
              ></input>
            </div>
            <div className="mt-6">
              <div className="mt-1 pl-3 pr-3 border-black">
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter a description ..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="justify-center mt-5 mb-2 px-2 py-2 border border-transparent text-base font-medium rounded-md text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
