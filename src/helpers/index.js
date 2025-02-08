export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    // weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    // hour: '2-digit',
    hour: 'numeric',
    // second: '2-digit',
    // minute: '2-digit',
    minute: 'numeric',
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
}

export function formatTimeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const secondsAgo = Math.floor((now - date) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(daysAgo / 365);

  if (secondsAgo < 60) return "Just now";
  if (minutesAgo < 60) return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  if (hoursAgo < 24) return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  if (daysAgo < 30) return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  if (monthsAgo < 12) return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
}

export const playSound = (url) => {
  const audio = new Audio(url);
  audio.play().catch(error => console.log('Error playing sound:', error));
};


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