from routes.todo import todo_blueprint
from models.db import db
from flask import Flask

app = Flask(__name__)

app.register_blueprint(todo_blueprint)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

db.init_app(app)


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)