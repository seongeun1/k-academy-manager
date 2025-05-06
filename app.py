from flask import Flask
from students import add_one, update_one, get_one, remove_one
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.add_url_rule('/students/<std_no>', view_func=remove_one, methods=['DELETE'])
app.add_url_rule('/students/<std_no>', view_func=get_one, methods=['GET'])
app.add_url_rule('/students/<std_no>', view_func=update_one, methods=['PATCH'])
app.add_url_rule('/students', view_func=add_one, methods=['POST'])


if __name__ == '__main__':
    app.run(debug=True)