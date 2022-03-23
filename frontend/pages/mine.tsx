import { useEffect, useState } from "react";
import Link from "next/link";
import { mintKallosTokenContract, saleKallosTokenAddress } from "web3Config";
import MyKallosCard, { IMyKallosCard } from "../components/MyKallosCard";

const Mine = ({ account }) => {
  const [kallosCardArray, setKallosCardArray] = useState<IMyKallosCard[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const getKallosTokens = async () => {
    try {
      const balanceLength = await mintKallosTokenContract.methods
        .balanceOf(account)
        .call();

      if (balanceLength === "0") return;

      const tempKallosCardArray: IMyKallosCard[] = [];

      const response = await mintKallosTokenContract.methods
        .getKallosToken(account)
        .call();

      console.log(response);
      response.map((item: IMyKallosCard) => {
        tempKallosCardArray.push({
          kallosTokenId: item.kallosTokenId,
          kallosType: item.kallosType,
          kallosPrice: item.kallosPrice,
        });
      });
      setKallosCardArray(tempKallosCardArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await mintKallosTokenContract.methods
        .isApprovedForAll(account, saleKallosTokenAddress)
        .call();

      if (response) setSaleStatus(true);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if (!account) return;

      const response = await mintKallosTokenContract.methods
        .setApprovalForAll(saleKallosTokenAddress, !saleStatus)
        .send({ from: account });

      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) return;

    getIsApprovedForAll();
    getKallosTokens();
  }, [account]);

  useEffect(() => {
    console.log(kallosCardArray);
  }, [kallosCardArray]);

  return (
    <>
      <div>
        <Link href="/regist">
          <a>
            <button>regist</button>
          </a>
        </Link>
        <p>Sale Status: {saleStatus ? "True" : "False"}</p>
        <button onClick={onClickApproveToggle}>
          {saleStatus ? "Cancel" : "Approve"}
        </button>
      </div>
      <div>
        {kallosCardArray &&
          kallosCardArray.map((item, idx) => {
            return (
              <MyKallosCard
                key={idx}
                kallosTokenId={item.kallosTokenId}
                kallosType={item.kallosType}
                kallosPrice={item.kallosPrice}
                saleStatus={saleStatus}
                account={account}
              />
            );
          })}
      </div>
    </>
  );
};

export default Mine;
