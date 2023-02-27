import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user.entity';

class DatabaseService 
{
    private dataSource: DataSource;

    constructor() {
        this.dataSource = new DataSource(this.getConfig());
        this.dataSource.initialize();
    }

    public getConfig(): DataSourceOptions
    {
        return {
            type: 'postgres',
            host: 'postgresql',
            port: 5432,
            username: 'toto',
            password: 'toto',
            database: 'transcendence',
            entities: [User]
        };
    }

    public getDataSource(): DataSource
    {
        return this.dataSource;
    }

    public async insertUser(user: any): Promise<void>
    {
        const newUser = new User();
        newUser.login = user.login;
        newUser.username = user.login;
        const image = await fetch(user.image.versions.small);
        newUser.profile_pic = Buffer.from(await image.arrayBuffer()).toString('base64');

        await this.dataSource.manager.save(newUser);
    }
}

export const databaseService = new DatabaseService();