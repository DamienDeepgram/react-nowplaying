"use client";

// src/index.tsx
import React, { useEffect, useState, useContext } from "react";

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
import { jsx, jsxs } from "react/jsx-runtime";
var NowPlayingContext = React.createContext({});
var eventTarget = new EventTarget();
var NowPlayingContextProvider = ({ children }) => {
  const [player, setPlayer] = useState();
  const [source, setSource] = useState();
  const [uid, setUid] = useState();
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("audio", { id: "react-nowplaying", children: /* @__PURE__ */ jsx("source", { id: "react-nowplaying-src", src: silence, type: "audio/mp3" }) })
      ]
    }
  );
};
function useNowPlaying() {
  return useContext(NowPlayingContext);
}
export {
  NowPlayingContextProvider,
  useNowPlaying
};
