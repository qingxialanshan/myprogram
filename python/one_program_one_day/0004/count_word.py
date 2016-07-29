# 0004: count the word in the txt
import re
import sys

def count_word(fname,word):
    s = open(fname,'r').read()
    num = len(re.findall('\s'+word+'\s',s))
    return num

if __name__=="__main__":
    print count_word(sys.argv[1],sys.argv[2])
