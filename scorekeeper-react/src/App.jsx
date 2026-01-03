import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const COLORS = [
  '#4A90E2', '#E74C3C', '#27AE60', '#F39C12',
  '#9B59B6', '#E91E63', '#F1C40F', '#95A5A6'
];

const DEFAULT_PLAYERS = [
  { name: 'Raymond', color: '#4A90E2', score: 0 },
  { name: 'Chloe', color: '#E85D5D', score: 0 },
  { name: 'Alan', color: '#27AE60', score: 0 }
];

function App() {
  const [players, setPlayers] = useState(() => {
    try {
      const saved = localStorage.getItem('scorekeeperData');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.players && Array.isArray(data.players) && data.players.length > 0) {
          return data.players;
        }
      }
    } catch (e) {
      console.error('Error loading data', e);
    }
    return DEFAULT_PLAYERS;
  });

  const [showSettings, setShowSettings] = useState(false);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('scorekeeperData', JSON.stringify({ players }));
  }, [players]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
    }
  };

  const playSound = () => {
    initAudio();
    const audioCtx = audioCtxRef.current;
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // Sweet Major Pentatonic Scale
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const frequency = notes[Math.floor(Math.random() * notes.length)];
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    const now = audioCtx.currentTime;
    // Gentle bell-like envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    oscillator.start(now);
    oscillator.stop(now + 0.5);
  };

  // Prevent double click zoom
  useEffect(() => {
    const handleDblClick = (e) => e.preventDefault();
    document.addEventListener('dblclick', handleDblClick, { passive: false });
    return () => document.removeEventListener('dblclick', handleDblClick);
  }, []);

  const addScore = (index, points) => {
    playSound();
    setPlayers(prev => {
        const newPlayers = [...prev];
        let newScore = Math.round((newPlayers[index].score + points) * 10) / 10;
        if (newScore < 0) newScore = 0;
        newPlayers[index] = { ...newPlayers[index], score: newScore };
        return newPlayers;
    });
  };

  const resetScores = () => {
    playSound();
    if (confirm('Reset all scores to 0?')) {
        setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));
    }
  };

  const toggleSettings = () => {
    playSound();
    setShowSettings(!showSettings);
  };

  const updatePlayerName = (index, name) => {
    setPlayers(prev => {
        const newPlayers = [...prev];
        newPlayers[index] = { ...newPlayers[index], name };
        return newPlayers;
    });
  };

  const updatePlayerColor = (index, color) => {
    setPlayers(prev => {
        const newPlayers = [...prev];
        newPlayers[index] = { ...newPlayers[index], color };
        return newPlayers;
    });
  };

  const addPlayer = () => {
    playSound();
    const newIndex = players.length;
    const color = COLORS[newIndex % COLORS.length];
    setPlayers(prev => [
        ...prev, 
        { name: `Player ${newIndex + 1}`, color, score: 0 }
    ]);
  };

  const removePlayer = (index) => {
    if (players.length <= 1) return;
    if (!confirm('Remove this player?')) return;
    setPlayers(prev => prev.filter((_, i) => i !== index));
  };

  const movePlayer = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= players.length) return;
    
    playSound();
    setPlayers(prev => {
        const newPlayers = [...prev];
        const temp = newPlayers[index];
        newPlayers[index] = newPlayers[newIndex];
        newPlayers[newIndex] = temp;
        return newPlayers;
    });
  };

  const handleSectionClick = (e, index) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    addScore(index, 1);
  };

  return (
    <div id="app">
      <div className="top-bar">
        <button className="top-btn" onClick={resetScores}>Reset</button>
        <button className="top-btn settings-btn" onClick={toggleSettings}>
            {showSettings ? '✓ Done' : '⚙ Settings'}
        </button>
      </div>

      {!showSettings ? (
        <div className="game-screen">
          <div className="players-container">
            {players.map((player, index) => (
               <div 
                 key={index}
                 className="player-section" 
                 style={{ background: player.color }} 
                 onClick={(e) => handleSectionClick(e, index)}
               >
                 <div className="player-content">
                   <div className="player-info">
                     <div className="player-avatar">
                       <div className="player-avatar-icon"></div>
                     </div>
                     <div className="player-name">{player.name}</div>
                   </div>
                   <div className="player-score">{player.score}</div>
                   <div className="player-controls">
                     <button className="minus-btn" onClick={() => addScore(index, -1)}>−</button>
                     <div className="score-buttons-row">
                       <div className="score-row">
                         <button className="score-btn" onClick={() => addScore(index, -0.5)}>-0.5</button>
                         <button className="score-btn" onClick={() => addScore(index, 0.5)}>+0.5</button>
                       </div>
                       <div className="score-row">
                        <button className="score-btn" onClick={() => addScore(index, 1)}>+1</button>
                        <button className="score-btn" onClick={() => addScore(index, 1.5)}>+1.5</button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="settings-screen">
            <div className="settings-header">
                <div className="settings-title">Settings</div>
            </div>
            <div className="settings-content">
                {players.map((player, index) => (
                    <div className="settings-section" key={index}>
                         <div className="section-label" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <span>PLAYER {index + 1} SETTINGS</span>
                            <div style={{display:'flex', alignItems:'center', gap: '5px'}}>
                                {index > 0 ? <button className="move-btn" onClick={() => movePlayer(index, -1)}>↑</button> : <div style={{width:'30px'}}></div>}
                                {index < players.length - 1 ? <button className="move-btn" onClick={() => movePlayer(index, 1)}>↓</button> : <div style={{width:'30px'}}></div>}
                                {players.length > 1 && <button className="remove-player-btn" onClick={() => removePlayer(index)}>Remove</button>}
                            </div>
                        </div>
                        <div className="settings-card">
                             <div className="player-settings-title" style={{color: player.color}}>Player {index + 1}</div>
                             <div className="setting-group">
                                 <div className="setting-label">Name</div>
                                 <input 
                                    type="text" 
                                    className="setting-input" 
                                    value={player.name}
                                    onChange={(e) => updatePlayerName(index, e.target.value)}
                                 />
                             </div>
                             <div className="setting-group">
                                 <div className="setting-label">Background Color</div>
                                 <div className="color-picker">
                                     {COLORS.map(c => (
                                         <div 
                                            key={c}
                                            className={`color-option ${c === player.color ? 'selected' : ''}`}
                                            style={{background: c}}
                                            onClick={() => updatePlayerColor(index, c)}
                                         ></div>
                                     ))}
                                 </div>
                             </div>
                        </div>
                    </div>
                ))}
                <button className="add-player-btn" onClick={addPlayer}>+ Add Player</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
