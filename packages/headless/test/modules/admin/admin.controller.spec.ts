import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {
    connectTestDatabase,
    GetDemoUserToken,
    insertAdmins,
    TestAdminId,
    TestAdminUsername,
    TestTimeout,
} from '../../test-utility';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from 'src/decorators/service.validator';
import { UserController } from 'src/modules/user/rest';
import {
    changePasswordRequestWithLessThanSixCharactersNewPassword,
    changePasswordRequestWithoutNewPassword,
    incorrectCurrentChangePasswordRequest,
    updateAdminWithNewAddress,
    updateAdminWithNewAddressMissingData,
    updateAdminWithOldAddress,
    updateAdminWithoutAddress,
    validCurrentChangePasswordRequest,
} from './admin.predefined.data';
const token = GetDemoUserToken(TestAdminId, TestAdminUsername, 'admin').token;

describe('Initializing... Admin Auth controller testing', () => {
    let app: INestApplication;
    let adminController: UserController;
    let addressId: string;

    beforeAll(async () => {
        await connectTestDatabase();
        await insertAdmins();
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        adminController = module.get<UserController>(UserController);
        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterAll(async () => {
        await Promise.all([
            app.close(),
        ])
    })

    describe('adminController is available', () => {
        it('adminController - should be defined', () => {
            expect(adminController).toBeDefined();
        });
    });

    describe('GET /user [passing without token]', () => {
        it('fails to authenticate user and should return 401', async () => {
            return await request(app.getHttpServer())
                .get('/user')
                .expect(401);
        });
    });

    describe('GET /user [passing with wrong token]', () => {
        it('fails to authenticate user and should return 401', async () => {
            return await request(app.getHttpServer())
                .get('/user')
                .set('Authorization', `Bearer ${token.replace('e', 'y')}`)
                .expect(401);
        }, TestTimeout);
    });

    describe('GET /user [passing with right token]', () => {
        it('return admin response data and should return 200', async () => {
            return await request(app.getHttpServer())
                .get('/user')
                .set('Authorization', `Bearer ${token}`)
                .expect((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.data).not.toBe(null);
                })
        }, TestTimeout);
    });

    describe('PATCH /user [passing with right token & update admin info]', () => {
        describe('update admin personal information without address', () => {
            it('should return admin response data and status code 200', async () => {
                return await request(app.getHttpServer())
                    .patch('/user')
                    .set('Authorization', `Bearer ${token}`)
                    .send(updateAdminWithoutAddress)
                    .expect((res) => {
                        expect(res.statusCode).toBe(200);
                        expect(res.body.data).not.toBe(null);
                    })
            }, TestTimeout);
        });

        describe('update admin information & add user new address(all required data)', () => {
            it('should return admin response data and status code 200', async () => {
                const result: any = await request(app.getHttpServer())
                    .patch('/user')
                    .set('Authorization', `Bearer ${token}`)
                    .send(updateAdminWithNewAddress)
                    .expect((res) => {
                        expect(res.statusCode).toBe(200);
                        expect(res.body.data).not.toBe(null);
                    })
                if (result.body.data && result.body.data.addresses && result.body.data.addresses.length) {
                    addressId = result.body.data.addresses[0].id;
                }
            }, TestTimeout);
        });

        describe('update admin information & update user old address(all required data)', () => {
            it('should return admin response data and status code 200', async () => {
                return await request(app.getHttpServer())
                    .patch('/user')
                    .set('Authorization', `Bearer ${token}`)
                    .send({ ...updateAdminWithOldAddress, 'address.id': addressId })
                    .expect((res) => {
                        expect(res.statusCode).toBe(200);
                        expect(res.body.data).not.toBe(null);
                    })
            }, TestTimeout);
        });

        describe('update admin information & add user new address(required data missing)', () => {
            it('should error message with 422 bad request(Unprocessable Entity)', async () => {
                return await request(app.getHttpServer())
                    .patch('/user')
                    .set('Authorization', `Bearer ${token}`)
                    .send(updateAdminWithNewAddressMissingData)
                    .expect((res) => {
                        expect(res.statusCode).toBe(422);
                    })
            }, TestTimeout);
        });
    });

    describe('PATCH /user/password [passing with right token & change admin password]', () => {
        describe('change admin password with incorrect current password', () => {
            it('should error message with 400 bad request', async () => {
                return await request(app.getHttpServer())
                    .patch('/user/password')
                    .set('Authorization', `Bearer ${token}`)
                    .send(incorrectCurrentChangePasswordRequest)
                    .expect((res) => {
                        expect(res.statusCode).toBe(400);
                        expect(res.body.error).toEqual('CURRENT_PASSWORD_IS_INCORRECT');
                        expect(res.body.errors).toBe(null);
                    });
            }, TestTimeout);
        });

        describe('change admin password with valid current password & new password length less than 6 characters', () => {
            it('should error message with 422 bad request(Unprocessable Entity)', async () => {
                return await request(app.getHttpServer())
                    .patch('/user/password')
                    .set('Authorization', `Bearer ${token}`)
                    .send(changePasswordRequestWithLessThanSixCharactersNewPassword)
                    .expect((res) => {
                        expect(res.statusCode).toBe(422);
                        expect(res.body.errors).toEqual({ newPassword: ["newPassword must be longer than or equal to 6 characters"] });
                    });
            }, TestTimeout);
        });

        describe('change admin password with valid current password & empty new password', () => {
            it('should error message with 422 bad request(Unprocessable Entity)', async () => {
                return await request(app.getHttpServer())
                    .patch('/user/password')
                    .set('Authorization', `Bearer ${token}`)
                    .send(changePasswordRequestWithoutNewPassword)
                    .expect((res) => {
                        expect(res.statusCode).toBe(422);
                        expect(res.body.errors).toEqual({ newPassword: ["newPassword must be longer than or equal to 6 characters", "newPassword must be a string", "newPassword should not be empty"] });
                    });
            }, TestTimeout);
        });

        describe('change admin password with valid current password & new password', () => {
            it('should return  statusCode 200 and and return change password response data', async () => {
                return await request(app.getHttpServer())
                    .patch('/user/password')
                    .set('Authorization', `Bearer ${token}`)
                    .send(validCurrentChangePasswordRequest)
                    .expect((res) => {
                        expect(res.statusCode).toBe(200)
                        expect(res.body.data.message).toEqual('CHANGE_PASSWORD_SUCCESSFUL');
                        expect(res.body.error).toBe(undefined);
                    });
            }, TestTimeout);
        });
    });
});