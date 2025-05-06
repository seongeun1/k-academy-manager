from flask import request, jsonify
from datetime import date
from db.connection import ConnectDB


def get_one(std_no) :
    print(f"std_no: {std_no}")

    if std_no.strip() == None or len(std_no.strip())!= 5 :
        return jsonify(success = False, message="Enter the proper student number")

    try :
        connect = ConnectDB()
        cursor  = connect.cursor()
        get_query = f"SELECT std_no, std_nm, bday, erol_dt, phone FROM bm_tbm_std WHERE std_no = (%s)"
        cursor.execute(get_query, (std_no,))
        row = cursor.fetchone()

        cursor.close()
        connect.close()
        
        if row :
            data = {
                "std_no" : std_no,
                "std_nm" : row[1].strip(),
                "bday"   : row[2],
                "phone"  : row[4],
                "erol_dt": row[3]
            }

            return jsonify(success = True, data = data)
        else :
            return jsonify(success = False, message = f"No student with {std_no} found")            
            
    except Exception as e :
        return jsonify(success = False, message=str(e))



