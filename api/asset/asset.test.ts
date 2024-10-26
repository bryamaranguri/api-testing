import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app'; // Ajusta la ruta según la estructura de tu proyecto

describe('Assets API', () => {
  // Prueba para obtener todos los assets
  it('should get all assets', async () => {
    const response = await request(app).get('/api/assets');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Chequea si la respuesta es un array
  });

  // Prueba para agregar un nuevo asset
  it('should add a new asset', async () => {
    const newAsset = { name: 'Test Asset', type: 'equipment' };
    const response = await request(app)
      .post('/api/assets')
      .send(newAsset);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id'); // Verifica si se crea el asset con un ID
    expect(response.body.name).toBe('Test Asset');
    expect(response.body.type).toBe('equipment');
  });

  // Prueba para actualizar un asset existente
  it('should update an existing asset', async () => {
    const assetId = 1; // Usa un ID válido para la prueba
    const updatedAsset = { name: 'Updated Asset', type: 'software' };
    const response = await request(app)
      .put(`/api/assets/${assetId}`)
      .send(updatedAsset);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated Asset');
    expect(response.body.type).toBe('software');
  });

  // Prueba para eliminar un asset
  it('should delete an asset', async () => {
    const assetId = 1; // Usa un ID válido para la prueba
    const response = await request(app).delete(`/api/assets/${assetId}`);
    expect(response.statusCode).toBe(204); // Código para eliminación exitosa
  });

  // Prueba para manejar error cuando los datos están incompletos
  it('should return 400 if asset data is missing', async () => {
    const response = await request(app).post('/api/assets').send({});
    expect(response.statusCode).toBe(400); // Verifica si el código de respuesta es 400 (solicitud incorrecta)
  });

  // Prueba para manejar error con ID inválido al actualizar
  it('should return 404 if asset ID is invalid', async () => {
    const invalidAssetId = 9999; // Un ID que no existe
    const response = await request(app).put(`/api/assets/${invalidAssetId}`).send({ name: 'Non-existent Asset' });
    expect(response.statusCode).toBe(404); // Verifica si el código de respuesta es 404 (no encontrado)
  });
});
