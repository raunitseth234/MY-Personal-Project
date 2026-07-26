"""Fast, isolated unit tests for password hashing and JWT token handling.

These call the pure, synchronous helpers in `app.core.security` (no DB/Redis —
the async `get_current_user` dependency needs Redis and is covered by the
integration suite instead). Runs with `pytest app/tests/unit` and zero services;
config is read from `.env` at import, same as the app.
"""
import uuid

import pytest
from fastapi import HTTPException

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)


# ── Password hashing ──────────────────────────────────────────────────


def test_hash_password_is_not_plaintext():
    hashed = hash_password("testpass123")
    assert hashed != "testpass123"
    assert hashed.startswith("$2")  # bcrypt marker


def test_verify_password_roundtrip():
    hashed = hash_password("s3cret-password")
    assert verify_password("s3cret-password", hashed) is True
    assert verify_password("wrong-password", hashed) is False


def test_hash_password_is_salted():
    # Same input, two hashes → different (random salt), both verify.
    a = hash_password("samepass")
    b = hash_password("samepass")
    assert a != b
    assert verify_password("samepass", a)
    assert verify_password("samepass", b)


# ── Access tokens ─────────────────────────────────────────────────────


def test_access_token_roundtrip_carries_claims():
    user_id = str(uuid.uuid4())
    token = create_access_token(user_id, "customer")
    payload = decode_token(token)
    assert payload["sub"] == user_id
    assert payload["role"] == "customer"
    assert payload["type"] == "access"
    assert "jti" in payload
    assert "exp" in payload


def test_access_tokens_have_unique_jti():
    uid = str(uuid.uuid4())
    a = decode_token(create_access_token(uid, "customer"))
    b = decode_token(create_access_token(uid, "customer"))
    assert a["jti"] != b["jti"]


# ── Refresh tokens ────────────────────────────────────────────────────


def test_refresh_token_returns_matching_jti():
    uid = str(uuid.uuid4())
    token, jti = create_refresh_token(uid, "admin")
    payload = decode_token(token)
    assert payload["type"] == "refresh"
    assert payload["jti"] == jti
    assert payload["sub"] == uid
    assert payload["role"] == "admin"


# ── decode_token failure modes ────────────────────────────────────────


def test_decode_invalid_token_raises_401():
    with pytest.raises(HTTPException) as exc:
        decode_token("not-a-real-jwt")
    assert exc.value.status_code == 401
    assert exc.value.detail["code"] == "INVALID_TOKEN"


def test_decode_token_tampered_signature_raises_401():
    token = create_access_token(str(uuid.uuid4()), "customer")
    tampered = token[:-4] + ("aaaa" if not token.endswith("aaaa") else "bbbb")
    with pytest.raises(HTTPException) as exc:
        decode_token(tampered)
    assert exc.value.status_code == 401
