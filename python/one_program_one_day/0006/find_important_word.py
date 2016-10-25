# 0006: find the key words in the txt file

import re
import sys

def find_in_file(fname):
    s=open(fname,"r").readlines()
    dic={}
    for sl in s:
        for i in re.split(r'[,.! ]',sl):
            if i!="" :
                if i not in dic.keys():
                    dic[i]=1
                else:
                    dic[i]=dic[i]+1
    return dic
def find_key_word(infile):
    word_count_dic = find_in_file(infile)
    return sorted(word_count_dic.items(), key=lambda x:x[1])[-1][0]

if __name__=="__main__":
    print find_key_word(sys.argv[1])
    
