# 0004: count the word in the txt
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
    print dic 
    return dic

if __name__=="__main__":
    #print count_word(sys.argv[1],sys.argv[2])
    find_in_file(sys.argv[1])
