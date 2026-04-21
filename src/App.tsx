import { useEffect, useState } from "react";

const API_URL = "https://debathea-1.onrender.com";

type Debate = {
  _id: string;
  title: string;
  isLive: boolean;
  views: number;
};

function Menu({ setView }: { setView: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <button onClick={() => setView("feed")}>Debates en vivo</button>
      <button onClick={() => setView("analysis")}>Análisis</button>
      <button onClick={() => setView("create")}>Crear sala</button>
    </div>
  );
}

function Header({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-900">
      <button onClick={toggleMenu}>☰</button>
      <h1 className="font-bold">Debathea</h1>
      <div />
    </div>
  );
}

function Feed({ onSelect }: { onSelect: (id: string) => void }) {
  const [debates, setDebates] = useState<Debate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/debates`)
      .then((res) => res.json())
      .then((data) => {
        setDebates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando debates:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Cargando debates...</p>;

  return (
    <div className="p-4 flex flex-col gap-4">
      {debates.map((d) => (
        <div
          key={d._id}
          onClick={() => onSelect(d._id)}
          className="bg-gray-800 p-4 rounded-xl"
        >
          <h2>{d.title}</h2>
          <p className="text-sm text-gray-400">
            {d.isLive ? "🔴 En vivo" : "Finalizado"} • {d.views} views
          </p>
        </div>
      ))}
    </div>
  );
}

function DebateView({ id }: { id: string }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Debate ID: {id}</h2>
      <p className="text-gray-400">
        Próximo paso: cargar argumentos reales
      </p>
    </div>
  );
}

function CreateRoom() {
  const [title, setTitle] = useState("");

  const createRoom = async () => {
    try {
      await fetch(`${API_URL}/debates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          isLive: true,
          views: 0,
        }),
      });

      alert("Sala creada");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      <input
        placeholder="Título debate"
        className="p-2 bg-gray-800 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={createRoom}
        className="bg-blue-600 p-3 rounded-xl"
      >
        Crear sala
      </button>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("feed");
  const [menuOpen, setMenuOpen] = useState(false);
  const [debateId, setDebateId] = useState<string | null>(null);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Header toggleMenu={() => setMenuOpen(!menuOpen)} />

      {menuOpen && <Menu setView={setView} />}

      {!debateId && view === "feed" && (
        <Feed onSelect={(id) => setDebateId(id)} />
      )}

      {debateId && <DebateView id={debateId} />}

      {view === "create" && <CreateRoom />}
    </div>
  );
}