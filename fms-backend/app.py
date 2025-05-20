from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import pymysql

# Use PyMySQL as MySQL driver
pymysql.install_as_MySQLdb()

app = Flask(__name__)
CORS(app)

# ✅ Correct MySQL URI (replace password if needed)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/cropdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define the Crop model
class Crop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    crop_type = db.Column(db.String(100), nullable=False)
    planted_date = db.Column(db.Date, nullable=False)
    harvest_date = db.Column(db.Date, nullable=True)
    quantity = db.Column(db.Float, nullable=True)
    notes = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "crop_type": self.crop_type,
            "planted_date": self.planted_date.strftime('%Y-%m-%d'),
            "harvest_date": self.harvest_date.strftime('%Y-%m-%d') if self.harvest_date else None,
            "quantity": self.quantity,
            "notes": self.notes,
        }

# Endpoint to add crop
@app.route('/api/crops', methods=['POST'])
def add_crop():
    data = request.json
    print("Received data:", data)  # Debug

    try:
        planted_date = datetime.strptime(data['planted_date'], '%Y-%m-%d').date()
        harvest_date = datetime.strptime(data['harvest_date'], '%Y-%m-%d').date() if data.get('harvest_date') else None
        quantity = float(data['quantity']) if data.get('quantity') not in [None, '', 'null'] else None

        new_crop = Crop(
            name=data['name'],
            crop_type=data['crop_type'],
            planted_date=planted_date,
            harvest_date=harvest_date,
            quantity=quantity,
            notes=data.get('notes')
        )
        db.session.add(new_crop)
        db.session.commit()
        return jsonify({"message": "Crop added successfully", "crop": new_crop.to_dict()}), 201
    except Exception as e:
        print("Error while adding crop:", e)
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
