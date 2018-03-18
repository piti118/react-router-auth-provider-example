from flask import Flask
from flask import request
from flask import jsonify, session

app = Flask(__name__)
app.secret_key = 'super secret key'

users = {
    'piti': dict(username='piti', password='1234', roles=['admin', 'user']),
    'ham': dict(username='ham', password='4321', roles=['user']),
    'pan': dict(username='pan', password='0000', roles=['user'])
}

def cleanAuthInfo(auth_info):
    # remove password from authInfo
    return { k:v for k,v in auth_info.items() if k != 'password' }

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username, password = data['username'], data['password']
    if username in users and password == users[username]['password']:
        authInfo = cleanAuthInfo(users[username])
        session['auth_info'] = users[username]
        return jsonify(authInfo)
    else:
        return jsonify({'msg': 'Go Away'}), 401


@app.route('/api/whoami', methods=['GET'])
def whoami():
    if 'username' in session:
        return jsonify(session['auth_info'])
    else:
        return jsonify({'msg': 'not logged in'}), 401


@app.route('/api/logout', methods=['GET'])
def logout():
    session.clear()
    return jsonify({'msg': 'OK'})

app.run(host='0.0.0.0', port=8090, debug=True)
