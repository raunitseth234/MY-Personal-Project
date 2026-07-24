"""
AWS S3 Storage Service for product image uploads.

CURRENT STATE: Returns 501 if AWS keys not configured.
TO ACTIVATE:
  Add to .env:
    AWS_ACCESS_KEY_ID=AKIA...
    AWS_SECRET_ACCESS_KEY=your_secret
    AWS_REGION=ap-south-1
    AWS_S3_BUCKET=rajesh-jewellers-images

  Then create the bucket in AWS console with:
    - Block Public Access: OFF (images need to be public)
    - Bucket Policy: allow GetObject for *
    - CORS: allow PUT from your frontend domain
"""
import uuid
import logging
from fastapi import HTTPException
from app.core.config import settings

logger = logging.getLogger("rajesh.storage")


class StorageService:
    def __init__(self):
        self.s3_client = None
        if self._is_configured():
            try:
                import boto3
                self.s3_client = boto3.client(
                    "s3",
                    region_name=settings.AWS_REGION,
                    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                )
            except ImportError:
                logger.warning("boto3 not installed. Run: pip install boto3")

    def _is_configured(self) -> bool:
        return bool(
            settings.AWS_ACCESS_KEY_ID
            and settings.AWS_SECRET_ACCESS_KEY
            and settings.AWS_S3_BUCKET
        )

    async def generate_presigned_url(self, product_id: str, content_type: str = "image/jpeg") -> dict:
        """
        Generates a presigned S3 PUT URL.
        Frontend uploads image directly to S3 using this URL,
        then calls /confirm endpoint to save the URL in DB.

        Flow:
          1. Admin calls POST /admin/products/{id}/images/presign
          2. Gets presigned_url + public_url back
          3. Frontend does PUT presigned_url with image file
          4. Admin calls POST /admin/products/{id}/images/confirm {image_url: public_url}
        """
        if not self._is_configured():
            raise HTTPException(
                status_code=501,
                detail={
                    "code": "S3_NOT_CONFIGURED",
                    "message": "AWS credentials not set. Add AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET to .env",
                },
            )

        if not self.s3_client:
            raise HTTPException(status_code=501, detail={"code": "S3_CLIENT_INIT_FAILED"})

        file_key = f"products/{product_id}/{uuid.uuid4().hex}.jpg"
        bucket = settings.AWS_S3_BUCKET
        region = settings.AWS_REGION

        presigned_url = self.s3_client.generate_presigned_url(
            "put_object",
            Params={
                "Bucket": bucket,
                "Key": file_key,
                "ContentType": content_type,
            },
            ExpiresIn=300,  # 5 minutes
        )

        public_url = f"https://{bucket}.s3.{region}.amazonaws.com/{file_key}"

        return {
            "presigned_url": presigned_url,
            "public_url": public_url,
            "key": file_key,
            "expires_in": 300,
            "instructions": "PUT image file to presigned_url, then call /confirm with public_url",
        }

    async def delete_image(self, file_key: str) -> bool:
        """Deletes an image from S3 by its key."""
        if not self.s3_client or not self._is_configured():
            logger.warning(f"[S3 STUB] Would delete key: {file_key}")
            return False

        self.s3_client.delete_object(Bucket=settings.AWS_S3_BUCKET, Key=file_key)
        return True
