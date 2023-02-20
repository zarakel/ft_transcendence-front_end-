import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user.entity';

class DatabaseService 
{
    private dataSource: DataSource;

    constructor()
    {
        this.dataSource = new DataSource(this.getConfig());
        this.dataSource.initialize().then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
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
            entities: [User],
            synchronize: true
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

        await this.dataSource.manager.save(newUser);
    }
}

export const databaseService = new DatabaseService();