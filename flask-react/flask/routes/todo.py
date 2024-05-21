from flask import request, jsonify, abort
from flask import Blueprint
from models.todo import Todo
from models.db import db

todo_blueprint = Blueprint('todos', __name__)

@todo_blueprint.route('/todos')
def list_todos():
    todos = Todo.query.all()
    return jsonify([todo.to_dict() for todo in todos])


@todo_blueprint.route('/todo', methods=['POST'])
def create_task():
    if not request.json or not 'title' in request.json:
        abort(400)
    task = Todo(
        title=request.json['title'],
        description=request.json.get('description', ""),
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

@todo_blueprint.route('/todos/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    user = Todo.query.get_or_404(todo_id)
    return jsonify(user.to_dict())