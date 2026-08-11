import axios from 'axios';
import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
  it('returns API error message from axios response', () => {
    const error = new axios.AxiosError('Request failed');
    error.response = {
      data: { status: 404, error: 'Not Found', message: 'Report not found', timestamp: '' },
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config: {} as never,
    };

    expect(getErrorMessage(error, 'Fallback')).toBe('Report not found');
  });

  it('returns axios message when response body has no message', () => {
    const error = new axios.AxiosError('Network Error');
    expect(getErrorMessage(error, 'Fallback')).toBe('Network Error');
  });

  it('returns fallback for unknown errors', () => {
    expect(getErrorMessage('oops', 'Something went wrong')).toBe('Something went wrong');
  });
});
