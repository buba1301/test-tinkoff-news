import { dataFromServer } from './data';

export const mockApi = {
  getData: () => Promise.resolve(dataFromServer),
};
