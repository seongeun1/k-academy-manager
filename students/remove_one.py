from flask import request, jsonify
from datetime import date
from db.connection import ConnectDB


def remove_one(std_no) :
    print(f"std_no: {std_no}")
     
    if std_no.strip() == "" or len(std_no.strip())!= 5 :
        return jsonify(success = False, message="Enter the proper student number")


    try :
        connect = ConnectDB()
        cursor  = connect.cursor()
        remove_query = f"DELETE FROM bm_tbm_std where std_no = (%s)"
        cursor.execute(remove_query, (std_no,))
        connect.commit()

        cursor.close()
        connect.close()
        
        return jsonify(success = True, message = f"Successfully removed Student {std_no}'s information")
    
    except Exception as e :
        return jsonify(success = False, message=str(e))



