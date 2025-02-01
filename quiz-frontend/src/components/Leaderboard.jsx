// src/components/Leaderboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/leaderboard')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  // Rank icons for the top 3 players
  const getRankIcon = (rank) => {
    switch (rank) {
      case 0: return '🥇'; // 1st place
      case 1: return '🥈'; // 2nd place
      case 2: return '🥉'; // 3rd place
      default: return rank + 1; // Normal numbering
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6">
      <Navbar/>
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">🏆 Leaderboard</h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-700 text-white text-lg">
                <th className="py-3 px-6 text-left">Rank</th>
                <th className="py-3 px-6 text-left">Player</th>
                <th className="py-3 px-6 text-center">Score</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-blue-100 transition">
                    <td className="py-3 px-6 font-medium">{getRankIcon(index)}</td>
                    <td className="py-3 px-6">{user.username}</td>
                    <td className="py-3 px-6 text-center font-semibold">{user.score} pts</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-600">No scores available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
