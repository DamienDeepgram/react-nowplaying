"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  NowPlayingContextProvider: () => NowPlayingContextProvider,
  useNowPlaying: () => useNowPlaying
});
module.exports = __toCommonJS(src_exports);
var import_react = __toESM(require("react"), 1);

// src/lib/contants.ts
var silence = "data:audio/mpeg;base64,//NAxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80LEWwAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80DEpAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";

// src/lib/utils.ts
function randomId(length) {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from(
    { length },
    () => characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
}

// src/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var NowPlayingContext = import_react.default.createContext({});
var eventTarget = new EventTarget();
var NowPlayingContextProvider = ({ children }) => {
  const [player, setPlayer] = (0, import_react.useState)();
  const [source, setSource] = (0, import_react.useState)();
  const [uid, setUid] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    const onEnded = () => {
      setUid(void 0);
      eventTarget.dispatchEvent(new Event("audioEnded"));
    };
    if (!player) {
      const player2 = document.getElementById("react-nowplaying");
      const source2 = document.getElementById("react-nowplaying-src");
      player2.addEventListener("ended", onEnded);
      setPlayer(player2);
      setSource(source2);
    }
    return () => {
      player == null ? void 0 : player.removeEventListener("ended", onEnded);
    };
  }, [player]);
  const play = async (audio, type = "audio/mp3", uid2) => {
    if (!player || !source)
      return;
    uid2 ? setUid(uid2) : setUid(randomId(7));
    let url = audio;
    if (typeof audio !== "string") {
      url = window.URL.createObjectURL(audio);
    }
    source.src = url;
    source.type = type;
    player.load();
    return player.play();
  };
  const stop = () => {
    if (!player)
      return;
    setUid(void 0);
    player.pause();
    player.currentTime = 0;
  };
  const resume = () => {
    if (!player)
      return;
    player.play();
  };
  const onAudioEnded = (callback) => {
    eventTarget.addEventListener("audioEnded", callback);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    NowPlayingContext.Provider,
    {
      value: {
        player,
        play,
        pause: player == null ? void 0 : player.pause,
        resume,
        stop,
        uid,
        onAudioEnded,
        ...player
      },
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", { id: "react-nowplaying", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", { id: "react-nowplaying-src", src: silence, type: "audio/mp3" }) })
      ]
    }
  );
};
function useNowPlaying() {
  return (0, import_react.useContext)(NowPlayingContext);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NowPlayingContextProvider,
  useNowPlaying
});
