// FundRightNowLogo.tsx
import React from "react";

interface Props {
  className?: string;
}

const FundRightNowLogo: React.FC<Props> = ({ className = "" }) => {
  //𝓕𝓾𝓷𝓭𝓶𝔂𝓦𝓲𝓼𝓱
  return (
    <div
      className={`pr-2 text-[#96592E] font-custom font-bold ${className}`}
    >
      FundmyWish
    </div>
  );
};

export default FundRightNowLogo;
