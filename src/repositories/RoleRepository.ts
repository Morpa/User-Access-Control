import Role from 'models/Role';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Role)
class RoleRepository extends Repository<Role> {}

export default RoleRepository;
