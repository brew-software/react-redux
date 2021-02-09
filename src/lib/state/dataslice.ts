import { SerializedError } from "@reduxjs/toolkit";

export type DataSlice<T> = {
  data: T | null;
  loading: boolean;
  error: SerializedError | null;
};
