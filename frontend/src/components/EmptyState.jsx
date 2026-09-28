function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-16 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-emerald-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export default EmptyState