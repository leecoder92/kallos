import React, { FC } from "react";
import Image from "next/image";

interface KallosCardProps {
  kallosType: string;
}

const KallosCard: FC<KallosCardProps> = ({ kallosType }) => {
  return (
    <Image width={150} height={150} src={`/images/${kallosType}.png`} alt="KallosCard" />
  );
};

export default KallosCard;
