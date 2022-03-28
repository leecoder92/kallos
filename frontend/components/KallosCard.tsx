import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface KallosCardProps {
  kallosType: string;
  kallosTokenId: string;
}

const KallosCard: FC<KallosCardProps> = ({ kallosType, kallosTokenId }) => {
  return (
    <>
      <Image
        width={150}
        height={150}
        src={`/images/${kallosType}.png`}
        alt="KallosCard"
      />
      <Link
        href={{
          pathname: `items/${kallosTokenId}`,
        }}
      >
        <a>
          <strong>작품 이름</strong>
        </a>
      </Link>
    </>
  );
};

export default KallosCard;
