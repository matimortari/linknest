export function CheckboxInput({ id, label, checked = false, onChange }: CheckboxInputProps) {
	return (
		<div className="flex w-full flex-row items-center justify-between gap-4 rounded-2xl border p-2 text-sm">
			<label htmlFor={id} className="text-caption">
				{label}
			</label>
			<div className="scale-sm flex cursor-pointer flex-row items-center gap-2">
				<input id={id} type="checkbox" checked={checked} onChange={onChange} />
			</div>
		</div>
	)
}

export function ColorInput({ id, label, value = "#000000", onChange, disabled = false }: ColorInputProps) {
	return (
		<div className="flex w-full flex-row items-center justify-between gap-4 rounded-2xl border p-2 text-sm">
			<label htmlFor={id} className={`text-caption ${disabled ? "text-muted line-through" : ""}`}>
				{label}
			</label>
			<div className="scale-sm flex cursor-pointer flex-row items-center gap-2">
				<span className="text-label text-muted-foreground">{value}</span>
				<input id={id} type="color" value={value} onChange={onChange} disabled={disabled} />
			</div>
		</div>
	)
}

export function SelectInput({ id, label, value, onChange, options, disabled = false }: SelectInputProps) {
	return (
		<div className="flex w-full flex-row items-center justify-between gap-4 rounded-2xl border p-2 text-sm">
			<label htmlFor={id} className={`text-caption ${disabled ? "text-muted line-through" : ""}`}>
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={onChange}
				disabled={disabled}
				className="text-label scale-sm cursor-pointer bg-transparent p-2 text-muted-foreground outline-none disabled:opacity-50"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value} className="bg-card text-end">
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}

export function RadioOptions({ options, name, value, onChange, label }: RadioOptionsProps) {
	return (
		<div className="my-2 space-y-4">
			<p className="text-caption">{label}</p>
			<div className="space-y-1">
				{options.map((option) => (
					<label key={option.value} className="flex flex-row items-center gap-2 text-xs">
						<input
							type="radio"
							name={name}
							value={option.value}
							checked={value === option.value}
							onChange={onChange}
							className="scale-sm"
						/>
						<span className="text-label">{option.label}</span>
					</label>
				))}
			</div>
		</div>
	)
}
