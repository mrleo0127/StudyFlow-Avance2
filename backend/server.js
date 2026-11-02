
const express = require('express');

const app = express();
const PORT = 3000;

const resources = [
    {
        id: 1,
        title: 'Introducción al cálculo vectorial',
        category: 'Matemáticas',
        description: 'Conceptos fundamentales del cálculo vectorial.'
    },
    {
        id: 2,
        title: 'Fundamentos de programación',
        category: 'Programación',
        description: 'Introducción a la lógica y programación.'
    },
    {
        id: 3,
        title: 'Arquitectura de datos',
        category: 'Bases de datos',
        description: 'Principios de diseño y gestión de datos.'
    },
    {
        id: 4,
        title: 'Redes de computadores',
        category: 'Redes',
        description: 'Fundamentos de comunicación entre dispositivos.'
    },
    {
        id: 5,
        title: 'Física electromagnética',
        category: 'Física',
        description: 'Estudio de campos eléctricos y magnéticos.'
    },
    {
        id: 6,
        title: 'Desarrollo de aplicaciones móviles',
        category: 'Programación',
        description: 'Introducción al desarrollo de aplicaciones móviles.'
    }
];

app.get('/api/resources', (req, res) => {

    
const search = req.query.search || '';

// Normalizar texto: eliminar tildes y convertir a minúsculas
const normalizeText = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

const normalizedSearch = normalizeText(search);

const filteredResources = resources.filter(resource => {

    const text = normalizeText(
        resource.title + ' ' +
        resource.category + ' ' +
        resource.description
    );

    return text.includes(normalizedSearch);
});


    res.json({
        total: filteredResources.length,
        resources: filteredResources
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`StudyFlow API ejecutándose en http://localhost:${PORT}`);
});
