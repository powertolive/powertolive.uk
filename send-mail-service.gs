function doPost(e) {
  var result = {};
  var to = 'info@powertolive.uk';
  var from = 'Power to Live Foundation Website';
  var subject = 'Online Contact Form';
  var message = [
    'Name: ' + e.parameters.name,
    'Email: ' + e.parameters.email,
    'Phone: ' + e.parameters.phone,
    'Consent: ' + e.parameters.consent,
    'Date: ' + e.parameters.date,
    'Time: ' + e.parameters.time,
    'Message: ' + e.parameters.message,
  ].join('\n');
  try {
    MailApp.sendEmail({
      name: from,
      replyTo: to,
      to: to,
      subject: subject,
      body: message
    });
  } catch (err) {
    result.error = err;
  }
  return ContentService.createTextOutput(JSON.stringify(result));
}