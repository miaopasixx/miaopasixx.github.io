/*! For license information please see 69a216b6.js.LICENSE.txt */
(()=>{
    var t = {
        97: (t,e,n)=>{
            const r = n(821)
              , o = {};
            for (const t of Object.keys(r))
                o[r[t]] = t;
            const i = {
                rgb: {
                    channels: 3,
                    labels: "rgb"
                },
                hsl: {
                    channels: 3,
                    labels: "hsl"
                },
                hsv: {
                    channels: 3,
                    labels: "hsv"
                },
                hwb: {
                    channels: 3,
                    labels: "hwb"
                },
                cmyk: {
                    channels: 4,
                    labels: "cmyk"
                },
                xyz: {
                    channels: 3,
                    labels: "xyz"
                },
                lab: {
                    channels: 3,
                    labels: "lab"
                },
                lch: {
                    channels: 3,
                    labels: "lch"
                },
                hex: {
                    channels: 1,
                    labels: ["hex"]
                },
                keyword: {
                    channels: 1,
                    labels: ["keyword"]
                },
                ansi16: {
                    channels: 1,
                    labels: ["ansi16"]
                },
                ansi256: {
                    channels: 1,
                    labels: ["ansi256"]
                },
                hcg: {
                    channels: 3,
                    labels: ["h", "c", "g"]
                },
                apple: {
                    channels: 3,
                    labels: ["r16", "g16", "b16"]
                },
                gray: {
                    channels: 1,
                    labels: ["gray"]
                }
            };
            t.exports = i;
            for (const t of Object.keys(i)) {
                if (!("channels"in i[t]))
                    throw new Error("missing channels property: " + t);
                if (!("labels"in i[t]))
                    throw new Error("missing channel labels property: " + t);
                if (i[t].labels.length !== i[t].channels)
                    throw new Error("channel and label counts mismatch: " + t);
                const {channels: e, labels: n} = i[t];
                delete i[t].channels,
                delete i[t].labels,
                Object.defineProperty(i[t], "channels", {
                    value: e
                }),
                Object.defineProperty(i[t], "labels", {
                    value: n
                })
            }
            i.rgb.hsl = function(t) {
                const e = t[0] / 255
                  , n = t[1] / 255
                  , r = t[2] / 255
                  , o = Math.min(e, n, r)
                  , i = Math.max(e, n, r)
                  , s = i - o;
                let a, l;
                i === o ? a = 0 : e === i ? a = (n - r) / s : n === i ? a = 2 + (r - e) / s : r === i && (a = 4 + (e - n) / s),
                a = Math.min(60 * a, 360),
                a < 0 && (a += 360);
                const c = (o + i) / 2;
                return l = i === o ? 0 : c <= .5 ? s / (i + o) : s / (2 - i - o),
                [a, 100 * l, 100 * c]
            }
            ,
            i.rgb.hsv = function(t) {
                let e, n, r, o, i;
                const s = t[0] / 255
                  , a = t[1] / 255
                  , l = t[2] / 255
                  , c = Math.max(s, a, l)
                  , h = c - Math.min(s, a, l)
                  , u = function(t) {
                    return (c - t) / 6 / h + .5
                };
                return 0 === h ? (o = 0,
                i = 0) : (i = h / c,
                e = u(s),
                n = u(a),
                r = u(l),
                s === c ? o = r - n : a === c ? o = 1 / 3 + e - r : l === c && (o = 2 / 3 + n - e),
                o < 0 ? o += 1 : o > 1 && (o -= 1)),
                [360 * o, 100 * i, 100 * c]
            }
            ,
            i.rgb.hwb = function(t) {
                const e = t[0]
                  , n = t[1];
                let r = t[2];
                const o = i.rgb.hsl(t)[0]
                  , s = 1 / 255 * Math.min(e, Math.min(n, r));
                return r = 1 - 1 / 255 * Math.max(e, Math.max(n, r)),
                [o, 100 * s, 100 * r]
            }
            ,
            i.rgb.cmyk = function(t) {
                const e = t[0] / 255
                  , n = t[1] / 255
                  , r = t[2] / 255
                  , o = Math.min(1 - e, 1 - n, 1 - r);
                return [100 * ((1 - e - o) / (1 - o) || 0), 100 * ((1 - n - o) / (1 - o) || 0), 100 * ((1 - r - o) / (1 - o) || 0), 100 * o]
            }
            ,
            i.rgb.keyword = function(t) {
                const e = o[t];
                if (e)
                    return e;
                let n, i = 1 / 0;
                for (const e of Object.keys(r)) {
                    const o = r[e]
                      , l = (a = o,
                    ((s = t)[0] - a[0]) ** 2 + (s[1] - a[1]) ** 2 + (s[2] - a[2]) ** 2);
                    l < i && (i = l,
                    n = e)
                }
                var s, a;
                return n
            }
            ,
            i.keyword.rgb = function(t) {
                return r[t]
            }
            ,
            i.rgb.xyz = function(t) {
                let e = t[0] / 255
                  , n = t[1] / 255
                  , r = t[2] / 255;
                e = e > .04045 ? ((e + .055) / 1.055) ** 2.4 : e / 12.92,
                n = n > .04045 ? ((n + .055) / 1.055) ** 2.4 : n / 12.92,
                r = r > .04045 ? ((r + .055) / 1.055) ** 2.4 : r / 12.92;
                return [100 * (.4124 * e + .3576 * n + .1805 * r), 100 * (.2126 * e + .7152 * n + .0722 * r), 100 * (.0193 * e + .1192 * n + .9505 * r)]
            }
            ,
            i.rgb.lab = function(t) {
                const e = i.rgb.xyz(t);
                let n = e[0]
                  , r = e[1]
                  , o = e[2];
                n /= 95.047,
                r /= 100,
                o /= 108.883,
                n = n > .008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116,
                r = r > .008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116,
                o = o > .008856 ? o ** (1 / 3) : 7.787 * o + 16 / 116;
                return [116 * r - 16, 500 * (n - r), 200 * (r - o)]
            }
            ,
            i.hsl.rgb = function(t) {
                const e = t[0] / 360
                  , n = t[1] / 100
                  , r = t[2] / 100;
                let o, i, s;
                if (0 === n)
                    return s = 255 * r,
                    [s, s, s];
                o = r < .5 ? r * (1 + n) : r + n - r * n;
                const a = 2 * r - o
                  , l = [0, 0, 0];
                for (let t = 0; t < 3; t++)
                    i = e + 1 / 3 * -(t - 1),
                    i < 0 && i++,
                    i > 1 && i--,
                    s = 6 * i < 1 ? a + 6 * (o - a) * i : 2 * i < 1 ? o : 3 * i < 2 ? a + (o - a) * (2 / 3 - i) * 6 : a,
                    l[t] = 255 * s;
                return l
            }
            ,
            i.hsl.hsv = function(t) {
                const e = t[0];
                let n = t[1] / 100
                  , r = t[2] / 100
                  , o = n;
                const i = Math.max(r, .01);
                r *= 2,
                n *= r <= 1 ? r : 2 - r,
                o *= i <= 1 ? i : 2 - i;
                return [e, 100 * (0 === r ? 2 * o / (i + o) : 2 * n / (r + n)), 100 * ((r + n) / 2)]
            }
            ,
            i.hsv.rgb = function(t) {
                const e = t[0] / 60
                  , n = t[1] / 100;
                let r = t[2] / 100;
                const o = Math.floor(e) % 6
                  , i = e - Math.floor(e)
                  , s = 255 * r * (1 - n)
                  , a = 255 * r * (1 - n * i)
                  , l = 255 * r * (1 - n * (1 - i));
                switch (r *= 255,
                o) {
                case 0:
                    return [r, l, s];
                case 1:
                    return [a, r, s];
                case 2:
                    return [s, r, l];
                case 3:
                    return [s, a, r];
                case 4:
                    return [l, s, r];
                case 5:
                    return [r, s, a]
                }
            }
            ,
            i.hsv.hsl = function(t) {
                const e = t[0]
                  , n = t[1] / 100
                  , r = t[2] / 100
                  , o = Math.max(r, .01);
                let i, s;
                s = (2 - n) * r;
                const a = (2 - n) * o;
                return i = n * o,
                i /= a <= 1 ? a : 2 - a,
                i = i || 0,
                s /= 2,
                [e, 100 * i, 100 * s]
            }
            ,
            i.hwb.rgb = function(t) {
                const e = t[0] / 360;
                let n = t[1] / 100
                  , r = t[2] / 100;
                const o = n + r;
                let i;
                o > 1 && (n /= o,
                r /= o);
                const s = Math.floor(6 * e)
                  , a = 1 - r;
                i = 6 * e - s,
                0 != (1 & s) && (i = 1 - i);
                const l = n + i * (a - n);
                let c, h, u;
                switch (s) {
                default:
                case 6:
                case 0:
                    c = a,
                    h = l,
                    u = n;
                    break;
                case 1:
                    c = l,
                    h = a,
                    u = n;
                    break;
                case 2:
                    c = n,
                    h = a,
                    u = l;
                    break;
                case 3:
                    c = n,
                    h = l,
                    u = a;
                    break;
                case 4:
                    c = l,
                    h = n,
                    u = a;
                    break;
                case 5:
                    c = a,
                    h = n,
                    u = l
                }
                return [255 * c, 255 * h, 255 * u]
            }
            ,
            i.cmyk.rgb = function(t) {
                const e = t[0] / 100
                  , n = t[1] / 100
                  , r = t[2] / 100
                  , o = t[3] / 100;
                return [255 * (1 - Math.min(1, e * (1 - o) + o)), 255 * (1 - Math.min(1, n * (1 - o) + o)), 255 * (1 - Math.min(1, r * (1 - o) + o))]
            }
            ,
            i.xyz.rgb = function(t) {
                const e = t[0] / 100
                  , n = t[1] / 100
                  , r = t[2] / 100;
                let o, i, s;
                return o = 3.2406 * e + -1.5372 * n + -.4986 * r,
                i = -.9689 * e + 1.8758 * n + .0415 * r,
                s = .0557 * e + -.204 * n + 1.057 * r,
                o = o > .0031308 ? 1.055 * o ** (1 / 2.4) - .055 : 12.92 * o,
                i = i > .0031308 ? 1.055 * i ** (1 / 2.4) - .055 : 12.92 * i,
                s = s > .0031308 ? 1.055 * s ** (1 / 2.4) - .055 : 12.92 * s,
                o = Math.min(Math.max(0, o), 1),
                i = Math.min(Math.max(0, i), 1),
                s = Math.min(Math.max(0, s), 1),
                [255 * o, 255 * i, 255 * s]
            }
            ,
            i.xyz.lab = function(t) {
                let e = t[0]
                  , n = t[1]
                  , r = t[2];
                e /= 95.047,
                n /= 100,
                r /= 108.883,
                e = e > .008856 ? e ** (1 / 3) : 7.787 * e + 16 / 116,
                n = n > .008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116,
                r = r > .008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116;
                return [116 * n - 16, 500 * (e - n), 200 * (n - r)]
            }
            ,
            i.lab.xyz = function(t) {
                let e, n, r;
                n = (t[0] + 16) / 116,
                e = t[1] / 500 + n,
                r = n - t[2] / 200;
                const o = n ** 3
                  , i = e ** 3
                  , s = r ** 3;
                return n = o > .008856 ? o : (n - 16 / 116) / 7.787,
                e = i > .008856 ? i : (e - 16 / 116) / 7.787,
                r = s > .008856 ? s : (r - 16 / 116) / 7.787,
                e *= 95.047,
                n *= 100,
                r *= 108.883,
                [e, n, r]
            }
            ,
            i.lab.lch = function(t) {
                const e = t[0]
                  , n = t[1]
                  , r = t[2];
                let o;
                o = 360 * Math.atan2(r, n) / 2 / Math.PI,
                o < 0 && (o += 360);
                return [e, Math.sqrt(n * n + r * r), o]
            }
            ,
            i.lch.lab = function(t) {
                const e = t[0]
                  , n = t[1]
                  , r = t[2] / 360 * 2 * Math.PI;
                return [e, n * Math.cos(r), n * Math.sin(r)]
            }
            ,
            i.rgb.ansi16 = function(t, e=null) {
                const [n,r,o] = t;
                let s = null === e ? i.rgb.hsv(t)[2] : e;
                if (s = Math.round(s / 50),
                0 === s)
                    return 30;
                let a = 30 + (Math.round(o / 255) << 2 | Math.round(r / 255) << 1 | Math.round(n / 255));
                return 2 === s && (a += 60),
                a
            }
            ,
            i.hsv.ansi16 = function(t) {
                return i.rgb.ansi16(i.hsv.rgb(t), t[2])
            }
            ,
            i.rgb.ansi256 = function(t) {
                const e = t[0]
                  , n = t[1]
                  , r = t[2];
                if (e === n && n === r)
                    return e < 8 ? 16 : e > 248 ? 231 : Math.round((e - 8) / 247 * 24) + 232;
                return 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(r / 255 * 5)
            }
            ,
            i.ansi16.rgb = function(t) {
                let e = t % 10;
                if (0 === e || 7 === e)
                    return t > 50 && (e += 3.5),
                    e = e / 10.5 * 255,
                    [e, e, e];
                const n = .5 * (1 + ~~(t > 50));
                return [(1 & e) * n * 255, (e >> 1 & 1) * n * 255, (e >> 2 & 1) * n * 255]
            }
            ,
            i.ansi256.rgb = function(t) {
                if (t >= 232) {
                    const e = 10 * (t - 232) + 8;
                    return [e, e, e]
                }
                let e;
                t -= 16;
                return [Math.floor(t / 36) / 5 * 255, Math.floor((e = t % 36) / 6) / 5 * 255, e % 6 / 5 * 255]
            }
            ,
            i.rgb.hex = function(t) {
                const e = (((255 & Math.round(t[0])) << 16) + ((255 & Math.round(t[1])) << 8) + (255 & Math.round(t[2]))).toString(16).toUpperCase();
                return "000000".substring(e.length) + e
            }
            ,
            i.hex.rgb = function(t) {
                const e = t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
                if (!e)
                    return [0, 0, 0];
                let n = e[0];
                3 === e[0].length && (n = n.split("").map((t=>t + t)).join(""));
                const r = parseInt(n, 16);
                return [r >> 16 & 255, r >> 8 & 255, 255 & r]
            }
            ,
            i.rgb.hcg = function(t) {
                const e = t[0] / 255
                  , n = t[1] / 255
                  , r = t[2] / 255
                  , o = Math.max(Math.max(e, n), r)
                  , i = Math.min(Math.min(e, n), r)
                  , s = o - i;
                let a, l;
                return a = s < 1 ? i / (1 - s) : 0,
                l = s <= 0 ? 0 : o === e ? (n - r) / s % 6 : o === n ? 2 + (r - e) / s : 4 + (e - n) / s,
                l /= 6,
                l %= 1,
                [360 * l, 100 * s, 100 * a]
            }
            ,
            i.hsl.hcg = function(t) {
                const e = t[1] / 100
                  , n = t[2] / 100
                  , r = n < .5 ? 2 * e * n : 2 * e * (1 - n);
                let o = 0;
                return r < 1 && (o = (n - .5 * r) / (1 - r)),
                [t[0], 100 * r, 100 * o]
            }
            ,
            i.hsv.hcg = function(t) {
                const e = t[1] / 100
                  , n = t[2] / 100
                  , r = e * n;
                let o = 0;
                return r < 1 && (o = (n - r) / (1 - r)),
                [t[0], 100 * r, 100 * o]
            }
            ,
            i.hcg.rgb = function(t) {
                const e = t[0] / 360
                  , n = t[1] / 100
                  , r = t[2] / 100;
                if (0 === n)
                    return [255 * r, 255 * r, 255 * r];
                const o = [0, 0, 0]
                  , i = e % 1 * 6
                  , s = i % 1
                  , a = 1 - s;
                let l = 0;
                switch (Math.floor(i)) {
                case 0:
                    o[0] = 1,
                    o[1] = s,
                    o[2] = 0;
                    break;
                case 1:
                    o[0] = a,
                    o[1] = 1,
                    o[2] = 0;
                    break;
                case 2:
                    o[0] = 0,
                    o[1] = 1,
                    o[2] = s;
                    break;
                case 3:
                    o[0] = 0,
                    o[1] = a,
                    o[2] = 1;
                    break;
                case 4:
                    o[0] = s,
                    o[1] = 0,
                    o[2] = 1;
                    break;
                default:
                    o[0] = 1,
                    o[1] = 0,
                    o[2] = a
                }
                return l = (1 - n) * r,
                [255 * (n * o[0] + l), 255 * (n * o[1] + l), 255 * (n * o[2] + l)]
            }
            ,
            i.hcg.hsv = function(t) {
                const e = t[1] / 100
                  , n = e + t[2] / 100 * (1 - e);
                let r = 0;
                return n > 0 && (r = e / n),
                [t[0], 100 * r, 100 * n]
            }
            ,
            i.hcg.hsl = function(t) {
                const e = t[1] / 100
                  , n = t[2] / 100 * (1 - e) + .5 * e;
                let r = 0;
                return n > 0 && n < .5 ? r = e / (2 * n) : n >= .5 && n < 1 && (r = e / (2 * (1 - n))),
                [t[0], 100 * r, 100 * n]
            }
            ,
            i.hcg.hwb = function(t) {
                const e = t[1] / 100
                  , n = e + t[2] / 100 * (1 - e);
                return [t[0], 100 * (n - e), 100 * (1 - n)]
            }
            ,
            i.hwb.hcg = function(t) {
                const e = t[1] / 100
                  , n = 1 - t[2] / 100
                  , r = n - e;
                let o = 0;
                return r < 1 && (o = (n - r) / (1 - r)),
                [t[0], 100 * r, 100 * o]
            }
            ,
            i.apple.rgb = function(t) {
                return [t[0] / 65535 * 255, t[1] / 65535 * 255, t[2] / 65535 * 255]
            }
            ,
            i.rgb.apple = function(t) {
                return [t[0] / 255 * 65535, t[1] / 255 * 65535, t[2] / 255 * 65535]
            }
            ,
            i.gray.rgb = function(t) {
                return [t[0] / 100 * 255, t[0] / 100 * 255, t[0] / 100 * 255]
            }
            ,
            i.gray.hsl = function(t) {
                return [0, 0, t[0]]
            }
            ,
            i.gray.hsv = i.gray.hsl,
            i.gray.hwb = function(t) {
                return [0, 100, t[0]]
            }
            ,
            i.gray.cmyk = function(t) {
                return [0, 0, 0, t[0]]
            }
            ,
            i.gray.lab = function(t) {
                return [t[0], 0, 0]
            }
            ,
            i.gray.hex = function(t) {
                const e = 255 & Math.round(t[0] / 100 * 255)
                  , n = ((e << 16) + (e << 8) + e).toString(16).toUpperCase();
                return "000000".substring(n.length) + n
            }
            ,
            i.rgb.gray = function(t) {
                return [(t[0] + t[1] + t[2]) / 3 / 255 * 100]
            }
        }
        ,
        398: (t,e,n)=>{
            const r = n(97)
              , o = n(657)
              , i = {};
            Object.keys(r).forEach((t=>{
                i[t] = {},
                Object.defineProperty(i[t], "channels", {
                    value: r[t].channels
                }),
                Object.defineProperty(i[t], "labels", {
                    value: r[t].labels
                });
                const e = o(t);
                Object.keys(e).forEach((n=>{
                    const r = e[n];
                    i[t][n] = function(t) {
                        const e = function(...e) {
                            const n = e[0];
                            if (null == n)
                                return n;
                            n.length > 1 && (e = n);
                            const r = t(e);
                            if ("object" == typeof r)
                                for (let t = r.length, e = 0; e < t; e++)
                                    r[e] = Math.round(r[e]);
                            return r
                        };
                        return "conversion"in t && (e.conversion = t.conversion),
                        e
                    }(r),
                    i[t][n].raw = function(t) {
                        const e = function(...e) {
                            const n = e[0];
                            return null == n ? n : (n.length > 1 && (e = n),
                            t(e))
                        };
                        return "conversion"in t && (e.conversion = t.conversion),
                        e
                    }(r)
                }
                ))
            }
            )),
            t.exports = i
        }
        ,
        657: (t,e,n)=>{
            const r = n(97);
            function o(t) {
                const e = function() {
                    const t = {}
                      , e = Object.keys(r);
                    for (let n = e.length, r = 0; r < n; r++)
                        t[e[r]] = {
                            distance: -1,
                            parent: null
                        };
                    return t
                }()
                  , n = [t];
                for (e[t].distance = 0; n.length; ) {
                    const t = n.pop()
                      , o = Object.keys(r[t]);
                    for (let r = o.length, i = 0; i < r; i++) {
                        const r = o[i]
                          , s = e[r];
                        -1 === s.distance && (s.distance = e[t].distance + 1,
                        s.parent = t,
                        n.unshift(r))
                    }
                }
                return e
            }
            function i(t, e) {
                return function(n) {
                    return e(t(n))
                }
            }
            function s(t, e) {
                const n = [e[t].parent, t];
                let o = r[e[t].parent][t]
                  , s = e[t].parent;
                for (; e[s].parent; )
                    n.unshift(e[s].parent),
                    o = i(r[e[s].parent][s], o),
                    s = e[s].parent;
                return o.conversion = n,
                o
            }
            t.exports = function(t) {
                const e = o(t)
                  , n = {}
                  , r = Object.keys(e);
                for (let t = r.length, o = 0; o < t; o++) {
                    const t = r[o];
                    null !== e[t].parent && (n[t] = s(t, e))
                }
                return n
            }
        }
        ,
        821: t=>{
            "use strict";
            t.exports = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            }
        }
        ,
        945: (t,e,n)=>{
            var r = n(821)
              , o = n(187)
              , i = Object.hasOwnProperty
              , s = Object.create(null);
            for (var a in r)
                i.call(r, a) && (s[r[a]] = a);
            var l = t.exports = {
                to: {},
                get: {}
            };
            function c(t, e, n) {
                return Math.min(Math.max(e, t), n)
            }
            function h(t) {
                var e = Math.round(t).toString(16).toUpperCase();
                return e.length < 2 ? "0" + e : e
            }
            l.get = function(t) {
                var e, n;
                switch (t.substring(0, 3).toLowerCase()) {
                case "hsl":
                    e = l.get.hsl(t),
                    n = "hsl";
                    break;
                case "hwb":
                    e = l.get.hwb(t),
                    n = "hwb";
                    break;
                default:
                    e = l.get.rgb(t),
                    n = "rgb"
                }
                return e ? {
                    model: n,
                    value: e
                } : null
            }
            ,
            l.get.rgb = function(t) {
                if (!t)
                    return null;
                var e, n, o, s = [0, 0, 0, 1];
                if (e = t.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)) {
                    for (o = e[2],
                    e = e[1],
                    n = 0; n < 3; n++) {
                        var a = 2 * n;
                        s[n] = parseInt(e.slice(a, a + 2), 16)
                    }
                    o && (s[3] = parseInt(o, 16) / 255)
                } else if (e = t.match(/^#([a-f0-9]{3,4})$/i)) {
                    for (o = (e = e[1])[3],
                    n = 0; n < 3; n++)
                        s[n] = parseInt(e[n] + e[n], 16);
                    o && (s[3] = parseInt(o + o, 16) / 255)
                } else if (e = t.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)) {
                    for (n = 0; n < 3; n++)
                        s[n] = parseInt(e[n + 1], 0);
                    e[4] && (e[5] ? s[3] = .01 * parseFloat(e[4]) : s[3] = parseFloat(e[4]))
                } else {
                    if (!(e = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)))
                        return (e = t.match(/^(\w+)$/)) ? "transparent" === e[1] ? [0, 0, 0, 0] : i.call(r, e[1]) ? ((s = r[e[1]])[3] = 1,
                        s) : null : null;
                    for (n = 0; n < 3; n++)
                        s[n] = Math.round(2.55 * parseFloat(e[n + 1]));
                    e[4] && (e[5] ? s[3] = .01 * parseFloat(e[4]) : s[3] = parseFloat(e[4]))
                }
                for (n = 0; n < 3; n++)
                    s[n] = c(s[n], 0, 255);
                return s[3] = c(s[3], 0, 1),
                s
            }
            ,
            l.get.hsl = function(t) {
                if (!t)
                    return null;
                var e = t.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
                if (e) {
                    var n = parseFloat(e[4]);
                    return [(parseFloat(e[1]) % 360 + 360) % 360, c(parseFloat(e[2]), 0, 100), c(parseFloat(e[3]), 0, 100), c(isNaN(n) ? 1 : n, 0, 1)]
                }
                return null
            }
            ,
            l.get.hwb = function(t) {
                if (!t)
                    return null;
                var e = t.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
                if (e) {
                    var n = parseFloat(e[4]);
                    return [(parseFloat(e[1]) % 360 + 360) % 360, c(parseFloat(e[2]), 0, 100), c(parseFloat(e[3]), 0, 100), c(isNaN(n) ? 1 : n, 0, 1)]
                }
                return null
            }
            ,
            l.to.hex = function() {
                var t = o(arguments);
                return "#" + h(t[0]) + h(t[1]) + h(t[2]) + (t[3] < 1 ? h(Math.round(255 * t[3])) : "")
            }
            ,
            l.to.rgb = function() {
                var t = o(arguments);
                return t.length < 4 || 1 === t[3] ? "rgb(" + Math.round(t[0]) + ", " + Math.round(t[1]) + ", " + Math.round(t[2]) + ")" : "rgba(" + Math.round(t[0]) + ", " + Math.round(t[1]) + ", " + Math.round(t[2]) + ", " + t[3] + ")"
            }
            ,
            l.to.rgb.percent = function() {
                var t = o(arguments)
                  , e = Math.round(t[0] / 255 * 100)
                  , n = Math.round(t[1] / 255 * 100)
                  , r = Math.round(t[2] / 255 * 100);
                return t.length < 4 || 1 === t[3] ? "rgb(" + e + "%, " + n + "%, " + r + "%)" : "rgba(" + e + "%, " + n + "%, " + r + "%, " + t[3] + ")"
            }
            ,
            l.to.hsl = function() {
                var t = o(arguments);
                return t.length < 4 || 1 === t[3] ? "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)" : "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + t[3] + ")"
            }
            ,
            l.to.hwb = function() {
                var t = o(arguments)
                  , e = "";
                return t.length >= 4 && 1 !== t[3] && (e = ", " + t[3]),
                "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + e + ")"
            }
            ,
            l.to.keyword = function(t) {
                return s[t.slice(0, 3)]
            }
        }
        ,
        106: (t,e,n)=>{
            const r = n(945)
              , o = n(398)
              , i = ["keyword", "gray", "hex"]
              , s = {};
            for (const t of Object.keys(o))
                s[[...o[t].labels].sort().join("")] = t;
            const a = {};
            function l(t, e) {
                if (!(this instanceof l))
                    return new l(t,e);
                if (e && e in i && (e = null),
                e && !(e in o))
                    throw new Error("Unknown model: " + e);
                let n, c;
                if (null == t)
                    this.model = "rgb",
                    this.color = [0, 0, 0],
                    this.valpha = 1;
                else if (t instanceof l)
                    this.model = t.model,
                    this.color = [...t.color],
                    this.valpha = t.valpha;
                else if ("string" == typeof t) {
                    const e = r.get(t);
                    if (null === e)
                        throw new Error("Unable to parse color from string: " + t);
                    this.model = e.model,
                    c = o[this.model].channels,
                    this.color = e.value.slice(0, c),
                    this.valpha = "number" == typeof e.value[c] ? e.value[c] : 1
                } else if (t.length > 0) {
                    this.model = e || "rgb",
                    c = o[this.model].channels;
                    const n = Array.prototype.slice.call(t, 0, c);
                    this.color = d(n, c),
                    this.valpha = "number" == typeof t[c] ? t[c] : 1
                } else if ("number" == typeof t)
                    this.model = "rgb",
                    this.color = [t >> 16 & 255, t >> 8 & 255, 255 & t],
                    this.valpha = 1;
                else {
                    this.valpha = 1;
                    const e = Object.keys(t);
                    "alpha"in t && (e.splice(e.indexOf("alpha"), 1),
                    this.valpha = "number" == typeof t.alpha ? t.alpha : 0);
                    const r = e.sort().join("");
                    if (!(r in s))
                        throw new Error("Unable to parse color from object: " + JSON.stringify(t));
                    this.model = s[r];
                    const {labels: i} = o[this.model]
                      , a = [];
                    for (n = 0; n < i.length; n++)
                        a.push(t[i[n]]);
                    this.color = d(a)
                }
                if (a[this.model])
                    for (c = o[this.model].channels,
                    n = 0; n < c; n++) {
                        const t = a[this.model][n];
                        t && (this.color[n] = t(this.color[n]))
                    }
                this.valpha = Math.max(0, Math.min(1, this.valpha)),
                Object.freeze && Object.freeze(this)
            }
            l.prototype = {
                toString() {
                    return this.string()
                },
                toJSON() {
                    return this[this.model]()
                },
                string(t) {
                    let e = this.model in r.to ? this : this.rgb();
                    e = e.round("number" == typeof t ? t : 1);
                    const n = 1 === e.valpha ? e.color : [...e.color, this.valpha];
                    return r.to[e.model](n)
                },
                percentString(t) {
                    const e = this.rgb().round("number" == typeof t ? t : 1)
                      , n = 1 === e.valpha ? e.color : [...e.color, this.valpha];
                    return r.to.rgb.percent(n)
                },
                array() {
                    return 1 === this.valpha ? [...this.color] : [...this.color, this.valpha]
                },
                object() {
                    const t = {}
                      , {channels: e} = o[this.model]
                      , {labels: n} = o[this.model];
                    for (let r = 0; r < e; r++)
                        t[n[r]] = this.color[r];
                    return 1 !== this.valpha && (t.alpha = this.valpha),
                    t
                },
                unitArray() {
                    const t = this.rgb().color;
                    return t[0] /= 255,
                    t[1] /= 255,
                    t[2] /= 255,
                    1 !== this.valpha && t.push(this.valpha),
                    t
                },
                unitObject() {
                    const t = this.rgb().object();
                    return t.r /= 255,
                    t.g /= 255,
                    t.b /= 255,
                    1 !== this.valpha && (t.alpha = this.valpha),
                    t
                },
                round(t) {
                    return t = Math.max(t || 0, 0),
                    new l([...this.color.map(c(t)), this.valpha],this.model)
                },
                alpha(t) {
                    return void 0 !== t ? new l([...this.color, Math.max(0, Math.min(1, t))],this.model) : this.valpha
                },
                red: h("rgb", 0, u(255)),
                green: h("rgb", 1, u(255)),
                blue: h("rgb", 2, u(255)),
                hue: h(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (t=>(t % 360 + 360) % 360)),
                saturationl: h("hsl", 1, u(100)),
                lightness: h("hsl", 2, u(100)),
                saturationv: h("hsv", 1, u(100)),
                value: h("hsv", 2, u(100)),
                chroma: h("hcg", 1, u(100)),
                gray: h("hcg", 2, u(100)),
                white: h("hwb", 1, u(100)),
                wblack: h("hwb", 2, u(100)),
                cyan: h("cmyk", 0, u(100)),
                magenta: h("cmyk", 1, u(100)),
                yellow: h("cmyk", 2, u(100)),
                black: h("cmyk", 3, u(100)),
                x: h("xyz", 0, u(95.047)),
                y: h("xyz", 1, u(100)),
                z: h("xyz", 2, u(108.833)),
                l: h("lab", 0, u(100)),
                a: h("lab", 1),
                b: h("lab", 2),
                keyword(t) {
                    return void 0 !== t ? new l(t) : o[this.model].keyword(this.color)
                },
                hex(t) {
                    return void 0 !== t ? new l(t) : r.to.hex(this.rgb().round().color)
                },
                hexa(t) {
                    if (void 0 !== t)
                        return new l(t);
                    const e = this.rgb().round().color;
                    let n = Math.round(255 * this.valpha).toString(16).toUpperCase();
                    return 1 === n.length && (n = "0" + n),
                    r.to.hex(e) + n
                },
                rgbNumber() {
                    const t = this.rgb().color;
                    return (255 & t[0]) << 16 | (255 & t[1]) << 8 | 255 & t[2]
                },
                luminosity() {
                    const t = this.rgb().color
                      , e = [];
                    for (const [n,r] of t.entries()) {
                        const t = r / 255;
                        e[n] = t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4
                    }
                    return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
                },
                contrast(t) {
                    const e = this.luminosity()
                      , n = t.luminosity();
                    return e > n ? (e + .05) / (n + .05) : (n + .05) / (e + .05)
                },
                level(t) {
                    const e = this.contrast(t);
                    return e >= 7 ? "AAA" : e >= 4.5 ? "AA" : ""
                },
                isDark() {
                    const t = this.rgb().color;
                    return (2126 * t[0] + 7152 * t[1] + 722 * t[2]) / 1e4 < 128
                },
                isLight() {
                    return !this.isDark()
                },
                negate() {
                    const t = this.rgb();
                    for (let e = 0; e < 3; e++)
                        t.color[e] = 255 - t.color[e];
                    return t
                },
                lighten(t) {
                    const e = this.hsl();
                    return e.color[2] += e.color[2] * t,
                    e
                },
                darken(t) {
                    const e = this.hsl();
                    return e.color[2] -= e.color[2] * t,
                    e
                },
                saturate(t) {
                    const e = this.hsl();
                    return e.color[1] += e.color[1] * t,
                    e
                },
                desaturate(t) {
                    const e = this.hsl();
                    return e.color[1] -= e.color[1] * t,
                    e
                },
                whiten(t) {
                    const e = this.hwb();
                    return e.color[1] += e.color[1] * t,
                    e
                },
                blacken(t) {
                    const e = this.hwb();
                    return e.color[2] += e.color[2] * t,
                    e
                },
                grayscale() {
                    const t = this.rgb().color
                      , e = .3 * t[0] + .59 * t[1] + .11 * t[2];
                    return l.rgb(e, e, e)
                },
                fade(t) {
                    return this.alpha(this.valpha - this.valpha * t)
                },
                opaquer(t) {
                    return this.alpha(this.valpha + this.valpha * t)
                },
                rotate(t) {
                    const e = this.hsl();
                    let n = e.color[0];
                    return n = (n + t) % 360,
                    n = n < 0 ? 360 + n : n,
                    e.color[0] = n,
                    e
                },
                mix(t, e) {
                    if (!t || !t.rgb)
                        throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof t);
                    const n = t.rgb()
                      , r = this.rgb()
                      , o = void 0 === e ? .5 : e
                      , i = 2 * o - 1
                      , s = n.alpha() - r.alpha()
                      , a = ((i * s == -1 ? i : (i + s) / (1 + i * s)) + 1) / 2
                      , c = 1 - a;
                    return l.rgb(a * n.red() + c * r.red(), a * n.green() + c * r.green(), a * n.blue() + c * r.blue(), n.alpha() * o + r.alpha() * (1 - o))
                }
            };
            for (const t of Object.keys(o)) {
                if (i.includes(t))
                    continue;
                const {channels: e} = o[t];
                l.prototype[t] = function(...e) {
                    return this.model === t ? new l(this) : e.length > 0 ? new l(e,t) : new l([...(n = o[this.model][t].raw(this.color),
                    Array.isArray(n) ? n : [n]), this.valpha],t);
                    var n
                }
                ,
                l[t] = function(...n) {
                    let r = n[0];
                    return "number" == typeof r && (r = d(n, e)),
                    new l(r,t)
                }
            }
            function c(t) {
                return function(e) {
                    return function(t, e) {
                        return Number(t.toFixed(e))
                    }(e, t)
                }
            }
            function h(t, e, n) {
                t = Array.isArray(t) ? t : [t];
                for (const r of t)
                    (a[r] || (a[r] = []))[e] = n;
                return t = t[0],
                function(r) {
                    let o;
                    return void 0 !== r ? (n && (r = n(r)),
                    o = this[t](),
                    o.color[e] = r,
                    o) : (o = this[t]().color[e],
                    n && (o = n(o)),
                    o)
                }
            }
            function u(t) {
                return function(e) {
                    return Math.max(0, Math.min(t, e))
                }
            }
            function d(t, e) {
                for (let n = 0; n < e; n++)
                    "number" != typeof t[n] && (t[n] = 0);
                return t
            }
            t.exports = l
        }
        ,
        86: t=>{
            t.exports = function(t) {
                return !(!t || "string" == typeof t) && (t instanceof Array || Array.isArray(t) || t.length >= 0 && (t.splice instanceof Function || Object.getOwnPropertyDescriptor(t, t.length - 1) && "String" !== t.constructor.name))
            }
        }
        ,
        187: (t,e,n)=>{
            "use strict";
            var r = n(86)
              , o = Array.prototype.concat
              , i = Array.prototype.slice
              , s = t.exports = function(t) {
                for (var e = [], n = 0, s = t.length; n < s; n++) {
                    var a = t[n];
                    r(a) ? e = o.call(e, i.call(a)) : e.push(a)
                }
                return e
            }
            ;
            s.wrap = function(t) {
                return function() {
                    return t(s(arguments))
                }
            }
        }
    }
      , e = {};
    function n(r) {
        var o = e[r];
        if (void 0 !== o)
            return o.exports;
        var i = e[r] = {
            exports: {}
        };
        return t[r](i, i.exports, n),
        i.exports
    }
    n.n = t=>{
        var e = t && t.__esModule ? ()=>t.default : ()=>t;
        return n.d(e, {
            a: e
        }),
        e
    }
    ,
    n.d = (t,e)=>{
        for (var r in e)
            n.o(e, r) && !n.o(t, r) && Object.defineProperty(t, r, {
                enumerable: !0,
                get: e[r]
            })
    }
    ,
    n.o = (t,e)=>Object.prototype.hasOwnProperty.call(t, e),
    (()=>{
        "use strict";
        const t = globalThis
          , e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets"in Document.prototype && "replace"in CSSStyleSheet.prototype
          , r = Symbol()
          , o = new WeakMap;
        class i {
            constructor(t, e, n) {
                if (this._$cssResult$ = !0,
                n !== r)
                    throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
                this.cssText = t,
                this.t = e
            }
            get styleSheet() {
                let t = this.o;
                const n = this.t;
                if (e && void 0 === t) {
                    const e = void 0 !== n && 1 === n.length;
                    e && (t = o.get(n)),
                    void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText),
                    e && o.set(n, t))
                }
                return t
            }
            toString() {
                return this.cssText
            }
        }
        const s = (t,...e)=>{
            const n = 1 === t.length ? t[0] : e.reduce(((e,n,r)=>e + (t=>{
                if (!0 === t._$cssResult$)
                    return t.cssText;
                if ("number" == typeof t)
                    return t;
                throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
            }
            )(n) + t[r + 1]), t[0]);
            return new i(n,t,r)
        }
          , a = e ? t=>t : t=>t instanceof CSSStyleSheet ? (t=>{
            let e = "";
            for (const n of t.cssRules)
                e += n.cssText;
            return (t=>new i("string" == typeof t ? t : t + "",void 0,r))(e)
        }
        )(t) : t
          , {is: l, defineProperty: c, getOwnPropertyDescriptor: h, getOwnPropertyNames: u, getOwnPropertySymbols: d, getPrototypeOf: p} = Object
          , f = globalThis
          , g = f.trustedTypes
          , v = g ? g.emptyScript : ""
          , y = f.reactiveElementPolyfillSupport
          , m = (t,e)=>t
          , b = {
            toAttribute(t, e) {
                switch (e) {
                case Boolean:
                    t = t ? v : null;
                    break;
                case Object:
                case Array:
                    t = null == t ? t : JSON.stringify(t)
                }
                return t
            },
            fromAttribute(t, e) {
                let n = t;
                switch (e) {
                case Boolean:
                    n = null !== t;
                    break;
                case Number:
                    n = null === t ? null : Number(t);
                    break;
                case Object:
                case Array:
                    try {
                        n = JSON.parse(t)
                    } catch (t) {
                        n = null
                    }
                }
                return n
            }
        }
          , w = (t,e)=>!l(t, e)
          , x = {
            attribute: !0,
            type: String,
            converter: b,
            reflect: !1,
            hasChanged: w
        };
        Symbol.metadata ??= Symbol("metadata"),
        f.litPropertyMetadata ??= new WeakMap;
        class k extends HTMLElement {
            static addInitializer(t) {
                this._$Ei(),
                (this.l ??= []).push(t)
            }
            static get observedAttributes() {
                return this.finalize(),
                this._$Eh && [...this._$Eh.keys()]
            }
            static createProperty(t, e=x) {
                if (e.state && (e.attribute = !1),
                this._$Ei(),
                this.elementProperties.set(t, e),
                !e.noAccessor) {
                    const n = Symbol()
                      , r = this.getPropertyDescriptor(t, n, e);
                    void 0 !== r && c(this.prototype, t, r)
                }
            }
            static getPropertyDescriptor(t, e, n) {
                const {get: r, set: o} = h(this.prototype, t) ?? {
                    get() {
                        return this[e]
                    },
                    set(t) {
                        this[e] = t
                    }
                };
                return {
                    get() {
                        return r?.call(this)
                    },
                    set(e) {
                        const i = r?.call(this);
                        o.call(this, e),
                        this.requestUpdate(t, i, n)
                    },
                    configurable: !0,
                    enumerable: !0
                }
            }
            static getPropertyOptions(t) {
                return this.elementProperties.get(t) ?? x
            }
            static _$Ei() {
                if (this.hasOwnProperty(m("elementProperties")))
                    return;
                const t = p(this);
                t.finalize(),
                void 0 !== t.l && (this.l = [...t.l]),
                this.elementProperties = new Map(t.elementProperties)
            }
            static finalize() {
                if (this.hasOwnProperty(m("finalized")))
                    return;
                if (this.finalized = !0,
                this._$Ei(),
                this.hasOwnProperty(m("properties"))) {
                    const t = this.properties
                      , e = [...u(t), ...d(t)];
                    for (const n of e)
                        this.createProperty(n, t[n])
                }
                const t = this[Symbol.metadata];
                if (null !== t) {
                    const e = litPropertyMetadata.get(t);
                    if (void 0 !== e)
                        for (const [t,n] of e)
                            this.elementProperties.set(t, n)
                }
                this._$Eh = new Map;
                for (const [t,e] of this.elementProperties) {
                    const n = this._$Eu(t, e);
                    void 0 !== n && this._$Eh.set(n, t)
                }
                this.elementStyles = this.finalizeStyles(this.styles)
            }
            static finalizeStyles(t) {
                const e = [];
                if (Array.isArray(t)) {
                    const n = new Set(t.flat(1 / 0).reverse());
                    for (const t of n)
                        e.unshift(a(t))
                } else
                    void 0 !== t && e.push(a(t));
                return e
            }
            static _$Eu(t, e) {
                const n = e.attribute;
                return !1 === n ? void 0 : "string" == typeof n ? n : "string" == typeof t ? t.toLowerCase() : void 0
            }
            constructor() {
                super(),
                this._$Ep = void 0,
                this.isUpdatePending = !1,
                this.hasUpdated = !1,
                this._$Em = null,
                this._$Ev()
            }
            _$Ev() {
                this._$Eg = new Promise((t=>this.enableUpdating = t)),
                this._$AL = new Map,
                this._$ES(),
                this.requestUpdate(),
                this.constructor.l?.forEach((t=>t(this)))
            }
            addController(t) {
                (this._$E_ ??= new Set).add(t),
                void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.()
            }
            removeController(t) {
                this._$E_?.delete(t)
            }
            _$ES() {
                const t = new Map
                  , e = this.constructor.elementProperties;
                for (const n of e.keys())
                    this.hasOwnProperty(n) && (t.set(n, this[n]),
                    delete this[n]);
                t.size > 0 && (this._$Ep = t)
            }
            createRenderRoot() {
                const n = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
                return ((n,r)=>{
                    if (e)
                        n.adoptedStyleSheets = r.map((t=>t instanceof CSSStyleSheet ? t : t.styleSheet));
                    else
                        for (const e of r) {
                            const r = document.createElement("style")
                              , o = t.litNonce;
                            void 0 !== o && r.setAttribute("nonce", o),
                            r.textContent = e.cssText,
                            n.appendChild(r)
                        }
                }
                )(n, this.constructor.elementStyles),
                n
            }
            connectedCallback() {
                this.renderRoot ??= this.createRenderRoot(),
                this.enableUpdating(!0),
                this._$E_?.forEach((t=>t.hostConnected?.()))
            }
            enableUpdating(t) {}
            disconnectedCallback() {
                this._$E_?.forEach((t=>t.hostDisconnected?.()))
            }
            attributeChangedCallback(t, e, n) {
                this._$AK(t, n)
            }
            _$EO(t, e) {
                const n = this.constructor.elementProperties.get(t)
                  , r = this.constructor._$Eu(t, n);
                if (void 0 !== r && !0 === n.reflect) {
                    const o = (void 0 !== n.converter?.toAttribute ? n.converter : b).toAttribute(e, n.type);
                    this._$Em = t,
                    null == o ? this.removeAttribute(r) : this.setAttribute(r, o),
                    this._$Em = null
                }
            }
            _$AK(t, e) {
                const n = this.constructor
                  , r = n._$Eh.get(t);
                if (void 0 !== r && this._$Em !== r) {
                    const t = n.getPropertyOptions(r)
                      , o = "function" == typeof t.converter ? {
                        fromAttribute: t.converter
                    } : void 0 !== t.converter?.fromAttribute ? t.converter : b;
                    this._$Em = r,
                    this[r] = o.fromAttribute(e, t.type),
                    this._$Em = null
                }
            }
            requestUpdate(t, e, n, r=!1, o) {
                if (void 0 !== t) {
                    if (n ??= this.constructor.getPropertyOptions(t),
                    !(n.hasChanged ?? w)(r ? o : this[t], e))
                        return;
                    this.C(t, e, n)
                }
                !1 === this.isUpdatePending && (this._$Eg = this._$EP())
            }
            C(t, e, n) {
                this._$AL.has(t) || this._$AL.set(t, e),
                !0 === n.reflect && this._$Em !== t && (this._$Ej ??= new Set).add(t)
            }
            async _$EP() {
                this.isUpdatePending = !0;
                try {
                    await this._$Eg
                } catch (t) {
                    Promise.reject(t)
                }
                const t = this.scheduleUpdate();
                return null != t && await t,
                !this.isUpdatePending
            }
            scheduleUpdate() {
                return this.performUpdate()
            }
            performUpdate() {
                if (!this.isUpdatePending)
                    return;
                if (!this.hasUpdated) {
                    if (this.renderRoot ??= this.createRenderRoot(),
                    this._$Ep) {
                        for (const [t,e] of this._$Ep)
                            this[t] = e;
                        this._$Ep = void 0
                    }
                    const t = this.constructor.elementProperties;
                    if (t.size > 0)
                        for (const [e,n] of t)
                            !0 !== n.wrapped || this._$AL.has(e) || void 0 === this[e] || this.C(e, this[e], n)
                }
                let t = !1;
                const e = this._$AL;
                try {
                    t = this.shouldUpdate(e),
                    t ? (this.willUpdate(e),
                    this._$E_?.forEach((t=>t.hostUpdate?.())),
                    this.update(e)) : this._$ET()
                } catch (e) {
                    throw t = !1,
                    this._$ET(),
                    e
                }
                t && this._$AE(e)
            }
            willUpdate(t) {}
            _$AE(t) {
                this._$E_?.forEach((t=>t.hostUpdated?.())),
                this.hasUpdated || (this.hasUpdated = !0,
                this.firstUpdated(t)),
                this.updated(t)
            }
            _$ET() {
                this._$AL = new Map,
                this.isUpdatePending = !1
            }
            get updateComplete() {
                return this.getUpdateComplete()
            }
            getUpdateComplete() {
                return this._$Eg
            }
            shouldUpdate(t) {
                return !0
            }
            update(t) {
                this._$Ej &&= this._$Ej.forEach((t=>this._$EO(t, this[t]))),
                this._$ET()
            }
            updated(t) {}
            firstUpdated(t) {}
        }
        k.elementStyles = [],
        k.shadowRootOptions = {
            mode: "open"
        },
        k[m("elementProperties")] = new Map,
        k[m("finalized")] = new Map,
        y?.({
            ReactiveElement: k
        }),
        (f.reactiveElementVersions ??= []).push("2.0.2");
        const E = globalThis
          , $ = E.trustedTypes
          , _ = $ ? $.createPolicy("lit-html", {
            createHTML: t=>t
        }) : void 0
          , A = "$lit$"
          , S = `lit$${(Math.random() + "").slice(9)}$`
          , M = "?" + S
          , C = `<${M}>`
          , P = document
          , O = ()=>P.createComment("")
          , z = t=>null === t || "object" != typeof t && "function" != typeof t
          , j = Array.isArray
          , D = t=>j(t) || "function" == typeof t?.[Symbol.iterator]
          , U = "[ \t\n\f\r]"
          , T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g
          , N = /-->/g
          , R = />/g
          , L = RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g")
          , H = /'/g
          , B = /"/g
          , I = /^(?:script|style|textarea|title)$/i
          , W = t=>(e,...n)=>({
            _$litType$: t,
            strings: e,
            values: n
        })
          , q = W(1)
          , F = (W(2),
        Symbol.for("lit-noChange"))
          , X = Symbol.for("lit-nothing")
          , V = new WeakMap
          , Y = P.createTreeWalker(P, 129);
        function J(t, e) {
            if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
                throw Error("invalid template strings array");
            return void 0 !== _ ? _.createHTML(e) : e
        }
        const K = (t,e)=>{
            const n = t.length - 1
              , r = [];
            let o, i = 2 === e ? "<svg>" : "", s = T;
            for (let e = 0; e < n; e++) {
                const n = t[e];
                let a, l, c = -1, h = 0;
                for (; h < n.length && (s.lastIndex = h,
                l = s.exec(n),
                null !== l); )
                    h = s.lastIndex,
                    s === T ? "!--" === l[1] ? s = N : void 0 !== l[1] ? s = R : void 0 !== l[2] ? (I.test(l[2]) && (o = RegExp("</" + l[2], "g")),
                    s = L) : void 0 !== l[3] && (s = L) : s === L ? ">" === l[0] ? (s = o ?? T,
                    c = -1) : void 0 === l[1] ? c = -2 : (c = s.lastIndex - l[2].length,
                    a = l[1],
                    s = void 0 === l[3] ? L : '"' === l[3] ? B : H) : s === B || s === H ? s = L : s === N || s === R ? s = T : (s = L,
                    o = void 0);
                const u = s === L && t[e + 1].startsWith("/>") ? " " : "";
                i += s === T ? n + C : c >= 0 ? (r.push(a),
                n.slice(0, c) + A + n.slice(c) + S + u) : n + S + (-2 === c ? e : u)
            }
            return [J(t, i + (t[n] || "<?>") + (2 === e ? "</svg>" : "")), r]
        }
        ;
        class Z {
            constructor({strings: t, _$litType$: e}, n) {
                let r;
                this.parts = [];
                let o = 0
                  , i = 0;
                const s = t.length - 1
                  , a = this.parts
                  , [l,c] = K(t, e);
                if (this.el = Z.createElement(l, n),
                Y.currentNode = this.el.content,
                2 === e) {
                    const t = this.el.content.firstChild;
                    t.replaceWith(...t.childNodes)
                }
                for (; null !== (r = Y.nextNode()) && a.length < s; ) {
                    if (1 === r.nodeType) {
                        if (r.hasAttributes())
                            for (const t of r.getAttributeNames())
                                if (t.endsWith(A)) {
                                    const e = c[i++]
                                      , n = r.getAttribute(t).split(S)
                                      , s = /([.?@])?(.*)/.exec(e);
                                    a.push({
                                        type: 1,
                                        index: o,
                                        name: s[2],
                                        strings: n,
                                        ctor: "." === s[1] ? nt : "?" === s[1] ? rt : "@" === s[1] ? ot : et
                                    }),
                                    r.removeAttribute(t)
                                } else
                                    t.startsWith(S) && (a.push({
                                        type: 6,
                                        index: o
                                    }),
                                    r.removeAttribute(t));
                        if (I.test(r.tagName)) {
                            const t = r.textContent.split(S)
                              , e = t.length - 1;
                            if (e > 0) {
                                r.textContent = $ ? $.emptyScript : "";
                                for (let n = 0; n < e; n++)
                                    r.append(t[n], O()),
                                    Y.nextNode(),
                                    a.push({
                                        type: 2,
                                        index: ++o
                                    });
                                r.append(t[e], O())
                            }
                        }
                    } else if (8 === r.nodeType)
                        if (r.data === M)
                            a.push({
                                type: 2,
                                index: o
                            });
                        else {
                            let t = -1;
                            for (; -1 !== (t = r.data.indexOf(S, t + 1)); )
                                a.push({
                                    type: 7,
                                    index: o
                                }),
                                t += S.length - 1
                        }
                    o++
                }
            }
            static createElement(t, e) {
                const n = P.createElement("template");
                return n.innerHTML = t,
                n
            }
        }
        function G(t, e, n=t, r) {
            if (e === F)
                return e;
            let o = void 0 !== r ? n._$Co?.[r] : n._$Cl;
            const i = z(e) ? void 0 : e._$litDirective$;
            return o?.constructor !== i && (o?._$AO?.(!1),
            void 0 === i ? o = void 0 : (o = new i(t),
            o._$AT(t, n, r)),
            void 0 !== r ? (n._$Co ??= [])[r] = o : n._$Cl = o),
            void 0 !== o && (e = G(t, o._$AS(t, e.values), o, r)),
            e
        }
        class Q {
            constructor(t, e) {
                this._$AV = [],
                this._$AN = void 0,
                this._$AD = t,
                this._$AM = e
            }
            get parentNode() {
                return this._$AM.parentNode
            }
            get _$AU() {
                return this._$AM._$AU
            }
            u(t) {
                const {el: {content: e}, parts: n} = this._$AD
                  , r = (t?.creationScope ?? P).importNode(e, !0);
                Y.currentNode = r;
                let o = Y.nextNode()
                  , i = 0
                  , s = 0
                  , a = n[0];
                for (; void 0 !== a; ) {
                    if (i === a.index) {
                        let e;
                        2 === a.type ? e = new tt(o,o.nextSibling,this,t) : 1 === a.type ? e = new a.ctor(o,a.name,a.strings,this,t) : 6 === a.type && (e = new it(o,this,t)),
                        this._$AV.push(e),
                        a = n[++s]
                    }
                    i !== a?.index && (o = Y.nextNode(),
                    i++)
                }
                return Y.currentNode = P,
                r
            }
            p(t) {
                let e = 0;
                for (const n of this._$AV)
                    void 0 !== n && (void 0 !== n.strings ? (n._$AI(t, n, e),
                    e += n.strings.length - 2) : n._$AI(t[e])),
                    e++
            }
        }
        class tt {
            get _$AU() {
                return this._$AM?._$AU ?? this._$Cv
            }
            constructor(t, e, n, r) {
                this.type = 2,
                this._$AH = X,
                this._$AN = void 0,
                this._$AA = t,
                this._$AB = e,
                this._$AM = n,
                this.options = r,
                this._$Cv = r?.isConnected ?? !0
            }
            get parentNode() {
                let t = this._$AA.parentNode;
                const e = this._$AM;
                return void 0 !== e && 11 === t?.nodeType && (t = e.parentNode),
                t
            }
            get startNode() {
                return this._$AA
            }
            get endNode() {
                return this._$AB
            }
            _$AI(t, e=this) {
                t = G(this, t, e),
                z(t) ? t === X || null == t || "" === t ? (this._$AH !== X && this._$AR(),
                this._$AH = X) : t !== this._$AH && t !== F && this._(t) : void 0 !== t._$litType$ ? this.g(t) : void 0 !== t.nodeType ? this.$(t) : D(t) ? this.T(t) : this._(t)
            }
            k(t) {
                return this._$AA.parentNode.insertBefore(t, this._$AB)
            }
            $(t) {
                this._$AH !== t && (this._$AR(),
                this._$AH = this.k(t))
            }
            _(t) {
                this._$AH !== X && z(this._$AH) ? this._$AA.nextSibling.data = t : this.$(P.createTextNode(t)),
                this._$AH = t
            }
            g(t) {
                const {values: e, _$litType$: n} = t
                  , r = "number" == typeof n ? this._$AC(t) : (void 0 === n.el && (n.el = Z.createElement(J(n.h, n.h[0]), this.options)),
                n);
                if (this._$AH?._$AD === r)
                    this._$AH.p(e);
                else {
                    const t = new Q(r,this)
                      , n = t.u(this.options);
                    t.p(e),
                    this.$(n),
                    this._$AH = t
                }
            }
            _$AC(t) {
                let e = V.get(t.strings);
                return void 0 === e && V.set(t.strings, e = new Z(t)),
                e
            }
            T(t) {
                j(this._$AH) || (this._$AH = [],
                this._$AR());
                const e = this._$AH;
                let n, r = 0;
                for (const o of t)
                    r === e.length ? e.push(n = new tt(this.k(O()),this.k(O()),this,this.options)) : n = e[r],
                    n._$AI(o),
                    r++;
                r < e.length && (this._$AR(n && n._$AB.nextSibling, r),
                e.length = r)
            }
            _$AR(t=this._$AA.nextSibling, e) {
                for (this._$AP?.(!1, !0, e); t && t !== this._$AB; ) {
                    const e = t.nextSibling;
                    t.remove(),
                    t = e
                }
            }
            setConnected(t) {
                void 0 === this._$AM && (this._$Cv = t,
                this._$AP?.(t))
            }
        }
        class et {
            get tagName() {
                return this.element.tagName
            }
            get _$AU() {
                return this._$AM._$AU
            }
            constructor(t, e, n, r, o) {
                this.type = 1,
                this._$AH = X,
                this._$AN = void 0,
                this.element = t,
                this.name = e,
                this._$AM = r,
                this.options = o,
                n.length > 2 || "" !== n[0] || "" !== n[1] ? (this._$AH = Array(n.length - 1).fill(new String),
                this.strings = n) : this._$AH = X
            }
            _$AI(t, e=this, n, r) {
                const o = this.strings;
                let i = !1;
                if (void 0 === o)
                    t = G(this, t, e, 0),
                    i = !z(t) || t !== this._$AH && t !== F,
                    i && (this._$AH = t);
                else {
                    const r = t;
                    let s, a;
                    for (t = o[0],
                    s = 0; s < o.length - 1; s++)
                        a = G(this, r[n + s], e, s),
                        a === F && (a = this._$AH[s]),
                        i ||= !z(a) || a !== this._$AH[s],
                        a === X ? t = X : t !== X && (t += (a ?? "") + o[s + 1]),
                        this._$AH[s] = a
                }
                i && !r && this.O(t)
            }
            O(t) {
                t === X ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "")
            }
        }
        class nt extends et {
            constructor() {
                super(...arguments),
                this.type = 3
            }
            O(t) {
                this.element[this.name] = t === X ? void 0 : t
            }
        }
        class rt extends et {
            constructor() {
                super(...arguments),
                this.type = 4
            }
            O(t) {
                this.element.toggleAttribute(this.name, !!t && t !== X)
            }
        }
        class ot extends et {
            constructor(t, e, n, r, o) {
                super(t, e, n, r, o),
                this.type = 5
            }
            _$AI(t, e=this) {
                if ((t = G(this, t, e, 0) ?? X) === F)
                    return;
                const n = this._$AH
                  , r = t === X && n !== X || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive
                  , o = t !== X && (n === X || r);
                r && this.element.removeEventListener(this.name, this, n),
                o && this.element.addEventListener(this.name, this, t),
                this._$AH = t
            }
            handleEvent(t) {
                "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t)
            }
        }
        class it {
            constructor(t, e, n) {
                this.element = t,
                this.type = 6,
                this._$AN = void 0,
                this._$AM = e,
                this.options = n
            }
            get _$AU() {
                return this._$AM._$AU
            }
            _$AI(t) {
                G(this, t)
            }
        }
        const st = E.litHtmlPolyfillSupport;
        st?.(Z, tt),
        (E.litHtmlVersions ??= []).push("3.1.0");
        class at extends k {
            constructor() {
                super(...arguments),
                this.renderOptions = {
                    host: this
                },
                this._$Do = void 0
            }
            createRenderRoot() {
                const t = super.createRenderRoot();
                return this.renderOptions.renderBefore ??= t.firstChild,
                t
            }
            update(t) {
                const e = this.render();
                this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
                super.update(t),
                this._$Do = ((t,e,n)=>{
                    const r = n?.renderBefore ?? e;
                    let o = r._$litPart$;
                    if (void 0 === o) {
                        const t = n?.renderBefore ?? null;
                        r._$litPart$ = o = new tt(e.insertBefore(O(), t),t,void 0,n ?? {})
                    }
                    return o._$AI(t),
                    o
                }
                )(e, this.renderRoot, this.renderOptions)
            }
            connectedCallback() {
                super.connectedCallback(),
                this._$Do?.setConnected(!0)
            }
            disconnectedCallback() {
                super.disconnectedCallback(),
                this._$Do?.setConnected(!1)
            }
            render() {
                return F
            }
        }
        at._$litElement$ = !0,
        at.finalized = !0,
        globalThis.litElementHydrateSupport?.({
            LitElement: at
        });
        const lt = globalThis.litElementPolyfillSupport;
        lt?.({
            LitElement: at
        });
        (globalThis.litElementVersions ??= []).push("4.0.2");
        const ct = {
            attribute: !0,
            type: String,
            converter: b,
            reflect: !1,
            hasChanged: w
        }
          , ht = (t=ct,e,n)=>{
            const {kind: r, metadata: o} = n;
            let i = globalThis.litPropertyMetadata.get(o);
            if (void 0 === i && globalThis.litPropertyMetadata.set(o, i = new Map),
            i.set(n.name, t),
            "accessor" === r) {
                const {name: r} = n;
                return {
                    set(n) {
                        const o = e.get.call(this);
                        e.set.call(this, n),
                        this.requestUpdate(r, o, t)
                    },
                    init(e) {
                        return void 0 !== e && this.C(r, void 0, t),
                        e
                    }
                }
            }
            if ("setter" === r) {
                const {name: r} = n;
                return function(n) {
                    const o = this[r];
                    e.call(this, n),
                    this.requestUpdate(r, o, t)
                }
            }
            throw Error("Unsupported decorator location: " + r)
        }
        ;
        function ut(t) {
            return (e,n)=>"object" == typeof n ? ht(t, e, n) : ((t,e,n)=>{
                const r = e.hasOwnProperty(n);
                return e.constructor.createProperty(n, r ? {
                    ...t,
                    wrapped: !0
                } : t),
                r ? Object.getOwnPropertyDescriptor(e, n) : void 0
            }
            )(t, e, n)
        }
        function dt(t) {
            return dt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            }
            : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            ,
            dt(t)
        }
        function pt(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, (o = r.key,
                i = void 0,
                i = function(t, e) {
                    if ("object" !== dt(t) || null === t)
                        return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(t, e || "default");
                        if ("object" !== dt(r))
                            return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(o, "string"),
                "symbol" === dt(i) ? i : String(i)), r)
            }
            var o, i
        }
        var ft, gt, vt, yt, mt, bt, wt, xt, kt, Et, $t, _t, At, St, Mt, Ct, Pt, Ot, zt, jt, Dt, Ut, Tt, Nt, Rt, Lt, Ht, Bt = function(t) {
            var e = t.selector
              , n = t.eventType
              , r = t.handler
              , o = document.querySelector(e);
            null == o || o.addEventListener(n, r)
        }, It = function() {
            function t() {
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t)
            }
            var e, n, r;
            return e = t,
            n = [{
                key: "emit",
                value: function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document
                      , r = new CustomEvent(t,{
                        detail: e,
                        bubbles: !0,
                        composed: !0
                    });
                    n.dispatchEvent(r)
                }
            }, {
                key: "on",
                value: function(t, e) {
                    (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document).addEventListener(t, e)
                }
            }, {
                key: "off",
                value: function(t, e) {
                    (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document).removeEventListener(t, e)
                }
            }],
            n && pt(e.prototype, n),
            r && pt(e, r),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            t
        }(), Wt = new It, qt = function(t, e) {
            return document.documentElement.style.setProperty(t, e)
        };
        function Ft() {
            return Ft = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t, e, n) {
                var r = function(t, e) {
                    for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = Qt(t)); )
                        ;
                    return t
                }(t, e);
                if (r) {
                    var o = Object.getOwnPropertyDescriptor(r, e);
                    return o.get ? o.get.call(arguments.length < 3 ? t : n) : o.value
                }
            }
            ,
            Ft.apply(this, arguments)
        }
        function Xt(t, e) {
            return e || (e = t.slice(0)),
            Object.freeze(Object.defineProperties(t, {
                raw: {
                    value: Object.freeze(e)
                }
            }))
        }
        function Vt(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function Yt(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, (o = r.key,
                i = void 0,
                i = function(t, e) {
                    if ("object" !== te(t) || null === t)
                        return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(t, e || "default");
                        if ("object" !== te(r))
                            return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }(o, "string"),
                "symbol" === te(i) ? i : String(i)), r)
            }
            var o, i
        }
        function Jt(t, e, n) {
            return e && Yt(t.prototype, e),
            n && Yt(t, n),
            Object.defineProperty(t, "prototype", {
                writable: !1
            }),
            t
        }
        function Kt(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }),
            Object.defineProperty(t, "prototype", {
                writable: !1
            }),
            e && Zt(t, e)
        }
        function Zt(t, e) {
            return Zt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e,
                t
            }
            ,
            Zt(t, e)
        }
        function Gt(t) {
            var e = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" == typeof Proxy)
                    return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                    ))),
                    !0
                } catch (t) {
                    return !1
                }
            }();
            return function() {
                var n, r = Qt(t);
                if (e) {
                    var o = Qt(this).constructor;
                    n = Reflect.construct(r, arguments, o)
                } else
                    n = r.apply(this, arguments);
                return function(t, e) {
                    if (e && ("object" === te(e) || "function" == typeof e))
                        return e;
                    if (void 0 !== e)
                        throw new TypeError("Derived constructors may only return object or undefined");
                    return function(t) {
                        if (void 0 === t)
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t)
                }(this, n)
            }
        }
        function Qt(t) {
            return Qt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            }
            ,
            Qt(t)
        }
        function te(t) {
            return te = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            }
            : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            ,
            te(t)
        }
        function ee(t, e, n, r) {
            var o, i = arguments.length, s = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : te(Reflect)) && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, r);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s),
            s
        }
        "function" == typeof SuppressedError && SuppressedError;
        var ne = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.call(this)).invisible = !1,
                t.uid = t.generateUniqueId(),
                t.eventBus = Wt,
                t
            }
            return Jt(n, [{
                key: "generateUniqueId",
                value: function() {
                    return "unique-".concat(Math.random().toString(36).slice(2, 11))
                }
            }]),
            n
        }(at);
        ne.styles = s(ft || (ft = Xt(["\n    :host([invisible]) {\n      display: none;\n    }\n    :host([disabled]) {\n      pointer-events: none;\n      opacity: 0.6;\n    }\n  "]))),
        ee([ut({
            type: String
        })], ne.prototype, "uid", void 0),
        ee([ut({
            type: Boolean
        })], ne.prototype, "disabled", void 0),
        ee([ut({
            type: Boolean,
            reflect: !0
        })], ne.prototype, "invisible", void 0);
        var re = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.apply(this, arguments)).size = "md",
                t.type = "solid",
                t
            }
            return Jt(n, [{
                key: "render",
                value: function() {
                    return q(gt || (gt = Xt(['<button\n      class="size-', " ", '"\n      @click="', '"\n      style="border-style:', '"\n    >\n      \x3c!-- prefix图标插槽 --\x3e\n      <slot name="prefix"></slot>\n      \x3c!-- 文本插槽 --\x3e\n      <slot name="content"></slot>\n      \x3c!-- suffix图标插槽 --\x3e\n      <slot name="suffix"></slot>\n    </button>'])), this.size, this.round ? "round" : "", this.handleClick, this.type)
                }
            }, {
                key: "handleClick",
                value: function() {
                    var t = this.uid;
                    this.eventBus.emit("cosy-button:click:".concat(t), {
                        uid: t
                    })
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(vt || (vt = Xt(['\n        button {\n          transition: all 0.3s ease;\n          background-color: var(--color-button-bg);\n          border-width: 1px;\n          border-color: var(--color-button-border);\n          color: var(--color-button-font);\n          text-align: center;\n          text-decoration: none;\n          border-radius: var(--radius-base, 4px);\n          display: inline-flex;\n          gap: 6px;\n          align-items: center;\n          cursor: pointer;\n        }\n        button:hover {\n          color: var(--color-button-font-hover);\n          background-color: var(--color-button-bg-hover);\n          border-color: var(--color-button-border-hover);\n        }\n        ::slotted([slot="content"]) {\n          padding-right: 2px;\n          line-height: 1.5;\n        }\n        .round {\n          border-radius: 16px;\n        }\n        .size-sm {\n          padding: 2px 6px;\n          font-size: 12px;\n        }\n        .size-md {\n          padding: 2px 6px;\n          font-size: 14px;\n        }\n        .size-lg {\n          padding: 2px 6px;\n          font-size: 16px;\n        }\n\n        .size-sm ::slotted([slot="prefix"]),\n        .size-sm ::slotted([slot="suffix"]) {\n          width: 12px;\n          height: 12px;\n        }\n\n        .size-md ::slotted([slot="prefix"]),\n        .size-md ::slotted([slot="suffix"]) {\n          width: 14px;\n          height: 14px;\n        }\n\n        .size-lg ::slotted([slot="prefix"]),\n        .size-lg ::slotted([slot="suffix"]) {\n          width: 16px;\n          height: 16px;\n        }\n      '])))]
                }
            }]),
            n
        }(ne);
        ee([ut({
            type: String
        })], re.prototype, "size", void 0),
        ee([ut({
            type: String
        })], re.prototype, "type", void 0),
        ee([ut({
            type: Boolean
        })], re.prototype, "round", void 0),
        customElements.get("cosy-button") || customElements.define("cosy-button", re);
        var oe = "cosy-icon"
          , ie = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.apply(this, arguments)).size = "md",
                t.blank = !1,
                t.buttonStyle = !1,
                t
            }
            return Jt(n, [{
                key: "render",
                value: function() {
                    if (this.href) {
                        var t = this.blank ? "blank" : "";
                        return q(mt || (mt = Xt(['<a\n        href="', '"\n        target="', '"\n        class="size-', '"\n        ><slot></slot\n      ></a>'])), this.href, t, this.size)
                    }
                    return q(yt || (yt = Xt(['<a class="size-', '"><slot></slot></a>'])), this.size)
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(bt || (bt = Xt(["\n        :host {\n          display: inline-flex;\n          justify-content: center;\n          align-items: center;\n        }\n        a {\n          color: var(--color-icon);\n          text-decoration: none;\n          transition: color 0.3s;\n          cursor: pointer;\n        }\n        a:hover {\n          color: var(--color-icon-hover);\n        }\n        .size-sm {\n          width: 16px;\n          height: 16px;\n        }\n        .size-md {\n          width: 20px;\n          height: 20px;\n        }\n        .size-lg {\n          width: 24px;\n          height: 24px;\n        }\n        svg {\n          width: 100%;\n          height: 100%;\n          fill: currentColor;\n        }\n        :host([bordered]) {\n          background: var(--color-button-bg);\n          border: 1px solid var(--color-button-border);\n          border-radius: var(--raius-base, 4px);\n        }\n        :host([bordered]:hover) {\n          background: var(--color-button-bg-hover);\n          border-color: var(--color-button-border-hover);\n        }\n      "])))]
                }
            }]),
            n
        }(ne);
        ee([ut({
            type: String
        })], ie.prototype, "size", void 0),
        ee([ut({
            type: String
        })], ie.prototype, "href", void 0),
        ee([ut({
            type: Boolean
        })], ie.prototype, "blank", void 0),
        ee([ut({
            type: Boolean,
            attribute: "bordered"
        })], ie.prototype, "buttonStyle", void 0),
        customElements.get(oe) || customElements.define(oe, ie);
        var se = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.apply(this, arguments)).size = "md",
                t
            }
            return Jt(n, [{
                key: "render",
                value: function() {
                    return q(wt || (wt = Xt(["<div class=", ">\n      <span><slot></slot></span>\n    </div>"])), "size-".concat(this.size))
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(xt || (xt = Xt(["\n        div {\n          display: inline-flex;\n          padding: 6px;\n          border-radius: var(--radius-base, 4px);\n          background-color: var(--color-short-key-bg);\n          color: var(--color-short-key-font);\n        }\n        .size-sm {\n          padding: 2px;\n        }\n        .size-md {\n          padding: 4px;\n        }\n        .size-lg {\n          padding: 6px;\n        }\n        span {\n          display: inline-flex;\n          justify-content: center;\n          align-items: center;\n          text-transform: capitalize;\n          height: 14px;\n          min-width: 14px;\n          font-size: 14px;\n        }\n        svg {\n          width: 100%;\n          height: 100%;\n          fill: currentColor;\n        }\n      "])))]
                }
            }]),
            n
        }(ne);
        ee([ut({
            type: String
        })], se.prototype, "size", void 0),
        customElements.get("cosy-short-key") || customElements.define("cosy-short-key", se);
        var ae = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.apply(this, arguments)).placeholder = "搜索",
                t.iconOnly = !1,
                t
            }
            return Jt(n, [{
                key: "handleClick",
                value: function() {}
            }, {
                key: "render",
                value: function() {
                    return q(kt || (kt = Xt(['<form\n      @click="', '"\n      class="', '"\n    >\n      <svg\n        xmlns="http://www.w3.org/2000/svg"\n        xmlns:xlink="http://www.w3.org/1999/xlink"\n        viewBox="0 0 20 20"\n      >\n        <g fill="none">\n          <path\n            d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z"\n            fill="currentColor"\n          ></path>\n        </g>\n      </svg>\n      <span>', '</span>\n      <slot name="short-key"></slot>\n    </form>'])), this.handleClick, this.iconOnly ? "icon-only" : "", this.placeholder)
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(Et || (Et = Xt(["\n        form {\n          display: flex;\n          align-items: center;\n          padding: 0 6px;\n          height: 32px;\n          border-radius: var(--radius-base, 4px);\n          background: var(--color-search-bg);\n          border: 1px solid var(--color-search-border);\n          transition: all 0.3s;\n          cursor: pointer;\n        }\n        .icon-only {\n          display: inline-flex;\n          justify-content: center;\n          padding: 6px;\n          height: auto;\n        }\n        .icon-only span {\n          display: none;\n        }\n        .icon-only slot {\n          display: none;\n        }\n        form:hover {\n          border-color: var(--color-search-border-hover);\n        }\n        svg {\n          transition: all 0.3s;\n          color: var(--color-search-font);\n          width: 16px;\n          height: 16px;\n        }\n        span {\n          flex: 1;\n          padding: 0 6px;\n          font-size: 13px;\n          color: var(--color-search-font);\n        }\n      "])))]
                }
            }]),
            n
        }(ne);
        ee([ut({
            type: String
        })], ae.prototype, "placeholder", void 0),
        ee([ut({
            type: Boolean,
            attribute: "icon-only"
        })], ae.prototype, "iconOnly", void 0),
        customElements.get("cosy-search") || customElements.define("cosy-search", ae);
        var le = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.apply(this, arguments)).checked = !1,
                t.size = "md",
                t
            }
            return Jt(n, [{
                key: "toggleChecked",
                value: function() {
                    this.checked = !this.checked
                }
            }, {
                key: "render",
                value: function() {
                    return q($t || ($t = Xt(['\n      <div class="switch switch-', '" @click="', '">\n        <div class="switch-knob">\n          <div class="content content-left">\n            <slot name="left"></slot>\n          </div>\n          <div class="content content-right">\n            <slot name="right"></slot>\n          </div>\n        </div>\n      </div>\n    '])), this.size, this.toggleChecked)
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(_t || (_t = Xt(["\n        .switch-sm {\n          --switch-width: 36px; /* 默认宽度 */\n          --switch-height: 18px; /* 默认高度 */\n          --switch-radius: 9px; /* 默认圆角 */\n        }\n        .switch-md {\n          --switch-width: 42px; /* 默认宽度 */\n          --switch-height: 20px; /* 默认高度 */\n          --switch-radius: 10px; /* 默认圆角 */\n        }\n        .switch-lg {\n          --switch-width: 48px; /* 默认宽度 */\n          --switch-height: 24px; /* 默认高度 */\n          --switch-radius: 12px; /* 默认圆角 */\n        }\n        .switch {\n          width: var(--switch-width);\n          height: var(--switch-height);\n          border-radius: var(--switch-radius);\n          background-color: var(--color-switch-track-bg);\n          border: 1px solid var(--color-switch-border);\n          position: relative;\n          cursor: pointer;\n          transition: border 0.3s, background-color 0.3s;\n        }\n        .switch:hover {\n          border-color: var(--color-switch-border-hover);\n        }\n        .switch-knob {\n          position: absolute;\n          width: 50%;\n          height: 100%;\n          background-color: var(--color-switch-bg);\n          border-radius: var(--switch-radius);\n          transition: background-color 0.3s, border 0.3s, left 0.3s;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          overflow: hidden;\n          transform: scale(1.05);\n          left: 0;\n        }\n        :host([checked]) .switch {\n          background-color: var(--color-switch-track-bg-checked);\n        }\n        :host([checked]) .switch-knob {\n          left: 50%;\n          color: var(--color-switch-font-checked);\n          background-color: var(--color-switch-bg-checked);\n        }\n        .content {\n          position: absolute;\n          width: 100%;\n          height: 100%;\n          display: none;\n          align-items: center;\n          justify-content: center;\n          overflow: hidden;\n        }\n        .content ::slotted(*) {\n          max-width: 70%;\n          max-height: 70%;\n          text-align: center;\n          white-space: nowrap;\n          overflow: hidden;\n          text-overflow: ellipsis;\n        }\n        :host(:not([checked])) .content-left,\n        :host([checked]) .content-right {\n          display: flex;\n        }\n      "])))]
                }
            }]),
            n
        }(ne);
        ee([ut({
            type: Boolean,
            reflect: !0
        })], le.prototype, "checked", void 0),
        ee([ut({
            type: String
        })], le.prototype, "size", void 0),
        customElements.get("cosy-switch") || customElements.define("cosy-switch", le);
        var ce = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.apply(this, arguments)).placement = "bottom",
                t.maxWidth = "220px",
                t.textWrap = !1,
                t.textWrapWidth = "220px",
                t.fontColor = "var(--color-font-1)",
                t
            }
            return Jt(n, [{
                key: "render",
                value: function() {
                    return q(At || (At = Xt(['<div class="tooltip">\n      <slot\n        name="content"\n        class="tooltip-content ', '"\n        style="color:', ";max-width: ", ";white-space: ", "; line-height: ", " ; width: ", '"\n      ></slot\n      ><slot style="line-height:1.2"></slot>\n    </div>'])), this.placement, this.fontColor, this.maxWidth, this.textWrap ? "wrap" : "nowrap", this.textWrap ? 1.5 : 1, this.textWrap ? this.textWrapWidth : "inherit")
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(St || (St = Xt(["\n        .tooltip {\n          position: relative;\n          display: inline-flex;\n          user-select: none;\n        }\n        .tooltip-content {\n          display: inline-block;\n          visibility: hidden;\n          opacity: 0;\n          background-color: var(--color-tooltip-bg);\n          border: 1px solid var(--color-tooltip-border);\n          backdrop-filter: var(--color-frost-bg);\n          padding: 4px 8px;\n          border-radius: var(--radius-base, 4px);\n          position: absolute;\n          z-index: 1;\n          font-size: 13px;\n          transition: opacity 0.3s ease, visibility 0.3s;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n        }\n        .tooltip:hover .tooltip-content {\n          visibility: visible;\n          opacity: 1;\n        }\n        .top {\n          bottom: calc(100% + 6px);\n          left: 50%;\n          transform: translateX(-50%);\n        }\n        .top-left {\n          left: 0;\n          bottom: calc(100% + 6px);\n        }\n        .top-right {\n          right: 0;\n          bottom: 115%;\n        }\n        .bottom {\n          top: calc(100% + 6px);\n          left: 50%;\n          transform: translateX(-50%);\n        }\n        .bottom-left {\n          left: 0;\n          top: calc(100% + 6px);\n        }\n        .bottom-right {\n          right: 0;\n          top: calc(100% + 6px);\n        }\n        .left {\n          right: calc(100% + 6px);\n          top: 50%;\n          transform: translateY(-50%);\n        }\n        .right {\n          left: calc(100% + 6px);\n          top: 50%;\n          transform: translateY(-50%);\n        }\n      "])))]
                }
            }]),
            n
        }(ne);
        ee([ut({
            type: String
        })], ce.prototype, "placement", void 0),
        ee([ut({
            type: String,
            attribute: "max-width"
        })], ce.prototype, "maxWidth", void 0),
        ee([ut({
            type: Boolean,
            attribute: "text-wrap"
        })], ce.prototype, "textWrap", void 0),
        ee([ut({
            type: String,
            attribute: "text-wrap-width"
        })], ce.prototype, "textWrapWidth", void 0),
        ee([ut({
            type: String,
            attribute: "font-color"
        })], ce.prototype, "fontColor", void 0),
        customElements.get("cosy-tooltip") || customElements.define("cosy-tooltip", ce);
        var he = "cosy-drag-box"
          , ue = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.apply(this, arguments)).trigger = "right",
                t.minWidth = 100,
                t.hideThreshold = 50,
                t.dragging = null,
                t.startX = 0,
                t.startWidth = 0,
                t.drag = function(e) {
                    if (t.dragging) {
                        t.updateDraggerOpacity();
                        var n = e.clientX - t.startX
                          , r = "left" === t.dragging ? t.startWidth - n : t.startWidth + n;
                        r > t.minWidth ? t.style.width = "".concat(r, "px") : r < t.hideThreshold && (t.invisible = !0,
                        t.dragging = null,
                        t.eventBus.emit("".concat(he, ":").concat(t.uid), {
                            uid: t.uid,
                            invisible: !0
                        }))
                    }
                }
                ,
                t.stopDrag = function() {
                    t.dragging && (document.removeEventListener("mousemove", t.drag),
                    document.removeEventListener("mouseup", t.stopDrag),
                    t.dragging = null),
                    t.updateDraggerOpacity()
                }
                ,
                t.startDrag = function(e, n) {
                    t.dragging = n,
                    t.startX = e.clientX,
                    t.startWidth = t.offsetWidth,
                    document.addEventListener("mousemove", t.drag),
                    document.addEventListener("mouseup", t.stopDrag),
                    e.preventDefault()
                }
                ,
                t.renderDragger = function() {
                    var e = t.trigger;
                    return q(Mt || (Mt = Xt(['\n      <div\n        class="dragger dragger-', '"\n        @mousedown="', '"\n      ></div>\n    '])), e, (function(n) {
                        return t.startDrag(n, e)
                    }
                    ))
                }
                ,
                t
            }
            return Jt(n, [{
                key: "updateDraggerOpacity",
                value: function() {
                    var t, e, n = this;
                    null === (e = null === (t = this.shadowRoot) || void 0 === t ? void 0 : t.querySelectorAll(".dragger")) || void 0 === e || e.forEach((function(t) {
                        n.dragging ? t.style.opacity = "1" : t.removeAttribute("style")
                    }
                    ))
                }
            }, {
                key: "render",
                value: function() {
                    var t = "min-width: ".concat(this.minWidth, "px;border-").concat(this.trigger, ":1px solid var(--color-border);height:100%");
                    return q(Ct || (Ct = Xt(['\n      <div style="', '">\n        ', "\n        <slot></slot>\n      </div>\n    "])), t, this.renderDragger())
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(Pt || (Pt = Xt(["\n        :host {\n          display: block;\n          position: relative;\n          overflow-x: hidden;\n        }\n        .dragger {\n          position: absolute;\n          background-color: var(--color-dragger);\n          opacity: 0;\n          transition: opacity 0.2s;\n        }\n        .dragger:hover {\n          opacity: 1;\n        }\n        .dragger[dragging] {\n          opacity: 1;\n        }\n        .dragger-left,\n        .dragger-right {\n          top: 0;\n          bottom: 0;\n          width: 3px;\n          cursor: col-resize;\n        }\n        .dragger-left {\n          left: 0;\n        }\n        .dragger-right {\n          right: 0;\n        }\n      "])))]
                }
            }]),
            n
        }(ne);
        ee([ut({
            type: String
        })], ue.prototype, "trigger", void 0),
        ee([ut({
            type: Number,
            attribute: "min-width"
        })], ue.prototype, "minWidth", void 0),
        ee([ut({
            type: Number,
            attribute: "threshold"
        })], ue.prototype, "hideThreshold", void 0),
        customElements.get(he) || customElements.define(he, ue);
        var de = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.apply(this, arguments)).margin = "1rem 0",
                t
            }
            return Jt(n, [{
                key: "render",
                value: function() {
                    return q(Ot || (Ot = Xt(['<div style="margin: ', '"></div>'])), this.margin)
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(zt || (zt = Xt(["\n        div {\n          height: 1px;\n          background-image: linear-gradient(\n            to right,\n            transparent,\n            var(--color-border),\n            transparent\n          );\n        }\n      "])))]
                }
            }]),
            n
        }(ne);
        ee([ut({
            type: String
        })], de.prototype, "margin", void 0),
        customElements.get("cosy-divider") || customElements.define("cosy-divider", de);
        var pe = "cosy-popup"
          , fe = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                return Vt(this, n),
                e.apply(this, arguments)
            }
            return Jt(n, [{
                key: "destroy",
                value: function() {
                    this.parentNode && this.parentNode.removeChild(this)
                }
            }, {
                key: "onBackdropClick",
                value: function(t) {
                    t.target === this && this.destroy()
                }
            }, {
                key: "connectedCallback",
                value: function() {
                    Ft(Qt(n.prototype), "connectedCallback", this).call(this),
                    this.addEventListener("click", this.onBackdropClick)
                }
            }, {
                key: "disconnectedCallback",
                value: function() {
                    this.removeEventListener("click", this.onBackdropClick),
                    Ft(Qt(n.prototype), "disconnectedCallback", this).call(this)
                }
            }, {
                key: "render",
                value: function() {
                    return q(jt || (jt = Xt(['\n      <div class="content">\n        <slot></slot>\n      </div>\n    '])))
                }
            }], [{
                key: "styles",
                get: function() {
                    return s(Dt || (Dt = Xt(["\n      :host {\n        display: block;\n        position: fixed;\n        padding: 24px;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background: var(--color-popup-mask-bg); /* 半透明蒙版 */\n        backdrop-filter: blur(5px); /* 模糊效果 */\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        z-index: 19940121;\n      }\n      .content {\n        background: var(--color-popup-bg);\n        padding: 20px;\n        border-radius: var(--radius-base, 4px);\n        box-shadow: rgba(0, 0, 0, 0.2) 0px 16px 70px;\n        backdrop-filter: blur(20px) saturate(190%) contrast(70%) brightness(80%);\n        border: 0.5px solid var(--color-popup-border);\n      }\n    "])))
                }
            }]),
            n
        }(ne);
        customElements.get(pe) || customElements.define(pe, fe);
        var ge = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.apply(this, arguments)).blank = !1,
                t
            }
            return Jt(n, [{
                key: "render",
                value: function() {
                    var t = this.href ? this.href : "javascript:void(0);"
                      , e = this.blank ? "blank" : "";
                    return q(Ut || (Ut = Xt(['\n      <a\n        class="', '"\n        href="', '"\n        target="', '"\n        ><span class="', '"></span>\n        <slot></slot\n      ></a>\n    '])), this.bordered ? "bordered" : "", t, e, this.color ? "dot " + this.color : "")
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(Tt || (Tt = Xt(["\n        a {\n          padding: 4px;\n          transition: all 0.3s ease;\n          background-color: var(--color-label-bg);\n          color: var(--color-label-font);\n          border-radius: var(--radius-base, 4px);\n          display: inline-flex;\n          align-items: center;\n          font-size: 12px;\n          text-decoration: none;\n          user-select: none;\n        }\n        .bordered {\n          border: 1px solid var(--color-label-border);\n        }\n        a:hover {\n          border-color: var(--color-label-border-hover);\n          /* background-color: var(--color-label-bg-hover); */\n          color: var(--color-label-font-hover);\n        }\n        .round {\n          border-radius: 16px;\n        }\n        .dot {\n          margin-right: 6px;\n          display: inline-block;\n          width: 6px;\n          height: 6px;\n          border-radius: 50%;\n        }\n        .yellow {\n          background: var(--color-yellow);\n        }\n        .orange {\n          background: var(--color-orange);\n        }\n        .teal {\n          background: var(--color-teal);\n        }\n        .red {\n          background: var(--color-red);\n        }\n        .blue {\n          background: var(--color-blue);\n        }\n        .grey {\n          background: var(--color-grey);\n        }\n        .green {\n          background: var(--color-green);\n        }\n      "])))]
                }
            }]),
            n
        }(ne);
        ee([ut({
            type: String
        })], ge.prototype, "color", void 0),
        ee([ut({
            type: Boolean
        })], ge.prototype, "bordered", void 0),
        ee([ut({
            type: String
        })], ge.prototype, "href", void 0),
        ee([ut({
            type: Boolean
        })], ge.prototype, "blank", void 0),
        customElements.get("cosy-label") || customElements.define("cosy-label", ge);
        var ve = "cosy-card"
          , ye = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                return Vt(this, n),
                e.apply(this, arguments)
            }
            return Jt(n, [{
                key: "handleCardMouseMove",
                value: function(t) {
                    var e = t.detail
                      , n = e.mouseX
                      , r = e.mouseY
                      , o = this.getBoundingClientRect()
                      , i = n - o.left
                      , s = r - o.top;
                    this.style.setProperty("--mouse-x", "".concat(i, "px")),
                    this.style.setProperty("--mouse-y", "".concat(s, "px"))
                }
            }, {
                key: "connectedCallback",
                value: function() {
                    var t = this;
                    Ft(Qt(n.prototype), "connectedCallback", this).call(this),
                    this.eventBus.on("card-group:mousemove", (function(e) {
                        return t.handleCardMouseMove(e)
                    }
                    ))
                }
            }, {
                key: "disconnectedCallback",
                value: function() {
                    Ft(Qt(n.prototype), "disconnectedCallback", this).call(this),
                    this.eventBus.off("card-group:mousemove", this.handleCardMouseMove)
                }
            }, {
                key: "render",
                value: function() {
                    return q(Nt || (Nt = Xt(['<a class="card">\n      <div class="mask"></div>\n      <div class="content"><slot></slot></div>\n    </a>'])))
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(Rt || (Rt = Xt(['\n        .card {\n          background-color: var(--color-border);\n          border-radius: 10px;\n          cursor: pointer;\n          display: inline-flex;\n          flex-direction: column;\n          position: relative;\n          color: var(--color-font);\n        }\n\n        .card::before,\n        .card::after {\n          border-radius: inherit;\n          content: "";\n          height: 100%;\n          left: 0px;\n          opacity: 0;\n          position: absolute;\n          top: 0px;\n          transition: opacity 500ms;\n          width: 100%;\n          background: radial-gradient(\n            800px circle at var(--mouse-x) var(--mouse-y),\n            var(--color-radial-before),\n            transparent 40%\n          );\n          z-index: 3;\n        }\n\n        .card::after {\n          background: radial-gradient(\n            800px circle at var(--mouse-x) var(--mouse-y),\n            var(--color-radial-after),\n            transparent 40%\n          );\n          opacity: 1;\n          z-index: 1;\n        }\n\n        .mask {\n          position: absolute;\n          background-color: var(--color-bg-2);\n          border-radius: inherit;\n          inset: 1px;\n          z-index: 2;\n        }\n\n        .content {\n          z-index: 4;\n        }\n      '])))]
                }
            }]),
            n
        }(ne);
        customElements.get(ve) || customElements.define(ve, ye);
        var me = "cosy-card-group"
          , be = function(t) {
            Kt(n, t);
            var e = Gt(n);
            function n() {
                var t;
                return Vt(this, n),
                (t = e.apply(this, arguments)).row = 3,
                t
            }
            return Jt(n, [{
                key: "handleMouseMove",
                value: function(t) {
                    var e = t.clientX
                      , n = t.clientY;
                    this.eventBus.emit("card-group:mousemove", {
                        mouseX: e,
                        mouseY: n
                    })
                }
            }, {
                key: "render",
                value: function() {
                    return q(Lt || (Lt = Xt(['<div\n      class="card-group"\n      style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))"\n      @mousemove="', '"\n    >\n      <slot></slot>\n    </div>'])), this.handleMouseMove)
                }
            }], [{
                key: "styles",
                get: function() {
                    return [ne.styles, s(Ht || (Ht = Xt(["\n        .card-group {\n          display: grid;\n          justify-items: center;\n          align-items: center;\n          gap: 12px;\n        }\n      "])))]
                }
            }]),
            n
        }(ne);
        ee([ut({
            type: Number
        })], be.prototype, "row", void 0),
        customElements.get(me) || customElements.define(me, be);
        var we = function() {
            function t(e, n, r) {
                Vt(this, t),
                this.dropdownElement = null,
                this.selector = e,
                this.options = n,
                this.element = document.querySelector(this.selector),
                this.onClickItem = r.onClickItem,
                this.init()
            }
            return Jt(t, [{
                key: "init",
                value: function() {
                    this.element && (this.element.addEventListener("click", this.toggleDropdown.bind(this)),
                    document.addEventListener("click", this.handleDocumentClick.bind(this)))
                }
            }, {
                key: "toggleDropdown",
                value: function(e) {
                    e.stopPropagation(),
                    t.activeDropdown && t.activeDropdown !== this && t.activeDropdown.removeDropdown(),
                    this.dropdownElement ? this.removeDropdown() : (this.createDropdown(),
                    t.activeDropdown = this)
                }
            }, {
                key: "fadeIn",
                value: function(t, e) {
                    var n = 0
                      , r = 16.7 / e;
                    !function e() {
                        if ((n += r) >= 1)
                            return n = 1,
                            void (t.style.opacity = String(n));
                        t.style.opacity = String(n),
                        requestAnimationFrame(e)
                    }()
                }
            }, {
                key: "fadeOut",
                value: function(t, e, n) {
                    var r = 1
                      , o = 16.7 / e
                      , i = t;
                    !function t() {
                        if (i) {
                            if ((r -= o) <= 0)
                                return r = 0,
                                i.style.opacity = String(r),
                                void n();
                            i.style.opacity = String(r),
                            requestAnimationFrame(t)
                        }
                    }()
                }
            }, {
                key: "createDropdown",
                value: function() {
                    var t, e = this;
                    this.dropdownElement = document.createElement("div"),
                    this.dropdownElement.style.opacity = "0",
                    this.options.forEach((function(t) {
                        var n = document.createElement("div");
                        if (n.style.padding = "8px 12px",
                        n.style.color = "var(--color-font-2)",
                        n.style.borderRadius = "var(--radius-base, 4px)",
                        n.style.fontSize = "13px",
                        n.style.cursor = "pointer",
                        n.style.display = "flex",
                        n.style.alignItems = "center",
                        t.icon) {
                            var r = document.createElement("span");
                            r.innerHTML = t.icon,
                            r.style.marginRight = "8px",
                            r.style.width = "16px",
                            r.style.height = "16px",
                            n.appendChild(r)
                        }
                        var o = document.createTextNode(String(t.label));
                        n.appendChild(o),
                        n.addEventListener("click", (function() {
                            var n;
                            null === (n = e.onClickItem) || void 0 === n || n.call(e, t),
                            e.removeDropdown()
                        }
                        )),
                        n.addEventListener("mouseenter", (function() {
                            n.style.backgroundColor = "var(--color-dropdown-hover)",
                            n.style.color = "var(--color-font)"
                        }
                        )),
                        n.addEventListener("mouseleave", (function() {
                            n.style.backgroundColor = "",
                            n.style.color = "var(--color-font-2)"
                        }
                        )),
                        e.dropdownElement.appendChild(n)
                    }
                    )),
                    document.body.appendChild(this.dropdownElement),
                    this.dropdownElement.style.position = "absolute",
                    this.dropdownElement.style.padding = "6px 4px",
                    this.dropdownElement.style.borderRadius = "var(--radius-base,4px)",
                    this.dropdownElement.style.background = "var(--color-dropdown-bg)",
                    this.dropdownElement.style.backdropFilter = "var(--color-frost-bg)",
                    this.dropdownElement.style.border = "1px solid var(--color-dropdown-border)",
                    this.dropdownElement.style.boxShadow = "var(--color-dropdown-shadow)";
                    var n = null === (t = document.querySelector(this.selector)) || void 0 === t ? void 0 : t.getBoundingClientRect();
                    this.dropdownElement.style.top = "".concat(n.top, "px"),
                    this.dropdownElement.style.left = "".concat(n.left, "px"),
                    this.dropdownElement.style.minWidth = "".concat(n.width, "px"),
                    this.fadeIn(this.dropdownElement, 150)
                }
            }, {
                key: "removeDropdown",
                value: function() {
                    var t = this;
                    if (this.dropdownElement) {
                        var e = this.dropdownElement;
                        this.fadeOut(e, 150, (function() {
                            e.remove(),
                            t.dropdownElement === e && (t.dropdownElement = null)
                        }
                        ))
                    }
                }
            }, {
                key: "handleDocumentClick",
                value: function() {
                    this.removeDropdown()
                }
            }]),
            t
        }();
        we.activeDropdown = null;
        var xe = function() {
            function t(e, n) {
                Vt(this, t),
                this.popoverElement = null,
                this.options = n,
                this.element = "string" == typeof e ? document.querySelector(e) : e,
                this.init()
            }
            return Jt(t, [{
                key: "init",
                value: function() {
                    this.element && (this.element.addEventListener("click", this.togglePopover.bind(this)),
                    document.addEventListener("click", this.handleDocumentClick.bind(this)))
                }
            }, {
                key: "togglePopover",
                value: function(e) {
                    e.stopPropagation(),
                    t.activePopover && t.activePopover !== this && t.activePopover.removePopover(),
                    this.popoverElement ? this.removePopover() : (this.createPopover(),
                    t.activePopover = this)
                }
            }, {
                key: "fadeIn",
                value: function(t, e) {
                    var n = 0
                      , r = 16.7 / e;
                    !function e() {
                        if ((n += r) >= 1)
                            return n = 1,
                            void (t.style.opacity = String(n));
                        t.style.opacity = String(n),
                        requestAnimationFrame(e)
                    }()
                }
            }, {
                key: "fadeOut",
                value: function(t, e, n) {
                    var r = 1
                      , o = 16.7 / e
                      , i = t;
                    !function t() {
                        if (i) {
                            if ((r -= o) <= 0)
                                return r = 0,
                                i.style.opacity = String(r),
                                void n();
                            i.style.opacity = String(r),
                            requestAnimationFrame(t)
                        }
                    }()
                }
            }, {
                key: "createPopover",
                value: function() {
                    var t = this;
                    this.popoverElement = document.createElement("div");
                    var e = this.options.classNames
                      , n = void 0 === e ? [] : e;
                    if (this.popoverElement.classList.add("popover-content", "scrollbar-obtrusive"),
                    n.forEach((function(e) {
                        var n;
                        return null === (n = t.popoverElement) || void 0 === n ? void 0 : n.classList.add(e)
                    }
                    )),
                    this.popoverElement.style.opacity = "0",
                    this.options.title) {
                        var r = document.createElement("p");
                        r.textContent = this.options.title,
                        r.style.margin = "0 0 8px 0",
                        r.style.fontSize = "12px",
                        r.style.color = "var(--color-font-2)",
                        this.popoverElement.appendChild(r)
                    }
                    if (this.options.content) {
                        var o = document.createElement("p");
                        o.style.margin = "0",
                        o.textContent = this.options.content,
                        this.popoverElement.appendChild(o)
                    }
                    document.body.appendChild(this.popoverElement);
                    var i = this.options.styles
                      , s = void 0 === i ? null : i;
                    if (s)
                        for (var a in s)
                            this.popoverElement.style.setProperty(a, s[a]);
                    this.popoverElement.style.lineHeight = "1.5",
                    this.popoverElement.style.zIndex = "20231026",
                    this.popoverElement.style.overflow = "auto",
                    this.popoverElement.style.padding = "10px",
                    this.popoverElement.style.borderRadius = "var(--radius)",
                    this.popoverElement.style.backdropFilter = "var(--dropdown-bdf)",
                    this.popoverElement.style.background = "var(--dropdown-bg)",
                    this.popoverElement.style.border = "var(--dropdown-border)",
                    this.popoverElement.style.boxShadow = "var(--dropdown-boxShadow)",
                    this.fadeIn(this.popoverElement, 150)
                }
            }, {
                key: "removePopover",
                value: function() {
                    var t = this;
                    if (this.popoverElement) {
                        var e = this.popoverElement;
                        this.fadeOut(e, 150, (function() {
                            e.remove(),
                            t.popoverElement === e && (t.popoverElement = null)
                        }
                        ))
                    }
                }
            }, {
                key: "handleDocumentClick",
                value: function(t) {
                    t.target && this.popoverElement && this.popoverElement.contains(t.target) || this.removePopover()
                }
            }]),
            t
        }();
        xe.activePopover = null;
        const ke = "cosy-theme:aside-invisible"
          , Ee = "cosy-theme:font-size"
          , $e = "cosy-theme:theme"
          , _e = "14px"
          , Ae = "dark"
          , Se = "#575ac7";
        var Me = n(106)
          , Ce = n.n(Me);
        const Pe = ()=>{
            const t = window.theme.color ? window.theme.color : Se
              , [e,n,r] = Ce()(t).hsl().array()
              , o = Ce()(t).hex();
            return {
                hue: e,
                saturation: n,
                lightness: r,
                hsl: Ce()(t).hsl().string(),
                hex: o
            }
        }
        ;
        var Oe;
        Oe = ()=>{
            var t;
            null === (t = document.querySelector(".loading-mask")) || void 0 === t || t.remove(),
            (()=>{
                var t, e;
                const n = null !== (t = localStorage.getItem(Ee)) && void 0 !== t ? t : _e;
                qt("--font-size", n);
                const r = null !== (e = localStorage.getItem($e)) && void 0 !== e ? e : Ae;
                document.documentElement.className = "",
                document.documentElement.classList.add(`cosy-theme-${r}`);
                const {hue: o, saturation: i, lightness: s} = Pe();
                qt("--base-hue", String(o)),
                qt("--base-saturation", `${i}%`),
                qt("--base-lightness", `${s}%`)
            }
            )(),
            Bt({
                selector: "#button-preference",
                eventType: "click",
                handler: ()=>{
                    location.href = "/cosy-preference"
                }
            });
            const e = document.querySelector("#aside-box")
              , n = document.querySelector("#post-search");
            if (e) {
                localStorage.getItem(ke) === String(!0) ? (e.removeAttribute("thumb-mode"),
                n && n.removeAttribute("icon-only")) : (e.setAttribute("thumb-mode", ""),
                n && n.setAttribute("icon-only", ""));
                const t = ()=>{
                    e.hasAttribute("thumb-mode") ? (e.removeAttribute("thumb-mode"),
                    localStorage.setItem(ke, String(!0)),
                    n && n.removeAttribute("icon-only")) : (e.setAttribute("thumb-mode", ""),
                    localStorage.setItem(ke, String(!1)),
                    n && n.setAttribute("icon-only", ""))
                }
                ;
                Bt({
                    selector: "#left-aside-button",
                    eventType: "click",
                    handler: ()=>t()
                }),
                o = (r = {
                    key: "[",
                    preventDefault: !0,
                    handler: ()=>t()
                }).key,
                i = r.handler,
                s = r.preventDefault,
                a = void 0 !== s && s,
                l = o.toLowerCase().split("+").map((function(t) {
                    return t.trim()
                }
                )),
                c = /Mac|iPod|iPhone|iPad/.test(navigator.platform),
                h = function(t) {
                    var e = l.every((function(e) {
                        return "control" === e ? c ? t.metaKey : t.ctrlKey : t.key.toLowerCase() === e
                    }
                    ));
                    e && (a && t.preventDefault(),
                    i(t))
                }
                ,
                document.addEventListener("keydown", h)
            }
            var r, o, i, s, a, l, c, h
        }
        ,
        "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", Oe) : Oe()
    }
    )()
}
)();
