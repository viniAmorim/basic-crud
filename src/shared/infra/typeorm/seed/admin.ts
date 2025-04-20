import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { AppDataSource } from '../data-source';

async function create() {
  await AppDataSource.initialize();
  const connection = AppDataSource.manager;

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at)
     VALUES('${id}','admin', 'admin@rentx.com.br', '${password}', true, 'now()')`,
  );

  await AppDataSource.destroy();
}

create().then(() => console.log('User admin created!'));
