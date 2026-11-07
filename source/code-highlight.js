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
      'EventHandler', 'AssetManager', 'Text', 'vector', 'string', 'Circle', 'Rect', 'Key', 'Ray', 'Vec2f'
   ]),
   line_comment: /\/\/.*/,
   block_comment: /\/\*[\s\S]*?\*\//,
   scope: true,
   directive: /(?<=^[ \t]*)#[ \t]*[A-Za-z_]\w*/,
   include_path: /(?<=^[ \t]*#[ \t]*include[ \t]*)<[^>\n]*>/,
   number: /(?<![\w.])(?:0[xX][\da-fA-F]+(?:'[\da-fA-F]+)*|0[bB][01]+(?:'[01]+)*|(?:\d+(?:'\d+)*(?:\.(?:\d+(?:'\d+)*)?)?|\.\d+(?:'\d+)*)(?:[eE][+-]?\d+)?)[uUlLfF]{0,3}(?!\w)/, // horrific
};

const cll_data = {
   keywords: new Set([
      'let', 'con', 'delete', 'exists', 'if', 'elif', 'else', 'while', 'for', 'fn', 'do', 'break', 'continue', 'return', 'unless', 'and',
      'or', 'not', 'in', 'is', 'isnot', 'list', 'array', 'map'
   ]),
   types: new Set([]),
   line_comment: /\/\/.*/,
   block_comment: /\/\*[\s\S]*?\*\//,
   number: /(?<![\w.])(?:\d+(?:\.\d*)?|\.\d+)(?!\w)/,
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
      ['number', language.number],
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
         const last_type = parts.findLastIndex(part => language.types.has(part));
         const head = parts.slice(0, last_type + 1).join('::');
         const tail = parts.slice(last_type + 1).map((part, i, rest) => {
            return (i === rest.length - 1 && code[end] === '(' ? `<f>${esc(part)}</f>` : esc(part));
         });

         if (head) {
            result += `<y>${esc(head)}</y>` + (tail.length ? '::' : '');
         }
         result += tail.join('::');
      } else if (groups.number !== undefined) {
         result += `<n>${esc(text)}</n>`;
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
   for (const cpp of document.querySelectorAll('.code-cpp')) {
      cpp.innerHTML = highlight(cpp.textContent, cpp_data);
   }
   for (const cll of document.querySelectorAll('.code-cll')) {
      cll.innerHTML = highlight(cll.textContent, cll_data);
   }

   for (const pre of document.querySelectorAll('.code.copy')) {
      const button = document.createElement('button');
      const code = pre.textContent;

      button.className = 'copy-button';
      button.textContent = '⎘';
      button.addEventListener('click', async () => {
         await navigator.clipboard.writeText(code);
         button.className ='copy-button copy-green';
         setTimeout(() => button.className = 'copy-button', 1500);
      });
      pre.appendChild(button);
   }
});
