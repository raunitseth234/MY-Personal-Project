"""
CLI to create an admin user.
Run: docker-compose exec api python scripts/create_admin.py
"""
import asyncio
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy import select
from app.db.postgres import AsyncSessionLocal
from app.models.all_models import User, UserRole
from app.core.security import hash_password


async def create_admin():
    print("\n=== Rajesh Jewellers — Create Admin User ===\n")

    name = input("Name: ").strip() or "Admin"
    email = input("Email: ").strip()
    phone = input("Phone (10 digits): ").strip()
    password = input("Password (min 8 chars): ").strip()

    if not email or not phone or len(password) < 8:
        print("ERROR: All fields required, password min 8 characters")
        sys.exit(1)

    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(User).where(User.email == email)
        )
        existing = result.scalar_one_or_none()

        if existing:
            if existing.role == UserRole.admin:
                print(f"User {email} is already an admin.")
                return
            existing.role = UserRole.admin
            print(f"Promoted {email} to admin.")
        else:
            user = User(
                name=name,
                email=email.lower(),
                phone=phone,
                password_hash=hash_password(password),
                role=UserRole.admin,
                is_verified=True,
            )
            db.add(user)
            print(f"Admin user created: {email}")

        await db.commit()
        print("\nDone! Login at: POST /api/v1/auth/login")
        print(f'  Body: {{"identifier": "{email}", "password": "your_password"}}')


if __name__ == "__main__":
    asyncio.run(create_admin())
