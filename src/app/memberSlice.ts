import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Member = {
  id: number;
  name: string;
  role: string;
};

interface MemberState {
  allMembers: Member[];
  unpoppedMembers: Member[];
  poppedMembers: Member[];
}

// TODO: Store in a backend instead of locally
const allMembers: Member[] = JSON.parse(
  localStorage.getItem("allMembers") ?? "[]"
);
const poppedMembers: Member[] = JSON.parse(
  localStorage.getItem("poppedMembers") ?? "[]"
);

const initialState: MemberState = {
  allMembers: allMembers,
  poppedMembers: poppedMembers,
  unpoppedMembers: allMembers.filter(
    (member) => !poppedMembers.find((m) => m.id === member.id)
  ),
};

export const memberSlice = createSlice({
  name: "member",
  initialState: initialState,
  reducers: {
    popMember: (state, action: PayloadAction<number>) => {
      const member = allMembers.find((member) => member.id === action.payload);
      if (member === undefined) return;

      state.poppedMembers.push(member);
      state.unpoppedMembers = state.unpoppedMembers.filter(
        (m) => m.id !== member.id
      );
    },
    addMember: (state, action: PayloadAction<Member>) => {
      state.allMembers.push(action.payload);
      state.unpoppedMembers.push(action.payload);
    },
    removeMember: (state, action: PayloadAction<number>) => {
      state.allMembers.filter((member) => member.id !== action.payload);
      state.unpoppedMembers.filter((member) => member.id !== action.payload);
      state.poppedMembers.filter((member) => member.id !== action.payload);
    },
    resetPopped: (state) => {
      state.unpoppedMembers = { ...allMembers };
      state.poppedMembers = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { popMember, addMember, removeMember, resetPopped } =
  memberSlice.actions;

export default memberSlice.reducer;
