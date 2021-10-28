import random
import hashlib

# Mac/Linux: pip3 install pycryptodome
# Windows: py -m pip install pycryptodome
import Crypto.Util.number as cun
from Crypto.Cipher import AES

rand = random.SystemRandom()
FLAG = b"buckeye{my_flag}"


def diffie_hellman(message: bytes):
    print("Original message : ", FLAG)

    print("Parameter known by Alice and Bob")
    #Generate random prime p
    p = cun.getPrime(512)

    #Choose a generator
    g = 5
    print(f"p = {p}")
    print(f"g = {g}")

    print("***Alice***")
    #Alice / A
    a = rand.randrange(2, p - 1)  # private key
    print("a", a)
    A = pow(g, a, p)  # public key
    # g ^ a === A  (mod p)
    print(f"a = {a}")
    print(f"A = {A}")


    # Bob
    print("***Bob***")
    b = rand.randrange(2, p - 1)  # private key
    B = pow(g, b, p)  # public key
    print(f"b = {b}")
    print(f"B = {B}")
    # B ^ a === (g ^ b) ^ a === g ^ (ab)  (mod p)
    shared_secret_A = pow(B, a, p)
    shared_secret_B = pow(A, b, p)
    print("SharedKeyA", shared_secret_A)
    print("SharedKeyB", shared_secret_B)

    # Use AES, a symmetric cipher, to encrypt the flag using the shared key
    #Encrypt message
    print("***Encrypt message***")
    key = hashlib.sha1(cun.long_to_bytes(shared_secret_A)).digest()[:16]
    cipher = AES.new(key, AES.MODE_ECB)
    ciphertext = cipher.encrypt(message)
    ciphertext.hex()
    cipherFlag = ciphertext.hex()
    print(f"ciphertext = {cipherFlag}")

    #Decrypt message
    print("***Decrypt message***")
    key = hashlib.sha1(cun.long_to_bytes(shared_secret_B)).digest()[:16]
    ciphertext = bytes.fromhex(cipherFlag)
    cipher = AES.new(key, AES.MODE_ECB)
    plain = cipher.decrypt(ciphertext)
    print("flag", plain.decode('utf-8'))

print("Example of Diffe-Hellman implementation")
print()
diffie_hellman(FLAG)
