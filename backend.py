from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from itsdangerous import URLSafeTimedSerializer
from datetime import datetime, timedelta
import hashlib
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///twitter_clone.db'  # Use a real database in production
app.config['SECRET_KEY'] = 'your-secret-key'

db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=True)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class PasswordResetToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reset_token = db.Column(db.String(64), unique=True, nullable=False)
    expiration = db.Column(db.DateTime, nullable=False)
    used = db.Column(db.Boolean, default=False)

# Utility Functions
def generate_token(user_id):
    token = hashlib.sha256(f"{user_id}{random.random()}".encode()).hexdigest()
    expiration = datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
    new_token = PasswordResetToken(user_id=user_id, reset_token=token, expiration=expiration)
    db.session.add(new_token)
    db.session.commit()
    return token

def send_reset_email(email, token):
    reset_link = f"https://yourdomain.com/reset-password?token={token}"
    # Send email logic (use an email sending service like SendGrid, Mailgun, etc.)
    print(f"Sending reset link: {reset_link}")

# API Endpoints
@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email_or_phone = data.get('emailOrPhone')

    user = User.query.filter((User.email == email_or_phone) | (User.phone == email_or_phone)).first()
    
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    # Generate and send the reset token
    token = generate_token(user.id)
    send_reset_email(user.email, token)
    
    return jsonify({"success": True, "message": "Reset link sent"})

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('newPassword')

    reset_token_entry = PasswordResetToken.query.filter_by(reset_token=token, used=False).first()
    
    if not reset_token_entry or reset_token_entry.expiration < datetime.utcnow():
        return jsonify({"success": False, "message": "Invalid or expired token"}), 400

    user = User.query.get(reset_token_entry.user_id)
    user.password_hash = hashlib.sha256(new_password.encode()).hexdigest()  # Hash the new password
    reset_token_entry.used = True

    db.session.commit()
    
    return jsonify({"success": True, "message": "Password reset successful"})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
