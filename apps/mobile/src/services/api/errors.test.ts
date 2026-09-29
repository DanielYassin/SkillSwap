import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ApiError, isApiErrorBody } from './errors';

describe('ApiError', () => {
  it('carries status and details', () => {
    const err = new ApiError('Nope', 401, { reason: 'expired' });
    assert.equal(err.message, 'Nope');
    assert.equal(err.status, 401);
    assert.deepEqual(err.details, { reason: 'expired' });
    assert.equal(err.name, 'ApiError');
  });
});

describe('isApiErrorBody', () => {
  it('accepts the SkillSwap envelope', () => {
    assert.equal(
      isApiErrorBody({ error: { message: 'Unauthorized', details: {} } }),
      true,
    );
  });

  it('rejects malformed payloads', () => {
    assert.equal(isApiErrorBody(null), false);
    assert.equal(isApiErrorBody({ message: 'x' }), false);
    assert.equal(isApiErrorBody({ error: { message: 1 } }), false);
  });
});
