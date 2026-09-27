function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'rounded-lg px-4 py-2 font-medium transition-colors duration-200'

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button