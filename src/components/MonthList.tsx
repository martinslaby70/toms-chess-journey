import axios from "axios";
import { downloadFile } from "../utils";

type MontListProps = { months: string[]; name: string };

export const MonthList = (props: MontListProps) => {
  const handleDownloadMonthGames = async (month: string) => {
    await axios
      .get(month)
      .then((data) => {
        const pgns = data.data.games
          .map((item: { pgn: string }) => item.pgn)
          .join("\n");

        const monthArray = month.split("/");
        const fileName = `${props.name}_${monthArray[monthArray.length - 1]}-${
          monthArray[monthArray.length - 2]
        }`;

        downloadFile(`${fileName}.pgn`, pgns);
      })
      .catch(console.log);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "flex-start",
        paddingLeft: "3rem",
      }}
    >
      {[...props.months].map((month) => (
        <button
          className="button-list"
          onClick={() => handleDownloadMonthGames(month)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};
