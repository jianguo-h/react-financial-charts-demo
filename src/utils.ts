export const toFixedNumber = (
  val: string | number | undefined | null,
  fractionDigits: number = 2
) => {
  if (!val || Number.isNaN(Number(val))) {
    return 0;
  }
  return parseFloat(Number(val).toFixed(fractionDigits));
};

export const mouseEdgeAppearance = {
  textFill: "#333333",
  strokeOpacity: 1,
  strokeWidth: 1,
  arrowWidth: 5,
  fill: "#eeeeee",
  fontSize: 12,
};
