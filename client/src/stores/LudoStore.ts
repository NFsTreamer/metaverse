import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import phaserGame from "../PhaserGame";
import Game from "../scenes/Game";

interface LudoState {
  ludoDialogOpen: boolean;
  whiteboardId: null | string;
  whiteboardUrl: null | string;
  urls: Map<string, string>;
}

const initialState: LudoState = {
  ludoDialogOpen: false,
  whiteboardId: null,
  whiteboardUrl: null,
  urls: new Map(),
};

export const whiteboardSlice = createSlice({
  name: "ludo",
  initialState,
  reducers: {
    openWhiteboardDialog: (state, action: PayloadAction<string>) => {
      state.ludoDialogOpen = true;
      state.whiteboardId = action.payload;
      const url = state.urls.get(action.payload);
      if (url) state.whiteboardUrl = url;
      const game = phaserGame.scene.keys.game as Game;
      game.disableKeys();
    },
    closeWhiteboardDialog: (state) => {
      const game = phaserGame.scene.keys.game as Game;
      game.enableKeys();
      game.network.disconnectFromWhiteboard(state.whiteboardId!);
      state.ludoDialogOpen = false;
      state.whiteboardId = null;
      state.whiteboardUrl = null;
    },
    setWhiteboardUrls: (
      state,
      action: PayloadAction<{ whiteboardId: string; roomId: string }>
    ) => {
      state.urls.set(
        action.payload.whiteboardId,
        `https://www.tldraw.com/r/sky-office-${action.payload.roomId}`
      );
    },
  },
});

export const {
  openWhiteboardDialog,
  closeWhiteboardDialog,
  setWhiteboardUrls,
} = whiteboardSlice.actions;

export default whiteboardSlice.reducer;