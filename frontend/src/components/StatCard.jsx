import Card from "./ui/Card";

function StatCard({ title, value, icon: Icon, iconBg, iconColor }) {
  return (
    <Card className="flex-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {" "}
            {value}{" "}
          </h2>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
        >
          {" "}
          <Icon className={`h-5 w-5 ${iconColor}`} />{" "}
        </div>
      </div>
    </Card>
  );
}

export default StatCard;
