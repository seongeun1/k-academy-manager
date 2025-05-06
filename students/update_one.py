from flask import request, jsonify
from datetime import date
from db.connection import ConnectDB


def update_one(std_no) :
    print(f"std_no: {std_no}")
    data = request.get_json()

    print(data)
    std_nm = data.get("std_nm")
    bday = data.get("bday")
    phone = data.get("phone")


    if std_no.strip() == "" or len(std_no.strip())!= 5 :
        return jsonify(success = False, message="Enter the proper student number")
    
    std_nm = std_nm.strip() if std_nm and std_nm.strip() != '' else None
    bday = bday.strip() if bday and bday.strip() != '' else None
    phone = phone.strip() if phone and phone.strip() != '' else None


    try :
        connect = ConnectDB()
        cursor  = connect.cursor()
        update_query = f"UPDATE bm_tbm_std SET std_nm = COALESCE(%s, std_nm), bday = COALESCE(%s, bday), phone = COALESCE(%s, phone) WHERE std_no = (%s)"
        cursor.execute(update_query, (std_nm, bday, phone, std_no))
        connect.commit()

        cursor.close()
        connect.close()
        
        return jsonify(success = True, message = f"Successfully updated Student {std_no}'s information")
    
    except Exception as e :
        return jsonify(success = False, message=str(e))



