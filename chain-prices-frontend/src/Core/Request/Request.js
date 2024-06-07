import axios from 'axios';
import { handleError } from './HandleError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SnackbarEnums } from '../Constants';
import { store } from '../../main';
import { snackbar } from '../Utils';
import ResponseEnums from '../Constants/ResponseEnums';

const baseURL = import.meta.env.VITE_API_URL;

const payloadWithFiles = (payload, files) => {
  const formData = new FormData();
  if (Array.isArray(files)) {
    for (let i=0; i<files.length; i++) {
      formData.append('files', files[i]);
    }
  } else {
    formData.append('files', files);
  }
  formData.append('data', JSON.stringify(payload));
  return formData;
};

export const request = async ({ method='GET', url, payload, files, key, success, failure, preventErrorMessage=false, noToken=false }) => {
  const thunk = createAsyncThunk(`request/${key}`, async (_, thunkAPI) => {
    try { 
      const token = localStorage.getItem("token");
      const headers = noToken ? undefined: { 'Authorization': token};
      const data = files ? payloadWithFiles(payload, files) : payload;
      const response = await axios({ method, headers, baseURL, url, data });
      if (response.data.status === ResponseEnums.SUCCESS) {
        return success?.({ data: response.data.data, thunkAPI });
      }
      if (!preventErrorMessage) {
        snackbar(response.data?.message || "Something went wrong with the server", { variant: SnackbarEnums.ERROR });
      }
      failure?.(response.data);
      return thunkAPI.rejectWithValue(response.data?.message || "Error occurs!");
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
        failure?.(error);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  });
  return store.dispatch(thunk());
};
