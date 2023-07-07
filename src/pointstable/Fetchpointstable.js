import { useGetAllPostQuery } from "../services/fetch";
import { useEffect, useState } from "react";
import images from "../Image";
const PointsTable = () => {
  const responseinfo = useGetAllPostQuery();
  const fetchdata = responseinfo.data;
  const data1 = fetchdata?.matches;
  // console.log(data1);
  const [dataw, setDataw] = useState([]);

  useEffect(() => {
    if (data1) {
      const filteredData = data1.filter((saman) => saman?.score);
      setDataw(filteredData);
    }
  }, [data1]);

  // console.log(dataw);

  const AllClubs = () => {
    const teams = dataw.reduce((acc, match) => {
      const { team1, team2 } = match;
      return [team1, team2];
    }, []);

    const duplicateTeams = [...new Set(teams)];
    return duplicateTeams;
  };

  const alldata = {};

  dataw.forEach((dataz) => {
    const { team1, team2, score } = dataz;
    const team1score = score?.ft?.[0];
    const team2score = score?.ft?.[1];

    if (!alldata[team1]) {
      alldata[team1] = {
        played: 0,
        won: 0,
        lost: 0,
        draw: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        points: 0,
        form: [],
      };
    }
    if (!alldata[team2]) {
      alldata[team2] = {
        played: 0,
        won: 0,
        draw: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        points: 0,
        form: [],
      };
    }

    alldata[team1].played++;
    alldata[team2].played++;

    alldata[team1].gf += team1score;
    alldata[team2].gf += team2score;

    alldata[team1].ga += team2score;
    alldata[team2].ga += team1score;

    alldata[team1].gd += team1score - team2score;
    alldata[team2].gd += team2score - team1score;

    if (team1score > team2score) {
      alldata[team1].won++;
      alldata[team2].lost++;
      alldata[team1].points += 3;
      alldata[team1].form.unshift("W");
      alldata[team2].form.unshift("L");
    } else if (team1score < team2score) {
      alldata[team1].lost++;
      alldata[team2].won++;
      alldata[team2].points += 3;
      alldata[team1].form.unshift("L");
      alldata[team2].form.unshift("W");
    } else {
      alldata[team1].draw++;
      alldata[team2].draw++;
      alldata[team1].points += 1;
      alldata[team2].points += 1;
      alldata[team1].form.unshift("D");
      alldata[team2].form.unshift("D");
    }

    alldata[team1].form = alldata[team1].form.slice(0, 5);
    alldata[team2].form = alldata[team2].form.slice(0, 5);
  });

  return (
    <>
      <h1 className="head">
        <img
          src="/images/PL.jpg"
          alt="Premier League Points Table"
          className="logoo"
        />
        Premier League Points Table
      </h1>
      <table className="Table">
        <thead className="Head">
          <tr>
            <th className="position">Position</th>
            <th className="Club">Club</th>
            <th className="played">Played</th>
            <th className="won">Won</th>
            <th className="draw">Drawn</th>
            <th className="lost">Lost</th>
            <th className="gf">GF</th>
            <th className="ga">GA</th>
            <th className="gd">GD</th>
            <th className="point">Points</th>
            <th className="form">Form</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(alldata)
            .sort((a, b) => {
              if (alldata[b].points !== alldata[a].points) {
                return alldata[b].points - alldata[a].points;
              } else if (alldata[b].gd !== alldata[a].gd) {
                return alldata[b].gd - alldata[a].gd;
              } else {
                return alldata[b].gf - alldata[a].gf;
              }
            })

            .map((team, index) => {
              const cLubImage = images.filter((logo1) => logo1.name === team)[0]
                ?.logo;

              return (
                <tr key={team}>
                  <td className="Index">{index + 1}</td>
                  <td className="Team">
                    <img
                      src={cLubImage}
                      alt="Premier Club Logo"
                      width={25}
                      height={20}
                    />
                    {team}
                  </td>
                  <td className="Play">{alldata[team].played}</td>
                  <td className="Won">{alldata[team].won}</td>
                  <td className="Draw">{alldata[team].draw}</td>
                  <td className="Lost">{alldata[team].lost}</td>
                  <td className="GF">{alldata[team].gf}</td>
                  <td className="GA">{alldata[team].ga}</td>
                  <td className="GD">{alldata[team].gd}</td>
                  <td className="Points">{alldata[team].points}</td>
                  <td className="Form">
                    {alldata[team].form.map((result, index) => (
                      <span
                        key={index}
                        className={`FormResult ${
                          result === "W"
                            ? "Green"
                            : result === "L"
                            ? "Red"
                            : "Gray"
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default PointsTable;
