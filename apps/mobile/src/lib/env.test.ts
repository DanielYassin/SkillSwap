import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  defaultLocalApiUrl,
  parseAppEnv,
  resolveApiUrl,
  resolveLocalApiHost,
} from './env-helpers';

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

describe('resolveApiUrl', () => {
  it('prefers configured URL and strips trailing slash', () => {
    assert.equal(
      resolveApiUrl({
        appEnv: 'local',
        configuredUrl: 'http://10.0.2.2:4000/',
        platformOs: 'android',
      }),
      'http://10.0.2.2:4000',
    );
  });

  it('uses platform local default when unset in local env', () => {
    assert.equal(
      resolveApiUrl({ appEnv: 'local', platformOs: 'android' }),
      'http://10.0.2.2:4000',
    );
  });

  it('requires explicit URL outside local', () => {
    assert.throws(() =>
      resolveApiUrl({ appEnv: 'preview', platformOs: 'ios' }),
    );
  });
});
