import { hash } from "bcryptjs";
import { randomUUID } from "node:crypto";

import { createConnection } from "@shared/infra/typeorm";

async function create() {
  const connection = await createConnection();

  const id = randomUUID();
  const password = await hash("admin", 8);

  connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, driver_license, created_at)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'avb123','now()')
    `
  );

  await connection.destroy();
}

create().then(() => {
  console.log("User admin created");
});
