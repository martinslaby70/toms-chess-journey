import axios from "axios";
import { useState } from "react";
import { getMonths } from "./api/getChessMatches";
import { DEFAULT_NAME, MAX_FILE_GAMES_LIMITS } from "./constants";
import { downloadFile } from "./utils";
import { Input } from "./components/Input";
import { MonthList } from "./components/MonthList";
import { HeaderInputWrapper } from "./components/HeaderInputWrapper";
import { HeaderWrapper } from "./components/HeaderWrapper";

function App() {
  const [name, setName] = useState(DEFAULT_NAME);
  const [fileSize, setFileSize] = useState(MAX_FILE_GAMES_LIMITS);
  const [months, setMonths] = useState<string[]>([]);

  const handleSearch = async () => {
    await getMonths(name)
      .then((data) => setMonths(data.data.archives))
      .catch(console.log);
  };

  const downloadAll = async () => {
    const pgnGames: string[][] = [];

    for (let i = 0; i < months.length; i++) {
      const element = months[i];
      const { data } = await axios.get(element);
      pgnGames.push(data.games.map((game: { pgn: string }) => game.pgn));
    }

    const games = [...pgnGames].flat();

    for (let i = 0; i < games.length; i += fileSize) {
      const gameFile = games.slice(i, i + fileSize).join("\n");
      downloadFile(`${name}_${i}.pgn`, gameFile);
    }
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderInputWrapper>
          <Input onChange={setName} value={name} label="Name-tag" />
          <Input
            onChange={(val) =>
              setFileSize(isNaN(parseFloat(val)) ? 1 : parseFloat(val))
            }
            value={fileSize.toFixed()}
            label="Pocet her na soubor"
          />
        </HeaderInputWrapper>

        <div>
          <button onClick={handleSearch} className="button">
            search
          </button>
          <button
            onClick={downloadAll}
            className="button"
            disabled={months.length === 0}
          >
            download all
          </button>
        </div>
      </HeaderWrapper>

      <MonthList months={months} name={name} />
    </>
  );
}

export default App;
