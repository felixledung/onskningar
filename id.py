import string
import secrets
import hashlib
import uuid
from datetime import datetime
import json
import os

# Generera en slumpmässig sträng med kryptografisk säkerhet
def generate_random_string(length=4):  # Justera längd om nödvändigt
    characters = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(characters) for _ in range(length))

# Generera en kompakt hash
def generate_compact_hash(seed):
    return hashlib.sha256(seed.encode()).hexdigest()[:4].upper()  # Kortare hash

# Generera ett unikt ID med specifika utgångsdatum
def generate_unique_update_id(update_number):
    now = datetime.now()
    expiry_date = datetime(year=now.year + (1 if now.month > 6 or (now.month == 6 and now.day >= 29) else 0), month=12, day=24)

    unique_uuid = uuid.uuid4().hex[:4].upper()  # Kortare UUID
    random_str = generate_random_string()
    date_time_str = now.strftime("%y%m%d")  # Datum utan tid för kortare ID

    hash_seed = f"{update_number}{date_time_str}{random_str}"
    compact_hash = generate_compact_hash(hash_seed)

    update_id = f"{date_time_str}-{compact_hash}-{random_str}"  # Kortare ID-struktur
    log_id(update_id, now, expiry_date)

    return {
        'id': update_id,
        'created_at': now.isoformat(),
        'expires_at': expiry_date.isoformat()
    }

# Logga ID:n i en JSON-fil
def log_id(update_id, created_at, expires_at, log_filename="id_log.json"):
    data = []
    if os.path.exists(log_filename):
        with open(log_filename, "r") as file:
            data = json.load(file)
    data.append({
        "ID": update_id,
        "Created At": created_at.isoformat(),
        "Expires At": expires_at.isoformat()
    })
    with open(log_filename, "w") as file:
        json.dump(data, file, indent=4)

# Validera ID:s format
def validate_id(id_str):
    parts = id_str.split('-')
    return len(parts) == 3 and len(parts[0]) == 6 and len(parts[1]) == 4 and len(parts[2]) >= 4

# Exempel på att generera ett säkert och tidsbegränsat ID
unique_id_data = generate_unique_update_id(1)
print("Användarvänligt ID:", unique_id_data['id'])
print("Skapades vid:", unique_id_data['created_at'])
print("Går ut vid:", unique_id_data['expires_at'])

# Validera ID:t
print("ID:t är giltigt:", validate_id(unique_id_data['id']))