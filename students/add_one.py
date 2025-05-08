from flask import request, jsonify
from datetime import date
from db.connection import ConnectDB


def add_one() :

    data = request.get_json()
    std_nm = data.get("std_nm")
    bday = data.get("bday")
    phone = data.get("phone")
    erol_dt = date.today().strftime("%Y%m%d")

    print(f"std_nm : [{std_nm}]")
    if std_nm.strip() == "" or bday.strip() == "" or phone.strip() == "" :
        return jsonify(success = False, message="Enter the proper student's information")


    try :
        connect = ConnectDB()
        cursor  = connect.cursor()
        new_std_id=get_new_std_no(cursor)

        insert_query = f" INSERT INTO bm_tbm_std VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(insert_query, (new_std_id, std_nm.strip(), bday, erol_dt, phone))
        connect.commit()

        cursor.close()
        connect.close()
        
        return jsonify({
            "success": True,
            "message": f"Add student {std_nm}'s information successfully",
            "data": data})
    
    except Exception as e :
        return jsonify(success = False, message=str(e))



def get_new_std_no(cursor) :
    cursor.execute("""SELECT LPAD((COALESCE(MAX(std_no)::int, 0) + 1)::text, 5, '0') AS next_std_id
                      FROM bm_tbm_std;""")
    std_no = cursor.fetchall()[0][0]

    return(std_no)

