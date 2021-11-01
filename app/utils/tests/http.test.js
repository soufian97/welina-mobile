import * as HttpClient from '../http';
jest.unmock('../http');

describe('test suite for http service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('HTTP_METHODS enum should have the correct http methods name', () => {
    expect(HttpClient.HTTP_METHODS.GET).toEqual({ method: 'GET' });
    expect(HttpClient.HTTP_METHODS.POST).toEqual({ method: 'POST' });
    expect(HttpClient.HTTP_METHODS.DELETE).toEqual({ method: 'DELETE' });
    expect(HttpClient.HTTP_METHODS.PUT).toEqual({ method: 'PUT' });
  });
  it('responseMiddleware predicate should return promise with response params if status is ok', async () => {
    const response = {
      status: '',
      ok: true,
    };
    const receivedResponse = await HttpClient.responseMiddleware(response);
    expect(receivedResponse).toEqual(response);
  });
  it('responseMiddleware predicate should reject promise with Error when status >=400', async () => {
    const response = {
      status: 401,
      ok: false,
      statusText: 'error',
      text: jest.fn(),
    };
    try {
      await HttpClient.responseMiddleware(response);
    } catch (e) {
      expect(response.text).toHaveBeenCalled();
      expect(e.status).toEqual(response.status);
      expect(e.message).toEqual(response.statusText);
    }
  });
  it('request should execute without error and return {} if response if empty', async () => {
    const text = jest.fn().mockImplementation(() => '');
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ text, ok: true }));

    const expected = await HttpClient.request('dummyURL', {});
    expect(text).toHaveBeenCalled();
    expect(expected).toEqual({});
  });

  it('request should execute without error and return parsed Object  if response if not  empty', async () => {
    const text = jest.fn().mockImplementation(() => '{"provider":"hero"}');
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ text, ok: true }));

    const expected = await HttpClient.request('dummyURL', {});
    expect(text).toHaveBeenCalled();
    expect(expected).toEqual({ provider: 'hero' });
  });
  it('requestForBold should execute without error', async () => {
    const blob = jest.fn();
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ blob, ok: true }));
    const errOut = jest.spyOn(global.console, 'error');
    await HttpClient.requestForBlob('dummyURL', {});
    expect(blob).toHaveBeenCalled();
    expect(errOut).not.toHaveBeenCalled();
  });
});
