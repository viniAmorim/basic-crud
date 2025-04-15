import 'reflect-metadata';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { app } from './app';

const PORT = 3333;
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log('🚀 Server running on port 3333'));
  })
  .catch((error) =>
    console.error('❌ Data Source initialization error', error),
  );
