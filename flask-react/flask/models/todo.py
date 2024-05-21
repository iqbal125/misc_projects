
from .db import db
from sqlalchemy.orm import Mapped, mapped_column

class Todo(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    description: Mapped[str]

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
        }
