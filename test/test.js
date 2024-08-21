const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conexion = require('../js/bd'); 
const methodOverride = require('method-override');

const app = require('../js/principal'); 

describe('Test de Endpoints', () => {
    afterAll(() => {
        conexion.end((err) => {
            if (err) {
                console.error('Error al cerrar la conexion a la base de datos:', err.stack);
                done(err);
            }else {
                //console.log('Conexion a la base de datos cerrada');
                done();
            }
        });
    });

    it('Debe mostrar la página principal', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Bienvenido'); 
    });

    it('Debe registrar un nuevo funcionario', async () => {
        const response = await request(app)
            .post('/fun')
            .send({
                IDusuarios: '1',
                cedula: '123456789',
                nombres: 'Juan',
                apellidos: 'Perez',
                correo: 'juan.perez@example.com',
                EPS: 'EPS1',
                FP: 'salud',
                hijos: '2',
                estadocivil: 'soltero'
            });
        expect(response.status).toBe(200);
        expect(response.text).toBe('Funcionario registrado con exito');
    });

    it('Debe eliminar un funcionario', async () => {
        const response = await request(app).delete('/funcionarios/1');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Funcionario eliminado correctamente');
    });

    // Agrega más pruebas según sea necesario
});
