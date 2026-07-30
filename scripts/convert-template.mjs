import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const html = readFileSync(join(root, 'Central de Demandas.dc.html'), 'utf8')

const start = html.indexOf('<div style="min-height:100vh')
const end = html.lastIndexOf('</div>\n</x-dc>')
let tpl = html.slice(start, end + 6)

const LOOP_VARS = new Set(['tm','r','o','p','s','k','t','col','row','m','wk','d','it','l','a','g','tk','w'])

function refExpr(expr) {
  const e = expr.trim()
  if (e.startsWith('v.')) return e
  const parts = e.split('.')
  if (parts.length > 1 && LOOP_VARS.has(parts[0])) return e
  if (/^[a-zA-Z_]\w*$/.test(e)) return `v.${e}`
  return e
}

function convertScIf(s) {
  return s
    .replace(/<sc-if\s+value="\{\{\s*([^}]+?)\s*\}\}"[^>]*>/g, (_, e) => `{(${refExpr(e)}) && (`)
    .replace(/<\/sc-if>/g, ')}')
}

function convertScFor(s) {
  return s
    .replace(/<sc-for\s+list="\{\{\s*([^}]+?)\s*\}\}"\s+as="([^"]+)"[^>]*>/g, (_, list, as) => `{${refExpr(list)}.map((${as}) => (`)
    .replace(/<\/sc-for>/g, '))}')
}

function convertBindings(s) {
  return s.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, e) => `{${refExpr(e)}}`)
}

function convertStyleHover(s) {
  const stack = []
  return s.replace(/<(\/?)(button|div|span|input|textarea|select)([^>]*)>/g, (full, slash, tag, attrs) => {
    if (slash) {
      const open = stack.pop()
      if (open === 'Hover') return '</Hover>'
      return full
    }
    const hoverMatch = attrs.match(/style-hover="([^"]*)"/)
    const styleMatch = attrs.match(/style="([^"]*)"/)
    if (hoverMatch && styleMatch) {
      const rest = attrs
        .replace(/\s*style-hover="[^"]*"/, '')
        .replace(/\s*style="[^"]*"/, '')
        .replace(/\s*style-focus="[^"]*"/, '')
        .replace(/\s+hint-placeholder-[^=]*="[^"]*"/g, '')
      stack.push('Hover')
      return `<Hover as="${tag}" style="${styleMatch[1]}" hover="${hoverMatch[1]}"${rest}>`
    }
    stack.push(tag)
    return full
  })
}

function convertAttrs(s) {
  return s
    .replace(/\s+hint-placeholder-[^=]*="[^"]*"/g, '')
    .replace(/\s+style-focus="[^"]*"/g, '')
    .replace(/\bonClick="\{\{\s*([^}]+?)\s*\}\}"/g, (_, e) => `onClick={${refExpr(e)}}`)
    .replace(/\bonChange="\{\{\s*([^}]+?)\s*\}\}"/g, (_, e) => `onChange={${refExpr(e)}}`)
    .replace(/\bonDragOver="\{\{\s*([^}]+?)\s*\}\}"/g, (_, e) => `onDragOver={${refExpr(e)}}`)
    .replace(/\bonDrop="\{\{\s*([^}]+?)\s*\}\}"/g, (_, e) => `onDrop={${refExpr(e)}}`)
    .replace(/\bonDragStart="\{\{\s*([^}]+?)\s*\}\}"/g, (_, e) => `onDragStart={${refExpr(e)}}`)
    .replace(/\bvalue="\{\{\s*([^}]+?)\s*\}\}"/g, (_, e) => `value={${refExpr(e)}}`)
    .replace(/\bplaceholder="\{\{\s*([^}]+?)\s*\}\}"/g, (_, e) => `placeholder={${refExpr(e)}}`)
    .replace(/\btitle="\{\{\s*([^}]+?)\s*\}\}"/g, (_, e) => `title={${refExpr(e)}}`)
    .replace(/\bdraggable="true"/g, 'draggable')
    .replace(/\s+rows="(\d+)"/g, ' rows={$1}')
    .replace(/\s+step="(\d+)"/g, ' step={$1}')
    .replace(/\s+min="(\d+)"/g, ' min={$1}')
    .replace(/\s+max="(\d+)"/g, ' max={$1}')
}

function styleToJsx(styleStr) {
  if (!styleStr.includes('{{')) {
    const escaped = styleStr.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    return `style={css("${escaped}")}`
  }
  const obj = {}
  const parts = styleStr.split(';').filter(Boolean)
  for (const part of parts) {
    const idx = part.indexOf(':')
    if (idx < 0) continue
    let k = part.slice(0, idx).trim()
    let v = part.slice(idx + 1).trim()
    const camel = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    const m = v.match(/^\{\{\s*([^}]+?)\s*\}\}$/)
    if (m) {
      obj[camel] = refExpr(m[1])
    } else if (v.includes('{{')) {
      const pieces = v.split(/\{\{\s*([^}]+?)\s*\}\}/)
      let template = ''
      for (let i = 0; i < pieces.length; i++) {
        if (i % 2 === 0) template += pieces[i]
        else template += '${' + refExpr(pieces[i]) + '}'
      }
      return null // signal template literal needed
    } else {
      obj[camel] = `"${v}"`
    }
  }
  const entries = Object.entries(obj)
  if (entries.every(([, v]) => v.startsWith('"'))) {
    const plain = entries.map(([k, v]) => `${k}: ${v}`).join(', ')
    return `style={{${plain}}}`
  }
  const mixed = entries.map(([k, v]) => v.startsWith('"') ? `${k}: ${v}` : `${k}: ${v}`).join(', ')
  return `style={{${mixed}}}`
}

function convertStyles(s) {
  return s.replace(/style="([^"]*)"/g, (match, content) => {
    if (!content.includes('{{')) {
      const escaped = content.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
      return `style={css("${escaped}")}`
    }
    const objParts = []
    const tplParts = []
    let useTemplate = false
    const segments = content.split(';').filter(Boolean)
    for (const seg of segments) {
      const idx = seg.indexOf(':')
      if (idx < 0) continue
      const k = seg.slice(0, idx).trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      const v = seg.slice(idx + 1).trim()
      if (v.match(/^\{\{[^}]+\}\}$/)) {
        const inner = v.replace(/^\{\{\s*|\s*\}\}$/g, '')
        objParts.push(`${k}: ${refExpr(inner)}`)
      } else if (v.includes('{{')) {
        useTemplate = true
        const tpl = '`' + v.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, e) => '${' + refExpr(e) + '}') + '`'
        objParts.push(`${k}: ${tpl}`)
      } else {
        objParts.push(`${k}: "${v}"`)
      }
    }
    return `style={{${objParts.join(', ')}}}`
  })
}

tpl = convertScIf(tpl)
tpl = convertScFor(tpl)
tpl = convertBindings(tpl)
tpl = convertStyleHover(tpl)
tpl = convertAttrs(tpl)
tpl = convertStyles(tpl)

// Add keys to map iterations
tpl = tpl.replace(/\.map\(\((\w+)\) => \(\s*\n(\s*)<(option|div|span|button)/g, '.map(($1) => (\n$2<$3 key={$1}')

const output = `/* AUTO-GENERATED from Central de Demandas.dc.html — run: node scripts/convert-template.mjs */
import { css } from './lib/utils'
import { Hover } from './Hover'
import type { RenderVals } from './hooks/useCentralDemandas'

export function AppView({ v }: { v: RenderVals }) {
  return (
    <>
${tpl.split('\n').map(l => '      ' + l).join('\n')}
    </>
  )
}
`

writeFileSync(join(root, 'src', 'AppView.tsx'), output)
console.log('Generated src/AppView.tsx')
