import React, { useState } from 'react';
import './TrainList.css';

const trains = [
  {
    name: 'Train 1',
    teams: [
      {
        name: 'Team 1',
        icon: 'team1-icon.png',
        members: [
          { name: 'John Doe', designation: 'Manager' },
          { name: 'Jane Doe', designation: 'Developer' },
        ],
      },
      {
        name: 'Team 2',
        icon: 'team2-icon.png',
        members: [
          { name: 'Bob Smith', designation: 'Manager' },
          { name: 'Alice Johnson', designation: 'Developer' },
        ],
      },
    ],
  },
  {
    name: 'Train 2',
    teams: [
      {
        name: 'Team 3',
        icon: 'team3-icon.png',
        members: [
          { name: 'Charlie Brown', designation: 'Manager' },
          { name: 'Sara Lee', designation: 'Developer' },
        ],
      },
      {
        name: 'Team 4',
        icon: 'team4-icon.png',
        members: [
          { name: 'David Smith', designation: 'Manager' },
          { name: 'Emily Johnson', designation: 'Developer' },
        ],
      },
    ],
  },
];

function TrainList() {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const availableDesignations = [
    "manager",
    "developer"
  ];

  const handleSearch = () => {
    const searchWords = searchTerm.toLowerCase().split(" ");
    let teamName = "";
    let designation = "";
    let teamNameStarted = false;
    searchWords.forEach(word => {
      if (word === "of" || word === "the") {
        return;
      }
      if (word === "how" || word === "is") {
        return;
      }
      if (availableDesignations.includes(word)) {
        designation = word;
        teamNameStarted = true;
      } else if (teamNameStarted) {
        teamName += ` ${word}`;
      }
    });
    teamName = teamName.trim();
  
    let foundMember = null;
    trains.forEach(train => {
      train.teams.forEach(team => {
        if (team.name.toLowerCase() === teamName) {
          team.members.forEach(member => {
            if (member.designation.toLowerCase() === designation) {
              foundMember = member;
              return;
            }
          });
        }
      });
    });
    setSearchResult(foundMember);
  };

  return (
    <div className="container">
      <div className="search-container">
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResult && (
        <div className="search-result">
          {searchResult.name} - {searchResult.designation}
        </div>
      )}
      <table className="train-list">
        <tbody>
          {trains.map(train => (
          <tr key={train.name}>
          <td onClick={() => setSelectedTrain(train)}>{train.name}</td>
          {selectedTrain === train && (
          <td className="teams-list">
          {train.teams.map(team => (
          <div
          key={team.name}
          className="team-name"
          onClick={() => setSelectedTeam(team)}
          >
          {team.name}
          </div>
          ))}
          {selectedTeam && (
          <table className="team-members">
          <tbody>
          {selectedTeam.members.map(member => (
          <tr key={member.name}>
          <td>{member.name}</td>
          <td>{member.designation}</td>
          <td>
          <img src={member.photo} alt={member.name}/>
          </td>
          </tr>
          ))}
          </tbody>
          </table>
          )}
          </td>
          )}
          </tr>
          ))}
          </tbody>
          </table>
          </div>
          );}


export default TrainList;
