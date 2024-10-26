import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app'; // Asegúrate de ajustar la ruta a tu estructura real

describe('Tasks API', () => {
  it('should get all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Chequea si la respuesta es un array
  });

  it('should add a new task', async () => {
    const newTask = { title: 'Test Task', description: 'This is a test task' };
    const response = await request(app)
      .post('/api/tasks')
      .send(newTask);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id'); // Comprueba si se crea una nueva tarea
  });

  it('should update an existing task', async () => {
    const taskId = 1; // Asegúrate de usar un ID válido para la prueba
    const updatedTask = { title: 'Updated Task', description: 'Updated description' };
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send(updatedTask);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Task');
  });

  it('should delete a task', async () => {
    const taskId = 1; // Asegúrate de usar un ID válido
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(204); // Código para eliminación exitosa
  });

  it('should return 400 if task data is missing', async () => {
    const response = await request(app).post('/api/tasks').send({});
    expect(response.statusCode).toBe(400); // Verifica si el código de respuesta es 400 (solicitud incorrecta)
  });

  it('should return 404 if task ID is invalid', async () => {
    const invalidTaskId = 9999; // Un ID que no existe
    const response = await request(app).put(`/api/tasks/${invalidTaskId}`).send({ title: 'Non-existent Task' });
    expect(response.statusCode).toBe(404); // Verifica si el código de respuesta es 404 (no encontrado)
  });


});
