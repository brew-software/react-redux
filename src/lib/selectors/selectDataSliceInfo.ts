import { SerializedError } from "@reduxjs/toolkit";
import { DataSlice } from "../state";

export type DataSliceInfo_Ready<T> = {
  data: T;
  dataReady: true;
  error: SerializedError | null;
};

export type DataSliceInfo_Loading<T> = {
  data: T | null;
  dataReady: false;
  error: SerializedError | null;
};

export type DataSliceInfo_Error<T> = {
  data: null;
  dataReady: false;
  error: SerializedError;
};

export type DataSliceInfo<T> =
  | DataSliceInfo_Ready<T>
  | DataSliceInfo_Loading<T>
  | DataSliceInfo_Error<T>;

export function selectDataSliceInfo<AppState, TData>(
  selector: (state: AppState) => DataSlice<TData>
): (state: AppState) => DataSliceInfo<TData> {
  return (state) => {
    const slice = selector(state);

    if (slice.loading)
      return { data: slice.data, dataReady: false, error: slice.error };

    if (slice.data !== null) {
      return { data: slice.data, dataReady: true, error: slice.error };
    }

    return { data: null, dataReady: false, error: slice.error };
  };
}
