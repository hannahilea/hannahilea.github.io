// This is md-block.js's hr/footnotes branch, with some additions

/**
 * <md-block> custom element
 * @author Lea Verou
 */

let marked = window.marked;
let DOMPurify = window.DOMPurify;
let Prism = window.Prism;

export const URLs = {
	marked: "https://cdn.jsdelivr.net/npm/marked/src/marked.min.js",
	DOMPurify: "https://cdn.jsdelivr.net/npm/dompurify@2.3.3/dist/purify.es.min.js"
}

// Fix indentation
function deIndent(text) {
	let indent = text.match(/^[\r\n]*([\t ]+)/);

	if (indent) {
		indent = indent[1];

		text = text.replace(RegExp("^" + indent, "gm"), "");
	}

	return text;
}

function addClassesToLinks(text) {
	text = text.replace(' href=".', ' class="local" href=".');
	text = text.replace(/\shref="#/g, ' class="internal-anchor" href="#');
	text = text.replace(' href="https://github.com/hannahilea', ' class="local" href="https://github.com/hannahilea');
	return text;
}

function handleBlockQuotes(text) {
	// let bquotes = text.match(/<blockquote>[\r\n][ \t]*<p>\[![A-Za-z0-9]+\]<\/p>/g);
	let bquotes = text.match(/<blockquote>[\r\n]*[ \t]*<p>\[!.+\]<\/p>/g);
	if (bquotes === null) {
		return text;
	}
	bquotes.forEach(q => {
		let alertType = String(q.match(/<p>\[!.+\]<\/p>/)); // First match, which is guaranteed to exist if we're here
		alertType = alertType.substring(5, alertType.length - 5).replace(/\W/g, '').toLowerCase()
		let newBQuote = q.replace("<blockquote>", '<blockquote class="alert alert-' + alertType + '">')
		
		// Only replaces first instance, by design!!
		newBQuote = newBQuote.replace("<p>", '<p class="alert-heading">')
		newBQuote = newBQuote.replace("<p>", '<p class="alert-heading">').replace("[!", "").replace("]", "")
		text = text.replace(q, newBQuote);
	})
	text = text.replace(' href="https://github.com/hannahilea', ' class="local" href="https://github.com/hannahilea');
	return text;
}

// Handle footnote support
function handleFootnotes(text) {
	// Find all footnotes; must have a newline before and after them
	let footnotes = text.match(/<p>[ \t]*\[\^[A-Za-z0-9]+\]:.*[ \t\n]*<\/p>/g);
	if (footnotes === null) {
		return text;
	}

	// Strip all footnotes from the text:
	footnotes.forEach(f => {
		text = text.replace(f, "");
	})
	let footnotesClean = footnotes.map(function (f) {
		return f.substring(3, f.length - 4);
	});

	// Find all footnote references
	let footnoteRefs = text.match(/\[\^[A-Za-z0-9]+\](?!:)/g);
	if (footnoteRefs === null) {
		return text;
	}

	// Only treat candidate refs as footnote refs if they have a corresponding footnote 
	let refSymbols = footnoteRefs.map(function (r) { return r.substring(2, r.length - 1); });
	let footnoteSymbols = footnotesClean.map(function (r) {
		r = r.split(":")[0];  // [^foo]
		return r.substring(2, r.length - 1)  // foo
	});
	let validRefSymbols = refSymbols.filter((r) => footnoteSymbols.includes(r));
	// ...and make sure those references are unique
	validRefSymbols = Array.from(new Set(validRefSymbols))

	// Only include the first footnotes for each reference
	let validFootnotes = validRefSymbols.map(function (s) {
		let i = footnoteSymbols.findIndex(function (fn) { return fn === s; });
		return footnotes[i];
	});

	// Now our lists of references and footnotes are all ordered correctly!
	// First, let's set up the footnote footer 
	let footnoteFooter = '\n<div class="footnotes">\n'

	validRefSymbols.forEach((symbol, i) => {
		// Let's add the footnote itself first
		let footnote = validFootnotes[i];
		let content = footnote.split("]:", 2)[1];
		console.log()
		content = content.substring(0, content.length - 4).trim();

		let iRef = i + 1;
		let footnoteHTML = "\n\t<p>" + iRef + ". " + content;

		// It is possible for multiple references to point to the same footnote,
		// so we need to give them each unique ids
		let r = RegExp(String.raw`\[\^${symbol}\]`, "g")
		let numRefs = text.match(r).length;
		for (let iSymbol = 0; iSymbol < numRefs; iSymbol++) {
			let uniqueRef = numRefs > 1 ? iRef + "-" + (iSymbol + 1) : iRef;

			// Update the footnote reference
			let footnoteSuperscript = '<sup><a class="footnote-ref" href="#footnote-' +
				uniqueRef + '" id="footnote-' + uniqueRef + '-ref">' +
				iRef + '</a></sup>';
			text = text.replace("[^" + symbol + "]", footnoteSuperscript);

			// Add the footnote linkback
			let linkback = '<a class="footnote" href="#footnote-' + uniqueRef +
				'-ref" id="footnote-' + uniqueRef + '">↩</a>'
			footnoteHTML += linkback;
		}
		footnoteFooter += footnoteHTML + "</p>";
	})

	// ...and close out the footnote footer:
	footnoteFooter += "\n</div>"

	let footnoteElement = text.includes("<footnotes/>")
	if (footnoteElement === null) {
		text += '<hr class="footnote-div">'
		text += footnoteFooter;
	} else {
		text = text.replace("<footnotes/>", footnoteFooter)
	}

	return text;
}

export class MarkdownElement extends HTMLElement {
	constructor() {
		super();

		this.renderer = Object.assign({}, this.constructor.renderer);

		for (let property in this.renderer) {
			this.renderer[property] = this.renderer[property].bind(this);
		}
	}

	get rendered() {
		return this.getAttribute("rendered");
	}

	get mdContent () {
		return this._mdContent;
	}

	set mdContent (html) {
		this._mdContent = html;
		this._contentFromHTML = false;

		this.render();
	}

	connectedCallback() {
		Object.defineProperty(this, "untrusted", {
			value: this.hasAttribute("untrusted"),
			enumerable: true,
			configurable: false,
			writable: false
		});

		if (this._mdContent === undefined) {
			this._contentFromHTML = true;
			this._mdContent = deIndent(this.innerHTML);
			// https://github.com/markedjs/marked/issues/874#issuecomment-339995375
			// marked expects markdown quotes (>) to be un-escaped, otherwise they won't render correctly
			this._mdContent = this._mdContent.replace(/&gt;/g, '>');
		}

		this.render();
	}

	async render () {
		if (!this.isConnected || this._mdContent === undefined) {
			return;
		}

		if (!marked) {
			marked = import(URLs.marked).then(m => m.marked);
		}

		marked = await marked;

		marked.setOptions({
			gfm: true,
			smartypants: true,
			langPrefix: "language-",
		});

		marked.use({renderer: this.renderer});

		let html = this._parse();

		if (this.untrusted) {
			let mdContent = this._mdContent;
			html = await MarkdownElement.sanitize(html);
			if (this._mdContent !== mdContent) {
				// While we were running this async call, the content changed
				// We don’t want to overwrite with old data. Abort mission!
				return;
			}
		}

		html = handleFootnotes(html);
		html = addClassesToLinks(html);
		html = handleBlockQuotes(html);

		this.innerHTML = html;

		if (!Prism && URLs.Prism && this.querySelector("code")) {
			Prism = import(URLs.Prism);

			if (URLs.PrismCSS) {
				let link = document.createElement("link");
				link.rel = "stylesheet";
				link.href = URLs.PrismCSS;
				document.head.appendChild(link);
			}
		}

		if (Prism) {
			await Prism; // in case it's still loading
			Prism.highlightAllUnder(this);
		}

		if (this.src) {
			this.setAttribute("rendered", this._contentFromHTML? "fallback" : "remote");
		}
		else {
			this.setAttribute("rendered", this._contentFromHTML? "content" : "property");
		}

		// Fire event
		let event = new CustomEvent("md-render", {bubbles: true, composed: true});
		this.dispatchEvent(event);
	}

	static async sanitize(html) {
		if (!DOMPurify) {
			DOMPurify = import(URLs.DOMPurify).then(m => m.default);
		}

		DOMPurify = await DOMPurify; // in case it's still loading

		return DOMPurify.sanitize(html);
	}
};

export class MarkdownSpan extends MarkdownElement {
	constructor() {
		super();
	}

	_parse () {
		return marked.parseInline(this._mdContent);
	}

	static renderer = {
		codespan (code) {
			if (this._contentFromHTML) {
				// Inline HTML code needs to be escaped to not be parsed as HTML by the browser
				// This results in marked double-escaping it, so we need to unescape it
				code = code.replace(/&amp;(?=[lg]t;)/g, "&");
			}
			else {
				// Remote code may include characters that need to be escaped to be visible in HTML
				code = code.replace(/</g, "&lt;");
			}

			return `<code>${code}</code>`;
		}
	}
}

export class MarkdownBlock extends MarkdownElement {
	constructor() {
		super();
	}

	get src() {
		return this._src;
	}

	set src(value) {
		this.setAttribute("src", value);
	}

	get hmin() {
		return this._hmin || 1;
	}

	set hmin(value) {
		this.setAttribute("hmin", value);
	}

	get hlinks() {
		return this._hlinks ?? null;
	}

	set hlinks(value) {
		this.setAttribute("hlinks", value);
	}

	_parse () {
		return marked.parse(this._mdContent);
	}

	static renderer = Object.assign({
		heading (text, level, _raw, slugger) {
			level = Math.min(6, level + (this.hmin - 1));
			const id = slugger.slug(text);
			const hlinks = this.hlinks;

			let content;

			if (hlinks === null) {
				// No heading links
				content = text;
			}
			else {
				content = `<a href="#${id}" class="anchor">`;

				if (hlinks === "") {
					// Heading content is the link
					content += text + "</a>";
				}
				else {
					// Headings are prepended with a linked symbol
					content += hlinks + "</a>" + text;
				}
			}

			return `
				<h${level} id="${id}">
					${content}
				</h${level}>`;
		},

		code (code, language, escaped) {
			if (this._contentFromHTML) {
				// Inline HTML code needs to be escaped to not be parsed as HTML by the browser
				// This results in marked double-escaping it, so we need to unescape it
				code = code.replace(/&amp;(?=[lg]t;)/g, "&");
			}
			else {
				// Remote code may include characters that need to be escaped to be visible in HTML
				code = code.replace(/</g, "&lt;");
			}

			return `<pre class="language-${language}"><code>${code}</code></pre>`;
		}
	}, MarkdownSpan.renderer);

	static get observedAttributes() {
		return ["src", "hmin", "hlinks"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}

		switch (name) {
			case "src":
				let url;
				try {
					url = new URL(newValue, location);
				}
				catch (e) {
					return;
				}

				let prevSrc = this.src;
				this._src = url;

				if (this.src !== prevSrc) {
					fetch(this.src)
					.then(response => {
						if (!response.ok) {
							throw new Error(`Failed to fetch ${this.src}: ${response.status} ${response.statusText}`);
						}

						return response.text();
					})
					.then(text => {
						this.mdContent = text;
					})
					.catch(e => {});
				}

				break;
			case "hmin":
				if (newValue > 0) {
					this._hmin = +newValue;

					this.render();
				}
				break;
			case "hlinks":
				this._hlinks = newValue;
				this.render();
		}
	}
}


customElements.define("md-block", MarkdownBlock);
customElements.define("md-span", MarkdownSpan);
