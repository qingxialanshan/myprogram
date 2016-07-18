# generate 200 random number code 
import random
import string

def gen_code(length):
    return ''.join([random.choice(string.ascii_letters+string.digits) for i in range(length)])

if __name__=="__main__":
    for i in range(200):
        print gen_code(10)
