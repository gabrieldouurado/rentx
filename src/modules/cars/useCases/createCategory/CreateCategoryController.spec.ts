import { hash } from "bcryptjs";
import { randomUUID } from "node:crypto";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

describe("Create Category Controller", () => {
  let connection: DataSource;
  let adminToken: string;

  beforeAll(async () => {
    connection = await createConnection("localhost");
  });

  beforeEach(async () => {
    await connection.runMigrations();

    // Create Administrator
    const id = randomUUID();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, driver_license, created_at)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'avb123','now()')
      `
    );

    const adminSession = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    adminToken = `Bearer ${adminSession.body.token}`;
  });

  afterEach(async () => {
    await connection.dropDatabase();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should be able to create a new category", async () => {
    const response = await request(app)
      .post("/categories")
      .set("Authorization", adminToken)
      .send({
        name: "SuperTest Category",
        description: "This is category of test",
      });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new category if the name category exists", async () => {
    await request(app)
      .post("/categories")
      .set("Authorization", adminToken)
      .send({
        name: "SuperTest Category",
        description: "This is category of test",
      });

    const response = await request(app)
      .post("/categories")
      .set("Authorization", adminToken)
      .send({
        name: "SuperTest Category",
        description: "This is category of test",
      });

    expect(response.status).toBe(400);
  });

  it("Should be able to list categories", async () => {
    const category_1 = request(app)
      .post("/categories")
      .set("Authorization", adminToken)
      .send({
        name: "SuperTestCategoryOne",
        description: "This is category of test",
      });

    const category_2 = request(app)
      .post("/categories")
      .set("Authorization", adminToken)
      .send({
        name: "SuperTestCategoryTwo",
        description: "This is category of test",
      });

    await Promise.all([category_1, category_2]);

    const response = await request(app).get("/categories");

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "SuperTestCategoryOne" }),
        expect.objectContaining({ name: "SuperTestCategoryTwo" }),
      ])
    );
  });
});
