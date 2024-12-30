export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
}

export  function timestampToShortDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export function formatAmount(amount) {
  if (typeof amount !== "number") {
    throw new Error("Input must be a number");
  }
  const [integerPart, decimalPart] = amount.toString().split(".");
  const formattedInteger = integerPart
    .replace(/\B(?=(\d{2})+(?=\d{3}))/g, ",")
    .replace(/(\d)(?=(\d{3})+$)/, "$1,");

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}