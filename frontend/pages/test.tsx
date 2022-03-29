import { useEffect, useState } from "react";
import Link from "next/link";
import { mintKallosTokenContract } from "web3Config";
import { read } from "fs";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

// const client = create("https://127.0.0.1:8080/ip4/127.0.0.1/tcp/5001");

const Test = ({ account }) => {
  const [file, setFile] = useState(null);
  const [urlArr, setUrlArr] = useState([]);

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(Buffer(reader.result));
    };

    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setUrlArr((prev) => [...prev, url]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" name="data" onChange={retrieveFile} />
          <button type="submit"> Upload File</button>
        </form>
      </div>
      <div>
        {urlArr.length !== 0 ? (
          urlArr.map((el) => <img src={el} alt="nfts" width="300px" />)
        ) : (
          <h3>Upload data</h3>
        )}
      </div>
    </div>
  );
};

export default Test;
