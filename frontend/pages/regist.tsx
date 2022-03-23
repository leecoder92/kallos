import { useEffect } from "react";
import Link from "next/link";
import { mintKallosTokenContract } from "web3Config";

const Regist = ({ account }) => {
  //버튼누르면 NFT 생성
  const onClickMint = async () => {
    try {
      if (!account) return;

      const response = await mintKallosTokenContract.methods
        .mintKallosToken()
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(account);
  }, []);

  return (
    <div>
      <button onClick={onClickMint}>Mint</button>
      <Link href="/mine">
        <a>
          <button>mine</button>
        </a>
      </Link>
      <style jsx>
        {`
          div {
            position: absolute;
            top: 50%;
            left: 50%;
          }
        `}
      </style>
    </div>
  );
};

export default Regist;
