import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, '..', 'src', 'AppView.tsx')
let s = readFileSync(file, 'utf8')

s = s.replace(/\b(on[A-Z][a-zA-Z]*)="\{([^"]+)\}"/g, '$1={$2}')
s = s.replace(/\b(value|placeholder|title)="\{([^"]+)\}"/g, '$1={$2}')
s = s.replace(/value=\{v\.tm\}/g, 'value={tm}')

const scopes = ['v', 'col', 't', 'p', 'k', 'g', 'tk', 'm', 'row', 's', 'd', 'it', 'l', 'a']
for (const scope of scopes) {
  s = s.replace(/css\("([^"]*)"\)/g, (match, content) => {
    const token = `{${scope}.`
    if (!content.includes(token)) return match
    const fixed = content.replace(new RegExp(`\\{${scope}\\.([^}]+)\\}`, 'g'), '{$1}')
    return `css("${fixed}", ${scope})`
  })
}

writeFileSync(file, s)
console.log('Fixed AppView.tsx')
