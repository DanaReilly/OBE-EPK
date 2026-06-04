exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const { email, name } = JSON.parse(event.body);

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.MAILERLITE_API_TOKEN}`
    },
    body: JSON.stringify({
      email,
      fields: { name },
      groups: ['188093495547791263']
    })
  });

  const data = await res.json();
  return {
    statusCode: res.status,
    body: JSON.stringify(data)
  };
};
