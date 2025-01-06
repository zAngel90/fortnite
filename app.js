document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('json-container');

    function syntaxHighlight(json) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, null, 2);
        }
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    try {
        // Hacer la petición a la API de Fortnite
        const response = await fetch('https://fortniteapi.io/v2/shop?lang=en', {
            headers: {
                'Authorization': 'eafc4329-54aeed01-a90cd52b-f749534c'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Mostrar el JSON con formato y colores
        container.innerHTML = syntaxHighlight(data);

    } catch (error) {
        container.innerHTML = `Error loading API response: ${error.message}`;
        console.error('Error:', error);
    }
});
