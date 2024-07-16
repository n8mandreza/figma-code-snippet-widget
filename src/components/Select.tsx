import { JSX, h } from 'preact'
import RightChevron from '../icons/RightChevron'
import styles from './SelectStyles.css'

interface SelectItem {
  label: string
  value: string
}

interface SelectProps {
  label: string
  hideLabel?: boolean
  options: SelectItem[]
  selection: string | undefined
  caption?: string
  onChange: (event: JSX.TargetedEvent<HTMLSelectElement, Event>) => void
}

export default function Select({label, hideLabel = false, options, selection, caption, onChange}: SelectProps) {
  return (
    <div class={styles.selectContainer}>
      {hideLabel ? null : (
        <label for={label} class="select-label">{label}</label>
      )}

      <div class={styles.selectInputWrapper}>
        <div class={styles.selectInputUI}>
          {options.find(option => option.value === selection)?.label || 'Select...'}
          <div class={styles.selectChevron}>
            <RightChevron/>
          </div>
        </div>

        <select id={label} name={label} aria-label={label} onChange={onChange} class={styles.selectInput}>
          {options.map((option: SelectItem) => (
            <option key={option.value} value={option.value} selected={selection === option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {caption ? <p class={styles.selectCaption}>{caption}</p> : null}
    </div>
  )
}