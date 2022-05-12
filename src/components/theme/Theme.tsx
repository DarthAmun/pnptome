interface Theme {
  mainColor: string;
  secondColor: string;
  textColor: string;
  secondTextColor: string;
  highlight: string;
}
export default Theme;

export const darkTheme: Theme = {
  mainColor: "#191D38",
  secondColor: "#272c4a",
  textColor: "white",
  secondTextColor: "lightslategray",
  highlight: "#F55C5C",
};
export const lightTheme: Theme = {
  mainColor: "#E6E6E6",
  secondColor: "white",
  textColor: "#404040",
  secondTextColor: "#404040",
  highlight: "#F55C5C",
};