import { useState, type CSSProperties, type ElementType, type HTMLAttributes } from 'react'
import { css } from './lib/utils'

type HoverProps = {
  as?: ElementType
  style: CSSProperties | string
  hover?: string
  children?: React.ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'style'>

export function Hover({ as: Tag = 'div', style, hover, children, ...rest }: HoverProps) {
  const [isHover, setIsHover] = useState(false)
  const base = typeof style === 'string' ? css(style) : style
  const hov = hover ? css(hover) : {}
  const merged: CSSProperties = isHover ? { ...base, ...hov } : base
  return (
    <Tag
      style={merged}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
