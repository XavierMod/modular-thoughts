import moment from "moment";

export function trimText(text: string, wordLimit: number = 30): string {
  const words = text.split(/\s+/).filter(Boolean); // Split by whitespace, remove empty strings
  if (words.length <= wordLimit) return text;
  return `${words.slice(0, wordLimit).join(" ")}...`;
}

export function relativeTime(dateString: string) {
  return moment(dateString, "MM/DD/YYYY").fromNow();
}
