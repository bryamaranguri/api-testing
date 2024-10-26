const {
  createAsset,
  deleteAsset,
  getAllAssets,
  getAssetById,
  getAssetBySlug,
  updateAsset,
} = require('./asset.service');

function createHandler(req, res) {
  const { body } = req;

  // Verifica que los campos necesarios estén presentes
  if (!body.name || !body.type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const asset = createAsset(body);
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


function deleteHandler(req, res) {
  const { id } = req.params;

  try {
    const asset = deleteAsset(id);
    if (!asset) {
      res.status(404).json({ error: 'Asset not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getAllHandler(req, res) {
  const assets = getAllAssets();
  res.json(assets);
}

function getByIdHandler(req, res) {
  const { id } = req.params;

  const asset = getAssetById(Number(id));
  if (!asset) {
    res.status(404).json({ error: 'Asset not found' });
    return;
  }

  res.json(asset);
}

function getBySlugHandler(req, res) {
  const { slug } = req.params;

  const asset = getAssetBySlug(slug);
  if (!asset) {
    res.status(404).json({ error: 'Asset not found' });
    return;
  }

  res.json(asset);
}

function updateHandler(req, res) {
  const { body } = req;
  const { id } = req.params;

  try {
    const asset = updateAsset(Number(id), body);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json(asset); // Asegúrate de enviar el asset actualizado
  } catch (error) {
    // Manejar errores específicos aquí, si es necesario
    if (error.message === 'Asset not found') {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(500).json({ error: error.message });
  }
  console.log(req.params.id)
}


module.exports = {
  createHandler,
  deleteHandler,
  getAllHandler,
  getByIdHandler,
  getBySlugHandler,
  updateHandler,
};
