const startYear = 2026;

const darkQuery = matchMedia('(prefers-color-scheme: dark)');
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');

const settings = {
   theme: localStorage.getItem('theme') ?? 'system',
   sprites: localStorage.getItem('sprites') ?? 'system',
};

function giscusTheme() {
   if (settings.theme === '8bit') return 'https://acerx-amj.github.io/style/8bit-giscus.css';
   if (settings.theme === 'fun')  return 'https://acerx-amj.github.io/style/fun-giscus.css';
   return (settings.theme === 'light' ? 'light' : 'transparent_dark');
}

function applySettings() {
   let sprites = settings.sprites;
   if (sprites === 'system') {
      sprites = (motionQuery.matches ? 'off' : 'on');
   }

   let theme = settings.theme;
   if (theme === 'system') {
      theme = (darkQuery.matches ? 'dark' : 'light');
   }

   document.documentElement.setAttribute('data-theme', theme);
   document.documentElement.setAttribute('data-sprites', sprites);

   const giscus = document.querySelector('iframe.giscus-frame');
   if (giscus) {
      giscus.contentWindow.postMessage({ giscus: { setConfig: { theme: giscusTheme() } } }, 'https://giscus.app');
   }
}

darkQuery.addEventListener('change', applySettings);
motionQuery.addEventListener('change', applySettings);
applySettings();

document.addEventListener('DOMContentLoaded', () => {
   // create footer
   const body = document.getElementsByTagName('body')[0];
   const year = new Date().getFullYear();
   const yearText = (year <= startYear ? startYear : `${startYear}-${year}`);

   const footer = document.createElement('footer');
   footer.innerHTML = `
      <p>${yearText} Daniel Vishnevsky. This website is licensed under <a href="https://github.com/Acerx-AMJ/acerx-amj.github.io/blob/main/LICENSE">MIT License</a>.</p>

      <header>
         <a href="mailto:&#097;&#106;&#109;&#046;&#097;&#099;&#101;&#114;&#120;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;">Email</a>
         <a href="https://github.com/Acerx-AMJ/acerx-amj.github.io">Source</a>
         <a href="https://github.com/Acerx-AMJ">Github</a>
         <a href="https://acerxamj.itch.io/">Itch.io</a>
         <a href="https://www.youtube.com/@Acerx-AMJ">Youtube</a>
      </header>`;
   body.appendChild(footer);

   // create sidebar
   const pages = [['Home', 'home'], ['Projects', 'projects'], ['Blog', 'blog'], ['Stories', 'stories'], ['Discussion', 'discussion']];
   const here = location.pathname.split('/').pop();

   const toggle = document.createElement('button');
   toggle.id = 'menu-toggle';
   toggle.textContent = '☰';

   const overlay = document.createElement('div');
   overlay.id = 'menu-overlay';

   const menu = document.createElement('nav');
   menu.id = 'menu';
   menu.innerHTML = `
      ${pages.map(([name, file]) =>
         `<a ${here === file + '.html' ? '' : 'href="../pages/' + file + '.html"'} ${here === file + '.html' ? ' aria-current="page"' : ''}>${name}</a>`).join('')}
      <div id="menu-settings">
         <label>Theme
            <select id="theme-select">
               <option value="system">System</option>
               <option value="light">Light</option>
               <option value="dark">Dark</option>
               <option value="8bit">8bit</option>
               <option value="fun">Fun</option>
            </select>
         </label>
         <label>Animations
            <select id="anim-select">
               <option value="system">System</option>
               <option value="on">On</option>
               <option value="reduced">Reduced</option>
               <option value="off">Off</option>
            </select>
         </label>
      </div>`;

   document.body.append(toggle, overlay, menu);

   const themeSelect = menu.querySelector('#theme-select');
   const animSelect = menu.querySelector('#anim-select');
   themeSelect.value = settings.theme;
   animSelect.value = settings.sprites;

   themeSelect.addEventListener('change', () => {
      settings.theme = themeSelect.value;
      localStorage.setItem('theme', settings.theme);
      applySettings();
   });

   animSelect.addEventListener('change', () => {
      settings.sprites = animSelect.value;
      localStorage.setItem('sprites', settings.sprites);
      applySettings();
   });

   function setOpen(open) {
      menu.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
   }

   toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
   overlay.addEventListener('click', () => setOpen(false));
   document.addEventListener('keyup', e => { if (e.key === 'Escape') setOpen(false); });

   // create header
   const header = document.createElement('header');
   header.innerHTML = pages.map(([name, file]) => `<a ${here === file + '.html' ? 'class="link-disabled"' : 'href="../pages/' + file + '.html"'}>${name}</a>`).join('');
   document.body.insertBefore(header, document.body.firstChild);

   // create blog and project comments
   const article = document.querySelector('article');
   const pathname = location.pathname;
   const isDiscussion = (here === 'discussion.html');

   if (article && (pathname.includes('/blogs/') || pathname.includes('/projects/') || isDiscussion)) {
      const container = document.createElement('div');
      container.className = 'giscus';
      article.appendChild(container);

      const comments = document.createElement('script');
      comments.src = 'https://giscus.app/client.js';
      comments.async = true;
      comments.crossOrigin = 'anonymous';
      Object.assign(comments.dataset, {
         repo: 'Acerx-AMJ/acerx-amj.github.io',
         repoId: 'R_kgDORAc60g',
         category: 'Announcements',
         categoryId: 'DIC_kwDORAc60s4DKbWx',
         mapping: 'pathname',
         strict: '1',
         reactionsEnabled: (isDiscussion ? '0' : '1'),
         inputPosition: 'top',
         theme: giscusTheme(),
         lang: 'en',
         loading: (isDiscussion ? null : 'lazy'),
      });
      article.appendChild(comments);
   }
});
