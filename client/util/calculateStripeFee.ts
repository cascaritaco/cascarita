export const calculateStripeFee = (price: number): number => {
  const feePercentage = 0.029;
  const fixedFee = 0.3;
  const fee = price * feePercentage + fixedFee;
  return Math.ceil(fee * 100) / 100;
};
