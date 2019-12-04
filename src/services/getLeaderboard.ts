const LEADERBOADR_URL = process.env.NODE_ENV === 'production'
  ? 'https://us-central1-oussa-io.cloudfunctions.net/loc-core-getLeagueInterface'
  : 'http://localhost:8080';

export const getLeaderboard = async () => {
  const response = await fetch(LEADERBOADR_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to get the leaderboard:\n${response.status} ${response.statusText}`
    );
  }

  return response.json();
};
