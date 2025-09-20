from argon2 import PasswordHasher
from argon2.exceptions import HashingError, VerifyMismatchError


class PasswordManager:
    _hasher = PasswordHasher(time_cost=3, memory_cost=65536, parallelism=1, hash_len=32, salt_len=16)

    @classmethod
    def hash_password(cls, password: str) -> str:
        if not password:
            raise ValueError("Password cannot be empty")

        try:
            return cls._hasher.hash(password)
        except Exception as e:
            raise HashingError(f"Failed to hash password: {e}")

    @classmethod
    def verify_password(
        cls,
        hashed_password: str,
        password: str,
    ) -> bool:
        if not password or not hashed_password:
            return False

        try:
            cls._hasher.verify(hashed_password, password)
            return True
        except VerifyMismatchError:
            return False
        except Exception:
            return False
