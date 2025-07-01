from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.message import EmailMessage

app = Flask(__name__)
CORS(app)  # Allow frontend to call the API

# === Configure Your Email Credentials ===
EMAIL_ADDRESS = 'fatimahbaloch917@gmail.com'         # ← change this to your Gmail
EMAIL_PASSWORD = 'qptupsphwifccuyt'      # ← use your Gmail App Password

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        print("✅ Received data:", data)

        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name or not email or not message:
            return jsonify({'status': 'fail', 'reason': 'Missing fields'}), 400

        msg = EmailMessage()
        msg['Subject'] = f'New Message from {name}'
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS
        msg.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")

        print("📤 Sending email...")

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)

        print("✅ Email sent successfully.")
        return jsonify({'status': 'success'}), 200

    except Exception as e:
        print("💥 Error sending email:", e)
        return jsonify({'status': 'fail', 'reason': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
