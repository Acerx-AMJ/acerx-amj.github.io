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
      'Vector2', 'Vector3', 'Vector4', 'Rectangle', 'Color', 'RatioType', 'Map2D', 'Map1D', 'LoadingState'
   ]),
   line_comment: /\/\/.*/,
   block_comment: /\/\*[\s\S]*?\*\//,
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

function highlight(code, language) {
   const pattern = new RegExp([
      language.line_comment,
      language.block_comment,
      /"(?:\\.|[^"\\])*"/, // string
      /\b[A-Za-z_]\w*(?=\()/, // function
      /\b[A-Za-z_]\w*\b/, // identifier/keyword/types
   ].map(r => `(${r.source})`).join('|'), 'g');

   return code.replace(pattern, (match, comment, block, str, func, ident) => {
      const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (comment !== undefined) return `<c>${esc(comment)}</c>`;
      if (block !== undefined) return `<c>${esc(block)}</c>`;
      if (str !== undefined) return `<t>${esc(str)}</t>`;
      if (func !== undefined) return `<f>${esc(func)}</f>`;
      if (ident !== undefined && language.types.has(ident)) return `<y>${esc(ident)}</y>`;
      if (ident !== undefined && language.keywords.has(ident)) return `<k>${esc(ident)}</k>`;
      return esc(match);
   });
}

document.addEventListener('DOMContentLoaded', () => {
   for (let cpp of document.querySelectorAll('.code-cpp')) {
      cpp.innerHTML = highlight(cpp.innerHTML, cpp_data);
   }
   for (let cll of document.querySelectorAll('.code-cll')) {
      cll.innerHTML = highlight(cll.innerHTML, cll_data);
   }
});