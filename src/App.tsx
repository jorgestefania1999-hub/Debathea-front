import { useState } from "react";

type Debate = {
  id: number;
  title: string;
  isLive: boolean;
  views: number;
};

type Argument = {
  id: number;
  user: string;
  content: string;
  upvotes: number;
  downvotes: number;
};

const debatesMock: Debate[] = [
  { id: 1, title: "¿La IA debería ser regulada?", isLive: true, views: 120 },
  { id: 2, title: "Capitalismo vs Socialismo", isLive: false, views: 340 },
];

const argumentsMock: Argument[] = [
  {
    id: 1,
    user: "Jorge",
    content: "La regulación es necesaria para evitar abusos.",
    upvotes: 10,
    downvotes: 2,
  },
  {
    id: 2,
    user: "Ana",
    content: "Demasiada regulación frena la innovación.",
    upvotes: 7,
    downvotes: 5,
  },
];

function VoteBox({
  upvotes,
  downvotes,
}: {
  upvotes: number;
  downvotes: number;
}) {
  const score = upvotes - downvotes;

  return (
    <div className="flex flex-col items-center text-sm">
      <button className="hover:text-green-400">▲</button>
      <span>{score}</span>
      <button className="hover:text-red-400">▼</button>
    </div>
  );
}

function Sidebar({ setView }: { setView: (v: string) => void }) {
  return (
    <div className="w-60 bg-gray-900 h-screen p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Debathea</h1>

      <button onClick={() => setView("feed")}>Debates en vivo</button>
      <button onClick={() => setView("past")}>Debates pasados</button>
      <button onClick={() => setView("analysis")}>Análisis</button>
      <button onClick={() => setView("create")}>Crear sala</button>
    </div>
  );
}

function Feed({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div className="p-6 flex flex-col gap-4">
      {debatesMock.map((d) => (
        <div
          key={d.id}
          className="bg-gray-800 p-4 rounded-xl flex justify-between cursor-pointer"
          onClick={() => onSelect(d.id)}
        >
          <div>
            <h2 className="font-semibold">{d.title}</h2>
            <p className="text-sm text-gray-400">
              {d.isLive ? "🔴 En vivo" : "Finalizado"} • {d.views} views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DebateView() {
  const [votingEnabled] = useState(false); // post-debate

  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-xl font-bold">Debate</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 h-60 rounded-xl flex items-center justify-center">
          Video principal
        </div>
        <div className="bg-gray-800 h-60 rounded-xl flex items-center justify-center">
          Participantes
        </div>
      </div>

      <h3 className="text-lg font-semibold">Argumentos</h3>

      <div className="flex flex-col gap-4">
        {argumentsMock.map((arg) => (
          <div
            key={arg.id}
            className="bg-gray-800 p-4 rounded-xl flex gap-4"
          >
            {votingEnabled && (
              <VoteBox upvotes={arg.upvotes} downvotes={arg.downvotes} />
            )}

            <div>
              <p className="font-semibold">{arg.user}</p>
              <p className="text-gray-300">{arg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {!votingEnabled && (
        <p className="text-sm text-gray-500">
          La votación se habilita al finalizar el debate.
        </p>
      )}
    </div>
  );
}

function CreateRoom() {
  return (
    <div className="p-6 flex flex-col gap-4 max-w-md">
      <h2 className="text-xl font-bold">Crear sala</h2>

      <input
        placeholder="Nombre de la sala"
        className="p-2 rounded bg-gray-800"
      />
      <input
        placeholder="Título del debate"
        className="p-2 rounded bg-gray-800"
      />

      <select className="p-2 rounded bg-gray-800">
        <option>2 participantes</option>
        <option>4 participantes</option>
        <option>6 participantes</option>
        <option>8 participantes</option>
      </select>

      <select className="p-2 rounded bg-gray-800">
        <option>Por tiempo</option>
        <option>Por turnos</option>
      </select>

      <button className="bg-blue-600 p-2 rounded">Crear</button>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("feed");
  const [selectedDebate, setSelectedDebate] = useState<number | null>(null);

  return (
    <div className="flex bg-gray-950 text-white min-h-screen">
      <Sidebar setView={setView} />

      <div className="flex-1">
        {view === "feed" && !selectedDebate && (
          <Feed onSelect={(id) => setSelectedDebate(id)} />
        )}

        {selectedDebate && <DebateView />}

        {view === "create" && <CreateRoom />}
      </div>
    </div>
  );
}
