import LobbyCard from "./LobbyCard";

const mockLobbies = [
  { id: 1, title: "Ranked Squad", description: "Looking for serious players. Mic required.", game: "Valorant", status: "open" as const, members: 3, max: 5, owner: "xSniper99" },
  { id: 2, title: "Chill Games", description: "Just vibing, no pressure. All ranks welcome.", game: "League of Legends", status: "open" as const, members: 2, max: 5, owner: "ProGamer_Mia" },
  { id: 3, title: "Pro Team", description: "Competitive team. Diamond+ only.", game: "CS2", status: "full" as const, members: 5, max: 5, owner: "DarkLord_CS" },
  { id: 4, title: "Weekend Warriors", description: "Casual weekend gaming sessions.", game: "Fortnite", status: "open" as const, members: 1, max: 4, owner: "NightOwl_G" },
];

const LobbyList = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {mockLobbies.map((lobby) => (
        <LobbyCard key={lobby.id} lobby={lobby} />
      ))}
    </div>
  );
};

export default LobbyList;