# generate 200 random number code 
# 0002 store the 200 active code number that generate from 0001 to MySQL db
import random
import string
import MySQLdb

def gen_code(length):
    return ''.join([random.choice(string.ascii_letters+string.digits) for i in range(length)])

def save_to_sql(num):
    db = MySQLdb.connect("localhost","root","test")
    cursor = db.cursor()

    sql_create_database = 'create database if not exists activecode_db'
    cursor.execute(sql_create_database)
    db.select_db("activecode_db")

    sql_create_table = 'create table if not exists activetable(code char(32))'
    cursor.execute(sql_create_table)
    cursor.executemany('insert into activetable values(%s)',num)
    db.commit()
    cursor.close()
    db.close()

if __name__=="__main__":
    L = []
    for i in range(200):
        L.append(gen_code(10))
    #print L
    save_to_sql(L)
