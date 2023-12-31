(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) i(a);
  new MutationObserver((a) => {
    for (const r of a)
      if (r.type === "childList")
        for (const f of r.addedNodes)
          f.tagName === "LINK" && f.rel === "modulepreload" && i(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(a) {
    const r = {};
    return (
      a.integrity && (r.integrity = a.integrity),
      a.referrerPolicy && (r.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : a.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function i(a) {
    if (a.ep) return;
    a.ep = !0;
    const r = s(a);
    fetch(a.href, r);
  }
})();
function ke(t) {
  return (
    t !== null &&
    typeof t == "object" &&
    "constructor" in t &&
    t.constructor === Object
  );
}
function Ie(t, e) {
  t === void 0 && (t = {}),
    e === void 0 && (e = {}),
    Object.keys(e).forEach((s) => {
      typeof t[s] > "u"
        ? (t[s] = e[s])
        : ke(e[s]) &&
          ke(t[s]) &&
          Object.keys(e[s]).length > 0 &&
          Ie(t[s], e[s]);
    });
}
const Ye = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function N() {
  const t = typeof document < "u" ? document : {};
  return Ie(t, Ye), t;
}
const _e = {
  document: Ye,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(t) {
    return typeof setTimeout > "u" ? (t(), null) : setTimeout(t, 0);
  },
  cancelAnimationFrame(t) {
    typeof setTimeout > "u" || clearTimeout(t);
  },
};
function Y() {
  const t = typeof window < "u" ? window : {};
  return Ie(t, _e), t;
}
function qe(t) {
  const e = t;
  Object.keys(e).forEach((s) => {
    try {
      e[s] = null;
    } catch {}
    try {
      delete e[s];
    } catch {}
  });
}
function ee(t, e) {
  return e === void 0 && (e = 0), setTimeout(t, e);
}
function _() {
  return Date.now();
}
function je(t) {
  const e = Y();
  let s;
  return (
    e.getComputedStyle && (s = e.getComputedStyle(t, null)),
    !s && t.currentStyle && (s = t.currentStyle),
    s || (s = t.style),
    s
  );
}
function Ce(t, e) {
  e === void 0 && (e = "x");
  const s = Y();
  let i, a, r;
  const f = je(t);
  return (
    s.WebKitCSSMatrix
      ? ((a = f.transform || f.webkitTransform),
        a.split(",").length > 6 &&
          (a = a
            .split(", ")
            .map((o) => o.replace(",", "."))
            .join(", ")),
        (r = new s.WebKitCSSMatrix(a === "none" ? "" : a)))
      : ((r =
          f.MozTransform ||
          f.OTransform ||
          f.MsTransform ||
          f.msTransform ||
          f.transform ||
          f
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (i = r.toString().split(","))),
    e === "x" &&
      (s.WebKitCSSMatrix
        ? (a = r.m41)
        : i.length === 16
        ? (a = parseFloat(i[12]))
        : (a = parseFloat(i[4]))),
    e === "y" &&
      (s.WebKitCSSMatrix
        ? (a = r.m42)
        : i.length === 16
        ? (a = parseFloat(i[13]))
        : (a = parseFloat(i[5]))),
    a || 0
  );
}
function ne(t) {
  return (
    typeof t == "object" &&
    t !== null &&
    t.constructor &&
    Object.prototype.toString.call(t).slice(8, -1) === "Object"
  );
}
function Ue(t) {
  return typeof window < "u" && typeof window.HTMLElement < "u"
    ? t instanceof HTMLElement
    : t && (t.nodeType === 1 || t.nodeType === 11);
}
function W() {
  const t = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    e = ["__proto__", "constructor", "prototype"];
  for (let s = 1; s < arguments.length; s += 1) {
    const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
    if (i != null && !Ue(i)) {
      const a = Object.keys(Object(i)).filter((r) => e.indexOf(r) < 0);
      for (let r = 0, f = a.length; r < f; r += 1) {
        const o = a[r],
          n = Object.getOwnPropertyDescriptor(i, o);
        n !== void 0 &&
          n.enumerable &&
          (ne(t[o]) && ne(i[o])
            ? i[o].__swiper__
              ? (t[o] = i[o])
              : W(t[o], i[o])
            : !ne(t[o]) && ne(i[o])
            ? ((t[o] = {}), i[o].__swiper__ ? (t[o] = i[o]) : W(t[o], i[o]))
            : (t[o] = i[o]));
      }
    }
  }
  return t;
}
function le(t, e, s) {
  t.style.setProperty(e, s);
}
function Re(t) {
  let { swiper: e, targetPosition: s, side: i } = t;
  const a = Y(),
    r = -e.translate;
  let f = null,
    o;
  const n = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = "none"),
    a.cancelAnimationFrame(e.cssModeFrameID);
  const p = s > r ? "next" : "prev",
    c = (d, u) => (p === "next" && d >= u) || (p === "prev" && d <= u),
    l = () => {
      (o = new Date().getTime()), f === null && (f = o);
      const d = Math.max(Math.min((o - f) / n, 1), 0),
        u = 0.5 - Math.cos(d * Math.PI) / 2;
      let y = r + u * (s - r);
      if ((c(y, s) && (y = s), e.wrapperEl.scrollTo({ [i]: y }), c(y, s))) {
        (e.wrapperEl.style.overflow = "hidden"),
          (e.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ""), e.wrapperEl.scrollTo({ [i]: y });
          }),
          a.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = a.requestAnimationFrame(l);
    };
  l();
}
function te(t) {
  return (
    t.querySelector(".swiper-slide-transform") ||
    (t.shadowRoot && t.shadowRoot.querySelector(".swiper-slide-transform")) ||
    t
  );
}
function R(t, e) {
  return e === void 0 && (e = ""), [...t.children].filter((s) => s.matches(e));
}
function q(t, e) {
  e === void 0 && (e = []);
  const s = document.createElement(t);
  return s.classList.add(...(Array.isArray(e) ? e : [e])), s;
}
function me(t) {
  const e = Y(),
    s = N(),
    i = t.getBoundingClientRect(),
    a = s.body,
    r = t.clientTop || a.clientTop || 0,
    f = t.clientLeft || a.clientLeft || 0,
    o = t === e ? e.scrollY : t.scrollTop,
    n = t === e ? e.scrollX : t.scrollLeft;
  return { top: i.top + o - r, left: i.left + n - f };
}
function Ke(t, e) {
  const s = [];
  for (; t.previousElementSibling; ) {
    const i = t.previousElementSibling;
    e ? i.matches(e) && s.push(i) : s.push(i), (t = i);
  }
  return s;
}
function Ze(t, e) {
  const s = [];
  for (; t.nextElementSibling; ) {
    const i = t.nextElementSibling;
    e ? i.matches(e) && s.push(i) : s.push(i), (t = i);
  }
  return s;
}
function Z(t, e) {
  return Y().getComputedStyle(t, null).getPropertyValue(e);
}
function de(t) {
  let e = t,
    s;
  if (e) {
    for (s = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (s += 1);
    return s;
  }
}
function J(t, e) {
  const s = [];
  let i = t.parentElement;
  for (; i; ) e ? i.matches(e) && s.push(i) : s.push(i), (i = i.parentElement);
  return s;
}
function oe(t, e) {
  function s(i) {
    i.target === t && (e.call(t, i), t.removeEventListener("transitionend", s));
  }
  e && t.addEventListener("transitionend", s);
}
function Pe(t, e, s) {
  const i = Y();
  return s
    ? t[e === "width" ? "offsetWidth" : "offsetHeight"] +
        parseFloat(
          i
            .getComputedStyle(t, null)
            .getPropertyValue(e === "width" ? "margin-right" : "margin-top")
        ) +
        parseFloat(
          i
            .getComputedStyle(t, null)
            .getPropertyValue(e === "width" ? "margin-left" : "margin-bottom")
        )
    : t.offsetWidth;
}
let be;
function Qe() {
  const t = Y(),
    e = N();
  return {
    smoothScroll:
      e.documentElement &&
      e.documentElement.style &&
      "scrollBehavior" in e.documentElement.style,
    touch: !!(
      "ontouchstart" in t ||
      (t.DocumentTouch && e instanceof t.DocumentTouch)
    ),
  };
}
function Ne() {
  return be || (be = Qe()), be;
}
let Se;
function Je(t) {
  let { userAgent: e } = t === void 0 ? {} : t;
  const s = Ne(),
    i = Y(),
    a = i.navigator.platform,
    r = e || i.navigator.userAgent,
    f = { ios: !1, android: !1 },
    o = i.screen.width,
    n = i.screen.height,
    p = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let c = r.match(/(iPad).*OS\s([\d_]+)/);
  const l = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    d = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    u = a === "Win32";
  let y = a === "MacIntel";
  const g = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ];
  return (
    !c &&
      y &&
      s.touch &&
      g.indexOf(`${o}x${n}`) >= 0 &&
      ((c = r.match(/(Version)\/([\d.]+)/)),
      c || (c = [0, 1, "13_0_0"]),
      (y = !1)),
    p && !u && ((f.os = "android"), (f.android = !0)),
    (c || d || l) && ((f.os = "ios"), (f.ios = !0)),
    f
  );
}
function et(t) {
  return t === void 0 && (t = {}), Se || (Se = Je(t)), Se;
}
let xe;
function tt() {
  const t = Y();
  let e = !1;
  function s() {
    const i = t.navigator.userAgent.toLowerCase();
    return (
      i.indexOf("safari") >= 0 &&
      i.indexOf("chrome") < 0 &&
      i.indexOf("android") < 0
    );
  }
  if (s()) {
    const i = String(t.navigator.userAgent);
    if (i.includes("Version/")) {
      const [a, r] = i
        .split("Version/")[1]
        .split(" ")[0]
        .split(".")
        .map((f) => Number(f));
      e = a < 16 || (a === 16 && r < 2);
    }
  }
  return {
    isSafari: e || s(),
    needPerspectiveFix: e,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      t.navigator.userAgent
    ),
  };
}
function st() {
  return xe || (xe = tt()), xe;
}
function it(t) {
  let { swiper: e, on: s, emit: i } = t;
  const a = Y();
  let r = null,
    f = null;
  const o = () => {
      !e || e.destroyed || !e.initialized || (i("beforeResize"), i("resize"));
    },
    n = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((r = new ResizeObserver((l) => {
          f = a.requestAnimationFrame(() => {
            const { width: d, height: u } = e;
            let y = d,
              g = u;
            l.forEach((v) => {
              let { contentBoxSize: b, contentRect: h, target: m } = v;
              (m && m !== e.el) ||
                ((y = h ? h.width : (b[0] || b).inlineSize),
                (g = h ? h.height : (b[0] || b).blockSize));
            }),
              (y !== d || g !== u) && o();
          });
        })),
        r.observe(e.el));
    },
    p = () => {
      f && a.cancelAnimationFrame(f),
        r && r.unobserve && e.el && (r.unobserve(e.el), (r = null));
    },
    c = () => {
      !e || e.destroyed || !e.initialized || i("orientationchange");
    };
  s("init", () => {
    if (e.params.resizeObserver && typeof a.ResizeObserver < "u") {
      n();
      return;
    }
    a.addEventListener("resize", o), a.addEventListener("orientationchange", c);
  }),
    s("destroy", () => {
      p(),
        a.removeEventListener("resize", o),
        a.removeEventListener("orientationchange", c);
    });
}
function rt(t) {
  let { swiper: e, extendParams: s, on: i, emit: a } = t;
  const r = [],
    f = Y(),
    o = function (c, l) {
      l === void 0 && (l = {});
      const d = f.MutationObserver || f.WebkitMutationObserver,
        u = new d((y) => {
          if (e.__preventObserver__) return;
          if (y.length === 1) {
            a("observerUpdate", y[0]);
            return;
          }
          const g = function () {
            a("observerUpdate", y[0]);
          };
          f.requestAnimationFrame
            ? f.requestAnimationFrame(g)
            : f.setTimeout(g, 0);
        });
      u.observe(c, {
        attributes: typeof l.attributes > "u" ? !0 : l.attributes,
        childList: typeof l.childList > "u" ? !0 : l.childList,
        characterData: typeof l.characterData > "u" ? !0 : l.characterData,
      }),
        r.push(u);
    },
    n = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const c = J(e.el);
          for (let l = 0; l < c.length; l += 1) o(c[l]);
        }
        o(e.el, { childList: e.params.observeSlideChildren }),
          o(e.wrapperEl, { attributes: !1 });
      }
    },
    p = () => {
      r.forEach((c) => {
        c.disconnect();
      }),
        r.splice(0, r.length);
    };
  s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    i("init", n),
    i("destroy", p);
}
var at = {
  on(t, e, s) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
    const a = s ? "unshift" : "push";
    return (
      t.split(" ").forEach((r) => {
        i.eventsListeners[r] || (i.eventsListeners[r] = []),
          i.eventsListeners[r][a](e);
      }),
      i
    );
  },
  once(t, e, s) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
    function a() {
      i.off(t, a), a.__emitterProxy && delete a.__emitterProxy;
      for (var r = arguments.length, f = new Array(r), o = 0; o < r; o++)
        f[o] = arguments[o];
      e.apply(i, f);
    }
    return (a.__emitterProxy = e), i.on(t, a, s);
  },
  onAny(t, e) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != "function") return s;
    const i = e ? "unshift" : "push";
    return s.eventsAnyListeners.indexOf(t) < 0 && s.eventsAnyListeners[i](t), s;
  },
  offAny(t) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const s = e.eventsAnyListeners.indexOf(t);
    return s >= 0 && e.eventsAnyListeners.splice(s, 1), e;
  },
  off(t, e) {
    const s = this;
    return (
      !s.eventsListeners ||
        s.destroyed ||
        !s.eventsListeners ||
        t.split(" ").forEach((i) => {
          typeof e > "u"
            ? (s.eventsListeners[i] = [])
            : s.eventsListeners[i] &&
              s.eventsListeners[i].forEach((a, r) => {
                (a === e || (a.__emitterProxy && a.__emitterProxy === e)) &&
                  s.eventsListeners[i].splice(r, 1);
              });
        }),
      s
    );
  },
  emit() {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
    let e, s, i;
    for (var a = arguments.length, r = new Array(a), f = 0; f < a; f++)
      r[f] = arguments[f];
    return (
      typeof r[0] == "string" || Array.isArray(r[0])
        ? ((e = r[0]), (s = r.slice(1, r.length)), (i = t))
        : ((e = r[0].events), (s = r[0].data), (i = r[0].context || t)),
      s.unshift(i),
      (Array.isArray(e) ? e : e.split(" ")).forEach((n) => {
        t.eventsAnyListeners &&
          t.eventsAnyListeners.length &&
          t.eventsAnyListeners.forEach((p) => {
            p.apply(i, [n, ...s]);
          }),
          t.eventsListeners &&
            t.eventsListeners[n] &&
            t.eventsListeners[n].forEach((p) => {
              p.apply(i, s);
            });
      }),
      t
    );
  },
};
function nt() {
  const t = this;
  let e, s;
  const i = t.el;
  typeof t.params.width < "u" && t.params.width !== null
    ? (e = t.params.width)
    : (e = i.clientWidth),
    typeof t.params.height < "u" && t.params.height !== null
      ? (s = t.params.height)
      : (s = i.clientHeight),
    !((e === 0 && t.isHorizontal()) || (s === 0 && t.isVertical())) &&
      ((e =
        e -
        parseInt(Z(i, "padding-left") || 0, 10) -
        parseInt(Z(i, "padding-right") || 0, 10)),
      (s =
        s -
        parseInt(Z(i, "padding-top") || 0, 10) -
        parseInt(Z(i, "padding-bottom") || 0, 10)),
      Number.isNaN(e) && (e = 0),
      Number.isNaN(s) && (s = 0),
      Object.assign(t, {
        width: e,
        height: s,
        size: t.isHorizontal() ? e : s,
      }));
}
function lt() {
  const t = this;
  function e(P) {
    return t.isHorizontal()
      ? P
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[P];
  }
  function s(P, M) {
    return parseFloat(P.getPropertyValue(e(M)) || 0);
  }
  const i = t.params,
    { wrapperEl: a, slidesEl: r, size: f, rtlTranslate: o, wrongRTL: n } = t,
    p = t.virtual && i.virtual.enabled,
    c = p ? t.virtual.slides.length : t.slides.length,
    l = R(r, `.${t.params.slideClass}, swiper-slide`),
    d = p ? t.virtual.slides.length : l.length;
  let u = [];
  const y = [],
    g = [];
  let v = i.slidesOffsetBefore;
  typeof v == "function" && (v = i.slidesOffsetBefore.call(t));
  let b = i.slidesOffsetAfter;
  typeof b == "function" && (b = i.slidesOffsetAfter.call(t));
  const h = t.snapGrid.length,
    m = t.slidesGrid.length;
  let S = i.spaceBetween,
    C = -v,
    I = 0,
    A = 0;
  if (typeof f > "u") return;
  typeof S == "string" && S.indexOf("%") >= 0
    ? (S = (parseFloat(S.replace("%", "")) / 100) * f)
    : typeof S == "string" && (S = parseFloat(S)),
    (t.virtualSize = -S),
    l.forEach((P) => {
      o ? (P.style.marginLeft = "") : (P.style.marginRight = ""),
        (P.style.marginBottom = ""),
        (P.style.marginTop = "");
    }),
    i.centeredSlides &&
      i.cssMode &&
      (le(a, "--swiper-centered-offset-before", ""),
      le(a, "--swiper-centered-offset-after", ""));
  const D = i.grid && i.grid.rows > 1 && t.grid;
  D && t.grid.initSlides(d);
  let L;
  const k =
    i.slidesPerView === "auto" &&
    i.breakpoints &&
    Object.keys(i.breakpoints).filter(
      (P) => typeof i.breakpoints[P].slidesPerView < "u"
    ).length > 0;
  for (let P = 0; P < d; P += 1) {
    L = 0;
    let M;
    if (
      (l[P] && (M = l[P]),
      D && t.grid.updateSlide(P, M, d, e),
      !(l[P] && Z(M, "display") === "none"))
    ) {
      if (i.slidesPerView === "auto") {
        k && (l[P].style[e("width")] = "");
        const E = getComputedStyle(M),
          w = M.style.transform,
          x = M.style.webkitTransform;
        if (
          (w && (M.style.transform = "none"),
          x && (M.style.webkitTransform = "none"),
          i.roundLengths)
        )
          L = t.isHorizontal() ? Pe(M, "width", !0) : Pe(M, "height", !0);
        else {
          const O = s(E, "width"),
            T = s(E, "padding-left"),
            $ = s(E, "padding-right"),
            z = s(E, "margin-left"),
            G = s(E, "margin-right"),
            X = E.getPropertyValue("box-sizing");
          if (X && X === "border-box") L = O + z + G;
          else {
            const { clientWidth: V, offsetWidth: H } = M;
            L = O + T + $ + z + G + (H - V);
          }
        }
        w && (M.style.transform = w),
          x && (M.style.webkitTransform = x),
          i.roundLengths && (L = Math.floor(L));
      } else
        (L = (f - (i.slidesPerView - 1) * S) / i.slidesPerView),
          i.roundLengths && (L = Math.floor(L)),
          l[P] && (l[P].style[e("width")] = `${L}px`);
      l[P] && (l[P].swiperSlideSize = L),
        g.push(L),
        i.centeredSlides
          ? ((C = C + L / 2 + I / 2 + S),
            I === 0 && P !== 0 && (C = C - f / 2 - S),
            P === 0 && (C = C - f / 2 - S),
            Math.abs(C) < 1 / 1e3 && (C = 0),
            i.roundLengths && (C = Math.floor(C)),
            A % i.slidesPerGroup === 0 && u.push(C),
            y.push(C))
          : (i.roundLengths && (C = Math.floor(C)),
            (A - Math.min(t.params.slidesPerGroupSkip, A)) %
              t.params.slidesPerGroup ===
              0 && u.push(C),
            y.push(C),
            (C = C + L + S)),
        (t.virtualSize += L + S),
        (I = L),
        (A += 1);
    }
  }
  if (
    ((t.virtualSize = Math.max(t.virtualSize, f) + b),
    o &&
      n &&
      (i.effect === "slide" || i.effect === "coverflow") &&
      (a.style.width = `${t.virtualSize + S}px`),
    i.setWrapperSize && (a.style[e("width")] = `${t.virtualSize + S}px`),
    D && t.grid.updateWrapperSize(L, u, e),
    !i.centeredSlides)
  ) {
    const P = [];
    for (let M = 0; M < u.length; M += 1) {
      let E = u[M];
      i.roundLengths && (E = Math.floor(E)),
        u[M] <= t.virtualSize - f && P.push(E);
    }
    (u = P),
      Math.floor(t.virtualSize - f) - Math.floor(u[u.length - 1]) > 1 &&
        u.push(t.virtualSize - f);
  }
  if (p && i.loop) {
    const P = g[0] + S;
    if (i.slidesPerGroup > 1) {
      const M = Math.ceil(
          (t.virtual.slidesBefore + t.virtual.slidesAfter) / i.slidesPerGroup
        ),
        E = P * i.slidesPerGroup;
      for (let w = 0; w < M; w += 1) u.push(u[u.length - 1] + E);
    }
    for (let M = 0; M < t.virtual.slidesBefore + t.virtual.slidesAfter; M += 1)
      i.slidesPerGroup === 1 && u.push(u[u.length - 1] + P),
        y.push(y[y.length - 1] + P),
        (t.virtualSize += P);
  }
  if ((u.length === 0 && (u = [0]), S !== 0)) {
    const P = t.isHorizontal() && o ? "marginLeft" : e("marginRight");
    l.filter((M, E) =>
      !i.cssMode || i.loop ? !0 : E !== l.length - 1
    ).forEach((M) => {
      M.style[P] = `${S}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let P = 0;
    g.forEach((E) => {
      P += E + (S || 0);
    }),
      (P -= S);
    const M = P - f;
    u = u.map((E) => (E <= 0 ? -v : E > M ? M + b : E));
  }
  if (i.centerInsufficientSlides) {
    let P = 0;
    if (
      (g.forEach((M) => {
        P += M + (S || 0);
      }),
      (P -= S),
      P < f)
    ) {
      const M = (f - P) / 2;
      u.forEach((E, w) => {
        u[w] = E - M;
      }),
        y.forEach((E, w) => {
          y[w] = E + M;
        });
    }
  }
  if (
    (Object.assign(t, {
      slides: l,
      snapGrid: u,
      slidesGrid: y,
      slidesSizesGrid: g,
    }),
    i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
  ) {
    le(a, "--swiper-centered-offset-before", `${-u[0]}px`),
      le(
        a,
        "--swiper-centered-offset-after",
        `${t.size / 2 - g[g.length - 1] / 2}px`
      );
    const P = -t.snapGrid[0],
      M = -t.slidesGrid[0];
    (t.snapGrid = t.snapGrid.map((E) => E + P)),
      (t.slidesGrid = t.slidesGrid.map((E) => E + M));
  }
  if (
    (d !== c && t.emit("slidesLengthChange"),
    u.length !== h &&
      (t.params.watchOverflow && t.checkOverflow(),
      t.emit("snapGridLengthChange")),
    y.length !== m && t.emit("slidesGridLengthChange"),
    i.watchSlidesProgress && t.updateSlidesOffset(),
    !p && !i.cssMode && (i.effect === "slide" || i.effect === "fade"))
  ) {
    const P = `${i.containerModifierClass}backface-hidden`,
      M = t.el.classList.contains(P);
    d <= i.maxBackfaceHiddenSlides
      ? M || t.el.classList.add(P)
      : M && t.el.classList.remove(P);
  }
}
function ot(t) {
  const e = this,
    s = [],
    i = e.virtual && e.params.virtual.enabled;
  let a = 0,
    r;
  typeof t == "number"
    ? e.setTransition(t)
    : t === !0 && e.setTransition(e.params.speed);
  const f = (o) => (i ? e.slides[e.getSlideIndexByData(o)] : e.slides[o]);
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((o) => {
        s.push(o);
      });
    else
      for (r = 0; r < Math.ceil(e.params.slidesPerView); r += 1) {
        const o = e.activeIndex + r;
        if (o > e.slides.length && !i) break;
        s.push(f(o));
      }
  else s.push(f(e.activeIndex));
  for (r = 0; r < s.length; r += 1)
    if (typeof s[r] < "u") {
      const o = s[r].offsetHeight;
      a = o > a ? o : a;
    }
  (a || a === 0) && (e.wrapperEl.style.height = `${a}px`);
}
function dt() {
  const t = this,
    e = t.slides,
    s = t.isElement
      ? t.isHorizontal()
        ? t.wrapperEl.offsetLeft
        : t.wrapperEl.offsetTop
      : 0;
  for (let i = 0; i < e.length; i += 1)
    e[i].swiperSlideOffset =
      (t.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) -
      s -
      t.cssOverflowAdjustment();
}
function ct(t) {
  t === void 0 && (t = (this && this.translate) || 0);
  const e = this,
    s = e.params,
    { slides: i, rtlTranslate: a, snapGrid: r } = e;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
  let f = -t;
  a && (f = t),
    i.forEach((n) => {
      n.classList.remove(s.slideVisibleClass);
    }),
    (e.visibleSlidesIndexes = []),
    (e.visibleSlides = []);
  let o = s.spaceBetween;
  typeof o == "string" && o.indexOf("%") >= 0
    ? (o = (parseFloat(o.replace("%", "")) / 100) * e.size)
    : typeof o == "string" && (o = parseFloat(o));
  for (let n = 0; n < i.length; n += 1) {
    const p = i[n];
    let c = p.swiperSlideOffset;
    s.cssMode && s.centeredSlides && (c -= i[0].swiperSlideOffset);
    const l =
        (f + (s.centeredSlides ? e.minTranslate() : 0) - c) /
        (p.swiperSlideSize + o),
      d =
        (f - r[0] + (s.centeredSlides ? e.minTranslate() : 0) - c) /
        (p.swiperSlideSize + o),
      u = -(f - c),
      y = u + e.slidesSizesGrid[n];
    ((u >= 0 && u < e.size - 1) ||
      (y > 1 && y <= e.size) ||
      (u <= 0 && y >= e.size)) &&
      (e.visibleSlides.push(p),
      e.visibleSlidesIndexes.push(n),
      i[n].classList.add(s.slideVisibleClass)),
      (p.progress = a ? -l : l),
      (p.originalProgress = a ? -d : d);
  }
}
function ft(t) {
  const e = this;
  if (typeof t > "u") {
    const c = e.rtlTranslate ? -1 : 1;
    t = (e && e.translate && e.translate * c) || 0;
  }
  const s = e.params,
    i = e.maxTranslate() - e.minTranslate();
  let { progress: a, isBeginning: r, isEnd: f, progressLoop: o } = e;
  const n = r,
    p = f;
  if (i === 0) (a = 0), (r = !0), (f = !0);
  else {
    a = (t - e.minTranslate()) / i;
    const c = Math.abs(t - e.minTranslate()) < 1,
      l = Math.abs(t - e.maxTranslate()) < 1;
    (r = c || a <= 0), (f = l || a >= 1), c && (a = 0), l && (a = 1);
  }
  if (s.loop) {
    const c = e.getSlideIndexByData(0),
      l = e.getSlideIndexByData(e.slides.length - 1),
      d = e.slidesGrid[c],
      u = e.slidesGrid[l],
      y = e.slidesGrid[e.slidesGrid.length - 1],
      g = Math.abs(t);
    g >= d ? (o = (g - d) / y) : (o = (g + y - u) / y), o > 1 && (o -= 1);
  }
  Object.assign(e, { progress: a, progressLoop: o, isBeginning: r, isEnd: f }),
    (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
      e.updateSlidesProgress(t),
    r && !n && e.emit("reachBeginning toEdge"),
    f && !p && e.emit("reachEnd toEdge"),
    ((n && !r) || (p && !f)) && e.emit("fromEdge"),
    e.emit("progress", a);
}
function pt() {
  const t = this,
    { slides: e, params: s, slidesEl: i, activeIndex: a } = t,
    r = t.virtual && s.virtual.enabled,
    f = (n) => R(i, `.${s.slideClass}${n}, swiper-slide${n}`)[0];
  e.forEach((n) => {
    n.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass);
  });
  let o;
  if (r)
    if (s.loop) {
      let n = a - t.virtual.slidesBefore;
      n < 0 && (n = t.virtual.slides.length + n),
        n >= t.virtual.slides.length && (n -= t.virtual.slides.length),
        (o = f(`[data-swiper-slide-index="${n}"]`));
    } else o = f(`[data-swiper-slide-index="${a}"]`);
  else o = e[a];
  if (o) {
    o.classList.add(s.slideActiveClass);
    let n = Ze(o, `.${s.slideClass}, swiper-slide`)[0];
    s.loop && !n && (n = e[0]), n && n.classList.add(s.slideNextClass);
    let p = Ke(o, `.${s.slideClass}, swiper-slide`)[0];
    s.loop && !p === 0 && (p = e[e.length - 1]),
      p && p.classList.add(s.slidePrevClass);
  }
  t.emitSlidesClasses();
}
const ue = (t, e) => {
    if (!t || t.destroyed || !t.params) return;
    const s = () => (t.isElement ? "swiper-slide" : `.${t.params.slideClass}`),
      i = e.closest(s());
    if (i) {
      const a = i.querySelector(`.${t.params.lazyPreloaderClass}`);
      a && a.remove();
    }
  },
  Ee = (t, e) => {
    if (!t.slides[e]) return;
    const s = t.slides[e].querySelector('[loading="lazy"]');
    s && s.removeAttribute("loading");
  },
  Le = (t) => {
    if (!t || t.destroyed || !t.params) return;
    let e = t.params.lazyPreloadPrevNext;
    const s = t.slides.length;
    if (!s || !e || e < 0) return;
    e = Math.min(e, s);
    const i =
        t.params.slidesPerView === "auto"
          ? t.slidesPerViewDynamic()
          : Math.ceil(t.params.slidesPerView),
      a = t.activeIndex;
    if (t.params.grid && t.params.grid.rows > 1) {
      const f = a,
        o = [f - e];
      o.push(...Array.from({ length: e }).map((n, p) => f + i + p)),
        t.slides.forEach((n, p) => {
          o.includes(n.column) && Ee(t, p);
        });
      return;
    }
    const r = a + i - 1;
    if (t.params.rewind || t.params.loop)
      for (let f = a - e; f <= r + e; f += 1) {
        const o = ((f % s) + s) % s;
        (o < a || o > r) && Ee(t, o);
      }
    else
      for (let f = Math.max(a - e, 0); f <= Math.min(r + e, s - 1); f += 1)
        f !== a && (f > r || f < a) && Ee(t, f);
  };
function ut(t) {
  const { slidesGrid: e, params: s } = t,
    i = t.rtlTranslate ? t.translate : -t.translate;
  let a;
  for (let r = 0; r < e.length; r += 1)
    typeof e[r + 1] < "u"
      ? i >= e[r] && i < e[r + 1] - (e[r + 1] - e[r]) / 2
        ? (a = r)
        : i >= e[r] && i < e[r + 1] && (a = r + 1)
      : i >= e[r] && (a = r);
  return s.normalizeSlideIndex && (a < 0 || typeof a > "u") && (a = 0), a;
}
function mt(t) {
  const e = this,
    s = e.rtlTranslate ? e.translate : -e.translate,
    { snapGrid: i, params: a, activeIndex: r, realIndex: f, snapIndex: o } = e;
  let n = t,
    p;
  const c = (d) => {
    let u = d - e.virtual.slidesBefore;
    return (
      u < 0 && (u = e.virtual.slides.length + u),
      u >= e.virtual.slides.length && (u -= e.virtual.slides.length),
      u
    );
  };
  if ((typeof n > "u" && (n = ut(e)), i.indexOf(s) >= 0)) p = i.indexOf(s);
  else {
    const d = Math.min(a.slidesPerGroupSkip, n);
    p = d + Math.floor((n - d) / a.slidesPerGroup);
  }
  if ((p >= i.length && (p = i.length - 1), n === r)) {
    p !== o && ((e.snapIndex = p), e.emit("snapIndexChange")),
      e.params.loop &&
        e.virtual &&
        e.params.virtual.enabled &&
        (e.realIndex = c(n));
    return;
  }
  let l;
  e.virtual && a.virtual.enabled && a.loop
    ? (l = c(n))
    : e.slides[n]
    ? (l = parseInt(
        e.slides[n].getAttribute("data-swiper-slide-index") || n,
        10
      ))
    : (l = n),
    Object.assign(e, {
      previousSnapIndex: o,
      snapIndex: p,
      previousRealIndex: f,
      realIndex: l,
      previousIndex: r,
      activeIndex: n,
    }),
    e.initialized && Le(e),
    e.emit("activeIndexChange"),
    e.emit("snapIndexChange"),
    f !== l && e.emit("realIndexChange"),
    (e.initialized || e.params.runCallbacksOnInit) && e.emit("slideChange");
}
function ht(t) {
  const e = this,
    s = e.params,
    i = t.closest(`.${s.slideClass}, swiper-slide`);
  let a = !1,
    r;
  if (i) {
    for (let f = 0; f < e.slides.length; f += 1)
      if (e.slides[f] === i) {
        (a = !0), (r = f);
        break;
      }
  }
  if (i && a)
    (e.clickedSlide = i),
      e.virtual && e.params.virtual.enabled
        ? (e.clickedIndex = parseInt(
            i.getAttribute("data-swiper-slide-index"),
            10
          ))
        : (e.clickedIndex = r);
  else {
    (e.clickedSlide = void 0), (e.clickedIndex = void 0);
    return;
  }
  s.slideToClickedSlide &&
    e.clickedIndex !== void 0 &&
    e.clickedIndex !== e.activeIndex &&
    e.slideToClickedSlide();
}
var gt = {
  updateSize: nt,
  updateSlides: lt,
  updateAutoHeight: ot,
  updateSlidesOffset: dt,
  updateSlidesProgress: ct,
  updateProgress: ft,
  updateSlidesClasses: pt,
  updateActiveIndex: mt,
  updateClickedSlide: ht,
};
function vt(t) {
  t === void 0 && (t = this.isHorizontal() ? "x" : "y");
  const e = this,
    { params: s, rtlTranslate: i, translate: a, wrapperEl: r } = e;
  if (s.virtualTranslate) return i ? -a : a;
  if (s.cssMode) return a;
  let f = Ce(r, t);
  return (f += e.cssOverflowAdjustment()), i && (f = -f), f || 0;
}
function wt(t, e) {
  const s = this,
    { rtlTranslate: i, params: a, wrapperEl: r, progress: f } = s;
  let o = 0,
    n = 0;
  const p = 0;
  s.isHorizontal() ? (o = i ? -t : t) : (n = t),
    a.roundLengths && ((o = Math.floor(o)), (n = Math.floor(n))),
    (s.previousTranslate = s.translate),
    (s.translate = s.isHorizontal() ? o : n),
    a.cssMode
      ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
          ? -o
          : -n)
      : a.virtualTranslate ||
        (s.isHorizontal()
          ? (o -= s.cssOverflowAdjustment())
          : (n -= s.cssOverflowAdjustment()),
        (r.style.transform = `translate3d(${o}px, ${n}px, ${p}px)`));
  let c;
  const l = s.maxTranslate() - s.minTranslate();
  l === 0 ? (c = 0) : (c = (t - s.minTranslate()) / l),
    c !== f && s.updateProgress(t),
    s.emit("setTranslate", s.translate, e);
}
function yt() {
  return -this.snapGrid[0];
}
function bt() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function St(t, e, s, i, a) {
  t === void 0 && (t = 0),
    e === void 0 && (e = this.params.speed),
    s === void 0 && (s = !0),
    i === void 0 && (i = !0);
  const r = this,
    { params: f, wrapperEl: o } = r;
  if (r.animating && f.preventInteractionOnTransition) return !1;
  const n = r.minTranslate(),
    p = r.maxTranslate();
  let c;
  if (
    (i && t > n ? (c = n) : i && t < p ? (c = p) : (c = t),
    r.updateProgress(c),
    f.cssMode)
  ) {
    const l = r.isHorizontal();
    if (e === 0) o[l ? "scrollLeft" : "scrollTop"] = -c;
    else {
      if (!r.support.smoothScroll)
        return (
          Re({ swiper: r, targetPosition: -c, side: l ? "left" : "top" }), !0
        );
      o.scrollTo({ [l ? "left" : "top"]: -c, behavior: "smooth" });
    }
    return !0;
  }
  return (
    e === 0
      ? (r.setTransition(0),
        r.setTranslate(c),
        s && (r.emit("beforeTransitionStart", e, a), r.emit("transitionEnd")))
      : (r.setTransition(e),
        r.setTranslate(c),
        s && (r.emit("beforeTransitionStart", e, a), r.emit("transitionStart")),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (d) {
              !r ||
                r.destroyed ||
                (d.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  (r.onTranslateToWrapperTransitionEnd = null),
                  delete r.onTranslateToWrapperTransitionEnd,
                  s && r.emit("transitionEnd")));
            }),
          r.wrapperEl.addEventListener(
            "transitionend",
            r.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
var xt = {
  getTranslate: vt,
  setTranslate: wt,
  minTranslate: yt,
  maxTranslate: bt,
  translateTo: St,
};
function Et(t, e) {
  const s = this;
  s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${t}ms`),
    s.emit("setTransition", t, e);
}
function Ve(t) {
  let { swiper: e, runCallbacks: s, direction: i, step: a } = t;
  const { activeIndex: r, previousIndex: f } = e;
  let o = i;
  if (
    (o || (r > f ? (o = "next") : r < f ? (o = "prev") : (o = "reset")),
    e.emit(`transition${a}`),
    s && r !== f)
  ) {
    if (o === "reset") {
      e.emit(`slideResetTransition${a}`);
      return;
    }
    e.emit(`slideChangeTransition${a}`),
      o === "next"
        ? e.emit(`slideNextTransition${a}`)
        : e.emit(`slidePrevTransition${a}`);
  }
}
function Tt(t, e) {
  t === void 0 && (t = !0);
  const s = this,
    { params: i } = s;
  i.cssMode ||
    (i.autoHeight && s.updateAutoHeight(),
    Ve({ swiper: s, runCallbacks: t, direction: e, step: "Start" }));
}
function Mt(t, e) {
  t === void 0 && (t = !0);
  const s = this,
    { params: i } = s;
  (s.animating = !1),
    !i.cssMode &&
      (s.setTransition(0),
      Ve({ swiper: s, runCallbacks: t, direction: e, step: "End" }));
}
var Ct = { setTransition: Et, transitionStart: Tt, transitionEnd: Mt };
function Pt(t, e, s, i, a) {
  t === void 0 && (t = 0),
    e === void 0 && (e = this.params.speed),
    s === void 0 && (s = !0),
    typeof t == "string" && (t = parseInt(t, 10));
  const r = this;
  let f = t;
  f < 0 && (f = 0);
  const {
    params: o,
    snapGrid: n,
    slidesGrid: p,
    previousIndex: c,
    activeIndex: l,
    rtlTranslate: d,
    wrapperEl: u,
    enabled: y,
  } = r;
  if ((r.animating && o.preventInteractionOnTransition) || (!y && !i && !a))
    return !1;
  const g = Math.min(r.params.slidesPerGroupSkip, f);
  let v = g + Math.floor((f - g) / r.params.slidesPerGroup);
  v >= n.length && (v = n.length - 1);
  const b = -n[v];
  if (o.normalizeSlideIndex)
    for (let m = 0; m < p.length; m += 1) {
      const S = -Math.floor(b * 100),
        C = Math.floor(p[m] * 100),
        I = Math.floor(p[m + 1] * 100);
      typeof p[m + 1] < "u"
        ? S >= C && S < I - (I - C) / 2
          ? (f = m)
          : S >= C && S < I && (f = m + 1)
        : S >= C && (f = m);
    }
  if (
    r.initialized &&
    f !== l &&
    ((!r.allowSlideNext &&
      (d
        ? b > r.translate && b > r.minTranslate()
        : b < r.translate && b < r.minTranslate())) ||
      (!r.allowSlidePrev &&
        b > r.translate &&
        b > r.maxTranslate() &&
        (l || 0) !== f))
  )
    return !1;
  f !== (c || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(b);
  let h;
  if (
    (f > l ? (h = "next") : f < l ? (h = "prev") : (h = "reset"),
    (d && -b === r.translate) || (!d && b === r.translate))
  )
    return (
      r.updateActiveIndex(f),
      o.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      o.effect !== "slide" && r.setTranslate(b),
      h !== "reset" && (r.transitionStart(s, h), r.transitionEnd(s, h)),
      !1
    );
  if (o.cssMode) {
    const m = r.isHorizontal(),
      S = d ? b : -b;
    if (e === 0) {
      const C = r.virtual && r.params.virtual.enabled;
      C &&
        ((r.wrapperEl.style.scrollSnapType = "none"),
        (r._immediateVirtual = !0)),
        C && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              u[m ? "scrollLeft" : "scrollTop"] = S;
            }))
          : (u[m ? "scrollLeft" : "scrollTop"] = S),
        C &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ""), (r._immediateVirtual = !1);
          });
    } else {
      if (!r.support.smoothScroll)
        return (
          Re({ swiper: r, targetPosition: S, side: m ? "left" : "top" }), !0
        );
      u.scrollTo({ [m ? "left" : "top"]: S, behavior: "smooth" });
    }
    return !0;
  }
  return (
    r.setTransition(e),
    r.setTranslate(b),
    r.updateActiveIndex(f),
    r.updateSlidesClasses(),
    r.emit("beforeTransitionStart", e, i),
    r.transitionStart(s, h),
    e === 0
      ? r.transitionEnd(s, h)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (S) {
            !r ||
              r.destroyed ||
              (S.target === this &&
                (r.wrapperEl.removeEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(s, h)));
          }),
        r.wrapperEl.addEventListener(
          "transitionend",
          r.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function Lt(t, e, s, i) {
  t === void 0 && (t = 0),
    e === void 0 && (e = this.params.speed),
    s === void 0 && (s = !0),
    typeof t == "string" && (t = parseInt(t, 10));
  const a = this;
  let r = t;
  return (
    a.params.loop &&
      (a.virtual && a.params.virtual.enabled
        ? (r = r + a.virtual.slidesBefore)
        : (r = a.getSlideIndexByData(r))),
    a.slideTo(r, e, s, i)
  );
}
function It(t, e, s) {
  t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
  const i = this,
    { enabled: a, params: r, animating: f } = i;
  if (!a) return i;
  let o = r.slidesPerGroup;
  r.slidesPerView === "auto" &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
  const n = i.activeIndex < r.slidesPerGroupSkip ? 1 : o,
    p = i.virtual && r.virtual.enabled;
  if (r.loop) {
    if (f && !p && r.loopPreventsSliding) return !1;
    i.loopFix({ direction: "next" }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  return r.rewind && i.isEnd
    ? i.slideTo(0, t, e, s)
    : i.slideTo(i.activeIndex + n, t, e, s);
}
function zt(t, e, s) {
  t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
  const i = this,
    {
      params: a,
      snapGrid: r,
      slidesGrid: f,
      rtlTranslate: o,
      enabled: n,
      animating: p,
    } = i;
  if (!n) return i;
  const c = i.virtual && a.virtual.enabled;
  if (a.loop) {
    if (p && !c && a.loopPreventsSliding) return !1;
    i.loopFix({ direction: "prev" }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  const l = o ? i.translate : -i.translate;
  function d(b) {
    return b < 0 ? -Math.floor(Math.abs(b)) : Math.floor(b);
  }
  const u = d(l),
    y = r.map((b) => d(b));
  let g = r[y.indexOf(u) - 1];
  if (typeof g > "u" && a.cssMode) {
    let b;
    r.forEach((h, m) => {
      u >= h && (b = m);
    }),
      typeof b < "u" && (g = r[b > 0 ? b - 1 : b]);
  }
  let v = 0;
  if (
    (typeof g < "u" &&
      ((v = f.indexOf(g)),
      v < 0 && (v = i.activeIndex - 1),
      a.slidesPerView === "auto" &&
        a.slidesPerGroup === 1 &&
        a.slidesPerGroupAuto &&
        ((v = v - i.slidesPerViewDynamic("previous", !0) + 1),
        (v = Math.max(v, 0)))),
    a.rewind && i.isBeginning)
  ) {
    const b =
      i.params.virtual && i.params.virtual.enabled && i.virtual
        ? i.virtual.slides.length - 1
        : i.slides.length - 1;
    return i.slideTo(b, t, e, s);
  }
  return i.slideTo(v, t, e, s);
}
function At(t, e, s) {
  t === void 0 && (t = this.params.speed), e === void 0 && (e = !0);
  const i = this;
  return i.slideTo(i.activeIndex, t, e, s);
}
function $t(t, e, s, i) {
  t === void 0 && (t = this.params.speed),
    e === void 0 && (e = !0),
    i === void 0 && (i = 0.5);
  const a = this;
  let r = a.activeIndex;
  const f = Math.min(a.params.slidesPerGroupSkip, r),
    o = f + Math.floor((r - f) / a.params.slidesPerGroup),
    n = a.rtlTranslate ? a.translate : -a.translate;
  if (n >= a.snapGrid[o]) {
    const p = a.snapGrid[o],
      c = a.snapGrid[o + 1];
    n - p > (c - p) * i && (r += a.params.slidesPerGroup);
  } else {
    const p = a.snapGrid[o - 1],
      c = a.snapGrid[o];
    n - p <= (c - p) * i && (r -= a.params.slidesPerGroup);
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, a.slidesGrid.length - 1)),
    a.slideTo(r, t, e, s)
  );
}
function Ot() {
  const t = this,
    { params: e, slidesEl: s } = t,
    i = e.slidesPerView === "auto" ? t.slidesPerViewDynamic() : e.slidesPerView;
  let a = t.clickedIndex,
    r;
  const f = t.isElement ? "swiper-slide" : `.${e.slideClass}`;
  if (e.loop) {
    if (t.animating) return;
    (r = parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
      e.centeredSlides
        ? a < t.loopedSlides - i / 2 ||
          a > t.slides.length - t.loopedSlides + i / 2
          ? (t.loopFix(),
            (a = t.getSlideIndex(
              R(s, `${f}[data-swiper-slide-index="${r}"]`)[0]
            )),
            ee(() => {
              t.slideTo(a);
            }))
          : t.slideTo(a)
        : a > t.slides.length - i
        ? (t.loopFix(),
          (a = t.getSlideIndex(
            R(s, `${f}[data-swiper-slide-index="${r}"]`)[0]
          )),
          ee(() => {
            t.slideTo(a);
          }))
        : t.slideTo(a);
  } else t.slideTo(a);
}
var Dt = {
  slideTo: Pt,
  slideToLoop: Lt,
  slideNext: It,
  slidePrev: zt,
  slideReset: At,
  slideToClosest: $t,
  slideToClickedSlide: Ot,
};
function kt(t) {
  const e = this,
    { params: s, slidesEl: i } = e;
  if (!s.loop || (e.virtual && e.params.virtual.enabled)) return;
  R(i, `.${s.slideClass}, swiper-slide`).forEach((r, f) => {
    r.setAttribute("data-swiper-slide-index", f);
  }),
    e.loopFix({
      slideRealIndex: t,
      direction: s.centeredSlides ? void 0 : "next",
    });
}
function Ht(t) {
  let {
    slideRealIndex: e,
    slideTo: s = !0,
    direction: i,
    setTranslate: a,
    activeSlideIndex: r,
    byController: f,
    byMousewheel: o,
  } = t === void 0 ? {} : t;
  const n = this;
  if (!n.params.loop) return;
  n.emit("beforeLoopFix");
  const {
    slides: p,
    allowSlidePrev: c,
    allowSlideNext: l,
    slidesEl: d,
    params: u,
  } = n;
  if (
    ((n.allowSlidePrev = !0),
    (n.allowSlideNext = !0),
    n.virtual && u.virtual.enabled)
  ) {
    s &&
      (!u.centeredSlides && n.snapIndex === 0
        ? n.slideTo(n.virtual.slides.length, 0, !1, !0)
        : u.centeredSlides && n.snapIndex < u.slidesPerView
        ? n.slideTo(n.virtual.slides.length + n.snapIndex, 0, !1, !0)
        : n.snapIndex === n.snapGrid.length - 1 &&
          n.slideTo(n.virtual.slidesBefore, 0, !1, !0)),
      (n.allowSlidePrev = c),
      (n.allowSlideNext = l),
      n.emit("loopFix");
    return;
  }
  const y =
    u.slidesPerView === "auto"
      ? n.slidesPerViewDynamic()
      : Math.ceil(parseFloat(u.slidesPerView, 10));
  let g = u.loopedSlides || y;
  g % u.slidesPerGroup !== 0 &&
    (g += u.slidesPerGroup - (g % u.slidesPerGroup)),
    (n.loopedSlides = g);
  const v = [],
    b = [];
  let h = n.activeIndex;
  typeof r > "u"
    ? (r = n.getSlideIndex(
        n.slides.filter((A) => A.classList.contains(u.slideActiveClass))[0]
      ))
    : (h = r);
  const m = i === "next" || !i,
    S = i === "prev" || !i;
  let C = 0,
    I = 0;
  if (r < g) {
    C = Math.max(g - r, u.slidesPerGroup);
    for (let A = 0; A < g - r; A += 1) {
      const D = A - Math.floor(A / p.length) * p.length;
      v.push(p.length - D - 1);
    }
  } else if (r > n.slides.length - g * 2) {
    I = Math.max(r - (n.slides.length - g * 2), u.slidesPerGroup);
    for (let A = 0; A < I; A += 1) {
      const D = A - Math.floor(A / p.length) * p.length;
      b.push(D);
    }
  }
  if (
    (S &&
      v.forEach((A) => {
        (n.slides[A].swiperLoopMoveDOM = !0),
          d.prepend(n.slides[A]),
          (n.slides[A].swiperLoopMoveDOM = !1);
      }),
    m &&
      b.forEach((A) => {
        (n.slides[A].swiperLoopMoveDOM = !0),
          d.append(n.slides[A]),
          (n.slides[A].swiperLoopMoveDOM = !1);
      }),
    n.recalcSlides(),
    u.slidesPerView === "auto" && n.updateSlides(),
    u.watchSlidesProgress && n.updateSlidesOffset(),
    s)
  ) {
    if (v.length > 0 && S)
      if (typeof e > "u") {
        const A = n.slidesGrid[h],
          L = n.slidesGrid[h + C] - A;
        o
          ? n.setTranslate(n.translate - L)
          : (n.slideTo(h + C, 0, !1, !0),
            a && (n.touches[n.isHorizontal() ? "startX" : "startY"] += L));
      } else a && n.slideToLoop(e, 0, !1, !0);
    else if (b.length > 0 && m)
      if (typeof e > "u") {
        const A = n.slidesGrid[h],
          L = n.slidesGrid[h - I] - A;
        o
          ? n.setTranslate(n.translate - L)
          : (n.slideTo(h - I, 0, !1, !0),
            a && (n.touches[n.isHorizontal() ? "startX" : "startY"] += L));
      } else n.slideToLoop(e, 0, !1, !0);
  }
  if (
    ((n.allowSlidePrev = c),
    (n.allowSlideNext = l),
    n.controller && n.controller.control && !f)
  ) {
    const A = {
      slideRealIndex: e,
      slideTo: !1,
      direction: i,
      setTranslate: a,
      activeSlideIndex: r,
      byController: !0,
    };
    Array.isArray(n.controller.control)
      ? n.controller.control.forEach((D) => {
          !D.destroyed && D.params.loop && D.loopFix(A);
        })
      : n.controller.control instanceof n.constructor &&
        n.controller.control.params.loop &&
        n.controller.control.loopFix(A);
  }
  n.emit("loopFix");
}
function Gt() {
  const t = this,
    { params: e, slidesEl: s } = t;
  if (!e.loop || (t.virtual && t.params.virtual.enabled)) return;
  t.recalcSlides();
  const i = [];
  t.slides.forEach((a) => {
    const r =
      typeof a.swiperSlideIndex > "u"
        ? a.getAttribute("data-swiper-slide-index") * 1
        : a.swiperSlideIndex;
    i[r] = a;
  }),
    t.slides.forEach((a) => {
      a.removeAttribute("data-swiper-slide-index");
    }),
    i.forEach((a) => {
      s.append(a);
    }),
    t.recalcSlides(),
    t.slideTo(t.realIndex, 0);
}
var Bt = { loopCreate: kt, loopFix: Ht, loopDestroy: Gt };
function Xt(t) {
  const e = this;
  if (
    !e.params.simulateTouch ||
    (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode
  )
    return;
  const s = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0),
    (s.style.cursor = "move"),
    (s.style.cursor = t ? "grabbing" : "grab"),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      });
}
function Yt() {
  const t = this;
  (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode ||
    (t.isElement && (t.__preventObserver__ = !0),
    (t[
      t.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = ""),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1;
      }));
}
var Rt = { setGrabCursor: Xt, unsetGrabCursor: Yt };
function Nt(t, e) {
  e === void 0 && (e = this);
  function s(i) {
    if (!i || i === N() || i === Y()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const a = i.closest(t);
    return !a && !i.getRootNode ? null : a || s(i.getRootNode().host);
  }
  return s(e);
}
function Vt(t) {
  const e = this,
    s = N(),
    i = Y(),
    a = e.touchEventsData;
  a.evCache.push(t);
  const { params: r, touches: f, enabled: o } = e;
  if (
    !o ||
    (!r.simulateTouch && t.pointerType === "mouse") ||
    (e.animating && r.preventInteractionOnTransition)
  )
    return;
  !e.animating && r.cssMode && r.loop && e.loopFix();
  let n = t;
  n.originalEvent && (n = n.originalEvent);
  let p = n.target;
  if (
    (r.touchEventsTarget === "wrapper" && !e.wrapperEl.contains(p)) ||
    ("which" in n && n.which === 3) ||
    ("button" in n && n.button > 0) ||
    (a.isTouched && a.isMoved)
  )
    return;
  const c = !!r.noSwipingClass && r.noSwipingClass !== "",
    l = t.composedPath ? t.composedPath() : t.path;
  c && n.target && n.target.shadowRoot && l && (p = l[0]);
  const d = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    u = !!(n.target && n.target.shadowRoot);
  if (r.noSwiping && (u ? Nt(d, p) : p.closest(d))) {
    e.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !p.closest(r.swipeHandler)) return;
  (f.currentX = n.pageX), (f.currentY = n.pageY);
  const y = f.currentX,
    g = f.currentY,
    v = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
    b = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
  if (v && (y <= b || y >= i.innerWidth - b))
    if (v === "prevent") t.preventDefault();
    else return;
  Object.assign(a, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (f.startX = y),
    (f.startY = g),
    (a.touchStartTime = _()),
    (e.allowClick = !0),
    e.updateSize(),
    (e.swipeDirection = void 0),
    r.threshold > 0 && (a.allowThresholdMove = !1);
  let h = !0;
  p.matches(a.focusableElements) &&
    ((h = !1), p.nodeName === "SELECT" && (a.isTouched = !1)),
    s.activeElement &&
      s.activeElement.matches(a.focusableElements) &&
      s.activeElement !== p &&
      s.activeElement.blur();
  const m = h && e.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || m) &&
    !p.isContentEditable &&
    n.preventDefault(),
    r.freeMode &&
      r.freeMode.enabled &&
      e.freeMode &&
      e.animating &&
      !r.cssMode &&
      e.freeMode.onTouchStart(),
    e.emit("touchStart", n);
}
function Ft(t) {
  const e = N(),
    s = this,
    i = s.touchEventsData,
    { params: a, touches: r, rtlTranslate: f, enabled: o } = s;
  if (!o || (!a.simulateTouch && t.pointerType === "mouse")) return;
  let n = t;
  if ((n.originalEvent && (n = n.originalEvent), !i.isTouched)) {
    i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", n);
    return;
  }
  const p = i.evCache.findIndex((I) => I.pointerId === n.pointerId);
  p >= 0 && (i.evCache[p] = n);
  const c = i.evCache.length > 1 ? i.evCache[0] : n,
    l = c.pageX,
    d = c.pageY;
  if (n.preventedByNestedSwiper) {
    (r.startX = l), (r.startY = d);
    return;
  }
  if (!s.allowTouchMove) {
    n.target.matches(i.focusableElements) || (s.allowClick = !1),
      i.isTouched &&
        (Object.assign(r, {
          startX: l,
          startY: d,
          prevX: s.touches.currentX,
          prevY: s.touches.currentY,
          currentX: l,
          currentY: d,
        }),
        (i.touchStartTime = _()));
    return;
  }
  if (a.touchReleaseOnEdges && !a.loop) {
    if (s.isVertical()) {
      if (
        (d < r.startY && s.translate <= s.maxTranslate()) ||
        (d > r.startY && s.translate >= s.minTranslate())
      ) {
        (i.isTouched = !1), (i.isMoved = !1);
        return;
      }
    } else if (
      (l < r.startX && s.translate <= s.maxTranslate()) ||
      (l > r.startX && s.translate >= s.minTranslate())
    )
      return;
  }
  if (
    e.activeElement &&
    n.target === e.activeElement &&
    n.target.matches(i.focusableElements)
  ) {
    (i.isMoved = !0), (s.allowClick = !1);
    return;
  }
  if (
    (i.allowTouchCallbacks && s.emit("touchMove", n),
    n.targetTouches && n.targetTouches.length > 1)
  )
    return;
  (r.currentX = l), (r.currentY = d);
  const u = r.currentX - r.startX,
    y = r.currentY - r.startY;
  if (s.params.threshold && Math.sqrt(u ** 2 + y ** 2) < s.params.threshold)
    return;
  if (typeof i.isScrolling > "u") {
    let I;
    (s.isHorizontal() && r.currentY === r.startY) ||
    (s.isVertical() && r.currentX === r.startX)
      ? (i.isScrolling = !1)
      : u * u + y * y >= 25 &&
        ((I = (Math.atan2(Math.abs(y), Math.abs(u)) * 180) / Math.PI),
        (i.isScrolling = s.isHorizontal()
          ? I > a.touchAngle
          : 90 - I > a.touchAngle));
  }
  if (
    (i.isScrolling && s.emit("touchMoveOpposite", n),
    typeof i.startMoving > "u" &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (i.startMoving = !0),
    i.isScrolling ||
      (s.zoom &&
        s.params.zoom &&
        s.params.zoom.enabled &&
        i.evCache.length > 1))
  ) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving) return;
  (s.allowClick = !1),
    !a.cssMode && n.cancelable && n.preventDefault(),
    a.touchMoveStopPropagation && !a.nested && n.stopPropagation();
  let g = s.isHorizontal() ? u : y,
    v = s.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  a.oneWayMovement &&
    ((g = Math.abs(g) * (f ? 1 : -1)), (v = Math.abs(v) * (f ? 1 : -1))),
    (r.diff = g),
    (g *= a.touchRatio),
    f && ((g = -g), (v = -v));
  const b = s.touchesDirection;
  (s.swipeDirection = g > 0 ? "prev" : "next"),
    (s.touchesDirection = v > 0 ? "prev" : "next");
  const h = s.params.loop && !a.cssMode;
  if (!i.isMoved) {
    if (
      (h && s.loopFix({ direction: s.swipeDirection }),
      (i.startTranslate = s.getTranslate()),
      s.setTransition(0),
      s.animating)
    ) {
      const I = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
      });
      s.wrapperEl.dispatchEvent(I);
    }
    (i.allowMomentumBounce = !1),
      a.grabCursor &&
        (s.allowSlideNext === !0 || s.allowSlidePrev === !0) &&
        s.setGrabCursor(!0),
      s.emit("sliderFirstMove", n);
  }
  let m;
  i.isMoved &&
    b !== s.touchesDirection &&
    h &&
    Math.abs(g) >= 1 &&
    (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (m = !0)),
    s.emit("sliderMove", n),
    (i.isMoved = !0),
    (i.currentTranslate = g + i.startTranslate);
  let S = !0,
    C = a.resistanceRatio;
  if (
    (a.touchReleaseOnEdges && (C = 0),
    g > 0
      ? (h &&
          !m &&
          i.currentTranslate >
            (a.centeredSlides
              ? s.minTranslate() - s.size / 2
              : s.minTranslate()) &&
          s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        i.currentTranslate > s.minTranslate() &&
          ((S = !1),
          a.resistance &&
            (i.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + i.startTranslate + g) ** C)))
      : g < 0 &&
        (h &&
          !m &&
          i.currentTranslate <
            (a.centeredSlides
              ? s.maxTranslate() + s.size / 2
              : s.maxTranslate()) &&
          s.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              s.slides.length -
              (a.slidesPerView === "auto"
                ? s.slidesPerViewDynamic()
                : Math.ceil(parseFloat(a.slidesPerView, 10))),
          }),
        i.currentTranslate < s.maxTranslate() &&
          ((S = !1),
          a.resistance &&
            (i.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - i.startTranslate - g) ** C))),
    S && (n.preventedByNestedSwiper = !0),
    !s.allowSlideNext &&
      s.swipeDirection === "next" &&
      i.currentTranslate < i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !s.allowSlidePrev &&
      s.swipeDirection === "prev" &&
      i.currentTranslate > i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !s.allowSlidePrev &&
      !s.allowSlideNext &&
      (i.currentTranslate = i.startTranslate),
    a.threshold > 0)
  )
    if (Math.abs(g) > a.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          (r.diff = s.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY);
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !a.followFinger ||
    a.cssMode ||
    (((a.freeMode && a.freeMode.enabled && s.freeMode) ||
      a.watchSlidesProgress) &&
      (s.updateActiveIndex(), s.updateSlidesClasses()),
    a.freeMode && a.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
    s.updateProgress(i.currentTranslate),
    s.setTranslate(i.currentTranslate));
}
function Wt(t) {
  const e = this,
    s = e.touchEventsData,
    i = s.evCache.findIndex((m) => m.pointerId === t.pointerId);
  if (
    (i >= 0 && s.evCache.splice(i, 1),
    ["pointercancel", "pointerout", "pointerleave"].includes(t.type) &&
      !(
        t.type === "pointercancel" &&
        (e.browser.isSafari || e.browser.isWebView)
      ))
  )
    return;
  const {
    params: a,
    touches: r,
    rtlTranslate: f,
    slidesGrid: o,
    enabled: n,
  } = e;
  if (!n || (!a.simulateTouch && t.pointerType === "mouse")) return;
  let p = t;
  if (
    (p.originalEvent && (p = p.originalEvent),
    s.allowTouchCallbacks && e.emit("touchEnd", p),
    (s.allowTouchCallbacks = !1),
    !s.isTouched)
  ) {
    s.isMoved && a.grabCursor && e.setGrabCursor(!1),
      (s.isMoved = !1),
      (s.startMoving = !1);
    return;
  }
  a.grabCursor &&
    s.isMoved &&
    s.isTouched &&
    (e.allowSlideNext === !0 || e.allowSlidePrev === !0) &&
    e.setGrabCursor(!1);
  const c = _(),
    l = c - s.touchStartTime;
  if (e.allowClick) {
    const m = p.path || (p.composedPath && p.composedPath());
    e.updateClickedSlide((m && m[0]) || p.target),
      e.emit("tap click", p),
      l < 300 &&
        c - s.lastClickTime < 300 &&
        e.emit("doubleTap doubleClick", p);
  }
  if (
    ((s.lastClickTime = _()),
    ee(() => {
      e.destroyed || (e.allowClick = !0);
    }),
    !s.isTouched ||
      !s.isMoved ||
      !e.swipeDirection ||
      r.diff === 0 ||
      s.currentTranslate === s.startTranslate)
  ) {
    (s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1);
    return;
  }
  (s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1);
  let d;
  if (
    (a.followFinger
      ? (d = f ? e.translate : -e.translate)
      : (d = -s.currentTranslate),
    a.cssMode)
  )
    return;
  if (a.freeMode && a.freeMode.enabled) {
    e.freeMode.onTouchEnd({ currentPos: d });
    return;
  }
  let u = 0,
    y = e.slidesSizesGrid[0];
  for (
    let m = 0;
    m < o.length;
    m += m < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
  ) {
    const S = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    typeof o[m + S] < "u"
      ? d >= o[m] && d < o[m + S] && ((u = m), (y = o[m + S] - o[m]))
      : d >= o[m] && ((u = m), (y = o[o.length - 1] - o[o.length - 2]));
  }
  let g = null,
    v = null;
  a.rewind &&
    (e.isBeginning
      ? (v =
          a.virtual && a.virtual.enabled && e.virtual
            ? e.virtual.slides.length - 1
            : e.slides.length - 1)
      : e.isEnd && (g = 0));
  const b = (d - o[u]) / y,
    h = u < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
  if (l > a.longSwipesMs) {
    if (!a.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" &&
      (b >= a.longSwipesRatio
        ? e.slideTo(a.rewind && e.isEnd ? g : u + h)
        : e.slideTo(u)),
      e.swipeDirection === "prev" &&
        (b > 1 - a.longSwipesRatio
          ? e.slideTo(u + h)
          : v !== null && b < 0 && Math.abs(b) > a.longSwipesRatio
          ? e.slideTo(v)
          : e.slideTo(u));
  } else {
    if (!a.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation &&
    (p.target === e.navigation.nextEl || p.target === e.navigation.prevEl)
      ? p.target === e.navigation.nextEl
        ? e.slideTo(u + h)
        : e.slideTo(u)
      : (e.swipeDirection === "next" && e.slideTo(g !== null ? g : u + h),
        e.swipeDirection === "prev" && e.slideTo(v !== null ? v : u));
  }
}
function He() {
  const t = this,
    { params: e, el: s } = t;
  if (s && s.offsetWidth === 0) return;
  e.breakpoints && t.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: a, snapGrid: r } = t,
    f = t.virtual && t.params.virtual.enabled;
  (t.allowSlideNext = !0),
    (t.allowSlidePrev = !0),
    t.updateSize(),
    t.updateSlides(),
    t.updateSlidesClasses();
  const o = f && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) &&
  t.isEnd &&
  !t.isBeginning &&
  !t.params.centeredSlides &&
  !o
    ? t.slideTo(t.slides.length - 1, 0, !1, !0)
    : t.params.loop && !f
    ? t.slideToLoop(t.realIndex, 0, !1, !0)
    : t.slideTo(t.activeIndex, 0, !1, !0),
    t.autoplay &&
      t.autoplay.running &&
      t.autoplay.paused &&
      (clearTimeout(t.autoplay.resizeTimeout),
      (t.autoplay.resizeTimeout = setTimeout(() => {
        t.autoplay &&
          t.autoplay.running &&
          t.autoplay.paused &&
          t.autoplay.resume();
      }, 500))),
    (t.allowSlidePrev = a),
    (t.allowSlideNext = i),
    t.params.watchOverflow && r !== t.snapGrid && t.checkOverflow();
}
function _t(t) {
  const e = this;
  e.enabled &&
    (e.allowClick ||
      (e.params.preventClicks && t.preventDefault(),
      e.params.preventClicksPropagation &&
        e.animating &&
        (t.stopPropagation(), t.stopImmediatePropagation())));
}
function qt() {
  const t = this,
    { wrapperEl: e, rtlTranslate: s, enabled: i } = t;
  if (!i) return;
  (t.previousTranslate = t.translate),
    t.isHorizontal()
      ? (t.translate = -e.scrollLeft)
      : (t.translate = -e.scrollTop),
    t.translate === 0 && (t.translate = 0),
    t.updateActiveIndex(),
    t.updateSlidesClasses();
  let a;
  const r = t.maxTranslate() - t.minTranslate();
  r === 0 ? (a = 0) : (a = (t.translate - t.minTranslate()) / r),
    a !== t.progress && t.updateProgress(s ? -t.translate : t.translate),
    t.emit("setTranslate", t.translate, !1);
}
function jt(t) {
  const e = this;
  ue(e, t.target),
    !(
      e.params.cssMode ||
      (e.params.slidesPerView !== "auto" && !e.params.autoHeight)
    ) && e.update();
}
let Ge = !1;
function Ut() {}
const Fe = (t, e) => {
  const s = N(),
    { params: i, el: a, wrapperEl: r, device: f } = t,
    o = !!i.nested,
    n = e === "on" ? "addEventListener" : "removeEventListener",
    p = e;
  a[n]("pointerdown", t.onTouchStart, { passive: !1 }),
    s[n]("pointermove", t.onTouchMove, { passive: !1, capture: o }),
    s[n]("pointerup", t.onTouchEnd, { passive: !0 }),
    s[n]("pointercancel", t.onTouchEnd, { passive: !0 }),
    s[n]("pointerout", t.onTouchEnd, { passive: !0 }),
    s[n]("pointerleave", t.onTouchEnd, { passive: !0 }),
    (i.preventClicks || i.preventClicksPropagation) &&
      a[n]("click", t.onClick, !0),
    i.cssMode && r[n]("scroll", t.onScroll),
    i.updateOnWindowResize
      ? t[p](
          f.ios || f.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          He,
          !0
        )
      : t[p]("observerUpdate", He, !0),
    a[n]("load", t.onLoad, { capture: !0 });
};
function Kt() {
  const t = this,
    e = N(),
    { params: s } = t;
  (t.onTouchStart = Vt.bind(t)),
    (t.onTouchMove = Ft.bind(t)),
    (t.onTouchEnd = Wt.bind(t)),
    s.cssMode && (t.onScroll = qt.bind(t)),
    (t.onClick = _t.bind(t)),
    (t.onLoad = jt.bind(t)),
    Ge || (e.addEventListener("touchstart", Ut), (Ge = !0)),
    Fe(t, "on");
}
function Zt() {
  Fe(this, "off");
}
var Qt = { attachEvents: Kt, detachEvents: Zt };
const Be = (t, e) => t.grid && e.grid && e.grid.rows > 1;
function Jt() {
  const t = this,
    { realIndex: e, initialized: s, params: i, el: a } = t,
    r = i.breakpoints;
  if (!r || (r && Object.keys(r).length === 0)) return;
  const f = t.getBreakpoint(r, t.params.breakpointsBase, t.el);
  if (!f || t.currentBreakpoint === f) return;
  const n = (f in r ? r[f] : void 0) || t.originalParams,
    p = Be(t, i),
    c = Be(t, n),
    l = i.enabled;
  p && !c
    ? (a.classList.remove(
        `${i.containerModifierClass}grid`,
        `${i.containerModifierClass}grid-column`
      ),
      t.emitContainerClasses())
    : !p &&
      c &&
      (a.classList.add(`${i.containerModifierClass}grid`),
      ((n.grid.fill && n.grid.fill === "column") ||
        (!n.grid.fill && i.grid.fill === "column")) &&
        a.classList.add(`${i.containerModifierClass}grid-column`),
      t.emitContainerClasses()),
    ["navigation", "pagination", "scrollbar"].forEach((g) => {
      if (typeof n[g] > "u") return;
      const v = i[g] && i[g].enabled,
        b = n[g] && n[g].enabled;
      v && !b && t[g].disable(), !v && b && t[g].enable();
    });
  const d = n.direction && n.direction !== i.direction,
    u = i.loop && (n.slidesPerView !== i.slidesPerView || d);
  d && s && t.changeDirection(), W(t.params, n);
  const y = t.params.enabled;
  Object.assign(t, {
    allowTouchMove: t.params.allowTouchMove,
    allowSlideNext: t.params.allowSlideNext,
    allowSlidePrev: t.params.allowSlidePrev,
  }),
    l && !y ? t.disable() : !l && y && t.enable(),
    (t.currentBreakpoint = f),
    t.emit("_beforeBreakpoint", n),
    u && s && (t.loopDestroy(), t.loopCreate(e), t.updateSlides()),
    t.emit("breakpoint", n);
}
function es(t, e, s) {
  if ((e === void 0 && (e = "window"), !t || (e === "container" && !s))) return;
  let i = !1;
  const a = Y(),
    r = e === "window" ? a.innerHeight : s.clientHeight,
    f = Object.keys(t).map((o) => {
      if (typeof o == "string" && o.indexOf("@") === 0) {
        const n = parseFloat(o.substr(1));
        return { value: r * n, point: o };
      }
      return { value: o, point: o };
    });
  f.sort((o, n) => parseInt(o.value, 10) - parseInt(n.value, 10));
  for (let o = 0; o < f.length; o += 1) {
    const { point: n, value: p } = f[o];
    e === "window"
      ? a.matchMedia(`(min-width: ${p}px)`).matches && (i = n)
      : p <= s.clientWidth && (i = n);
  }
  return i || "max";
}
var ts = { setBreakpoint: Jt, getBreakpoint: es };
function ss(t, e) {
  const s = [];
  return (
    t.forEach((i) => {
      typeof i == "object"
        ? Object.keys(i).forEach((a) => {
            i[a] && s.push(e + a);
          })
        : typeof i == "string" && s.push(e + i);
    }),
    s
  );
}
function is() {
  const t = this,
    { classNames: e, params: s, rtl: i, el: a, device: r } = t,
    f = ss(
      [
        "initialized",
        s.direction,
        { "free-mode": t.params.freeMode && s.freeMode.enabled },
        { autoheight: s.autoHeight },
        { rtl: i },
        { grid: s.grid && s.grid.rows > 1 },
        {
          "grid-column": s.grid && s.grid.rows > 1 && s.grid.fill === "column",
        },
        { android: r.android },
        { ios: r.ios },
        { "css-mode": s.cssMode },
        { centered: s.cssMode && s.centeredSlides },
        { "watch-progress": s.watchSlidesProgress },
      ],
      s.containerModifierClass
    );
  e.push(...f), a.classList.add(...e), t.emitContainerClasses();
}
function rs() {
  const t = this,
    { el: e, classNames: s } = t;
  e.classList.remove(...s), t.emitContainerClasses();
}
var as = { addClasses: is, removeClasses: rs };
function ns() {
  const t = this,
    { isLocked: e, params: s } = t,
    { slidesOffsetBefore: i } = s;
  if (i) {
    const a = t.slides.length - 1,
      r = t.slidesGrid[a] + t.slidesSizesGrid[a] + i * 2;
    t.isLocked = t.size > r;
  } else t.isLocked = t.snapGrid.length === 1;
  s.allowSlideNext === !0 && (t.allowSlideNext = !t.isLocked),
    s.allowSlidePrev === !0 && (t.allowSlidePrev = !t.isLocked),
    e && e !== t.isLocked && (t.isEnd = !1),
    e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock");
}
var ls = { checkOverflow: ns },
  Xe = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function os(t, e) {
  return function (i) {
    i === void 0 && (i = {});
    const a = Object.keys(i)[0],
      r = i[a];
    if (typeof r != "object" || r === null) {
      W(e, i);
      return;
    }
    if (
      (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 &&
        t[a] === !0 &&
        (t[a] = { auto: !0 }),
      !(a in t && "enabled" in r))
    ) {
      W(e, i);
      return;
    }
    t[a] === !0 && (t[a] = { enabled: !0 }),
      typeof t[a] == "object" && !("enabled" in t[a]) && (t[a].enabled = !0),
      t[a] || (t[a] = { enabled: !1 }),
      W(e, i);
  };
}
const Te = {
    eventsEmitter: at,
    update: gt,
    translate: xt,
    transition: Ct,
    slide: Dt,
    loop: Bt,
    grabCursor: Rt,
    events: Qt,
    breakpoints: ts,
    checkOverflow: ls,
    classes: as,
  },
  Me = {};
class F {
  constructor() {
    let e, s;
    for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++)
      a[r] = arguments[r];
    a.length === 1 &&
    a[0].constructor &&
    Object.prototype.toString.call(a[0]).slice(8, -1) === "Object"
      ? (s = a[0])
      : ([e, s] = a),
      s || (s = {}),
      (s = W({}, s)),
      e && !s.el && (s.el = e);
    const f = N();
    if (
      s.el &&
      typeof s.el == "string" &&
      f.querySelectorAll(s.el).length > 1
    ) {
      const c = [];
      return (
        f.querySelectorAll(s.el).forEach((l) => {
          const d = W({}, s, { el: l });
          c.push(new F(d));
        }),
        c
      );
    }
    const o = this;
    (o.__swiper__ = !0),
      (o.support = Ne()),
      (o.device = et({ userAgent: s.userAgent })),
      (o.browser = st()),
      (o.eventsListeners = {}),
      (o.eventsAnyListeners = []),
      (o.modules = [...o.__modules__]),
      s.modules && Array.isArray(s.modules) && o.modules.push(...s.modules);
    const n = {};
    o.modules.forEach((c) => {
      c({
        params: s,
        swiper: o,
        extendParams: os(s, n),
        on: o.on.bind(o),
        once: o.once.bind(o),
        off: o.off.bind(o),
        emit: o.emit.bind(o),
      });
    });
    const p = W({}, Xe, n);
    return (
      (o.params = W({}, p, Me, s)),
      (o.originalParams = W({}, o.params)),
      (o.passedParams = W({}, s)),
      o.params &&
        o.params.on &&
        Object.keys(o.params.on).forEach((c) => {
          o.on(c, o.params.on[c]);
        }),
      o.params && o.params.onAny && o.onAny(o.params.onAny),
      Object.assign(o, {
        enabled: o.params.enabled,
        el: e,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return o.params.direction === "horizontal";
        },
        isVertical() {
          return o.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: o.params.allowSlideNext,
        allowSlidePrev: o.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: o.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: [],
        },
        allowClick: !0,
        allowTouchMove: o.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      o.emit("_swiper"),
      o.params.init && o.init(),
      o
    );
  }
  getSlideIndex(e) {
    const { slidesEl: s, params: i } = this,
      a = R(s, `.${i.slideClass}, swiper-slide`),
      r = de(a[0]);
    return de(e) - r;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(
      this.slides.filter(
        (s) => s.getAttribute("data-swiper-slide-index") * 1 === e
      )[0]
    );
  }
  recalcSlides() {
    const e = this,
      { slidesEl: s, params: i } = e;
    e.slides = R(s, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled &&
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit("disable"));
  }
  setProgress(e, s) {
    const i = this;
    e = Math.min(Math.max(e, 0), 1);
    const a = i.minTranslate(),
      f = (i.maxTranslate() - a) * e + a;
    i.translateTo(f, typeof s > "u" ? 0 : s),
      i.updateActiveIndex(),
      i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const s = e.el.className
      .split(" ")
      .filter(
        (i) =>
          i.indexOf("swiper") === 0 ||
          i.indexOf(e.params.containerModifierClass) === 0
      );
    e.emit("_containerClasses", s.join(" "));
  }
  getSlideClasses(e) {
    const s = this;
    return s.destroyed
      ? ""
      : e.className
          .split(" ")
          .filter(
            (i) =>
              i.indexOf("swiper-slide") === 0 ||
              i.indexOf(s.params.slideClass) === 0
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const s = [];
    e.slides.forEach((i) => {
      const a = e.getSlideClasses(i);
      s.push({ slideEl: i, classNames: a }), e.emit("_slideClass", i, a);
    }),
      e.emit("_slideClasses", s);
  }
  slidesPerViewDynamic(e, s) {
    e === void 0 && (e = "current"), s === void 0 && (s = !1);
    const i = this,
      {
        params: a,
        slides: r,
        slidesGrid: f,
        slidesSizesGrid: o,
        size: n,
        activeIndex: p,
      } = i;
    let c = 1;
    if (a.centeredSlides) {
      let l = r[p] ? r[p].swiperSlideSize : 0,
        d;
      for (let u = p + 1; u < r.length; u += 1)
        r[u] &&
          !d &&
          ((l += r[u].swiperSlideSize), (c += 1), l > n && (d = !0));
      for (let u = p - 1; u >= 0; u -= 1)
        r[u] &&
          !d &&
          ((l += r[u].swiperSlideSize), (c += 1), l > n && (d = !0));
    } else if (e === "current")
      for (let l = p + 1; l < r.length; l += 1)
        (s ? f[l] + o[l] - f[p] < n : f[l] - f[p] < n) && (c += 1);
    else for (let l = p - 1; l >= 0; l -= 1) f[p] - f[l] < n && (c += 1);
    return c;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: s, params: i } = e;
    i.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((f) => {
        f.complete && ue(e, f);
      }),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses();
    function a() {
      const f = e.rtlTranslate ? e.translate * -1 : e.translate,
        o = Math.min(Math.max(f, e.maxTranslate()), e.minTranslate());
      e.setTranslate(o), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let r;
    if (i.freeMode && i.freeMode.enabled && !i.cssMode)
      a(), i.autoHeight && e.updateAutoHeight();
    else {
      if (
        (i.slidesPerView === "auto" || i.slidesPerView > 1) &&
        e.isEnd &&
        !i.centeredSlides
      ) {
        const f = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
        r = e.slideTo(f.length - 1, 0, !1, !0);
      } else r = e.slideTo(e.activeIndex, 0, !1, !0);
      r || a();
    }
    i.watchOverflow && s !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  changeDirection(e, s) {
    s === void 0 && (s = !0);
    const i = this,
      a = i.params.direction;
    return (
      e || (e = a === "horizontal" ? "vertical" : "horizontal"),
      e === a ||
        (e !== "horizontal" && e !== "vertical") ||
        (i.el.classList.remove(`${i.params.containerModifierClass}${a}`),
        i.el.classList.add(`${i.params.containerModifierClass}${e}`),
        i.emitContainerClasses(),
        (i.params.direction = e),
        i.slides.forEach((r) => {
          e === "vertical" ? (r.style.width = "") : (r.style.height = "");
        }),
        i.emit("changeDirection"),
        s && i.update()),
      i
    );
  }
  changeLanguageDirection(e) {
    const s = this;
    (s.rtl && e === "rtl") ||
      (!s.rtl && e === "ltr") ||
      ((s.rtl = e === "rtl"),
      (s.rtlTranslate = s.params.direction === "horizontal" && s.rtl),
      s.rtl
        ? (s.el.classList.add(`${s.params.containerModifierClass}rtl`),
          (s.el.dir = "rtl"))
        : (s.el.classList.remove(`${s.params.containerModifierClass}rtl`),
          (s.el.dir = "ltr")),
      s.update());
  }
  mount(e) {
    const s = this;
    if (s.mounted) return !0;
    let i = e || s.params.el;
    if ((typeof i == "string" && (i = document.querySelector(i)), !i))
      return !1;
    (i.swiper = s), i.parentNode && i.parentNode.host && (s.isElement = !0);
    const a = () =>
      `.${(s.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let f = (() =>
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(a())
        : R(i, a())[0])();
    return (
      !f &&
        s.params.createElements &&
        ((f = q("div", s.params.wrapperClass)),
        i.append(f),
        R(i, `.${s.params.slideClass}`).forEach((o) => {
          f.append(o);
        })),
      Object.assign(s, {
        el: i,
        wrapperEl: f,
        slidesEl: s.isElement ? i.parentNode.host : f,
        hostEl: s.isElement ? i.parentNode.host : i,
        mounted: !0,
        rtl: i.dir.toLowerCase() === "rtl" || Z(i, "direction") === "rtl",
        rtlTranslate:
          s.params.direction === "horizontal" &&
          (i.dir.toLowerCase() === "rtl" || Z(i, "direction") === "rtl"),
        wrongRTL: Z(f, "display") === "-webkit-box",
      }),
      !0
    );
  }
  init(e) {
    const s = this;
    return (
      s.initialized ||
        s.mount(e) === !1 ||
        (s.emit("beforeInit"),
        s.params.breakpoints && s.setBreakpoint(),
        s.addClasses(),
        s.updateSize(),
        s.updateSlides(),
        s.params.watchOverflow && s.checkOverflow(),
        s.params.grabCursor && s.enabled && s.setGrabCursor(),
        s.params.loop && s.virtual && s.params.virtual.enabled
          ? s.slideTo(
              s.params.initialSlide + s.virtual.slidesBefore,
              0,
              s.params.runCallbacksOnInit,
              !1,
              !0
            )
          : s.slideTo(
              s.params.initialSlide,
              0,
              s.params.runCallbacksOnInit,
              !1,
              !0
            ),
        s.params.loop && s.loopCreate(),
        s.attachEvents(),
        [...s.el.querySelectorAll('[loading="lazy"]')].forEach((a) => {
          a.complete
            ? ue(s, a)
            : a.addEventListener("load", (r) => {
                ue(s, r.target);
              });
        }),
        Le(s),
        (s.initialized = !0),
        Le(s),
        s.emit("init"),
        s.emit("afterInit")),
      s
    );
  }
  destroy(e, s) {
    e === void 0 && (e = !0), s === void 0 && (s = !0);
    const i = this,
      { params: a, el: r, wrapperEl: f, slides: o } = i;
    return (
      typeof i.params > "u" ||
        i.destroyed ||
        (i.emit("beforeDestroy"),
        (i.initialized = !1),
        i.detachEvents(),
        a.loop && i.loopDestroy(),
        s &&
          (i.removeClasses(),
          r.removeAttribute("style"),
          f.removeAttribute("style"),
          o &&
            o.length &&
            o.forEach((n) => {
              n.classList.remove(
                a.slideVisibleClass,
                a.slideActiveClass,
                a.slideNextClass,
                a.slidePrevClass
              ),
                n.removeAttribute("style"),
                n.removeAttribute("data-swiper-slide-index");
            })),
        i.emit("destroy"),
        Object.keys(i.eventsListeners).forEach((n) => {
          i.off(n);
        }),
        e !== !1 && ((i.el.swiper = null), qe(i)),
        (i.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    W(Me, e);
  }
  static get extendedDefaults() {
    return Me;
  }
  static get defaults() {
    return Xe;
  }
  static installModule(e) {
    F.prototype.__modules__ || (F.prototype.__modules__ = []);
    const s = F.prototype.__modules__;
    typeof e == "function" && s.indexOf(e) < 0 && s.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((s) => F.installModule(s)), F)
      : (F.installModule(e), F);
  }
}
Object.keys(Te).forEach((t) => {
  Object.keys(Te[t]).forEach((e) => {
    F.prototype[e] = Te[t][e];
  });
});
F.use([it, rt]);
function ds(t) {
  let { swiper: e, extendParams: s, on: i, emit: a } = t;
  s({
    virtual: {
      enabled: !1,
      slides: [],
      cache: !0,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: !0,
      addSlidesBefore: 0,
      addSlidesAfter: 0,
    },
  });
  let r;
  const f = N();
  e.virtual = {
    cache: {},
    from: void 0,
    to: void 0,
    slides: [],
    offset: 0,
    slidesGrid: [],
  };
  const o = f.createElement("div");
  function n(y, g) {
    const v = e.params.virtual;
    if (v.cache && e.virtual.cache[g]) return e.virtual.cache[g];
    let b;
    return (
      v.renderSlide
        ? ((b = v.renderSlide.call(e, y, g)),
          typeof b == "string" && ((o.innerHTML = b), (b = o.children[0])))
        : e.isElement
        ? (b = q("swiper-slide"))
        : (b = q("div", e.params.slideClass)),
      b.setAttribute("data-swiper-slide-index", g),
      v.renderSlide || (b.innerHTML = y),
      v.cache && (e.virtual.cache[g] = b),
      b
    );
  }
  function p(y) {
    const {
        slidesPerView: g,
        slidesPerGroup: v,
        centeredSlides: b,
        loop: h,
      } = e.params,
      { addSlidesBefore: m, addSlidesAfter: S } = e.params.virtual,
      { from: C, to: I, slides: A, slidesGrid: D, offset: L } = e.virtual;
    e.params.cssMode || e.updateActiveIndex();
    const k = e.activeIndex || 0;
    let P;
    e.rtlTranslate ? (P = "right") : (P = e.isHorizontal() ? "left" : "top");
    let M, E;
    b
      ? ((M = Math.floor(g / 2) + v + S), (E = Math.floor(g / 2) + v + m))
      : ((M = g + (v - 1) + S), (E = (h ? g : v) + m));
    let w = k - E,
      x = k + M;
    h || ((w = Math.max(w, 0)), (x = Math.min(x, A.length - 1)));
    let O = (e.slidesGrid[w] || 0) - (e.slidesGrid[0] || 0);
    h && k >= E
      ? ((w -= E), b || (O += e.slidesGrid[0]))
      : h && k < E && ((w = -E), b && (O += e.slidesGrid[0])),
      Object.assign(e.virtual, {
        from: w,
        to: x,
        offset: O,
        slidesGrid: e.slidesGrid,
        slidesBefore: E,
        slidesAfter: M,
      });
    function T() {
      e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        a("virtualUpdate");
    }
    if (C === w && I === x && !y) {
      e.slidesGrid !== D &&
        O !== L &&
        e.slides.forEach((H) => {
          H.style[P] = `${O - Math.abs(e.cssOverflowAdjustment())}px`;
        }),
        e.updateProgress(),
        a("virtualUpdate");
      return;
    }
    if (e.params.virtual.renderExternal) {
      e.params.virtual.renderExternal.call(e, {
        offset: O,
        from: w,
        to: x,
        slides: (function () {
          const B = [];
          for (let j = w; j <= x; j += 1) B.push(A[j]);
          return B;
        })(),
      }),
        e.params.virtual.renderExternalUpdate ? T() : a("virtualUpdate");
      return;
    }
    const $ = [],
      z = [],
      G = (H) => {
        let B = H;
        return (
          H < 0 ? (B = A.length + H) : B >= A.length && (B = B - A.length), B
        );
      };
    if (y)
      e.slidesEl
        .querySelectorAll(`.${e.params.slideClass}, swiper-slide`)
        .forEach((H) => {
          H.remove();
        });
    else
      for (let H = C; H <= I; H += 1)
        if (H < w || H > x) {
          const B = G(H);
          e.slidesEl
            .querySelectorAll(
              `.${e.params.slideClass}[data-swiper-slide-index="${B}"], swiper-slide[data-swiper-slide-index="${B}"]`
            )
            .forEach((j) => {
              j.remove();
            });
        }
    const X = h ? -A.length : 0,
      V = h ? A.length * 2 : A.length;
    for (let H = X; H < V; H += 1)
      if (H >= w && H <= x) {
        const B = G(H);
        typeof I > "u" || y
          ? z.push(B)
          : (H > I && z.push(B), H < C && $.push(B));
      }
    if (
      (z.forEach((H) => {
        e.slidesEl.append(n(A[H], H));
      }),
      h)
    )
      for (let H = $.length - 1; H >= 0; H -= 1) {
        const B = $[H];
        e.slidesEl.prepend(n(A[B], B));
      }
    else
      $.sort((H, B) => B - H),
        $.forEach((H) => {
          e.slidesEl.prepend(n(A[H], H));
        });
    R(e.slidesEl, ".swiper-slide, swiper-slide").forEach((H) => {
      H.style[P] = `${O - Math.abs(e.cssOverflowAdjustment())}px`;
    }),
      T();
  }
  function c(y) {
    if (typeof y == "object" && "length" in y)
      for (let g = 0; g < y.length; g += 1) y[g] && e.virtual.slides.push(y[g]);
    else e.virtual.slides.push(y);
    p(!0);
  }
  function l(y) {
    const g = e.activeIndex;
    let v = g + 1,
      b = 1;
    if (Array.isArray(y)) {
      for (let h = 0; h < y.length; h += 1)
        y[h] && e.virtual.slides.unshift(y[h]);
      (v = g + y.length), (b = y.length);
    } else e.virtual.slides.unshift(y);
    if (e.params.virtual.cache) {
      const h = e.virtual.cache,
        m = {};
      Object.keys(h).forEach((S) => {
        const C = h[S],
          I = C.getAttribute("data-swiper-slide-index");
        I && C.setAttribute("data-swiper-slide-index", parseInt(I, 10) + b),
          (m[parseInt(S, 10) + b] = C);
      }),
        (e.virtual.cache = m);
    }
    p(!0), e.slideTo(v, 0);
  }
  function d(y) {
    if (typeof y > "u" || y === null) return;
    let g = e.activeIndex;
    if (Array.isArray(y))
      for (let v = y.length - 1; v >= 0; v -= 1)
        e.virtual.slides.splice(y[v], 1),
          e.params.virtual.cache && delete e.virtual.cache[y[v]],
          y[v] < g && (g -= 1),
          (g = Math.max(g, 0));
    else
      e.virtual.slides.splice(y, 1),
        e.params.virtual.cache && delete e.virtual.cache[y],
        y < g && (g -= 1),
        (g = Math.max(g, 0));
    p(!0), e.slideTo(g, 0);
  }
  function u() {
    (e.virtual.slides = []),
      e.params.virtual.cache && (e.virtual.cache = {}),
      p(!0),
      e.slideTo(0, 0);
  }
  i("beforeInit", () => {
    if (!e.params.virtual.enabled) return;
    let y;
    if (typeof e.passedParams.virtual.slides > "u") {
      const g = [...e.slidesEl.children].filter((v) =>
        v.matches(`.${e.params.slideClass}, swiper-slide`)
      );
      g &&
        g.length &&
        ((e.virtual.slides = [...g]),
        (y = !0),
        g.forEach((v, b) => {
          v.setAttribute("data-swiper-slide-index", b),
            (e.virtual.cache[b] = v),
            v.remove();
        }));
    }
    y || (e.virtual.slides = e.params.virtual.slides),
      e.classNames.push(`${e.params.containerModifierClass}virtual`),
      (e.params.watchSlidesProgress = !0),
      (e.originalParams.watchSlidesProgress = !0),
      e.params.initialSlide || p();
  }),
    i("setTranslate", () => {
      e.params.virtual.enabled &&
        (e.params.cssMode && !e._immediateVirtual
          ? (clearTimeout(r),
            (r = setTimeout(() => {
              p();
            }, 100)))
          : p());
    }),
    i("init update resize", () => {
      e.params.virtual.enabled &&
        e.params.cssMode &&
        le(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`);
    }),
    Object.assign(e.virtual, {
      appendSlide: c,
      prependSlide: l,
      removeSlide: d,
      removeAllSlides: u,
      update: p,
    });
}
function cs(t) {
  let { swiper: e, extendParams: s, on: i, emit: a } = t;
  const r = N(),
    f = Y();
  (e.keyboard = { enabled: !1 }),
    s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } });
  function o(c) {
    if (!e.enabled) return;
    const { rtlTranslate: l } = e;
    let d = c;
    d.originalEvent && (d = d.originalEvent);
    const u = d.keyCode || d.charCode,
      y = e.params.keyboard.pageUpDown,
      g = y && u === 33,
      v = y && u === 34,
      b = u === 37,
      h = u === 39,
      m = u === 38,
      S = u === 40;
    if (
      (!e.allowSlideNext &&
        ((e.isHorizontal() && h) || (e.isVertical() && S) || v)) ||
      (!e.allowSlidePrev &&
        ((e.isHorizontal() && b) || (e.isVertical() && m) || g))
    )
      return !1;
    if (
      !(d.shiftKey || d.altKey || d.ctrlKey || d.metaKey) &&
      !(
        r.activeElement &&
        r.activeElement.nodeName &&
        (r.activeElement.nodeName.toLowerCase() === "input" ||
          r.activeElement.nodeName.toLowerCase() === "textarea")
      )
    ) {
      if (e.params.keyboard.onlyInViewport && (g || v || b || h || m || S)) {
        let C = !1;
        if (
          J(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 &&
          J(e.el, `.${e.params.slideActiveClass}`).length === 0
        )
          return;
        const I = e.el,
          A = I.clientWidth,
          D = I.clientHeight,
          L = f.innerWidth,
          k = f.innerHeight,
          P = me(I);
        l && (P.left -= I.scrollLeft);
        const M = [
          [P.left, P.top],
          [P.left + A, P.top],
          [P.left, P.top + D],
          [P.left + A, P.top + D],
        ];
        for (let E = 0; E < M.length; E += 1) {
          const w = M[E];
          if (w[0] >= 0 && w[0] <= L && w[1] >= 0 && w[1] <= k) {
            if (w[0] === 0 && w[1] === 0) continue;
            C = !0;
          }
        }
        if (!C) return;
      }
      e.isHorizontal()
        ? ((g || v || b || h) &&
            (d.preventDefault ? d.preventDefault() : (d.returnValue = !1)),
          (((v || h) && !l) || ((g || b) && l)) && e.slideNext(),
          (((g || b) && !l) || ((v || h) && l)) && e.slidePrev())
        : ((g || v || m || S) &&
            (d.preventDefault ? d.preventDefault() : (d.returnValue = !1)),
          (v || S) && e.slideNext(),
          (g || m) && e.slidePrev()),
        a("keyPress", u);
    }
  }
  function n() {
    e.keyboard.enabled ||
      (r.addEventListener("keydown", o), (e.keyboard.enabled = !0));
  }
  function p() {
    e.keyboard.enabled &&
      (r.removeEventListener("keydown", o), (e.keyboard.enabled = !1));
  }
  i("init", () => {
    e.params.keyboard.enabled && n();
  }),
    i("destroy", () => {
      e.keyboard.enabled && p();
    }),
    Object.assign(e.keyboard, { enable: n, disable: p });
}
function fs(t) {
  let { swiper: e, extendParams: s, on: i, emit: a } = t;
  const r = Y();
  s({
    mousewheel: {
      enabled: !1,
      releaseOnEdges: !1,
      invert: !1,
      forceToAxis: !1,
      sensitivity: 1,
      eventsTarget: "container",
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: "swiper-no-mousewheel",
    },
  }),
    (e.mousewheel = { enabled: !1 });
  let f,
    o = _(),
    n;
  const p = [];
  function c(m) {
    let A = 0,
      D = 0,
      L = 0,
      k = 0;
    return (
      "detail" in m && (D = m.detail),
      "wheelDelta" in m && (D = -m.wheelDelta / 120),
      "wheelDeltaY" in m && (D = -m.wheelDeltaY / 120),
      "wheelDeltaX" in m && (A = -m.wheelDeltaX / 120),
      "axis" in m && m.axis === m.HORIZONTAL_AXIS && ((A = D), (D = 0)),
      (L = A * 10),
      (k = D * 10),
      "deltaY" in m && (k = m.deltaY),
      "deltaX" in m && (L = m.deltaX),
      m.shiftKey && !L && ((L = k), (k = 0)),
      (L || k) &&
        m.deltaMode &&
        (m.deltaMode === 1 ? ((L *= 40), (k *= 40)) : ((L *= 800), (k *= 800))),
      L && !A && (A = L < 1 ? -1 : 1),
      k && !D && (D = k < 1 ? -1 : 1),
      { spinX: A, spinY: D, pixelX: L, pixelY: k }
    );
  }
  function l() {
    e.enabled && (e.mouseEntered = !0);
  }
  function d() {
    e.enabled && (e.mouseEntered = !1);
  }
  function u(m) {
    return (e.params.mousewheel.thresholdDelta &&
      m.delta < e.params.mousewheel.thresholdDelta) ||
      (e.params.mousewheel.thresholdTime &&
        _() - o < e.params.mousewheel.thresholdTime)
      ? !1
      : m.delta >= 6 && _() - o < 60
      ? !0
      : (m.direction < 0
          ? (!e.isEnd || e.params.loop) &&
            !e.animating &&
            (e.slideNext(), a("scroll", m.raw))
          : (!e.isBeginning || e.params.loop) &&
            !e.animating &&
            (e.slidePrev(), a("scroll", m.raw)),
        (o = new r.Date().getTime()),
        !1);
  }
  function y(m) {
    const S = e.params.mousewheel;
    if (m.direction < 0) {
      if (e.isEnd && !e.params.loop && S.releaseOnEdges) return !0;
    } else if (e.isBeginning && !e.params.loop && S.releaseOnEdges) return !0;
    return !1;
  }
  function g(m) {
    let S = m,
      C = !0;
    if (
      !e.enabled ||
      m.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)
    )
      return;
    const I = e.params.mousewheel;
    e.params.cssMode && S.preventDefault();
    let A = e.el;
    e.params.mousewheel.eventsTarget !== "container" &&
      (A = document.querySelector(e.params.mousewheel.eventsTarget));
    const D = A && A.contains(S.target);
    if (!e.mouseEntered && !D && !I.releaseOnEdges) return !0;
    S.originalEvent && (S = S.originalEvent);
    let L = 0;
    const k = e.rtlTranslate ? -1 : 1,
      P = c(S);
    if (I.forceToAxis)
      if (e.isHorizontal())
        if (Math.abs(P.pixelX) > Math.abs(P.pixelY)) L = -P.pixelX * k;
        else return !0;
      else if (Math.abs(P.pixelY) > Math.abs(P.pixelX)) L = -P.pixelY;
      else return !0;
    else
      L = Math.abs(P.pixelX) > Math.abs(P.pixelY) ? -P.pixelX * k : -P.pixelY;
    if (L === 0) return !0;
    I.invert && (L = -L);
    let M = e.getTranslate() + L * I.sensitivity;
    if (
      (M >= e.minTranslate() && (M = e.minTranslate()),
      M <= e.maxTranslate() && (M = e.maxTranslate()),
      (C = e.params.loop
        ? !0
        : !(M === e.minTranslate() || M === e.maxTranslate())),
      C && e.params.nested && S.stopPropagation(),
      !e.params.freeMode || !e.params.freeMode.enabled)
    ) {
      const E = {
        time: _(),
        delta: Math.abs(L),
        direction: Math.sign(L),
        raw: m,
      };
      p.length >= 2 && p.shift();
      const w = p.length ? p[p.length - 1] : void 0;
      if (
        (p.push(E),
        w
          ? (E.direction !== w.direction ||
              E.delta > w.delta ||
              E.time > w.time + 150) &&
            u(E)
          : u(E),
        y(E))
      )
        return !0;
    } else {
      const E = { time: _(), delta: Math.abs(L), direction: Math.sign(L) },
        w =
          n &&
          E.time < n.time + 500 &&
          E.delta <= n.delta &&
          E.direction === n.direction;
      if (!w) {
        n = void 0;
        let x = e.getTranslate() + L * I.sensitivity;
        const O = e.isBeginning,
          T = e.isEnd;
        if (
          (x >= e.minTranslate() && (x = e.minTranslate()),
          x <= e.maxTranslate() && (x = e.maxTranslate()),
          e.setTransition(0),
          e.setTranslate(x),
          e.updateProgress(),
          e.updateActiveIndex(),
          e.updateSlidesClasses(),
          ((!O && e.isBeginning) || (!T && e.isEnd)) && e.updateSlidesClasses(),
          e.params.loop &&
            e.loopFix({
              direction: E.direction < 0 ? "next" : "prev",
              byMousewheel: !0,
            }),
          e.params.freeMode.sticky)
        ) {
          clearTimeout(f), (f = void 0), p.length >= 15 && p.shift();
          const $ = p.length ? p[p.length - 1] : void 0,
            z = p[0];
          if (
            (p.push(E), $ && (E.delta > $.delta || E.direction !== $.direction))
          )
            p.splice(0);
          else if (
            p.length >= 15 &&
            E.time - z.time < 500 &&
            z.delta - E.delta >= 1 &&
            E.delta <= 6
          ) {
            const G = L > 0 ? 0.8 : 0.2;
            (n = E),
              p.splice(0),
              (f = ee(() => {
                e.slideToClosest(e.params.speed, !0, void 0, G);
              }, 0));
          }
          f ||
            (f = ee(() => {
              (n = E),
                p.splice(0),
                e.slideToClosest(e.params.speed, !0, void 0, 0.5);
            }, 500));
        }
        if (
          (w || a("scroll", S),
          e.params.autoplay &&
            e.params.autoplayDisableOnInteraction &&
            e.autoplay.stop(),
          x === e.minTranslate() || x === e.maxTranslate())
        )
          return !0;
      }
    }
    return S.preventDefault ? S.preventDefault() : (S.returnValue = !1), !1;
  }
  function v(m) {
    let S = e.el;
    e.params.mousewheel.eventsTarget !== "container" &&
      (S = document.querySelector(e.params.mousewheel.eventsTarget)),
      S[m]("mouseenter", l),
      S[m]("mouseleave", d),
      S[m]("wheel", g);
  }
  function b() {
    return e.params.cssMode
      ? (e.wrapperEl.removeEventListener("wheel", g), !0)
      : e.mousewheel.enabled
      ? !1
      : (v("addEventListener"), (e.mousewheel.enabled = !0), !0);
  }
  function h() {
    return e.params.cssMode
      ? (e.wrapperEl.addEventListener(event, g), !0)
      : e.mousewheel.enabled
      ? (v("removeEventListener"), (e.mousewheel.enabled = !1), !0)
      : !1;
  }
  i("init", () => {
    !e.params.mousewheel.enabled && e.params.cssMode && h(),
      e.params.mousewheel.enabled && b();
  }),
    i("destroy", () => {
      e.params.cssMode && b(), e.mousewheel.enabled && h();
    }),
    Object.assign(e.mousewheel, { enable: b, disable: h });
}
function ze(t, e, s, i) {
  return (
    t.params.createElements &&
      Object.keys(i).forEach((a) => {
        if (!s[a] && s.auto === !0) {
          let r = R(t.el, `.${i[a]}`)[0];
          r || ((r = q("div", i[a])), (r.className = i[a]), t.el.append(r)),
            (s[a] = r),
            (e[a] = r);
        }
      }),
    s
  );
}
function ps(t) {
  let { swiper: e, extendParams: s, on: i, emit: a } = t;
  s({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled",
    },
  }),
    (e.navigation = { nextEl: null, prevEl: null });
  const r = (g) => (Array.isArray(g) || (g = [g].filter((v) => !!v)), g);
  function f(g) {
    let v;
    return g &&
      typeof g == "string" &&
      e.isElement &&
      ((v = e.el.querySelector(g)), v)
      ? v
      : (g &&
          (typeof g == "string" && (v = [...document.querySelectorAll(g)]),
          e.params.uniqueNavElements &&
            typeof g == "string" &&
            v.length > 1 &&
            e.el.querySelectorAll(g).length === 1 &&
            (v = e.el.querySelector(g))),
        g && !v ? g : v);
  }
  function o(g, v) {
    const b = e.params.navigation;
    (g = r(g)),
      g.forEach((h) => {
        h &&
          (h.classList[v ? "add" : "remove"](...b.disabledClass.split(" ")),
          h.tagName === "BUTTON" && (h.disabled = v),
          e.params.watchOverflow &&
            e.enabled &&
            h.classList[e.isLocked ? "add" : "remove"](b.lockClass));
      });
  }
  function n() {
    const { nextEl: g, prevEl: v } = e.navigation;
    if (e.params.loop) {
      o(v, !1), o(g, !1);
      return;
    }
    o(v, e.isBeginning && !e.params.rewind), o(g, e.isEnd && !e.params.rewind);
  }
  function p(g) {
    g.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), a("navigationPrev"));
  }
  function c(g) {
    g.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), a("navigationNext"));
  }
  function l() {
    const g = e.params.navigation;
    if (
      ((e.params.navigation = ze(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
      )),
      !(g.nextEl || g.prevEl))
    )
      return;
    let v = f(g.nextEl),
      b = f(g.prevEl);
    Object.assign(e.navigation, { nextEl: v, prevEl: b }),
      (v = r(v)),
      (b = r(b));
    const h = (m, S) => {
      m && m.addEventListener("click", S === "next" ? c : p),
        !e.enabled && m && m.classList.add(...g.lockClass.split(" "));
    };
    v.forEach((m) => h(m, "next")), b.forEach((m) => h(m, "prev"));
  }
  function d() {
    let { nextEl: g, prevEl: v } = e.navigation;
    (g = r(g)), (v = r(v));
    const b = (h, m) => {
      h.removeEventListener("click", m === "next" ? c : p),
        h.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    g.forEach((h) => b(h, "next")), v.forEach((h) => b(h, "prev"));
  }
  i("init", () => {
    e.params.navigation.enabled === !1 ? y() : (l(), n());
  }),
    i("toEdge fromEdge lock unlock", () => {
      n();
    }),
    i("destroy", () => {
      d();
    }),
    i("enable disable", () => {
      let { nextEl: g, prevEl: v } = e.navigation;
      (g = r(g)),
        (v = r(v)),
        [...g, ...v]
          .filter((b) => !!b)
          .forEach((b) =>
            b.classList[e.enabled ? "remove" : "add"](
              e.params.navigation.lockClass
            )
          );
    }),
    i("click", (g, v) => {
      let { nextEl: b, prevEl: h } = e.navigation;
      (b = r(b)), (h = r(h));
      const m = v.target;
      if (e.params.navigation.hideOnClick && !h.includes(m) && !b.includes(m)) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === m || e.pagination.el.contains(m))
        )
          return;
        let S;
        b.length
          ? (S = b[0].classList.contains(e.params.navigation.hiddenClass))
          : h.length &&
            (S = h[0].classList.contains(e.params.navigation.hiddenClass)),
          a(S === !0 ? "navigationShow" : "navigationHide"),
          [...b, ...h]
            .filter((C) => !!C)
            .forEach((C) =>
              C.classList.toggle(e.params.navigation.hiddenClass)
            );
      }
    });
  const u = () => {
      e.el.classList.remove(
        ...e.params.navigation.navigationDisabledClass.split(" ")
      ),
        l(),
        n();
    },
    y = () => {
      e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(" ")
      ),
        d();
    };
  Object.assign(e.navigation, {
    enable: u,
    disable: y,
    update: n,
    init: l,
    destroy: d,
  });
}
function K(t) {
  return (
    t === void 0 && (t = ""),
    `.${t
      .trim()
      .replace(/([\.:!+\/])/g, "\\$1")
      .replace(/ /g, ".")}`
  );
}
function us(t) {
  let { swiper: e, extendParams: s, on: i, emit: a } = t;
  const r = "swiper-pagination";
  s({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (h) => h,
      formatFractionTotal: (h) => h,
      bulletClass: `${r}-bullet`,
      bulletActiveClass: `${r}-bullet-active`,
      modifierClass: `${r}-`,
      currentClass: `${r}-current`,
      totalClass: `${r}-total`,
      hiddenClass: `${r}-hidden`,
      progressbarFillClass: `${r}-progressbar-fill`,
      progressbarOppositeClass: `${r}-progressbar-opposite`,
      clickableClass: `${r}-clickable`,
      lockClass: `${r}-lock`,
      horizontalClass: `${r}-horizontal`,
      verticalClass: `${r}-vertical`,
      paginationDisabledClass: `${r}-disabled`,
    },
  }),
    (e.pagination = { el: null, bullets: [] });
  let f,
    o = 0;
  const n = (h) => (Array.isArray(h) || (h = [h].filter((m) => !!m)), h);
  function p() {
    return (
      !e.params.pagination.el ||
      !e.pagination.el ||
      (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
    );
  }
  function c(h, m) {
    const { bulletActiveClass: S } = e.params.pagination;
    h &&
      ((h = h[`${m === "prev" ? "previous" : "next"}ElementSibling`]),
      h &&
        (h.classList.add(`${S}-${m}`),
        (h = h[`${m === "prev" ? "previous" : "next"}ElementSibling`]),
        h && h.classList.add(`${S}-${m}-${m}`)));
  }
  function l(h) {
    const m = h.target.closest(K(e.params.pagination.bulletClass));
    if (!m) return;
    h.preventDefault();
    const S = de(m) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === S) return;
      const C = e.getSlideIndexByData(S),
        I = e.getSlideIndexByData(e.realIndex);
      C > e.slides.length - e.loopedSlides &&
        e.loopFix({
          direction: C > I ? "next" : "prev",
          activeSlideIndex: C,
          slideTo: !1,
        }),
        e.slideToLoop(S);
    } else e.slideTo(S);
  }
  function d() {
    const h = e.rtl,
      m = e.params.pagination;
    if (p()) return;
    let S = e.pagination.el;
    S = n(S);
    let C, I;
    const A =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length,
      D = e.params.loop
        ? Math.ceil(A / e.params.slidesPerGroup)
        : e.snapGrid.length;
    if (
      (e.params.loop
        ? ((I = e.previousRealIndex || 0),
          (C =
            e.params.slidesPerGroup > 1
              ? Math.floor(e.realIndex / e.params.slidesPerGroup)
              : e.realIndex))
        : typeof e.snapIndex < "u"
        ? ((C = e.snapIndex), (I = e.previousSnapIndex))
        : ((I = e.previousIndex || 0), (C = e.activeIndex || 0)),
      m.type === "bullets" &&
        e.pagination.bullets &&
        e.pagination.bullets.length > 0)
    ) {
      const L = e.pagination.bullets;
      let k, P, M;
      if (
        (m.dynamicBullets &&
          ((f = Pe(L[0], e.isHorizontal() ? "width" : "height", !0)),
          S.forEach((E) => {
            E.style[e.isHorizontal() ? "width" : "height"] = `${
              f * (m.dynamicMainBullets + 4)
            }px`;
          }),
          m.dynamicMainBullets > 1 &&
            I !== void 0 &&
            ((o += C - (I || 0)),
            o > m.dynamicMainBullets - 1
              ? (o = m.dynamicMainBullets - 1)
              : o < 0 && (o = 0)),
          (k = Math.max(C - o, 0)),
          (P = k + (Math.min(L.length, m.dynamicMainBullets) - 1)),
          (M = (P + k) / 2)),
        L.forEach((E) => {
          const w = [
            ...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(
              (x) => `${m.bulletActiveClass}${x}`
            ),
          ]
            .map((x) =>
              typeof x == "string" && x.includes(" ") ? x.split(" ") : x
            )
            .flat();
          E.classList.remove(...w);
        }),
        S.length > 1)
      )
        L.forEach((E) => {
          const w = de(E);
          w === C
            ? E.classList.add(...m.bulletActiveClass.split(" "))
            : e.isElement && E.setAttribute("part", "bullet"),
            m.dynamicBullets &&
              (w >= k &&
                w <= P &&
                E.classList.add(...`${m.bulletActiveClass}-main`.split(" ")),
              w === k && c(E, "prev"),
              w === P && c(E, "next"));
        });
      else {
        const E = L[C];
        if (
          (E && E.classList.add(...m.bulletActiveClass.split(" ")),
          e.isElement &&
            L.forEach((w, x) => {
              w.setAttribute("part", x === C ? "bullet-active" : "bullet");
            }),
          m.dynamicBullets)
        ) {
          const w = L[k],
            x = L[P];
          for (let O = k; O <= P; O += 1)
            L[O] &&
              L[O].classList.add(...`${m.bulletActiveClass}-main`.split(" "));
          c(w, "prev"), c(x, "next");
        }
      }
      if (m.dynamicBullets) {
        const E = Math.min(L.length, m.dynamicMainBullets + 4),
          w = (f * E - f) / 2 - M * f,
          x = h ? "right" : "left";
        L.forEach((O) => {
          O.style[e.isHorizontal() ? x : "top"] = `${w}px`;
        });
      }
    }
    S.forEach((L, k) => {
      if (
        (m.type === "fraction" &&
          (L.querySelectorAll(K(m.currentClass)).forEach((P) => {
            P.textContent = m.formatFractionCurrent(C + 1);
          }),
          L.querySelectorAll(K(m.totalClass)).forEach((P) => {
            P.textContent = m.formatFractionTotal(D);
          })),
        m.type === "progressbar")
      ) {
        let P;
        m.progressbarOpposite
          ? (P = e.isHorizontal() ? "vertical" : "horizontal")
          : (P = e.isHorizontal() ? "horizontal" : "vertical");
        const M = (C + 1) / D;
        let E = 1,
          w = 1;
        P === "horizontal" ? (E = M) : (w = M),
          L.querySelectorAll(K(m.progressbarFillClass)).forEach((x) => {
            (x.style.transform = `translate3d(0,0,0) scaleX(${E}) scaleY(${w})`),
              (x.style.transitionDuration = `${e.params.speed}ms`);
          });
      }
      m.type === "custom" && m.renderCustom
        ? ((L.innerHTML = m.renderCustom(e, C + 1, D)),
          k === 0 && a("paginationRender", L))
        : (k === 0 && a("paginationRender", L), a("paginationUpdate", L)),
        e.params.watchOverflow &&
          e.enabled &&
          L.classList[e.isLocked ? "add" : "remove"](m.lockClass);
    });
  }
  function u() {
    const h = e.params.pagination;
    if (p()) return;
    const m =
      e.virtual && e.params.virtual.enabled
        ? e.virtual.slides.length
        : e.slides.length;
    let S = e.pagination.el;
    S = n(S);
    let C = "";
    if (h.type === "bullets") {
      let I = e.params.loop
        ? Math.ceil(m / e.params.slidesPerGroup)
        : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && I > m && (I = m);
      for (let A = 0; A < I; A += 1)
        h.renderBullet
          ? (C += h.renderBullet.call(e, A, h.bulletClass))
          : (C += `<${h.bulletElement} ${
              e.isElement ? 'part="bullet"' : ""
            } class="${h.bulletClass}"></${h.bulletElement}>`);
    }
    h.type === "fraction" &&
      (h.renderFraction
        ? (C = h.renderFraction.call(e, h.currentClass, h.totalClass))
        : (C = `<span class="${h.currentClass}"></span> / <span class="${h.totalClass}"></span>`)),
      h.type === "progressbar" &&
        (h.renderProgressbar
          ? (C = h.renderProgressbar.call(e, h.progressbarFillClass))
          : (C = `<span class="${h.progressbarFillClass}"></span>`)),
      (e.pagination.bullets = []),
      S.forEach((I) => {
        h.type !== "custom" && (I.innerHTML = C || ""),
          h.type === "bullets" &&
            e.pagination.bullets.push(...I.querySelectorAll(K(h.bulletClass)));
      }),
      h.type !== "custom" && a("paginationRender", S[0]);
  }
  function y() {
    e.params.pagination = ze(
      e,
      e.originalParams.pagination,
      e.params.pagination,
      { el: "swiper-pagination" }
    );
    const h = e.params.pagination;
    if (!h.el) return;
    let m;
    typeof h.el == "string" && e.isElement && (m = e.el.querySelector(h.el)),
      !m &&
        typeof h.el == "string" &&
        (m = [...document.querySelectorAll(h.el)]),
      m || (m = h.el),
      !(!m || m.length === 0) &&
        (e.params.uniqueNavElements &&
          typeof h.el == "string" &&
          Array.isArray(m) &&
          m.length > 1 &&
          ((m = [...e.el.querySelectorAll(h.el)]),
          m.length > 1 &&
            (m = m.filter((S) => J(S, ".swiper")[0] === e.el)[0])),
        Array.isArray(m) && m.length === 1 && (m = m[0]),
        Object.assign(e.pagination, { el: m }),
        (m = n(m)),
        m.forEach((S) => {
          h.type === "bullets" &&
            h.clickable &&
            S.classList.add(h.clickableClass),
            S.classList.add(h.modifierClass + h.type),
            S.classList.add(
              e.isHorizontal() ? h.horizontalClass : h.verticalClass
            ),
            h.type === "bullets" &&
              h.dynamicBullets &&
              (S.classList.add(`${h.modifierClass}${h.type}-dynamic`),
              (o = 0),
              h.dynamicMainBullets < 1 && (h.dynamicMainBullets = 1)),
            h.type === "progressbar" &&
              h.progressbarOpposite &&
              S.classList.add(h.progressbarOppositeClass),
            h.clickable && S.addEventListener("click", l),
            e.enabled || S.classList.add(h.lockClass);
        }));
  }
  function g() {
    const h = e.params.pagination;
    if (p()) return;
    let m = e.pagination.el;
    m &&
      ((m = n(m)),
      m.forEach((S) => {
        S.classList.remove(h.hiddenClass),
          S.classList.remove(h.modifierClass + h.type),
          S.classList.remove(
            e.isHorizontal() ? h.horizontalClass : h.verticalClass
          ),
          h.clickable && S.removeEventListener("click", l);
      })),
      e.pagination.bullets &&
        e.pagination.bullets.forEach((S) =>
          S.classList.remove(...h.bulletActiveClass.split(" "))
        );
  }
  i("changeDirection", () => {
    if (!e.pagination || !e.pagination.el) return;
    const h = e.params.pagination;
    let { el: m } = e.pagination;
    (m = n(m)),
      m.forEach((S) => {
        S.classList.remove(h.horizontalClass, h.verticalClass),
          S.classList.add(
            e.isHorizontal() ? h.horizontalClass : h.verticalClass
          );
      });
  }),
    i("init", () => {
      e.params.pagination.enabled === !1 ? b() : (y(), u(), d());
    }),
    i("activeIndexChange", () => {
      typeof e.snapIndex > "u" && d();
    }),
    i("snapIndexChange", () => {
      d();
    }),
    i("snapGridLengthChange", () => {
      u(), d();
    }),
    i("destroy", () => {
      g();
    }),
    i("enable disable", () => {
      let { el: h } = e.pagination;
      h &&
        ((h = n(h)),
        h.forEach((m) =>
          m.classList[e.enabled ? "remove" : "add"](
            e.params.pagination.lockClass
          )
        ));
    }),
    i("lock unlock", () => {
      d();
    }),
    i("click", (h, m) => {
      const S = m.target,
        C = n(e.pagination.el);
      if (
        e.params.pagination.el &&
        e.params.pagination.hideOnClick &&
        C &&
        C.length > 0 &&
        !S.classList.contains(e.params.pagination.bulletClass)
      ) {
        if (
          e.navigation &&
          ((e.navigation.nextEl && S === e.navigation.nextEl) ||
            (e.navigation.prevEl && S === e.navigation.prevEl))
        )
          return;
        const I = C[0].classList.contains(e.params.pagination.hiddenClass);
        a(I === !0 ? "paginationShow" : "paginationHide"),
          C.forEach((A) => A.classList.toggle(e.params.pagination.hiddenClass));
      }
    });
  const v = () => {
      e.el.classList.remove(e.params.pagination.paginationDisabledClass);
      let { el: h } = e.pagination;
      h &&
        ((h = n(h)),
        h.forEach((m) =>
          m.classList.remove(e.params.pagination.paginationDisabledClass)
        )),
        y(),
        u(),
        d();
    },
    b = () => {
      e.el.classList.add(e.params.pagination.paginationDisabledClass);
      let { el: h } = e.pagination;
      h &&
        ((h = n(h)),
        h.forEach((m) =>
          m.classList.add(e.params.pagination.paginationDisabledClass)
        )),
        g();
    };
  Object.assign(e.pagination, {
    enable: v,
    disable: b,
    render: u,
    update: d,
    init: y,
    destroy: g,
  });
}
function ms(t) {
  let { swiper: e, extendParams: s, on: i, emit: a } = t;
  const r = N();
  let f = !1,
    o = null,
    n = null,
    p,
    c,
    l,
    d;
  s({
    scrollbar: {
      el: null,
      dragSize: "auto",
      hide: !1,
      draggable: !1,
      snapOnRelease: !0,
      lockClass: "swiper-scrollbar-lock",
      dragClass: "swiper-scrollbar-drag",
      scrollbarDisabledClass: "swiper-scrollbar-disabled",
      horizontalClass: "swiper-scrollbar-horizontal",
      verticalClass: "swiper-scrollbar-vertical",
    },
  }),
    (e.scrollbar = { el: null, dragEl: null });
  function u() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const { scrollbar: M, rtlTranslate: E } = e,
      { dragEl: w, el: x } = M,
      O = e.params.scrollbar,
      T = e.params.loop ? e.progressLoop : e.progress;
    let $ = c,
      z = (l - c) * T;
    E
      ? ((z = -z), z > 0 ? (($ = c - z), (z = 0)) : -z + c > l && ($ = l + z))
      : z < 0
      ? (($ = c + z), (z = 0))
      : z + c > l && ($ = l - z),
      e.isHorizontal()
        ? ((w.style.transform = `translate3d(${z}px, 0, 0)`),
          (w.style.width = `${$}px`))
        : ((w.style.transform = `translate3d(0px, ${z}px, 0)`),
          (w.style.height = `${$}px`)),
      O.hide &&
        (clearTimeout(o),
        (x.style.opacity = 1),
        (o = setTimeout(() => {
          (x.style.opacity = 0), (x.style.transitionDuration = "400ms");
        }, 1e3)));
  }
  function y(M) {
    !e.params.scrollbar.el ||
      !e.scrollbar.el ||
      (e.scrollbar.dragEl.style.transitionDuration = `${M}ms`);
  }
  function g() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const { scrollbar: M } = e,
      { dragEl: E, el: w } = M;
    (E.style.width = ""),
      (E.style.height = ""),
      (l = e.isHorizontal() ? w.offsetWidth : w.offsetHeight),
      (d =
        e.size /
        (e.virtualSize +
          e.params.slidesOffsetBefore -
          (e.params.centeredSlides ? e.snapGrid[0] : 0))),
      e.params.scrollbar.dragSize === "auto"
        ? (c = l * d)
        : (c = parseInt(e.params.scrollbar.dragSize, 10)),
      e.isHorizontal()
        ? (E.style.width = `${c}px`)
        : (E.style.height = `${c}px`),
      d >= 1 ? (w.style.display = "none") : (w.style.display = ""),
      e.params.scrollbar.hide && (w.style.opacity = 0),
      e.params.watchOverflow &&
        e.enabled &&
        M.el.classList[e.isLocked ? "add" : "remove"](
          e.params.scrollbar.lockClass
        );
  }
  function v(M) {
    return e.isHorizontal() ? M.clientX : M.clientY;
  }
  function b(M) {
    const { scrollbar: E, rtlTranslate: w } = e,
      { el: x } = E;
    let O;
    (O =
      (v(M) -
        me(x)[e.isHorizontal() ? "left" : "top"] -
        (p !== null ? p : c / 2)) /
      (l - c)),
      (O = Math.max(Math.min(O, 1), 0)),
      w && (O = 1 - O);
    const T = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * O;
    e.updateProgress(T),
      e.setTranslate(T),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
  }
  function h(M) {
    const E = e.params.scrollbar,
      { scrollbar: w, wrapperEl: x } = e,
      { el: O, dragEl: T } = w;
    (f = !0),
      (p =
        M.target === T
          ? v(M) -
            M.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"]
          : null),
      M.preventDefault(),
      M.stopPropagation(),
      (x.style.transitionDuration = "100ms"),
      (T.style.transitionDuration = "100ms"),
      b(M),
      clearTimeout(n),
      (O.style.transitionDuration = "0ms"),
      E.hide && (O.style.opacity = 1),
      e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "none"),
      a("scrollbarDragStart", M);
  }
  function m(M) {
    const { scrollbar: E, wrapperEl: w } = e,
      { el: x, dragEl: O } = E;
    f &&
      (M.preventDefault ? M.preventDefault() : (M.returnValue = !1),
      b(M),
      (w.style.transitionDuration = "0ms"),
      (x.style.transitionDuration = "0ms"),
      (O.style.transitionDuration = "0ms"),
      a("scrollbarDragMove", M));
  }
  function S(M) {
    const E = e.params.scrollbar,
      { scrollbar: w, wrapperEl: x } = e,
      { el: O } = w;
    f &&
      ((f = !1),
      e.params.cssMode &&
        ((e.wrapperEl.style["scroll-snap-type"] = ""),
        (x.style.transitionDuration = "")),
      E.hide &&
        (clearTimeout(n),
        (n = ee(() => {
          (O.style.opacity = 0), (O.style.transitionDuration = "400ms");
        }, 1e3))),
      a("scrollbarDragEnd", M),
      E.snapOnRelease && e.slideToClosest());
  }
  function C(M) {
    const { scrollbar: E, params: w } = e,
      x = E.el;
    if (!x) return;
    const O = x,
      T = w.passiveListeners ? { passive: !1, capture: !1 } : !1,
      $ = w.passiveListeners ? { passive: !0, capture: !1 } : !1;
    if (!O) return;
    const z = M === "on" ? "addEventListener" : "removeEventListener";
    O[z]("pointerdown", h, T),
      r[z]("pointermove", m, T),
      r[z]("pointerup", S, $);
  }
  function I() {
    !e.params.scrollbar.el || !e.scrollbar.el || C("on");
  }
  function A() {
    !e.params.scrollbar.el || !e.scrollbar.el || C("off");
  }
  function D() {
    const { scrollbar: M, el: E } = e;
    e.params.scrollbar = ze(e, e.originalParams.scrollbar, e.params.scrollbar, {
      el: "swiper-scrollbar",
    });
    const w = e.params.scrollbar;
    if (!w.el) return;
    let x;
    typeof w.el == "string" && e.isElement && (x = e.el.querySelector(w.el)),
      !x && typeof w.el == "string"
        ? (x = r.querySelectorAll(w.el))
        : x || (x = w.el),
      e.params.uniqueNavElements &&
        typeof w.el == "string" &&
        x.length > 1 &&
        E.querySelectorAll(w.el).length === 1 &&
        (x = E.querySelector(w.el)),
      x.length > 0 && (x = x[0]),
      x.classList.add(e.isHorizontal() ? w.horizontalClass : w.verticalClass);
    let O;
    x &&
      ((O = x.querySelector(`.${e.params.scrollbar.dragClass}`)),
      O || ((O = q("div", e.params.scrollbar.dragClass)), x.append(O))),
      Object.assign(M, { el: x, dragEl: O }),
      w.draggable && I(),
      x &&
        x.classList[e.enabled ? "remove" : "add"](e.params.scrollbar.lockClass);
  }
  function L() {
    const M = e.params.scrollbar,
      E = e.scrollbar.el;
    E &&
      E.classList.remove(
        e.isHorizontal() ? M.horizontalClass : M.verticalClass
      ),
      A();
  }
  i("init", () => {
    e.params.scrollbar.enabled === !1 ? P() : (D(), g(), u());
  }),
    i("update resize observerUpdate lock unlock", () => {
      g();
    }),
    i("setTranslate", () => {
      u();
    }),
    i("setTransition", (M, E) => {
      y(E);
    }),
    i("enable disable", () => {
      const { el: M } = e.scrollbar;
      M &&
        M.classList[e.enabled ? "remove" : "add"](e.params.scrollbar.lockClass);
    }),
    i("destroy", () => {
      L();
    });
  const k = () => {
      e.el.classList.remove(e.params.scrollbar.scrollbarDisabledClass),
        e.scrollbar.el &&
          e.scrollbar.el.classList.remove(
            e.params.scrollbar.scrollbarDisabledClass
          ),
        D(),
        g(),
        u();
    },
    P = () => {
      e.el.classList.add(e.params.scrollbar.scrollbarDisabledClass),
        e.scrollbar.el &&
          e.scrollbar.el.classList.add(
            e.params.scrollbar.scrollbarDisabledClass
          ),
        L();
    };
  Object.assign(e.scrollbar, {
    enable: k,
    disable: P,
    updateSize: g,
    setTranslate: u,
    init: D,
    destroy: L,
  });
}
function hs(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({ parallax: { enabled: !1 } });
  const a = (o, n) => {
      const { rtl: p } = e,
        c = p ? -1 : 1,
        l = o.getAttribute("data-swiper-parallax") || "0";
      let d = o.getAttribute("data-swiper-parallax-x"),
        u = o.getAttribute("data-swiper-parallax-y");
      const y = o.getAttribute("data-swiper-parallax-scale"),
        g = o.getAttribute("data-swiper-parallax-opacity"),
        v = o.getAttribute("data-swiper-parallax-rotate");
      if (
        (d || u
          ? ((d = d || "0"), (u = u || "0"))
          : e.isHorizontal()
          ? ((d = l), (u = "0"))
          : ((u = l), (d = "0")),
        d.indexOf("%") >= 0
          ? (d = `${parseInt(d, 10) * n * c}%`)
          : (d = `${d * n * c}px`),
        u.indexOf("%") >= 0
          ? (u = `${parseInt(u, 10) * n}%`)
          : (u = `${u * n}px`),
        typeof g < "u" && g !== null)
      ) {
        const h = g - (g - 1) * (1 - Math.abs(n));
        o.style.opacity = h;
      }
      let b = `translate3d(${d}, ${u}, 0px)`;
      if (typeof y < "u" && y !== null) {
        const h = y - (y - 1) * (1 - Math.abs(n));
        b += ` scale(${h})`;
      }
      if (v && typeof v < "u" && v !== null) {
        const h = v * n * -1;
        b += ` rotate(${h}deg)`;
      }
      o.style.transform = b;
    },
    r = () => {
      const { el: o, slides: n, progress: p, snapGrid: c } = e;
      R(
        o,
        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
      ).forEach((l) => {
        a(l, p);
      }),
        n.forEach((l, d) => {
          let u = l.progress;
          e.params.slidesPerGroup > 1 &&
            e.params.slidesPerView !== "auto" &&
            (u += Math.ceil(d / 2) - p * (c.length - 1)),
            (u = Math.min(Math.max(u, -1), 1)),
            l
              .querySelectorAll(
                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]"
              )
              .forEach((y) => {
                a(y, u);
              });
        });
    },
    f = function (o) {
      o === void 0 && (o = e.params.speed);
      const { el: n } = e;
      n.querySelectorAll(
        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
      ).forEach((p) => {
        let c =
          parseInt(p.getAttribute("data-swiper-parallax-duration"), 10) || o;
        o === 0 && (c = 0), (p.style.transitionDuration = `${c}ms`);
      });
    };
  i("beforeInit", () => {
    e.params.parallax.enabled &&
      ((e.params.watchSlidesProgress = !0),
      (e.originalParams.watchSlidesProgress = !0));
  }),
    i("init", () => {
      e.params.parallax.enabled && r();
    }),
    i("setTranslate", () => {
      e.params.parallax.enabled && r();
    }),
    i("setTransition", (o, n) => {
      e.params.parallax.enabled && f(n);
    });
}
function gs(t) {
  let { swiper: e, extendParams: s, on: i, emit: a } = t;
  const r = Y();
  s({
    zoom: {
      enabled: !1,
      maxRatio: 3,
      minRatio: 1,
      toggle: !0,
      containerClass: "swiper-zoom-container",
      zoomedSlideClass: "swiper-slide-zoomed",
    },
  }),
    (e.zoom = { enabled: !1 });
  let f = 1,
    o = !1,
    n,
    p;
  const c = [],
    l = {
      originX: 0,
      originY: 0,
      slideEl: void 0,
      slideWidth: void 0,
      slideHeight: void 0,
      imageEl: void 0,
      imageWrapEl: void 0,
      maxRatio: 3,
    },
    d = {
      isTouched: void 0,
      isMoved: void 0,
      currentX: void 0,
      currentY: void 0,
      minX: void 0,
      minY: void 0,
      maxX: void 0,
      maxY: void 0,
      width: void 0,
      height: void 0,
      startX: void 0,
      startY: void 0,
      touchesStart: {},
      touchesCurrent: {},
    },
    u = {
      x: void 0,
      y: void 0,
      prevPositionX: void 0,
      prevPositionY: void 0,
      prevTime: void 0,
    };
  let y = 1;
  Object.defineProperty(e.zoom, "scale", {
    get() {
      return y;
    },
    set(T) {
      if (y !== T) {
        const $ = l.imageEl,
          z = l.slideEl;
        a("zoomChange", T, $, z);
      }
      y = T;
    },
  });
  function g() {
    if (c.length < 2) return 1;
    const T = c[0].pageX,
      $ = c[0].pageY,
      z = c[1].pageX,
      G = c[1].pageY;
    return Math.sqrt((z - T) ** 2 + (G - $) ** 2);
  }
  function v() {
    if (c.length < 2) return { x: null, y: null };
    const T = l.imageEl.getBoundingClientRect();
    return [
      (c[0].pageX + (c[1].pageX - c[0].pageX) / 2 - T.x) / f,
      (c[0].pageY + (c[1].pageY - c[0].pageY) / 2 - T.y) / f,
    ];
  }
  function b() {
    return e.isElement ? "swiper-slide" : `.${e.params.slideClass}`;
  }
  function h(T) {
    const $ = b();
    return !!(
      T.target.matches($) ||
      e.slides.filter((z) => z.contains(T.target)).length > 0
    );
  }
  function m(T) {
    const $ = `.${e.params.zoom.containerClass}`;
    return !!(
      T.target.matches($) ||
      [...e.el.querySelectorAll($)].filter((z) => z.contains(T.target)).length >
        0
    );
  }
  function S(T) {
    if ((T.pointerType === "mouse" && c.splice(0, c.length), !h(T))) return;
    const $ = e.params.zoom;
    if (((n = !1), (p = !1), c.push(T), !(c.length < 2))) {
      if (((n = !0), (l.scaleStart = g()), !l.slideEl)) {
        (l.slideEl = T.target.closest(`.${e.params.slideClass}, swiper-slide`)),
          l.slideEl || (l.slideEl = e.slides[e.activeIndex]);
        let z = l.slideEl.querySelector(`.${$.containerClass}`);
        if (
          (z &&
            (z = z.querySelectorAll(
              "picture, img, svg, canvas, .swiper-zoom-target"
            )[0]),
          (l.imageEl = z),
          z
            ? (l.imageWrapEl = J(l.imageEl, `.${$.containerClass}`)[0])
            : (l.imageWrapEl = void 0),
          !l.imageWrapEl)
        ) {
          l.imageEl = void 0;
          return;
        }
        l.maxRatio =
          l.imageWrapEl.getAttribute("data-swiper-zoom") || $.maxRatio;
      }
      if (l.imageEl) {
        const [z, G] = v();
        (l.originX = z),
          (l.originY = G),
          (l.imageEl.style.transitionDuration = "0ms");
      }
      o = !0;
    }
  }
  function C(T) {
    if (!h(T)) return;
    const $ = e.params.zoom,
      z = e.zoom,
      G = c.findIndex((X) => X.pointerId === T.pointerId);
    G >= 0 && (c[G] = T),
      !(c.length < 2) &&
        ((p = !0),
        (l.scaleMove = g()),
        l.imageEl &&
          ((z.scale = (l.scaleMove / l.scaleStart) * f),
          z.scale > l.maxRatio &&
            (z.scale = l.maxRatio - 1 + (z.scale - l.maxRatio + 1) ** 0.5),
          z.scale < $.minRatio &&
            (z.scale = $.minRatio + 1 - ($.minRatio - z.scale + 1) ** 0.5),
          (l.imageEl.style.transform = `translate3d(0,0,0) scale(${z.scale})`)));
  }
  function I(T) {
    if (!h(T) || (T.pointerType === "mouse" && T.type === "pointerout")) return;
    const $ = e.params.zoom,
      z = e.zoom,
      G = c.findIndex((X) => X.pointerId === T.pointerId);
    G >= 0 && c.splice(G, 1),
      !(!n || !p) &&
        ((n = !1),
        (p = !1),
        l.imageEl &&
          ((z.scale = Math.max(Math.min(z.scale, l.maxRatio), $.minRatio)),
          (l.imageEl.style.transitionDuration = `${e.params.speed}ms`),
          (l.imageEl.style.transform = `translate3d(0,0,0) scale(${z.scale})`),
          (f = z.scale),
          (o = !1),
          z.scale > 1 && l.slideEl
            ? l.slideEl.classList.add(`${$.zoomedSlideClass}`)
            : z.scale <= 1 &&
              l.slideEl &&
              l.slideEl.classList.remove(`${$.zoomedSlideClass}`),
          z.scale === 1 &&
            ((l.originX = 0), (l.originY = 0), (l.slideEl = void 0))));
  }
  function A(T) {
    const $ = e.device;
    if (!l.imageEl || d.isTouched) return;
    $.android && T.cancelable && T.preventDefault(), (d.isTouched = !0);
    const z = c.length > 0 ? c[0] : T;
    (d.touchesStart.x = z.pageX), (d.touchesStart.y = z.pageY);
  }
  function D(T) {
    if (!h(T) || !m(T)) return;
    const $ = e.zoom;
    if (!l.imageEl || !d.isTouched || !l.slideEl) return;
    d.isMoved ||
      ((d.width = l.imageEl.offsetWidth),
      (d.height = l.imageEl.offsetHeight),
      (d.startX = Ce(l.imageWrapEl, "x") || 0),
      (d.startY = Ce(l.imageWrapEl, "y") || 0),
      (l.slideWidth = l.slideEl.offsetWidth),
      (l.slideHeight = l.slideEl.offsetHeight),
      (l.imageWrapEl.style.transitionDuration = "0ms"));
    const z = d.width * $.scale,
      G = d.height * $.scale;
    if (z < l.slideWidth && G < l.slideHeight) return;
    if (
      ((d.minX = Math.min(l.slideWidth / 2 - z / 2, 0)),
      (d.maxX = -d.minX),
      (d.minY = Math.min(l.slideHeight / 2 - G / 2, 0)),
      (d.maxY = -d.minY),
      (d.touchesCurrent.x = c.length > 0 ? c[0].pageX : T.pageX),
      (d.touchesCurrent.y = c.length > 0 ? c[0].pageY : T.pageY),
      Math.max(
        Math.abs(d.touchesCurrent.x - d.touchesStart.x),
        Math.abs(d.touchesCurrent.y - d.touchesStart.y)
      ) > 5 && (e.allowClick = !1),
      !d.isMoved && !o)
    ) {
      if (
        e.isHorizontal() &&
        ((Math.floor(d.minX) === Math.floor(d.startX) &&
          d.touchesCurrent.x < d.touchesStart.x) ||
          (Math.floor(d.maxX) === Math.floor(d.startX) &&
            d.touchesCurrent.x > d.touchesStart.x))
      ) {
        d.isTouched = !1;
        return;
      }
      if (
        !e.isHorizontal() &&
        ((Math.floor(d.minY) === Math.floor(d.startY) &&
          d.touchesCurrent.y < d.touchesStart.y) ||
          (Math.floor(d.maxY) === Math.floor(d.startY) &&
            d.touchesCurrent.y > d.touchesStart.y))
      ) {
        d.isTouched = !1;
        return;
      }
    }
    T.cancelable && T.preventDefault(), T.stopPropagation(), (d.isMoved = !0);
    const V = ($.scale - f) / (l.maxRatio - e.params.zoom.minRatio),
      { originX: H, originY: B } = l;
    (d.currentX =
      d.touchesCurrent.x - d.touchesStart.x + d.startX + V * (d.width - H * 2)),
      (d.currentY =
        d.touchesCurrent.y -
        d.touchesStart.y +
        d.startY +
        V * (d.height - B * 2)),
      d.currentX < d.minX &&
        (d.currentX = d.minX + 1 - (d.minX - d.currentX + 1) ** 0.8),
      d.currentX > d.maxX &&
        (d.currentX = d.maxX - 1 + (d.currentX - d.maxX + 1) ** 0.8),
      d.currentY < d.minY &&
        (d.currentY = d.minY + 1 - (d.minY - d.currentY + 1) ** 0.8),
      d.currentY > d.maxY &&
        (d.currentY = d.maxY - 1 + (d.currentY - d.maxY + 1) ** 0.8),
      u.prevPositionX || (u.prevPositionX = d.touchesCurrent.x),
      u.prevPositionY || (u.prevPositionY = d.touchesCurrent.y),
      u.prevTime || (u.prevTime = Date.now()),
      (u.x =
        (d.touchesCurrent.x - u.prevPositionX) / (Date.now() - u.prevTime) / 2),
      (u.y =
        (d.touchesCurrent.y - u.prevPositionY) / (Date.now() - u.prevTime) / 2),
      Math.abs(d.touchesCurrent.x - u.prevPositionX) < 2 && (u.x = 0),
      Math.abs(d.touchesCurrent.y - u.prevPositionY) < 2 && (u.y = 0),
      (u.prevPositionX = d.touchesCurrent.x),
      (u.prevPositionY = d.touchesCurrent.y),
      (u.prevTime = Date.now()),
      (l.imageWrapEl.style.transform = `translate3d(${d.currentX}px, ${d.currentY}px,0)`);
  }
  function L() {
    const T = e.zoom;
    if (!l.imageEl) return;
    if (!d.isTouched || !d.isMoved) {
      (d.isTouched = !1), (d.isMoved = !1);
      return;
    }
    (d.isTouched = !1), (d.isMoved = !1);
    let $ = 300,
      z = 300;
    const G = u.x * $,
      X = d.currentX + G,
      V = u.y * z,
      H = d.currentY + V;
    u.x !== 0 && ($ = Math.abs((X - d.currentX) / u.x)),
      u.y !== 0 && (z = Math.abs((H - d.currentY) / u.y));
    const B = Math.max($, z);
    (d.currentX = X), (d.currentY = H);
    const j = d.width * T.scale,
      U = d.height * T.scale;
    (d.minX = Math.min(l.slideWidth / 2 - j / 2, 0)),
      (d.maxX = -d.minX),
      (d.minY = Math.min(l.slideHeight / 2 - U / 2, 0)),
      (d.maxY = -d.minY),
      (d.currentX = Math.max(Math.min(d.currentX, d.maxX), d.minX)),
      (d.currentY = Math.max(Math.min(d.currentY, d.maxY), d.minY)),
      (l.imageWrapEl.style.transitionDuration = `${B}ms`),
      (l.imageWrapEl.style.transform = `translate3d(${d.currentX}px, ${d.currentY}px,0)`);
  }
  function k() {
    const T = e.zoom;
    l.slideEl &&
      e.activeIndex !== e.slides.indexOf(l.slideEl) &&
      (l.imageEl && (l.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
      l.imageWrapEl && (l.imageWrapEl.style.transform = "translate3d(0,0,0)"),
      l.slideEl.classList.remove(`${e.params.zoom.zoomedSlideClass}`),
      (T.scale = 1),
      (f = 1),
      (l.slideEl = void 0),
      (l.imageEl = void 0),
      (l.imageWrapEl = void 0),
      (l.originX = 0),
      (l.originY = 0));
  }
  function P(T) {
    const $ = e.zoom,
      z = e.params.zoom;
    if (!l.slideEl) {
      T &&
        T.target &&
        (l.slideEl = T.target.closest(`.${e.params.slideClass}, swiper-slide`)),
        l.slideEl ||
          (e.params.virtual && e.params.virtual.enabled && e.virtual
            ? (l.slideEl = R(e.slidesEl, `.${e.params.slideActiveClass}`)[0])
            : (l.slideEl = e.slides[e.activeIndex]));
      let ae = l.slideEl.querySelector(`.${z.containerClass}`);
      ae &&
        (ae = ae.querySelectorAll(
          "picture, img, svg, canvas, .swiper-zoom-target"
        )[0]),
        (l.imageEl = ae),
        ae
          ? (l.imageWrapEl = J(l.imageEl, `.${z.containerClass}`)[0])
          : (l.imageWrapEl = void 0);
    }
    if (!l.imageEl || !l.imageWrapEl) return;
    e.params.cssMode &&
      ((e.wrapperEl.style.overflow = "hidden"),
      (e.wrapperEl.style.touchAction = "none")),
      l.slideEl.classList.add(`${z.zoomedSlideClass}`);
    let G, X, V, H, B, j, U, Q, Ae, $e, Oe, De, fe, pe, ge, ve, we, ye;
    typeof d.touchesStart.x > "u" && T
      ? ((G = T.pageX), (X = T.pageY))
      : ((G = d.touchesStart.x), (X = d.touchesStart.y));
    const re = typeof T == "number" ? T : null;
    f === 1 && re && ((G = void 0), (X = void 0)),
      ($.scale =
        re || l.imageWrapEl.getAttribute("data-swiper-zoom") || z.maxRatio),
      (f = re || l.imageWrapEl.getAttribute("data-swiper-zoom") || z.maxRatio),
      T && !(f === 1 && re)
        ? ((we = l.slideEl.offsetWidth),
          (ye = l.slideEl.offsetHeight),
          (V = me(l.slideEl).left + r.scrollX),
          (H = me(l.slideEl).top + r.scrollY),
          (B = V + we / 2 - G),
          (j = H + ye / 2 - X),
          (Ae = l.imageEl.offsetWidth),
          ($e = l.imageEl.offsetHeight),
          (Oe = Ae * $.scale),
          (De = $e * $.scale),
          (fe = Math.min(we / 2 - Oe / 2, 0)),
          (pe = Math.min(ye / 2 - De / 2, 0)),
          (ge = -fe),
          (ve = -pe),
          (U = B * $.scale),
          (Q = j * $.scale),
          U < fe && (U = fe),
          U > ge && (U = ge),
          Q < pe && (Q = pe),
          Q > ve && (Q = ve))
        : ((U = 0), (Q = 0)),
      re && $.scale === 1 && ((l.originX = 0), (l.originY = 0)),
      (l.imageWrapEl.style.transitionDuration = "300ms"),
      (l.imageWrapEl.style.transform = `translate3d(${U}px, ${Q}px,0)`),
      (l.imageEl.style.transitionDuration = "300ms"),
      (l.imageEl.style.transform = `translate3d(0,0,0) scale(${$.scale})`);
  }
  function M() {
    const T = e.zoom,
      $ = e.params.zoom;
    if (!l.slideEl) {
      e.params.virtual && e.params.virtual.enabled && e.virtual
        ? (l.slideEl = R(e.slidesEl, `.${e.params.slideActiveClass}`)[0])
        : (l.slideEl = e.slides[e.activeIndex]);
      let z = l.slideEl.querySelector(`.${$.containerClass}`);
      z &&
        (z = z.querySelectorAll(
          "picture, img, svg, canvas, .swiper-zoom-target"
        )[0]),
        (l.imageEl = z),
        z
          ? (l.imageWrapEl = J(l.imageEl, `.${$.containerClass}`)[0])
          : (l.imageWrapEl = void 0);
    }
    !l.imageEl ||
      !l.imageWrapEl ||
      (e.params.cssMode &&
        ((e.wrapperEl.style.overflow = ""),
        (e.wrapperEl.style.touchAction = "")),
      (T.scale = 1),
      (f = 1),
      (l.imageWrapEl.style.transitionDuration = "300ms"),
      (l.imageWrapEl.style.transform = "translate3d(0,0,0)"),
      (l.imageEl.style.transitionDuration = "300ms"),
      (l.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
      l.slideEl.classList.remove(`${$.zoomedSlideClass}`),
      (l.slideEl = void 0),
      (l.originX = 0),
      (l.originY = 0));
  }
  function E(T) {
    const $ = e.zoom;
    $.scale && $.scale !== 1 ? M() : P(T);
  }
  function w() {
    const T = e.params.passiveListeners ? { passive: !0, capture: !1 } : !1,
      $ = e.params.passiveListeners ? { passive: !1, capture: !0 } : !0;
    return { passiveListener: T, activeListenerWithCapture: $ };
  }
  function x() {
    const T = e.zoom;
    if (T.enabled) return;
    T.enabled = !0;
    const { passiveListener: $, activeListenerWithCapture: z } = w();
    e.wrapperEl.addEventListener("pointerdown", S, $),
      e.wrapperEl.addEventListener("pointermove", C, z),
      ["pointerup", "pointercancel", "pointerout"].forEach((G) => {
        e.wrapperEl.addEventListener(G, I, $);
      }),
      e.wrapperEl.addEventListener("pointermove", D, z);
  }
  function O() {
    const T = e.zoom;
    if (!T.enabled) return;
    T.enabled = !1;
    const { passiveListener: $, activeListenerWithCapture: z } = w();
    e.wrapperEl.removeEventListener("pointerdown", S, $),
      e.wrapperEl.removeEventListener("pointermove", C, z),
      ["pointerup", "pointercancel", "pointerout"].forEach((G) => {
        e.wrapperEl.removeEventListener(G, I, $);
      }),
      e.wrapperEl.removeEventListener("pointermove", D, z);
  }
  i("init", () => {
    e.params.zoom.enabled && x();
  }),
    i("destroy", () => {
      O();
    }),
    i("touchStart", (T, $) => {
      e.zoom.enabled && A($);
    }),
    i("touchEnd", (T, $) => {
      e.zoom.enabled && L();
    }),
    i("doubleTap", (T, $) => {
      !e.animating &&
        e.params.zoom.enabled &&
        e.zoom.enabled &&
        e.params.zoom.toggle &&
        E($);
    }),
    i("transitionEnd", () => {
      e.zoom.enabled && e.params.zoom.enabled && k();
    }),
    i("slideChange", () => {
      e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && k();
    }),
    Object.assign(e.zoom, { enable: x, disable: O, in: P, out: M, toggle: E });
}
function vs(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({ controller: { control: void 0, inverse: !1, by: "slide" } }),
    (e.controller = { control: void 0 });
  function a(p, c) {
    const l = (function () {
      let g, v, b;
      return (h, m) => {
        for (v = -1, g = h.length; g - v > 1; )
          (b = (g + v) >> 1), h[b] <= m ? (v = b) : (g = b);
        return g;
      };
    })();
    (this.x = p), (this.y = c), (this.lastIndex = p.length - 1);
    let d, u;
    return (
      (this.interpolate = function (g) {
        return g
          ? ((u = l(this.x, g)),
            (d = u - 1),
            ((g - this.x[d]) * (this.y[u] - this.y[d])) /
              (this.x[u] - this.x[d]) +
              this.y[d])
          : 0;
      }),
      this
    );
  }
  function r(p) {
    e.controller.spline = e.params.loop
      ? new a(e.slidesGrid, p.slidesGrid)
      : new a(e.snapGrid, p.snapGrid);
  }
  function f(p, c) {
    const l = e.controller.control;
    let d, u;
    const y = e.constructor;
    function g(v) {
      if (v.destroyed) return;
      const b = e.rtlTranslate ? -e.translate : e.translate;
      e.params.controller.by === "slide" &&
        (r(v), (u = -e.controller.spline.interpolate(-b))),
        (!u || e.params.controller.by === "container") &&
          ((d =
            (v.maxTranslate() - v.minTranslate()) /
            (e.maxTranslate() - e.minTranslate())),
          (Number.isNaN(d) || !Number.isFinite(d)) && (d = 1),
          (u = (b - e.minTranslate()) * d + v.minTranslate())),
        e.params.controller.inverse && (u = v.maxTranslate() - u),
        v.updateProgress(u),
        v.setTranslate(u, e),
        v.updateActiveIndex(),
        v.updateSlidesClasses();
    }
    if (Array.isArray(l))
      for (let v = 0; v < l.length; v += 1)
        l[v] !== c && l[v] instanceof y && g(l[v]);
    else l instanceof y && c !== l && g(l);
  }
  function o(p, c) {
    const l = e.constructor,
      d = e.controller.control;
    let u;
    function y(g) {
      g.destroyed ||
        (g.setTransition(p, e),
        p !== 0 &&
          (g.transitionStart(),
          g.params.autoHeight &&
            ee(() => {
              g.updateAutoHeight();
            }),
          oe(g.wrapperEl, () => {
            d && g.transitionEnd();
          })));
    }
    if (Array.isArray(d))
      for (u = 0; u < d.length; u += 1)
        d[u] !== c && d[u] instanceof l && y(d[u]);
    else d instanceof l && c !== d && y(d);
  }
  function n() {
    e.controller.control &&
      e.controller.spline &&
      ((e.controller.spline = void 0), delete e.controller.spline);
  }
  i("beforeInit", () => {
    if (
      typeof window < "u" &&
      (typeof e.params.controller.control == "string" ||
        e.params.controller.control instanceof HTMLElement)
    ) {
      const p = document.querySelector(e.params.controller.control);
      if (p && p.swiper) e.controller.control = p.swiper;
      else if (p) {
        const c = (l) => {
          (e.controller.control = l.detail[0]),
            e.update(),
            p.removeEventListener("init", c);
        };
        p.addEventListener("init", c);
      }
      return;
    }
    e.controller.control = e.params.controller.control;
  }),
    i("update", () => {
      n();
    }),
    i("resize", () => {
      n();
    }),
    i("observerUpdate", () => {
      n();
    }),
    i("setTranslate", (p, c, l) => {
      !e.controller.control ||
        e.controller.control.destroyed ||
        e.controller.setTranslate(c, l);
    }),
    i("setTransition", (p, c, l) => {
      !e.controller.control ||
        e.controller.control.destroyed ||
        e.controller.setTransition(c, l);
    }),
    Object.assign(e.controller, { setTranslate: f, setTransition: o });
}
function ws(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({
    a11y: {
      enabled: !0,
      notificationClass: "swiper-notification",
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
      paginationBulletMessage: "Go to slide {{index}}",
      slideLabelMessage: "{{index}} / {{slidesLength}}",
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      itemRoleDescriptionMessage: null,
      slideRole: "group",
      id: null,
    },
  }),
    (e.a11y = { clicked: !1 });
  let a = null;
  function r(w) {
    const x = a;
    x.length !== 0 && ((x.innerHTML = ""), (x.innerHTML = w));
  }
  const f = (w) => (Array.isArray(w) || (w = [w].filter((x) => !!x)), w);
  function o(w) {
    w === void 0 && (w = 16);
    const x = () => Math.round(16 * Math.random()).toString(16);
    return "x".repeat(w).replace(/x/g, x);
  }
  function n(w) {
    (w = f(w)),
      w.forEach((x) => {
        x.setAttribute("tabIndex", "0");
      });
  }
  function p(w) {
    (w = f(w)),
      w.forEach((x) => {
        x.setAttribute("tabIndex", "-1");
      });
  }
  function c(w, x) {
    (w = f(w)),
      w.forEach((O) => {
        O.setAttribute("role", x);
      });
  }
  function l(w, x) {
    (w = f(w)),
      w.forEach((O) => {
        O.setAttribute("aria-roledescription", x);
      });
  }
  function d(w, x) {
    (w = f(w)),
      w.forEach((O) => {
        O.setAttribute("aria-controls", x);
      });
  }
  function u(w, x) {
    (w = f(w)),
      w.forEach((O) => {
        O.setAttribute("aria-label", x);
      });
  }
  function y(w, x) {
    (w = f(w)),
      w.forEach((O) => {
        O.setAttribute("id", x);
      });
  }
  function g(w, x) {
    (w = f(w)),
      w.forEach((O) => {
        O.setAttribute("aria-live", x);
      });
  }
  function v(w) {
    (w = f(w)),
      w.forEach((x) => {
        x.setAttribute("aria-disabled", !0);
      });
  }
  function b(w) {
    (w = f(w)),
      w.forEach((x) => {
        x.setAttribute("aria-disabled", !1);
      });
  }
  function h(w) {
    if (w.keyCode !== 13 && w.keyCode !== 32) return;
    const x = e.params.a11y,
      O = w.target;
    (e.pagination &&
      e.pagination.el &&
      (O === e.pagination.el || e.pagination.el.contains(w.target)) &&
      !w.target.matches(K(e.params.pagination.bulletClass))) ||
      (e.navigation &&
        e.navigation.nextEl &&
        O === e.navigation.nextEl &&
        ((e.isEnd && !e.params.loop) || e.slideNext(),
        e.isEnd ? r(x.lastSlideMessage) : r(x.nextSlideMessage)),
      e.navigation &&
        e.navigation.prevEl &&
        O === e.navigation.prevEl &&
        ((e.isBeginning && !e.params.loop) || e.slidePrev(),
        e.isBeginning ? r(x.firstSlideMessage) : r(x.prevSlideMessage)),
      e.pagination &&
        O.matches(K(e.params.pagination.bulletClass)) &&
        O.click());
  }
  function m() {
    if (e.params.loop || e.params.rewind || !e.navigation) return;
    const { nextEl: w, prevEl: x } = e.navigation;
    x && (e.isBeginning ? (v(x), p(x)) : (b(x), n(x))),
      w && (e.isEnd ? (v(w), p(w)) : (b(w), n(w)));
  }
  function S() {
    return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
  }
  function C() {
    return S() && e.params.pagination.clickable;
  }
  function I() {
    const w = e.params.a11y;
    S() &&
      e.pagination.bullets.forEach((x) => {
        e.params.pagination.clickable &&
          (n(x),
          e.params.pagination.renderBullet ||
            (c(x, "button"),
            u(
              x,
              w.paginationBulletMessage.replace(/\{\{index\}\}/, de(x) + 1)
            ))),
          x.matches(K(e.params.pagination.bulletActiveClass))
            ? x.setAttribute("aria-current", "true")
            : x.removeAttribute("aria-current");
      });
  }
  const A = (w, x, O) => {
      n(w),
        w.tagName !== "BUTTON" &&
          (c(w, "button"), w.addEventListener("keydown", h)),
        u(w, O),
        d(w, x);
    },
    D = () => {
      e.a11y.clicked = !0;
    },
    L = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          e.destroyed || (e.a11y.clicked = !1);
        });
      });
    },
    k = (w) => {
      if (e.a11y.clicked) return;
      const x = w.target.closest(`.${e.params.slideClass}, swiper-slide`);
      if (!x || !e.slides.includes(x)) return;
      const O = e.slides.indexOf(x) === e.activeIndex,
        T =
          e.params.watchSlidesProgress &&
          e.visibleSlides &&
          e.visibleSlides.includes(x);
      O ||
        T ||
        (w.sourceCapabilities && w.sourceCapabilities.firesTouchEvents) ||
        (e.isHorizontal() ? (e.el.scrollLeft = 0) : (e.el.scrollTop = 0),
        e.slideTo(e.slides.indexOf(x), 0));
    },
    P = () => {
      const w = e.params.a11y;
      w.itemRoleDescriptionMessage && l(e.slides, w.itemRoleDescriptionMessage),
        w.slideRole && c(e.slides, w.slideRole);
      const x = e.slides.length;
      w.slideLabelMessage &&
        e.slides.forEach((O, T) => {
          const $ = e.params.loop
              ? parseInt(O.getAttribute("data-swiper-slide-index"), 10)
              : T,
            z = w.slideLabelMessage
              .replace(/\{\{index\}\}/, $ + 1)
              .replace(/\{\{slidesLength\}\}/, x);
          u(O, z);
        });
    },
    M = () => {
      const w = e.params.a11y;
      e.el.append(a);
      const x = e.el;
      w.containerRoleDescriptionMessage &&
        l(x, w.containerRoleDescriptionMessage),
        w.containerMessage && u(x, w.containerMessage);
      const O = e.wrapperEl,
        T = w.id || O.getAttribute("id") || `swiper-wrapper-${o(16)}`,
        $ = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
      y(O, T), g(O, $), P();
      let { nextEl: z, prevEl: G } = e.navigation ? e.navigation : {};
      (z = f(z)),
        (G = f(G)),
        z && z.forEach((X) => A(X, T, w.nextSlideMessage)),
        G && G.forEach((X) => A(X, T, w.prevSlideMessage)),
        C() &&
          (Array.isArray(e.pagination.el)
            ? e.pagination.el
            : [e.pagination.el]
          ).forEach((V) => {
            V.addEventListener("keydown", h);
          }),
        e.el.addEventListener("focus", k, !0),
        e.el.addEventListener("pointerdown", D, !0),
        e.el.addEventListener("pointerup", L, !0);
    };
  function E() {
    a && a.remove();
    let { nextEl: w, prevEl: x } = e.navigation ? e.navigation : {};
    (w = f(w)),
      (x = f(x)),
      w && w.forEach((O) => O.removeEventListener("keydown", h)),
      x && x.forEach((O) => O.removeEventListener("keydown", h)),
      C() &&
        (Array.isArray(e.pagination.el)
          ? e.pagination.el
          : [e.pagination.el]
        ).forEach((T) => {
          T.removeEventListener("keydown", h);
        }),
      e.el.removeEventListener("focus", k, !0),
      e.el.removeEventListener("pointerdown", D, !0),
      e.el.removeEventListener("pointerup", L, !0);
  }
  i("beforeInit", () => {
    (a = q("span", e.params.a11y.notificationClass)),
      a.setAttribute("aria-live", "assertive"),
      a.setAttribute("aria-atomic", "true");
  }),
    i("afterInit", () => {
      e.params.a11y.enabled && M();
    }),
    i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
      e.params.a11y.enabled && P();
    }),
    i("fromEdge toEdge afterInit lock unlock", () => {
      e.params.a11y.enabled && m();
    }),
    i("paginationUpdate", () => {
      e.params.a11y.enabled && I();
    }),
    i("destroy", () => {
      e.params.a11y.enabled && E();
    });
}
function ys(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({
    history: {
      enabled: !1,
      root: "",
      replaceState: !1,
      key: "slides",
      keepQuery: !1,
    },
  });
  let a = !1,
    r = {};
  const f = (u) =>
      u
        .toString()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, ""),
    o = (u) => {
      const y = Y();
      let g;
      u ? (g = new URL(u)) : (g = y.location);
      const v = g.pathname
          .slice(1)
          .split("/")
          .filter((S) => S !== ""),
        b = v.length,
        h = v[b - 2],
        m = v[b - 1];
      return { key: h, value: m };
    },
    n = (u, y) => {
      const g = Y();
      if (!a || !e.params.history.enabled) return;
      let v;
      e.params.url ? (v = new URL(e.params.url)) : (v = g.location);
      const b = e.slides[y];
      let h = f(b.getAttribute("data-history"));
      if (e.params.history.root.length > 0) {
        let S = e.params.history.root;
        S[S.length - 1] === "/" && (S = S.slice(0, S.length - 1)),
          (h = `${S}/${u ? `${u}/` : ""}${h}`);
      } else v.pathname.includes(u) || (h = `${u ? `${u}/` : ""}${h}`);
      e.params.history.keepQuery && (h += v.search);
      const m = g.history.state;
      (m && m.value === h) ||
        (e.params.history.replaceState
          ? g.history.replaceState({ value: h }, null, h)
          : g.history.pushState({ value: h }, null, h));
    },
    p = (u, y, g) => {
      if (y)
        for (let v = 0, b = e.slides.length; v < b; v += 1) {
          const h = e.slides[v];
          if (f(h.getAttribute("data-history")) === y) {
            const S = e.getSlideIndex(h);
            e.slideTo(S, u, g);
          }
        }
      else e.slideTo(0, u, g);
    },
    c = () => {
      (r = o(e.params.url)), p(e.params.speed, r.value, !1);
    },
    l = () => {
      const u = Y();
      if (e.params.history) {
        if (!u.history || !u.history.pushState) {
          (e.params.history.enabled = !1),
            (e.params.hashNavigation.enabled = !0);
          return;
        }
        if (((a = !0), (r = o(e.params.url)), !r.key && !r.value)) {
          e.params.history.replaceState || u.addEventListener("popstate", c);
          return;
        }
        p(0, r.value, e.params.runCallbacksOnInit),
          e.params.history.replaceState || u.addEventListener("popstate", c);
      }
    },
    d = () => {
      const u = Y();
      e.params.history.replaceState || u.removeEventListener("popstate", c);
    };
  i("init", () => {
    e.params.history.enabled && l();
  }),
    i("destroy", () => {
      e.params.history.enabled && d();
    }),
    i("transitionEnd _freeModeNoMomentumRelease", () => {
      a && n(e.params.history.key, e.activeIndex);
    }),
    i("slideChange", () => {
      a && e.params.cssMode && n(e.params.history.key, e.activeIndex);
    });
}
function bs(t) {
  let { swiper: e, extendParams: s, emit: i, on: a } = t,
    r = !1;
  const f = N(),
    o = Y();
  s({
    hashNavigation: {
      enabled: !1,
      replaceState: !1,
      watchState: !1,
      getSlideIndex(d, u) {
        if (e.virtual && e.params.virtual.enabled) {
          const y = e.slides.filter(
            (v) => v.getAttribute("data-hash") === u
          )[0];
          return y
            ? parseInt(y.getAttribute("data-swiper-slide-index"), 10)
            : 0;
        }
        return e.getSlideIndex(
          R(
            e.slidesEl,
            `.${e.params.slideClass}[data-hash="${u}"], swiper-slide[data-hash="${u}"]`
          )[0]
        );
      },
    },
  });
  const n = () => {
      i("hashChange");
      const d = f.location.hash.replace("#", ""),
        u =
          e.virtual && e.params.virtual.enabled
            ? e.slidesEl.querySelector(
                `[data-swiper-slide-index="${e.activeIndex}"]`
              )
            : e.slides[e.activeIndex],
        y = u ? u.getAttribute("data-hash") : "";
      if (d !== y) {
        const g = e.params.hashNavigation.getSlideIndex(e, d);
        if (typeof g > "u" || Number.isNaN(g)) return;
        e.slideTo(g);
      }
    },
    p = () => {
      if (!r || !e.params.hashNavigation.enabled) return;
      const d =
          e.virtual && e.params.virtual.enabled
            ? e.slidesEl.querySelector(
                `[data-swiper-slide-index="${e.activeIndex}"]`
              )
            : e.slides[e.activeIndex],
        u = d
          ? d.getAttribute("data-hash") || d.getAttribute("data-history")
          : "";
      e.params.hashNavigation.replaceState &&
      o.history &&
      o.history.replaceState
        ? (o.history.replaceState(null, null, `#${u}` || ""), i("hashSet"))
        : ((f.location.hash = u || ""), i("hashSet"));
    },
    c = () => {
      if (
        !e.params.hashNavigation.enabled ||
        (e.params.history && e.params.history.enabled)
      )
        return;
      r = !0;
      const d = f.location.hash.replace("#", "");
      if (d) {
        const y = e.params.hashNavigation.getSlideIndex(e, d);
        e.slideTo(y || 0, 0, e.params.runCallbacksOnInit, !0);
      }
      e.params.hashNavigation.watchState && o.addEventListener("hashchange", n);
    },
    l = () => {
      e.params.hashNavigation.watchState &&
        o.removeEventListener("hashchange", n);
    };
  a("init", () => {
    e.params.hashNavigation.enabled && c();
  }),
    a("destroy", () => {
      e.params.hashNavigation.enabled && l();
    }),
    a("transitionEnd _freeModeNoMomentumRelease", () => {
      r && p();
    }),
    a("slideChange", () => {
      r && e.params.cssMode && p();
    });
}
function Ss(t) {
  let { swiper: e, extendParams: s, on: i, emit: a, params: r } = t;
  (e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    s({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !0,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1,
      },
    });
  let f,
    o,
    n = r && r.autoplay ? r.autoplay.delay : 3e3,
    p = r && r.autoplay ? r.autoplay.delay : 3e3,
    c,
    l = new Date().getTime,
    d,
    u,
    y,
    g,
    v,
    b;
  function h(T) {
    !e ||
      e.destroyed ||
      !e.wrapperEl ||
      (T.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener("transitionend", h), L()));
  }
  const m = () => {
      if (e.destroyed || !e.autoplay.running) return;
      e.autoplay.paused ? (d = !0) : d && ((p = c), (d = !1));
      const T = e.autoplay.paused ? c : l + p - new Date().getTime();
      (e.autoplay.timeLeft = T),
        a("autoplayTimeLeft", T, T / n),
        (o = requestAnimationFrame(() => {
          m();
        }));
    },
    S = () => {
      let T;
      return (
        e.virtual && e.params.virtual.enabled
          ? (T = e.slides.filter((z) =>
              z.classList.contains("swiper-slide-active")
            )[0])
          : (T = e.slides[e.activeIndex]),
        T ? parseInt(T.getAttribute("data-swiper-autoplay"), 10) : void 0
      );
    },
    C = (T) => {
      if (e.destroyed || !e.autoplay.running) return;
      cancelAnimationFrame(o), m();
      let $ = typeof T > "u" ? e.params.autoplay.delay : T;
      (n = e.params.autoplay.delay), (p = e.params.autoplay.delay);
      const z = S();
      !Number.isNaN(z) &&
        z > 0 &&
        typeof T > "u" &&
        (($ = z), (n = z), (p = z)),
        (c = $);
      const G = e.params.speed,
        X = () => {
          !e ||
            e.destroyed ||
            (e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(G, !0, !0), a("autoplay"))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, G, !0, !0), a("autoplay"))
              : !e.isEnd || e.params.loop || e.params.rewind
              ? (e.slideNext(G, !0, !0), a("autoplay"))
              : e.params.autoplay.stopOnLastSlide ||
                (e.slideTo(0, G, !0, !0), a("autoplay")),
            e.params.cssMode &&
              ((l = new Date().getTime()),
              requestAnimationFrame(() => {
                C();
              })));
        };
      return (
        $ > 0
          ? (clearTimeout(f),
            (f = setTimeout(() => {
              X();
            }, $)))
          : requestAnimationFrame(() => {
              X();
            }),
        $
      );
    },
    I = () => {
      (e.autoplay.running = !0), C(), a("autoplayStart");
    },
    A = () => {
      (e.autoplay.running = !1),
        clearTimeout(f),
        cancelAnimationFrame(o),
        a("autoplayStop");
    },
    D = (T, $) => {
      if (e.destroyed || !e.autoplay.running) return;
      clearTimeout(f), T || (b = !0);
      const z = () => {
        a("autoplayPause"),
          e.params.autoplay.waitForTransition
            ? e.wrapperEl.addEventListener("transitionend", h)
            : L();
      };
      if (((e.autoplay.paused = !0), $)) {
        v && (c = e.params.autoplay.delay), (v = !1), z();
        return;
      }
      (c = (c || e.params.autoplay.delay) - (new Date().getTime() - l)),
        !(e.isEnd && c < 0 && !e.params.loop) && (c < 0 && (c = 0), z());
    },
    L = () => {
      (e.isEnd && c < 0 && !e.params.loop) ||
        e.destroyed ||
        !e.autoplay.running ||
        ((l = new Date().getTime()),
        b ? ((b = !1), C(c)) : C(),
        (e.autoplay.paused = !1),
        a("autoplayResume"));
    },
    k = () => {
      if (e.destroyed || !e.autoplay.running) return;
      const T = N();
      T.visibilityState === "hidden" && ((b = !0), D(!0)),
        T.visibilityState === "visible" && L();
    },
    P = (T) => {
      T.pointerType === "mouse" && ((b = !0), D(!0));
    },
    M = (T) => {
      T.pointerType === "mouse" && e.autoplay.paused && L();
    },
    E = () => {
      e.params.autoplay.pauseOnMouseEnter &&
        (e.el.addEventListener("pointerenter", P),
        e.el.addEventListener("pointerleave", M));
    },
    w = () => {
      e.el.removeEventListener("pointerenter", P),
        e.el.removeEventListener("pointerleave", M);
    },
    x = () => {
      N().addEventListener("visibilitychange", k);
    },
    O = () => {
      N().removeEventListener("visibilitychange", k);
    };
  i("init", () => {
    e.params.autoplay.enabled && (E(), x(), (l = new Date().getTime()), I());
  }),
    i("destroy", () => {
      w(), O(), e.autoplay.running && A();
    }),
    i("beforeTransitionStart", (T, $, z) => {
      e.destroyed ||
        !e.autoplay.running ||
        (z || !e.params.autoplay.disableOnInteraction ? D(!0, !0) : A());
    }),
    i("sliderFirstMove", () => {
      if (!(e.destroyed || !e.autoplay.running)) {
        if (e.params.autoplay.disableOnInteraction) {
          A();
          return;
        }
        (u = !0),
          (y = !1),
          (b = !1),
          (g = setTimeout(() => {
            (b = !0), (y = !0), D(!0);
          }, 200));
      }
    }),
    i("touchEnd", () => {
      if (!(e.destroyed || !e.autoplay.running || !u)) {
        if (
          (clearTimeout(g),
          clearTimeout(f),
          e.params.autoplay.disableOnInteraction)
        ) {
          (y = !1), (u = !1);
          return;
        }
        y && e.params.cssMode && L(), (y = !1), (u = !1);
      }
    }),
    i("slideChange", () => {
      e.destroyed || !e.autoplay.running || (v = !0);
    }),
    Object.assign(e.autoplay, { start: I, stop: A, pause: D, resume: L });
}
function xs(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: !0,
      autoScrollOffset: 0,
      slideThumbActiveClass: "swiper-slide-thumb-active",
      thumbsContainerClass: "swiper-thumbs",
    },
  });
  let a = !1,
    r = !1;
  e.thumbs = { swiper: null };
  function f() {
    const p = e.thumbs.swiper;
    if (!p || p.destroyed) return;
    const c = p.clickedIndex,
      l = p.clickedSlide;
    if (
      (l && l.classList.contains(e.params.thumbs.slideThumbActiveClass)) ||
      typeof c > "u" ||
      c === null
    )
      return;
    let d;
    p.params.loop
      ? (d = parseInt(
          p.clickedSlide.getAttribute("data-swiper-slide-index"),
          10
        ))
      : (d = c),
      e.params.loop ? e.slideToLoop(d) : e.slideTo(d);
  }
  function o() {
    const { thumbs: p } = e.params;
    if (a) return !1;
    a = !0;
    const c = e.constructor;
    if (p.swiper instanceof c)
      (e.thumbs.swiper = p.swiper),
        Object.assign(e.thumbs.swiper.originalParams, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1,
        }),
        Object.assign(e.thumbs.swiper.params, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1,
        }),
        e.thumbs.swiper.update();
    else if (ne(p.swiper)) {
      const l = Object.assign({}, p.swiper);
      Object.assign(l, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
        (e.thumbs.swiper = new c(l)),
        (r = !0);
    }
    return (
      e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass),
      e.thumbs.swiper.on("tap", f),
      !0
    );
  }
  function n(p) {
    const c = e.thumbs.swiper;
    if (!c || c.destroyed) return;
    const l =
      c.params.slidesPerView === "auto"
        ? c.slidesPerViewDynamic()
        : c.params.slidesPerView;
    let d = 1;
    const u = e.params.thumbs.slideThumbActiveClass;
    if (
      (e.params.slidesPerView > 1 &&
        !e.params.centeredSlides &&
        (d = e.params.slidesPerView),
      e.params.thumbs.multipleActiveThumbs || (d = 1),
      (d = Math.floor(d)),
      c.slides.forEach((v) => v.classList.remove(u)),
      c.params.loop || (c.params.virtual && c.params.virtual.enabled))
    )
      for (let v = 0; v < d; v += 1)
        R(c.slidesEl, `[data-swiper-slide-index="${e.realIndex + v}"]`).forEach(
          (b) => {
            b.classList.add(u);
          }
        );
    else
      for (let v = 0; v < d; v += 1)
        c.slides[e.realIndex + v] && c.slides[e.realIndex + v].classList.add(u);
    const y = e.params.thumbs.autoScrollOffset,
      g = y && !c.params.loop;
    if (e.realIndex !== c.realIndex || g) {
      const v = c.activeIndex;
      let b, h;
      if (c.params.loop) {
        const m = c.slides.filter(
          (S) => S.getAttribute("data-swiper-slide-index") === `${e.realIndex}`
        )[0];
        (b = c.slides.indexOf(m)),
          (h = e.activeIndex > e.previousIndex ? "next" : "prev");
      } else (b = e.realIndex), (h = b > e.previousIndex ? "next" : "prev");
      g && (b += h === "next" ? y : -1 * y),
        c.visibleSlidesIndexes &&
          c.visibleSlidesIndexes.indexOf(b) < 0 &&
          (c.params.centeredSlides
            ? b > v
              ? (b = b - Math.floor(l / 2) + 1)
              : (b = b + Math.floor(l / 2) - 1)
            : b > v && c.params.slidesPerGroup,
          c.slideTo(b, p ? 0 : void 0));
    }
  }
  i("beforeInit", () => {
    const { thumbs: p } = e.params;
    if (!(!p || !p.swiper))
      if (typeof p.swiper == "string" || p.swiper instanceof HTMLElement) {
        const c = N(),
          l = () => {
            const u =
              typeof p.swiper == "string"
                ? c.querySelector(p.swiper)
                : p.swiper;
            if (u && u.swiper) (p.swiper = u.swiper), o(), n(!0);
            else if (u) {
              const y = (g) => {
                (p.swiper = g.detail[0]),
                  u.removeEventListener("init", y),
                  o(),
                  n(!0),
                  p.swiper.update(),
                  e.update();
              };
              u.addEventListener("init", y);
            }
            return u;
          },
          d = () => {
            if (e.destroyed) return;
            l() || requestAnimationFrame(d);
          };
        requestAnimationFrame(d);
      } else o(), n(!0);
  }),
    i("slideChange update resize observerUpdate", () => {
      n();
    }),
    i("setTransition", (p, c) => {
      const l = e.thumbs.swiper;
      !l || l.destroyed || l.setTransition(c);
    }),
    i("beforeDestroy", () => {
      const p = e.thumbs.swiper;
      !p || p.destroyed || (r && p.destroy());
    }),
    Object.assign(e.thumbs, { init: o, update: n });
}
function Es(t) {
  let { swiper: e, extendParams: s, emit: i, once: a } = t;
  s({
    freeMode: {
      enabled: !1,
      momentum: !0,
      momentumRatio: 1,
      momentumBounce: !0,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: !1,
      minimumVelocity: 0.02,
    },
  });
  function r() {
    if (e.params.cssMode) return;
    const n = e.getTranslate();
    e.setTranslate(n),
      e.setTransition(0),
      (e.touchEventsData.velocities.length = 0),
      e.freeMode.onTouchEnd({ currentPos: e.rtl ? e.translate : -e.translate });
  }
  function f() {
    if (e.params.cssMode) return;
    const { touchEventsData: n, touches: p } = e;
    n.velocities.length === 0 &&
      n.velocities.push({
        position: p[e.isHorizontal() ? "startX" : "startY"],
        time: n.touchStartTime,
      }),
      n.velocities.push({
        position: p[e.isHorizontal() ? "currentX" : "currentY"],
        time: _(),
      });
  }
  function o(n) {
    let { currentPos: p } = n;
    if (e.params.cssMode) return;
    const {
        params: c,
        wrapperEl: l,
        rtlTranslate: d,
        snapGrid: u,
        touchEventsData: y,
      } = e,
      v = _() - y.touchStartTime;
    if (p < -e.minTranslate()) {
      e.slideTo(e.activeIndex);
      return;
    }
    if (p > -e.maxTranslate()) {
      e.slides.length < u.length
        ? e.slideTo(u.length - 1)
        : e.slideTo(e.slides.length - 1);
      return;
    }
    if (c.freeMode.momentum) {
      if (y.velocities.length > 1) {
        const D = y.velocities.pop(),
          L = y.velocities.pop(),
          k = D.position - L.position,
          P = D.time - L.time;
        (e.velocity = k / P),
          (e.velocity /= 2),
          Math.abs(e.velocity) < c.freeMode.minimumVelocity && (e.velocity = 0),
          (P > 150 || _() - D.time > 300) && (e.velocity = 0);
      } else e.velocity = 0;
      (e.velocity *= c.freeMode.momentumVelocityRatio),
        (y.velocities.length = 0);
      let b = 1e3 * c.freeMode.momentumRatio;
      const h = e.velocity * b;
      let m = e.translate + h;
      d && (m = -m);
      let S = !1,
        C;
      const I = Math.abs(e.velocity) * 20 * c.freeMode.momentumBounceRatio;
      let A;
      if (m < e.maxTranslate())
        c.freeMode.momentumBounce
          ? (m + e.maxTranslate() < -I && (m = e.maxTranslate() - I),
            (C = e.maxTranslate()),
            (S = !0),
            (y.allowMomentumBounce = !0))
          : (m = e.maxTranslate()),
          c.loop && c.centeredSlides && (A = !0);
      else if (m > e.minTranslate())
        c.freeMode.momentumBounce
          ? (m - e.minTranslate() > I && (m = e.minTranslate() + I),
            (C = e.minTranslate()),
            (S = !0),
            (y.allowMomentumBounce = !0))
          : (m = e.minTranslate()),
          c.loop && c.centeredSlides && (A = !0);
      else if (c.freeMode.sticky) {
        let D;
        for (let L = 0; L < u.length; L += 1)
          if (u[L] > -m) {
            D = L;
            break;
          }
        Math.abs(u[D] - m) < Math.abs(u[D - 1] - m) ||
        e.swipeDirection === "next"
          ? (m = u[D])
          : (m = u[D - 1]),
          (m = -m);
      }
      if (
        (A &&
          a("transitionEnd", () => {
            e.loopFix();
          }),
        e.velocity !== 0)
      ) {
        if (
          (d
            ? (b = Math.abs((-m - e.translate) / e.velocity))
            : (b = Math.abs((m - e.translate) / e.velocity)),
          c.freeMode.sticky)
        ) {
          const D = Math.abs((d ? -m : m) - e.translate),
            L = e.slidesSizesGrid[e.activeIndex];
          D < L
            ? (b = c.speed)
            : D < 2 * L
            ? (b = c.speed * 1.5)
            : (b = c.speed * 2.5);
        }
      } else if (c.freeMode.sticky) {
        e.slideToClosest();
        return;
      }
      c.freeMode.momentumBounce && S
        ? (e.updateProgress(C),
          e.setTransition(b),
          e.setTranslate(m),
          e.transitionStart(!0, e.swipeDirection),
          (e.animating = !0),
          oe(l, () => {
            !e ||
              e.destroyed ||
              !y.allowMomentumBounce ||
              (i("momentumBounce"),
              e.setTransition(c.speed),
              setTimeout(() => {
                e.setTranslate(C),
                  oe(l, () => {
                    !e || e.destroyed || e.transitionEnd();
                  });
              }, 0));
          }))
        : e.velocity
        ? (i("_freeModeNoMomentumRelease"),
          e.updateProgress(m),
          e.setTransition(b),
          e.setTranslate(m),
          e.transitionStart(!0, e.swipeDirection),
          e.animating ||
            ((e.animating = !0),
            oe(l, () => {
              !e || e.destroyed || e.transitionEnd();
            })))
        : e.updateProgress(m),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    } else if (c.freeMode.sticky) {
      e.slideToClosest();
      return;
    } else c.freeMode && i("_freeModeNoMomentumRelease");
    (!c.freeMode.momentum || v >= c.longSwipesMs) &&
      (e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses());
  }
  Object.assign(e, {
    freeMode: { onTouchStart: r, onTouchMove: f, onTouchEnd: o },
  });
}
function Ts(t) {
  let { swiper: e, extendParams: s } = t;
  s({ grid: { rows: 1, fill: "column" } });
  let i, a, r;
  const f = () => {
      let c = e.params.spaceBetween;
      return (
        typeof c == "string" && c.indexOf("%") >= 0
          ? (c = (parseFloat(c.replace("%", "")) / 100) * e.size)
          : typeof c == "string" && (c = parseFloat(c)),
        c
      );
    },
    o = (c) => {
      const { slidesPerView: l } = e.params,
        { rows: d, fill: u } = e.params.grid;
      (r = Math.floor(c / d)),
        Math.floor(c / d) === c / d ? (i = c) : (i = Math.ceil(c / d) * d),
        l !== "auto" && u === "row" && (i = Math.max(i, l * d)),
        (a = i / d);
    },
    n = (c, l, d, u) => {
      const { slidesPerGroup: y } = e.params,
        g = f(),
        { rows: v, fill: b } = e.params.grid;
      let h, m, S;
      if (b === "row" && y > 1) {
        const C = Math.floor(c / (y * v)),
          I = c - v * y * C,
          A = C === 0 ? y : Math.min(Math.ceil((d - C * v * y) / v), y);
        (S = Math.floor(I / A)),
          (m = I - S * A + C * y),
          (h = m + (S * i) / v),
          (l.style.order = h);
      } else
        b === "column"
          ? ((m = Math.floor(c / v)),
            (S = c - m * v),
            (m > r || (m === r && S === v - 1)) &&
              ((S += 1), S >= v && ((S = 0), (m += 1))))
          : ((S = Math.floor(c / a)), (m = c - S * a));
      (l.row = S),
        (l.column = m),
        (l.style[u("margin-top")] = S !== 0 ? g && `${g}px` : "");
    },
    p = (c, l, d) => {
      const { centeredSlides: u, roundLengths: y } = e.params,
        g = f(),
        { rows: v } = e.params.grid;
      if (
        ((e.virtualSize = (c + g) * i),
        (e.virtualSize = Math.ceil(e.virtualSize / v) - g),
        (e.wrapperEl.style[d("width")] = `${e.virtualSize + g}px`),
        u)
      ) {
        const b = [];
        for (let h = 0; h < l.length; h += 1) {
          let m = l[h];
          y && (m = Math.floor(m)), l[h] < e.virtualSize + l[0] && b.push(m);
        }
        l.splice(0, l.length), l.push(...b);
      }
    };
  e.grid = { initSlides: o, updateSlide: n, updateWrapperSize: p };
}
function Ms(t) {
  const e = this,
    { params: s, slidesEl: i } = e;
  s.loop && e.loopDestroy();
  const a = (r) => {
    if (typeof r == "string") {
      const f = document.createElement("div");
      (f.innerHTML = r), i.append(f.children[0]), (f.innerHTML = "");
    } else i.append(r);
  };
  if (typeof t == "object" && "length" in t)
    for (let r = 0; r < t.length; r += 1) t[r] && a(t[r]);
  else a(t);
  e.recalcSlides(),
    s.loop && e.loopCreate(),
    (!s.observer || e.isElement) && e.update();
}
function Cs(t) {
  const e = this,
    { params: s, activeIndex: i, slidesEl: a } = e;
  s.loop && e.loopDestroy();
  let r = i + 1;
  const f = (o) => {
    if (typeof o == "string") {
      const n = document.createElement("div");
      (n.innerHTML = o), a.prepend(n.children[0]), (n.innerHTML = "");
    } else a.prepend(o);
  };
  if (typeof t == "object" && "length" in t) {
    for (let o = 0; o < t.length; o += 1) t[o] && f(t[o]);
    r = i + t.length;
  } else f(t);
  e.recalcSlides(),
    s.loop && e.loopCreate(),
    (!s.observer || e.isElement) && e.update(),
    e.slideTo(r, 0, !1);
}
function Ps(t, e) {
  const s = this,
    { params: i, activeIndex: a, slidesEl: r } = s;
  let f = a;
  i.loop && ((f -= s.loopedSlides), s.loopDestroy(), s.recalcSlides());
  const o = s.slides.length;
  if (t <= 0) {
    s.prependSlide(e);
    return;
  }
  if (t >= o) {
    s.appendSlide(e);
    return;
  }
  let n = f > t ? f + 1 : f;
  const p = [];
  for (let c = o - 1; c >= t; c -= 1) {
    const l = s.slides[c];
    l.remove(), p.unshift(l);
  }
  if (typeof e == "object" && "length" in e) {
    for (let c = 0; c < e.length; c += 1) e[c] && r.append(e[c]);
    n = f > t ? f + e.length : f;
  } else r.append(e);
  for (let c = 0; c < p.length; c += 1) r.append(p[c]);
  s.recalcSlides(),
    i.loop && s.loopCreate(),
    (!i.observer || s.isElement) && s.update(),
    i.loop ? s.slideTo(n + s.loopedSlides, 0, !1) : s.slideTo(n, 0, !1);
}
function Ls(t) {
  const e = this,
    { params: s, activeIndex: i } = e;
  let a = i;
  s.loop && ((a -= e.loopedSlides), e.loopDestroy());
  let r = a,
    f;
  if (typeof t == "object" && "length" in t) {
    for (let o = 0; o < t.length; o += 1)
      (f = t[o]), e.slides[f] && e.slides[f].remove(), f < r && (r -= 1);
    r = Math.max(r, 0);
  } else
    (f = t),
      e.slides[f] && e.slides[f].remove(),
      f < r && (r -= 1),
      (r = Math.max(r, 0));
  e.recalcSlides(),
    s.loop && e.loopCreate(),
    (!s.observer || e.isElement) && e.update(),
    s.loop ? e.slideTo(r + e.loopedSlides, 0, !1) : e.slideTo(r, 0, !1);
}
function Is() {
  const t = this,
    e = [];
  for (let s = 0; s < t.slides.length; s += 1) e.push(s);
  t.removeSlide(e);
}
function zs(t) {
  let { swiper: e } = t;
  Object.assign(e, {
    appendSlide: Ms.bind(e),
    prependSlide: Cs.bind(e),
    addSlide: Ps.bind(e),
    removeSlide: Ls.bind(e),
    removeAllSlides: Is.bind(e),
  });
}
function ie(t) {
  const {
    effect: e,
    swiper: s,
    on: i,
    setTranslate: a,
    setTransition: r,
    overwriteParams: f,
    perspective: o,
    recreateShadows: n,
    getEffectParams: p,
  } = t;
  i("beforeInit", () => {
    if (s.params.effect !== e) return;
    s.classNames.push(`${s.params.containerModifierClass}${e}`),
      o && o() && s.classNames.push(`${s.params.containerModifierClass}3d`);
    const l = f ? f() : {};
    Object.assign(s.params, l), Object.assign(s.originalParams, l);
  }),
    i("setTranslate", () => {
      s.params.effect === e && a();
    }),
    i("setTransition", (l, d) => {
      s.params.effect === e && r(d);
    }),
    i("transitionEnd", () => {
      if (s.params.effect === e && n) {
        if (!p || !p().slideShadows) return;
        s.slides.forEach((l) => {
          l.querySelectorAll(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          ).forEach((d) => d.remove());
        }),
          n();
      }
    });
  let c;
  i("virtualUpdate", () => {
    s.params.effect === e &&
      (s.slides.length || (c = !0),
      requestAnimationFrame(() => {
        c && s.slides && s.slides.length && (a(), (c = !1));
      }));
  });
}
function ce(t, e) {
  const s = te(e);
  return (
    s !== e &&
      ((s.style.backfaceVisibility = "hidden"),
      (s.style["-webkit-backface-visibility"] = "hidden")),
    s
  );
}
function he(t) {
  let { swiper: e, duration: s, transformElements: i, allSlides: a } = t;
  const { activeIndex: r } = e,
    f = (o) =>
      o.parentElement
        ? o.parentElement
        : e.slides.filter(
            (p) => p.shadowRoot && p.shadowRoot === o.parentNode
          )[0];
  if (e.params.virtualTranslate && s !== 0) {
    let o = !1,
      n;
    a
      ? (n = i)
      : (n = i.filter((p) => {
          const c = p.classList.contains("swiper-slide-transform") ? f(p) : p;
          return e.getSlideIndex(c) === r;
        })),
      n.forEach((p) => {
        oe(p, () => {
          if (o || !e || e.destroyed) return;
          (o = !0), (e.animating = !1);
          const c = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
          });
          e.wrapperEl.dispatchEvent(c);
        });
      });
  }
}
function As(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({ fadeEffect: { crossFade: !1 } }),
    ie({
      effect: "fade",
      swiper: e,
      on: i,
      setTranslate: () => {
        const { slides: f } = e,
          o = e.params.fadeEffect;
        for (let n = 0; n < f.length; n += 1) {
          const p = e.slides[n];
          let l = -p.swiperSlideOffset;
          e.params.virtualTranslate || (l -= e.translate);
          let d = 0;
          e.isHorizontal() || ((d = l), (l = 0));
          const u = e.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs(p.progress), 0)
              : 1 + Math.min(Math.max(p.progress, -1), 0),
            y = ce(o, p);
          (y.style.opacity = u),
            (y.style.transform = `translate3d(${l}px, ${d}px, 0px)`);
        }
      },
      setTransition: (f) => {
        const o = e.slides.map((n) => te(n));
        o.forEach((n) => {
          n.style.transitionDuration = `${f}ms`;
        }),
          he({ swiper: e, duration: f, transformElements: o, allSlides: !0 });
      },
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !e.params.cssMode,
      }),
    });
}
function $s(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({
    cubeEffect: {
      slideShadows: !0,
      shadow: !0,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });
  const a = (n, p, c) => {
    let l = c
        ? n.querySelector(".swiper-slide-shadow-left")
        : n.querySelector(".swiper-slide-shadow-top"),
      d = c
        ? n.querySelector(".swiper-slide-shadow-right")
        : n.querySelector(".swiper-slide-shadow-bottom");
    l ||
      ((l = q(
        "div",
        `swiper-slide-shadow-cube swiper-slide-shadow-${
          c ? "left" : "top"
        }`.split(" ")
      )),
      n.append(l)),
      d ||
        ((d = q(
          "div",
          `swiper-slide-shadow-cube swiper-slide-shadow-${
            c ? "right" : "bottom"
          }`.split(" ")
        )),
        n.append(d)),
      l && (l.style.opacity = Math.max(-p, 0)),
      d && (d.style.opacity = Math.max(p, 0));
  };
  ie({
    effect: "cube",
    swiper: e,
    on: i,
    setTranslate: () => {
      const {
          el: n,
          wrapperEl: p,
          slides: c,
          width: l,
          height: d,
          rtlTranslate: u,
          size: y,
          browser: g,
        } = e,
        v = e.params.cubeEffect,
        b = e.isHorizontal(),
        h = e.virtual && e.params.virtual.enabled;
      let m = 0,
        S;
      v.shadow &&
        (b
          ? ((S = e.wrapperEl.querySelector(".swiper-cube-shadow")),
            S || ((S = q("div", "swiper-cube-shadow")), e.wrapperEl.append(S)),
            (S.style.height = `${l}px`))
          : ((S = n.querySelector(".swiper-cube-shadow")),
            S || ((S = q("div", "swiper-cube-shadow")), n.append(S))));
      for (let I = 0; I < c.length; I += 1) {
        const A = c[I];
        let D = I;
        h && (D = parseInt(A.getAttribute("data-swiper-slide-index"), 10));
        let L = D * 90,
          k = Math.floor(L / 360);
        u && ((L = -L), (k = Math.floor(-L / 360)));
        const P = Math.max(Math.min(A.progress, 1), -1);
        let M = 0,
          E = 0,
          w = 0;
        D % 4 === 0
          ? ((M = -k * 4 * y), (w = 0))
          : (D - 1) % 4 === 0
          ? ((M = 0), (w = -k * 4 * y))
          : (D - 2) % 4 === 0
          ? ((M = y + k * 4 * y), (w = y))
          : (D - 3) % 4 === 0 && ((M = -y), (w = 3 * y + y * 4 * k)),
          u && (M = -M),
          b || ((E = M), (M = 0));
        const x = `rotateX(${b ? 0 : -L}deg) rotateY(${
          b ? L : 0
        }deg) translate3d(${M}px, ${E}px, ${w}px)`;
        P <= 1 &&
          P > -1 &&
          ((m = D * 90 + P * 90), u && (m = -D * 90 - P * 90)),
          (A.style.transform = x),
          v.slideShadows && a(A, P, b);
      }
      if (
        ((p.style.transformOrigin = `50% 50% -${y / 2}px`),
        (p.style["-webkit-transform-origin"] = `50% 50% -${y / 2}px`),
        v.shadow)
      )
        if (b)
          S.style.transform = `translate3d(0px, ${l / 2 + v.shadowOffset}px, ${
            -l / 2
          }px) rotateX(90deg) rotateZ(0deg) scale(${v.shadowScale})`;
        else {
          const I = Math.abs(m) - Math.floor(Math.abs(m) / 90) * 90,
            A =
              1.5 -
              (Math.sin((I * 2 * Math.PI) / 360) / 2 +
                Math.cos((I * 2 * Math.PI) / 360) / 2),
            D = v.shadowScale,
            L = v.shadowScale / A,
            k = v.shadowOffset;
          S.style.transform = `scale3d(${D}, 1, ${L}) translate3d(0px, ${
            d / 2 + k
          }px, ${-d / 2 / L}px) rotateX(-90deg)`;
        }
      const C =
        (g.isSafari || g.isWebView) && g.needPerspectiveFix ? -y / 2 : 0;
      (p.style.transform = `translate3d(0px,0,${C}px) rotateX(${
        e.isHorizontal() ? 0 : m
      }deg) rotateY(${e.isHorizontal() ? -m : 0}deg)`),
        p.style.setProperty("--swiper-cube-translate-z", `${C}px`);
    },
    setTransition: (n) => {
      const { el: p, slides: c } = e;
      if (
        (c.forEach((l) => {
          (l.style.transitionDuration = `${n}ms`),
            l
              .querySelectorAll(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .forEach((d) => {
                d.style.transitionDuration = `${n}ms`;
              });
        }),
        e.params.cubeEffect.shadow && !e.isHorizontal())
      ) {
        const l = p.querySelector(".swiper-cube-shadow");
        l && (l.style.transitionDuration = `${n}ms`);
      }
    },
    recreateShadows: () => {
      const n = e.isHorizontal();
      e.slides.forEach((p) => {
        const c = Math.max(Math.min(p.progress, 1), -1);
        a(p, c, n);
      });
    },
    getEffectParams: () => e.params.cubeEffect,
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: !1,
      virtualTranslate: !0,
    }),
  });
}
function se(t, e, s) {
  const i = `swiper-slide-shadow${s ? `-${s}` : ""}${
      t ? ` swiper-slide-shadow-${t}` : ""
    }`,
    a = te(e);
  let r = a.querySelector(`.${i.split(" ").join(".")}`);
  return r || ((r = q("div", i.split(" "))), a.append(r)), r;
}
function Os(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({ flipEffect: { slideShadows: !0, limitRotation: !0 } });
  const a = (n, p) => {
    let c = e.isHorizontal()
        ? n.querySelector(".swiper-slide-shadow-left")
        : n.querySelector(".swiper-slide-shadow-top"),
      l = e.isHorizontal()
        ? n.querySelector(".swiper-slide-shadow-right")
        : n.querySelector(".swiper-slide-shadow-bottom");
    c || (c = se("flip", n, e.isHorizontal() ? "left" : "top")),
      l || (l = se("flip", n, e.isHorizontal() ? "right" : "bottom")),
      c && (c.style.opacity = Math.max(-p, 0)),
      l && (l.style.opacity = Math.max(p, 0));
  };
  ie({
    effect: "flip",
    swiper: e,
    on: i,
    setTranslate: () => {
      const { slides: n, rtlTranslate: p } = e,
        c = e.params.flipEffect;
      for (let l = 0; l < n.length; l += 1) {
        const d = n[l];
        let u = d.progress;
        e.params.flipEffect.limitRotation &&
          (u = Math.max(Math.min(d.progress, 1), -1));
        const y = d.swiperSlideOffset;
        let v = -180 * u,
          b = 0,
          h = e.params.cssMode ? -y - e.translate : -y,
          m = 0;
        e.isHorizontal()
          ? p && (v = -v)
          : ((m = h), (h = 0), (b = -v), (v = 0)),
          (d.style.zIndex = -Math.abs(Math.round(u)) + n.length),
          c.slideShadows && a(d, u);
        const S = `translate3d(${h}px, ${m}px, 0px) rotateX(${b}deg) rotateY(${v}deg)`,
          C = ce(c, d);
        C.style.transform = S;
      }
    },
    setTransition: (n) => {
      const p = e.slides.map((c) => te(c));
      p.forEach((c) => {
        (c.style.transitionDuration = `${n}ms`),
          c
            .querySelectorAll(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .forEach((l) => {
              l.style.transitionDuration = `${n}ms`;
            });
      }),
        he({ swiper: e, duration: n, transformElements: p });
    },
    recreateShadows: () => {
      e.params.flipEffect,
        e.slides.forEach((n) => {
          let p = n.progress;
          e.params.flipEffect.limitRotation &&
            (p = Math.max(Math.min(n.progress, 1), -1)),
            a(n, p);
        });
    },
    getEffectParams: () => e.params.flipEffect,
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !e.params.cssMode,
    }),
  });
}
function Ds(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: !0,
    },
  }),
    ie({
      effect: "coverflow",
      swiper: e,
      on: i,
      setTranslate: () => {
        const { width: f, height: o, slides: n, slidesSizesGrid: p } = e,
          c = e.params.coverflowEffect,
          l = e.isHorizontal(),
          d = e.translate,
          u = l ? -d + f / 2 : -d + o / 2,
          y = l ? c.rotate : -c.rotate,
          g = c.depth;
        for (let v = 0, b = n.length; v < b; v += 1) {
          const h = n[v],
            m = p[v],
            S = h.swiperSlideOffset,
            C = (u - S - m / 2) / m,
            I =
              typeof c.modifier == "function" ? c.modifier(C) : C * c.modifier;
          let A = l ? y * I : 0,
            D = l ? 0 : y * I,
            L = -g * Math.abs(I),
            k = c.stretch;
          typeof k == "string" &&
            k.indexOf("%") !== -1 &&
            (k = (parseFloat(c.stretch) / 100) * m);
          let P = l ? 0 : k * I,
            M = l ? k * I : 0,
            E = 1 - (1 - c.scale) * Math.abs(I);
          Math.abs(M) < 0.001 && (M = 0),
            Math.abs(P) < 0.001 && (P = 0),
            Math.abs(L) < 0.001 && (L = 0),
            Math.abs(A) < 0.001 && (A = 0),
            Math.abs(D) < 0.001 && (D = 0),
            Math.abs(E) < 0.001 && (E = 0);
          const w = `translate3d(${M}px,${P}px,${L}px)  rotateX(${D}deg) rotateY(${A}deg) scale(${E})`,
            x = ce(c, h);
          if (
            ((x.style.transform = w),
            (h.style.zIndex = -Math.abs(Math.round(I)) + 1),
            c.slideShadows)
          ) {
            let O = l
                ? h.querySelector(".swiper-slide-shadow-left")
                : h.querySelector(".swiper-slide-shadow-top"),
              T = l
                ? h.querySelector(".swiper-slide-shadow-right")
                : h.querySelector(".swiper-slide-shadow-bottom");
            O || (O = se("coverflow", h, l ? "left" : "top")),
              T || (T = se("coverflow", h, l ? "right" : "bottom")),
              O && (O.style.opacity = I > 0 ? I : 0),
              T && (T.style.opacity = -I > 0 ? -I : 0);
          }
        }
      },
      setTransition: (f) => {
        e.slides
          .map((n) => te(n))
          .forEach((n) => {
            (n.style.transitionDuration = `${f}ms`),
              n
                .querySelectorAll(
                  ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                )
                .forEach((p) => {
                  p.style.transitionDuration = `${f}ms`;
                });
          });
      },
      perspective: () => !0,
      overwriteParams: () => ({ watchSlidesProgress: !0 }),
    });
}
function ks(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: !1,
      progressMultiplier: 1,
      perspective: !0,
      prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
      next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
    },
  });
  const a = (o) => (typeof o == "string" ? o : `${o}px`);
  ie({
    effect: "creative",
    swiper: e,
    on: i,
    setTranslate: () => {
      const { slides: o, wrapperEl: n, slidesSizesGrid: p } = e,
        c = e.params.creativeEffect,
        { progressMultiplier: l } = c,
        d = e.params.centeredSlides;
      if (d) {
        const u = p[0] / 2 - e.params.slidesOffsetBefore || 0;
        n.style.transform = `translateX(calc(50% - ${u}px))`;
      }
      for (let u = 0; u < o.length; u += 1) {
        const y = o[u],
          g = y.progress,
          v = Math.min(Math.max(y.progress, -c.limitProgress), c.limitProgress);
        let b = v;
        d ||
          (b = Math.min(
            Math.max(y.originalProgress, -c.limitProgress),
            c.limitProgress
          ));
        const h = y.swiperSlideOffset,
          m = [e.params.cssMode ? -h - e.translate : -h, 0, 0],
          S = [0, 0, 0];
        let C = !1;
        e.isHorizontal() || ((m[1] = m[0]), (m[0] = 0));
        let I = {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          scale: 1,
          opacity: 1,
        };
        v < 0 ? ((I = c.next), (C = !0)) : v > 0 && ((I = c.prev), (C = !0)),
          m.forEach((E, w) => {
            m[w] = `calc(${E}px + (${a(I.translate[w])} * ${Math.abs(v * l)}))`;
          }),
          S.forEach((E, w) => {
            S[w] = I.rotate[w] * Math.abs(v * l);
          }),
          (y.style.zIndex = -Math.abs(Math.round(g)) + o.length);
        const A = m.join(", "),
          D = `rotateX(${S[0]}deg) rotateY(${S[1]}deg) rotateZ(${S[2]}deg)`,
          L =
            b < 0
              ? `scale(${1 + (1 - I.scale) * b * l})`
              : `scale(${1 - (1 - I.scale) * b * l})`,
          k = b < 0 ? 1 + (1 - I.opacity) * b * l : 1 - (1 - I.opacity) * b * l,
          P = `translate3d(${A}) ${D} ${L}`;
        if ((C && I.shadow) || !C) {
          let E = y.querySelector(".swiper-slide-shadow");
          if ((!E && I.shadow && (E = se("creative", y)), E)) {
            const w = c.shadowPerProgress ? v * (1 / c.limitProgress) : v;
            E.style.opacity = Math.min(Math.max(Math.abs(w), 0), 1);
          }
        }
        const M = ce(c, y);
        (M.style.transform = P),
          (M.style.opacity = k),
          I.origin && (M.style.transformOrigin = I.origin);
      }
    },
    setTransition: (o) => {
      const n = e.slides.map((p) => te(p));
      n.forEach((p) => {
        (p.style.transitionDuration = `${o}ms`),
          p.querySelectorAll(".swiper-slide-shadow").forEach((c) => {
            c.style.transitionDuration = `${o}ms`;
          });
      }),
        he({ swiper: e, duration: o, transformElements: n, allSlides: !0 });
    },
    perspective: () => e.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: !0,
      virtualTranslate: !e.params.cssMode,
    }),
  });
}
function Hs(t) {
  let { swiper: e, extendParams: s, on: i } = t;
  s({
    cardsEffect: {
      slideShadows: !0,
      rotate: !0,
      perSlideRotate: 2,
      perSlideOffset: 8,
    },
  }),
    ie({
      effect: "cards",
      swiper: e,
      on: i,
      setTranslate: () => {
        const { slides: f, activeIndex: o, rtlTranslate: n } = e,
          p = e.params.cardsEffect,
          { startTranslate: c, isTouched: l } = e.touchEventsData,
          d = n ? -e.translate : e.translate;
        for (let u = 0; u < f.length; u += 1) {
          const y = f[u],
            g = y.progress,
            v = Math.min(Math.max(g, -4), 4);
          let b = y.swiperSlideOffset;
          e.params.centeredSlides &&
            !e.params.cssMode &&
            (e.wrapperEl.style.transform = `translateX(${e.minTranslate()}px)`),
            e.params.centeredSlides &&
              e.params.cssMode &&
              (b -= f[0].swiperSlideOffset);
          let h = e.params.cssMode ? -b - e.translate : -b,
            m = 0;
          const S = -100 * Math.abs(v);
          let C = 1,
            I = -p.perSlideRotate * v,
            A = p.perSlideOffset - Math.abs(v) * 0.75;
          const D =
              e.virtual && e.params.virtual.enabled ? e.virtual.from + u : u,
            L =
              (D === o || D === o - 1) &&
              v > 0 &&
              v < 1 &&
              (l || e.params.cssMode) &&
              d < c,
            k =
              (D === o || D === o + 1) &&
              v < 0 &&
              v > -1 &&
              (l || e.params.cssMode) &&
              d > c;
          if (L || k) {
            const w = (1 - Math.abs((Math.abs(v) - 0.5) / 0.5)) ** 0.5;
            (I += -28 * v * w),
              (C += -0.5 * w),
              (A += 96 * w),
              (m = `${-25 * w * Math.abs(v)}%`);
          }
          if (
            (v < 0
              ? (h = `calc(${h}px ${n ? "-" : "+"} (${A * Math.abs(v)}%))`)
              : v > 0
              ? (h = `calc(${h}px ${n ? "-" : "+"} (-${A * Math.abs(v)}%))`)
              : (h = `${h}px`),
            !e.isHorizontal())
          ) {
            const w = m;
            (m = h), (h = w);
          }
          const P = v < 0 ? `${1 + (1 - C) * v}` : `${1 - (1 - C) * v}`,
            M = `
        translate3d(${h}, ${m}, ${S}px)
        rotateZ(${p.rotate ? (n ? -I : I) : 0}deg)
        scale(${P})
      `;
          if (p.slideShadows) {
            let w = y.querySelector(".swiper-slide-shadow");
            w || (w = se("cards", y)),
              w &&
                (w.style.opacity = Math.min(
                  Math.max((Math.abs(v) - 0.5) / 0.5, 0),
                  1
                ));
          }
          y.style.zIndex = -Math.abs(Math.round(g)) + f.length;
          const E = ce(p, y);
          E.style.transform = M;
        }
      },
      setTransition: (f) => {
        const o = e.slides.map((n) => te(n));
        o.forEach((n) => {
          (n.style.transitionDuration = `${f}ms`),
            n.querySelectorAll(".swiper-slide-shadow").forEach((p) => {
              p.style.transitionDuration = `${f}ms`;
            });
        }),
          he({ swiper: e, duration: f, transformElements: o });
      },
      perspective: () => !0,
      overwriteParams: () => ({
        watchSlidesProgress: !0,
        virtualTranslate: !e.params.cssMode,
      }),
    });
}
const Gs = [
  ds,
  cs,
  fs,
  ps,
  us,
  ms,
  hs,
  gs,
  vs,
  ws,
  ys,
  bs,
  Ss,
  xs,
  Es,
  Ts,
  zs,
  As,
  $s,
  Os,
  Ds,
  ks,
  Hs,
];
F.use(Gs);
const Bs = "" + new URL("assets/asc-919972ef.png", import.meta.url).href,
  Xs = "" + new URL("assets/ftools-fa79fd13.png", import.meta.url).href,
  Ys = "" + new URL("assets/harvardedit-36ffbc20.png", import.meta.url).href,
  Rs = "" + new URL("assets/static-home-1db70e2b.png", import.meta.url).href,
  Ns =
    "" + new URL("assets/the247openhouse-cda052ce.png", import.meta.url).href,
  We = (t) => {
    document.head.appendChild(t);
  },
  Vs = () => {
    const t = document.createElement("link");
    (t.rel = "stylesheet"),
      (t.href = "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"),
      We(t);
  },
  Fs = (t = "") => {
    const e = document.createElement("style");
    (e.innerHTML = t), We(e);
  },
  Ws = (t = "") => {
    Fs(`

  .swiper-slide .title {
      width: 100%;
      background: black;
      color: white;
      font-family: sans-serif;
      text-align: center;
      padding: 7px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

${t}
`);
  };
Vs();
Ws();
const _s = [
    { name: "Harvardedit", image: Ys, link: "https://harvardedit.com" },
    {
      name: "Portal dashboard (twilio, signalwire)",
      image: Ns,
      link: "https://portal.the247openhouse.com",
    },
    {
      name: "FTools",
      image: Xs,
      link: "https://appsaeed.github.io/ftools/image-to-text",
    },
    {
      name: "AI Content Creator",
      image: Bs,
      link: "https://appsaeed.github.io/asc/",
    },
    {
      name: "Static website",
      image: Rs,
      link: "https://appsaeed.github.io/static",
    },
  ],
  qs = _s.map(
    (t) => `
  <div class="swiper-slide">
    <a href="${t.link}"  traget="_blank" >
      <div class="title">${t.name}</div>
    </a> 
    <img src="${t.image}" alt="${t.name}"/>
  </div>`
  );
document.querySelector("#sa-portfolio-slider").innerHTML = `
<!-- Slider main container -->
<div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    ${qs}
  </div>
  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <div class="swiper-pagination"></div>

</div>
`;
document.addEventListener("DOMContentLoaded", () => {
  new F(".swiper", {
    speed: 400,
    spaceBetween: 100,
    loop: !0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: { el: ".swiper-pagination", clickable: !0 },
  });
});
//# sourceMappingURL=index.js.map
