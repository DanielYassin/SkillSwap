import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { defaultLocalApiUrl, parseAppEnv, resolveLocalApiHost } from './env-helpers';

describe('parseAppEnv', () => {
  it('accepts known values and defaults unknown to local', () => {
    assert.equal(parseAppEnv('local'), 'local');
    assert.equal(parseAppEnv('preview'), 'preview');
    assert.equal(parseAppEnv('production'), 'production');
    assert.equal(parseAppEnv(undefined), 'local');
    assert.equal(parseAppEnv('staging'), 'local');
  });
});

describe('resolveLocalApiHost', () => {
  it('maps android to emulator loopback and others to localhost', () => {
    assert.equal(resolveLocalApiHost('android'), '10.0.2.2');
    assert.equal(resolveLocalApiHost('ios'), '127.0.0.1');
    assert.equal(resolveLocalApiHost('web'), '127.0.0.1');
  });
});

describe('defaultLocalApiUrl', () => {
  it('builds platform-aware local URLs', () => {
    assert.equal(defaultLocalApiUrl('android'), 'http://10.0.2.2:4000');
    assert.equal(defaultLocalApiUrl('ios'), 'http://127.0.0.1:4000');
  });
});
