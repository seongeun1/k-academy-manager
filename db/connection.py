import psycopg2

def ConnectDB() :
    connect = psycopg2.connect(
        dbname  ="postgres" ,
        user    ="postgres" ,
        password="483949"   ,
        host    ="localhost",
        port    ="5432"
    )
    return connect

