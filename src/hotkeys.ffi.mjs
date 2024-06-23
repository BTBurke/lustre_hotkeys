var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/hotkeys-js@3.13.7/node_modules/hotkeys-js/dist/hotkeys.common.min.js
var require_hotkeys_common_min = __commonJS({
  "node_modules/.pnpm/hotkeys-js@3.13.7/node_modules/hotkeys-js/dist/hotkeys.common.min.js"(exports, module) {
    "use strict";
    var isff = "undefined" != typeof navigator && 0 < navigator.userAgent.toLowerCase().indexOf("firefox");
    function addEvent(e, t, n, o) {
      e.addEventListener ? e.addEventListener(t, n, o) : e.attachEvent && e.attachEvent("on".concat(t), n);
    }
    function removeEvent(e, t, n, o) {
      e.removeEventListener ? e.removeEventListener(t, n, o) : e.detachEvent && e.detachEvent("on".concat(t), n);
    }
    function getMods(t, e) {
      var n = e.slice(0, e.length - 1);
      for (let e2 = 0; e2 < n.length; e2++) n[e2] = t[n[e2].toLowerCase()];
      return n;
    }
    function getKeys(e) {
      var t = (e = (e = "string" != typeof e ? "" : e).replace(/\s/g, "")).split(",");
      let n = t.lastIndexOf("");
      for (; 0 <= n; ) t[n - 1] += ",", t.splice(n, 1), n = t.lastIndexOf("");
      return t;
    }
    function compareArray(e, t) {
      var n = e.length < t.length ? t : e, o = e.length < t.length ? e : t;
      let s = true;
      for (let e2 = 0; e2 < n.length; e2++) ~o.indexOf(n[e2]) || (s = false);
      return s;
    }
    var _keyMap = { backspace: 8, "\u232B": 8, tab: 9, clear: 12, enter: 13, "\u21A9": 13, return: 13, esc: 27, escape: 27, space: 32, left: 37, up: 38, right: 39, down: 40, del: 46, delete: 46, ins: 45, insert: 45, home: 36, end: 35, pageup: 33, pagedown: 34, capslock: 20, num_0: 96, num_1: 97, num_2: 98, num_3: 99, num_4: 100, num_5: 101, num_6: 102, num_7: 103, num_8: 104, num_9: 105, num_multiply: 106, num_add: 107, num_enter: 108, num_subtract: 109, num_decimal: 110, num_divide: 111, "\u21EA": 20, ",": 188, ".": 190, "/": 191, "`": 192, "-": isff ? 173 : 189, "=": isff ? 61 : 187, ";": isff ? 59 : 186, "'": 222, "[": 219, "]": 221, "\\": 220 };
    var _modifier = { "\u21E7": 16, shift: 16, "\u2325": 18, alt: 18, option: 18, "\u2303": 17, ctrl: 17, control: 17, "\u2318": 91, cmd: 91, command: 91 };
    var modifierMap = { 16: "shiftKey", 18: "altKey", 17: "ctrlKey", 91: "metaKey", shiftKey: 16, ctrlKey: 17, altKey: 18, metaKey: 91 };
    var _mods = { 16: false, 18: false, 17: false, 91: false };
    var _handlers = {};
    for (let e = 1; e < 20; e++) _keyMap["f".concat(e)] = 111 + e;
    var _downKeys = [];
    var winListendFocus = null;
    var _scope = "all";
    var elementEventMap = /* @__PURE__ */ new Map();
    var code = (e) => _keyMap[e.toLowerCase()] || _modifier[e.toLowerCase()] || e.toUpperCase().charCodeAt(0);
    var getKey = (t) => Object.keys(_keyMap).find((e) => _keyMap[e] === t);
    var getModifier = (t) => Object.keys(_modifier).find((e) => _modifier[e] === t);
    function setScope(e) {
      _scope = e || "all";
    }
    function getScope() {
      return _scope || "all";
    }
    function getPressedKeyCodes() {
      return _downKeys.slice(0);
    }
    function getPressedKeyString() {
      return _downKeys.map((e) => getKey(e) || getModifier(e) || String.fromCharCode(e));
    }
    function getAllKeyCodes() {
      const s = [];
      return Object.keys(_handlers).forEach((e) => {
        _handlers[e].forEach((e2) => {
          var { key: e2, scope: t, mods: n, shortcut: o } = e2;
          s.push({ scope: t, shortcut: o, mods: n, keys: e2.split("+").map((e3) => code(e3)) });
        });
      }), s;
    }
    function filter(e) {
      var e = e.target || e.srcElement, t = e["tagName"];
      let n = true;
      var o = "INPUT" === t && !["checkbox", "radio", "range", "button", "file", "reset", "submit", "color"].includes(e.type);
      return n = !e.isContentEditable && (!o && "TEXTAREA" !== t && "SELECT" !== t || e.readOnly) ? n : false;
    }
    function isPressed(e) {
      return "string" == typeof e && (e = code(e)), !!~_downKeys.indexOf(e);
    }
    function deleteScope(e, t) {
      var n;
      let o;
      e = e || getScope();
      for (const s in _handlers) if (Object.prototype.hasOwnProperty.call(_handlers, s)) for (n = _handlers[s], o = 0; o < n.length; ) n[o].scope === e ? n.splice(o, 1).forEach((e2) => {
        e2 = e2.element;
        return removeKeyEvent(e2);
      }) : o++;
      getScope() === e && setScope(t || "all");
    }
    function clearModifier(e) {
      let t = e.keyCode || e.which || e.charCode;
      var n = _downKeys.indexOf(t);
      if (n < 0 || _downKeys.splice(n, 1), e.key && "meta" == e.key.toLowerCase() && _downKeys.splice(0, _downKeys.length), (t = 93 !== t && 224 !== t ? t : 91) in _mods) {
        _mods[t] = false;
        for (const o in _modifier) _modifier[o] === t && (hotkeys2[o] = false);
      }
    }
    function unbind(n) {
      if (void 0 === n) Object.keys(_handlers).forEach((e) => {
        Array.isArray(_handlers[e]) && _handlers[e].forEach((e2) => eachUnbind(e2)), delete _handlers[e];
      }), removeKeyEvent(null);
      else if (Array.isArray(n)) n.forEach((e) => {
        e.key && eachUnbind(e);
      });
      else if ("object" == typeof n) n.key && eachUnbind(n);
      else if ("string" == typeof n) {
        for (var o = arguments.length, s = Array(1 < o ? o - 1 : 0), r = 1; r < o; r++) s[r - 1] = arguments[r];
        let [e, t] = s;
        "function" == typeof e && (t = e, e = ""), eachUnbind({ key: n, scope: e, method: t, splitKey: "+" });
      }
    }
    var eachUnbind = (e) => {
      let { key: t, scope: r, method: i, splitKey: d = "+" } = e;
      getKeys(t).forEach((e2) => {
        var e2 = e2.split(d), t2 = e2.length, n = e2[t2 - 1], n = "*" === n ? "*" : code(n);
        if (_handlers[n]) {
          r = r || getScope();
          const o = 1 < t2 ? getMods(_modifier, e2) : [], s = [];
          _handlers[n] = _handlers[n].filter((e3) => {
            var t3 = (!i || e3.method === i) && e3.scope === r && compareArray(e3.mods, o);
            return t3 && s.push(e3.element), !t3;
          }), s.forEach((e3) => removeKeyEvent(e3));
        }
      });
    };
    function eventHandler(t, n, o, e) {
      if (n.element === e) {
        let e2;
        if (n.scope === o || "all" === n.scope) {
          e2 = 0 < n.mods.length;
          for (const s in _mods) Object.prototype.hasOwnProperty.call(_mods, s) && (!_mods[s] && ~n.mods.indexOf(+s) || _mods[s] && !~n.mods.indexOf(+s)) && (e2 = false);
          (0 !== n.mods.length || _mods[16] || _mods[18] || _mods[17] || _mods[91]) && !e2 && "*" !== n.shortcut || (n.keys = [], n.keys = n.keys.concat(_downKeys), false === n.method(t, n) && (t.preventDefault ? t.preventDefault() : t.returnValue = false, t.stopPropagation && t.stopPropagation(), t.cancelBubble) && (t.cancelBubble = true));
        }
      }
    }
    function dispatch(n, t) {
      var o = _handlers["*"];
      let e = n.keyCode || n.which || n.charCode;
      if (hotkeys2.filter.call(this, n)) {
        if (93 !== e && 224 !== e || (e = 91), ~_downKeys.indexOf(e) || 229 === e || _downKeys.push(e), ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach((e2) => {
          var t2 = modifierMap[e2];
          n[e2] && !~_downKeys.indexOf(t2) ? _downKeys.push(t2) : !n[e2] && ~_downKeys.indexOf(t2) ? _downKeys.splice(_downKeys.indexOf(t2), 1) : "metaKey" !== e2 || !n[e2] || 3 !== _downKeys.length || n.ctrlKey || n.shiftKey || n.altKey || (_downKeys = _downKeys.slice(_downKeys.indexOf(t2)));
        }), e in _mods) {
          _mods[e] = true;
          for (const y in _modifier) _modifier[y] === e && (hotkeys2[y] = true);
          if (!o) return;
        }
        for (const p in _mods) Object.prototype.hasOwnProperty.call(_mods, p) && (_mods[p] = n[modifierMap[p]]);
        n.getModifierState && (!n.altKey || n.ctrlKey) && n.getModifierState("AltGraph") && (~_downKeys.indexOf(17) || _downKeys.push(17), ~_downKeys.indexOf(18) || _downKeys.push(18), _mods[17] = true, _mods[18] = true);
        var s = getScope();
        if (o) for (let e2 = 0; e2 < o.length; e2++) o[e2].scope === s && ("keydown" === n.type && o[e2].keydown || "keyup" === n.type && o[e2].keyup) && eventHandler(n, o[e2], s, t);
        if (e in _handlers) {
          var r = _handlers[e], i = r.length;
          for (let e2 = 0; e2 < i; e2++) if (("keydown" === n.type && r[e2].keydown || "keyup" === n.type && r[e2].keyup) && r[e2].key) {
            var d = r[e2], a = d["splitKey"], l = d.key.split(a), c = [];
            for (let e3 = 0; e3 < l.length; e3++) c.push(code(l[e3]));
            c.sort().join("") === _downKeys.sort().join("") && eventHandler(n, d, s, t);
          }
        }
      }
    }
    function hotkeys2(e, t, n) {
      _downKeys = [];
      var o, s = getKeys(e);
      let r = [], i = "all", d = document, a = 0, l = false, c = true, y = "+", p = false, f = false;
      for (void 0 === n && "function" == typeof t && (n = t), "[object Object]" === Object.prototype.toString.call(t) && (t.scope && (i = t.scope), t.element && (d = t.element), t.keyup && (l = t.keyup), void 0 !== t.keydown && (c = t.keydown), void 0 !== t.capture && (p = t.capture), "string" == typeof t.splitKey && (y = t.splitKey), true === t.single) && (f = true), "string" == typeof t && (i = t), f && unbind(e, i); a < s.length; a++) e = s[a].split(y), r = [], 1 < e.length && (r = getMods(_modifier, e)), (e = "*" === (e = e[e.length - 1]) ? "*" : code(e)) in _handlers || (_handlers[e] = []), _handlers[e].push({ keyup: l, keydown: c, scope: i, mods: r, shortcut: s[a], method: n, key: s[a], splitKey: y, element: d });
      void 0 !== d && window && (elementEventMap.has(d) || (t = function() {
        return dispatch(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : window.event, d);
      }, o = function() {
        var e2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : window.event;
        dispatch(e2, d), clearModifier(e2);
      }, elementEventMap.set(d, { keydownListener: t, keyupListenr: o, capture: p }), addEvent(d, "keydown", t, p), addEvent(d, "keyup", o, p)), winListendFocus || (t = () => {
        _downKeys = [];
      }, winListendFocus = { listener: t, capture: p }, addEvent(window, "focus", t, p)));
    }
    function trigger(t) {
      let n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "all";
      Object.keys(_handlers).forEach((e) => {
        _handlers[e].filter((e2) => e2.scope === n && e2.shortcut === t).forEach((e2) => {
          e2 && e2.method && e2.method();
        });
      });
    }
    function removeKeyEvent(t) {
      var e, n, o, s = Object.values(_handlers).flat();
      s.findIndex((e2) => {
        e2 = e2.element;
        return e2 === t;
      }) < 0 && ({ keydownListener: o, keyupListenr: n, capture: e } = elementEventMap.get(t) || {}, o) && n && (removeEvent(t, "keyup", n, e), removeEvent(t, "keydown", o, e), elementEventMap.delete(t)), 0 < s.length && 0 < elementEventMap.size || (Object.keys(elementEventMap).forEach((e2) => {
        var { keydownListener: t2, keyupListenr: n2, capture: o2 } = elementEventMap.get(e2) || {};
        t2 && n2 && (removeEvent(e2, "keyup", n2, o2), removeEvent(e2, "keydown", t2, o2), elementEventMap.delete(e2));
      }), elementEventMap.clear(), Object.keys(_handlers).forEach((e2) => delete _handlers[e2]), winListendFocus && ({ listener: n, capture: o } = winListendFocus, removeEvent(window, "focus", n, o), winListendFocus = null));
    }
    var _api = { getPressedKeyString, setScope, getScope, deleteScope, getPressedKeyCodes, getAllKeyCodes, isPressed, filter, trigger, unbind, keyMap: _keyMap, modifier: _modifier, modifierMap };
    for (const L0 in _api) Object.prototype.hasOwnProperty.call(_api, L0) && (hotkeys2[L0] = _api[L0]);
    if ("undefined" != typeof window) {
      const M0 = window.hotkeys;
      hotkeys2.noConflict = (e) => (e && window.hotkeys === hotkeys2 && (window.hotkeys = M0), hotkeys2), window.hotkeys = hotkeys2;
    }
    module.exports = hotkeys2;
  }
});

// node_modules/.pnpm/hotkeys-js@3.13.7/node_modules/hotkeys-js/dist/hotkeys.common.js
var require_hotkeys_common = __commonJS({
  "node_modules/.pnpm/hotkeys-js@3.13.7/node_modules/hotkeys-js/dist/hotkeys.common.js"(exports, module) {
    "use strict";
    var isff = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : false;
    function addEvent(object, event, method, useCapture) {
      if (object.addEventListener) {
        object.addEventListener(event, method, useCapture);
      } else if (object.attachEvent) {
        object.attachEvent("on".concat(event), method);
      }
    }
    function removeEvent(object, event, method, useCapture) {
      if (object.removeEventListener) {
        object.removeEventListener(event, method, useCapture);
      } else if (object.detachEvent) {
        object.detachEvent("on".concat(event), method);
      }
    }
    function getMods(modifier, key) {
      const mods = key.slice(0, key.length - 1);
      for (let i = 0; i < mods.length; i++) mods[i] = modifier[mods[i].toLowerCase()];
      return mods;
    }
    function getKeys(key) {
      if (typeof key !== "string") key = "";
      key = key.replace(/\s/g, "");
      const keys = key.split(",");
      let index = keys.lastIndexOf("");
      for (; index >= 0; ) {
        keys[index - 1] += ",";
        keys.splice(index, 1);
        index = keys.lastIndexOf("");
      }
      return keys;
    }
    function compareArray(a1, a2) {
      const arr1 = a1.length >= a2.length ? a1 : a2;
      const arr2 = a1.length >= a2.length ? a2 : a1;
      let isIndex = true;
      for (let i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
      }
      return isIndex;
    }
    var _keyMap = {
      backspace: 8,
      "\u232B": 8,
      tab: 9,
      clear: 12,
      enter: 13,
      "\u21A9": 13,
      return: 13,
      esc: 27,
      escape: 27,
      space: 32,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      del: 46,
      delete: 46,
      ins: 45,
      insert: 45,
      home: 36,
      end: 35,
      pageup: 33,
      pagedown: 34,
      capslock: 20,
      num_0: 96,
      num_1: 97,
      num_2: 98,
      num_3: 99,
      num_4: 100,
      num_5: 101,
      num_6: 102,
      num_7: 103,
      num_8: 104,
      num_9: 105,
      num_multiply: 106,
      num_add: 107,
      num_enter: 108,
      num_subtract: 109,
      num_decimal: 110,
      num_divide: 111,
      "\u21EA": 20,
      ",": 188,
      ".": 190,
      "/": 191,
      "`": 192,
      "-": isff ? 173 : 189,
      "=": isff ? 61 : 187,
      ";": isff ? 59 : 186,
      "'": 222,
      "[": 219,
      "]": 221,
      "\\": 220
    };
    var _modifier = {
      // shiftKey
      "\u21E7": 16,
      shift: 16,
      // altKey
      "\u2325": 18,
      alt: 18,
      option: 18,
      // ctrlKey
      "\u2303": 17,
      ctrl: 17,
      control: 17,
      // metaKey
      "\u2318": 91,
      cmd: 91,
      command: 91
    };
    var modifierMap = {
      16: "shiftKey",
      18: "altKey",
      17: "ctrlKey",
      91: "metaKey",
      shiftKey: 16,
      ctrlKey: 17,
      altKey: 18,
      metaKey: 91
    };
    var _mods = {
      16: false,
      18: false,
      17: false,
      91: false
    };
    var _handlers = {};
    for (let k = 1; k < 20; k++) {
      _keyMap["f".concat(k)] = 111 + k;
    }
    var _downKeys = [];
    var winListendFocus = null;
    var _scope = "all";
    var elementEventMap = /* @__PURE__ */ new Map();
    var code = (x) => _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
    var getKey = (x) => Object.keys(_keyMap).find((k) => _keyMap[k] === x);
    var getModifier = (x) => Object.keys(_modifier).find((k) => _modifier[k] === x);
    function setScope(scope) {
      _scope = scope || "all";
    }
    function getScope() {
      return _scope || "all";
    }
    function getPressedKeyCodes() {
      return _downKeys.slice(0);
    }
    function getPressedKeyString() {
      return _downKeys.map((c) => getKey(c) || getModifier(c) || String.fromCharCode(c));
    }
    function getAllKeyCodes() {
      const result = [];
      Object.keys(_handlers).forEach((k) => {
        _handlers[k].forEach((_ref) => {
          let {
            key,
            scope,
            mods,
            shortcut
          } = _ref;
          result.push({
            scope,
            shortcut,
            mods,
            keys: key.split("+").map((v) => code(v))
          });
        });
      });
      return result;
    }
    function filter(event) {
      const target = event.target || event.srcElement;
      const {
        tagName
      } = target;
      let flag = true;
      const isInput = tagName === "INPUT" && !["checkbox", "radio", "range", "button", "file", "reset", "submit", "color"].includes(target.type);
      if (target.isContentEditable || (isInput || tagName === "TEXTAREA" || tagName === "SELECT") && !target.readOnly) {
        flag = false;
      }
      return flag;
    }
    function isPressed(keyCode) {
      if (typeof keyCode === "string") {
        keyCode = code(keyCode);
      }
      return _downKeys.indexOf(keyCode) !== -1;
    }
    function deleteScope(scope, newScope) {
      let handlers;
      let i;
      if (!scope) scope = getScope();
      for (const key in _handlers) {
        if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
          handlers = _handlers[key];
          for (i = 0; i < handlers.length; ) {
            if (handlers[i].scope === scope) {
              const deleteItems = handlers.splice(i, 1);
              deleteItems.forEach((_ref2) => {
                let {
                  element
                } = _ref2;
                return removeKeyEvent(element);
              });
            } else {
              i++;
            }
          }
        }
      }
      if (getScope() === scope) setScope(newScope || "all");
    }
    function clearModifier(event) {
      let key = event.keyCode || event.which || event.charCode;
      const i = _downKeys.indexOf(key);
      if (i >= 0) {
        _downKeys.splice(i, 1);
      }
      if (event.key && event.key.toLowerCase() === "meta") {
        _downKeys.splice(0, _downKeys.length);
      }
      if (key === 93 || key === 224) key = 91;
      if (key in _mods) {
        _mods[key] = false;
        for (const k in _modifier) if (_modifier[k] === key) hotkeys2[k] = false;
      }
    }
    function unbind(keysInfo) {
      if (typeof keysInfo === "undefined") {
        Object.keys(_handlers).forEach((key) => {
          Array.isArray(_handlers[key]) && _handlers[key].forEach((info) => eachUnbind(info));
          delete _handlers[key];
        });
        removeKeyEvent(null);
      } else if (Array.isArray(keysInfo)) {
        keysInfo.forEach((info) => {
          if (info.key) eachUnbind(info);
        });
      } else if (typeof keysInfo === "object") {
        if (keysInfo.key) eachUnbind(keysInfo);
      } else if (typeof keysInfo === "string") {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        let [scope, method] = args;
        if (typeof scope === "function") {
          method = scope;
          scope = "";
        }
        eachUnbind({
          key: keysInfo,
          scope,
          method,
          splitKey: "+"
        });
      }
    }
    var eachUnbind = (_ref3) => {
      let {
        key,
        scope,
        method,
        splitKey = "+"
      } = _ref3;
      const multipleKeys = getKeys(key);
      multipleKeys.forEach((originKey) => {
        const unbindKeys = originKey.split(splitKey);
        const len = unbindKeys.length;
        const lastKey = unbindKeys[len - 1];
        const keyCode = lastKey === "*" ? "*" : code(lastKey);
        if (!_handlers[keyCode]) return;
        if (!scope) scope = getScope();
        const mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
        const unbindElements = [];
        _handlers[keyCode] = _handlers[keyCode].filter((record) => {
          const isMatchingMethod = method ? record.method === method : true;
          const isUnbind = isMatchingMethod && record.scope === scope && compareArray(record.mods, mods);
          if (isUnbind) unbindElements.push(record.element);
          return !isUnbind;
        });
        unbindElements.forEach((element) => removeKeyEvent(element));
      });
    };
    function eventHandler(event, handler, scope, element) {
      if (handler.element !== element) {
        return;
      }
      let modifiersMatch;
      if (handler.scope === scope || handler.scope === "all") {
        modifiersMatch = handler.mods.length > 0;
        for (const y in _mods) {
          if (Object.prototype.hasOwnProperty.call(_mods, y)) {
            if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
              modifiersMatch = false;
            }
          }
        }
        if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === "*") {
          handler.keys = [];
          handler.keys = handler.keys.concat(_downKeys);
          if (handler.method(event, handler) === false) {
            if (event.preventDefault) event.preventDefault();
            else event.returnValue = false;
            if (event.stopPropagation) event.stopPropagation();
            if (event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    }
    function dispatch(event, element) {
      const asterisk = _handlers["*"];
      let key = event.keyCode || event.which || event.charCode;
      if (!hotkeys2.filter.call(this, event)) return;
      if (key === 93 || key === 224) key = 91;
      if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
      ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach((keyName) => {
        const keyNum = modifierMap[keyName];
        if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
          _downKeys.push(keyNum);
        } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
          _downKeys.splice(_downKeys.indexOf(keyNum), 1);
        } else if (keyName === "metaKey" && event[keyName] && _downKeys.length === 3) {
          if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
            _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
          }
        }
      });
      if (key in _mods) {
        _mods[key] = true;
        for (const k in _modifier) {
          if (_modifier[k] === key) hotkeys2[k] = true;
        }
        if (!asterisk) return;
      }
      for (const e in _mods) {
        if (Object.prototype.hasOwnProperty.call(_mods, e)) {
          _mods[e] = event[modifierMap[e]];
        }
      }
      if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState("AltGraph")) {
        if (_downKeys.indexOf(17) === -1) {
          _downKeys.push(17);
        }
        if (_downKeys.indexOf(18) === -1) {
          _downKeys.push(18);
        }
        _mods[17] = true;
        _mods[18] = true;
      }
      const scope = getScope();
      if (asterisk) {
        for (let i = 0; i < asterisk.length; i++) {
          if (asterisk[i].scope === scope && (event.type === "keydown" && asterisk[i].keydown || event.type === "keyup" && asterisk[i].keyup)) {
            eventHandler(event, asterisk[i], scope, element);
          }
        }
      }
      if (!(key in _handlers)) return;
      const handlerKey = _handlers[key];
      const keyLen = handlerKey.length;
      for (let i = 0; i < keyLen; i++) {
        if (event.type === "keydown" && handlerKey[i].keydown || event.type === "keyup" && handlerKey[i].keyup) {
          if (handlerKey[i].key) {
            const record = handlerKey[i];
            const {
              splitKey
            } = record;
            const keyShortcut = record.key.split(splitKey);
            const _downKeysCurrent = [];
            for (let a = 0; a < keyShortcut.length; a++) {
              _downKeysCurrent.push(code(keyShortcut[a]));
            }
            if (_downKeysCurrent.sort().join("") === _downKeys.sort().join("")) {
              eventHandler(event, record, scope, element);
            }
          }
        }
      }
    }
    function hotkeys2(key, option, method) {
      _downKeys = [];
      const keys = getKeys(key);
      let mods = [];
      let scope = "all";
      let element = document;
      let i = 0;
      let keyup = false;
      let keydown = true;
      let splitKey = "+";
      let capture = false;
      let single = false;
      if (method === void 0 && typeof option === "function") {
        method = option;
      }
      if (Object.prototype.toString.call(option) === "[object Object]") {
        if (option.scope) scope = option.scope;
        if (option.element) element = option.element;
        if (option.keyup) keyup = option.keyup;
        if (option.keydown !== void 0) keydown = option.keydown;
        if (option.capture !== void 0) capture = option.capture;
        if (typeof option.splitKey === "string") splitKey = option.splitKey;
        if (option.single === true) single = true;
      }
      if (typeof option === "string") scope = option;
      if (single) unbind(key, scope);
      for (; i < keys.length; i++) {
        key = keys[i].split(splitKey);
        mods = [];
        if (key.length > 1) mods = getMods(_modifier, key);
        key = key[key.length - 1];
        key = key === "*" ? "*" : code(key);
        if (!(key in _handlers)) _handlers[key] = [];
        _handlers[key].push({
          keyup,
          keydown,
          scope,
          mods,
          shortcut: keys[i],
          method,
          key: keys[i],
          splitKey,
          element
        });
      }
      if (typeof element !== "undefined" && window) {
        if (!elementEventMap.has(element)) {
          const keydownListener = function() {
            let event = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event;
            return dispatch(event, element);
          };
          const keyupListenr = function() {
            let event = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event;
            dispatch(event, element);
            clearModifier(event);
          };
          elementEventMap.set(element, {
            keydownListener,
            keyupListenr,
            capture
          });
          addEvent(element, "keydown", keydownListener, capture);
          addEvent(element, "keyup", keyupListenr, capture);
        }
        if (!winListendFocus) {
          const listener = () => {
            _downKeys = [];
          };
          winListendFocus = {
            listener,
            capture
          };
          addEvent(window, "focus", listener, capture);
        }
      }
    }
    function trigger(shortcut) {
      let scope = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all";
      Object.keys(_handlers).forEach((key) => {
        const dataList = _handlers[key].filter((item) => item.scope === scope && item.shortcut === shortcut);
        dataList.forEach((data) => {
          if (data && data.method) {
            data.method();
          }
        });
      });
    }
    function removeKeyEvent(element) {
      const values = Object.values(_handlers).flat();
      const findindex = values.findIndex((_ref4) => {
        let {
          element: el
        } = _ref4;
        return el === element;
      });
      if (findindex < 0) {
        const {
          keydownListener,
          keyupListenr,
          capture
        } = elementEventMap.get(element) || {};
        if (keydownListener && keyupListenr) {
          removeEvent(element, "keyup", keyupListenr, capture);
          removeEvent(element, "keydown", keydownListener, capture);
          elementEventMap.delete(element);
        }
      }
      if (values.length <= 0 || elementEventMap.size <= 0) {
        const eventKeys = Object.keys(elementEventMap);
        eventKeys.forEach((el) => {
          const {
            keydownListener,
            keyupListenr,
            capture
          } = elementEventMap.get(el) || {};
          if (keydownListener && keyupListenr) {
            removeEvent(el, "keyup", keyupListenr, capture);
            removeEvent(el, "keydown", keydownListener, capture);
            elementEventMap.delete(el);
          }
        });
        elementEventMap.clear();
        Object.keys(_handlers).forEach((key) => delete _handlers[key]);
        if (winListendFocus) {
          const {
            listener,
            capture
          } = winListendFocus;
          removeEvent(window, "focus", listener, capture);
          winListendFocus = null;
        }
      }
    }
    var _api = {
      getPressedKeyString,
      setScope,
      getScope,
      deleteScope,
      getPressedKeyCodes,
      getAllKeyCodes,
      isPressed,
      filter,
      trigger,
      unbind,
      keyMap: _keyMap,
      modifier: _modifier,
      modifierMap
    };
    for (const a in _api) {
      if (Object.prototype.hasOwnProperty.call(_api, a)) {
        hotkeys2[a] = _api[a];
      }
    }
    if (typeof window !== "undefined") {
      const _hotkeys = window.hotkeys;
      hotkeys2.noConflict = (deep) => {
        if (deep && window.hotkeys === hotkeys2) {
          window.hotkeys = _hotkeys;
        }
        return hotkeys2;
      };
      window.hotkeys = hotkeys2;
    }
    module.exports = hotkeys2;
  }
});

// node_modules/.pnpm/hotkeys-js@3.13.7/node_modules/hotkeys-js/index.js
var require_hotkeys_js = __commonJS({
  "node_modules/.pnpm/hotkeys-js@3.13.7/node_modules/hotkeys-js/index.js"(exports, module) {
    if (process.env.NODE_ENV === "production") {
      module.exports = require_hotkeys_common_min();
    } else {
      module.exports = require_hotkeys_common();
    }
  }
});

// src/js/component.js
var import_hotkeys_js = __toESM(require_hotkeys_js());
var HotkeyBind = class extends HTMLElement {
  static observedAttributes = ["bind"];
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    let binding = this.getAttribute("bind");
    let host2 = shadow.host;
    console.log(`binding ${binding}`, host2);
    if (binding) {
      (0, import_hotkeys_js.default)(binding, function(event, handler) {
        console.log(`firing ${handler.key}`);
        event.preventDefault();
        host2.dispatchEvent(new CustomEvent("fire", { bubbles: true, composable: true }));
        return false;
      });
    }
  }
  disconnectedCallback() {
    let binding = this.getAttribute("bind");
    console.log(`unbinding ${binding}`);
    if (binding) {
      import_hotkeys_js.default.unbind(binding);
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    import_hotkeys_js.default.unbind(oldValue);
    (0, import_hotkeys_js.default)(newValue, function(event, handler) {
      console.log(`firing ${handler.key}`);
      event.preventDefault();
      host.dispatchEvent(new CustomEvent("fire", { bubbles: true, composable: true }));
      return false;
    });
  }
};
function register() {
  if (typeof window !== "undefined") {
    let registry = window.customElements;
    if (typeof registry.get("hotkey-bind") === "undefined") {
      registry.define("hotkey-bind", HotkeyBind);
    }
  }
  return "hotkey-bind";
}
export {
  register
};
/*! Bundled license information:

hotkeys-js/dist/hotkeys.common.min.js:
  (*! hotkeys-js v3.13.7 | MIT © 2024 kenny wong <wowohoo@qq.com> https://jaywcjlove.github.io/hotkeys-js *)
*/
