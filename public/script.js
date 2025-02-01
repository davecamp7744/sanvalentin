function enviarRespuesta(respuesta) {
    fetch('/api/respuesta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuesta })
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect; // Redirige si es "Sí"
        } else {
            alert(data.mensaje);
        }
    })
    .catch(error => console.error('Error:', error));
}
