'use strict';
//const SequelizeMock = require('sequelize-mock');
const TeamController = require('../../controllers/team.controller');

// const sequelizeMock = new SequelizeMock();
// const TeamMock = sequelizeMock.define('Team', {
//   name: 'FC Barcelona',
// });

jest.mock('../../models');

describe('createTeam', () => {
  it('creates a team successfully', async () => {

    const req = { params: { name: 'Test Team' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await TeamController.createTeam(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data:{
        name: 'Test Team',
      },
    });
  });

});
