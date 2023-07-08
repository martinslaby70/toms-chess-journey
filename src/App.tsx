import axios from "axios";
import { useState } from "react";
import { getMonths } from "./api/getChessMatches";

const DEFAULT_NAME = "queen_of_the_lake";
const MAX_FILE_GAMES_LIMITS = 20000;

function download(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function App() {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [fileSize, setFileSize] = useState<number>(MAX_FILE_GAMES_LIMITS);
  const [months, setMonths] = useState<string[]>([]);

  const handleSearch = async () => {
    await getMonths(name)
      .then((data) => setMonths(data.data.archives))
      .catch(console.log);
  };

  const handleDownloadMonthGames = async (month: string) => {
    await axios
      .get(month)
      .then((data) => {
        const pgns = data.data.games
          .map((item: { pgn: string }) => item.pgn)
          .join("\n");

        const monthArray = month.split("/");
        const fileName = `${name}_${monthArray[monthArray.length - 1]}-${
          monthArray[monthArray.length - 2]
        }`;

        download(`${fileName}.pgn`, pgns);
      })
      .catch(console.log);
  };

  const downloadAll = async () => {
    const pgnGames = [];

    for (let i = 0; i < months.length; i++) {
      const element = months[i];
      const { data } = await axios.get(element);
      pgnGames.push(data.games.map((game: { pgn: string }) => game.pgn));
    }

    const games = [...pgnGames].flat();

    const filesToDownload = [];

    for (let i = 0; i < games.length; i += fileSize)
      filesToDownload.push(games.slice(i, i + fileSize).join("\n"));

    filesToDownload.forEach((file, i) => {
      const fileName = `${name}_${i}`;

      download(`${fileName}.pgn`, file);
    });
  };

  return (
    <>
      <input onChange={(e) => setName(e.target.value)} value={name} />
      <input
        onChange={(e) => setFileSize(parseFloat(e.target.value))}
        value={fileSize.toFixed()}
        placeholder="Pocet her na soubor"
        type="number"
      />
      <button onClick={handleSearch}>search</button>
      <button onClick={downloadAll} disabled={months.length === 0}>
        download all
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "flex-start",
          marginTop: "20px",
        }}
      >
        {[...months].map((month) => (
          <button onClick={() => handleDownloadMonthGames(month)}>
            {month}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
