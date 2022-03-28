import React, { ChangeEvent, FC, useEffect, useState } from "react";
import KallosCard from "./KallosCard";
import { saleKallosTokenContract, web3 } from "../web3Config";

import { updateItemInfo } from "@/store/modules/user";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch: any) => {
  return {
    //   updateItemInfo: (paramsObj) => updateItemInfo(paramsObj),
  };
};

export interface IMyKallosCard {
  kallosTokenId: string;
  kallosType: string;
  kallosPrice: string;
}

interface MyKallosCardProps extends IMyKallosCard {
  saleStatus: boolean;
  account: string;
}

const MyKallosCard: FC<MyKallosCardProps> = ({
  kallosTokenId,
  kallosType,
  kallosPrice,
  saleStatus,
  account,
}) => {
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myKallosPrice, setMyKallosPrice] = useState<string>(kallosPrice);

  const onChangeSellPrice = (event: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(event.target.value);
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;

      const response = await saleKallosTokenContract.methods
        .setForSaleKallosToken(
          kallosTokenId,
          web3.utils.toWei(sellPrice, "ether")
        )
        .send({ from: account });

      if (response.status)
        setMyKallosPrice(web3.utils.toWei(sellPrice, "ether"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <KallosCard kallosType={kallosType} kallosTokenId={kallosTokenId} />
      <div>
        {kallosPrice === "0" ? (
          <>
            <form>
              <input
                type="number"
                value={sellPrice}
                onChange={onChangeSellPrice}
              />
              SSF
            </form>
            <button onClick={onClickSell}>Sell</button>
          </>
        ) : (
          <p>{web3.utils.fromWei(kallosPrice)} SSF</p>
        )}
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(MyKallosCard);
