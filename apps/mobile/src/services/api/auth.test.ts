import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import type { AuthSessionResponse } from '@skillswap/shared';
import { AUTH_PATHS, fetchSessionUser, login, logout, register } from './auth';
import { configureApiSessionHooks } from './client';
import { ApiError } from './errors';

const USER = {
  id: 'u1',
  email: 'a@b.co',
  displayName: 'Ada',
  avatarUrl: null,
};

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

afterEach(() => {
  mock.restoreAll();
  configureApiSessionHooks({});
});

describe('auth API', () => {
  it('login posts credentials with credentials include and returns user', async () => {
    const fetchMock = mock.method(
      globalThis,
      'fetch',
      async (input: RequestInfo | URL, init?: RequestInit) => {
        assert.equal(String(input), `http://127.0.0.1:4000${AUTH_PATHS.login}`);
        assert.equal(init?.method, 'POST');
        assert.equal(init?.credentials, 'include');
        assert.equal(
          init?.headers && (init.headers as Record<string, string>)['Content-Type'],
          'application/json',
        );
        const payload = JSON.parse(String(init?.body)) as {
          email: string;
          password: string;
        };
        assert.equal(payload.email, 'a@b.co');
        const body: AuthSessionResponse = { user: USER };
        return jsonResponse(200, body);
      },
    );

    const user = await login({ email: 'a@b.co', password: 'secret' });
    assert.deepEqual(user, USER);
    assert.equal(fetchMock.mock.callCount(), 1);
  });

  it('register posts profile fields with credentials include', async () => {
    mock.method(globalThis, 'fetch', async (_input: RequestInfo | URL, init?: RequestInit) => {
      assert.equal(init?.credentials, 'include');
      const payload = JSON.parse(String(init?.body)) as {
        email: string;
        password: string;
        displayName: string;
      };
      assert.equal(payload.displayName, 'Ada');
      return jsonResponse(200, { user: USER } satisfies AuthSessionResponse);
    });

    const user = await register({
      email: 'a@b.co',
      password: 'secret',
      displayName: 'Ada',
    });
    assert.deepEqual(user, USER);
  });

  it('fetchSessionUser GETs /auth/me with credentials include', async () => {
    mock.method(globalThis, 'fetch', async (input: RequestInfo | URL, init?: RequestInit) => {
      assert.equal(String(input), `http://127.0.0.1:4000${AUTH_PATHS.me}`);
      assert.equal(init?.method, 'GET');
      assert.equal(init?.credentials, 'include');
      return jsonResponse(200, { user: USER } satisfies AuthSessionResponse);
    });

    const user = await fetchSessionUser();
    assert.deepEqual(user, USER);
  });

  it('logout POSTs /auth/logout with credentials include', async () => {
    mock.method(globalThis, 'fetch', async (input: RequestInfo | URL, init?: RequestInit) => {
      assert.equal(String(input), `http://127.0.0.1:4000${AUTH_PATHS.logout}`);
      assert.equal(init?.method, 'POST');
      assert.equal(init?.credentials, 'include');
      return new Response(null, { status: 204 });
    });

    await logout();
  });

  it('401 on me invokes onUnauthorized and throws ApiError', async () => {
    let unauthorized = 0;
    configureApiSessionHooks({
      onUnauthorized: () => {
        unauthorized += 1;
      },
    });

    mock.method(globalThis, 'fetch', async () =>
      jsonResponse(401, { error: { message: 'Unauthorized' } }),
    );

    await assert.rejects(
      () => fetchSessionUser(),
      (err: unknown) => {
        assert.ok(err instanceof ApiError);
        assert.equal(err.status, 401);
        assert.equal(err.message, 'Unauthorized');
        return true;
      },
    );
    assert.equal(unauthorized, 1);
  });
});
