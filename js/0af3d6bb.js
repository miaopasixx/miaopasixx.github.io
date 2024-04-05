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

//??

var mViewWidth = 0,
    mViewHeight = 0,
    mCanvas = document.getElementById("canvas"),
    mCtx;

var mRootDisplayNode;
var mTrees = [];

var mTreeImage = 'https://www.jq22.com/newjs/tree.png',
    mMonsterImage = 'https://www.jq22.com/newjs/monster-01.png';

var mUrls = [
    mTreeImage,
    mMonsterImage
];

var mImages = {};
var mLoadedCount = 0;

mUrls.forEach(function(url) {
    var img = mImages[url] = document.createElement('img');

    img.onload = function() {
        if (++mLoadedCount === mUrls.length) {
            init();
        }
    };

    img.crossOrigin = 'Anonymous';
    img.src = url;
});

function init() {
    initCanvas();

    createMist();
    createTrees(300);
    createMist();
    createTrees(250);
    createMist();
    createMonster();
    createTrees(160);
    createMist();
    createTrees(120);
    createMist();
    createTrees(90);
    createMist();
    createTrees(70);

    requestAnimationFrame(loop);
}

function initCanvas() {
    mViewWidth = mCanvas.width = mCanvas.clientWidth;
    mViewHeight = mCanvas.height = mCanvas.clientHeight;
    mCtx = mCanvas.getContext('2d');

    mRootDisplayNode = new Node();
}

function createMist() {
    var mist = new Node(new Mist(mViewWidth * 1.2, mViewHeight * 1.2));
    var range = randomRange(0, 100);

    mist.x = -mViewWidth * 0.1;
    mist.y = -mViewHeight * 0.1;

    TweenMax.fromTo(mist, randomRange(6, 8), {y:'-='+range}, {y:'-='+range, ease:Power1.easeInOut, repeat:-1, yoyo:true});

    mRootDisplayNode.add(mist);
}

function createMonster() {
    var monster = new Node(new Monster(mImages[mMonsterImage]));

    monster.y = 135;
    monster.x = -150;

    var stepDeltaX = 30,
        stepDeltaY = 10;

    var stepDuration = 1.6,
        startOffset = 0.6;

    function step() {
        var tl = new TimelineMax();

        if (monster.x > mViewWidth) {
            monster.x = -150;
        }

        tl.to(monster, stepDuration * 0.4, {y:'-=' + stepDeltaY, ease:Power2.easeOut}, startOffset);
        tl.to(monster, stepDuration * 0.6, {y:'+=' + stepDeltaY, ease:Power4.easeIn});
        tl.add('shake');
        tl.to(monster, stepDuration,       {x:'+=' + stepDeltaX, ease:Power1.easeOut}, startOffset);

        tl.addCallback(function() {
            mTrees.forEach(function(t) {
                TweenMax.to(t, randomRange(0.3, 0.4), {y:'+=' + randomRange(4, 16), ease:Back.easeIn, repeat:1, yoyo:true});
            });
        }, 'shake-=0.25');

        tl.eventCallback('onComplete', step);
    }

    mRootDisplayNode.add(monster);
    step();
}

function createTrees(yOffset) {
    var tree;

    var dx = mViewWidth / 12;

    for (var i = 0; i < 12; i++) {
        tree = createTree(
            mImages[mTreeImage],
            dx * i + 35 * randomRange(0.8, 1.2),
            (mViewHeight - yOffset) * randomRange(1.0, 1.2)
        );

        tree._segments.forEach(function(c) {
            var range = randomRange(0.01, 0.02);

            TweenMax.fromTo(c, randomRange(2, 10),
                {rotation:-range},
                {rotation:range, ease:Power1.easeInOut, repeat:-1, yoyo:true}
            );
        });

        mRootDisplayNode.add(tree);
        mTrees.push(tree);
    }
}


function createTree(image, x, y) {
    var totalWidth = image.naturalWidth,
        totalHeight = image.naturalHeight;

    var steps = 6,
        deltaHeight = totalHeight / steps;

    var treeRoot = new Node();
    var prevSegment = treeRoot;

    treeRoot.x = x;
    treeRoot.y = y;
    treeRoot._segments = [];

    for (var i = 0; i < steps; i++) {
        var sourceX = 0,
            sourceY = totalHeight - deltaHeight * (i + 1),
            sourceWidth = totalWidth,
            sourceHeight = deltaHeight;

        var segment = new Node(new ImageFragment(image, sourceX, sourceY, sourceWidth, sourceHeight));

        if (i === 0) {
            segment.x = -totalWidth * 0.5;
        }

        segment.y = -deltaHeight * 0.95;
        segment.pivotX = totalWidth * 0.5;
        segment.pivotY = deltaHeight;

        prevSegment.add(segment);
        prevSegment = segment;

        treeRoot._segments.push(segment);
    }

    return treeRoot;
}

/////////////////////////////
// LOOP
/////////////////////////////

function update() {

}

function draw() {
    mCtx.clearRect(0, 0, mViewWidth, mViewHeight);

    mRootDisplayNode.render();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

/////////////////////////////
// Classes
/////////////////////////////

function Monster(img) {
    this.img = img;
}
Monster.prototype = {
    draw:function() {
        mCtx.drawImage(this.img, 0, 0);
    }
};

function Mist(w, h) {
    this.w = w;
    this.h = h;

    this.gradient = mCtx.createLinearGradient(w * 0.5, h, w * randomRange(0.6, 0.9), 0);
    this.gradient.addColorStop(0.25, 'rgba(0,0,0,0)');
    this.gradient.addColorStop(randomRange(0.5, 0.7), 'rgba(255,255,255,0.3)');
    this.gradient.addColorStop(0.9, 'rgba(0,0,0,0)');
}
Mist.prototype = {
    draw:function() {
        mCtx.fillStyle = this.gradient;
        mCtx.fillRect(0, 0, this.w, this.h);
    }
};

function ImageFragment(img, sx, sy, sw, sh) {
    this.img = img;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
}
ImageFragment.prototype = {
    draw:function() {
        mCtx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, 0, 0, this.sw, this.sh);
    }
};


function Node(graphics) {
    this.graphics = graphics;
    this.x = 0;
    this.y = 0;
    this.pivotX = 0;
    this.pivotY = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.rotation = 0;
    this.children = [];
}
Node.prototype = {
    add:function(node) {
        this.children.push(node);
    },
    remove:function(node) {
        var i = this.children.indexOf(node);

        if (i >= 0) {
            this.children.splice(i, 1);
        }
    },
    render:function() {
        mCtx.save();

        mCtx.translate(this.pivotX + this.x, this.pivotY + this.y);
        mCtx.rotate(this.rotation);
        mCtx.scale(this.scaleX, this.scaleY);
        mCtx.translate(-this.pivotX, -this.pivotY);

        this.graphics && this.graphics.draw();

        for (var i = 0; i < this.children.length; i++) {
            this.children[i].render();
        }

        mCtx.restore();
    }
};

/////////////////////////////
// utils
/////////////////////////////

function randomRange(min, max) {
    return min + Math.random() * (max - min);
}