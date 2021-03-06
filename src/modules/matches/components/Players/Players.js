import React from 'react';
import './Players.scss';

const Players = props => {
  const match = props.userMatch;
  const items = props.items;
  const renderTeam = teamId => {
    const teamMatches = props.displayMatches.filter(dm => dm.teamId === teamId);

    let players = [];

    teamMatches.forEach(teamMatch => {
      players.push({
        isUser: teamMatch.participantId === match.participantId,
        name: teamMatch.summonerName,
        championId: teamMatch.championId
      });
    });

    return players.map((player, index) => {
      let textStyle = 'match__players-text';
      if (player.isUser) textStyle += ' match__players-text_user';
      let src;
      if (props.champions[player.championId]) {
        const champ = props.champions[player.championId];
        src = champ._full;
      } else {
        src = items[3637] ? items[3637]._full : '';
      }

      return (
        <div key={index} className="match__players-player">
          <img className="match__players-image" alt="champion" src={src} />
          <div className={textStyle}>{`${player.name}`}</div>
        </div>
      );
    });
  };

  return (
    <div className="match__players-container">
      <div className="match__players">
        <div className="match__players-group">{renderTeam(100)}</div>
        <div className="match__players-group">{renderTeam(200)}</div>
      </div>
    </div>
  );
};

export default Players;
