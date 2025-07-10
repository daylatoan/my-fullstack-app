import React, { useEffect, useState } from 'react';


export default function Football() {
  const [teams, setTeams] = useState<string[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [teamName, setTeamName] = useState('');
  const [roundCount, setRoundCount] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    const storedMatches = JSON.parse(localStorage.getItem('matches') || '[]');
    setTeams(storedTeams);
    setMatches(storedMatches);
  }, []);

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
    localStorage.setItem('matches', JSON.stringify(matches));
  }, [teams, matches]);

  const showMessage = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const addTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const name = teamName.trim();
    if (!name) return;
    if (teams.includes(name)) {
      alert('⚠️ Đội này đã tồn tại!');
      return;
    }
    const updated = [...teams, name];
    setTeams(updated);
    setTeamName('');
    showMessage(`✅ Đã thêm đội "${name}"`);
  };

  const resetTournament = () => {
    if (confirm('⚠️ Bạn chắc chắn muốn reset toàn bộ giải đấu?')) {
      localStorage.clear();
      setTeams([]);
      setMatches([]);
    }
  };

  const generateSchedule = () => {
    if (teams.length < 2) {
      alert('⚠️ Cần ít nhất 2 đội!');
      return;
    }
    const newMatches = roundRobin(teams, roundCount).flat();
    setMatches(newMatches);
    showMessage('✅ Đã tạo lịch thi đấu!');
  };

  const roundRobin = (teamList: string[], repeat: number) => {
    let ts = [...teamList];
    if (ts.length % 2) ts.push('🏳️ Nghỉ');
    const n = ts.length;
    const baseRounds: any[] = [];
    for (let r = 0; r < n - 1; r++) {
      const round: any[] = [];
      for (let i = 0; i < n / 2; i++) {
        const home = ts[i];
        const away = ts[n - 1 - i];
        if (home !== '🏳️ Nghỉ' && away !== '🏳️ Nghỉ') {
          round.push({ home, away, scoreA: '', scoreB: '' });
        }
      }
      baseRounds.push(round);
      ts.splice(1, 0, ts.pop() as string);
    }
    const all: any[] = [];
    for (let i = 0; i < repeat; i++) {
      const rotated = baseRounds.map(r =>
        r.map(m =>
          i % 2 === 0
            ? { ...m }
            : { home: m.away, away: m.home, scoreA: '', scoreB: '' }
        )
      );
      all.push(...rotated);
    }
    return all;
  };

  const saveScore = (roundIndex: number, matchIndex: number, sA: string, sB: string) => {
    const index = roundIndex * Math.floor(teams.length / 2) + matchIndex;
    const updated = [...matches];
    updated[index].scoreA = parseInt(sA);
    updated[index].scoreB = parseInt(sB);
    setMatches(updated);
    showMessage('✅ Đã lưu kết quả!');
  };

  const calculateRanking = () => {
    const stats: any = {};
    teams.forEach(t => stats[t] = {
      name: t, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, points: 0
    });
    matches.forEach(m => {
      if (m.scoreA === '' || m.scoreB === '') return;
      const A = stats[m.home], B = stats[m.away];
      const sa = m.scoreA, sb = m.scoreB;
      A.gf += sa; A.ga += sb;
      B.gf += sb; B.ga += sa;
      if (sa > sb) {
        A.wins++; A.points += 3; B.losses++;
      } else if (sa < sb) {
        B.wins++; B.points += 3; A.losses++;
      } else {
        A.draws++; B.draws++; A.points++; B.points++;
      }
    });
    return Object.values(stats).sort((a: any, b: any) =>
      b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga)
    );
  };

  const rankings = calculateRanking();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🏆 Giải đấu bóng đá</h1>
        <p>Quản lý giải đấu chuyên nghiệp</p>
        {successMessage && <div style={styles.success}>{successMessage}</div>}
      </div>

      <form onSubmit={addTeam} style={styles.formGroup}>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Nhập tên đội bóng..."
          style={styles.input}
          required
        />
        <button type="submit" style={styles.btnPrimary}>➕ Thêm đội</button>
        <button type="button" style={styles.btnSecondary} onClick={resetTournament}>🔄 Reset</button>
      </form>

      <h2 style={styles.sectionTitle}>Danh sách đội tham gia</h2>
      <ul>
        {teams.length === 0 ? (
          <li style={{ fontStyle: 'italic', color: '#888' }}>Chưa có đội</li>
        ) : (
          teams.map((t, i) => <li key={i}>{i + 1}. {t}</li>)
        )}
      </ul>

      <div style={{ marginTop: 20 }}>
        <label>Số lượt thi đấu: </label>
        <select value={roundCount} onChange={e => setRoundCount(parseInt(e.target.value))}>
          {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} lượt</option>)}
        </select>
        <button style={{ ...styles.btnPrimary, marginLeft: 10 }} onClick={generateSchedule}>⚽ Tạo lịch</button>
      </div>

      {matches.length > 0 && (
        <>
          <h2 style={styles.sectionTitle}>Lịch thi đấu</h2>
          {(() => {
            const rounds: any[][] = [];
            matches.forEach((m, i) => {
              const roundIdx = Math.floor(i / Math.floor(teams.length / 2));
              if (!rounds[roundIdx]) rounds[roundIdx] = [];
              rounds[roundIdx].push(m);
            });
            return rounds.map((round, idx) => (
              <div key={idx} style={styles.round}>
                <h3>⚽ Vòng {idx + 1}</h3>
                {round.map((m, i) => (
                  <div key={i} style={styles.matchItem}>
                    <span style={styles.teamName}>{m.home}</span>
                    <input type="number" min={0} defaultValue={m.scoreA}
                      onChange={e => m.scoreA = e.target.value}
                      style={styles.scoreInput} />
                    <span style={styles.vs}>VS</span>
                    <input type="number" min={0} defaultValue={m.scoreB}
                      onChange={e => m.scoreB = e.target.value}
                      style={styles.scoreInput} />
                    <span style={styles.teamName}>{m.away}</span>
                    <button style={styles.saveBtn}
                      onClick={() => saveScore(idx, i, m.scoreA, m.scoreB)}>💾</button>
                  </div>
                ))}
              </div>
            ));
          })()}
        </>
      )}

      <h2 style={styles.sectionTitle}>Bảng xếp hạng</h2>
      <table style={{ width: '100%', marginTop: 10, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Hạng</th><th>Đội</th><th>Thắng</th><th>Hòa</th><th>Thua</th>
            <th>BT</th><th>BB</th><th>HS</th><th>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {!rankings || rankings.length === 0 || rankings.every((r: any) => r.points === 0) ? (
            <tr><td colSpan={9} style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>Chưa có kết quả</td></tr>
          ) : (
            rankings.map((r: any, i: number) => (
              <tr key={i}>
                <td>{i + 1}</td><td>{r.name}</td><td>{r.wins}</td><td>{r.draws}</td><td>{r.losses}</td>
                <td>{r.gf}</td><td>{r.ga}</td><td>{r.gf - r.ga}</td><td>{r.points}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 960,
    margin: '40px auto',
    padding: '30px',
    background: '#ffffff',
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    fontFamily: '"Segoe UI", sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
  },
  formGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '12px 16px',
    fontSize: 16,
    border: '1px solid #ccc',
    borderRadius: 8,
  },
  btnPrimary: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '12px 18px',
    fontSize: 16,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: '0.3s',
  },
  btnSecondary: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: '12px 18px',
    fontSize: 16,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: '0.3s',
  },
  sectionTitle: {
    marginTop: 40,
    fontSize: 22,
    color: '#333',
    borderLeft: '6px solid #4CAF50',
    paddingLeft: 14,
    marginBottom: 12,
  },
  success: {
    marginTop: 14,
    padding: '12px 16px',
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: 8,
    fontSize: 15,
  },
  round: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    border: '1px solid #ddd',
    marginBottom: 16,
  },
  matchItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: 12,
  },
  teamName: {
    flex: 1,
    fontWeight: 600,
    color: '#444',
  },
  scoreInput: {
    width: 60,
    padding: '8px',
    textAlign: 'center',
    fontSize: 16,
    border: '1px solid #ccc',
    borderRadius: 6,
  },
  vs: {
    fontWeight: 600,
    color: '#333',
  },
  saveBtn: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 15,
  },
};
