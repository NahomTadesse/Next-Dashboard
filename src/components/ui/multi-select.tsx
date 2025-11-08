import * as React from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type Option = {
  value: string
  label: string
  disabled?: boolean
}

type MultiSelectProps = {
  options: Option[]
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  variant?: 'default' | 'outline'
}

function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Select options',
  className,
  disabled = false,
  variant = 'outline',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onValueChange(value.filter((i) => i !== item))
  }

  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onValueChange(value.filter((v) => v !== selectedValue))
    } else {
      onValueChange([...value, selectedValue])
    }
  }

  const selectedLabels = React.useMemo(() => {
    return value.map(
      (v) => options.find((option) => option.value === v)?.label || v,
    )
  }, [value, options])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between',
            value.length > 0 ? 'h-full p-2' : 'h-10',
            variant === 'outline' ? 'border border-input bg-transparent' : '',
            className,
          )}
          onClick={() => setOpen(!open)}
          variant={variant}
        >
          <div className="flex flex-wrap gap-1">
            {value.length > 0 ? (
              selectedLabels.map((label) => (
                <Badge
                  variant="secondary"
                  key={label}
                  className="mr-1 mb-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUnselect(value[selectedLabels.indexOf(label)])
                  }}
                >
                  {label}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => {
              const isSelected = value.includes(option.value)
              return (
                <CommandItem
                  key={option.value}
                  disabled={option.disabled}
                  onSelect={() => handleSelect(option.value)}
                  className={cn(
                    'cursor-pointer',
                    isSelected ? 'bg-accent' : '',
                  )}
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible',
                    )}
                  >
                    {isSelected && <X className="h-3 w-3" />}
                  </div>
                  <span>{option.label}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
