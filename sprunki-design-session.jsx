import { useState, useEffect } from "react";

const SOURCE_CHARACTERS = [
  { name: "Robo", color: "#C0C0C0", accent: "#FFB300", head: "rect", trait: "Robot with screen eyes", emoji: "🤖" },
  { name: "Violex", color: "#9B27AF", accent: "#CE93D8", head: "round", trait: "Purple demon with horns", emoji: "😈" },
  { name: "Cobalt", color: "#1A237E", accent: "#3949AB", head: "round", trait: "Deep blue sphere head", emoji: "🔵" },
  { name: "Lunara", color: "#E0E0E0", accent: "#BDBDBD", head: "round", trait: "White unicorn spirit", emoji: "🦄" },
  { name: "Solara", color: "#FFD600", accent: "#FF6F00", head: "sun", trait: "Yellow sun with antenna", emoji: "☀️" },
  { name: "Beatbox", color: "#E65100", accent: "#FFB74D", head: "round", trait: "Orange DJ with headphones", emoji: "🎧" },
  { name: "Crimzon", color: "#B71C1C", accent: "#EF5350", head: "round", trait: "Red devil with horns", emoji: "👿" },
  { name: "Zesty", color: "#AEEA00", accent: "#76FF03", head: "crown", trait: "Lime green crown head", emoji: "👑" },
  { name: "Aqua", color: "#80DEEA", accent: "#00BCD4", head: "round", trait: "Light blue bubbly face", emoji: "💧" },
  { name: "Graymatter", color: "#9E9E9E", accent: "#616161", head: "round", trait: "Stoic gray observer", emoji: "🌫️" },
  { name: "Sunny", color: "#FFEE58", accent: "#F57F17", head: "sun", trait: "Happy sunshine face", emoji: "😄" },
  { name: "Treevil", color: "#2E7D32", accent: "#8D6E63", head: "tree", trait: "Mysterious tree creature", emoji: "🌳" },
  { name: "Lula", color: "#F8BBD0", accent: "#EC407A", head: "round", trait: "Soft pink dreamgirl", emoji: "🌸" },
  { name: "Bloop", color: "#4FC3F7", accent: "#0288D1", head: "round", trait: "Tiny blue surprised face", emoji: "😮" },
  { name: "Foxbit", color: "#C62828", accent: "#FF8A65", head: "round", trait: "Red fox with big eyes", emoji: "🦊" },
  { name: "Flora", color: "#66BB6A", accent: "#FF80AB", head: "flower", trait: "Green girl with flower hair", emoji: "🌺" },
  { name: "Blanc", color: "#F5F5F5", accent: "#E0E0E0", head: "round", trait: "Pale serene smile", emoji: "🤍" },
  { name: "Magenta", color: "#E91E63", accent: "#FF4081", head: "round", trait: "Bold pink with magenta brows", emoji: "💗" },
];

function SprunkiSVG({ character, size = 90 }) {
  const { color, accent, head } = character;
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} xmlns="http://www.w3.org/2000/svg">
      {/* Sky BG */}
      <rect width={s} height={s} rx="12" fill="#87CEEB"/>
      <rect y={s*0.65} width={s} height={s*0.35} rx="0" fill="#4CAF50"/>
      {/* Body */}
      <rect x={cx-s*0.12} y={cy+s*0.18} width={s*0.24} height={s*0.28} rx="4" fill={color}/>
      {/* Head */}
      {head === "rect" ? (
        <rect x={cx-s*0.22} y={cy-s*0.3} width={s*0.44} height={s*0.44} rx="8" fill={accent}/>
      ) : head === "sun" ? (
        <>
          {[0,45,90,135,180,225,270,315].map((a,i)=>(
            <line key={i}
              x1={cx + Math.cos(a*Math.PI/180)*s*0.28}
              y1={cy - s*0.08 + Math.sin(a*Math.PI/180)*s*0.28}
              x2={cx + Math.cos(a*Math.PI/180)*s*0.35}
              y2={cy - s*0.08 + Math.sin(a*Math.PI/180)*s*0.35}
              stroke={accent} strokeWidth="4" strokeLinecap="round"/>
          ))}
          <circle cx={cx} cy={cy-s*0.08} r={s*0.22} fill={color}/>
        </>
      ) : head === "crown" ? (
        <>
          <polygon points={`${cx},${cy-s*0.38} ${cx-s*0.12},${cy-s*0.22} ${cx+s*0.12},${cy-s*0.22}`} fill={accent}/>
          <polygon points={`${cx-s*0.18},${cy-s*0.3} ${cx-s*0.28},${cy-s*0.15} ${cx-s*0.06},${cy-s*0.15}`} fill={accent}/>
          <polygon points={`${cx+s*0.18},${cy-s*0.3} ${cx+s*0.28},${cy-s*0.15} ${cx+s*0.06},${cy-s*0.15}`} fill={accent}/>
          <circle cx={cx} cy={cy-s*0.08} r={s*0.22} fill={color}/>
        </>
      ) : head === "tree" ? (
        <>
          <ellipse cx={cx} cy={cy-s*0.18} rx={s*0.26} ry={s*0.28} fill={color}/>
        </>
      ) : head === "flower" ? (
        <>
          {[0,60,120,180,240,300].map((a,i)=>(
            <circle key={i}
              cx={cx + Math.cos(a*Math.PI/180)*s*0.24}
              cy={cy - s*0.08 + Math.sin(a*Math.PI/180)*s*0.24}
              r={s*0.09} fill={accent} opacity="0.8"/>
          ))}
          <circle cx={cx} cy={cy-s*0.08} r={s*0.22} fill={color}/>
        </>
      ) : (
        <circle cx={cx} cy={cy-s*0.08} r={s*0.22} fill={color}/>
      )}
      {/* Eyes */}
      {head === "rect" ? (
        <>
          <rect x={cx-s*0.15} y={cy-s*0.16} width={s*0.1} height={s*0.14} rx="3" fill="#00BCD4"/>
          <rect x={cx+s*0.05} y={cy-s*0.16} width={s*0.1} height={s*0.14} rx="3" fill="#00BCD4"/>
        </>
      ) : (
        <>
          <circle cx={cx-s*0.1} cy={cy-s*0.1} r={s*0.08} fill="white"/>
          <circle cx={cx+s*0.1} cy={cy-s*0.1} r={s*0.08} fill="white"/>
          <circle cx={cx-s*0.1} cy={cy-s*0.09} r={s*0.05} fill="#1a1a1a"/>
          <circle cx={cx+s*0.1} cy={cy-s*0.09} r={s*0.05} fill="#1a1a1a"/>
        </>
      )}
      {/* Smile */}
      <path d={`M ${cx-s*0.08} ${cy+s*0.06} Q ${cx} ${cy+s*0.13} ${cx+s*0.08} ${cy+s*0.06}`} stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function GeneratedSprunkiCard({ character }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      border: `2px solid ${character.color}`,
      borderRadius: "16px",
      padding: "16px",
      textAlign: "center",
      boxShadow: `0 0 20px ${character.color}44`,
      animation: "popIn 0.4s cubic-bezier(.175,.885,.32,1.275)",
      minWidth: "140px",
      maxWidth: "160px",
    }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
        <SprunkiSVG character={character} size={100} />
      </div>
      <div style={{
        fontFamily: "'Fredoka One', cursive",
        fontSize: "18px",
        color: character.color,
        textShadow: `0 0 10px ${character.color}88`,
        marginBottom: "4px",
      }}>{character.name}</div>
      <div style={{
        fontFamily: "'Nunito', sans-serif",
        fontSize: "11px",
        color: "#aaa",
        lineHeight: 1.3,
      }}>{character.trait}</div>
      <div style={{ fontSize: "20px", marginTop: "6px" }}>{character.emoji}</div>
    </div>
  );
}

function SourceCard({ character }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      cursor: "default",
    }}>
      <SprunkiSVG character={character} size={64} />
      <span style={{
        fontFamily: "'Fredoka One', cursive",
        fontSize: "11px",
        color: character.color,
        textShadow: `0 0 6px ${character.color}88`,
      }}>{character.name}</span>
    </div>
  );
}

const PALETTES = [
  { color: "#FF6B9D", accent: "#FFB3D1", head: "round", emoji: "🌷" },
  { color: "#00E5FF", accent: "#84FFFF", head: "round", emoji: "❄️" },
  { color: "#FFD740", accent: "#FFAB00", head: "sun", emoji: "⚡" },
  { color: "#69F0AE", accent: "#00E676", head: "crown", emoji: "🌿" },
  { color: "#EA80FC", accent: "#CE93D8", head: "round", emoji: "🔮" },
  { color: "#FF6E40", accent: "#FFAB40", head: "round", emoji: "🔥" },
  { color: "#40C4FF", accent: "#80D8FF", head: "round", emoji: "🌊" },
  { color: "#B9F6CA", accent: "#69F0AE", head: "flower", emoji: "🍃" },
  { color: "#FF4081", accent: "#FF80AB", head: "round", emoji: "💖" },
  { color: "#CCFF90", accent: "#B2FF59", head: "crown", emoji: "🌱" },
  { color: "#CFD8DC", accent: "#90A4AE", head: "round", emoji: "🌙" },
  { color: "#FFCCBC", accent: "#FFAB91", head: "round", emoji: "🍑" },
];

const SPRUNKI_NAMES = [
  "Noxie", "Zephyr", "Lumix", "Throx", "Vela", "Brixby", "Skyla", "Gloom",
  "Prism", "Wubble", "Fizix", "Daze", "Ember", "Crestix", "Mochi", "Vortex",
  "Shiver", "Glitchie", "Neonix", "Pulsar", "Driftly", "Hazel", "Crux", "Wobble",
  "Splotch", "Zinnia", "Radix", "Fumble", "Twirlix", "Blaze", "Nexus", "Pebble",
];

const TRAITS = [
  "Moonlit wanderer who hums in reverb",
  "Tiny chaos gremlin full of glitchy beats",
  "Serene stargazer with echo powers",
  "Disco phantom born from neon lights",
  "Ancient forest singer with pollen voice",
  "Thundercloud drummer who rattles windows",
  "Bubble-pop dancer made of soap physics",
  "Deep sea crooner with bioluminescent glow",
  "Candy-core beatmaker with sugar rush energy",
  "Shadow weaver who drops bass in the dark",
  "Crystal cave dweller with harmonic resonance",
  "Funky time traveler stuck in the groove",
  "Volcanic beatboxer with lava lungs",
  "Frozen tundra rapper with ice-cold flow",
  "Garden sprite whose laugh sounds like wind chimes",
  "Midnight radio host broadcasting from dreams",
];

export default function SprunkiDesignSession() {
  const [generated, setGenerated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usedNames, setUsedNames] = useState(new Set());
  const [usedTraits, setUsedTraits] = useState(new Set());

  const pickRandom = (arr, used) => {
    const available = arr.filter(x => !used.has(x));
    if (available.length === 0) return arr[Math.floor(Math.random() * arr.length)];
    return available[Math.floor(Math.random() * available.length)];
  };

  const generateCharacter = async () => {
    setLoading(true);
    try {
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const name = pickRandom(SPRUNKI_NAMES, usedNames);
      const trait = pickRandom(TRAITS, usedTraits);

      setUsedNames(prev => new Set([...prev, name]));
      setUsedTraits(prev => new Set([...prev, trait]));

      const newChar = { ...palette, name, trait };
      setGenerated(prev => [newChar, ...prev]);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const generateBatch = async () => {
    setLoading(true);
    const batch = [];
    const newUsedNames = new Set(usedNames);
    const newUsedTraits = new Set(usedTraits);

    for (let i = 0; i < 6; i++) {
      const palette = PALETTES[i % PALETTES.length];
      const name = pickRandom(SPRUNKI_NAMES, newUsedNames);
      const trait = pickRandom(TRAITS, newUsedTraits);
      newUsedNames.add(name);
      newUsedTraits.add(trait);
      batch.push({ ...palette, name, trait });
    }

    setUsedNames(newUsedNames);
    setUsedTraits(newUsedTraits);
    setGenerated(prev => [...batch, ...prev]);
    setLoading(false);
  };

  const clearAll = () => {
    setGenerated([]);
    setUsedNames(new Set());
    setUsedTraits(new Set());
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0a1a 0%, #0f0f2e 50%, #1a0a2e 100%)",
      fontFamily: "'Nunito', sans-serif",
      padding: "20px",
      boxSizing: "border-box",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;900&display=swap');
        @keyframes popIn {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 20px #ff6b9d88; }
          50% { box-shadow: 0 0 40px #ff6b9dcc; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .gen-btn:hover { transform: scale(1.05); }
        .gen-btn:active { transform: scale(0.97); }
        .source-card:hover { transform: scale(1.1); }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: "clamp(28px, 6vw, 48px)",
          background: "linear-gradient(90deg, #ff6b9d, #c44dff, #4d9fff, #ff6b9d)",
          backgroundSize: "200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "pulse 3s infinite",
          letterSpacing: "2px",
        }}>
          🎵 SPRUNKI DESIGN SESSION 🎵
        </div>
        <p style={{ color: "#8888aa", fontSize: "13px", marginTop: "4px" }}>
          Generate new Sprunki characters based on your roster
        </p>
      </div>

      {/* Source Roster */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "24px",
      }}>
        <div style={{
          fontFamily: "'Fredoka One', cursive",
          color: "#c44dff",
          fontSize: "16px",
          marginBottom: "12px",
          textAlign: "center",
          letterSpacing: "1px",
        }}>📸 SOURCE ROSTER — {SOURCE_CHARACTERS.length} characters detected</div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
        }}>
          {SOURCE_CHARACTERS.map((c, i) => (
            <div key={i} className="source-card" style={{ transition: "transform 0.2s" }}>
              <SourceCard character={c} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
        <button
          className="gen-btn"
          onClick={generateCharacter}
          disabled={loading}
          style={{
            background: "linear-gradient(135deg, #ff6b9d, #c44dff)",
            border: "none",
            borderRadius: "50px",
            padding: "14px 28px",
            color: "white",
            fontFamily: "'Fredoka One', cursive",
            fontSize: "16px",
            cursor: "pointer",
            transition: "transform 0.15s",
            boxShadow: "0 4px 20px #c44dff44",
            letterSpacing: "1px",
          }}>
          {loading ? "✨ Generating..." : "✨ NEW SPRUNKI"}
        </button>
        <button
          className="gen-btn"
          onClick={generateBatch}
          disabled={loading}
          style={{
            background: "linear-gradient(135deg, #4d9fff, #00e5ff)",
            border: "none",
            borderRadius: "50px",
            padding: "14px 28px",
            color: "white",
            fontFamily: "'Fredoka One', cursive",
            fontSize: "16px",
            cursor: "pointer",
            transition: "transform 0.15s",
            boxShadow: "0 4px 20px #4d9fff44",
            letterSpacing: "1px",
          }}>
          🎲 BATCH × 6
        </button>
        {generated.length > 0 && (
          <button
            className="gen-btn"
            onClick={clearAll}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50px",
              padding: "14px 28px",
              color: "#888",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "16px",
              cursor: "pointer",
              transition: "transform 0.15s",
            }}>
            🗑 CLEAR
          </button>
        )}
      </div>

      {/* Counter */}
      {generated.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <span style={{
            fontFamily: "'Fredoka One', cursive",
            color: "#69f0ae",
            fontSize: "14px",
          }}>
            {generated.length} new Sprunki{generated.length !== 1 ? "s" : ""} designed! 🎉
          </span>
        </div>
      )}

      {/* Generated Characters */}
      {generated.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "48px 24px",
          color: "#444466",
          fontFamily: "'Fredoka One', cursive",
          fontSize: "18px",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px", animation: "float 2s ease-in-out infinite" }}>🎵</div>
          Hit "New Sprunki" to generate characters!
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}>
          {generated.map((char, i) => (
            <GeneratedSprunkiCard key={i} character={char} />
          ))}
        </div>
      )}
    </div>
  );
}
