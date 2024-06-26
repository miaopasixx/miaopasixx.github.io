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


const canvas = document.getElementById('starrySky');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = [];
    const meteors = [];

    function createStar() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            brightness: Math.random() * 50 + 50
        };
    }

    function drawStar(star) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness / 100})`;
        ctx.fill();
    }

    function initStars(count) {
        for (let i = 0; i < count; i++) {
            stars.push(createStar());
        }
    }

    function updateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.brightness += (Math.random() - 0.5) * 50;
            star.brightness = Math.max(0, Math.min(100, star.brightness));
            drawStar(star);
        });
        meteors.forEach((meteor, index) => {
            if (meteor.opacity <= 0) {
                meteors.splice(index, 1);
            } else {
                drawMeteor(meteor);
                meteor.x += meteor.speed * Math.cos(meteor.angle);
                meteor.y += meteor.speed * Math.sin(meteor.angle);
                meteor.opacity -= 0.01;
                meteor.length -= meteor.speed * 0.1;
            }
        });
    }

    function createMeteor() {
        const x = Math.random() * canvas.width;
        const y = 0;
        const length = Math.random() * 100 + 100;
        const speed = Math.random() * 5 + 5;
        const angle = Math.PI / 4;
        const opacity = 1;
        return { x, y, length, speed, angle, opacity };
    }

    function drawMeteor(meteor) {
        const gradient = ctx.createLinearGradient(
            meteor.x, meteor.y,
            meteor.x - meteor.length * Math.cos(meteor.angle),
            meteor.y - meteor.length * Math.sin(meteor.angle)
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(
            meteor.x - meteor.length * Math.cos(meteor.angle),
            meteor.y - meteor.length * Math.sin(meteor.angle)
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function addMeteor() {
        if (Math.random() < 0.01) { // 1% chance to add a new meteor
            meteors.push(createMeteor());
        }
    }

    initStars(200);
    setInterval(() => {
        updateStars();
        addMeteor();
    }, 100);