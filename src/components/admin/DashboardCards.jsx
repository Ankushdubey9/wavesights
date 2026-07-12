import StatCard from "./StatCard";

export default function DashboardCards({
  usersCount,
  contactsCount,
  subscribersCount,
}) {

  const cards = [

    {
      title: "Total Users",
      value: usersCount,
      icon: "👥",
      color: "bg-cyan-500/20",
      change: "+18%",
    },

    {
      title: "Contact Messages",
      value: contactsCount,
      icon: "📩",
      color: "bg-blue-500/20",
      change: "+9%",
    },

    {
      title: "Subscribers",
      value: subscribersCount,
      icon: "📧",
      color: "bg-purple-500/20",
      change: "+14%",
    },

    {
      title: "AI Chats",
      value: "1,284",
      icon: "🤖",
      color: "bg-green-500/20",
      change: "+37%",
    },

    {
      title: "Resume Analysis",
      value: "842",
      icon: "📄",
      color: "bg-orange-500/20",
      change: "+22%",
    },

    {
      title: "Roadmaps",
      value: "513",
      icon: "🗺️",
      color: "bg-pink-500/20",
      change: "+17%",
    },

  ];

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {cards.map((card, index) => (

        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
          change={card.change}
        />

      ))}

    </div>

  );

}