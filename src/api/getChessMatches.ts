import axios from "axios";

export const getMonths = (name: string) =>
  axios.get(`https://api.chess.com/pub/player/${name}/games/archives`);
