import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { styles } from "../styles";
import ModelCanvas from "./Models";
import { useNavigate } from "react-router-dom";
import { Puff } from "react-loader-spinner";
import "./component.css";

const ShowCase = () => {
  const navigate = useNavigate();
  const [model, setModel] = useState({
    name: "",
    mimeType: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorVal, setErrorVal] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const delay = setTimeout(async () => {
      const result = await axios.get("http://localhost:8000/api/getModel", {
        headers: { "Content-Type": "application/json" },
      });
      if (result) {
        console.log(
          "Successfully Called the API and data is downloaded",
          result
        );
        console.log("name mimeType, description", result);
        setModel((prev) => {
          return {
            ...prev,
            name: result.data.name,
            mimeType: result.data.mimeType,
            description: result.data.description,
          };
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrorVal(true);
      }
    }, 5000);
    return () => clearTimeout(delay);
  }, []);

  const handleBack = () => {
    navigate("/");
  };
  return (
    <div>
      <button
        onClick={handleBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </button>
      {!isLoading && model.name ? (
        <section className="relative w-full h-screen mx-auto ">
          <h3>Name : {model?.name}</h3>
          <h3>Description : {model?.description}</h3>
          {<ModelCanvas name={model.name} />}
        </section>
      ) : (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-80 z-50">
          <Puff
            height="80"
            width="80"
            radius={1}
            color="#0437F2"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <p className="mt-2 text-blue-700">Hang on, it takes a while...</p>
        </div>
      )}
    </div>
  );
};

export default ShowCase;
