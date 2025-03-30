export function CheckboxInput({ id, label, checked = false, onChange }: CheckboxInputProps) {
	return (
		<>
			<div className="flex w-full flex-row items-center justify-between gap-4 rounded-2xl border p-2 text-sm">
				<label htmlFor={id} className="text-sm font-semibold">
					{label}
				</label>
				<input id={id} type="checkbox" checked={checked} onChange={onChange} className="scale-sm" />
			</div>
		</>
	)
}

export function ColorInput({ id, label, value = "#000000", onChange, disabled = false }: ColorInputProps) {
	return (
		<>
			<div className="flex w-full flex-row items-center justify-between gap-4 rounded-2xl border p-2 text-sm">
				<label htmlFor={id} className={`text-sm font-semibold ${disabled ? "text-muted line-through" : ""}`}>
					{label}
				</label>
				<div className="flex flex-row items-center gap-2">
					<span className="text-xs text-muted-foreground">{value}</span>
					<input id={id} type="color" value={value} onChange={onChange} disabled={disabled} className="scale-sm" />
				</div>
			</div>
		</>
	)
}

export function SelectInput({ id, label, value, onChange, options, disabled = false }: SelectInputProps) {
	return (
		<div className="flex flex-row items-center justify-between gap-4 rounded-2xl border p-2 text-sm">
			<label htmlFor={id} className={`text-sm font-semibold ${disabled ? "text-muted line-through" : ""}`}>
				{label}
			</label>

			<div className="relative">
				<select
					id={id}
					value={value}
					onChange={onChange}
					disabled={disabled}
					className="bg-transparent py-2 text-end text-xs font-semibold text-muted-foreground outline-none"
				>
					{options.map((option) => (
						<option key={option.value} value={option.value} className="bg-card text-end text-xs text-muted-foreground">
							{option.label}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export function RadioOptions({ options, name, value, onChange, label, disabled = false }: RadioOptionsProps) {
	return (
		<div className="my-2">
			<p className={`mb-2 text-sm font-semibold ${disabled ? "text-muted line-through" : ""}`}>{label}</p>
			<div className="space-y-1">
				{options.map((option) => (
					<label key={option.value} className="flex flex-row items-center gap-2 text-xs">
						<input
							type="radio"
							name={name}
							value={option.value}
							checked={value === option.value}
							onChange={onChange}
							disabled={disabled}
							className="scale-sm"
						/>
						<span className={disabled ? "text-muted line-through" : ""}>{option.label}</span>
					</label>
				))}
			</div>
		</div>
	)
}
