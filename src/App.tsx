import { useState } from "react";

function Menu({ setView }: { setView: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <button onClick={() => setView("feed")}>Debates en vivo</button>
      <button onClick={() => setView("past")}>Debates pasados</button>
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

function Feed({ onSelect }: { onSelect: (id: number) => void }) {
  const debates = [
    { id: 1, title: "IA vs Regulación", live: true },
    { id: 2, title: "Capitalismo vs Socialismo", live: false },
  ];

  return (
    <div className="p-4 flex flex-col gap-4">
      {debates.map((d) => (
        <div
          key={d.id}
          onClick={() => onSelect(d.id)}
          className="bg-gray-800 p-4 rounded-xl"
        >
          <h2>{d.title}</h2>
          <p className="text-sm text-gray-400">
            {d.live ? "🔴 En vivo" : "Finalizado"}
          </p>
        </div>
      ))}
    </div>
  );
}

function DebateView() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="bg-gray-800 h-52 rounded-xl flex items-center justify-center">
        Video principal
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {[1, 2, 3].map((p) => (
          <div
            key={p}
            className="bg-gray-700 w-24 h-24 rounded-xl flex items-center justify-center"
          >
            P{p}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-gray-800 p-3 rounded-xl">
          <p className="font-semibold">Usuario</p>
          <p className="text-sm text-gray-300">
            Argumento del debate...
          </p>
        </div>
      </div>
    </div>
  );
}

function CreateRoom() {
  return (
    <div className="p-4 flex flex-col gap-3">
      <input placeholder="Nombre sala" className="p-2 bg-gray-800 rounded" />
      <input placeholder="Título debate" className="p-2 bg-gray-800 rounded" />

      <select className="p-2 bg-gray-800 rounded">
        <option>2 participantes</option>
        <option>4 participantes</option>
        <option>8 participantes</option>
      </select>

      <select className="p-2 bg-gray-800 rounded">
        <option>Por tiempo</option>
        <option>Por turnos</option>
      </select>

      <button className="bg-blue-600 p-3 rounded-xl">Crear sala</button>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("feed");
  const [menuOpen, setMenuOpen] = useState(false);
  const [debate, setDebate] = useState<number | null>(null);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Header toggleMenu={() => setMenuOpen(!menuOpen)} />

      {menuOpen && <Menu setView={setView} />}

      {!debate && view === "feed" && (
        <Feed onSelect={(id) => setDebate(id)} />
      )}

      {debate && <DebateView />}

      {view === "create" && <CreateRoom />}
    </div>
  );
}
