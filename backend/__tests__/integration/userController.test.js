const { createUser } = require('../../src/controllers/userController');

// Mock de models/index.js que exporta User
jest.mock('../../src/models', () => ({
  User: {
    create: jest.fn(),
  },
}));

const { User } = require('../../src/models');

describe('userController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user and return 201 status', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'abc12345',
        role: 'admin',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const fakeUser = { id: 1, ...req.body };
    User.create.mockResolvedValue({ user: fakeUser });

    await createUser(req, res);

    expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John Doe',
      email: 'john@example.com',
    }));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ user: fakeUser });
  });

  it('should return 400 status if user creation fails', async () => {
    const req = {
      body: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: '123456',
        role: 'user',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.arrayContaining([
        expect.stringContaining('fails to match the required pattern'),
      ]),
    }));
    expect(User.create).not.toHaveBeenCalled();
  });
});
