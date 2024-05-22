# Import necessary libraries and modules
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) for the app

# Define a route for sending emails
@app.route('/send-email', methods=['POST'])
def send_email():
    # Get JSON data from the request
    data = request.get_json()

    # Check if any data was received
    if data is None:
        return jsonify({'error': 'No data received in the request'}), 400

    # Extract email details from the received data
    to_email = data.get('to')
    subject = data.get('subject')
    content = data.get('content')

    # Check for missing fields and return an error if any are missing
    if not to_email or not subject or not content:
        missing_fields = []
        if not to_email:
            missing_fields.append('to')
        if not subject:
            missing_fields.append('subject')
        if not content:
            missing_fields.append('content')
        error_message = f"Missing fields: {', '.join(missing_fields)}"
        return jsonify({'error': error_message}), 400

    # Create a SendGrid Mail object
    message = Mail(
        from_email='markbosco@protonmail.com',  # Testing email (replace in future)
        to_emails=to_email,
        subject=subject,
        html_content=content)

    try:
        # Send the email using the SendGrid API client
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        return jsonify({'message': 'Email sent successfully!'}), 200
    except Exception as e:
        # Return an error message if the email could not be sent
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    # Set the host to your own IP address for testing on your local network
    app.run(host='0.0.0.0', port=5000, debug=True)