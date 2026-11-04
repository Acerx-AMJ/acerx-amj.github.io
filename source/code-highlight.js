const cpp_data = {
   keywords: new Set([
      'alignas', 'alignof', 'asm', 'auto', 'bool', 'break', 'case', 'catch', 'char', 'class', 'concept', 'const', 'consteval',
      'constexpr', 'constinit', 'const_cast', 'continue', 'decltype', 'default', 'delete', 'do', 'double', 'dynamic_cast',
      'else', 'enum', 'explicit', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable',
      'namespace', 'new', 'noexcept', 'nullptr', 'operator', 'private', 'protected', 'public', 'reinterpret_cast', 'return',
      'short', 'signed', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'template', 'this', 'thread_local',
      'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'while'
   ]),
   types: new Set([
      'Vector2', 'Vector3', 'Vector4', 'Rectangle', 'Color', 'RatioType', 'Map2D', 'Map1D', 'LoadingState', 'RenderWindow', 'VideoMode',
      'EventHandler', 'AssetManager', 'Text', 'vector', 'string'
   ]),
   line_comment: /\/\/.*/,
   block_comment: /\/\*[\s\S]*?\*\//,
   scope: true,
   directive: /(?<=^[ \t]*)#[ \t]*[A-Za-z_]\w*/,
   include_path: /(?<=^[ \t]*#[ \t]*include[ \t]*)<[^>\n]*>/,
};

const cll_data = {
   keywords: new Set([
      'let', 'con', 'delete', 'exists', 'if', 'elif', 'else', 'while', 'for', 'fn', 'do', 'break', 'continue', 'return', 'unless', 'and',
      'or', 'not', 'in', 'is', 'isnot', 'list', 'array', 'map'
   ]),
   types: new Set([]),
   line_comment: /\/\/.*/,
   block_comment: /\/\*[\s\S]*?\*\//,
};

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function highlight(code, language) {
   const pattern = new RegExp([
      ['comment', language.line_comment],
      ['block', language.block_comment],
      ['directive', language.directive],
      ['path', language.include_path],
      ['str', /"(?:\\.|[^"\\])*"/],
      ['qualified', language.scope && /\b[A-Za-z_]\w*(?:::[A-Za-z_]\w*)+/],
      ['func', /\b[A-Za-z_]\w*(?=\()/],
      ['ident', /\b[A-Za-z_]\w*\b/],
   ].filter(([name, regex]) => regex).map(([name, regex]) => `(?<${name}>${regex.source})`).join('|'), 'gm');

   let result = '';
   let end = 0;

   for (const match of code.matchAll(pattern)) {
      const text = match[0];
      const groups = match.groups;
      result += esc(code.slice(end, match.index));
      end = match.index + text.length;

      if (groups.comment !== undefined || groups.block !== undefined) {
         result += `<c>${esc(text)}</c>`;
      } else if (groups.str !== undefined || groups.path !== undefined) {
         result += `<t>${esc(text)}</t>`;
      } else if (groups.directive !== undefined) {
         result += `<k>${esc(text)}</k>`;
      } else if (groups.qualified !== undefined) {
         const parts = text.split('::');
         if (language.types.has(text) || language.types.has(parts[parts.length - 1])) {
            result += `<y>${esc(text)}</y>`;
         } else {
            result += parts.map((part, i) => {
               if (language.types.has(part)) {
                  return `<y>${esc(part)}</y>`;
               } else if (i === parts.length - 1 && code[end] === '(') {
                  return `<f>${esc(part)}</f>`;
               }
               return esc(part);
            }).join('::');
         }
      } else if (language.types.has(text)) {
         result += `<y>${esc(text)}</y>`;
      } else if (language.keywords.has(text)) {
         result += `<k>${esc(text)}</k>`;
      } else if (groups.func !== undefined) {
         result += `<f>${esc(text)}</f>`;
      } else {
         result += esc(text);
      }
   }
   return result + esc(code.slice(end));
}

document.addEventListener('DOMContentLoaded', () => {
   for (let cpp of document.querySelectorAll('.code-cpp')) {
      cpp.innerHTML = highlight(cpp.textContent, cpp_data);
   }
   for (let cll of document.querySelectorAll('.code-cll')) {
      cll.innerHTML = highlight(cll.textContent, cll_data);
   }
});
