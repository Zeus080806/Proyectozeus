const request = require('supertest');
const app = require('../js/principal'); 

describe('Pruebas de Regresión para Funcionario', () => {
    afterAll((done) => {
        Server.close(done);
    });


  it('Debe mostrar la página principal', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<h1>Bienvenido</h1>');
  });

  it('Debe registrar un nuevo funcionario', async () => {
    const response = await request(app)
      .post('/registrar-funcionario')
      .send({
        IDusuarios: '1',
        cedula: '123456789',
        nombres: 'Juan',
        apellidos: 'Perez',
        correo: 'juan.perez@example.com',
        EPS: 'EPS1',
        FP: 'salud',
        hijos: '2',
        estadocivil: 'soltero',
      });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Funcionario registrado con exito');
  });

  it('Debe eliminar un funcionario', async () => {
    const response = await request(app).delete('/eliminar-funcionario').send({ id: 1 });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Funcionario eliminado con éxito');
  });
});
