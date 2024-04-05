(() => {
	"use strict";
	const e = "cosy-theme:toc-invisible",
		t = "cosy-theme:scrolledHeight",
		n = "cosy-theme:theme",
		o = "dark",
		r = e => Promise.all(e.map((e => new Promise(((t, n) => {
			if("css" === e.type) {
				const o = document.createElement("link");
				o.href = e.url, o.rel = "stylesheet", o.onload = () => t(), o.onerror = () => n(new Error(`Failed to load CSS from ${e.url}`)), document.head.appendChild(o)
			} else if("js" === e.type) {
				const o = document.createElement("script");
				o.src = e.url, e.id && (o.id = e.id), o.onload = () => t(), o.onerror = () => n(new Error(`Failed to load JS from ${e.url}`)), document.body.appendChild(o)
			} else n(new Error("Invalid resource type specified."))
		}))))),
		i = e => {
			const {
				enable: t,
				jsCdn: n,
				cssCdn: o
			} = e;
			t && r([{
					type: "css",
					url: o
				}, {
					type: "js",
					url: n
				}])
				.then((e => {
					e && (e => {
						const t = /\$\$(.+?)\$\$/g,
							n = /\\\[(.+?)\\\]/g;

						function o(e, t, n) {
							let o;
							const r = [];
							for(; null !== (o = t.exec(e.nodeValue));) {
								const t = document.createRange();
								t.setStart(e, o.index), t.setEnd(e, o.index + o[0].length), r.push(t)
							}
							for(const e of r) {
								const t = e.toString()
									.replace(/^\$\$|\$\$$|\\\[|\\\]$/g, ""),
									o = document.createElement("span");
								o.innerHTML = window.katex.renderToString(t, {
									throwOnError: !1,
									displayMode: n
								}), e.deleteContents(), e.insertNode(o)
							}
						}
						document.querySelectorAll(e)
							.forEach((e => {
								const r = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, null);
								let i;
								for(; i = r.nextNode();) o(i, t, !1), o(i, n, !0)
							}))
					})(".article-container")
				}))
		};
	var l = function(e, t) {
		var n = {};
		for(var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
		if(null != e && "function" == typeof Object.getOwnPropertySymbols) {
			var r = 0;
			for(o = Object.getOwnPropertySymbols(e); r < o.length; r++) t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]])
		}
		return n
	};
	const c = e => {
			const {
				enable: t,
				cdn: n
			} = e, o = l(e, ["enable", "cdn"]);
			t && r([{
					type: "js",
					url: n
				}])
				.then((e => {
					e && (((e = "vcomments", t = ".article-container") => {
						const n = document.querySelector(t);
						if(!n) return;
						const o = document.createElement("div");
						o.id = e, n.appendChild(o)
					})(), new window.Valine(Object.assign({
						el: "#vcomments"
					}, o)))
				}))
		},
		a = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path><rect x="9" y="3" width="6" height="4" rx="2"></rect></g></svg>';

	function s(e) {
		return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			return typeof e
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
		}, s(e)
	}

	function d(e, t) {
		for(var n = 0; n < t.length; n++) {
			var o = t[n];
			o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, (r = o.key, i = void 0, i = function(e, t) {
				if("object" !== s(e) || null === e) return e;
				var n = e[Symbol.toPrimitive];
				if(void 0 !== n) {
					var o = n.call(e, t || "default");
					if("object" !== s(o)) return o;
					throw new TypeError("@@toPrimitive must return a primitive value.")
				}
				return ("string" === t ? String : Number)(e)
			}(r, "string"), "symbol" === s(i) ? i : String(i)), o)
		}
		var r, i
	}
	var u = function(e) {
			var t = e.selector,
				n = e.eventType,
				o = e.handler,
				r = document.querySelector(t);
			null == r || r.addEventListener(n, o)
		},
		m = function() {
			function e() {
				! function(e, t) {
					if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
				}(this, e)
			}
			var t, n, o;
			return t = e, n = [{
				key: "emit",
				value: function(e, t) {
					var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document,
						o = new CustomEvent(e, {
							detail: t,
							bubbles: !0,
							composed: !0
						});
					n.dispatchEvent(o)
				}
			}, {
				key: "on",
				value: function(e, t) {
					(arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document)
					.addEventListener(e, t)
				}
			}, {
				key: "off",
				value: function(e, t) {
					(arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document)
					.removeEventListener(e, t)
				}
			}], n && d(t.prototype, n), o && d(t, o), Object.defineProperty(t, "prototype", {
				writable: !1
			}), e
		}(),
		p = new m;
	const v = e => {
		document.querySelectorAll(".toc a")
			.forEach((e => e.classList.remove("active")));
		const t = document.querySelector('.toc a[href="' + e + '"]');
		t && t.classList.add("active")
	};
	document.addEventListener("click", (function(e) {
		const t = e.target.closest(".toc-link");
		if(t) {
			const e = t.getAttribute("href");
			e && v(e)
		}
	}));
	const f = () => {
		const e = document.createElement("link");
		var t;
		e.setAttribute("id", "prism-theme"), e.rel = "stylesheet", e.type = "text/css", e.href = `/lib/prism/one-${null!==(t=localStorage.getItem(n))&&void 0!==t?t:o}.css`, document.head.append(e)
	};
	var h;
	h = () => {
		(e => {
			const n = document.querySelector(e);
			if(n) {
				const e = localStorage.getItem(t);
				e && (n.scrollTop = Number(e))
			}
		})("main.cosy-scrollbar"), window.location.hash && v(window.location.hash);
		const {
			mermaid: n,
			katex: o,
			valine: l
		} = window;
		i(Object.assign(Object.assign({}, o), {
				enable: window.page.use.indexOf("katex") > -1
			})), (e => {
				var t;
				const {
					enable: n,
					cdn: o,
					theme: i
				} = e;
				if(n) {
					const e = document.getElementById("src-mermaid");
					e && (null === (t = e.parentNode) || void 0 === t || t.removeChild(e)), r([{
							type: "js",
							url: o,
							id: "src-mermaid"
						}])
						.then((e => {
							e && window.mermaid.initialize({
								startOnLoad: !0,
								theme: i || "neutral"
							})
						}))
				}
			})(Object.assign(Object.assign({}, n), {
				enable: window.page.use.indexOf("mermaid") > -1
			})), c(Object.assign(Object.assign({}, l), {
				enable: window.page.use.indexOf("valine") > -1
			})), document.querySelectorAll(".article-container article pre > code")
			.forEach((e => {
				const t = e.parentNode;
				if(!t) return;
				const n = document.createElement("div");
				n.classList.add("code-wrapper"), t.parentNode.insertBefore(n, t), n.appendChild(t);
				const o = document.createElement("div");
				o.classList.add("btn-wrapper");
				const r = t.getAttribute("data-language"),
					i = document.createElement("span");
				i.classList.add("lang"), i.textContent = r, o.appendChild(i);
				const l = document.createElement("span");
				l.className = "copy-button", l.innerHTML = a, l.addEventListener("click", (function() {
					const t = e.textContent;
					navigator.clipboard.writeText(t)
						.then((() => {
							l.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path><rect x="9" y="3" width="6" height="4" rx="2"></rect><path d="M9 14l2 2l4-4"></path></g></svg>', setTimeout((() => {
								l.innerHTML = a
							}), 2e3)
						}))
				})), o.appendChild(l), n.appendChild(o)
			})), f();
		const s = document.querySelector("#toc-drag-box");
		var d, m, h, y, b, g, w, S;
		s && ("true" === localStorage.getItem(e) ? s.setAttribute("invisible", "") : s.removeAttribute("invisible"), p.on("cosy-drag-box:toc-box", (() => {
				localStorage.setItem(e, "true"), s.invisible = !0
			})), u({
				selector: "#toc-show-button",
				eventType: "click",
				handler: () => {
					localStorage.setItem(e, "" + !s.invisible), s.invisible = !s.invisible
				}
			}), m = (d = {
				key: "]",
				preventDefault: !0,
				handler: () => {
					localStorage.setItem(e, "" + !s.invisible), s.invisible = !s.invisible
				}
			})
			.key, h = d.handler, y = d.preventDefault, b = void 0 !== y && y, g = m.toLowerCase()
			.split("+")
			.map((function(e) {
				return e.trim()
			})), w = /Mac|iPod|iPhone|iPad/.test(navigator.platform), S = function(e) {
				g.every((function(t) {
					return "control" === t ? w ? e.metaKey : e.ctrlKey : e.key.toLowerCase() === t
				})) && (b && e.preventDefault(), h(e))
			}, document.addEventListener("keydown", S)), u({
			selector: "main.cosy-scrollbar",
			eventType: "scroll",
			handler: () => (e => {
				const n = document.querySelector(e);
				if(n) {
					const e = n.scrollTop;
					localStorage.setItem(t, String(e))
				}
			})("main.cosy-scrollbar")
		})
	}, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", h) : h()
})();

//背景

(function () {
	const canvas = document.getElementById("lines");
	const ctx = canvas.getContext("2d");
	let width;
	let height;
	class Line {
	  constructor(origin, size, length, color, style = "pattern") {
		this.size = size;
		this.origin = origin;
		this.length = length;
		this.color = color;
		this.style = style;
		this.origin = `M${origin.x},${origin.y}`;
		this.offSet = 0;
		this.line = null;
		this.offSetSpeed = length / size;
	  }
	  getColorString() {
		return `hsla(${this.color.h}deg,${this.color.s}%,${this.color.l}%,${this.color.a})`;
	  }
	  generators() {
		return [
		  {
			line: `h${this.size}`,
			mag: this.size
		  },
		  {
			line: `h-${this.size}`,
			mag: this.size
		  },
		  {
			line: `v${this.size}`,
			mag: this.size
		  },
		  {
			line: `v-${this.size}`,
			mag: this.size
		  },
		  {
			line: `l${this.size},${this.size}`,
			mag: Math.hypot(this.size, this.size)
		  },
		  {
			line: `l${this.size}-${this.size}`,
			mag: Math.hypot(this.size, this.size)
		  },
		  {
			line: `l-${this.size},${this.size}`,
			mag: Math.hypot(this.size, this.size)
		  },
		  {
			line: `l-${this.size}-${this.size}`,
			mag: Math.hypot(this.size, this.size)
		  }
		];
	  }
	  generate() {
		let segments = this.generators(this.size);
		let path = this.origin;
		let mag = 0;
		let fragment;
		let i;
		for (i = 0; i < this.length; i += 1) {
		  fragment = segments[(Math.random() * segments.length) | 0];
		  path += ` ${fragment.line}`;
		  mag += fragment.mag;
		}
		this.line = {
		  path,
		  mag
		};
		return this;
	  }
	  renderStyle(style) {
		if (style === "glitches") {
		  ctx.lineDashOffset = this.line.mag + this.offSet;
		  ctx.setLineDash([
			this.size ** 1.5,
			(this.line.mag / this.length) * this.size ** 2
		  ]);
		  this.offSet += 20;
		  // this.size / (this.size ** 2);
		  ctx.lineWidth = 2;
		  return this;
		}
		if (style === "pattern") {
		  ctx.lineDashOffset = this.line.mag - this.offSet;
		  ctx.setLineDash([this.line.mag, this.line.mag]);
		  this.offSet += 10;
		  //this.size / (this.size ** 100);
		  ctx.lineWidth = 0.2;
		}
	  }
	  mutatePath() {
		let lineFragment = this.line.path.split(" ").slice(1);
		let generator = this.generators();
		lineFragment[(Math.random() * lineFragment.length) | 0] =
		  generator[(Math.random() * generator.length) | 0].line;
		this.line.path = `${this.line.path.split(" ")[0]} ${lineFragment.join(
		  " "
		)}`;
	  }
	  draw() {
		!this.line && this.generate();
  
		ctx.strokeStyle = this.getColorString();
		this.renderStyle(this.style);
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.stroke(new Path2D(this.line.path));
		return this;
	  }
	}
	function clear() {
	  ctx.fillStyle = `hsla(235deg, 13%, 18%, 0.1)`;
	  ctx.fillRect(0, 0, width, height);
	}
	function generateLines(amount) {
	  let lines = [];
	  let styles = [
		{
		  size: 1.25,
		  style: "pattern",
		  color: { h: 210, s: 100, l: 70, a: 0.5 }
		},
		{ size: 2.5, style: "pattern", color: { h: 190, s: 90, l: 50, a: 0.3 } },
		{ size: 5, style: "pattern", color: { h: 210, s: 70, l: 60, a: 0.2 } },
		{ size: 10, style: "pattern", color: { h: 310, s: 80, l: 55, a: 0.15 } },
		{ size: 20, style: "pattern", color: { h: 200, s: 25, l: 35, a: 0.12 } },
		{ size: 20, style: "pattern", color: { h: 210, s: 20, l: 40, a: 0.12 } },
		{ size: 40, style: "pattern", color: { h: 190, s: 40, l: 50, a: 0.12 } },
		{ size: 80, style: "pattern", color: { h: 220, s: 50, l: 60, a: 0.12 } },
		{ size: 40, style: "glitches", color: { h: 300, s: 100, l: 50, a: 0.3 } },
		{ size: 20, style: "glitches", color: { h: 210, s: 100, l: 50, a: 0.3 } },
		{ size: 60, style: "glitches", color: { h: 30, s: 100, l: 50, a: 0.3 } }
	  ];
	  for (let i = 0; i < amount; i += 1) {
		let style = styles[(Math.random() ** 2 * styles.length) | 0];
		lines.push(
		  new Line(
			{ x: width * 0.5, y: height * 0.5 },
			style.size,
			500 + Math.random() * 1000,
			style.color,
			style.style
		  )
		);
	  }
	  return lines;
	}
	let id;
	function resize() {
	  id = cancelAnimationFrame(id);
	  width = window.innerWidth;
	  height = window.innerHeight;
	  canvas.width = width;
	  canvas.height = height;
	  const lines = generateLines(40);
	  function update() {
		if (!(id % 3)) {
		  clear();
		  lines.forEach((line) => {
			line.draw();
			if (!(id % 5) && Math.random() > 0.95) {
			  line.mutatePath();
			}
		  });
		}
		id = requestAnimationFrame(update);
	  }
	  id = requestAnimationFrame(update);
	}
	window.addEventListener("resize", resize, {
	  passive: true
	});
	resize();
  })();
  