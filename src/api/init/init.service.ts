import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InitService {
    constructor(private prisma: PrismaService) { }

    async init() {
        try {
            const hash = await bcrypt.hash('12345', 10);
            const totalRoles = await this.prisma.role.count();
            if (totalRoles === 0) {
                const createRoleAdmin = await this.prisma.role.create({
                    data: {
                        name: 'Admin',
                        slug: 'admin'
                    }
                });
                const createRoleUser = await this.prisma.role.create({
                    data: {
                        name: 'User',
                        slug: 'user'
                    }
                });

                if (createRoleAdmin && createRoleUser) {
                    const createUser = await this.prisma.user.create({
                        data: {
                            name: 'Admin',
                            email: 'admin@inverseapps.com',
                            password: hash
                        }
                    })

                    if (createUser) {
                        const assignPrivileges = await this.prisma.userRole.create({
                            data: {
                                user_id: createRoleAdmin.id,
                                role_id: createUser.id
                            }
                        })
                    }
                }
            }
            return {
                status: 'success',
            };
        } catch (error) {
            return {
                status: 'error',
                error: error,
            };
        }

    }
}
