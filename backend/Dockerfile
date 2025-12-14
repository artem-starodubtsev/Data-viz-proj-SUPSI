FROM python:3.12-slim

# Set a root workdir
WORKDIR /app

# Copy only package files first for better layer caching
COPY . .


RUN pip install --no-cache-dir -r requirements.txt


EXPOSE 8050


CMD ["python", "dash1.py"]
