from flask import Flask
from flask import request
from flask import jsonify, session

app = Flask(__name__)
app.secret_key = 'super secret key'

users = {
    'piti': '1234',
    'ham': '4321',
    'pan': '0000'
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if data['username'] in users and data['password'] == users[data['username']]:
        session['username'] = data['username']
        return jsonify({'msg': 'OK', 'username': data['username']})
    else:
        return jsonify({'msg': 'Go Away'}), 401


@app.route('/api/whoami', methods=['GET'])
def whoami():
    if 'username' in session:
        return jsonify({'username': session['username']})
    else:
        return jsonify({'msg': 'not logged in'}), 401


@app.route('/api/logout', methods=['GET'])
def logout():
    session.clear()
    return jsonify({'msg': 'OK'})

app.run(host='0.0.0.0', port=8090, debug=True)
