"""
Verify every image URL in the catalog image pool actually loads (HTTP 200).
Run BEFORE seeding so no dead image ships.

    docker compose exec -T api python scripts/verify_images.py
"""
import asyncio
import sys

import httpx

from catalog_data import IMG, u


async def check(client, key, url):
    try:
        r = await client.get(url, follow_redirects=True)
        return key, url, r.status_code
    except Exception as exc:
        return key, url, f"ERR {exc}"


async def main():
    async with httpx.AsyncClient(timeout=20) as client:
        results = await asyncio.gather(
            *[check(client, k, u(v)) for k, v in IMG.items()]
        )
    bad = [(k, url, s) for k, url, s in results if s != 200]
    for k, url, s in sorted(results):
        print(f"{'OK ' if s == 200 else 'BAD'} {s}  {k}")
    print(f"\n{len(results) - len(bad)}/{len(results)} OK")
    if bad:
        print("DEAD:")
        for k, url, s in bad:
            print(f"  {k}: {s}  {url}")
        sys.exit(1)
    print("All image URLs verified.")


if __name__ == "__main__":
    asyncio.run(main())
