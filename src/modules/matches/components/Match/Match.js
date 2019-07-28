import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Match.scss';
import { WIN } from '../../constants';
import { withRouter } from 'react-router-dom';
import Info from '../Info';
import Champ from '../Champ';
import Stats from '../Stats';
import Items from '../Items';
import Players from '../Players';
import Expand from '../../containers/Expand';
import Expansion from '../../../expansion/containers/Expansion';

class Match extends Component {
  state = {
    expanded: true
  };

  /**
   * Determines whether or not the user won the game.
   * @returns A boolean representing if the user won or not.
   */
  calculateWin = match => {
    const username = this.props.match.params.username.toLowerCase();
    for (let participant of match.participantIdentities) {
      const participantName = participant.player.summonerName.toLowerCase();
      if (username === participantName) {
        let team;
        if (participant.participantId < 6) team = match.teams[0];
        else team = match.teams[1];
        return team.win === WIN;
      }
    }
    return true;
  };

  /**
   * With the submitted username, find the corresponding participant index in the
   * array of participants.
   * @returns A number indicating the index of the user in the participants array.
   */
  calculateParticipantIndex = () => {
    const participantIdentities = this.props.game.participantIdentities;
    const username = this.props.match.params.username.toLowerCase();
    const length = participantIdentities.length;
    for (let i = 0; i < length; i++) {
      const participantName = participantIdentities[i].player.summonerName.toLowerCase();
      if (username === participantName) {
        return i;
      }
    }
    return 0;
  };

  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const username = this.props.match.params.username.toLowerCase();
    const userIndex = this.calculateParticipantIndex();
    const win = this.calculateWin(this.props.game);
    let matchStyle = 'match';
    if (win) matchStyle += ' match_win';
    else matchStyle += ' match_lose';

    let matchSummaryStyle = 'match__summary';
    if (win) matchSummaryStyle += ' match__summary_win';
    else matchSummaryStyle += ' match__summary_lose';

    return (
      <div className="match-container">
        <div className={matchStyle}>
          <div className={matchSummaryStyle}>
            <div className="match__summary-cell">
              <Info win={win} game={this.props.game} username={username} userIndex={userIndex} />
            </div>
            <div className="match__summary-cell">
              <Champ
                win={win}
                game={this.props.game}
                username={username}
                userIndex={userIndex}
                ddragon={this.props.ddragon}
                summoner={this.props.summoner}
                runes={this.props.runes}
              />
            </div>
            <div className="match__summary-cell">
              <Stats win={win} game={this.props.game} username={username} userIndex={userIndex} />
            </div>
            <div className="match__summary-cell">
              <Items
                win={win}
                items={this.props.items}
                game={this.props.game}
                username={username}
                userIndex={userIndex}
              />
            </div>
            <div className="match__summary-cell">
              <Players
                win={win}
                game={this.props.game}
                ddragon={this.props.ddragon}
                username={username}
                userIndex={userIndex}
              />
            </div>
            <div className="match__summary-cell">
              <Expand
                win={win}
                handleExpand={this.handleExpand}
                matchIndex={this.props.matchIndex}
              />
            </div>
          </div>
        </div>
        {this.state.expanded ? <Expansion matchIndex={this.props.matchIndex} /> : null}
      </div>
    );
  }
}

Match.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(Match);
