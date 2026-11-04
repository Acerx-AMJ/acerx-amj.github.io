document.addEventListener('DOMContentLoaded', () => {
    const script = document.getElementById('search');
    const jsonpath = script.dataset.json;
    const simple = (script.dataset.simpleFormat === 'true');
    const perPage = 5;
    const maxButtons = 7; // changing this will break it

    const list = document.getElementById('projects');
    const searchbar = document.getElementById('search-bar');
    const badsearch = document.getElementById('bad-search');
    const buttons = document.getElementById('project-buttons');

    const FIELD = { tag: 'tags', tech: 'tech' };
    const selected = { tag: new Set(), tech: new Set() };
    const summaryText = 'More search options';
    const entries = [];
    let summary = null;
    let page = 0;

    // restore the search from the url
    const params = new URLSearchParams(location.search);
    searchbar.value = params.get('q') ?? '';

    for (const value of params.getAll('tag')) {
        selected['tag'].add(value.toLowerCase());
    }
    for (const value of params.getAll('tech')) {
        selected['tech'].add(value.toLowerCase());
    }
    page = Math.max(0, (parseInt(params.get('page')) || 1) - 1);

    function el(tag, text, className) {
        const node = document.createElement(tag);
        if (text !== undefined) {
            node.textContent = text;
        }
        if (className) {
            node.className = className;
        }
        return node;
    }

    fetch(jsonpath)
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
        }).then(json => {
        // cards
        for (const d of json.data) {
            const card = document.createElement('a');
            card.href = d.link;
            if (d.font) {
                card.classList.add(`font-${d.font}`);
            }

            if (d.date) {
                card.appendChild(el('pre', d.date));
            }

            if (d.titleImage) {
                const logo = el('img', undefined, 'img-no-click');
                logo.src = d.titleImage;
                logo.alt = d.title ?? '';
                card.appendChild(logo);
            } else if (d.title) {
                card.appendChild(el('h2', d.title));
            }

            if (!simple && d.image) {
                const image = el('img');
                image.src = d.image;
                image.alt = '';
                image.loading = 'lazy';
                card.appendChild(image);
            } else if (!simple && d.custom) {
                const custom = el('div');
                custom.innerHTML = d.custom;
                card.appendChild(custom);
            }

            if (d.description) {
                card.appendChild(el('p', d.description));
            }

            const meta = [d.status, (d.tags ?? []).join(', '), (d.tech ?? []).join(', ')].filter(Boolean).join(' / ');
            if (meta) {
                card.appendChild(el('pre', meta, 'card-meta'));
            }

            list.appendChild(card);
            entries.push({
                data: d,
                card: card,
                tags: new Set((d.tags ?? []).map(v => v.toLowerCase())),
                tech: new Set((d.tech ?? []).map(v => v.toLowerCase())),
                haystack: [d.title, d.description, d.date, d.status, ...(d.tags ?? []), ...(d.tech ?? [])].filter(Boolean).join(' ').toLowerCase(),
            });
        }

        const details = el('details');
        details.id = 'search-filters';
        summary = el('summary', summaryText);
        details.appendChild(summary);

        function constructSearchOptions(kind, label) {
            const values = new Map();
            for (const entry of entries) {
                for (const value of entry.data[FIELD[kind]] ?? []) {
                    if (!values.has(value.toLowerCase())) {
                        values.set(value.toLowerCase(), value);
                    }
                }
            }

            // forget values from a hand-edited url
            for (const key of [...selected[kind]]) {
                if (!values.has(key)) {
                    selected[kind].delete(key);
                }
            }

            if (values.size === 0) {
                return;
            }

            const filterRow = el('div', undefined, 'filter-row');
            filterRow.appendChild(el('span', label, 'filter-label'));
            for (const [key, text] of [...values].sort((a, b) => a[1].localeCompare(b[1]))) {
                const chip = el('button', text, 'filter-chip');
                chip.type = 'button';
                chip.dataset.kind = kind;
                chip.dataset.key = key;
                chip.addEventListener('click', () => {
                    if (selected[kind].has(key)) {
                        selected[kind].delete(key);
                    } else {
                        selected[kind].add(key);
                    }
                    page = 0;
                    update();
                });
                filterRow.appendChild(chip);
            }
            details.appendChild(filterRow);
        }

        constructSearchOptions('tag', 'Type:');
        constructSearchOptions('tech', 'Made with:');

        if (details.children.length > 1) {
            details.open = (selected.tag.size + selected.tech.size > 0);
            searchbar.after(details);
        } else {
            summary = null;
        }

        update();
        }).catch(error => {
        console.error(`Failed to fetch ${jsonpath}:`, error);
        list.textContent = 'Failed to load the list.';
    });

    function goTo(target) {
        const fromBottom = document.documentElement.scrollHeight - window.scrollY;
        page = target;
        update();
        window.scrollTo(0, document.documentElement.scrollHeight - fromBottom);
    }

    function arrow(text, label, target, disabled) {
        const button = el('button', text);
        button.setAttribute('aria-label', label);
        button.disabled = disabled;
        button.addEventListener('click', () => goTo(target));
        buttons.appendChild(button);
    }

    function update() {
        // search and filters
        const terms = searchbar.value.toLowerCase().split(/\s+/).filter(Boolean);
        const filtered = entries.filter(entry => {
        if (!terms.every(term => entry.haystack.includes(term))) {
            return false;
        }
        for (const kind of ['tag', 'tech']) {
            for (const key of selected[kind]) {
                if (!entry[FIELD[kind]].has(key)) {
                    return false;
                }
            }
        }
        return true;
        });

        // show the current page
        const pageCount = Math.ceil(filtered.length / perPage);
        page = Math.min(page, Math.max(0, pageCount - 1));

        const visible = new Set(filtered.slice(page * perPage, (page + 1) * perPage));
        for (const entry of entries) {
            entry.card.style.display = (visible.has(entry) ? '' : 'none');
        }
        badsearch.style.display = (filtered.length ? 'none' : 'block');

        buttons.innerHTML = '';
        if (pageCount > 1) {
            const arrows = (pageCount > maxButtons);
            let pages = [...Array(pageCount).keys()];

            if (arrows) {
                if (page <= 3) {
                    pages = [0, 1, 2, 3, 4, '…', pageCount - 1];
                } else if (page >= pageCount - 4) {
                    pages = [0, '…', pageCount - 5, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1];
                } else {
                    pages = [0, '…', page - 1, page, page + 1, '…', pageCount - 1];
                }
                arrow('‹', 'Previous page', page - 1, page === 0);
            }

            for (const p of pages) {
                if (p === '…') {
                    buttons.appendChild(el('span', '…', 'page-gap'));
                    continue;
                }

                const button = el('button', p + 1, (p === page ? 'selected-btn' : ''));
                button.setAttribute('aria-label', `Page ${p + 1}`);
                if (p === page) {
                    button.setAttribute('aria-current', 'page');
                }
                button.addEventListener('click', () => goTo(p));
                buttons.appendChild(button);
            }

            if (arrows) {
                arrow('›', 'Next page', page + 1, page === pageCount - 1);
            }
        }

        // filter chips and the details label
        for (const chip of document.querySelectorAll('.filter-chip')) {
            chip.setAttribute('aria-pressed', selected[chip.dataset.kind].has(chip.dataset.key));
        }
        if (summary) {
            const count = selected.tag.size + selected.tech.size;
            summary.textContent = (count ? `${summaryText} (${count})` : summaryText);
        }

        // save the search in the url
        const query = new URLSearchParams();
        if (searchbar.value.trim()) {
            query.set('q', searchbar.value.trim());
        }
        for (const kind of ['tag', 'tech']) {
            for (const key of selected[kind]) {
                query.append(kind, key);
            }
        }
        if (page > 0) {
            query.set('page', page + 1);
        }
        history.replaceState(null, '', location.pathname + (query.toString() ? `?${query}` : '') + location.hash);
    }

    searchbar.addEventListener('input', () => {
        page = 0;
        update();
    });
});
