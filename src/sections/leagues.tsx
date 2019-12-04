import React, { useState, useEffect } from 'react';
import { Spin, Icon, Alert } from 'antd';

import { RankTable } from '../components/RankTable';
import { capitalize } from '../helpers/capitalize';
import { getLeaderboard } from '../services/getLeaderboard';

type Division = 'master' | 'diamond' | 'gold' | 'silver';
type League = Record<Division, any[]>;
const antIcon = (
  <Icon type="loading" style={{ fontSize: 32, color: '#09d3ac' }} spin />
);

const _mapLeague = (league: League) =>
  Object.entries(league).map(([division, rankTable]) => (
    <div key={division}>
      <h3 className="division-title">{capitalize(division)}</h3>
      {rankTable.length ? (
        <RankTable dataSource={rankTable} />
      ) : (
        <p className="division-message">No participant in this division yet.</p>
      )}
    </div>
  ));

export const Leagues: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [league, setLeague] = useState<League>({
    master: [],
    diamond: [],
    gold: [],
    silver: []
  });

  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      !didCancel && setLoading(true);
      try {
        const league = await getLeaderboard();
        !didCancel && setLeague(league);
      } catch (error) {
        setError(error);
      } finally {
        !didCancel && setLoading(false);
      }
    }
    fetchData();
    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <div className="leagues">
      {error && (
        <Alert
          message="Error fetching leaderboard."
          description="Ranking service might be down, please check the official leaderboard."
          type="error"
          className="error"
        />
      )}
      {loading ? (
        <Spin className="loader" indicator={antIcon} />
      ) : (
        _mapLeague(league)
      )}
    </div>
  );
};
