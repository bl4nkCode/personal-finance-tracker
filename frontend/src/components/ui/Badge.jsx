function Badge({ children, variant = 'default' }) {
  const variants = {
    income: 'bg-green-100 text-green-700',
    expense: 'bg-red-100 text-red-700',
    default: 'bg-slate-100 text-slate-700',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  )
}

export default Badge