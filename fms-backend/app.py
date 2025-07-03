from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import pymysql
from sqlalchemy import func  # For aggregate functions like sum

pymysql.install_as_MySQLdb()

app = Flask(__name__)
CORS(app)

# MySQL DB config 
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/cropdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Crop Model ---
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

# --- Income Model ---
class Income(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    source = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    notes = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date.strftime('%Y-%m-%d'),
            "source": self.source,
            "amount": self.amount,
            "notes": self.notes,
        }

# --- Expense Model ---
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    notes = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date.strftime('%Y-%m-%d'),
            "category": self.category,
            "amount": self.amount,
            "notes": self.notes,
        }

# --- Stock Model ---
class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    purchase_date = db.Column(db.Date, nullable=True)
    expiry_date = db.Column(db.Date, nullable=True)
    supplier = db.Column(db.String(100), nullable=True)
    min_quantity = db.Column(db.Integer, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "quantity": self.quantity,
            "unit": self.unit,
            "purchase_date": self.purchase_date.strftime('%Y-%m-%d') if self.purchase_date else None,
            "expiry_date": self.expiry_date.strftime('%Y-%m-%d') if self.expiry_date else None,
            "supplier": self.supplier,
            "min_quantity": self.min_quantity,
        }

# --- Endpoint to get all stock ---
@app.route('/api/stock', methods=['GET'])
def get_all_stock():
    try:
        stocks = Stock.query.all()
        return jsonify([stock.to_dict() for stock in stocks]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Endpoint to add new stock ---
@app.route('/api/stock', methods=['POST'])
def add_stock():
    data = request.json
    try:
        new_stock = Stock(
            name=data['name'],
            category=data['category'],
            quantity=int(data['quantity']),
            unit=data['unit'],
            purchase_date=datetime.strptime(data['purchase_date'], '%Y-%m-%d').date() if data.get('purchase_date') else None,
            expiry_date=datetime.strptime(data['expiry_date'], '%Y-%m-%d').date() if data.get('expiry_date') else None,
            supplier=data.get('supplier'),
            min_quantity=int(data['min_quantity']) if data.get('min_quantity') else 0
        )
        db.session.add(new_stock)
        db.session.commit()
        return jsonify({"message": "Stock added successfully", "stock": new_stock.to_dict()}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- Endpoint to delete stock by id ---
@app.route('/api/stock/<int:stock_id>', methods=['DELETE'])
def delete_stock(stock_id):
    try:
        stock = Stock.query.get(stock_id)
        if not stock:
            return jsonify({"error": "Stock not found"}), 404
        db.session.delete(stock)
        db.session.commit()
        return jsonify({"message": "Stock deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- Endpoint to add crop ---
@app.route('/api/crops', methods=['POST'])
def add_crop():
    data = request.json
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
        return jsonify({"error": str(e)}), 400

# --- Endpoint to add income ---
@app.route('/api/income', methods=['POST'])
def add_income():
    data = request.json
    try:
        income = Income(
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            source=data['source'],
            amount=float(data['amount']),
            notes=data.get('notes')
        )
        db.session.add(income)
        db.session.commit()
        return jsonify({"message": "Income added successfully", "income": income.to_dict()}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- Endpoint to add expense ---
@app.route('/api/expense', methods=['POST'])
def add_expense():
    data = request.json
    try:
        expense = Expense(
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            category=data['category'],
            amount=float(data['amount']),
            notes=data.get('notes')
        )
        db.session.add(expense)
        db.session.commit()
        return jsonify({"message": "Expense added successfully", "expense": expense.to_dict()}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- Endpoint to get income vs expense summary for pie chart ---
@app.route('/api/finance-summary', methods=['GET'])
def get_finance_summary():
    try:
        total_income = db.session.query(func.sum(Income.amount)).scalar() or 0
        total_expense = db.session.query(func.sum(Expense.amount)).scalar() or 0

        return jsonify({
            "total_income": total_income,
            "total_expense": total_expense
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- get all crop details for view page ---
@app.route('/api/crops', methods=['GET'])
def get_all_crops():
    try:
        crops = Crop.query.all()
        return jsonify([crop.to_dict() for crop in crops]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Delete Crop ---
@app.route('/api/crops/<int:crop_id>', methods=['DELETE'])
def delete_crop(crop_id):
    try:
        crop = Crop.query.get(crop_id)
        if not crop:
            return jsonify({'error': 'Crop not found'}), 404
        db.session.delete(crop)
        db.session.commit()
        return jsonify({'message': 'Crop deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    # --- Get all income entries ---
@app.route('/api/income', methods=['GET'])
def get_all_income():
    try:
        incomes = Income.query.order_by(Income.date.desc()).all()
        return jsonify([income.to_dict() for income in incomes]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Get all expense entries ---
@app.route('/api/expense', methods=['GET'])
def get_all_expense():
    try:
        expenses = Expense.query.order_by(Expense.date.desc()).all()
        return jsonify([expense.to_dict() for expense in expenses]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# --- Delete Income ---
@app.route('/api/income/<int:income_id>', methods=['DELETE'])
def delete_income(income_id):
    try:
        income = Income.query.get(income_id)
        if not income:
            return jsonify({'error': 'Income not found'}), 404
        db.session.delete(income)
        db.session.commit()
        return jsonify({'message': 'Income deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Delete Expense ---
@app.route('/api/expense/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    try:
        expense = Expense.query.get(expense_id)
        if not expense:
            return jsonify({'error': 'Expense not found'}), 404
        db.session.delete(expense)
        db.session.commit()
        return jsonify({'message': 'Expense deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500




# --- Run Server ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Creates tables if they don't exist
    app.run(debug=True)